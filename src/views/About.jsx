"use client";
import React from "react";
const aboutBanner = "/assets/images/banners/about-banner.jpg";
import {
  FaShieldAlt,
  FaHandshake,
  FaStar,
  FaCar,
  FaUsers,
  FaClipboardCheck,
  FaClipboardList,
  FaPhoneAlt,
  FaCheck,
} from "react-icons/fa";
import Navbar from "../components/Navbar/Navbar";
import NoorrixFooter from "../components/Footer/Footer";
import "./About.css";

// ─── Values Data ─────────────────────────────────────────────────────────────
const companyValues = [
  {
    icon: <FaShieldAlt />,
    title: "Trust & Transparency",
    description:
      "We believe in honest, no-hidden-fees dealings. Every customer receives clear communication and full transparency throughout their journey with us.",
  },
  {
    icon: <FaStar />,
    title: "Quality Assurance",
    description:
      "Every vehicle we sell undergoes rigorous inspection and preparation. We never compromise on quality, ensuring your car meets the highest standards.",
  },
  {
    icon: <FaHandshake />,
    title: "Customer First",
    description:
      "Your satisfaction drives everything we do. From the moment you walk in to long after you drive away, we're here to support you at every step.",
  },
  {
    icon: <FaCar />,
    title: "Extensive Selection",
    description:
      "With a diverse range of vehicles from hatchbacks to luxury SUVs, we help you find the perfect car that matches your lifestyle and budget.",
  },
  {
    icon: <FaUsers />,
    title: "Expert Team",
    description:
      "Our experienced professionals bring decades of automotive expertise. Knowledgeable, friendly, and dedicated to finding the right solution for you.",
  },
  {
    icon: <FaClipboardCheck />,
    title: "After-Sales Support",
    description:
      "Our commitment doesn't end at sale. We provide comprehensive after-sales care, servicing support, and ongoing assistance to keep you on the road.",
  },
];

// ─── Timeline Data ───────────────────────────────────────────────────────────
const journeyMilestones = [
  {
    year: "2012",
    number: "01",
    heading: "The Beginning",
    description:
      "Noorrix Motors was founded with a simple vision — to provide quality used cars with honest, transparent service. What started as a small operation quickly gained a reputation for reliability.",
  },
  {
    year: "2015",
    number: "02",
    heading: "Growing Our Inventory",
    description:
      "As demand grew, we expanded our showroom and diversified our inventory to include a wider range of makes and models, catering to more drivers across the region.",
  },
  {
    year: "2018",
    number: "03",
    heading: "Expanding Services",
    description:
      "We launched additional services including vehicle sourcing, part exchange, and professional dent & paint repair, becoming a one-stop destination for car buyers.",
  },
  {
    year: "2021",
    number: "04",
    heading: "Digital Transformation",
    description:
      "Embracing modern technology, we revamped our online presence with a user-friendly website, virtual tours, and digital financing options for a seamless buying experience.",
  },
  {
    year: "2024",
    number: "05",
    heading: "Trusted by Thousands",
    description:
      "Today, Noorrix Motors is a trusted name with thousands of satisfied customers, hundreds of vehicles sold, and a growing team dedicated to automotive excellence.",
  },
];

function About() {
  return (
    <>
      <Navbar />

      {/* ── Breadcrumb ── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3 text-sm">
          <a
            href="/"
            className="breadcrumb text-gray-500 hover:text-blue-600 transition-colors"
          >
            Home
          </a>
          <span className="mx-2 text-gray-300">›</span>
          <span className="text-gray-900 font-medium">About Us</span>
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════════════
          HERO BANNER
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="about-hero">
        {/* Background Image */}
        <div
          className="about-hero-bg"
          style={{
            backgroundImage:
              `url(${aboutBanner})`,
          }}
        />

        {/* Dark Overlay */}
        <div className="about-hero-overlay" />

        {/* Top Gradient Accent */}
        <div className="about-hero-top-accent" />

        {/* Bottom Glow */}
        <div className="about-hero-glow" />

        {/* Content */}
        <div className="about-hero-container">
          <span className="about-hero-tag">About Noorrix Motors</span>

          <h1 className="about-hero-title">
            Your Trusted Partner in <span>Quality Cars</span>
          </h1>
          <p className="about-hero-subtitle" style={{ marginTop: "1rem" }}>
            Noorrix Motors Ltd is a trusted UK used car dealership offering quality vehicles, transparent pricing, expert sourcing, warranty, delivery, and professional automotive repair services with exceptional customer care.
          </p>

          <div className="about-hero-buttons">
            <a href="/stock" className="about-hero-btn about-hero-btn-primary">
              <FaCar size={18} />
              Browse Our Stock
            </a>
            <a
              href="/contact"
              className="about-hero-btn about-hero-btn-secondary"
            >
              <FaPhoneAlt size={18} />
              Get in Touch
            </a>
          </div>

          {/* Hero Stats */}
          <div className="about-hero-stats">
            <div className="about-hero-stat-item">
              <span className="about-hero-stat-number">
                500<span>+</span>
              </span>
              <span className="about-hero-stat-label">Cars Sold</span>
            </div>
            <div className="about-hero-stat-item">
              <span className="about-hero-stat-number">
                98<span>%</span>
              </span>
              <span className="about-hero-stat-label">Satisfaction</span>
            </div>
            <div className="about-hero-stat-item">
              <span className="about-hero-stat-number">
                12<span>+</span>
              </span>
              <span className="about-hero-stat-label">Years Experience</span>
            </div>
            <div className="about-hero-stat-item">
              <span className="about-hero-stat-number">
                1K<span>+</span>
              </span>
              <span className="about-hero-stat-label">Happy Customers</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════
          OUR STORY SECTION
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="about-story-section">
        <div className="about-story-container">
          <div className="about-story-grid">
            {/* Left — Image */}
            <div className="about-story-image-wrapper">
              <img
                className="about-story-image"
                src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80"
                alt="Noorrix Motors Showroom"
              />
              <div className="about-story-image-accent" />
              <div className="about-story-badge">
                <span className="about-story-badge-number">12+</span>
                <span className="about-story-badge-text">
                  Years of <br />
                  Excellence
                </span>
              </div>
            </div>

            {/* Right — Content */}
            <div className="about-story-content">
              <span className="about-story-tag">Our Story</span>

              <h2 className="about-story-title">
                Driven by Passion, <span>Built on Trust</span>
              </h2>

              <div className="about-story-accent-bar" />

              <p className="about-story-text">
                Noorrix Motors was born from a simple belief — that buying a
                used car should be exciting, not stressful. Since our founding,
                we have been dedicated to changing the way people buy cars by
                prioritising honesty, quality, and customer care above all
                else.
              </p>

              <p className="about-story-text">
                Every vehicle on our lot is carefully selected, thoroughly
                inspected, and prepared to the highest standards. We don't
                just sell cars — we build lasting relationships with our
                customers, helping them find the perfect vehicle for their
                needs and budget.
              </p>

              <div className="about-story-features">
                <div className="about-story-feature-item">
                  <span className="about-story-feature-check">
                    <FaCheck />
                  </span>
                  HPI Checked Vehicles
                </div>
                <div className="about-story-feature-item">
                  <span className="about-story-feature-check">
                    <FaCheck />
                  </span>
                  Full Service History
                </div>
                <div className="about-story-feature-item">
                  <span className="about-story-feature-check">
                    <FaCheck />
                  </span>
                  Finance Available
                </div>
                <div className="about-story-feature-item">
                  <span className="about-story-feature-check">
                    <FaCheck />
                  </span>
                  Part Exchange Welcome
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════
          VALUES & MISSION SECTION
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="about-values-section">
        <div className="about-values-container">
          {/* Header */}
          <div className="about-values-header">
            <span className="about-values-tag">Our Values</span>
            <h2 className="about-values-title">
              What <span>Drives Us</span> Every Day
            </h2>
            <p className="about-values-subtitle">
              Our core values shape everything we do — from how we treat our
              customers to how we select and prepare every vehicle.
            </p>
            <div className="about-values-accent-bar" />
          </div>

          {/* Values Grid */}
          <div className="about-values-grid">
            {companyValues.map((value, index) => (
              <div className="about-value-card" key={index}>
                <div className="about-value-icon">{value.icon}</div>
                <h3 className="about-value-title">{value.title}</h3>
                <p className="about-value-desc">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════
          OUR JOURNEY / TIMELINE
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="about-journey-section">
        <div className="about-journey-container">
          {/* Header */}
          <div className="about-journey-header">
            <span className="about-journey-tag">Our Journey</span>
            <h2 className="about-journey-title">
              From Humble Beginnings to <span>Trusted Name</span>
            </h2>
            <div className="about-journey-accent-bar" />
          </div>

          {/* Timeline */}
          <div className="about-timeline">
            {journeyMilestones.map((milestone) => (
              <div className="about-timeline-item" key={milestone.number}>
                <div className="about-timeline-dot">{milestone.number}</div>
                <div className="about-timeline-content">
                  <p className="about-timeline-year">{milestone.year}</p>
                  <h3 className="about-timeline-heading">
                    {milestone.heading}
                  </h3>
                  <p className="about-timeline-desc">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════
          FINAL CTA BANNER
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="about-cta-section">
        {/* Background */}
        <div
          className="about-cta-bg"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1600&q=80')",
          }}
        />

        {/* Overlay */}
        <div className="about-cta-overlay" />

        {/* Top Accent */}
        <div className="about-cta-top-accent" />

        {/* Glow */}
        <div className="about-cta-glow" />

        {/* Content */}
        <div className="about-cta-container">
          <span className="about-cta-tag">Get in Touch</span>

          <h2 className="about-cta-title">
            Ready to Find Your <span>Perfect Car</span>?
          </h2>

          <p className="about-cta-subtitle">
            Visit our showroom, browse our latest stock online, or speak with
            one of our friendly team members today.
          </p>

          <div className="about-cta-buttons">
            <a
              href="/stock"
              className="about-cta-btn about-cta-btn-primary"
            >
              <FaClipboardList size={18} />
              View Our Stock
            </a>
            <a
              href="/contact"
              className="about-cta-btn about-cta-btn-secondary"
            >
              <FaPhoneAlt size={18} />
              Contact Us
            </a>
          </div>
        </div>
      </section>

      <NoorrixFooter />
    </>
  );
}

export default About;