"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  FaCarSide,
  FaCalculator,
  FaPhoneAlt,
  FaSearch,
} from "react-icons/fa";
import Navbar from "../components/Navbar/Navbar";
import NoorrixFooter from "../components/Footer/Footer";
import VehicleSidebar from "../components/VehicleSidebar/VehicleSidebar";
import { submitVehicleSourcing } from "../lib/vehicleSourcing";
import "./VehicleSourcing.css";

const budgetOptions = [
  "Under £5,000",
  "Under £10,000",
  "Under £15,000",
  "Under £20,000",
  "Under £30,000",
  "Under £50,000",
  "No Maximum",
];

const INITIAL_FORM = {
  name: "",
  phone: "",
  email: "",
  make: "",
  model: "",
  year: "",
  mileage: "",
  budget: "",
  notes: "",
};

export default function VehicleSourcing() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [fieldErrors, setFieldErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) setFieldErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setFieldErrors({});
    setMessage("");

    try {
      const successMessage = await submitVehicleSourcing(form);
      setStatus("success");
      setMessage(successMessage);
      setForm(INITIAL_FORM);
    } catch (err) {
      setStatus("error");
      const errors = err.fieldErrors || {};
      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors);
        setMessage("");
      } else {
        setMessage(err.message || "Something went wrong. Please try again.");
      }
    }
  };

  return (
    <>
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3 text-sm">
          <Link href="/" className="breadcrumb text-gray-500 hover:text-blue-600 transition-colors">Home</Link>
          <span className="mx-2 text-gray-300">›</span>
          <span className="text-gray-500">Services</span>
          <span className="mx-2 text-gray-300">›</span>
          <span className="text-gray-900 font-medium">Vehicle Sourcing</span>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="vs-hero">
        <div
          className="vs-hero-bg"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1920&q=80)` }}
        />
        <div className="vs-hero-overlay" />
        <div className="vs-hero-top-accent" />
        <div className="vs-hero-glow" />
        <div className="vs-hero-container">
          <span className="vs-hero-tag">
            <FaCarSide size={13} />
            Vehicle Sourcing
          </span>
          <h1 className="vs-hero-title">
            Find Your Perfect Car, <span>We Source It For You</span>
          </h1>
          <p className="vs-hero-subtitle">
            Can't find the exact vehicle you're looking for? Our team will search the market on your behalf — auctions, dealerships, and private sellers — to find your perfect match.
          </p>
          <div className="vs-hero-buttons">
            <a href="#sourcing-form" className="vs-hero-btn vs-hero-btn-primary">
              <FaSearch size={16} /> Start Your Search
            </a>
            <a href="tel:07300503113" className="vs-hero-btn vs-hero-btn-secondary">
              <FaPhoneAlt size={16} /> Call Us Now
            </a>
          </div>
        </div>
      </section>

      {/* Info + Sidebar Section */}
      <section className="vs-info-sidebar-section">
        <div className="vs-info-sidebar-container">

          {/* Left: Content + Form */}
          <div className="vs-info-main">
            <p className="vs-info-peace">
              <strong>Our dedicated vehicle sourcing team will find the exact make, model, and specification you're looking for at the best possible price.</strong>
            </p>

            <h3 className="vs-info-quote-title">Vehicle Sourcing Request</h3>

            <p className="vs-info-text">
              If you're struggling to find the right vehicle, we can source it for you from our extensive network of auctions, dealerships, and private sellers.
            </p>
            <p className="vs-info-text">
              Please contact one of our Sales Consultants on{" "}
              <a href="tel:07300503113" className="vs-info-phone">07300 503113</a>{" "}
              or complete the sourcing request form below.
            </p>
            <p className="vs-info-text">
              We will contact you as soon as possible with the best available options for your requirements.
            </p>

            {/* Sourcing Form */}
            <div className="vs-form-wrapper" id="sourcing-form">
              <h4 className="vs-form-title">Vehicle Sourcing Form</h4>

              {status === "success" ? (
                <p className="vs-form-success">{message}</p>
              ) : (
                <form className="vs-form" onSubmit={handleSubmit}>
                  {status === "error" && message && (
                    <p className="vs-form-toast">{message}</p>
                  )}
                  <div className="vs-form-row">
                    <div className="vs-form-group">
                      <label className="vs-form-label">Full Name</label>
                      <input
                        className="vs-form-input"
                        type="text"
                        name="name"
                        placeholder="Your full name"
                        value={form.name}
                        onChange={handleChange}
                        disabled={status === "loading"}
                      />
                      {fieldErrors.name && <p className="vs-field-error">{fieldErrors.name[0]}</p>}
                    </div>
                    <div className="vs-form-group">
                      <label className="vs-form-label">Phone Number</label>
                      <input
                        className="vs-form-input"
                        type="tel"
                        name="phone"
                        placeholder="Your phone number"
                        value={form.phone}
                        onChange={handleChange}
                        disabled={status === "loading"}
                      />
                      {fieldErrors.phone && <p className="vs-field-error">{fieldErrors.phone[0]}</p>}
                    </div>
                  </div>
                  <div className="vs-form-group">
                    <label className="vs-form-label">Email Address</label>
                    <input
                      className="vs-form-input"
                      type="email"
                      name="email"
                      placeholder="Your email address"
                      value={form.email}
                      onChange={handleChange}
                      disabled={status === "loading"}
                    />
                    {fieldErrors.email && <p className="vs-field-error">{fieldErrors.email[0]}</p>}
                  </div>
                  <div className="vs-form-row">
                    <div className="vs-form-group">
                      <label className="vs-form-label">Desired Make</label>
                      <input
                        className="vs-form-input"
                        type="text"
                        name="make"
                        placeholder="e.g. BMW"
                        value={form.make}
                        onChange={handleChange}
                        disabled={status === "loading"}
                      />
                      {fieldErrors.make && <p className="vs-field-error">{fieldErrors.make[0]}</p>}
                    </div>
                    <div className="vs-form-group">
                      <label className="vs-form-label">Desired Model</label>
                      <input
                        className="vs-form-input"
                        type="text"
                        name="model"
                        placeholder="e.g. 3 Series"
                        value={form.model}
                        onChange={handleChange}
                        disabled={status === "loading"}
                      />
                      {fieldErrors.model && <p className="vs-field-error">{fieldErrors.model[0]}</p>}
                    </div>
                  </div>
                  <div className="vs-form-row">
                    <div className="vs-form-group">
                      <label className="vs-form-label">Year</label>
                      <input
                        className="vs-form-input"
                        type="text"
                        name="year"
                        placeholder="e.g. 2020"
                        value={form.year}
                        onChange={handleChange}
                        disabled={status === "loading"}
                      />
                      {fieldErrors.year && <p className="vs-field-error">{fieldErrors.year[0]}</p>}
                    </div>
                    <div className="vs-form-group">
                      <label className="vs-form-label">Max Mileage</label>
                      <input
                        className="vs-form-input"
                        type="text"
                        name="mileage"
                        placeholder="e.g. 40,000"
                        value={form.mileage}
                        onChange={handleChange}
                        disabled={status === "loading"}
                      />
                      {fieldErrors.mileage && <p className="vs-field-error">{fieldErrors.mileage[0]}</p>}
                    </div>
                  </div>
                  <div className="vs-form-group">
                    <label className="vs-form-label">Budget</label>
                    <select
                      className="vs-form-select"
                      name="budget"
                      value={form.budget}
                      onChange={handleChange}
                      disabled={status === "loading"}
                    >
                      <option value="">Select your budget</option>
                      {budgetOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                    {fieldErrors.budget && <p className="vs-field-error">{fieldErrors.budget[0]}</p>}
                  </div>
                  <div className="vs-form-group">
                    <label className="vs-form-label">Additional Requirements</label>
                    <textarea
                      className="vs-form-textarea"
                      name="notes"
                      placeholder="Colour preference, trim level, must-have features..."
                      value={form.notes}
                      onChange={handleChange}
                      disabled={status === "loading"}
                    />
                    {fieldErrors.notes && <p className="vs-field-error">{fieldErrors.notes[0]}</p>}
                  </div>
                  <button type="submit" className="vs-form-submit" disabled={status === "loading"}>
                    {status === "loading" ? "SUBMITTING…" : "SUBMIT SOURCING REQUEST"}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right: Sidebar */}
          <VehicleSidebar />

        </div>
      </section>

      {/* CTA */}
      <section className="vs-cta">
        <div
          className="vs-cta-bg"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&q=80)` }}
        />
        <div className="vs-cta-overlay" />
        <div className="vs-cta-glow" />
        <div className="vs-cta-container">
          <span className="vs-cta-tag">Find Your Dream Car</span>
          <h2 className="vs-cta-title">
            Ready to Find Your <span>Perfect Vehicle?</span>
          </h2>
          <p className="vs-cta-subtitle">
            Let our sourcing experts do the hard work. We'll search the market and bring your perfect car to you.
          </p>
          <div className="vs-cta-buttons">
            <a href="#sourcing-form" className="vs-cta-btn vs-cta-btn-primary">
              <FaCalculator size={16} /> Start Sourcing
            </a>
            <Link href="/contact" className="vs-cta-btn vs-cta-btn-secondary">
              <FaPhoneAlt size={16} /> Contact Us
            </Link>
          </div>
        </div>
      </section>

      <NoorrixFooter />
    </>
  );
}
