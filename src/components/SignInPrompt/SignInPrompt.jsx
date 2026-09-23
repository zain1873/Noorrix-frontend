"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { FaTimes } from "react-icons/fa";
import "./SignInPrompt.css";

/** "Manage your saved adverts" panel — shown to guests instead of saving favourites. */
export function SignInPanel({ returnTo }) {
  const pathname = usePathname();
  const dest = returnTo || pathname || "/";

  return (
    <div className="sip-panel">
      <h3 className="sip-title">Manage your saved adverts</h3>
      <p className="sip-text">Simply sign in or register to manage your saved adverts.</p>
      <a href={`/login?returnTo=${encodeURIComponent(dest)}`} className="sip-btn">
        Sign in / Register
      </a>
    </div>
  );
}

/** Modal wrapper around SignInPanel, opened when a guest taps a heart. */
export default function SignInPrompt({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="sip-overlay"
      onClick={(e) => { e.stopPropagation(); if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="sip-modal" role="dialog" aria-modal="true" aria-label="Sign in to save favourites">
        <button type="button" className="sip-close" onClick={onClose} aria-label="Close">
          <FaTimes size={14} />
        </button>
        <SignInPanel />
      </div>
    </div>
  );
}
