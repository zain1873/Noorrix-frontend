import { FiHeadphones, FiTrendingUp, FiMousePointer } from "react-icons/fi";
import { FaHandshake } from "react-icons/fa6";

import "./DrivenSatisfaction.css";

const FEATURES = [
  {
    icon: <FiHeadphones size={28} />,
    title: "Friendly Support",
    text: "Honest advice. Fast responses. Always with a smile.",
  },
  {
    icon: <FiTrendingUp size={28} />,
    title: "Competitive pricing",
    text: "Upfront pricing, unbeatable offers—get the most for your money today.",
  },
  {
    icon: <FaHandshake size={28} />,
    title: "Trusted by Thousands",
    text: "Trusted by thousands of satisfied buyers who count on us for quality vehicles, dependable service, and a seamless experience.",
  },
  {
    icon: <FiMousePointer size={28} />,
    title: "Wide Vehicle Selection",
    text: "Explore a large variety of cars to match every lifestyle, need, and budget perfectly.",
  },
];

export default function DrivenBySatisfaction() {
  return (
    <section className="dbs-section">
      <div className="dbs-inner">
        <h2 className="dbs-title">Driven by Your Satisfaction</h2>
        <p className="dbs-subtitle">
          Experience expert service, honest pricing, and a seamless buying journey from start to finish.
        </p>

        <div className="dbs-grid">
          {FEATURES.map((f) => (
            <div className="dbs-card" key={f.title}>
              <span className="dbs-icon">{f.icon}</span>
              <h3 className="dbs-card-title">{f.title}</h3>
              <p className="dbs-card-text">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}