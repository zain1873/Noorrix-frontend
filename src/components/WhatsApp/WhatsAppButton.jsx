"use client";
import { FaWhatsapp } from "react-icons/fa";
import "./WhatsAppButton.css";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/923001234567"   // 👉 replace with your number
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp size={28} color="#fff" />
    </a>
  );
}