"use client";
import { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import "./DealerContactCard.css";

// ----------------------------------------------------------------
// MESSAGE DEALER CARD
// ----------------------------------------------------------------
export default function MessageDealerCard() {
  const [enquiry, setEnquiry] = useState([]);
  const [partExchange, setPartExchange] = useState(false);
  const [noEmails, setNoEmails] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const enquiryOptions = [
    { id: "test-drive", label: "Book a test drive" },
    { id: "reserve", label: "Reserve a vehicle" },
    { id: "available", label: "Is it still available?" },
    { id: "question", label: "Ask a question" },
  ];

  const toggleEnquiry = (id) => {
    setEnquiry((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="message-dealer-card">
      {/* Title */}
      <h2 className="message-dealer-card__title">
        Message the dealer
      </h2>

      {/* Enquiry checkboxes */}
      <p className="message-dealer-card__label">
        What's your enquiry about? *
      </p>

      <div className="message-dealer-card__enquiry-grid">
        {enquiryOptions.map((opt) => (
          <label
            key={opt.id}
            className="message-dealer-card__checkbox-label"
          >
            <span
              onClick={() => toggleEnquiry(opt.id)}
              className={`message-dealer-card__checkbox ${
                enquiry.includes(opt.id)
                  ? "message-dealer-card__checkbox--checked"
                  : "message-dealer-card__checkbox--unchecked"
              }`}
            >
              {enquiry.includes(opt.id) && (
                <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                  <path
                    d="M1 4L4 7.5L10 1"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
            {opt.label}
          </label>
        ))}
      </div>

      {/* Name row */}
      <div className="message-dealer-card__name-row">
        <input
          type="text"
          name="firstName"
          placeholder="First name *"
          value={form.firstName}
          onChange={handleChange}
          className="message-dealer-card__input message-dealer-card__input--full"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last name *"
          value={form.lastName}
          onChange={handleChange}
          className="message-dealer-card__input message-dealer-card__input--full"
        />
      </div>

      {/* Email */}
      <input
        type="email"
        name="email"
        placeholder="Email address *"
        value={form.email}
        onChange={handleChange}
        className="message-dealer-card__input message-dealer-card__input--full message-dealer-card__input--mb10"
      />

      {/* Phone */}
      <input
        type="tel"
        name="phone"
        placeholder="Phone number *"
        value={form.phone}
        onChange={handleChange}
        className="message-dealer-card__input message-dealer-card__input--full message-dealer-card__input--mb16"
      />

      {/* Part exchange checkbox */}
      <label
        className="message-dealer-card__checkbox-label"
        style={{ marginBottom: "14px" }}
      >
        <span
          onClick={() => setPartExchange((v) => !v)}
          className={`message-dealer-card__checkbox ${
            partExchange
              ? "message-dealer-card__checkbox--checked"
              : "message-dealer-card__checkbox--unchecked"
          }`}
        >
          {partExchange && (
            <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
              <path
                d="M1 4L4 7.5L10 1"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>
        I have a vehicle to part exchange
      </label>

      {/* Marketing consent */}
      <label className="message-dealer-card__consent-label">
        <span
          onClick={() => setNoEmails((v) => !v)}
          className={`message-dealer-card__consent-checkbox ${
            noEmails
              ? "message-dealer-card__checkbox--checked"
              : "message-dealer-card__checkbox--unchecked"
          }`}
        >
          {noEmails && (
            <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
              <path
                d="M1 4L4 7.5L10 1"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>
        <span>
          We may email you with offers and updates about our products and
          services.{" "}
          <strong>
            If you do not wish to receive these, tick this box.
          </strong>{" "}
          You can unsubscribe at any time via the link in our emails or{" "}
          <a href="#" className="message-dealer-card__link">
            Contact Us
          </a>
          . See our{" "}
          <a href="#" className="message-dealer-card__link">
            Privacy Notice
          </a>{" "}
          to learn how we handle your data.
        </span>
      </label>

      {/* Submit button */}
      <button className="message-dealer-card__button">
        <FaEnvelope size={16} />
        Message dealer
      </button>

      {/* reCAPTCHA note */}
      <p className="message-dealer-card__recaptcha">
        This site is protected by reCAPTCHA and the Google{" "}
        <a href="#" className="message-dealer-card__link">
          Privacy Policy
        </a>{" "}
        and{" "}
        <a href="#" className="message-dealer-card__link">
          Terms of Service
        </a>{" "}
        apply.
      </p>
    </div>
  );
}

