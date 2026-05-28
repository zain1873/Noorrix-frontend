"use client";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaWhatsapp } from "react-icons/fa";
import HeroFilter from "../HeroFilter/Filter";
import "./Hero.css";

const socialLinks = [
  { icon: <FaFacebookF />, href: "#" },
  { icon: <FaLinkedinIn />, href: "#" },
  { icon: <FaInstagram />, href: "#" },
  { icon: <FaWhatsapp />, href: "#" },
];

export default function HeroBanner() {
  return (
    <section className="hero-banner">
      {/* Background Image */}
      <div className="hero-bg" />
      {/* Dark Overlay */}
      <div className="hero-overlay" />

      {/* 30 / 70 inner grid */}
      <div className="hero-inner">

        {/* LEFT – Filter (30%) */}
        <div className="hero-filter-col">
          <HeroFilter />
        </div>

        {/* RIGHT – Text content (70%) */}
        <div className="hero-content">
          <h1 className="hero-title">
            Discover, Compare &amp; <br />
            Drive – All in One Place
          </h1>
          <p className="hero-subtitle">
            Browse a wide selection of vehicles with transparent pricing and hassle-free service.
          </p>
        </div>

      </div>

      {/* Social Sidebar */}
      <div className="social-sidebar">
        {socialLinks.map((item, idx) => (
          <a key={idx} href={item.href} className="social-icon" aria-label={`social-${idx}`}>
            {item.icon}
          </a>
        ))}
      </div>
    </section>
  );
}