"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff, FiArrowLeft, FiCheckCircle } from "react-icons/fi";
import "./LoginSignup.css";

const API = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export default function LoginSignup() {
  const router = useRouter();

  const [tab, setTab] = useState("login");
  const [view, setView] = useState("auth"); // "auth" | "forgot" | "forgot-sent"
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "", resetEmail: "" });
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      if (tab === "login") {
        const res = await fetch(`${API}/api/v1/auth/token/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: form.email, password: form.password }),
        });
        const data = await res.json();

        if (res.ok) {
          localStorage.setItem("access", data.access);
          localStorage.setItem("refresh", data.refresh);
          router.push("/");
        } else {
          setErrors({ general: data.detail || "Login failed. Please try again." });
        }
      } else {
        const res = await fetch(`${API}/api/v1/auth/register/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            password: form.password,
            confirm_password: form.confirm,
          }),
        });
        const data = await res.json();

        if (res.ok) {
          // Auto-login after successful registration
          const tokenRes = await fetch(`${API}/api/v1/auth/token/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: form.email, password: form.password }),
          });
          if (tokenRes.ok) {
            const tokenData = await tokenRes.json();
            localStorage.setItem("access", tokenData.access);
            localStorage.setItem("refresh", tokenData.refresh);
          }
          router.push("/");
        } else {
          // Map API field errors (arrays) to single strings
          const fieldErrors = {};
          ["name", "email", "password", "confirm_password"].forEach((key) => {
            if (data[key]) {
              const uiKey = key === "confirm_password" ? "confirm" : key;
              fieldErrors[uiKey] = Array.isArray(data[key]) ? data[key][0] : data[key];
            }
          });
          if (data.non_field_errors) {
            fieldErrors.general = Array.isArray(data.non_field_errors)
              ? data.non_field_errors[0]
              : data.non_field_errors;
          }
          setErrors(fieldErrors);
        }
      }
    } catch {
      setErrors({ general: "Network error. Please check your connection." });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      const res = await fetch(`${API}/api/v1/auth/password-reset/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.resetEmail }),
      });
      const data = await res.json();

      if (res.ok) {
        setView("forgot-sent");
      } else {
        setErrors({
          resetEmail: data.email ? (Array.isArray(data.email) ? data.email[0] : data.email) : "Something went wrong.",
        });
      }
    } catch {
      setErrors({ resetEmail: "Network error. Please check your connection." });
    } finally {
      setLoading(false);
    }
  };

  const backToLogin = () => {
    setView("auth");
    setTab("login");
    setErrors({});
    setForm((prev) => ({ ...prev, resetEmail: "" }));
  };

  if (view === "forgot") {
    return (
      <div className="ls-page">
        <div className="ls-bg-blob ls-blob-1" />
        <div className="ls-bg-blob ls-blob-2" />
        <div className="ls-card">
          <Link href="/" className="ls-logo">Noorrix Motors</Link>
          <div className="ls-forgot-icon-wrap">
            <FiMail className="ls-forgot-big-icon" />
          </div>
          <h1 className="ls-heading">Forgot Password?</h1>
          <p className="ls-subheading">
            Enter your email and we'll send you a reset link
          </p>
          <form onSubmit={handleForgotSubmit} className="ls-form">
            <div className="ls-field">
              <span className="ls-field-icon"><FiMail /></span>
              <input
                className={`ls-input${errors.resetEmail ? " ls-input-error" : ""}`}
                type="email"
                name="resetEmail"
                placeholder="Email Address"
                value={form.resetEmail}
                onChange={handleChange}
                required
              />
            </div>
            {errors.resetEmail && <p className="ls-error">{errors.resetEmail}</p>}
            <button type="submit" className="ls-submit-btn" disabled={loading}>
              {loading ? "Sending…" : "Send Reset Link"}
              {!loading && <span className="ls-submit-arrow">→</span>}
            </button>
          </form>
          <button className="ls-back-btn" onClick={backToLogin}>
            <FiArrowLeft /> Back to Login
          </button>
        </div>
      </div>
    );
  }

  if (view === "forgot-sent") {
    return (
      <div className="ls-page">
        <div className="ls-bg-blob ls-blob-1" />
        <div className="ls-bg-blob ls-blob-2" />
        <div className="ls-card ls-card-center">
          <Link href="/" className="ls-logo">Noorrix Motors</Link>
          <div className="ls-success-icon-wrap">
            <FiCheckCircle className="ls-success-icon" />
          </div>
          <h1 className="ls-heading">Check Your Email</h1>
          <p className="ls-subheading">
            We've sent a password reset link to<br />
            <span className="ls-reset-email">{form.resetEmail}</span>
          </p>
          <p className="ls-reset-note">
            Didn't receive it? Check your spam folder or{" "}
            <button className="ls-resend-btn" onClick={() => setView("forgot")}>
              try again
            </button>
          </p>
          <button className="ls-back-btn" onClick={backToLogin}>
            <FiArrowLeft /> Back to Login
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

        <h1 className="ls-heading">
          {tab === "login" ? "Welcome Back" : "Create Account"}
        </h1>
        <p className="ls-subheading">
          {tab === "login"
            ? "Sign in to your account to continue"
            : "Join thousands of happy customers"}
        </p>

        <div className="ls-tabs">
          <button
            className={`ls-tab${tab === "login" ? " active" : ""}`}
            onClick={() => { setTab("login"); setErrors({}); }}
          >
            Login
          </button>
          <button
            className={`ls-tab${tab === "signup" ? " active" : ""}`}
            onClick={() => { setTab("signup"); setErrors({}); }}
          >
            Sign Up
          </button>
        </div>

        {errors.general && <p className="ls-error ls-error-general">{errors.general}</p>}

        <form onSubmit={handleSubmit} className="ls-form">
          {tab === "signup" && (
            <>
              <div className="ls-field">
                <span className="ls-field-icon"><FiUser /></span>
                <input
                  className={`ls-input${errors.name ? " ls-input-error" : ""}`}
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              {errors.name && <p className="ls-error">{errors.name}</p>}
            </>
          )}

          <div className="ls-field">
            <span className="ls-field-icon"><FiMail /></span>
            <input
              className={`ls-input${errors.email ? " ls-input-error" : ""}`}
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          {errors.email && <p className="ls-error">{errors.email}</p>}

          <div className="ls-field">
            <span className="ls-field-icon"><FiLock /></span>
            <input
              className={`ls-input${errors.password ? " ls-input-error" : ""}`}
              type={showPwd ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
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
          {errors.password && <p className="ls-error">{errors.password}</p>}

          {tab === "signup" && (
            <>
              <div className="ls-field">
                <span className="ls-field-icon"><FiLock /></span>
                <input
                  className={`ls-input${errors.confirm ? " ls-input-error" : ""}`}
                  type={showConfirm ? "text" : "password"}
                  name="confirm"
                  placeholder="Confirm Password"
                  value={form.confirm}
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
              {errors.confirm && <p className="ls-error">{errors.confirm}</p>}
            </>
          )}

          {tab === "login" && (
            <div className="ls-forgot">
              <button type="button" onClick={() => setView("forgot")}>Forgot password?</button>
            </div>
          )}

          <button type="submit" className="ls-submit-btn" disabled={loading}>
            {loading
              ? tab === "login" ? "Signing in…" : "Creating account…"
              : tab === "login" ? "Sign In" : "Create Account"}
            {!loading && <span className="ls-submit-arrow">→</span>}
          </button>
        </form>

        <div className="ls-divider">
          <span className="ls-divider-line" />
          <span className="ls-divider-text">or</span>
          <span className="ls-divider-line" />
        </div>

        <div className="ls-switch">
          {tab === "login" ? (
            <>
              Don't have an account?{" "}
              <button onClick={() => { setTab("signup"); setErrors({}); }}>Create one free →</button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button onClick={() => { setTab("login"); setErrors({}); }}>Sign in →</button>
            </>
          )}
        </div>

        <p className="ls-footer-note">
          By continuing, you agree to our{" "}
          <Link href="/terms-of-use">Terms</Link> &{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
}
