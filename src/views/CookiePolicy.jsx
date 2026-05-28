"use client";
import React from "react";
import Link from "next/link";
import {
  FaCookieBite,
  FaShieldAlt,
  FaTachometerAlt,
  FaHandshake,
  FaDesktop,
  FaSlidersH,
  FaMoneyCheckAlt,
  FaMapMarkedAlt,
  FaCheckCircle,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaExclamationTriangle,
  FaInfoCircle,
  FaTable,
} from "react-icons/fa";
import { MdOutlineCookie } from "react-icons/md";
import Navbar from "../components/Navbar/Navbar";
import NoorrixFooter from "../components/Footer/Footer";
import "./CookiePolicy.css";

const cookieSections = [
  {
    icon: <FaCookieBite />,
    title: "What Are Cookies?",
    content:
      "Cookies are small text files stored on your computer, tablet, or mobile device when you visit a website. They allow the website to recognise your device and remember certain information about your visit, such as your preferences, browsing activity, saved settings, or previously entered information. Cookies help improve usability by reducing the need to repeatedly enter the same information each time you return to the site or move between pages.",
  },
  {
    icon: <FaInfoCircle />,
    title: "How We Use Cookies",
    content:
      "Some areas of our website use cookies to support essential website functions and improve your browsing experience. Cookies may be used for security and privacy protection, website performance and functionality, finance application support, analytics, and personalisation. We use both session cookies (which expire when you close your browser) and persistent cookies (which remain on your device for a set period).",
  },
  {
    icon: <FaShieldAlt />,
    title: "Security & Privacy Protection",
    content:
      "We use cookies and session identifiers to help verify authorised users and protect customer information. Certain cookies may store unique session tokens that allow our systems to recognise approved devices and maintain secure access to restricted areas of the website. Without these cookies, some secure sections or website features may not function correctly.",
  },
  {
    icon: <FaTachometerAlt />,
    title: "Website Performance & Functionality",
    content:
      "Cookies help us maintain website functionality, monitor performance, and improve user experience. These cookies may remember preferred contact details, saved vehicle searches, website preferences, recently viewed vehicles, and session activity. These cookies generally do not store sensitive personal information directly.",
  },
  {
    icon: <FaHandshake />,
    title: "Third-Party Cookies",
    content:
      "In addition to our own cookies, we may use cookies provided by trusted third-party services to improve website functionality, measure visitor activity, and support integrated features. Third-party services may include finance application providers, website analytics providers, embedded video services, interactive map services, and advertising and tracking platforms. These providers may collect anonymous information in accordance with their own privacy policies.",
  },
  {
    icon: <FaDesktop />,
    title: "Automatic Session Information",
    content:
      "When you visit our website, certain technical information may be collected automatically. This may include your IP address, browser type and version, device type, operating system, website activity and navigation behaviour, approximate geographic location, and referral sources. This information helps us analyse website performance, improve navigation, monitor visitor trends, detect suspicious activity, and improve security.",
  },
  {
    icon: <FaSlidersH />,
    title: "Managing Cookies",
    content:
      "Most web browsers allow you to control, disable, or delete cookies through browser settings. You may choose to block certain cookies, delete existing cookies, or receive notifications when cookies are placed. Please note that disabling cookies may affect certain website features, functionality, or user experience. For more information about managing cookies, visit your browser's support documentation or independent online cookie guidance websites.",
  },
  {
    icon: <FaMoneyCheckAlt />,
    title: "Finance Application Providers",
    content:
      "We may use third-party finance software providers to assist with finance applications and eligibility checks. These providers may use cookies to maintain secure application sessions, save user preferences, monitor website usage, and improve application functionality. Disabling certain cookies may affect the performance of finance-related website features.",
  },
  {
    icon: <FaMapMarkedAlt />,
    title: "Google Maps, YouTube & Embedded Content",
    content:
      "Our website may contain embedded content such as Google Maps, YouTube videos, and interactive media. These services may place cookies on your device to improve functionality, monitor video performance, prevent fraud, personalise user experience, and collect anonymous usage statistics. Please refer to the relevant third-party privacy policies for further information regarding their cookie usage.",
  },
];

const cookieTable = [
  { name: "site_contact_number", duration: "30 days", type: "Session", purpose: "Stores contact number preferences" },
  { name: "preferred_location", duration: "7 days", type: "Session", purpose: "Saves selected showroom or branch" },
  { name: "viewed_vehicles", duration: "14 days", type: "Persistent", purpose: "Remembers recently viewed vehicles" },
  { name: "stock_counter", duration: "24 hours", type: "Session", purpose: "Tracks available vehicle stock display" },
  { name: "vehicle_preferences", duration: "7 days", type: "Persistent", purpose: "Saves selected vehicle filters" },
  { name: "finance_session", duration: "1 hour", type: "Persistent", purpose: "Supports finance application process" },
  { name: "website_tracking", duration: "1 hour", type: "Persistent", purpose: "Website analytics and usage monitoring" },
  { name: "service_booking", duration: "Session", type: "Session", purpose: "Maintains service booking information" },
  { name: "favourites_list", duration: "Persistent", type: "Persistent", purpose: "Saves favourite vehicles" },
  { name: "content_refresh", duration: "Persistent", type: "Persistent", purpose: "Improves website content loading and caching" },
];

const lastUpdated = "25 May 2026";

function CookiePolicy() {
  return (
    <>
      <Navbar />

      {/* ── Breadcrumb ── */}
      <div className="cp-breadcrumb-wrapper">
        <div className="cp-breadcrumb-container">
          <Link href="/" className="cp-breadcrumb-link">Home</Link>
          <span className="cp-breadcrumb-sep">&rsaquo;</span>
          <span className="cp-breadcrumb-current">Cookie Policy</span>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          HERO — light split layout
      ════════════════════════════════════════ */}
      <section className="cp-hero">
        <div className="cp-hero-deco-1" />
        <div className="cp-hero-deco-2" />
        <div className="cp-hero-container">
          <div className="cp-hero-content">
            <span className="cp-hero-tag">Cookie Policy</span>
            <h1 className="cp-hero-title">
              Our Cookie <span>Policy</span>
            </h1>
            <p className="cp-hero-subtitle">
              Our website uses cookies and similar technologies to distinguish you
              from other visitors, provide a smoother browsing experience, improve
              performance, enhance security, and better understand how visitors
              interact with our website and services.
            </p>
            <div className="cp-hero-badges">
              <div className="cp-hero-badge">
                <FaCheckCircle className="cp-hero-badge-icon" />
                <span>Last updated: {lastUpdated}</span>
              </div>
              <div className="cp-hero-badge">
                <FaCookieBite className="cp-hero-badge-icon" />
                <span>Transparency First</span>
              </div>
            </div>
          </div>

          <div className="cp-hero-visual" aria-hidden="true">
            <div className="cp-icon-ring cp-icon-ring-outer" />
            <div className="cp-icon-ring cp-icon-ring-mid" />
            <div className="cp-icon-core">
              <FaCookieBite className="cp-icon-main" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          INTRO CARD
      ════════════════════════════════════════ */}
      <section className="cp-intro-section">
        <div className="cp-intro-container">
          <div className="cp-intro-card">
            <div className="cp-intro-icon-wrapper">
              <FaCookieBite />
            </div>
            <div className="cp-intro-text">
              <h2 className="cp-intro-heading">What Is This Policy About?</h2>
              <p className="cp-intro-paragraph">
                This Cookie Policy explains what cookies are, how Noorrix Motors
                Ltd uses them on our website www.noorrixmotors.co.uk, and your
                choices regarding cookies. By continuing to use our website, you
                consent to our use of cookies as described in this policy.
              </p>
              <p className="cp-intro-paragraph">
                We may update this Cookie Policy from time to time in response
                to changing legal, technical, or business developments. Whenever
                we update our policy, we will take the appropriate steps to
                inform you, consistent with the significance of the changes.
              </p>
              <div className="cp-intro-notice">
                <FaExclamationTriangle className="cp-intro-notice-icon" />
                <span>
                  Disabling certain cookies may affect website functionality,
                  features, or user experience. Please review each cookie
                  category carefully before making changes to your settings.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          QUICK NAV
      ════════════════════════════════════════ */}
      <section className="cp-quicknav-section">
        <div className="cp-quicknav-container">
          <div className="cp-quicknav-header">
            <span className="cp-quicknav-tag">Quick Navigation</span>
          </div>
          <div className="cp-quicknav-grid">
            {cookieSections.map((section, index) => (
              <a
                href={`#cp-section-${index}`}
                key={index}
                className="cp-quicknav-item"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(`cp-section-${index}`);
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                <span className="cp-quicknav-num">{String(index + 1).padStart(2, "0")}</span>
                <span className="cp-quicknav-label">{section.title}</span>
                <span className="cp-quicknav-arrow">&rarr;</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          POLICY SECTIONS GRID
      ════════════════════════════════════════ */}
      <section className="cp-sections-section">
        <div className="cp-sections-container">
          <div className="cp-sections-header">
            <span className="cp-sections-tag">Policy Details</span>
            <h2 className="cp-sections-title">
              How We Use <span>Cookies</span>
            </h2>
            <div className="cp-sections-accent-bar" />
          </div>

          <div className="cp-sections-grid">
            {cookieSections.map((section, index) => (
              <div className="cp-section-card" id={`cp-section-${index}`} key={index}>
                <div className="cp-section-card-num">{String(index + 1).padStart(2, "0")}</div>
                <div className="cp-section-card-icon">{section.icon}</div>
                <h3 className="cp-section-card-title">{section.title}</h3>
                <p className="cp-section-card-text">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          COOKIE TABLE
      ════════════════════════════════════════ */}
      <section className="cp-table-section">
        <div className="cp-table-container">
          <div className="cp-table-header">
            <div className="cp-table-header-icon">
              <FaTable />
            </div>
            <div>
              <span className="cp-table-tag">Cookie Reference</span>
              <h2 className="cp-table-title">
                Examples of Cookies <span>Used on Our Website</span>
              </h2>
              <p className="cp-table-subtitle">
                The table below provides an overview of the cookies used on our
                website, their duration, type, and purpose.
              </p>
            </div>
          </div>

          <div className="cp-table-scroll-wrapper">
            <table className="cp-cookie-table">
              <thead>
                <tr>
                  <th>Cookie Name</th>
                  <th>Duration</th>
                  <th>Type</th>
                  <th>Purpose</th>
                </tr>
              </thead>
              <tbody>
                {cookieTable.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <span className="cp-cookie-name">{row.name}</span>
                    </td>
                    <td>
                      <span className="cp-cookie-duration">{row.duration}</span>
                    </td>
                    <td>
                      <span className={`cp-cookie-type cp-cookie-type-${row.type.toLowerCase()}`}>
                        {row.type}
                      </span>
                    </td>
                    <td className="cp-cookie-purpose">{row.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          IMPORTANT NOTICE
      ════════════════════════════════════════ */}
      <section className="cp-notice-section">
        <div className="cp-notice-container">
          <div className="cp-notice-card">
            <div className="cp-notice-icon-wrapper">
              <FaExclamationTriangle />
            </div>
            <div className="cp-notice-content">
              <h3 className="cp-notice-title">Important Notice</h3>
              <p className="cp-notice-text">
                This Cookie Policy was last updated on {lastUpdated}. We reserve
                the right to modify this policy at any time to reflect changes
                in the cookies we use, applicable laws, or the way we operate
                our website. Please review this policy periodically to stay
                informed about how we use cookies. Your continued use of our
                website after any changes constitutes acceptance of the updated
                policy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CONTACT CTA
      ════════════════════════════════════════ */}
      <section className="cp-contact-section">
        <div className="cp-contact-bg" />
        <div className="cp-contact-overlay" />
        <div className="cp-contact-top-accent" />
        <div className="cp-contact-container">
          <span className="cp-contact-tag">Get in Touch</span>
          <h2 className="cp-contact-title">
            Questions About Our <span>Cookie Policy</span>?
          </h2>
          <p className="cp-contact-subtitle">
            If you have any questions about our Cookie Policy, would like to
            update your cookie preferences, or want to learn more about how we
            use cookies, please contact us directly.
          </p>
          <div className="cp-contact-details">
            <div className="cp-contact-item">
              <FaEnvelope className="cp-contact-item-icon" />
              <div>
                <strong>Email</strong>
                <p>
                  <a href="mailto:info@noorrixmotors.co.uk" className="cp-contact-link">
                    info@noorrixmotors.co.uk
                  </a>
                </p>
              </div>
            </div>
            <div className="cp-contact-item">
              <FaPhone className="cp-contact-item-icon" />
              <div>
                <strong>Phone</strong>
                <p>
                  <a href="tel:07435761085" className="cp-contact-link">
                    0743 5761085
                  </a>
                </p>
              </div>
            </div>
            <div className="cp-contact-item">
              <FaMapMarkerAlt className="cp-contact-item-icon" />
              <div>
                <strong>Registered Address</strong>
                <p>
                  <a
                    href="https://maps.google.com/?q=1+Cauldwell+Walk+Bedford+MK429DT"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cp-contact-link"
                  >
                    1 Cauldwell Walk, Bedford MK429DT
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="cp-contact-buttons">
            <Link href="/contact" className="cp-contact-btn cp-contact-btn-primary">
              <FaEnvelope size={16} />
              Contact Us
            </Link>
            <Link href="/" className="cp-contact-btn cp-contact-btn-secondary">
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      <NoorrixFooter />
    </>
  );
}

export default CookiePolicy;
