"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { FiX, FiCalendar, FiClock, FiMapPin, FiCheckCircle } from "react-icons/fi";
import { getAvailability, createAppointment } from "../../lib/appointments";
import "./BookingModal.css";

const SHOWROOM_ADDRESS = "16 Eastside, Cauldwell Walk, Bedford MK42 9DT";

const TITLES = {
  test_drive: "Book a test drive",
  appointment: "Book an appointment",
};

// Every 30 minutes across a full day — no fixed "business hours", per the
// dealer's requirement; only already-booked slots get disabled.
const TIME_SLOTS = Array.from({ length: 48 }, (_, i) => {
  const h = String(Math.floor(i / 2)).padStart(2, "0");
  const m = i % 2 === 0 ? "00" : "30";
  return `${h}:${m}`;
});

const todayISO = () => new Date().toISOString().slice(0, 10);

export default function BookingModal({ car, type, onClose }) {
  const [date, setDate] = useState(todayISO());
  const [time, setTime] = useState("");
  const [bookedTimes, setBookedTimes] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [done, setDone] = useState(false);
  const [mounted, setMounted] = useState(false);

  // document.body isn't available during SSR — only portal once mounted client-side.
  useEffect(() => setMounted(true), []);

  // Lock background scroll while the modal is open.
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  // Close on Escape key.
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  useEffect(() => {
    let active = true;
    setLoadingSlots(true);
    setTime("");
    getAvailability(date).then((slots) => {
      if (active) {
        setBookedTimes(slots);
        setLoadingSlots(false);
      }
    });
    return () => { active = false; };
  }, [date]);

  const availableSlots = useMemo(
    () => TIME_SLOTS.filter((t) => !bookedTimes.includes(t)),
    [bookedTimes]
  );

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!time) return;
    setSubmitting(true);
    setError(null);

    try {
      await createAppointment({
        car: car.id,
        type,
        date,
        time,
        name: form.name,
        email: form.email,
        phone: form.phone,
      });
      setDone(true);
    } catch (err) {
      if (err.code === "SLOT_TAKEN") {
        setBookedTimes((prev) => [...prev, time]);
        setTime("");
      }
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (!mounted) return null;

  return createPortal(
    <div className="bm-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bm-modal">
        <button className="bm-close" onClick={onClose} aria-label="Close">
          <FiX size={20} />
        </button>

        {done ? (
          <div className="bm-success">
            <div className="bm-success-icon-wrap">
              <FiCheckCircle className="bm-success-icon" />
            </div>
            <h3>Booking requested</h3>
            <p>
              We've got your {type === "test_drive" ? "test drive" : "appointment"} request for{" "}
              <strong>{date}</strong> at <strong>{time}</strong>. We'll confirm by phone or email
              shortly.
            </p>
            <button className="bm-btn-primary" onClick={onClose}>Close</button>
          </div>
        ) : (
          <>
            <h3 className="bm-title">{TITLES[type] || "Book"}</h3>

            <div className="bm-body">
              <div className="bm-side">
                <div className="bm-car-preview">
                  <img src={car.image_url} alt={car.title} />
                  <div>
                    <div className="bm-car-title">{car.title}</div>
                    <div className="bm-car-subtitle">{car.subtitle}</div>
                  </div>
                </div>

                <div className="bm-location">
                  <FiMapPin size={14} /> {SHOWROOM_ADDRESS}
                </div>
              </div>

              <form className="bm-form" onSubmit={handleSubmit}>
                <div className="bm-row">
                  <label className="bm-field">
                    <span><FiCalendar size={13} /> Date</span>
                    <input
                      type="date"
                      min={todayISO()}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                  </label>

                  <label className="bm-field">
                    <span><FiClock size={13} /> Time</span>
                    <select value={time} onChange={(e) => setTime(e.target.value)} required>
                      <option value="" disabled>
                        {loadingSlots ? "Loading…" : "Select a time"}
                      </option>
                      {availableSlots.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </label>
                </div>

                <label className="bm-field bm-field--full">
                  <span>Full name</span>
                  <input type="text" name="name" value={form.name} onChange={handleChange} required />
                </label>

                <div className="bm-row">
                  <label className="bm-field">
                    <span>Email</span>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required />
                  </label>
                  <label className="bm-field">
                    <span>Phone</span>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} required />
                  </label>
                </div>

                {error && <p className="bm-error">{error}</p>}

                <button className="bm-btn-primary" type="submit" disabled={submitting || !time}>
                  {submitting ? "Booking…" : "Confirm booking"}
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}