"use client";
import React from "react";
import "./WhyChoose.css";

const features = [
  {
    number: "01",
    title: "Friendly Support",
    description:
      "We’re always here to help you with honest guidance, quick responses, and a smooth customer experience from start to finish.",
  },
  {
    number: "02",
    title: "Competitive pricing",
    description:
      "Transparents, upfront pricing with great value on every deal—ensuring you always get the best for your budget.",
  },
  {
    number: "03",
    title: "Trusted by Thousands",
    description:
      "Trusted by thousands of satisfied buyers who count on us for quality vehicles, dependable service.",
  },
  {
    number: "04",
    title: "Wide Vehicle Selection",
    description:
      "Choose from a diverse range of vehicles suited to every lifestyle, preference, and budget, ensuring the perfect match for every customer.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="why-section wrapper">
      <div className="why-container">
        <div className="why-header">
          <h2 className="sec-title ">Why We're the Right Choice for You</h2>
          <p className="why-subtitle">
            Your needs first — expert service, honest pricing, no hassle.
          </p>
        </div>

        <div className="why-grid">
          {features.map((feature) => (
            <div className="why-card" key={feature.number}>
              <span className="why-number">{feature.number}</span>
              <h3 className="why-card-title">{feature.title}</h3>
              <p className="why-card-desc">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;