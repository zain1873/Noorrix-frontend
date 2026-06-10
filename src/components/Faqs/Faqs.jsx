"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import "./Faqs.css";
const carLogo = "/assets/images/car-logo-svg.png";

export default function FAQ({ faqs = [] }) {
  const [openId, setOpenId] = useState(faqs[0]?.id ?? null);

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div id="faqs" className="faq-section wrapper">
      <div className="faq-container">
        <div className="faq-header">
          <span className="faq-tag">FAQ</span>
          <h1 className="faq-title sec-title">
            Frequently
            <br />
            asked questions
          </h1>
        </div>

        <div className="faq-grid">
          {/* Accordion */}
          <div className="accordion-list">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div className="accordion-item" key={faq.id}>
                  <button
                    className="accordion-header"
                    onClick={() => toggle(faq.id)}
                    aria-expanded={isOpen}
                  >
                    <span className="accordion-question">{faq.question}</span>
                    <FiPlus
                      className={`accordion-icon${isOpen ? " open" : ""}`}
                    />
                  </button>
                  <div className={`accordion-body${isOpen ? " open" : ""}`}>
                    <p className="accordion-answer">{faq.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Contact card */}
          <div className="contact-card">
            <div className="chat-icon-wrapper">
              <img src={carLogo} alt="" />
            </div>

            <h3 className="contact-title">Are You Looking For a Car?</h3>

            <p className="contact-desc">
                Finding the perfect car has never been easier! 
                Whether you’re looking for a stylish ride for city commutes,
                a reliable family vehicle, or something sporty to fuel your adventures,
                we’ve got you covered.
                Our wide selection of cars is designed to meet every lifestyle
                and budget, all backed by our commitment to exceptional service. 
                Take the next step toward driving your dream car today —
                browse our stock and discover unbeatable deals waiting just for you!
            </p>

            <Link href="/stock" className="contact-btn" style={{ textDecoration: "none" }}>Check Our Stock</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
