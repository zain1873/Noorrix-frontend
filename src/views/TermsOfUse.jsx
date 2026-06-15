"use client";
import React from "react";
import Link from "next/link";
import {
  FaGavel,
  FaBuilding,
  FaCheckCircle,
  FaFileSignature,
  FaInfoCircle,
  FaGlobeEurope,
  FaCar,
  FaUndo,
  FaExclamationTriangle,
  FaCopyright,
  FaExternalLinkAlt,
  FaShieldAlt,
  FaLock,
  FaLink,
  FaBalanceScale,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFileAlt,
  FaCommentDots,
  FaHandshake,
} from "react-icons/fa";
import { MdOutlineGavel, MdOutlinePolicy } from "react-icons/md";
import Navbar from "../components/Navbar/Navbar";
import NoorrixFooter from "../components/Footer/Footer";
import "./TermsOfUse.css";

const policySections = [
  {
    icon: <FaBuilding />,
    title: "About Us & Contact Details",
    content:
      'www.noorrixmotors.co.uk is operated by NOORRIX MOTORS LTD. We are a company registered in England and Wales under company number 17150029. Our registered office and principal trading address is: 16 Eastside, Cauldwell Walk, Bedford MK42 9DT, United Kingdom. To contact us, please email info@noorrixmotors.co.uk, call our customer support team on 07300 503113, or write to us at the address above.',
  },
  {
    icon: <FaFileSignature />,
    title: "Acceptance of These Terms",
    content:
      "By using our site to browse vehicles, reserve a vehicle, arrange a test drive, or enquire about our services, you confirm that you accept these Terms of Use and agree to comply with them. These terms apply to the exclusion of any other conditions that you may seek to impose or incorporate, whether by trade, custom, practice, or course of dealing. If you do not agree with these terms, you must not use our site. We recommend printing or saving a copy of these terms for future reference.",
  },
  {
    icon: <MdOutlinePolicy />,
    title: "Additional Terms & Policies",
    content:
      "These Terms of Use also refer to the following policies and documents, which apply to your use of our website: Our Terms and Conditions of Sale, which outline the conditions relating to vehicle purchases; Our Privacy Policy, explaining how we collect, use, and store personal information; and Our Cookie Policy, providing information about cookies and tracking technologies used on our site. By using our website, you consent to the collection and processing of your information in accordance with these policies.",
  },
  {
    icon: <FaInfoCircle />,
    title: "Information Provided on Our Site",
    content:
      "The content on our website is provided for general informational purposes only and should not be considered professional or financial advice. Although we make reasonable efforts to keep our website content accurate and up to date, we do not guarantee that any information, vehicle specification, pricing, image, description, or availability information is complete, accurate, or current. Vehicle descriptions, photographs, and illustrations are provided for guidance purposes only and do not form part of any binding agreement or contract.",
  },
  {
    icon: <FaGlobeEurope />,
    title: "UK Users Only",
    content:
      "This website is primarily intended for individuals residing in the United Kingdom. We do not guarantee that the content or services available through our site are suitable for users located outside the UK. You may submit enquiries, reserve vehicles, or request information from outside the United Kingdom; however, vehicle deliveries, test drives, servicing appointments, and certain other services may only be available within selected UK locations.",
  },
  {
    icon: <FaCar />,
    title: "Vehicle Reservations & Test Drives",
    content:
      "To reserve a vehicle or request a test drive, please follow the instructions provided on our website. You agree to provide accurate, complete, and up-to-date information during the booking process. Customers booking a test drive must hold a valid full UK driving licence at the time of the appointment. A reservation or appointment will only be confirmed once we send you a separate confirmation. We reserve the right to cancel or refuse a booking if we reasonably believe a customer does not meet the legal or safety requirements.",
  },
  {
    icon: <FaUndo />,
    title: "Cancellations & Refunds",
    content:
      "If you need to amend or reschedule a booking, please contact us as soon as possible. We cannot guarantee that the same vehicle will remain available. If we are unable to reserve a vehicle or provide a test drive on your requested date, we will contact you as soon as reasonably possible. If delays continue for an extended period, customers may contact us to discuss alternative arrangements or refunds relating to reservation or booking fees where applicable.",
  },
  {
    icon: <FaExclamationTriangle />,
    title: "Circumstances Beyond Our Control",
    content:
      "We will not be responsible for delays, interruptions, or failure to fulfil obligations where such issues arise from events beyond our reasonable control. These events may include, but are not limited to: severe weather conditions, transport disruptions, supplier delays, mechanical breakdowns, technical failures, government restrictions, labour shortages, or industrial disputes. Where possible, we will notify affected customers promptly and take reasonable steps to minimise disruption and rearrange services or appointments where appropriate.",
  },
  {
    icon: <FaCopyright />,
    title: "Intellectual Property & Use of Content",
    content:
      "All intellectual property rights relating to this website and its content, including text, graphics, logos, photographs, images, videos, and branding, are owned by or licensed to us and are protected under applicable copyright and intellectual property laws. You may print or download limited extracts from our website for personal and non-commercial use only. You must not modify downloaded materials, reproduce or commercially exploit website content without permission, or remove ownership or copyright notices.",
  },
  {
    icon: <FaExternalLinkAlt />,
    title: "Third-Party Website Links",
    content:
      "Our website may contain links to third-party websites or external resources for informational or convenience purposes only. Such links should not be interpreted as endorsement, approval, or recommendation of those websites, their operators, or the information and services they provide. We have no control over third-party websites and accept no responsibility for their content, availability, policies, or practices.",
  },
  {
    icon: <FaBalanceScale />,
    title: "Liability & Responsibility",
    content:
      "Nothing within these Terms of Use excludes or limits our liability where it would be unlawful to do so. This includes liability for death or personal injury caused by our negligence, the negligence of our employees, agents, contractors, or subcontractors, and liability arising from fraud or fraudulent misrepresentation. Different limitations and exclusions may apply in relation to the supply of vehicles, products, workshop services, or warranties, as outlined within our separate Terms and Conditions of Sale.",
  },
  {
    icon: <FaLock />,
    title: "Website Security & Prohibited Use",
    content:
      "While we take reasonable steps to maintain website security, we do not guarantee that our website will always be secure or free from bugs, viruses, or other harmful material. You must not misuse our website by knowingly introducing viruses, malware, trojans, worms, logic bombs, or any other harmful or malicious technology. You must not attempt unauthorised access to our website, servers, databases, or systems. Any breach of these provisions may constitute a criminal offence under applicable law.",
  },
  {
    icon: <FaLink />,
    title: "Linking to Our Website",
    content:
      "You may create a link to our homepage provided that the link is fair and lawful, it does not damage our reputation, and it does not falsely imply any association, endorsement, or approval by us. You may not link to our website from a website you do not own or control, frame our website within another site, or create links to pages other than the homepage without permission. We reserve the right to withdraw linking permission at any time without prior notice.",
  },
  {
    icon: <FaFileAlt />,
    title: "General Provisions",
    content:
      "We may transfer or assign our rights and obligations under any agreement to another organisation where necessary. If we delay or choose not to enforce any right or provision under these terms, this shall not prevent us from enforcing that right or provision at a later date. Each provision within these Terms of Use operates independently. These Terms of Use apply solely between you and us. No third party shall have any right to enforce any provision contained within them.",
  },
  {
    icon: <FaGavel />,
    title: "Governing Law & Jurisdiction",
    content:
      "If you are a consumer, these Terms of Use and any disputes relating to them shall be governed by the laws of England and Wales. You and we both agree that the courts of England and Wales shall have jurisdiction, although residents of Scotland or Northern Ireland may also bring proceedings within their own jurisdictions where legally permitted. If you are using this website for business purposes, these Terms of Use and any disputes shall be governed exclusively by the laws of England and Wales.",
  },
  {
    icon: <FaCommentDots />,
    title: "Complaints",
    content:
      "If you are dissatisfied with any vehicle, service, repair, or aspect of our business, please contact us directly so that we may attempt to resolve the matter promptly through our complaints procedure. To contact us, please email info@noorrixmotors.co.uk, call our customer support team on 07300 503113, or write to us at our registered address at 16 Eastside, Cauldwell Walk, Bedford MK42 9DT.",
  },
  {
    icon: <FaHandshake />,
    title: "Alternative Dispute Resolution",
    content:
      "Alternative dispute resolution provides an independent process for resolving disputes without formal court proceedings. If you are dissatisfied with how a complaint has been handled, you may seek advice from Trading Standards or another appropriate dispute resolution provider where applicable. We are committed to resolving disputes fairly and efficiently wherever possible.",
  },
];

const lastUpdated = "25 May 2026";

function TermsOfUse() {
  return (
    <>
      <Navbar />

      {/* ── Breadcrumb ── */}
      <div className="tu-breadcrumb-wrapper">
        <div className="tu-breadcrumb-container">
          <Link href="/" className="tu-breadcrumb-link">
            Home
          </Link>
          <span className="tu-breadcrumb-sep">&rsaquo;</span>
          <span className="tu-breadcrumb-current">Terms of Use</span>
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════════════
          HERO SECTION — light split layout
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="tu-hero">
        <div className="tu-hero-deco-1" />
        <div className="tu-hero-deco-2" />
        <div className="tu-hero-container">
          <div className="tu-hero-content">
            <span className="tu-hero-tag">Terms &amp; Conditions</span>
            <h1 className="tu-hero-title">
              Terms of <span>Use</span>
            </h1>
            <p className="tu-hero-subtitle">
              Please read these Terms of Use carefully before using this website.
              These terms explain the rules and conditions for using
              www.noorrixmotors.co.uk, including browsing vehicles, reserving a
              vehicle, arranging a test drive, and accessing our automotive services.
            </p>
            <div className="tu-hero-badges">
              <div className="tu-hero-badge">
                <FaCheckCircle className="tu-hero-badge-icon" />
                <span>Last updated: {lastUpdated}</span>
              </div>
              <div className="tu-hero-badge">
                <FaGavel className="tu-hero-badge-icon" />
                <span>Company No: 17150029</span>
              </div>
            </div>
          </div>

          <div className="tu-hero-visual" aria-hidden="true">
            <div className="tu-icon-ring tu-icon-ring-outer" />
            <div className="tu-icon-ring tu-icon-ring-mid" />
            <div className="tu-icon-core">
              <FaGavel className="tu-icon-main" />
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════
          WHAT DO THESE TERMS COVER
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="tu-cover-section">
        <div className="tu-cover-container">
          <div className="tu-cover-card">
            <div className="tu-cover-icon-wrapper">
              <FaGavel />
            </div>
            <div className="tu-cover-text">
              <h2 className="tu-cover-heading">What Do These Terms Cover?</h2>
              <p className="tu-cover-paragraph">
                These Terms of Use explain the rules and conditions for using our
                website www.noorrixmotors.co.uk (our site), including browsing
                vehicles, reserving a vehicle, arranging a test drive, obtaining
                part exchange valuations, and accessing our automotive services.
                You are responsible for ensuring that anyone accessing our site
                through your internet connection is aware of these terms and
                complies with them together with any other applicable policies
                and conditions.
              </p>
              <p className="tu-cover-paragraph">
                We may revise these terms from time to time. Whenever you use our
                site, please review the latest version to ensure you understand
                the terms that apply at that time. Our website is provided free of
                charge. We do not guarantee that our site, or any content available
                on it, will always be accessible, uninterrupted, accurate, or free
                from technical issues.
              </p>
              <div className="tu-cover-notice">
                <FaExclamationTriangle className="tu-cover-notice-icon" />
                <span>
                  Please note that these terms do not apply to any separate
                  contract relating to the purchase of a vehicle, warranty plans,
                  or workshop repair services unless specifically stated otherwise.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════
          QUICK NAV
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="tu-quicknav-section">
        <div className="tu-quicknav-container">
          <div className="tu-quicknav-header">
            <span className="tu-quicknav-tag">Quick Navigation</span>
     
          </div>
          <div className="tu-quicknav-grid">
            {policySections.map((section, index) => (
              <a
                href={`#section-${index}`}
                key={index}
                className="tu-quicknav-item"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(`section-${index}`);
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
              >
                <span className="tu-quicknav-num">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="tu-quicknav-label">{section.title}</span>
                <span className="tu-quicknav-arrow">&rarr;</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════
          POLICY SECTIONS GRID
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="tu-sections-section">
        <div className="tu-sections-container">
          <div className="tu-sections-header">
            <span className="tu-sections-tag">Terms Details</span>
            <h2 className="tu-sections-title">
              Complete Terms of <span>Use</span>
            </h2>
            <div className="tu-sections-accent-bar" />
          </div>

          <div className="tu-sections-grid">
            {policySections.map((section, index) => (
              <div
                className="tu-section-card"
                id={`section-${index}`}
                key={index}
              >
                <div className="tu-section-card-num">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="tu-section-card-icon">{section.icon}</div>
                <h3 className="tu-section-card-title">{section.title}</h3>
                <p className="tu-section-card-text">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════
          IMPORTANT NOTICE
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="tu-notice-section">
        <div className="tu-notice-container">
          <div className="tu-notice-card">
            <div className="tu-notice-icon-wrapper">
              <FaExclamationTriangle />
            </div>
            <div className="tu-notice-content">
              <h3 className="tu-notice-title">Important Legal Notice</h3>
              <p className="tu-notice-text">
                These Terms of Use were last updated on 25 May 2026. We reserve
                the right to modify, update, suspend, remove, or restrict access
                to any part of the site at any time for operational, maintenance,
                or business reasons. Please review these terms periodically for
                any changes. Your continued use of our website after any
                modifications constitutes acceptance of the updated terms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════
          CONTACT SECTION
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="tu-contact-section">
        <div className="tu-contact-bg" />
        <div className="tu-contact-overlay" />
        <div className="tu-contact-top-accent" />
        <div className="tu-contact-container">
          <span className="tu-contact-tag">Get in Touch</span>
          <h2 className="tu-contact-title">
            Questions About Our <span>Terms of Use</span>?
          </h2>
          <p className="tu-contact-subtitle">
            If you have any questions about these Terms of Use, wish to discuss
            any of the conditions, or need clarification on any aspect of using
            our website or services, please do not hesitate to contact our team.
          </p>
          <div className="tu-contact-details">
            <div className="tu-contact-item">
              <FaEnvelope className="tu-contact-item-icon" />
              <div>
                <strong>Email</strong>
                <p>
                  <a
                    href="mailto:info@noorrixmotors.co.uk"
                    className="tu-contact-link"
                  >
                    info@noorrixmotors.co.uk
                  </a>
                </p>
              </div>
            </div>
            <div className="tu-contact-item">
              <FaPhone className="tu-contact-item-icon" />
              <div>
                <strong>Phone</strong>
                <p>
                  <a href="tel:07435761085" className="tu-contact-link">
                    0743 5761085
                  </a>
                </p>
              </div>
            </div>
            <div className="tu-contact-item">
              <FaMapMarkerAlt className="tu-contact-item-icon" />
              <div>
                <strong>Registered Address</strong>
                <p>
                  <a
                    href="https://maps.google.com/?q=16+Eastside+Cauldwell+Walk+Bedford+MK42+9DT"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tu-contact-link"
                  >
                    16 Eastside, Cauldwell Walk, Bedford MK42 9DT
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="tu-contact-buttons">
            <Link
              href="/contact"
              className="tu-contact-btn tu-contact-btn-primary"
            >
              <FaEnvelope size={16} />
              Contact Us
            </Link>
            <Link href="/" className="tu-contact-btn tu-contact-btn-secondary">
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      <NoorrixFooter />
    </>
  );
}

export default TermsOfUse;