"use client";
import React from "react";
const servicingBanner = "/assets/images/banners/servicing-banner.jpg";
import "./Servicing.css";
import Navbar from "../components/Navbar/Navbar";
import NoorrixFooter from "../components/Footer/Footer";
import {
  FaTools,
  FaCheckCircle,
  FaOilCan,
  FaCarBattery,
  FaTachometerAlt,
  FaPhoneAlt,
  FaCalendarAlt,
  FaShieldAlt,
  FaUserTie,
  FaCog,
  FaClipboardCheck,
  FaCarSide,
  FaStar,
} from "react-icons/fa";
import AboutSection from "../components/AboutSection/AboutSection";
import FinalCTA from "../components/FinalCTA/FinalCTA";

const packages = [
  {
    name: "Interim Service",
    icon: <FaOilCan size={24} />,
    desc: "An oil and filter change plus essential safety checks. Ideal for high-mileage drivers or between full services.",
    includes: [
      "Engine oil & filter change",
      "Tyre pressure & condition check",
      "Brake fluid level check",
      "Lights & electrics inspection",
      "Visual underbody check",
    ],
    featured: false,
  },
  {
    name: "Full Service",
    icon: <FaTachometerAlt size={24} />,
    desc: "Comprehensive inspection covering all major systems. Keeps your manufacturer warranty valid and your car road-ready.",
    includes: [
      "Everything in Interim Service",
      "Air & cabin filter replacement",
      "Brake pad & disc inspection",
      "Suspension & steering check",
      "Battery & charging system test",
      "Service book stamp",
    ],
    featured: true,
    badge: "Most Popular",
  },
  {
    name: "Major Service",
    icon: <FaCarBattery size={24} />,
    desc: "Our most thorough package — everything in the Full Service plus cambelt, coolant flush, and deep system diagnostics.",
    includes: [
      "Everything in Full Service",
      "Cambelt / timing chain check",
      "Coolant flush & refill",
      "Spark plug replacement",
      "Full diagnostic scan",
      "Road test & report",
    ],
    featured: false,
  },
];

const whyUs = [
  {
    icon: <FaUserTie size={22} />,
    title: "Qualified Technicians",
    desc: "Fully trained and experienced with all makes and models, from superminis to SUVs.",
  },
  {
    icon: <FaShieldAlt size={22} />,
    title: "Genuine Quality Parts",
    desc: "We use parts that meet or exceed manufacturer specifications — never cheap imitations.",
  },
  {
    icon: <FaClipboardCheck size={22} />,
    title: "Service History Stamped",
    desc: "Your service book is stamped every time, protecting your vehicle's value and warranty.",
  },
  {
    icon: <FaStar size={22} />,
    title: "Transparent Pricing",
    desc: "No hidden charges. You'll receive a full itemised quote before any work begins.",
  },
  {
    icon: <FaCarSide size={22} />,
    title: "All Makes & Models",
    desc: "From hatchbacks to prestige cars — our workshop handles everything with equal care.",
  },
  {
    icon: <FaCog size={22} />,
    title: "Latest Diagnostic Tools",
    desc: "We invest in the latest equipment so no fault goes undetected.",
  },
];

const steps = [
  {
    number: "01",
    title: "Book Online or Call",
    desc: "Choose a date that works for you — online booking or give us a ring.",
  },
  {
    number: "02",
    title: "Drop Off Your Car",
    desc: "Bring your vehicle to our workshop. We'll check it in and confirm the work scope.",
  },
  {
    number: "03",
    title: "We Service Your Car",
    desc: "Our technicians carry out all checks and work to manufacturer standards.",
  },
  {
    number: "04",
    title: "Collect & Drive Away",
    desc: "Pick up a freshly serviced car with a full report and stamped service book.",
  },
];

function Servicing() {
  return (
    <>
      <Navbar />

      {/* ── Breadcrumb ── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3 text-sm">
          <a href="/" className="breadcrumb text-gray-500 hover:text-blue-600 transition-colors">Home</a>
          <span className="mx-2 text-gray-300">›</span>
          <a href="/services" className="breadcrumb text-gray-500 hover:text-blue-600 transition-colors">Services</a>
          <span className="mx-2 text-gray-300">›</span>
          <span className="text-gray-900 font-medium">Servicing</span>
        </div>
      </div>

      {/* ─── Hero Banner ─── */}
      <section className="sv-hero">
        <div
          className="sv-hero-bg"
          style={{ backgroundImage: `url(${servicingBanner})` }}
        />
        <div className="sv-hero-overlay" />
        <div className="sv-hero-top-accent" />
        <div className="sv-hero-glow" />

        <div className="sv-hero-container">
          <span className="sv-hero-tag">
            <FaTools size={13} />
            Vehicle Servicing
          </span>

          <h1 className="sv-hero-title">
            Professional Servicing &amp; <span>Expert Maintenance</span>
          </h1>

          <p className="sv-hero-subtitle">
            Keep your car running safely and smoothly all year round with our
            comprehensive servicing packages — carried out by qualified
            technicians using quality parts.
          </p>

          <div className="sv-hero-buttons">
            <a href="/contact" className="sv-hero-btn sv-hero-btn-primary">
              <FaCalendarAlt size={17} />
              Book a Service
            </a>
            <a href="tel:07300503113" className="sv-hero-btn sv-hero-btn-secondary">
              <FaPhoneAlt size={17} />
              07300 503113
            </a>
            <a href="tel:07435761085" className="sv-hero-btn sv-hero-btn-secondary">
              <FaPhoneAlt size={17} />
              07435 761085
            </a>
          </div>
        </div>
      </section>

      {/* ─── About Section ─── */}
      <AboutSection
        image="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=900&q=80&fit=crop"
        tag="Servicing"
        title="Professional Car"
        titleHighlight="Servicing & Maintenance"
        description="At Noorrix Motors, we provide comprehensive vehicle servicing to keep your car performing at its best. From interim checks to major services, our qualified technicians use genuine parts and follow manufacturer specifications. Trust us to keep your vehicle safe, reliable, and running smoothly for years to come."
        badgeNumber="3,000+"
        badgeLabel="Services Done"
        stats={[
          { number: "3,000+", label: "Services Done" },
          { number: "100%", label: "Genuine Parts" },
          { number: "20+", label: "Years Exp" },
        ]}
        primaryBtnText="Book a Service"
        primaryBtnLink="/contact"
        secondaryBtnText="View Packages"
        secondaryBtnLink="#packages"
      />

      {/* ─── Service Packages ─── */}
      <section className="sv-packages" id="packages">
        <div className="sv-packages-inner">
          <span className="sv-section-tag">Our Packages</span>
          <h2 className="sv-section-title">
            Choose Your <span>Service Package</span>
          </h2>
          <p className="sv-section-subtitle">
            From a quick interim check to a full major overhaul — we have a
            package to suit every car and every budget.
          </p>
          <div className="sv-accent-bar" />

          <div className="sv-packages-grid">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`sv-package-card${pkg.featured ? " featured" : ""}`}
              >
                {pkg.badge && (
                  <span className="sv-package-badge">{pkg.badge}</span>
                )}
                <div className="sv-package-icon">{pkg.icon}</div>
                <h3 className="sv-package-name">{pkg.name}</h3>
                <p className="sv-package-desc">{pkg.desc}</p>
                <div className="sv-package-divider" />
                <p className="sv-package-includes-label">What's Included</p>
                <ul className="sv-package-includes">
                  {pkg.includes.map((item) => (
                    <li key={item} className="sv-package-include-item">
                      <FaCheckCircle size={14} />
                      {item}
                    </li>
                  ))}
                </ul>
                <a href="/contact" className="sv-package-btn">
                  <FaCalendarAlt size={15} />
                  Book This Service
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Why Choose Us ─── */}
      <section className="sv-why">
        <div className="sv-why-inner">
          <span className="sv-section-tag">Why Noorrix</span>
          <h2 className="sv-section-title">
            Why Service <span>With Us</span>
          </h2>
          <p className="sv-section-subtitle">
            We believe servicing should be straightforward, honest, and great
            value — every single time.
          </p>
          <div className="sv-accent-bar" />

          <div className="sv-why-grid">
            {whyUs.map((item) => (
              <div key={item.title} className="sv-why-card">
                <div className="sv-why-icon">{item.icon}</div>
                <div>
                  <h3 className="sv-why-card-title">{item.title}</h3>
                  <p className="sv-why-card-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section className="sv-process">
        <div className="sv-process-inner">
          <div style={{ textAlign: "center", marginBottom: "50px" }}>
            <span className="sv-section-tag">Simple Process</span>
            <h2 className="sv-section-title">
              How It <span>Works</span>
            </h2>
            <p className="sv-section-subtitle" style={{ margin: "0 auto" }}>
              Getting your car serviced with us is quick and hassle-free.
            </p>
          </div>

          <div className="sv-steps">
            {steps.map((step) => (
              <div key={step.number} className="sv-step">
                <div className="sv-step-number">{step.number}</div>
                <h3 className="sv-step-title">{step.title}</h3>
                <p className="sv-step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <FinalCTA />

      <NoorrixFooter />
    </>
  );
}

export default Servicing;
