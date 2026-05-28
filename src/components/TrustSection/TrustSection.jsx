"use client";
import React from "react";
import {
  FaPalette,
  FaUserCog,
  FaStar,
  FaClock,
  FaShieldAlt,
  FaCheckCircle,
} from "react-icons/fa";
import "./TrustSection.css";

const trustFeatures = [
  {
    number: "01",
    icon: <FaPalette />,
    title: "Precision Color Matching",
    description:
      "Factory-quality paint matching for seamless finishes.",
  },
  {
    number: "02",
    icon: <FaUserCog />,
    title: "Experienced Technicians",
    description:
      "Skilled specialists with years of automotive repair expertise.",
  },
  {
    number: "03",
    icon: <FaStar />,
    title: "Premium Materials",
    description:
      "High-quality paints, tools, and repair systems.",
  },
  {
    number: "04",
    icon: <FaClock />,
    title: "Fast Turnaround",
    description:
      "Efficient service without compromising quality.",
  },
  {
    number: "05",
    icon: <FaShieldAlt />,
    title: "Resale Value Protection",
    description:
      "Maintain your vehicle’s appearance and market value.",
  },
  {
    number: "06",
    icon: <FaCheckCircle />,
    title: "Satisfaction Guaranteed",
    description:
      "Quality checks and workmanship assurance on every repair.",
  },
];

const TrustSection = () => {
  return (
    <section className="trust-section sp">
      <div className="trust-container">
        {/* Header */}
        <div className="trust-header">
          <h2 className="trust-title">
            Why Car Owners{" "}
            <span className="trust-title-highlight">Trust Us</span>
          </h2>
          <p className="trust-subtitle">
            Quality you can count on — from paint matching to final inspection,
            we deliver excellence at every step.
          </p>
          <div className="trust-accent-bar" />
        </div>

        {/* Feature Grid */}
        <div className="trust-grid">
          {trustFeatures.map((feature) => (
            <div className="trust-card" key={feature.number}>
              <div className="trust-icon-wrapper">
                <span className="trust-icon">{feature.icon}</span>
              </div>
              <h3 className="trust-card-title">{feature.title}</h3>
              <p className="trust-card-desc">{feature.description}</p>
              <span className="trust-card-number">{feature.number}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;