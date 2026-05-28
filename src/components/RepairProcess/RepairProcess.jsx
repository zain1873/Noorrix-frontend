"use client";
import { useState } from "react";
import "./RepairProcess.css";

const STEPS = [
  {
    number: "01",
    title: "Vehicle Inspection",
    description: "We assess the damage and provide a transparent estimate.",
    tag: "Assessment",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
      </svg>
    ),
    details: [
      "Full damage assessment report",
      "Digital photo documentation",
      "Insurance-compatible estimate",
      "Transparent cost breakdown",
    ],
  },
  {
    number: "02",
    title: "Surface Preparation",
    description: "Damaged areas are cleaned, repaired, and prepped.",
    tag: "Prep",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    details: [
      "Chemical decontamination wash",
      "Rust treatment if required",
      "Body filler application & sanding",
      "Primer coat application",
    ],
  },
  {
    number: "03",
    title: "Dent & Paint Work",
    description: "Professional repair and precision painting begin.",
    tag: "Repair",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
    details: [
      "PDR (paintless dent repair) where possible",
      "Factory colour-code matching",
      "Multi-stage spray painting",
      "Infrared curing for durability",
    ],
  },
  {
    number: "04",
    title: "Finishing & Polishing",
    description: "Final detailing ensures a flawless finish.",
    tag: "Quality",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    details: [
      "Machine compound polishing",
      "UV & daylight colour verification",
      "Hand-applied wax or sealant",
      "Interior & exterior detailing",
    ],
  },
  {
    number: "05",
    title: "Delivery",
    description: "Your vehicle is returned looking refreshed and restored.",
    tag: "Handover",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="2" />
        <path d="M16 8h4l3 3v5h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    details: [
      "Senior technician sign-off",
      "Gloss meter reading recorded",
      "Before & after photo handover",
      "30-day workmanship guarantee",
    ],
  },
];

const CheckIcon = () => (
  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="2 6 5 9 10 3" />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export default function RepairProcess() {
  const [activeStep, setActiveStep] = useState(null);

  const toggle = (i) => setActiveStep(activeStep === i ? null : i);

  return (
    <div className="rp-wrapper wrapper">

      <header className="rp-header">
        <div>
          <p className="rp-eyebrow">Our Process</p>
          <h1 className="rp-title">
            From damage to<br />
            <span>showroom</span> finish.
          </h1>
        </div>
      </header>

      <div className="rp-timeline">
        {STEPS.map((step, i) => (
          <div
            key={i}
            className={`rp-step${activeStep === i ? " active" : ""}`}
            onClick={() => toggle(i)}
          >
            <div className="rp-step-left">
              <div className="rp-step-num-badge">{step.number}</div>
              <div className="rp-step-connector" />
            </div>

            <div className="rp-step-card">
              <div className="rp-step-card-inner">
                <div className="rp-step-icon-wrap">
                  <span className="rp-step-icon">{step.icon}</span>
                </div>
                <div>
                  <h3 className="rp-step-title">{step.title}</h3>
                  <p className="rp-step-desc">{step.description}</p>
                </div>
                <span className="rp-step-tag">{step.tag}</span>
              </div>

              <div className="rp-step-detail">
                <div className="rp-step-detail-grid">
                  {step.details.map((d, j) => (
                    <span className="rp-detail-pill" key={j}>
                      <CheckIcon />
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <footer className="rp-footer">
        <p className="rp-footer-text">
          Every vehicle receives the same meticulous care — whether it's a minor scuff or a major collision repair. Click any step to explore the details.
        </p>
        <a href="#book" className="rp-cta">
          Book a repair <ArrowIcon />
        </a>
      </footer>

    </div>
  );
}