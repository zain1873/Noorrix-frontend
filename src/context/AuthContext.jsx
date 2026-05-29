"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

/**
 * Lightweight auth state shared across the app.
 *
 * The login/signup screen stores the JWT (`access` / `refresh`) in localStorage
 * (see LoginSignup). Here we also keep a small `user` object ({ name, email })
 * so the Navbar can show the logged-in person's name instead of a Login button.
 */
const AuthContext = createContext(null);

function readUser() {
  try {
    const token = localStorage.getItem("access");
    if (!token) return null;
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : { name: "", email: "" };
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setUser(readUser());
    setHydrated(true);

    // Keep auth in sync across tabs / windows.
    const onStorage = (e) => {
      if (e.key === "access" || e.key === "user" || e.key === null) {
        setUser(readUser());
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const login = useCallback((u) => {
    try {
      localStorage.setItem("user", JSON.stringify(u));
    } catch {
      /* ignore */
    }
    setUser(u);
  }, []);

  const logout = useCallback(() => {
    try {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("user");
    } catch {
      /* ignore */
    }
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
  // Soft fallback so a stray component never crashes if rendered outside the provider.
  return ctx || { user: null, hydrated: true, login: () => {}, logout: () => {} };
}

/** Short, friendly name for the navbar (first name, else the email handle). */
export function getDisplayName(user) {
  if (!user) return "";
  if (user.name && user.name.trim()) return user.name.trim().split(" ")[0];
  if (user.email) return user.email.split("@")[0];
  return "Account";
}

/**
 * Returns the destination for an action that requires login.
 * If logged in -> the real destination; otherwise -> the login page with a
 * returnTo so the user is brought back after authenticating.
 */
export function loginGate(user, destination) {
  return user ? destination : `/login?returnTo=${encodeURIComponent(destination)}`;
}
