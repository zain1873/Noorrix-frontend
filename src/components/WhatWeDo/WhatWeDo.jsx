"use client";
import React from "react";
import {
  FaHammer,
  FaPaintBrush,
  FaSprayCan,
  FaCarSide,
  FaFileInvoiceDollar,
} from "react-icons/fa";
import { GiCarWheel } from "react-icons/gi";
import "./WhatWeDo.css";

const services = [
  {
    number: "01",
    icon: <FaHammer />,
    title: "Dent Removal",
    description:
      "Paintless and conventional dent repair for all vehicle types.",
    includes: [
      "Door dents",
      "Parking damage",
      "Hail dents",
      "Minor body reshaping",
    ],
  },
  {
    number: "02",
    icon: <FaPaintBrush />,
    title: "Scratch Repair",
    description:
      "Professional scratch correction and surface restoration.",
    includes: [
      "Clear coat scratches",
      "Deep paint scratches",
      "Panel touch-ups",
      "Polishing & blending",
    ],
  },
  {
    number: "03",
    icon: <FaSprayCan />,
    title: "Full Body Painting",
    description:
      "Complete repaint services using premium paint systems.",
    includes: [
      "Full color refresh",
      "Matte & gloss finishes",
      "OEM color matching",
      "Protective finishing",
    ],
  },
  {
    number: "04",
    icon: <FaCarSide />,
    title: "Bumper Repair",
    description:
      "Repair cracked, scratched, or damaged bumpers.",
    includes: [
      "Plastic welding",
      "Paint correction",
      "Alignment fixing",
      "Replacement fitting",
    ],
  },
  {
    number: "05",
    icon: <GiCarWheel />,
    title: "Alloy Wheel Restoration",
    description:
      "Restore damaged or faded alloy wheels.",
    includes: [
      "Rim repainting",
      "Scratch removal",
      "Refinishing",
      "Wheel polishing",
    ],
  },
  {
    number: "06",
    icon: <FaFileInvoiceDollar />,
    title: "Insurance Claim Assistance",
    description:
      "We help simplify the repair process.",
    includes: [
      "Damage estimates",
      "Claim coordination",
      "Documentation support",
      "Inspection assistance",
    ],
  },
];

const WhatWeDo = () => {
  return (
    <section className="whatwe-section">
      <div className="whatwe-container">
        {/* ── Intro ── */}
        <div className="whatwe-intro">
          <span className="whatwe-tag">What We Do</span>
          <h2 className="whatwe-heading">
            Bring Back the <span>Showroom Finish</span>
          </h2>
          <p className="whatwe-description">
            Whether it's a small scratch, a dent from daily driving, or full
            body paint restoration, our expert technicians ensure your vehicle
            looks as good as new. We use high-quality materials, precision color
            matching, and professional repair techniques trusted by car owners
            and dealerships alike.
          </p>
          <div className="whatwe-accent-bar" />
        </div>

        {/* ── Service Grid ── */}
        <div className="whatwe-grid">
          {services.map((service) => (
            <div className="whatwe-card" key={service.number}>
              <div className="whatwe-card-icon">{service.icon}</div>
              <h3 className="whatwe-card-title">{service.title}</h3>
              <p className="whatwe-card-desc">{service.description}</p>

              <div className="whatwe-includes">
                {service.includes.map((item, i) => (
                  <div className="whatwe-include-item" key={i}>
                    <span className="whatwe-include-dot" />
                    {item}
                  </div>
                ))}
              </div>

              <span className="whatwe-card-number">{service.number}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;