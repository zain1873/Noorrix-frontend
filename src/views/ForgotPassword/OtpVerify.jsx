"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiShield, FiArrowLeft } from "react-icons/fi";
import "../LoginSignup/LoginSignup.css";
import "./ForgotPassword.css";

const API = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
const TIMER_DURATION = 600; // 10 minutes in seconds

function formatTime(s) {
  return `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;
}

export default function OtpVerify() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [expired, setExpired] = useState(false);
  const [error, setError] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const inputs = useRef([]);
  const timerRef = useRef(null);

  const startTimer = () => {
    clearInterval(timerRef.current);
    setExpired(false);
    setTimeLeft(TIMER_DURATION);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    const stored = sessionStorage.getItem("fp_email");
    if (!stored) {
      router.replace("/forgot-password");
      return;
    }
    setEmail(stored);
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const next = [...otp];
    next[index] = value.slice(-1);
    setOtp(next);
    setError("");
    if (value && index < 5) inputs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) inputs.current[index - 1]?.focus();
    if (e.key === "ArrowRight" && index < 5) inputs.current[index + 1]?.focus();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const next = [...digits.split(""), ...Array(6).fill("")].slice(0, 6);
    setOtp(next);
    setError("");
    const focusIdx = next.findIndex((d) => !d);
    inputs.current[focusIdx >= 0 ? focusIdx : 5]?.focus();
  };

  const handleResend = async () => {
    setResendLoading(true);
    setResendSuccess(false);
    setError("");
    try {
      const res = await fetch(`${API}/api/v1/auth/password-reset/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setOtp(["", "", "", "", "", ""]);
        startTimer();
        setResendSuccess(true);
        inputs.current[0]?.focus();
      } else {
        setError("Failed to resend OTP. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setResendLoading(false);
    }
  };

  const handleContinue = (e) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 6) {
      setError("Please enter the complete 6-digit code.");
      return;
    }
    sessionStorage.setItem("fp_otp", code);
    router.push("/forgot-password/new-password");
  };

  const otpComplete = otp.join("").length === 6;

  return (
    <div className="ls-page">
      <div className="ls-bg-blob ls-blob-1" />
      <div className="ls-bg-blob ls-blob-2" />
      <div className="ls-card">
        <Link href="/" className="ls-logo">Noorrix Motors</Link>

        <div className="fp-step-indicator">
          <div className="fp-step-dot done" />
          <div className="fp-step-dot active" />
          <div className="fp-step-dot" />
        </div>

        <div className="ls-forgot-icon-wrap">
          <FiShield className="ls-forgot-big-icon" />
        </div>
        <h1 className="ls-heading">Enter OTP</h1>
        <p className="fp-email-hint">
          Code sent to <span>{email}</span>
        </p>

        <form onSubmit={handleContinue} className="ls-form">
          <div className="fp-otp-row" onPaste={handlePaste}>
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (inputs.current[i] = el)}
                className={`fp-otp-box${digit ? " fp-otp-filled" : ""}${error && !digit ? " fp-otp-error" : ""}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                disabled={expired}
                autoComplete="one-time-code"
              />
            ))}
          </div>

          {error && <p className="ls-error" style={{ textAlign: "center" }}>{error}</p>}

          <div className="fp-timer">
            {expired ? (
              <span className="fp-timer-expired">OTP expired — please request a new one</span>
            ) : (
              <>Code expires in <span className="fp-timer-value">{formatTime(timeLeft)}</span></>
            )}
          </div>

          {resendSuccess && (
            <p className="fp-success-text">New code sent successfully.</p>
          )}

          <div className="fp-resend-row">
            Didn&apos;t receive it?{" "}
            <button
              type="button"
              className="fp-resend-btn"
              onClick={handleResend}
              disabled={resendLoading}
            >
              {resendLoading ? "Sending…" : "Resend OTP"}
            </button>
          </div>

          <button
            type="submit"
            className="ls-submit-btn"
            disabled={expired || !otpComplete}
          >
            Continue <span className="ls-submit-arrow">→</span>
          </button>
        </form>

        <button className="ls-back-btn" onClick={() => router.push("/forgot-password")}>
          <FiArrowLeft /> Back
        </button>
      </div>
    </div>
  );
}
