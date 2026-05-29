# Backend task: add a hosted Stripe Checkout Session endpoint

> **Prompt for the backend developer.** The frontend has been switched from the
> embedded Stripe Payment Element to **Stripe's hosted Checkout page** (the full
> Stripe-branded page the customer is redirected to). The hosted page requires a
> **Checkout Session**, which can only be created server-side with the Stripe
> **secret key**. The current backend only exposes `create-intent/` (PaymentIntent),
> so please add **one new endpoint** described below. Everything else (the
> `GET /payments/{reference}/` status endpoint and the webhook) stays the same and
> should keep working.

---

## What the frontend already does

1. User clicks **Reserve** on a car → goes to `/checkout?amount=200&car=<id>`.
2. The checkout page calls:

   ```
   POST /api/v1/payments/create-checkout-session/
   ```

3. It expects back a Stripe-hosted **`url`** + a **`reference`**, stores the
   reference, then does `window.location.href = url` to send the user to Stripe.
4. After payment Stripe redirects to `success_url`, our `/payment/complete` page
   **polls `GET /api/v1/payments/{reference}/`** until `status === "succeeded"`
   (the webhook is the source of truth — same rule as today).
5. If the user cancels on Stripe, they return to `cancel_url`.

---

## 1. New endpoint to add

```
POST /api/v1/payments/create-checkout-session/
Content-Type: application/json
```

### Request body (sent by the frontend)

| Field         | Type            | Required | Notes                                                        |
|---------------|-----------------|----------|--------------------------------------------------------------|
| `amount`      | string / number | ✅       | **Major units** (pounds), e.g. `"200.00"`. Min `0.50`. Convert to pence for Stripe. |
| `currency`    | string          | ❌       | ISO code, defaults to `"gbp"`.                               |
| `description` | string          | ❌       | e.g. `"Reservation deposit — BMW 3 Series"`. Shown on Stripe + receipt. |
| `success_url` | string          | ✅       | Absolute URL to return to on success, e.g. `https://site/payment/complete`. |
| `cancel_url`  | string          | ✅       | Absolute URL to return to if the buyer cancels.             |

> **Security:** validate `amount` server-side (same `0.50`–`999999.99` bounds as
> `create-intent`). Treat `success_url` / `cancel_url` as untrusted — only allow
> your own origin(s) (allow-list the frontend domain) to avoid open-redirect abuse.

### Success response — `201 Created`

```json
{
  "success": true,
  "url": "https://checkout.stripe.com/c/pay/cs_test_a1...",
  "reference": "d7622756-2689-4a1e-aebd-bb947cc697d6"
}
```

- `url` → the hosted Stripe Checkout page (frontend redirects here).
- `reference` → the **same Payment record reference** used by `GET /payments/{reference}/`.

### Error responses (keep the existing shapes)

```json
// 400 validation
{ "success": false, "errors": { "amount": ["Amount must be at least 0.50."] } }

// 502 Stripe/provider error
{ "success": false, "error": "..." }
```

---

## 2. Reference implementation (Django, `stripe` SDK)

Mirror however `create-intent/` already creates and stores a `Payment` record so
that `GET /payments/{reference}/` and the webhook continue to work unchanged.

```python
import uuid
from decimal import Decimal
from django.conf import settings
import stripe
from rest_framework.decorators import api_view
from rest_framework.response import Response

stripe.api_key = settings.STRIPE_SECRET_KEY  # sk_test_... / sk_live_...


@api_view(["POST"])
def create_checkout_session(request):
    data = request.data
    currency = (data.get("currency") or "gbp").lower()
    description = data.get("description") or "Vehicle reservation deposit"
    success_url = data.get("success_url")
    cancel_url = data.get("cancel_url")

    # --- validate amount (major units -> pence) ---
    try:
        amount = Decimal(str(data.get("amount")))
    except Exception:
        return Response({"success": False, "errors": {"amount": ["Invalid amount."]}}, status=400)
    if amount < Decimal("0.50") or amount > Decimal("999999.99"):
        return Response(
            {"success": False, "errors": {"amount": ["Amount must be between 0.50 and 999999.99."]}},
            status=400,
        )
    amount_pence = int((amount * 100).to_integral_value())

    # --- validate redirect URLs against an allow-list ---
    if not _is_allowed_redirect(success_url) or not _is_allowed_redirect(cancel_url):
        return Response({"success": False, "errors": {"url": ["Invalid redirect URL."]}}, status=400)

    # --- our own reference, used by GET /payments/{reference}/ ---
    reference = str(uuid.uuid4())

    # Pre-create the Payment record in `pending` (same as create-intent does).
    payment = Payment.objects.create(
        reference=reference,
        amount=amount,
        currency=currency,
        description=description,
        status="pending",
        user=request.user if request.user.is_authenticated else None,
    )

    try:
        session = stripe.checkout.Session.create(
            mode="payment",
            # Append our reference so the success page can poll immediately.
            success_url=f"{success_url}?ref={reference}&session_id={{CHECKOUT_SESSION_ID}}",
            cancel_url=cancel_url,
            line_items=[{
                "quantity": 1,
                "price_data": {
                    "currency": currency,
                    "unit_amount": amount_pence,
                    "product_data": {"name": description},
                },
            }],
            # Enable the methods you want shown on Stripe's page
            # (configure Apple Pay / PayPal in the Stripe Dashboard).
            payment_method_types=["card", "paypal"],
            # Link Stripe's objects back to our record for the webhook:
            client_reference_id=reference,
            payment_intent_data={"metadata": {"reference": reference}},
            metadata={"reference": reference},
        )
    except stripe.error.StripeError as e:
        payment.status = "failed"
        payment.save(update_fields=["status"])
        return Response({"success": False, "error": str(e.user_message or e)}, status=502)

    payment.stripe_session_id = session.id
    payment.stripe_payment_intent_id = session.payment_intent
    payment.save(update_fields=["stripe_session_id", "stripe_payment_intent_id"])

    return Response({"success": True, "url": session.url, "reference": reference}, status=201)
```

`_is_allowed_redirect(url)` should check the URL's origin is in an allow-list
(e.g. `http://localhost:3000` in dev, the production domain in prod).

---

## 3. Webhook — handle the Checkout events

The webhook stays the source of truth. In addition to whatever PaymentIntent
events you handle today, update the `Payment` record (looked up by
`reference` / `client_reference_id` / `metadata.reference`) on:

| Stripe event                      | Set `Payment.status` to |
|-----------------------------------|-------------------------|
| `checkout.session.completed` (payment_status = `paid`) | `succeeded` |
| `checkout.session.async_payment_succeeded`             | `succeeded` |
| `checkout.session.async_payment_failed`                | `failed`    |
| `checkout.session.expired`                             | `canceled`  |
| `payment_intent.payment_failed`                        | `failed`    |
| `charge.refunded`                                      | `refunded`  |

Because the session carries `client_reference_id = reference` and
`metadata.reference`, you can resolve our record from any of these events.

---

## 4. `GET /api/v1/payments/{reference}/` — no change

The frontend polls this exactly as before; it must return the webhook-verified
`status` (`pending` → `processing` → `succeeded` | `failed` | `canceled` |
`refunded`). The frontend treats `succeeded` as paid.

---

## 5. Checklist for the backend dev

- [ ] Add `POST /api/v1/payments/create-checkout-session/` (contract in §1).
- [ ] Reuse the existing `Payment` model + `reference` scheme so `GET /payments/{reference}/` works.
- [ ] Store `stripe_session_id` and `stripe_payment_intent_id` on the record.
- [ ] Allow-list `success_url` / `cancel_url` origins.
- [ ] Add the Checkout webhook handlers (§3) to your existing webhook view.
- [ ] Enable Card / Apple Pay / PayPal in the Stripe Dashboard (Apple Pay needs a verified domain).
- [ ] CORS: keep allowing the frontend origin (`http://localhost:3000` dev / prod domain).

---

## Frontend reference (already implemented)

- `src/services/paymentsService.js` → `createCheckoutSession()` + `getPaymentStatus()`
- `src/views/Checkout/Checkout.jsx` → review page → redirect to `url`
- `src/views/PaymentComplete/PaymentComplete.jsx` → polls `GET /payments/{reference}/`
- `src/app/checkout/page.js`, `src/app/payment/complete/page.js` → routes
- Reserve buttons link to `/checkout?amount=<deposit>&car=<id>`
