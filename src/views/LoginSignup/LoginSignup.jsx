"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff, FiCheckCircle } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import "./LoginSignup.css";

// const API = process.env.NEXT_PUBLIC_API_URL;

// Only allow same-site relative paths as a post-login redirect (avoids open redirects).
function safeReturnTo() {
  if (typeof window === "undefined") return "/";
  const target = new URLSearchParams(window.location.search).get("returnTo");
  return target && target.startsWith("/") && !target.startsWith("//") ? target : "/";
}

function PasswordHints({ password }) {
  if (!password) return null;
  const minLen = password.length >= 8;
  const notNumeric = !/^\d+$/.test(password);
  // Only render when at least one checkable rule is failing
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

export default function LoginSignup() {
  const router = useRouter();
  const { login } = useAuth();

  const [tab, setTab] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [resetSuccess, setResetSuccess] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("reset") === "success") {
      setResetSuccess(true);
      window.history.replaceState({}, "", "/login");
    }
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResetSuccess(false);
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
          login({ name: data.name || "", email: data.email || form.email }, { access: data.access, refresh: data.refresh });
          router.push(safeReturnTo());
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
          const tokenRes = await fetch(`${API}/api/v1/auth/token/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: form.email, password: form.password }),
          });
          if (tokenRes.ok) {
            const tokens = await tokenRes.json();
            login({ name: form.name, email: form.email }, { access: tokens.access, refresh: tokens.refresh });
            router.push(safeReturnTo());
          } else {
            router.push("/login");
          }
        } else {
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

        {resetSuccess && (
          <div className="ls-error ls-error-general" style={{ color: "#4caf82", borderColor: "rgba(76,175,130,0.3)", background: "rgba(76,175,130,0.08)" }}>
            <FiCheckCircle style={{ marginRight: 6, verticalAlign: "middle" }} />
            Password reset successfully. Please sign in.
          </div>
        )}
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
              <PasswordHints password={form.password} />

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
              <button type="button" onClick={() => router.push("/forgot-password")}>
                Forgot password?
              </button>
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
              Don&apos;t have an account?{" "}
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
