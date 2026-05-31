"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import "./AuthGuard.css";

/**
 * Paths that do not require authentication.
 * Extend this list if you want browsing pages to be publicly accessible.
 */
const PUBLIC_PATHS = [
  "/login",
  "/forgot-password",
  "/reset-password",
];

function isPublic(pathname) {
  return PUBLIC_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );
}

/**
 * Wraps the entire app (inside AuthProvider) and redirects unauthenticated
 * users to /login when they try to access a protected route.
 *
 * While the initial auth check (token refresh) is in progress:
 *   - Public routes render immediately.
 *   - Protected routes show a loading spinner.
 *
 * After the check:
 *   - Authenticated users see the page normally.
 *   - Unauthenticated users on protected routes are redirected to /login
 *     with a returnTo parameter so they come back after signing in.
 */
export default function AuthGuard({ children }) {
  const { hydrated, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const pub = isPublic(pathname);

  useEffect(() => {
    if (!hydrated || pub) return;
    if (!user) {
      router.replace(`/login?returnTo=${encodeURIComponent(pathname)}`);
    }
  }, [hydrated, user, pub, pathname, router]);

  // Public paths render immediately without waiting for the auth check.
  if (pub) return children;

  // Protected paths: wait for the token check to finish.
  if (!hydrated) return <div className="auth-guard-loader" />;

  // Redirect is in progress — render nothing to avoid a content flash.
  if (!user) return null;

  return children;
}
