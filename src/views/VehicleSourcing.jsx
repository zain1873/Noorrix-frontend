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

export default function VehicleSourcing() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    make: "",
    model: "",
    year: "",
    mileage: "",
    budget: "",
    notes: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => e.preventDefault();

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
              or <a href="tel:07435761085" className="vs-info-phone">07435 761085</a>{" "}
              or complete the sourcing request form below.
            </p>
            <p className="vs-info-text">
              We will contact you as soon as possible with the best available options for your requirements.
            </p>

            {/* Sourcing Form */}
            <div className="vs-form-wrapper" id="sourcing-form">
              <h4 className="vs-form-title">Vehicle Sourcing Form</h4>
              <form className="vs-form" onSubmit={handleSubmit}>
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
                    />
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
                    />
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
                  />
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
                    />
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
                    />
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
                    />
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
                    />
                  </div>
                </div>
                <div className="vs-form-group">
                  <label className="vs-form-label">Budget</label>
                  <select
                    className="vs-form-select"
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                  >
                    <option value="">Select your budget</option>
                    {budgetOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div className="vs-form-group">
                  <label className="vs-form-label">Additional Requirements</label>
                  <textarea
                    className="vs-form-textarea"
                    name="notes"
                    placeholder="Colour preference, trim level, must-have features..."
                    value={form.notes}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="vs-form-submit">
                  SUBMIT SOURCING REQUEST
                </button>
              </form>
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
