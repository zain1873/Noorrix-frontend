"use client";
import React from "react";
import { FaCheckCircle, FaClock, FaTools, FaPaperPlane } from "react-icons/fa";
import "./EstimateForm.css";

const EstimateForm = () => {
  return (
    <section className="estimate-section sp">
      <div className="estimate-container">
        {/* ── Left Side: Content ── */}
        <div className="estimate-left">
          <span className="estimate-tag">Get a Quote</span>
          <h2 className="estimate-heading">
            Get a Free <span>Damage Estimate</span>
          </h2>
          <p className="estimate-text">
            Upload photos of your vehicle damage and our team will contact you
            with a repair estimate.
          </p>

          <div className="estimate-benefits">
            <div className="estimate-benefit">
              <span className="estimate-benefit-icon">
                <FaCheckCircle />
              </span>
              Free, no-obligation quote
            </div>
            <div className="estimate-benefit">
              <span className="estimate-benefit-icon">
                <FaClock />
              </span>
              Fast response within 24 hours
            </div>
            <div className="estimate-benefit">
              <span className="estimate-benefit-icon">
                <FaTools />
              </span>
              Expert assessment by certified technicians
            </div>
          </div>
        </div>

        {/* ── Right Side: Form ── */}
        <div className="estimate-form-card">
          <h3 className="estimate-form-title">Request Your Estimate</h3>

          <form className="estimate-form">
            {/* Full Name + Phone */}
            <div className="estimate-row">
              <div className="estimate-field">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  placeholder="e.g. John Smith"
                  required
                />
              </div>
              <div className="estimate-field">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="e.g. +971 50 123 4567"
                  required
                />
              </div>
            </div>

            {/* Email + Vehicle */}
            <div className="estimate-row">
              <div className="estimate-field">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="e.g. john@email.com"
                  required
                />
              </div>
              <div className="estimate-field">
                <label htmlFor="vehicle">Vehicle Make & Model</label>
                <input
                  type="text"
                  id="vehicle"
                  placeholder="e.g. BMW 3 Series"
                  required
                />
              </div>
            </div>

            {/* Service Needed */}
            <div className="estimate-field">
              <label htmlFor="service">Service Needed</label>
              <select id="service" required>
                <option value="">Select a service…</option>
                <option value="dent-repair">Dent Repair</option>
                <option value="scratch-repair">Scratch Repair</option>
                <option value="full-paint">Full Paint Job</option>
                <option value="bumper-repair">Bumper Repair</option>
                <option value="color-matching">Color Matching</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Upload Photos */}
            <div className="estimate-field">
              <label htmlFor="photos">Upload Photos</label>
              <input
                type="file"
                id="photos"
                accept="image/*"
                multiple
              />
            </div>

            {/* Additional Notes */}
            <div className="estimate-field">
              <label htmlFor="notes">Additional Notes</label>
              <textarea
                id="notes"
                placeholder="Describe the damage or any specific concerns…"
              />
            </div>

            {/* Submit */}
            <button type="submit" className="estimate-btn">
              <FaPaperPlane />
              Request Estimate
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EstimateForm;