"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiLock, FiShield, FiExternalLink } from "react-icons/fi";
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcPaypal, FaCcApplePay } from "react-icons/fa";

import Navbar from "../../components/Navbar/Navbar";
import NoorrixFooter from "../../components/Footer/Footer";
import { createCheckoutSession } from "../../services/paymentsService";
import { useAuth } from "../../context/AuthContext";
import "./Checkout.css";

/**
 * Reservation review page.
 *
 * Shows the order summary, then sends the buyer to Stripe's own hosted checkout
 * page (Stripe Checkout). The session is created server-side by the Django
 * backend; we just redirect the browser to the returned URL. Stripe collects the
 * card / Apple Pay / PayPal details and the email on its page.
 *
 * Props are resolved server-side in app/checkout/page.js from the query string.
 */
export default function Checkout({ amount, carId, carTitle, carPrice }) {
  const deposit = Number(amount);
  const validAmount = Number.isFinite(deposit) && deposit >= 0.5;
  const depositLabel = validAmount ? `£${deposit.toFixed(2)}` : null;

  const router = useRouter();
  const { user, hydrated } = useAuth();

  const [redirecting, setRedirecting] = useState(false);
  const [error, setError] = useState(null);

  // Reservations require an account. If the user isn't logged in, send them to
  // login with a returnTo so they come straight back here afterwards.
  useEffect(() => {
    if (hydrated && !user) {
      const dest = `/checkout?amount=${deposit}${carId ? `&car=${carId}` : ""}`;
      router.replace(`/login?returnTo=${encodeURIComponent(dest)}`);
    }
  }, [hydrated, user, deposit, carId, router]);

  if (!user) {
    return (
      <>
        <Navbar />
        <main className="checkout-page">
          <div className="checkout-container" style={{ textAlign: "center" }}>
            <p className="checkout-subheading">
              {hydrated ? "Redirecting to login…" : "Loading…"}
            </p>
          </div>
        </main>
        <NoorrixFooter />
      </>
    );
  }

  const handleReserve = async () => {
    if (!validAmount) return;
    setError(null);
    setRedirecting(true);

    const origin = window.location.origin;
    const description = carTitle ? `Reservation deposit — ${carTitle}` : "Reservation deposit";

    try {
      const data = await createCheckoutSession({
        amount: deposit.toFixed(2),
        currency: "gbp",
        description,
        successUrl: `${origin}/payment/complete`,
        cancelUrl: carId
          ? `${origin}/payment/cancel?car=${carId}&amount=${deposit}`
          : `${origin}/stock`,
      });

      // Persist so /payment/complete can confirm the real (webhook-verified) status.
      sessionStorage.setItem("payment_reference", data.reference);
      sessionStorage.setItem(
        "payment_meta",
        JSON.stringify({ carTitle: carTitle || "", amount: deposit.toFixed(2), carId: carId || "" })
      );

      // Hand off to Stripe's hosted checkout page.
      window.location.href = data.url;
    } catch (err) {
      setError(err.message);
      setRedirecting(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="checkout-page">
        <div className="checkout-container">
          <Link href={carId ? `/cars/${carId}` : "/stock"} className="checkout-back">
            <FiArrowLeft size={16} /> Back
          </Link>

          <h1 className="checkout-heading">Reserve your vehicle</h1>
          <p className="checkout-subheading">
            Secure this car with a fully refundable deposit. You'll be taken to Stripe's secure
            checkout to complete payment.
          </p>

          <div className="checkout-grid">
            {/* ── Order summary ── */}
            <aside className="checkout-summary">
              <h2 className="checkout-summary-title">Order summary</h2>

              <div className="checkout-summary-row">
                <span className="checkout-summary-label">Vehicle</span>
                <span className="checkout-summary-value">{carTitle || "Vehicle reservation"}</span>
              </div>

              {carPrice && (
                <div className="checkout-summary-row">
                  <span className="checkout-summary-label">List price</span>
                  <span className="checkout-summary-value">{carPrice}</span>
                </div>
              )}

              <div className="checkout-summary-divider" />

              <div className="checkout-summary-row checkout-summary-total">
                <span className="checkout-summary-label">Refundable deposit</span>
                <span className="checkout-summary-value">{depositLabel || "—"}</span>
              </div>

              <p className="checkout-refund-note">
                <FiShield size={14} /> Your deposit is fully refundable.
              </p>

              <div className="checkout-accepted">
                <span className="checkout-accepted-label">We accept</span>
                <div className="checkout-accepted-icons">
                  <FaCcVisa />
                  <FaCcMastercard />
                  <FaCcAmex />
                  <FaCcPaypal />
                  <FaCcApplePay />
                </div>
              </div>
            </aside>

            {/* ── Confirm / redirect panel ── */}
            <section className="checkout-panel">
              {!validAmount ? (
                <div className="checkout-error-box">
                  This reservation link is invalid (missing or incorrect amount).{" "}
                  <Link href="/stock">Browse our stock</Link> to reserve a vehicle.
                </div>
              ) : (
                <>
                  <h2 className="checkout-panel-title">Confirm your reservation</h2>
                  <p className="checkout-redirect-copy">
                    Click below to pay your <strong>{depositLabel}</strong> deposit
                    {carTitle ? <> for the <strong>{carTitle}</strong></> : null}. You'll be
                    securely redirected to Stripe to pay by card, Apple Pay or PayPal, then brought
                    back here once it's done.
                  </p>

                  {error && (
                    <div className="checkout-error-box" role="alert">
                      {error}
                    </div>
                  )}

                  <button
                    type="button"
                    className="checkout-submit"
                    onClick={handleReserve}
                    disabled={redirecting}
                  >
                    {redirecting ? (
                      "Redirecting to secure checkout…"
                    ) : (
                      <>
                        Continue to secure payment · {depositLabel}{" "}
                        <FiExternalLink size={15} style={{ marginLeft: 4, verticalAlign: "-2px" }} />
                      </>
                    )}
                  </button>

                  <p className="checkout-secure-note">
                    <FiLock size={13} /> Secured by Stripe. Cards, Apple Pay and PayPal supported.
                  </p>
                </>
              )}
            </section>
          </div>
        </div>
      </main>

      <NoorrixFooter />
    </>
  );
}
