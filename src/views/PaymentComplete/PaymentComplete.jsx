"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiCheckCircle, FiXCircle, FiClock, FiLoader } from "react-icons/fi";

import Navbar from "../../components/Navbar/Navbar";
import NoorrixFooter from "../../components/Footer/Footer";
import { getPaymentStatus } from "../../services/paymentsService";
import "./PaymentComplete.css";

/**
 * Return page after Stripe redirects the buyer back.
 *
 * The browser redirect alone is NOT proof of payment — the webhook is the source
 * of truth. We poll GET /api/v1/payments/{reference}/ (which reflects the
 * webhook-verified status) until it resolves, because the webhook may land a
 * moment after the redirect.
 */
export default function PaymentComplete() {
  const [status, setStatus] = useState("checking");
  const [meta, setMeta] = useState({ carTitle: "", amount: "" });

  useEffect(() => {
    // Prefer the ?ref= we attached to return_url, fall back to sessionStorage.
    const params = new URLSearchParams(window.location.search);
    const reference = params.get("ref") || sessionStorage.getItem("payment_reference");

    try {
      const stored = JSON.parse(sessionStorage.getItem("payment_meta") || "{}");
      if (stored.carTitle || stored.amount) setMeta(stored);
    } catch {
      /* ignore malformed meta */
    }

    if (!reference) {
      setStatus("unknown");
      return;
    }

    const POLL_INTERVAL_MS = 3000;
    const MAX_POLL_TRIES = 40; // 40 × 3 s = 2 min

    let tries = 0;
    let timer;
    let cancelled = false;

    const check = async () => {
      try {
        const p = await getPaymentStatus(reference);
        if (cancelled) return;

        if (p.status === "succeeded") return setStatus("succeeded");
        if (["failed", "canceled", "refunded"].includes(p.status)) return setStatus(p.status);

        // pending / processing — keep polling until webhook lands or 2-min limit.
        if (tries++ < MAX_POLL_TRIES) {
          timer = setTimeout(check, POLL_INTERVAL_MS);
        } else {
          setStatus("pending");
        }
      } catch {
        if (cancelled) return;
        if (tries++ < MAX_POLL_TRIES) timer = setTimeout(check, POLL_INTERVAL_MS);
        else setStatus("error");
      }
    };

    check();
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, []);

  const amountLabel = meta.amount ? `£${Number(meta.amount).toFixed(2)}` : null;

  const receipt = [
    meta.carTitle && { label: "Vehicle", value: meta.carTitle },
    amountLabel && { label: "Deposit paid", value: amountLabel },
  ].filter(Boolean);

  const VIEWS = {
    checking: {
      tone: "brand",
      icon: <FiLoader className="pc-icon pc-spin" />,
      title: "Confirming your payment…",
      body: "Please wait while we verify your reservation. Don't close this window.",
    },
    succeeded: {
      tone: "success",
      icon: <FiCheckCircle className="pc-icon" />,
      title: "Payment successful",
      body: "Your reservation is confirmed and a receipt is on its way to your email. Our team will be in touch shortly.",
      details: receipt,
    },
    pending: {
      tone: "pending",
      icon: <FiClock className="pc-icon" />,
      title: "Payment is processing",
      body: "Your payment is being processed. We'll email you as soon as it's confirmed — no need to pay again.",
      details: receipt,
    },
    failed: {
      tone: "fail",
      icon: <FiXCircle className="pc-icon" />,
      title: "Payment failed",
      body: "Your payment could not be completed. No deposit has been taken — please try reserving again.",
    },
    canceled: {
      tone: "fail",
      icon: <FiXCircle className="pc-icon" />,
      title: "Payment canceled",
      body: "This payment was canceled. No deposit has been taken.",
    },
    refunded: {
      tone: "pending",
      icon: <FiCheckCircle className="pc-icon" />,
      title: "Payment refunded",
      body: "This deposit has been refunded.",
    },
    error: {
      tone: "pending",
      icon: <FiClock className="pc-icon" />,
      title: "We couldn't confirm your payment just yet",
      body: "If your payment went through, you'll receive a confirmation email shortly. Please contact us if you have any questions.",
    },
    unknown: {
      tone: "fail",
      icon: <FiXCircle className="pc-icon" />,
      title: "No payment found",
      body: "We couldn't find a payment to confirm. If you've just paid, please check your email for a receipt.",
    },
  };

  const view = VIEWS[status] || VIEWS.unknown;
  const isFinal = status !== "checking";

  return (
    <>
      <Navbar />
      <main className="pc-page">
        <div className={`pc-card pc-card-${view.tone}`}>
          <div className={`pc-badge pc-badge-${view.tone}`}>{view.icon}</div>
          <h1 className="pc-title">{view.title}</h1>
          <p className="pc-body">{view.body}</p>

          {view.details?.length > 0 && (
            <div className="pc-receipt">
              {view.details.map((d) => (
                <div className="pc-receipt-row" key={d.label}>
                  <span className="pc-receipt-label">{d.label}</span>
                  <span className="pc-receipt-value">{d.value}</span>
                </div>
              ))}
            </div>
          )}

          {isFinal && (
            <div className="pc-actions">
              <Link href="/stock" className="pc-btn pc-btn-primary">
                Browse more vehicles
              </Link>
              <Link href="/" className="pc-btn pc-btn-outline">
                Back to home
              </Link>
            </div>
          )}
        </div>
      </main>
      <NoorrixFooter />
    </>
  );
}
