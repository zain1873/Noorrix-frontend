"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

const API = process.env.NEXT_PUBLIC_API_URL;

// ─── Module-level token store ─────────────────────────────────────────────────
// Access token lives in memory only — lost on page reload by design.
// Refresh token lives in localStorage so sessions survive reload.

let _accessToken = null;
let _onLogout = null; // registered by AuthProvider; called by attemptRefresh on hard failure

export const getAccessToken = () => _accessToken;

/**
 * Silently exchange the stored refresh token for a new access token.
 * Called by AuthProvider on mount and by apiFetch when it receives a 401.
 * Returns the new access token on success, or null on failure (triggering logout).
 */
export async function attemptRefresh() {
  try {
    const refresh =
      typeof localStorage !== "undefined" && localStorage.getItem("refresh");
    if (!refresh) throw new Error("no_refresh");

    const res = await fetch(`${API}/api/v1/auth/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    });

    if (res.ok) {
      const { access } = await res.json();
      _accessToken = access;
      return access;
    }
    throw new Error("refresh_failed");
  } catch {
    _accessToken = null;
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem("refresh");
      localStorage.removeItem("user");
    }
    _onLogout?.();
    return null;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext(null);

function readStoredUser() {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Register the React logout callback for module-level use (apiFetch / attemptRefresh).
    _onLogout = () => setUser(null);

    const refresh = localStorage.getItem("refresh");
    if (!refresh) {
      setHydrated(true);
      return;
    }

    // Exchange refresh token for a fresh access token on every page load.
    attemptRefresh().then((access) => {
      setUser(access ? readStoredUser() : null);
      setHydrated(true);
    });
  }, []);

  // Keep auth state in sync across browser tabs.
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "refresh" || e.key === "user" || e.key === null) {
        const hasRefresh = !!localStorage.getItem("refresh");
        if (!hasRefresh) {
          _accessToken = null;
          setUser(null);
        } else {
          setUser(readStoredUser());
        }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  /**
   * Called after a successful login.
   * @param {{ name: string, email: string }} u
   * @param {{ access: string, refresh: string }} tokens
   */
  const login = useCallback((u, { access, refresh }) => {
    _accessToken = access;
    try {
      localStorage.setItem("refresh", refresh);
      localStorage.setItem("user", JSON.stringify(u));
    } catch {}
    setUser(u);
  }, []);

  const logout = useCallback(() => {
    _accessToken = null;
    try {
      localStorage.removeItem("refresh");
      localStorage.removeItem("user");
    } catch {}
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, hydrated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  return ctx || { user: null, hydrated: true, login: () => {}, logout: () => {} };
}

/** Short, friendly display name for the navbar. */
export function getDisplayName(user) {
  if (!user) return "";
  if (user.name?.trim()) return user.name.trim().split(" ")[0];
  if (user.email) return user.email.split("@")[0];
  return "Account";
}

/**
 * Returns the destination for an action that requires login.
 * Unauthenticated users are sent to /login with a returnTo parameter.
 */
export function loginGate(user, destination) {
  return user ? destination : `/login?returnTo=${encodeURIComponent(destination)}`;
}
