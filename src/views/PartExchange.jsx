"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  FaExchangeAlt,
  FaCheckCircle,
  FaMoneyBillWave,
  FaHandshake,
  FaFileContract,
  FaCalculator,
  FaPhoneAlt,
} from "react-icons/fa";
import Navbar from "../components/Navbar/Navbar";
import NoorrixFooter from "../components/Footer/Footer";
import VehicleSidebar from "../components/VehicleSidebar/VehicleSidebar";
import "./PartExchange.css";

export default function PartExchange() {
  const [form, setForm] = useState({
    name: "", phone: "", email: "", make: "", model: "", year: "", mileage: "",
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
          <span className="text-gray-900 font-medium">Part Exchange</span>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="pe-hero">
        <div
          className="pe-hero-bg"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1920&q=80)` }}
        />
        <div className="pe-hero-overlay" />
        <div className="pe-hero-top-accent" />
        <div className="pe-hero-glow" />
        <div className="pe-hero-container">
          <span className="pe-hero-tag">Part Exchange</span>
          <h1 className="pe-hero-title">
            Trade In Your Vehicle, <span>Drive Away Happy</span>
          </h1>
          <p className="pe-hero-subtitle">
            Our dedicated team of vehicle valuation experts are ready to give you an up-to-the-minute market value of your car.
          </p>
          <div className="pe-hero-buttons">
            <a href="#valuation-form" className="pe-hero-btn pe-hero-btn-primary">
              <FaCalculator size={16} /> Get Free Quote
            </a>
            <Link href="/cars" className="pe-hero-btn pe-hero-btn-secondary">
              <FaExchangeAlt size={16} /> Browse Cars
            </Link>
          </div>
        </div>
      </section>

      {/* Info + Sidebar Section */}
      <section className="pe-info-sidebar-section">
        <div className="pe-info-sidebar-container">

          {/* Left: Content + Valuation Form */}
          <div className="pe-info-main">
            <p className="pe-info-peace">
              <strong>Our dedicated team of vehicle valuation experts are ready to give you an up-to-the-minute market value of your car.</strong>
            </p>

            <h3 className="pe-info-quote-title">Free Quote</h3>

            <p className="pe-info-text">
              If you are considering part exchanging your current vehicle we are able to provide you with a free, no-obligation quote.
            </p>
            <p className="pe-info-text">
              Please contact one of our Sales Consultants on{" "}
              <a href="tel:07300503113" className="pe-info-phone">07300 503113</a>{" "}
              or complete our valuation form below.
            </p>
            <p className="pe-info-text">
              We will contact you as soon as possible with the best possible price for your car.
            </p>

            {/* Valuation Form */}
            <div className="pe-form-wrapper" id="valuation-form">
              <h4 className="pe-form-title">Vehicle Valuation Form</h4>
              <form className="pe-form" onSubmit={handleSubmit}>
                <div className="pe-form-row">
                  <div className="pe-form-group">
                    <label className="pe-form-label">Full Name</label>
                    <input
                      className="pe-form-input"
                      type="text"
                      name="name"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="pe-form-group">
                    <label className="pe-form-label">Phone Number</label>
                    <input
                      className="pe-form-input"
                      type="tel"
                      name="phone"
                      placeholder="Your phone number"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="pe-form-group">
                  <label className="pe-form-label">Email Address</label>
                  <input
                    className="pe-form-input"
                    type="email"
                    name="email"
                    placeholder="Your email address"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="pe-form-row">
                  <div className="pe-form-group">
                    <label className="pe-form-label">Vehicle Make</label>
                    <input
                      className="pe-form-input"
                      type="text"
                      name="make"
                      placeholder="e.g. Ford"
                      value={form.make}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="pe-form-group">
                    <label className="pe-form-label">Vehicle Model</label>
                    <input
                      className="pe-form-input"
                      type="text"
                      name="model"
                      placeholder="e.g. Focus"
                      value={form.model}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="pe-form-row">
                  <div className="pe-form-group">
                    <label className="pe-form-label">Year</label>
                    <input
                      className="pe-form-input"
                      type="text"
                      name="year"
                      placeholder="e.g. 2020"
                      value={form.year}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="pe-form-group">
                    <label className="pe-form-label">Mileage</label>
                    <input
                      className="pe-form-input"
                      type="text"
                      name="mileage"
                      placeholder="e.g. 35,000"
                      value={form.mileage}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <button type="submit" className="pe-form-submit">
                  GET MY VALUATION
                </button>
              </form>
            </div>
          </div>

          {/* Right: Sidebar */}
          <VehicleSidebar />

        </div>
      </section>

      {/* CTA */}
      <section className="pe-cta">
        <div
          className="pe-cta-bg"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&q=80)` }}
        />
        <div className="pe-cta-overlay" />
        <div className="pe-cta-glow" />
        <div className="pe-cta-container">
          <span className="pe-cta-tag">Get Your Free Valuation</span>
          <h2 className="pe-cta-title">
            Ready to <span>Upgrade Your Car?</span>
          </h2>
          <p className="pe-cta-subtitle">
            Get your vehicle valued today and find your perfect next car. Our team is ready to help you make the switch hassle-free.
          </p>
          <div className="pe-cta-buttons">
            <a href="#valuation-form" className="pe-cta-btn pe-cta-btn-primary">
              <FaCalculator size={16} /> Get Free Estimate
            </a>
            <Link href="/contact" className="pe-cta-btn pe-cta-btn-secondary">
              <FaPhoneAlt size={16} /> Contact Us
            </Link>
          </div>
        </div>
      </section>

      <NoorrixFooter />
    </>
  );
}
