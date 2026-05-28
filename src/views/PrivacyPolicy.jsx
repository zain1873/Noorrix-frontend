"use client";
import React from "react";
import Link from "next/link";
import {
  FaShieldAlt,
  FaUserSecret,
  FaDatabase,
  FaCookieBite,
  FaGavel,
  FaEnvelope,
  FaCheckCircle,
  FaLock,
  FaEye,
  FaFileAlt,
} from "react-icons/fa";
import Navbar from "../components/Navbar/Navbar";
import NoorrixFooter from "../components/Footer/Footer";
import "./PrivacyPolicy.css";

const policySections = [
  {
    icon: <FaUserSecret />,
    title: "Information You Provide to Us",
    content:
      "This is information you provide by filling in forms on our site or by corresponding with us by telephone, email or otherwise. It includes information provided when you register to use our site, enquire about a vehicle or service, place an order, reserve a vehicle, apply for finance, request a valuation, arrange servicing or repairs, participate in promotions or surveys, or report a problem with our website. The information may include your name, address, email address, phone number, financial and payment information, date of birth, employment details, vehicle preferences, address history, photographs and personal descriptions.",
  },
  {
    icon: <FaDatabase />,
    title: "Information We Collect About You",
    content:
      "With regard to each of your visits to our site we may automatically collect technical information including your IP address, login details, browser type and version, time zone setting, browser plug-in types, operating system and platform. We also collect information regarding your visit including full URLs, clickstream to and from our site, vehicles or services viewed or searched for, page response times, download errors, duration of visits, page interaction information such as scrolling and clicks, and any telephone number used to contact our customer service team.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Information from Other Sources",
    content:
      "This is information we receive about you if you use any of the other websites we operate or services we provide. We work closely with third parties including business partners, technical service providers, payment providers, delivery companies, advertising networks, analytics providers, search information providers and credit reference agencies. We will notify you when we receive information about you from them and explain the purposes for which we intend to use that information.",
  },
  {
    icon: <FaCookieBite />,
    title: "Cookies",
    content:
      "Our website uses cookies to distinguish you from other users of our website. This helps us provide you with a better browsing experience and also allows us to improve our website. For detailed information regarding the cookies we use and the purposes for which we use them, please refer to our Cookie Policy.",
  },
  {
    icon: <FaEye />,
    title: "How We Use Information You Provide",
    content:
      "We may use the information you provide to carry out our obligations arising from any agreements entered into between you and us, and to provide you with the vehicles and services you request. We may also use it to provide information regarding similar products and services, notify you about updates to our services, and ensure that content from our site is presented in the most effective manner for you and your device. Where we contact you by electronic means, we will only do so where you have consented, and you may withdraw consent at any time by contacting us at info@noorrixmotors.co.uk.",
  },
  {
    icon: <FaFileAlt />,
    title: "How We Use Data We Collect",
    content:
      "Information we collect automatically may be used to administer our site and for internal operations including troubleshooting, testing, data analysis, research, statistical and survey purposes. We use it to improve our website, allow you to participate in interactive features, keep our website safe and secure, measure the effectiveness of advertising, and to make suggestions and recommendations to you regarding vehicles, products or services that may be of interest to you.",
  },
  {
    icon: <FaGavel />,
    title: "Disclosure of Your Information",
    content:
      "We may share your personal information with any member of our group, and with selected third parties including business partners, suppliers, payment processors, vehicle warranty providers, analytics providers, hosting providers and delivery services. We may also share your data with credit reference agencies for finance assessments. We may disclose your personal information where required by law, to enforce our Terms of Use, or to protect the rights, property or safety of NOORRIX MOTORS LTD, our customers or others. We will not disclose your personal information to third parties for marketing purposes without your consent.",
  },
  {
    icon: <FaLock />,
    title: "Business Transfers & Legal Obligations",
    content:
      "In the event that we sell or purchase any business or assets, we may disclose your personal data to the prospective buyer or seller. If NOORRIX MOTORS LTD or substantially all of its assets are acquired by a third party, personal data held about customers may form part of the transferred assets. We may also disclose your personal data to comply with any legal obligation, or to exchange information with other organisations for fraud prevention and credit risk reduction purposes.",
  },
];

const lastUpdated = "25 May 2026";

const trustItems = [
  { icon: <FaShieldAlt />, label: "UK GDPR Compliant" },
  { icon: <FaLock />,      label: "Secure Data Storage" },
  { icon: <FaEye />,       label: "Transparent Practices" },
  { icon: <FaCheckCircle />, label: "No Data Selling" },
];

function PrivacyPolicy() {
  return (
    <>
      <Navbar />

      {/* ── Breadcrumb ── */}
      <div className="pp-breadcrumb-wrapper">
        <div className="pp-breadcrumb-container">
          <Link href="/" className="pp-breadcrumb-link">Home</Link>
          <span className="pp-breadcrumb-sep">›</span>
          <span className="pp-breadcrumb-current">Privacy Policy</span>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          HERO — light split layout
      ════════════════════════════════════════════════════════════════════ */}
      <section className="pp-hero">
        <div className="pp-hero-deco-1" />
        <div className="pp-hero-deco-2" />
        <div className="pp-hero-container">
          <div className="pp-hero-content">
            <span className="pp-hero-tag">Privacy &amp; Security</span>
            <h1 className="pp-hero-title">
              Privacy <span>Policy</span>
            </h1>
            <p className="pp-hero-subtitle">
              NOORRIX MOTORS LTD is committed to protecting and respecting your
              privacy. This policy explains the basis on which any personal data
              we collect from you will be processed by us.
            </p>
            <div className="pp-hero-badges">
              <div className="pp-hero-badge">
                <FaCheckCircle className="pp-hero-badge-icon" />
                <span>Last updated: {lastUpdated}</span>
              </div>
              <div className="pp-hero-badge pp-hero-badge-alt">
                <FaShieldAlt className="pp-hero-badge-icon pp-hero-badge-icon-gold" />
                <span>UK GDPR Compliant</span>
              </div>
            </div>
          </div>

          <div className="pp-hero-visual" aria-hidden="true">
            <div className="pp-shield-ring pp-shield-ring-outer" />
            <div className="pp-shield-ring pp-shield-ring-mid" />
            <div className="pp-shield-core">
              <FaShieldAlt className="pp-shield-icon" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          TRUST STRIP
      ════════════════════════════════════════════════════════════════════ */}
      <div className="pp-trust-strip">
        <div className="pp-trust-container">
          {trustItems.map((item, i) => (
            <React.Fragment key={i}>
              <div className="pp-trust-item">
                <span className="pp-trust-icon">{item.icon}</span>
                <span className="pp-trust-label">{item.label}</span>
              </div>
              {i < trustItems.length - 1 && (
                <div className="pp-trust-sep" aria-hidden="true" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          INTRO
      ════════════════════════════════════════════════════════════════════ */}
      <section className="pp-intro-section">
        <div className="pp-intro-container">
          <div className="pp-intro-icon-wrapper">
            <FaShieldAlt />
          </div>
          <h2 className="pp-intro-heading">Your Privacy Matters to Us</h2>
          <div className="pp-intro-divider" />
          <p className="pp-intro-paragraph">
            NOORRIX MOTORS LTD is committed to protecting and respecting your
            privacy. This policy (together with our Terms of Use and any other
            documents referred to within it) explains the basis on which any
            personal data we collect from you, or that you provide to us, will
            be processed by us. Please read the following carefully to
            understand our practices regarding your personal information and how
            we will treat it.
          </p>
          <p className="pp-intro-paragraph">
            For the purposes of the Data Protection Act 2018, the data
            controller is NOORRIX MOTORS LTD of 1 Cauldwell Walk, Bedford,
            MK42 9DT, United Kingdom.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          POLICY SECTIONS — numbered vertical list
      ════════════════════════════════════════════════════════════════════ */}
      <section className="pp-sections-section">
        <div className="pp-sections-container">
          <div className="pp-sections-header">
            <span className="pp-sections-tag">Policy Details</span>
            <h2 className="pp-sections-title">
              How We Handle <span>Your Data</span>
            </h2>
            <div className="pp-sections-accent-bar" />
          </div>

          <div className="pp-sections-list">
            {policySections.map((section, index) => (
              <div className="pp-section-item" key={index}>
                <div className="pp-section-num-col">
                  <span className="pp-section-num">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="pp-section-icon-col">
                  <div className="pp-section-icon-wrap">{section.icon}</div>
                </div>
                <div className="pp-section-body">
                  <h3 className="pp-section-card-title">{section.title}</h3>
                  <p className="pp-section-card-text">{section.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          CONTACT — light card grid
      ════════════════════════════════════════════════════════════════════ */}
      <section className="pp-contact-section">
        <div className="pp-contact-top-stripe" />
        <div className="pp-contact-container">
          <span className="pp-contact-tag">Get in Touch</span>
          <h2 className="pp-contact-title">
            Have Questions About <span>Your Privacy</span>?
          </h2>
          <p className="pp-contact-subtitle">
            If you have any questions about this Privacy Policy, wish to
            exercise your legal rights, or would like to request a copy of the
            data we hold about you, please do not hesitate to contact us.
          </p>

          <div className="pp-contact-cards">
            <div className="pp-contact-card">
              <div className="pp-contact-card-icon-wrap">
                <FaEnvelope />
              </div>
              <strong className="pp-contact-card-label">Email</strong>
              <p className="pp-contact-card-value">
                <a
                  href="mailto:info@noorrixmotors.co.uk"
                  className="pp-contact-link"
                >
                  info@noorrixmotors.co.uk
                </a>
              </p>
            </div>

            <div className="pp-contact-card">
              <div className="pp-contact-card-icon-wrap">
                <FaShieldAlt />
              </div>
              <strong className="pp-contact-card-label">
                Data Protection Officer
              </strong>
              <p className="pp-contact-card-value">
                Privacy Team, Noorrix Motors Ltd
              </p>
            </div>

            <div className="pp-contact-card">
              <div className="pp-contact-card-icon-wrap">
                <FaGavel />
              </div>
              <strong className="pp-contact-card-label">
                Registered Address
              </strong>
              <p className="pp-contact-card-value">
                <a
                  href="https://maps.google.com/?q=1+Cauldwell+Walk+Bedford+MK429DT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pp-contact-link"
                >
                  1 Cauldwell Walk, Bedford MK429DT
                </a>
              </p>
            </div>
          </div>

          <div className="pp-contact-buttons">
            <Link
              href="/contact"
              className="pp-contact-btn pp-contact-btn-primary"
            >
              <FaEnvelope size={16} />
              Contact Us
            </Link>
            <Link href="/" className="pp-contact-btn pp-contact-btn-secondary">
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      <NoorrixFooter />
    </>
  );
}

export default PrivacyPolicy;
