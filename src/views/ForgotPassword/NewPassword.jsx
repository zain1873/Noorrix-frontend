"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiLock, FiEye, FiEyeOff, FiArrowLeft } from "react-icons/fi";
import "../LoginSignup/LoginSignup.css";
import "./ForgotPassword.css";

const API = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

function PasswordHints({ password }) {
  if (!password) return null;
  const minLen = password.length >= 8;
  const notNumeric = !/^\d+$/.test(password);
  if (minLen && notNumeric) return null;

  return (
    <ul className="ls-pwd-hints">
      <li className={minLen ? "hint-ok" : "hint-fail"}>At least 8 characters</li>
      <li className={notNumeric ? "hint-ok" : "hint-fail"}>Not entirely numeric</li>
      <li>Not too similar to your name or email</li>
      <li>Not a commonly used password</li>
    </ul>
  );
}

export default function NewPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [form, setForm] = useState({ new_password: "", confirm_password: "" });
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("fp_email");
    const storedOtp = sessionStorage.getItem("fp_otp");
    if (!storedEmail || !storedOtp) {
      router.replace("/forgot-password");
      return;
    }
    setEmail(storedEmail);
    setOtp(storedOtp);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "", otp: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/v1/auth/password-reset/confirm/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          otp,
          new_password: form.new_password,
          confirm_password: form.confirm_password,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        sessionStorage.removeItem("fp_email");
        sessionStorage.removeItem("fp_otp");
        router.push("/login?reset=success");
      } else {
        const fieldErrors = {};
        ["otp", "new_password", "confirm_password"].forEach((key) => {
          if (data[key]) {
            fieldErrors[key] = Array.isArray(data[key]) ? data[key][0] : data[key];
          }
        });
        if (data.detail) fieldErrors.general = data.detail;
        if (data.non_field_errors) {
          fieldErrors.general = Array.isArray(data.non_field_errors)
            ? data.non_field_errors[0]
            : data.non_field_errors;
        }
        setErrors(
          Object.keys(fieldErrors).length
            ? fieldErrors
            : { general: "Something went wrong. Please try again." }
        );
      }
    } catch {
      setErrors({ general: "Network error. Please check your connection." });
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
          <div className="fp-step-dot done" />
          <div className="fp-step-dot done" />
          <div className="fp-step-dot active" />
        </div>

        <div className="ls-forgot-icon-wrap">
          <FiLock className="ls-forgot-big-icon" />
        </div>
        <h1 className="ls-heading">Set New Password</h1>
        <p className="ls-subheading">Choose a strong password for your account</p>

        {errors.general && <p className="ls-error ls-error-general">{errors.general}</p>}
        {errors.otp && (
          <div className="ls-error ls-error-general">
            {errors.otp}{" "}
            <button
              type="button"
              onClick={() => router.push("/forgot-password/otp")}
              style={{ background: "none", border: "none", color: "inherit", fontWeight: 700, cursor: "pointer", fontFamily: "var(--font-main)", fontSize: "inherit", padding: 0, textDecoration: "underline" }}
            >
              Re-enter OTP
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="ls-form">
          <div className="ls-field">
            <span className="ls-field-icon"><FiLock /></span>
            <input
              className={`ls-input${errors.new_password ? " ls-input-error" : ""}`}
              type={showPwd ? "text" : "password"}
              name="new_password"
              placeholder="New Password"
              value={form.new_password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="ls-eye-btn"
              onClick={() => setShowPwd((v) => !v)}
              tabIndex={-1}
            >
              {showPwd ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          {errors.new_password && <p className="ls-error">{errors.new_password}</p>}
          <PasswordHints password={form.new_password} />

          <div className="ls-field">
            <span className="ls-field-icon"><FiLock /></span>
            <input
              className={`ls-input${errors.confirm_password ? " ls-input-error" : ""}`}
              type={showConfirm ? "text" : "password"}
              name="confirm_password"
              placeholder="Confirm New Password"
              value={form.confirm_password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="ls-eye-btn"
              onClick={() => setShowConfirm((v) => !v)}
              tabIndex={-1}
            >
              {showConfirm ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          {errors.confirm_password && <p className="ls-error">{errors.confirm_password}</p>}

          <button type="submit" className="ls-submit-btn" disabled={loading}>
            {loading ? "Resetting…" : "Reset Password"}
            {!loading && <span className="ls-submit-arrow">→</span>}
          </button>
        </form>

        <button className="ls-back-btn" onClick={() => router.push("/forgot-password/otp")}>
          <FiArrowLeft /> Back
        </button>
      </div>
    </div>
  );
}
