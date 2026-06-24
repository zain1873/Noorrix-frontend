"use client";
import React, { useState } from "react";
import { isValidEmail, subscribeNewsletter } from "../../lib/newsletter";
import "./StockSubscribe.css";

const StockSubscribeBanner = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");

  const handleSubscribe = async () => {
    if (status === "loading") return;

    if (!isValidEmail(email)) {
      setStatus("error");
      setMessage("Enter a valid email address.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const successMessage = await subscribeNewsletter(email);
      setStatus("success");
      setMessage(successMessage);
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err.message);
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
      <div className="subscribe-form-col">
        <div className="subscribe-form">
          <input
            type="email"
            className="subscribe-input"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Email address"
            disabled={status === "loading"}
          />
          <button className="subscribe-btn" onClick={handleSubscribe} disabled={status === "loading"}>
            {status === "loading" ? "Subscribing…" : "Subscribe"}
          </button>
        </div>
        {message && (
          <p className={`subscribe-message ${status === "success" ? "subscribe-message--success" : "subscribe-message--error"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default StockSubscribeBanner;
