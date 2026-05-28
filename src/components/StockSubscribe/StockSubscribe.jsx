"use client";
import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import "./StockSubscribe.css";

const StockSubscribeBanner = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = () => {
    if (email.trim()) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2500);
      setEmail("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubscribe();
  };

  return (
    <div className="subscribe-banner">
      <span className="subscribe-title">
        Get Stock Updates Directly Into Your Inbox
      </span>
      <div className="subscribe-form">
        <input
          type="email"
          className="subscribe-input"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Email address"
        />
        <button className="subscribe-btn" onClick={handleSubscribe}>
          {submitted ? "Subscribed!" : "Subscribe"}
        </button>
      </div>
    </div>
  );
};

export default StockSubscribeBanner;