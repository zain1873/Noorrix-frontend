// All Stripe payment API calls live here so the URL/contract is in one place.
// Backend contract (Django):
//
//   POST /api/v1/payments/create-checkout-session/  -> { url, reference }   (hosted Stripe Checkout)
//   GET  /api/v1/payments/{reference}/               -> { status, amount, ... }
//
// See docs/backend-stripe-hosted-checkout.md for the endpoint the backend must add.

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Create a Stripe *Checkout Session* on the backend and get the hosted page URL.
 *
 * The hosted page (Stripe's own branded checkout) can only be created server-side
 * with the Stripe secret key, so this just asks the backend for the session URL
 * and the frontend then redirects the browser to it.
 *
 * @param {object} args
 * @param {string|number} args.amount   Major units (pounds), e.g. "200.00". Min 0.50.
 * @param {string} [args.currency]      ISO code, defaults to "gbp" on the backend.
 * @param {string} [args.description]   Shown on the Stripe checkout / receipt.
 * @param {string} args.successUrl      Where Stripe redirects after a successful payment.
 * @param {string} args.cancelUrl       Where Stripe redirects if the buyer cancels.
 * @returns {Promise<{ url: string, reference: string }>}
 */
export async function createCheckoutSession({
  amount,
  currency = "gbp",
  description,
  successUrl,
  cancelUrl,
}) {
  const res = await fetch(`${BASE_URL}/api/v1/payments/create-checkout-session/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount,
      currency,
      description,
      success_url: successUrl,
      cancel_url: cancelUrl,
    }),
  });

  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error("Payment service is unavailable. Please try again later.");
  }

  // Backend returns { success: false, errors: {...} } (400) or { error: "..." } (502).
  if (!res.ok || !data.success || !data.url) {
    const message =
      data?.error ||
      (data?.errors && Object.values(data.errors).flat().join(" ")) ||
      "Could not start the payment. Please try again.";
    throw new Error(message);
  }

  return data;
}

/**
 * Fetch the webhook-verified status of a payment.
 * Treat status === "succeeded" as paid.
 *
 * @param {string} reference  The reference returned by createCheckoutSession.
 * @returns {Promise<{ reference: string, status: string, amount: string, currency: string }>}
 */
export async function getPaymentStatus(reference) {
  const res = await fetch(`${BASE_URL}/api/v1/payments/${reference}/`);
  if (!res.ok) {
    throw new Error("Could not retrieve payment status.");
  }
  return res.json();
}
