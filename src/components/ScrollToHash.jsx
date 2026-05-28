"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Smooth-scrolls to a #hash anchor after route changes (App Router replacement
// for the react-router ScrollToHash that lived in the old App.js).
export default function ScrollToHash() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    // Small delay lets the new page render before we scroll
    const id = setTimeout(() => {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
    return () => clearTimeout(id);
  }, [pathname]);

  return null;
}
