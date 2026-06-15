"use client";
import React from "react";
import { FaCalculator, FaClipboardList, FaPhoneAlt } from "react-icons/fa";
import "./CTA.css";

function CTA({
  title = "Get in Touch",
  description = "Contact our friendly team today for expert advice and a free, no-obligation quote.",
  primaryBtnText = "Get Free Estimate",
  primaryBtnLink = "tel:07300503113",
  primaryBtnIcon = <FaCalculator size={18} />,
  secondaryBtnText = "Book Inspection",
  secondaryBtnLink = "tel:07300503113",
  secondaryBtnIcon = <FaClipboardList size={18} />,
  showSecondaryBtn = true,
}) {
  return (
    <section className="cta-section">
      <div className="cta-wrapper">
        <h2 className="cta-title">{title}</h2>
        <p className="cta-description">{description}</p>
        <div className="cta-buttons">
          <a href={primaryBtnLink} className="cta-btn cta-btn-primary">
            {primaryBtnIcon}
            {primaryBtnText}
          </a>
          {showSecondaryBtn && (
            <a href={secondaryBtnLink} className="cta-btn cta-btn-secondary">
              {secondaryBtnIcon}
              {secondaryBtnText}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

export default CTA;