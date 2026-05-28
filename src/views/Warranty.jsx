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
    title: "Comprehensive Coverage",
    desc: "Protection for major mechanical and electrical parts.",
  },
  {
    icon: FaTools,
    title: "Parts & Labour Included",
    desc: "Approved repairs include parts and labour costs within your plan limits.",
  },
  {
    icon: FaSlidersH,
    title: "Flexible Warranty Options",
    desc: "Choose coverage that fits your vehicle and budget.",
  },
  {
    icon: FaHandshake,
    title: "Trusted Support",
    desc: "Friendly assistance whenever you need help or guidance.",
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
            Protect Your Vehicle with <span>Confidence</span>
          </h1>
          <p className="wr-hero-subtitle">
            Drive away knowing your vehicle is backed by reliable warranty
            protection. Choose the plan that suits your needs and budget.
          </p>
          <div className="wr-hero-buttons">
            <a
              href="#warranty-options"
              className="wr-hero-btn wr-hero-btn-primary"
            >
              <FaClipboardList size={16} /> Explore Plans
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
              Noorrix Motors is committed to providing comprehensive warranty
              coverage tailored to your vehicle and needs. Our range of plans
              offers protection across a wide range of mechanical and electrical
              components.
            </p>
            <p className="wr-options-desc">
              Unexpected repairs can quickly become expensive without proper
              coverage. Our warranty plans protect key parts and come with
              valuable benefits — all supported by our friendly, expert team.
              Drive with confidence knowing your vehicle is in safe hands.
            </p>
            <p className="wr-options-desc">
              We help cover the cost of repairs, including parts, labour, and
              VAT, up to your individual claim limit. Below is a summary of the
              protection we offer.
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
                
      {/* Extended Warranty + Sidebar Section */}
      <section className="wr-info-sidebar-section">
        <div className="wr-info-sidebar-container">
          {/* Left: Extended Warranty Content */}
          <div className="wr-info-main">
            <div className="wr-info-peace">
              <h3 className="wr-info-ext-title">Drive with Confidence</h3>
            </div>
            <p className="wr-info-text">
              Unexpected repairs can happen at any time — our warranty plans
              help protect you from costly repair bills and give you complete
              peace of mind on the road. We offer flexible warranty options
              designed to suit different vehicles and driving needs, with
              coverage available for a wide range of mechanical and electrical
              components.
            </p>
            <h3 className="wr-info-ext-title">Extended Warranty Available</h3>
            <p className="wr-info-text">
              Selected vehicles include a complimentary standard warranty, with
              the option to extend your protection for added confidence and
              long-term peace of mind. There is also the option to purchase a
              more comprehensive product up to a period of 3 years at an
              additional cost.
            </p>
            <p className="wr-info-text">
              Our team will be happy to help you choose the right warranty plan
              for your vehicle. Please call us for a detailed overview of all
              products and services available.
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
          <span className="wr-cta-tag">Get Protected Today</span>
          <h2 className="wr-cta-title">
            Protect Your <span>Vehicle Today</span>
          </h2>
          <p className="wr-cta-subtitle">
            Drive away with added confidence knowing your vehicle is backed by
            reliable warranty protection.
          </p>
          <div className="wr-cta-buttons">
            <a
              href="#warranty-options"
              className="wr-cta-btn wr-cta-btn-primary"
            >
              <FaClipboardList size={16} /> Explore Plans
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
