"use client";

import { useState } from "react";
import { FaCalendarAlt, FaTachometerAlt, FaCog, FaGasPump, FaWhatsapp, FaCar } from "react-icons/fa";
import { gbp, miles, carUrl } from "../../lib/format";

const WHATSAPP_NUMBER = "447300503113"; // same number as the WhatsApp float button
export const BOOKING_URL = "/appointment#appointment-form"; // "Pick a vehicle" section of the appointment page

const STATUS = {
  available: { label: "Available", cls: "ncb-car-status--available" },
  reserved: { label: "Reserved", cls: "ncb-car-status--reserved" },
  sold: { label: "Sold", cls: "ncb-car-status--sold" },
};

function whatsappLink(car) {
  const name = [car.year, car.title || [car.make, car.model].filter(Boolean).join(" ")].filter(Boolean).join(" ");
  const details = [car.price != null && gbp(car.price), car.mileage != null && miles(car.mileage), car.reg && `Reg ${car.reg}`]
    .filter(Boolean)
    .join(", ");
  const url = `${window.location.origin}${carUrl(car)}`;
  const text =
    car.status === "sold"
      ? `Hi Noorrix Motors, I saw the ${name} (${details}) has been sold. Do you have anything similar?\n${url}`
      : `Hi Noorrix Motors, I'm interested in the ${name} (${details}). Is it still available?\n${url}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/** Placeholder shown while the stock list is still loading. */
export function ChatCarCardSkeleton() {
  return (
    <div className="ncb-car ncb-car--loading" aria-label="Loading car details">
      <div className="ncb-car-media ncb-skeleton" />
      <div className="ncb-car-body">
        <span className="ncb-skeleton ncb-skeleton-line" style={{ width: "70%" }} />
        <span className="ncb-skeleton ncb-skeleton-line" style={{ width: "45%" }} />
        <span className="ncb-skeleton ncb-skeleton-line" style={{ width: "90%" }} />
      </div>
    </div>
  );
}

/** Vehicle card rendered inside a bot message for a [[car:ID]] tag. */
export default function ChatCarCard({ car }) {
  const [imgFailed, setImgFailed] = useState(false);
  const status = STATUS[car.status] || null;
  const sold = car.status === "sold";
  const title = car.title || [car.make, car.model].filter(Boolean).join(" ") || "Vehicle";

  const specs = [
    car.year && { icon: <FaCalendarAlt />, text: car.year },
    car.mileage != null && { icon: <FaTachometerAlt />, text: miles(car.mileage) },
    car.transmission && { icon: <FaCog />, text: car.transmission },
    car.fuel && { icon: <FaGasPump />, text: car.fuel },
  ].filter(Boolean);

  return (
    <div className={`ncb-car ${sold ? "ncb-car--sold" : ""}`}>
      <a href={carUrl(car)} className="ncb-car-media" tabIndex={-1} aria-hidden="true">
        {car.image_url && !imgFailed ? (
          <img src={car.image_url} alt="" loading="lazy" onError={() => setImgFailed(true)} />
        ) : (
          <span className="ncb-car-noimg"><FaCar size={30} /><small>No image</small></span>
        )}
        {status && <span className={`ncb-car-status ${status.cls}`}>{status.label}</span>}
      </a>

      <div className="ncb-car-body">
        <div className="ncb-car-head">
          <strong className="ncb-car-title">{title}</strong>
          {car.subtitle && <span className="ncb-car-sub">{car.subtitle}</span>}
        </div>

        {specs.length > 0 && (
          <ul className="ncb-car-specs">
            {specs.map((s, i) => (
              <li key={i}>{s.icon}<span>{s.text}</span></li>
            ))}
          </ul>
        )}

        <div className="ncb-car-price-row">
          <span className="ncb-car-price">{car.price != null ? gbp(car.price) : "Call for price"}</span>
          {!sold && Number(car.monthly) > 0 && (
            <span className="ncb-car-monthly">or £{Number(car.monthly).toFixed(0)}/mo</span>
          )}
        </div>

        <div className="ncb-car-actions">
          <a href={carUrl(car)} className="ncb-car-btn ncb-car-btn--primary">View Details</a>
          {!sold && (
            <a href={BOOKING_URL} className="ncb-car-btn ncb-car-btn--book">
              <FaCalendarAlt size={13} /> Book Test Drive
            </a>
          )}
          <a
            href={whatsappLink(car)}
            target="_blank"
            rel="noopener noreferrer"
            className="ncb-car-btn ncb-car-btn--whatsapp"
            aria-label={`Ask about the ${title} on WhatsApp`}
          >
            <FaWhatsapp size={15} /> WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
