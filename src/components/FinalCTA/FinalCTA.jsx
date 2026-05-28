"use client";
import React from "react";
import { FaClipboardList, FaPhoneAlt } from "react-icons/fa";
import "./FinalCTA.css";

const FinalCTA = () => {
  return (
    <section className="final-cta">
      {/* Background Image */}
      <div
        className="final-cta-bg"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1600&q=80')",
        }}
      />

      {/* Dark Overlay */}
      <div className="final-cta-overlay" />

      {/* Bottom Glow */}
      <div className="final-cta-glow" />

      {/* Content */}
      <div className="final-cta-container">
        <span className="final-cta-tag">Get Started Today</span>

        <h2 className="final-cta-title">
          Restore Your Car with <span>Confidence</span>
        </h2>

        <p className="final-cta-subtitle">
          Professional dent repair and paint restoration designed to keep your
          car looking its best.
        </p>

        <div className="final-cta-buttons">
          <a href="/contact" className="final-cta-btn final-cta-btn-primary">
            <FaClipboardList size={18} />
            Book Inspection
          </a>
          <a href="tel:+4407930955645" className="final-cta-btn final-cta-btn-secondary">
            <FaPhoneAlt size={18} />
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;