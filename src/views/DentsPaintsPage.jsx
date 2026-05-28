"use client";
import React from "react";
const dentsPaintsBanner = "/assets/images/banners/dents&paints.jpg";
import "./DentsPaintsPage.css";
import Navbar from "../components/Navbar/Navbar";
import NoorrixFooter from "../components/Footer/Footer";
import { FaSprayCan, FaPhoneAlt } from "react-icons/fa";
import DentsAndPaints from "../components/DentsPaintsServices/DentsPaintsServices";
import AboutSection from "../components/AboutSection/AboutSection";
import TrustStrip from "../components/TrustStrip/TrustStrip";
import RepairProcess from "../components/RepairProcess/RepairProcess";
import TrustSection from "../components/TrustSection/TrustSection";
import WhatWeDo from "../components/WhatWeDo/WhatWeDo";
import EstimateForm from "../components/EstimateForm/EstimateForm";
import LocationContact from "../components/LocationContact/LocationContact";
import FinalCTA from "../components/FinalCTA/FinalCTA";
import BeforeAfter from "../components/BeforeAfter/BeforeAfter";

function DentsPaints() {
  return (
    <>
      <Navbar />
      
      {/* ── Breadcrumb ── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3 text-sm">
          <a href="/" className="breadcrumb text-gray-500 hover:text-blue-600 transition-colors">Home</a>
          <span className="mx-2 text-gray-300">›</span>
          <a href="/services" className=" breadcrumb text-gray-500 hover:text-blue-600 transition-colors">Services</a>
          <span className="mx-2 text-gray-300">›</span>
          <span className="text-gray-900 font-medium">Dents & Paints</span>
        </div>
      </div>

      {/* ─── Hero Section ─── */}
      <section className="dp-hero">
        {/* Background Image */}
        <div
          className="dp-hero-bg"
          style={{ backgroundImage: `url(${dentsPaintsBanner})` }}
        />

        {/* Dark Overlay */}
        <div className="dp-hero-overlay" />

        {/* Top Gradient Accent */}
        <div className="dp-hero-top-accent" />

        {/* Bottom Glow */}
        <div className="dp-hero-glow" />

        {/* Content */}
        <div className="dp-hero-container">
          <span className="dp-hero-tag">
            <FaSprayCan size={13} />
            Dents &amp; Paints
          </span>

          <h1 className="dp-hero-title">
            Expert Repair &amp; <span>Precision Paintwork</span>
          </h1>

          <p className="dp-hero-subtitle">
            Restore your car’s original finish with professional dent removal,
            scratch repair, and colour-matched paintwork — all to showroom
            standard.
          </p>

          <div className="dp-hero-buttons">
            <a href="#estimate-form" className="dp-hero-btn dp-hero-btn-primary">
              <FaSprayCan size={18} />
              Get a Free Quote
            </a>
            <a href="tel:+4407930955645" className="dp-hero-btn dp-hero-btn-secondary">
              <FaPhoneAlt size={18} />
              Call Us Now
            </a>
          </div>
        </div>
      </section>


      {/* ─── About Section ─── */}
      <AboutSection
        image="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1600&q=80"
        tag="Dents & Paints"
        title="Expert Dent Repair &"
        titleHighlight="Precision Paintwork"
        description="At Noorrix Motors, we take pride in restoring your vehicle to its former glory. Our skilled technicians use state-of-the-art equipment and premium materials to deliver flawless dent removal, scratch repair, and colour-matched paintwork. Every vehicle that leaves our workshop has been meticulously crafted to showroom standards."
        badgeNumber="500+"
        badgeLabel="Cars Restored"
        stats={[
          { number: "500+", label: "Cars Restored" },
          { number: "98%", label: "Satisfaction" },
          { number: "12+", label: "Years Exp" },
        ]}
        primaryBtnText="Get Free Quote"
        primaryBtnLink="/contact"
        secondaryBtnText="View Our Work"
        secondaryBtnLink="#services"
      />

      {/* ─── What We Do (Service Grid) ─── */}
      <WhatWeDo />

      <BeforeAfter/>

      {/* <DentsAndPaints/> */}

      {/* ─── Why Car Owners Trust Us (Feature Grid) ─── */}
      <TrustSection />

      {/* ─── Trust Strip (Quick Trust) ─── */}
      <TrustStrip />

      <RepairProcess/>

      {/* ─── Estimate Form ─── */}
      <EstimateForm />

      {/* ─── Location & Contact ─── */}
      <LocationContact />

      {/* ─── Final CTA Banner ─── */}
      <FinalCTA />

      <NoorrixFooter />
    </>
  );
}

export default DentsPaints;