"use client";
import React from "react";
const contactBanner = "/assets/images/banners/contact-banner.jpg";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaPaperPlane,
  FaCar,
  FaClipboardList,
} from "react-icons/fa";
import Navbar from "../components/Navbar/Navbar";
import NoorrixFooter from "../components/Footer/Footer";
import "./Contact.css";

// ─── Contact Info Data ───────────────────────────────────────────────────────
const contactInfo = [
  {
    icon: <FaMapMarkerAlt />,
    title: "Our Location",
    text: "1 Cauldwell Walk, Bedford, MK42 9DT, United Kingdom",
  },
  {
    icon: <FaPhoneAlt />,
    title: "Call Us",
    text: "07930 955 645",
    link: "tel:+4407930955645",
  },
  {
    icon: <FaEnvelope />,
    title: "Email Us",
    text: "info@noorrixmotors.co.uk",
    link: "mailto:info@noorrixmotors.co.uk",
  },
  {
    icon: <FaClock />,
    title: "Opening Hours",
    text: "Mon – Sat: 9:00 AM – 6:00 PM\nSunday: Closed",
  },
];

function Contact() {
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
          <span className="text-gray-900 font-medium">Contact Us</span>
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════════════
          HERO BANNER
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="contact-hero">
        {/* Background Image */}
        <div
          className="contact-hero-bg"
          style={{
            backgroundImage:
              `url(${contactBanner})`,
          }}
        />

        {/* Dark Overlay */}
        <div className="contact-hero-overlay" />

        {/* Top Gradient Accent */}
        <div className="contact-hero-top-accent" />

        {/* Bottom Glow */}
        <div className="contact-hero-glow" />

        {/* Content */}
        <div className="contact-hero-container">
          <span className="contact-hero-tag">Get in Touch</span>

          <h1 className="contact-hero-title">
            We'd Love to <span>Hear From You</span>
          </h1>

          <p className="contact-hero-subtitle">
            Whether you have a question about our vehicles, financing options,
            or just want to say hello — our team is here and ready to help.
          </p>

          <div className="contact-hero-buttons">
            <a href="#contact-form" className="contact-hero-btn contact-hero-btn-primary">
              <FaPaperPlane size={18} />
              Send a Message
            </a>
            <a
              href="tel:+4407930955645"
              className="contact-hero-btn contact-hero-btn-secondary"
            >
              <FaPhoneAlt size={18} />
              Call Us Now
            </a>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════
          CONTACT INFO CARDS
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="contact-info-section">
        <div className="contact-info-container">
          {/* Header */}
          <div className="contact-info-header">
            <span className="contact-info-tag">Contact Information</span>
            <h2 className="contact-info-title">
              How to <span>Reach Us</span>
            </h2>
            <p className="contact-info-subtitle">
              Choose the method that works best for you. We're always happy to
              assist with any questions or enquiries.
            </p>
            <div className="contact-info-accent-bar" />
          </div>

          {/* Info Cards Grid */}
          <div className="contact-info-grid">
            {contactInfo.map((info, index) => (
              <div className="contact-info-card" key={index}>
                <div className="contact-info-icon">{info.icon}</div>
                <h3 className="contact-info-card-title">{info.title}</h3>
                {info.link ? (
                  <a
                    href={info.link}
                    className="contact-info-card-text"
                    style={{ textDecoration: "none" }}
                  >
                    {info.text}
                  </a>
                ) : (
                  <p className="contact-info-card-text">
                    {info.text.split("\n").map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        {i < info.text.split("\n").length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════
          CONTACT FORM SECTION
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="contact-form-section" id="contact-form">
        <div className="contact-form-container">
          <div className="contact-form-grid">
            {/* Left — Info & Details */}
            <div className="contact-form-left">
              <span className="contact-form-left-tag">Send Us a Message</span>

              <h2 className="contact-form-left-title">
                Let's Start a <span>Conversation</span>
              </h2>

              <div className="contact-form-left-accent-bar" />

              <p className="contact-form-left-text">
                Fill in the form and we'll get back to you as soon as possible.
                Whether you're interested in a specific vehicle, need financing
                advice, or want to book a test drive — we're here to help.
              </p>

              <div className="contact-form-details">
                <div className="contact-form-detail-item">
                  <span className="contact-form-detail-icon">
                    <FaPhoneAlt />
                  </span>
                  <span>07435761085</span>
                </div>
                <div className="contact-form-detail-item">
                  <span className="contact-form-detail-icon">
                    <FaEnvelope />
                  </span>
                  <span>info@noorrixmotors.co.uk</span>
                </div>
                <div className="contact-form-detail-item">
                  <span className="contact-form-detail-icon">
                    <FaMapMarkerAlt />
                  </span>
                  <span>1 Cauldwell Walk, Bedford MK429DT</span>
                </div>
                <div className="contact-form-detail-item">
                  <span className="contact-form-detail-icon">
                    <FaClock />
                  </span>
                  <span>Mon – Sat: 9:00 AM – 6:00 PM</span>
                </div>
              </div>
            </div>

            {/* Right — Form */}
            <div className="contact-form-wrapper">
              <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                <div className="contact-form-row">
                  <div className="contact-form-group">
                    <label className="contact-form-label" htmlFor="name">
                      Your Name <span>*</span>
                    </label>
                    <input
                      className="contact-form-input"
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="contact-form-group">
                    <label className="contact-form-label" htmlFor="email">
                      Email Address <span>*</span>
                    </label>
                    <input
                      className="contact-form-input"
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                </div>

                <div className="contact-form-row">
                  <div className="contact-form-group">
                    <label className="contact-form-label" htmlFor="phone">
                      Phone Number
                    </label>
                    <input
                      className="contact-form-input"
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div className="contact-form-group">
                    <label className="contact-form-label" htmlFor="subject">
                      Subject <span>*</span>
                    </label>
                    <input
                      className="contact-form-input"
                      type="text"
                      id="subject"
                      name="subject"
                      placeholder="e.g. Test drive booking"
                      required
                    />
                  </div>
                </div>

                <div className="contact-form-group">
                  <label className="contact-form-label" htmlFor="message">
                    Your Message <span>*</span>
                  </label>
                  <textarea
                    className="contact-form-textarea"
                    id="message"
                    name="message"
                    placeholder="Tell us how we can help you..."
                    required
                  />
                </div>

                <button type="submit" className="contact-form-submit">
                  <FaPaperPlane size={16} />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════
          MAP SECTION
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="contact-map-section">
        <div className="contact-map-container">
          <div className="contact-map-header">
            <span className="contact-map-tag">Find Us</span>
            <h2 className="contact-map-title">
              Visit Our <span>Showroom</span>
            </h2>
            <div className="contact-map-accent-bar" />
          </div>

          <div className="contact-map-wrapper">
            <iframe
              className="contact-map-iframe"
              title="Noorrix Motors Location"
              src="https://maps.google.com/maps?q=1+Cauldwell+Walk%2C+Bedford%2C+MK42+9DT%2C+UK&output=embed"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════
          FINAL CTA BANNER
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="contact-cta-section">
        {/* Background */}
        <div
          className="contact-cta-bg"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1600&q=80')",
          }}
        />

        {/* Overlay */}
        <div className="contact-cta-overlay" />

        {/* Top Accent */}
        <div className="contact-cta-top-accent" />

        {/* Glow */}
        <div className="contact-cta-glow" />

        {/* Content */}
        <div className="contact-cta-container">
          <span className="contact-cta-tag">Not Ready to Call?</span>

          <h2 className="contact-cta-title">
            Browse Our <span>Latest Stock</span>
          </h2>

          <p className="contact-cta-subtitle">
            Explore our full inventory of quality vehicles online. Filter by
            make, model, budget, and more — all from the comfort of your home.
          </p>

          <div className="contact-cta-buttons">
            <a
              href="/stock"
              className="contact-cta-btn contact-cta-btn-primary"
            >
              <FaClipboardList size={18} />
              View Our Stock
            </a>
            <a
              href="/about"
              className="contact-cta-btn contact-cta-btn-secondary"
            >
              <FaCar size={18} />
              Learn About Us
            </a>
          </div>
        </div>
      </section>

      <NoorrixFooter />
    </>
  );
}

export default Contact;