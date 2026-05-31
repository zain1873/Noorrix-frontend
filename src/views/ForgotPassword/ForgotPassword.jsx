"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiMail, FiArrowLeft } from "react-icons/fi";
import "../LoginSignup/LoginSignup.css";
import "./ForgotPassword.css";

const API = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/v1/auth/password-reset/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        sessionStorage.removeItem("fp_otp");
        sessionStorage.setItem("fp_email", email);
        router.push("/forgot-password/otp");
      } else {
        const data = await res.json();
        setError(
          data.email
            ? Array.isArray(data.email) ? data.email[0] : data.email
            : "Something went wrong. Please try again."
        );
      }
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ls-page">
      <div className="ls-bg-blob ls-blob-1" />
      <div className="ls-bg-blob ls-blob-2" />
      <div className="ls-card">
        <Link href="/" className="ls-logo">Noorrix Motors</Link>

        <div className="fp-step-indicator">
          <div className="fp-step-dot active" />
          <div className="fp-step-dot" />
          <div className="fp-step-dot" />
        </div>

        <div className="ls-forgot-icon-wrap">
          <FiMail className="ls-forgot-big-icon" />
        </div>
        <h1 className="ls-heading">Forgot Password?</h1>
        <p className="ls-subheading">Enter your email and we&apos;ll send you a one-time code</p>

        <form onSubmit={handleSubmit} className="ls-form">
          <div className="ls-field">
            <span className="ls-field-icon"><FiMail /></span>
            <input
              className={`ls-input${error ? " ls-input-error" : ""}`}
              type="email"
              name="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              required
              autoFocus
            />
          </div>
          {error && <p className="ls-error">{error}</p>}
          <button type="submit" className="ls-submit-btn" disabled={loading}>
            {loading ? "Sending OTP…" : "Send OTP"}
            {!loading && <span className="ls-submit-arrow">→</span>}
          </button>
        </form>

        <button className="ls-back-btn" onClick={() => router.push("/login")}>
          <FiArrowLeft /> Back to Login
        </button>
      </div>
    </div>
  );
}
