"use client";
import React from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";
import "./LocationContact.css";

const LocationContact = () => {
  return (
    <section className="location-section sp">
      <div className="location-container">
        {/* Header */}
        <div className="location-header">
          <h2 className="location-heading">
            Visit Our <span>Workshop</span>
          </h2>
          <p className="location-subtitle">
            Come see us in person or get in touch — we're always happy to help.
          </p>
          <div className="location-accent-bar" />
        </div>

        {/* Grid */}
        <div className="location-grid">
          {/* ── Left: Google Map ── */}
          <div className="location-map-wrapper">
            <iframe
              title="Noorrix Motors Location"
              src="https://maps.google.com/maps?q=16+Eastside%2C+Cauldwell+Walk%2C+Bedford%2C+MK42+9DT%2C+UK&output=embed"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* ── Right: Contact Details ── */}
          <div className="location-details">
            {/* Address */}
            <div className="location-card">
              <div className="location-card-icon">
                <FaMapMarkerAlt />
              </div>
              <div className="location-card-content">
                <span className="location-card-label">Address</span>
                <span className="location-card-value">
                  16 Eastside, Cauldwell Walk, Bedford MK42 9DT
                </span>
              </div>
            </div>

            {/* Phone */}
            <div className="location-card">
              <div className="location-card-icon">
                <FaPhoneAlt />
              </div>
              <div className="location-card-content">
                <span className="location-card-label">Phone</span>
                <span className="location-card-value">
                  <a href="tel:07300503113">07300 503113</a> (WhatsApp)<br />
                  <a href="tel:07435761085">07435 761085</a>
                </span>
              </div>
            </div>

            {/* Email */}
            <div className="location-card">
              <div className="location-card-icon">
                <FaEnvelope />
              </div>
              <div className="location-card-content">
                <span className="location-card-label">Email</span>
                <span className="location-card-value">
                  <a href="mailto:info@noorrixmotors.co.uk">
                    info@noorrixmotors.co.uk
                  </a>
                </span>
              </div>
            </div>

            {/* Working Hours */}
            <div className="location-card">
              <div className="location-card-icon">
                <FaClock />
              </div>
              <div className="location-card-content">
                <span className="location-card-label">Working Hours</span>
                <span className="location-card-value">
                  Mon – Sat: 9 AM – 8 PM
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationContact;