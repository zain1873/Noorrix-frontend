"use client";
import React from "react";
import "./AboutSection.css";

export default function AboutSection({
  image,
  tag = "About",
  title,
  titleHighlight,
  description,
  stats = [],
  primaryBtnText,
  primaryBtnLink = "#",
  secondaryBtnText,
  secondaryBtnLink = "#",
  badgeNumber = "15+",
  badgeLabel = "Years",
  alt = false,
  reverse = false,
  children,
}) {
  return (
    <section className={`about-section ${alt ? "about-section-alt" : ""}`}>
      <div className="about-container">
        <div
          className="about-grid"
          style={reverse ? { direction: "rtl" } : {}}
        >
          {/* Left Column - Image */}
          <div className="about-image-wrapper" style={reverse ? { direction: "ltr" } : {}}>
            {/* Decorative dots */}
            <div className="about-dots">
              {Array.from({ length: 25 }).map((_, i) => (
                <span key={i} />
              ))}
            </div>

            {/* Image card */}
            <div className="about-image-card">
              <img src={image} alt={title || "About"} />
              <div className="about-image-overlay" />
            </div>

            {/* Floating badge */}
            <div className="about-image-badge">
              <span>{badgeNumber}</span>
              <span>{badgeLabel}</span>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="about-content" style={reverse ? { direction: "ltr" } : {}}>
            {/* Tag */}
            <div className="about-tag">{tag}</div>

            {/* Title */}
            {title && (
              <h2 className="about-title">
                {title}{" "}
                {titleHighlight && <span>{titleHighlight}</span>}
              </h2>
            )}

            {/* Description */}
            {description && (
              <p className="about-description">{description}</p>
            )}

            {/* Children (additional content) */}
            {children}

            {/* Stats */}
            {stats.length > 0 && (
              <div className="about-stats">
                {stats.map((stat, i) => (
                  <div key={i} className="about-stat-item">
                    <div className="about-stat-number">{stat.number}</div>
                    <div className="about-stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* CTA Buttons */}
            {(primaryBtnText || secondaryBtnText) && (
              <div className="about-actions">
                {primaryBtnText && (
                  <a href={primaryBtnLink} className="about-btn-primary">
                    {primaryBtnText}
                  </a>
                )}
                {secondaryBtnText && (
                  <a href={secondaryBtnLink} className="about-btn-secondary">
                    {secondaryBtnText}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}