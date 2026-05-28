"use client";
import React from "react";
import Navbar from "../components/Navbar/Navbar";
import NoorrixFooter from "../components/Footer/Footer";
import { FaTruck, FaCalculator, FaClipboardList } from "react-icons/fa";
import AboutSection from "../components/AboutSection/AboutSection";
import CTA from "../components/CTA/CTA";

function UsedVans() {
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
          <span className="text-gray-900 font-medium">Used Vans</span>
        </div>
      </div>

      {/* ─── Hero Section ─── */}
      <section className="relative bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1600&q=80')",
          }}
        />
        <div className="relative z-20 max-w-6xl mx-auto px-4 py-24 md:py-36">
          <div className="flex items-center gap-3 mb-4 hero-logo">
            <FaTruck size={32} className="text-blue-400" />
            <h1 className="text-4xl md:text-5xl font-bold">Used Vans</h1>
          </div>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl">
            Browse our selection of quality used vans. Commercial vehicles you can rely on for work and business.
          </p>
        </div>
      </section>

      {/* ─── About Section ─── */}
      <AboutSection
        image="https://images.unsplash.com/photo-1539627831859-a911cf04d3cd?w=900&q=80&fit=crop"
        tag="Used Vans"
        title="Quality Commercial"
        titleHighlight="Vehicles For Your Business"
        description="At Noorrix Motors, we offer a carefully curated selection of quality used vans. Every vehicle undergoes rigorous inspection to ensure it's ready for the road. Whether you need a small cargo van or a larger commercial vehicle, we have the perfect solution for your business needs."
        badgeNumber="300+"
        badgeLabel="Vans Sold"
        stats={[
          { number: "300+", label: "Vans Sold" },
          { number: "100%", label: "HGV Checked" },
          { number: "10+", label: "Years Exp" },
        ]}
        primaryBtnText="Browse Vans"
        primaryBtnLink="/cars"
        secondaryBtnText="Enquire Now"
        secondaryBtnLink="/contact"
      />

      {/* ─── Trust Strip ─── */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Why Choose Our Vans
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Thoroughly Inspected", desc: "Each van goes through a comprehensive HGV-standard safety check." },
              { title: "Service History", desc: "Full service history available on all our vans for your peace of mind." },
              { title: "Finance Options", desc: "Flexible finance packages tailored to suit your business budget." },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-8 text-center shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <CTA
        title="Find Your Perfect Van"
        description="Get in touch with our team to find the ideal commercial vehicle for your needs. We'll help you every step of the way."
        primaryBtnText="Get Free Estimate"
        primaryBtnIcon={<FaCalculator size={18} />}
        secondaryBtnText="Book Inspection"
        secondaryBtnIcon={<FaClipboardList size={18} />}
      />

      <NoorrixFooter />
    </>
  );
}

export default UsedVans;
