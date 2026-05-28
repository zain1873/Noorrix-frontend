"use client";
import React from "react";
import Navbar from "../components/Navbar/Navbar";
import NoorrixFooter from "../components/Footer/Footer";
import { FaPiggyBank, FaCalculator, FaClipboardList, FaCheckCircle } from "react-icons/fa";
import AboutSection from "../components/AboutSection/AboutSection";
import CTA from "../components/CTA/CTA";

function Finance() {
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
          <span className="text-gray-900 font-medium">Finance</span>
        </div>
      </div>

      {/* ─── Hero Section ─── */}
      <section className="relative bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1600&q=80')",
          }}
        />
        <div className="relative z-20 max-w-6xl mx-auto px-4 py-24 md:py-36">
          <div className="flex items-center gap-3 mb-4 hero-logo">
            <FaPiggyBank size={32} className="text-blue-400" />
            <h1 className="text-4xl md:text-5xl font-bold">Finance</h1>
          </div>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl">
            Explore flexible finance options tailored for you. Get on the road with affordable monthly payments.
          </p>
        </div>
      </section>

      {/* ─── About Section ─── */}
      <AboutSection
        image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=900&q=80&fit=crop"
        tag="Finance"
        title="Flexible Finance"
        titleHighlight="Options For Every Budget"
        description="At Noorrix Motors, we believe everyone deserves to drive their dream car. Our finance team works with trusted lenders to find you the best rates and most suitable payment plans. Whether you're looking for HP, PCP, or personal finance, we'll tailor a solution that fits your budget."
        badgeNumber="1,500+"
        badgeLabel="Approvals"
        stats={[
          { number: "1,500+", label: "Approvals" },
          { number: "0%", label: "APR Options" },
          { number: "24/7", label: "Support" },
        ]}
        primaryBtnText="Apply Now"
        primaryBtnLink="/contact"
        secondaryBtnText="Calculate Payments"
        secondaryBtnLink="#"
      />

      {/* ─── Finance Options ─── */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Finance Options Available
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Hire Purchase (HP)", desc: "Own the car at the end of the agreement with fixed monthly payments." },
              { title: "Personal Contract Purchase (PCP)", desc: "Lower monthly payments with the option to buy, return, or part-exchange." },
              { title: "Personal Finance Loan", desc: "Flexible unsecured lending for vehicle purchases with competitive rates." },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <CTA
        title="Need Finance?"
        description="Contact our finance team today for a free, no-obligation consultation. We'll find the best deal for you."
        primaryBtnText="Get Free Estimate"
        primaryBtnIcon={<FaCalculator size={18} />}
        secondaryBtnText="Book Inspection"
        secondaryBtnIcon={<FaClipboardList size={18} />}
      />

      <NoorrixFooter />
    </>
  );
}

export default Finance;
