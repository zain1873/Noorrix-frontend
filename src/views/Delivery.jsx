"use client";
import React from "react";
import Link from "next/link";
import {
  FaTruckMoving,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaPhoneAlt,
  FaCar,
  FaCalendarAlt,
  FaHandshake,
  FaLock,
} from "react-icons/fa";
import Navbar from "../components/Navbar/Navbar";
import NoorrixFooter from "../components/Footer/Footer";
import AboutSection from "../components/AboutSection/AboutSection";
import "./Delivery.css";

const services = [
  {
    icon: FaMapMarkerAlt,
    title: "Local Delivery",
    desc: "Fast and free local delivery within our service area. We bring the car directly to you for a test drive or final handover.",
  },
  {
    icon: FaTruckMoving,
    title: "Nationwide Delivery",
    desc: "We arrange delivery anywhere in the UK. Professional, fully insured transport at competitive rates — wherever you are.",
  },
  {
    icon: FaShieldAlt,
    title: "Insured Transport",
    desc: "Every delivery is fully insured for your peace of mind. Your vehicle is protected from our forecourt to your door.",
  },
];

const benefits = [
  {
    icon: FaCar,
    title: "Doorstep Delivery",
    desc: "We deliver your vehicle directly to your home or workplace at a time that suits you.",
  },
  {
    icon: FaCalendarAlt,
    title: "Flexible Scheduling",
    desc: "Choose a delivery date and time that works around your life — weekdays or weekends.",
  },
  {
    icon: FaLock,
    title: "Fully Insured",
    desc: "Complete insurance coverage on every single delivery, so your car is protected throughout.",
  },
  {
    icon: FaHandshake,
    title: "Hassle-Free Handover",
    desc: "Our driver walks you through the car on arrival and handles all the paperwork on the spot.",
  },
];

const steps = [
  {
    number: "01",
    title: "Choose Your Car",
    desc: "Browse our stock and reserve the vehicle you want online or over the phone.",
  },
  {
    number: "02",
    title: "Confirm Delivery",
    desc: "Agree a date and address with our team — we'll take care of the rest.",
  },
  {
    number: "03",
    title: "We Prepare the Car",
    desc: "Your car is fully prepared, valeted, and safety-checked before dispatch.",
  },
  {
    number: "04",
    title: "Delivered to Your Door",
    desc: "Your vehicle arrives on time. We hand over the keys and all documentation.",
  },
];

function Delivery() {
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
          <span className="text-gray-900 font-medium">Delivery</span>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="dl-hero">
        <div
          className="dl-hero-bg"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1920&q=80)` }}
        />
        <div className="dl-hero-overlay" />
        <div className="dl-hero-top-accent" />
        <div className="dl-hero-glow" />
        <div className="dl-hero-container">
          <span className="dl-hero-tag">
            <FaTruckMoving size={13} />
            Vehicle Delivery
          </span>
          <h1 className="dl-hero-title">
            Your New Car, <span>Delivered to Your Door</span>
          </h1>
          <p className="dl-hero-subtitle">
            Reliable, fully insured vehicle delivery anywhere in the UK. We bring your car directly to you — no trips, no hassle, no compromise.
          </p>
          <div className="dl-hero-buttons">
            <Link href="/contact" className="dl-hero-btn dl-hero-btn-primary">
              <FaTruckMoving size={16} /> Arrange Delivery
            </Link>
            <a href="tel:07300503113" className="dl-hero-btn dl-hero-btn-secondary">
              <FaPhoneAlt size={16} /> 07300 503113
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <AboutSection
        image="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=900&q=80&fit=crop"
        tag="Delivery"
        title="Nationwide Vehicle"
        titleHighlight="Delivery Made Simple"
        description="At Noorrix Motors, we bring your new vehicle directly to you. Whether you're local or nationwide, our fully insured delivery service ensures your car arrives safely and on time. Convenient, flexible, and completely hassle-free — that's the Noorrix delivery promise."
        badgeNumber="2,500+"
        badgeLabel="Deliveries Made"
        stats={[
          { number: "2,500+", label: "Deliveries Made" },
          { number: "99%", label: "On Time" },
          { number: "UK Wide", label: "Coverage" },
        ]}
        primaryBtnText="Arrange Delivery"
        primaryBtnLink="/contact"
        secondaryBtnText="View Our Stock"
        secondaryBtnLink="/cars"
      />

      {/* Services Grid */}
      <section className="dl-services">
        <div className="dl-services-inner">
          <span className="dl-section-tag">What We Offer</span>
          <h2 className="dl-section-title">
            Our Delivery <span>Services</span>
          </h2>
          <p className="dl-section-subtitle">
            From local handovers to nationwide transport — we have a delivery solution to suit every customer.
          </p>
          <div className="dl-accent-bar" />
          <div className="dl-services-grid">
            {services.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="dl-service-card">
                <div className="dl-service-icon">
                  <Icon size={28} />
                </div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="dl-benefits">
        <div className="dl-benefits-inner">
          <span className="dl-section-tag">Why Choose Us</span>
          <h2 className="dl-section-title" style={{ textAlign: "center" }}>
            Why Choose Our <span>Delivery Service</span>
          </h2>
          <p className="dl-section-subtitle" style={{ textAlign: "center", margin: "0 auto 16px" }}>
            We go the extra mile to make sure your delivery experience is smooth from start to finish.
          </p>
          <div className="dl-accent-bar" style={{ margin: "0 auto 48px" }} />
          <div className="dl-benefits-grid">
            {benefits.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="dl-benefit-card">
                <div className="dl-benefit-icon">
                  <Icon size={22} />
                </div>
                <div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="dl-process">
        <div className="dl-process-inner">
          <div style={{ textAlign: "center" }}>
            <span className="dl-section-tag">Simple Process</span>
            <h2 className="dl-section-title">
              How Delivery <span>Works</span>
            </h2>
            <p className="dl-section-subtitle" style={{ margin: "0 auto" }}>
              Four simple steps and your new car is on your driveway.
            </p>
          </div>
          <div className="dl-steps">
            {steps.map((step) => (
              <div key={step.number} className="dl-step">
                <div className="dl-step-number">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="dl-cta">
        <div
          className="dl-cta-bg"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&q=80)` }}
        />
        <div className="dl-cta-overlay" />
        <div className="dl-cta-glow" />
        <div className="dl-cta-container">
          <span className="dl-cta-tag">Nationwide Delivery</span>
          <h2 className="dl-cta-title">
            Need Your Vehicle <span>Delivered?</span>
          </h2>
          <p className="dl-cta-subtitle">
            Contact us today to arrange fully insured delivery of your new vehicle. Flexible scheduling, anywhere in the UK.
          </p>
          <div className="dl-cta-buttons">
            <Link href="/contact" className="dl-cta-btn dl-cta-btn-primary">
              <FaTruckMoving size={16} /> Arrange Delivery
            </Link>
            <Link href="/cars" className="dl-cta-btn dl-cta-btn-secondary">
              <FaCar size={16} /> Browse Stock
            </Link>
          </div>
        </div>
      </section>

      <NoorrixFooter />
    </>
  );
}

export default Delivery;
