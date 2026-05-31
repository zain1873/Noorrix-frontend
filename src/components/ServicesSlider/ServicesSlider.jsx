"use client";
import { useState } from "react";
import Link from "next/link";
import {
  FaExchangeAlt,
  FaCarSide,
  FaTruckMoving,
  FaTools,
  FaHammer,
  FaSprayCan,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";
import "./ServicesSlider.css"

const services = [
  {
    label: "Part Exchange",
    icon: FaExchangeAlt,
    description: "Part Exchange",
    content:
      "Looking to upgrades your vehicle? Our Part Exchange service makes it effortless. We offer competitive valuations for your current car, giving you the best possible price towards your next vehicle. Our team handles all the paperwork, so you can drive away in your new car with minimal hassle. We accept all makes and models, regardless of age or condition.",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80",
  },
  {
    label: "Vehicle Sourcing",
    icon: FaCarSide,
    description: "Vehicle Sourcing",
    content:
      "Can't find the car you're looking for? Our Vehicle Sourcing service is here to help. Tell us your dream car — make, model, colour, spec — and we'll track it down for you across our nationwide network. Whether it's a rare edition or a specific trim level, our experts leave no stone unturned to bring your perfect vehicle to your door.",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
  },
  {
    label: "Delivery",
    icon: FaTruckMoving,
    description: "Delivery",
    content:
      "We bring your new vehicle straight to your doorstep anywhere across Pakistan. Our secure, fully insured delivery service ensures your car arrives in pristine condition. Our professional drivers handle every journey with the utmost care. Track your delivery in real time and receive your vehicle at a time and place that suits you — no need to visit the dealership.",
    image:
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80",
  },
  {
    label: "Servicing",
    icon: FaTools,
    description: "Servicing",
    content:
      "Keep your vehicle running at its best with our comprehensive servicing packages. From routine oil changes and tyre rotations to full annual services, our certified technicians use manufacturer-approved parts and the latest diagnostic equipment. We offer flexible booking slots including weekend appointments, and provide a full health check report with every service.",
    image:
      "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=800&q=80",
  },
  {
    label: "Denting",
    icon: FaHammer,
    description: "Denting",
    content:
      "Minor dents and dings can dramatically affect your car's appearance and resale value. Our expert dent removal technicians use the latest Paintless Dent Repair (PDR) techniques to restore your bodywork to its original condition without the need for costly resprays. Fast turnaround, affordable pricing, and results that are virtually undetectable.",
    image:
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&q=80",
  },
  {
    label: "Painting",
    icon: FaSprayCan,
    description: "Painting",
    content:
      "Transform your vehicle with our professional painting services. Whether you need a full respray, a colour change, or a panel repair, our skilled painters deliver a flawless factory-quality finish. We use premium automotive paints and state-of-the-art spray booths to ensure perfect colour matching, durability, and a stunning finish that lasts for years.",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
  },
];

export default function CarServices() {
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <section className="car-services-section wrapper">
      <div className="cs-wrapper">
        <div className="cs-header">
          <p className="cs-eyebrow">What We Offer</p>
          <h2 className="cs-title sec-title">
            Our Cars Services
          </h2>
        </div>

        <div className="cs-grid">
          {/* LEFT: Tabs */}
          <nav className="cs-tabs" aria-label="Service tabs">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <button
                  key={svc.label}
                  className={`cs-tab${active === i ? " active" : ""}`}
                  onClick={() => setActive(i)}
                  aria-selected={active === i}
                >
                  <Icon className="cs-tab-icon" />
                  <span>{svc.label}</span>
                  <FaArrowRight className="cs-tab-arrow" />
                </button>
              );
            })}
          </nav>

          {/* MIDDLE: Content */}
          <div className="cs-content">
            <div className="cs-content-badge">
              <current.icon />
              {current.label}
            </div>
            <h3 className="cs-content-title">{current.description}</h3>
            <p className="cs-content-body">{current.content}</p>
            <Link href="/contact" className="cs-cta">
              Get a Quote <FaArrowRight />
            </Link>
          </div>

          {/* RIGHT: Image */}
          <div className="cs-image-panel">
            <img
              src={current.image}
              alt={current.label}
              loading="lazy"
            />
            <div className="cs-image-overlay" />
            {/* <div className="cs-location-pin">
              <FaMapMarkerAlt />
              Lahore, Pakistan
            </div> */}
            <button className="cs-how-btn">How to get here</button>
          </div>
        </div>
      </div>
    </section>
  );
}