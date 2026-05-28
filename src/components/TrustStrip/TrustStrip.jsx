"use client";
import { useState, useEffect } from "react";
import "./TrustStrip.css";

/* ─── Data ───────────────────────────────────────────────────── */
const TRUST_ITEMS = [
  {
    id: 1,
    badge: "✔ verified",
    line1: "Insurance",
    line2: "Assistance",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    id: 2,
    badge: "✔ certified",
    line1: "Factory-Matched",
    line2: "Paint",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="3.5" fill="currentColor" opacity="0.2" stroke="none" />
        <path d="M12 3v2M12 19v2M3 12h2M19 12h2" />
      </svg>
    ),
  },
  {
    id: 3,
    badge: "✔ qualified",
    line1: "Expert",
    line2: "Technicians",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-3.8 3.6-7 8-7s8 3.2 8 7" />
      </svg>
    ),
  },
  {
    id: 4,
    badge: "✔ guaranteed",
    line1: "Fast",
    line2: "Turnaround",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </svg>
    ),
  },
  {
    id: 5,
    badge: "✔ included",
    line1: "Warranty",
    line2: "on Repairs",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
      </svg>
    ),
  },
];

/* ─── TrustItem ──────────────────────────────────────────────── */
function TrustItem({ item, index, visible }) {
  return (
    <div
      className={`ts-item${visible ? " ts-item--visible" : ""}`}
      style={{ transitionDelay: visible ? `${index * 0.1 + 0.15}s` : "0s" }}
      role="listitem"
    >
      <div className="ts-icon" aria-hidden="true">
        {item.icon}
      </div>
      <div className="ts-text">
        <span className="ts-badge">{item.badge}</span>
        <span className="ts-label">
          {item.line1}
          <br />
          {item.line2}
        </span>
      </div>
    </div>
  );
}

/* ─── TrustStrip ─────────────────────────────────────────────── */
export default function TrustStrip() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="ts-page">
      <section className="ts-section" aria-label="Our guarantees">

        {/* Ambient glow blobs */}
        <div className="ts-glow ts-glow--left" aria-hidden="true" />
        <div className="ts-glow ts-glow--right" aria-hidden="true" />

        {/* Strip */}
        <div className="ts-strip" role="list">
          {TRUST_ITEMS.map((item, i) => (
            <>
              <TrustItem
                key={item.id}
                item={item}
                index={i}
                visible={visible}
              />
              {i < TRUST_ITEMS.length - 1 && (
                <div key={`divider-${item.id}`} className="ts-divider" aria-hidden="true" />
              )}
            </>
          ))}
        </div>

      </section>
    </div>
  );
}