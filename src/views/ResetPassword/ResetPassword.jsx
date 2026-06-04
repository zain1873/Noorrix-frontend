"use client";
import { useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { FiLock, FiEye, FiEyeOff, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import "../LoginSignup/LoginSignup.css";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const uid = searchParams.get("uid") || "";
  const token = searchParams.get("token") || "";

  const [form, setForm] = useState({ new_password: "", confirm_password: "" });
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API}/api/v1/auth/password-reset/confirm/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid, token, ...form }),
      });
      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
    setErrors({});
    setLoading(true);
      } else {
        const fieldErrors = {};
        ["new_password", "confirm_password", "token"].forEach((key) => {
          if (data[key]) {
            fieldErrors[key] = Array.isArray(data[key]) ? data[key][0] : data[key];
          }
        });
        if (data.non_field_errors) {
          fieldErrors.general = Array.isArray(data.non_field_errors)
            ? data.non_field_errors[0]
            : data.non_field_errors;
        }
        setErrors(Object.keys(fieldErrors).length ? fieldErrors : { general: "Something went wrong. Please try again." });
      }
    } catch {
      setErrors({ general: "Network error. Please check your connection." });
    } finally {
      setLoading(false);
    }
  };

  // Invalid link — uid or token missing
  if (!uid || !token) {
    return (
      <div className="ls-page">
        <div className="ls-bg-blob ls-blob-1" />
        <div className="ls-bg-blob ls-blob-2" />
        <div className="ls-card ls-card-center">
          <Link href="/" className="ls-logo">Noorrix Motors</Link>
          <div className="ls-success-icon-wrap" style={{ color: "#ff5b5b" }}>
            <FiAlertCircle className="ls-success-icon" />
          </div>
          <h1 className="ls-heading">Invalid Link</h1>
          <p className="ls-subheading">
            This password reset link is invalid or has expired.
          </p>
          <Link href="/login" className="ls-submit-btn" style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
            Back to Login <span className="ls-submit-arrow">→</span>
          </Link>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="ls-page">
        <div className="ls-bg-blob ls-blob-1" />
        <div className="ls-bg-blob ls-blob-2" />
        <div className="ls-card ls-card-center">
          <Link href="/" className="ls-logo">Noorrix Motors</Link>
          <div className="ls-success-icon-wrap">
            <FiCheckCircle className="ls-success-icon" />
          </div>
          <h1 className="ls-heading">Password Reset!</h1>
          <p className="ls-subheading">
            Your password has been updated successfully.
          </p>
          <button className="ls-submit-btn" onClick={() => router.push("/login")} style={{ marginTop: 8 }}>
            Sign In <span className="ls-submit-arrow">→</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="ls-page">
      <div className="ls-bg-blob ls-blob-1" />
      <div className="ls-bg-blob ls-blob-2" />
      <div className="ls-card">
        <Link href="/" className="ls-logo">Noorrix Motors</Link>
        <h1 className="ls-heading">Set New Password</h1>
        <p className="ls-subheading">Choose a strong password for your account</p>

        {errors.general && <p className="ls-error ls-error-general">{errors.general}</p>}
        {errors.token && <p className="ls-error ls-error-general">{errors.token}</p>}

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
      </div>
    </div>
  );
}
