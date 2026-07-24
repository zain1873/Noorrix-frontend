"use client";
import React from "react";
import Link from "next/link";
import {
  FaShieldAlt,
  FaTools,
  FaSlidersH,
  FaHandshake,
  FaPhoneAlt,
  FaClipboardList,
} from "react-icons/fa";
import Navbar from "../components/Navbar/Navbar";
import NoorrixFooter from "../components/Footer/Footer";
import VehicleSidebar from "../components/VehicleSidebar/VehicleSidebar";
import "./Warranty.css";

const features = [
  {
    icon: FaShieldAlt,
    title: "In-House Customer Support",
    desc: "Support provided directly by Noorrix Motors following your vehicle purchase.",
  },
  {
    icon: FaTools,
    title: "Repair Support",
    desc: "If an issue arises during the warranty period, we may cover repair costs as a goodwill gesture.",
  },
  {
    icon: FaSlidersH,
    title: "Case-by-Case Assessment",
    desc: "Each issue is assessed by our team based on the circumstances and nature of the problem.",
  },
  {
    icon: FaHandshake,
    title: "Dedicated Customer Care",
    desc: "Our team is here to provide support and assistance after your vehicle purchase.",
  },
];

export default function Warranty() {
  return (
    <>
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3 text-sm">
          <Link href="/" className="breadcrumb text-gray-500 transition-colors">
            Home
          </Link>
          <span className="mx-2 text-gray-300">›</span>
          <span className="text-gray-500">Services</span>
          <span className="mx-2 text-gray-300">›</span>
          <span className="text-gray-900 font-medium">Warranty</span>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="wr-hero">
        <div
          className="wr-hero-bg"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=80)`,
          }}
        />
        <div className="wr-hero-overlay" />
        <div className="wr-hero-top-accent" />
        <div className="wr-hero-glow" />
        <div className="wr-hero-container">
          <span className="wr-hero-tag">Vehicle Warranty</span>

          <h1 className="wr-hero-title">
            Drive with <span>Confidence</span>
          </h1>

          <p className="wr-hero-subtitle">
            At Noorrix Motors, we are committed to supporting our customers
            after their vehicle purchase with our in-house customer service
            warranty.
          </p>

          <div className="wr-hero-buttons">
            <a
              href="#warranty-options"
              className="wr-hero-btn wr-hero-btn-primary"
            >
              <FaClipboardList size={16} /> Learn More
            </a>

            <Link href="/contact" className="wr-hero-btn wr-hero-btn-secondary">
              <FaPhoneAlt size={16} /> Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Warranty Options Section */}
      <section className="wr-options" id="warranty-options">
        <div className="wr-options-container">
          {/* Left Image */}
          <div className="wr-options-image">
            <img
              src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80"
              alt="Warranty documentation"
            />
          </div>

          {/* Right Content */}
          <div className="wr-options-content">
            <span className="wr-options-tag">Our Warranty Plans</span>
            <h2 className="wr-options-title">
              Explore Our <span>Warranty Options</span>
            </h2>
            <p className="wr-options-desc">
              At Noorrix Motors, we are committed to providing excellent
              customer service and supporting our customers after their vehicle
              purchase. As part of this commitment, we offer an in-house
              customer service warranty for the first month, and in some cases
              up to three months, following the purchase of a vehicle.
            </p>

            <p className="wr-options-desc">
              If an issue arises with the vehicle during this period, we may
              cover the cost of the required repair as a goodwill gesture,
              subject to our assessment of the issue and the circumstances
              involved.
            </p>

            <p className="wr-options-desc">
              This warranty is an in-house customer service warranty provided
              directly by Noorrix Motors. Any potential repair or support will
              be considered and assessed by our team on a case-by-case basis.
              Our goal is to provide continued support and peace of mind to our
              customers after their purchase.
            </p>

            {/* 2x2 Features Grid */}
            <div className="wr-features-grid">
              {features.map(({ icon: Icon, title, desc }) => (
                <div className="wr-feature-item" key={title}>
                  <div className="wr-feature-icon">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h4 className="wr-feature-title">{title}</h4>
                    <p className="wr-feature-desc">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* In-House Warranty + Sidebar Section */}
      <section className="wr-info-sidebar-section">
        <div className="wr-info-sidebar-container">
          {/* Left: In-House Warranty Content */}
          <div className="wr-info-main">
            <div className="wr-info-peace">
              <h3 className="wr-info-ext-title">Drive with Confidence</h3>
            </div>

            <p className="wr-info-text">
              At Noorrix Motors, we are committed to providing excellent
              customer service and supporting our customers after their vehicle
              purchase. As part of this commitment, we offer an in-house
              customer service warranty for the first month, and in some cases
              up to three months, following the purchase of a vehicle.
            </p>

            <h3 className="wr-info-ext-title">
              Our In-House Customer Service Warranty
            </h3>

            <p className="wr-info-text">
              If an issue arises with the vehicle during this period, we may
              cover the cost of the required repair as a goodwill gesture,
              subject to our assessment of the issue and the circumstances
              involved.
            </p>

            <p className="wr-info-text">
              This is an in-house customer service warranty provided directly by
              Noorrix Motors. Any potential repair or support will be considered
              and assessed by our team on a case-by-case basis.
            </p>

            <p className="wr-info-text">
              Our team is always here to assist you and provide support after
              your vehicle purchase. If you experience an issue during the
              applicable warranty period, please contact us so that we can
              assess the matter and discuss the appropriate next steps.
            </p>
          </div>

          {/* Right: Sidebar */}
          <VehicleSidebar />
        </div>
      </section>

      {/* CTA Section */}
      <section className="wr-cta">
        <div
          className="wr-cta-bg"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&q=80)`,
          }}
        />
        <div className="wr-cta-overlay" />
        <div className="wr-cta-glow" />
        <div className="wr-cta-container">
          <span className="wr-cta-tag">We're Here to Support You</span>

          <h2 className="wr-cta-title">
            Drive with <span>Confidence</span>
          </h2>

          <p className="wr-cta-subtitle">
            Our in-house customer service warranty is designed to provide
            support after your vehicle purchase. If an issue arises during the
            applicable warranty period, our team will assess the matter and
            provide assistance where applicable.
          </p>

          <div className="wr-cta-buttons">
            <a
              href="#warranty-options"
              className="wr-cta-btn wr-cta-btn-primary"
            >
              <FaClipboardList size={16} /> Learn More
            </a>

            <Link href="/contact" className="wr-cta-btn wr-cta-btn-secondary">
              <FaPhoneAlt size={16} /> Contact Us
            </Link>
          </div>
        </div>
      </section>

      <NoorrixFooter />
    </>
  );
}
