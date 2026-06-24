"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FiX, FiCheckCircle, FiStar } from "react-icons/fi";
import { submitTestimonial } from "../../lib/testimonials";
import "./ReviewModal.css";

const INITIAL = { name: "", role: "", rating: 0, review: "" };

export default function ReviewModal({ onClose }) {
  const [form, setForm] = useState(INITIAL);
  const [photo, setPhoto] = useState(null);
  const [hoverStar, setHoverStar] = useState(0);
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (fieldErrors[name]) setFieldErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleRate = (value) => {
    setForm((f) => ({ ...f, rating: value }));
    if (fieldErrors.rating) setFieldErrors((prev) => ({ ...prev, rating: null }));
  };

  const handlePhoto = (e) => {
    setPhoto(e.target.files?.[0] || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setFieldErrors({});

    try {
      const data = await submitTestimonial({
        name: form.name,
        role: form.role,
        rating: form.rating,
        review: form.review,
        photo,
      });
      setSuccessMessage(data.message || "Thanks for your review! It'll appear once approved.");
    } catch (err) {
      setFieldErrors(err.fieldErrors || {});
    } finally {
      setSubmitting(false);
    }
  };

  if (!mounted) return null;

  return createPortal(
    <div className="rv-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="rv-modal">
        <button className="rv-close" onClick={onClose} aria-label="Close">
          <FiX size={20} />
        </button>

        {successMessage ? (
          <div className="rv-success">
            <FiCheckCircle className="rv-success-icon" />
            <h3>Review submitted</h3>
            <p>{successMessage}</p>
            <button className="rv-btn-primary" onClick={onClose}>Close</button>
          </div>
        ) : (
          <>
            <h3 className="rv-title">Leave a Review</h3>

            <form className="rv-form" onSubmit={handleSubmit}>
              <label className="rv-field">
                <span>Your name</span>
                <input type="text" name="name" value={form.name} onChange={handleChange} required />
                {fieldErrors.name && <p className="rv-error">{fieldErrors.name[0]}</p>}
              </label>

              <label className="rv-field">
                <span>Role / location <em>(optional)</em></span>
                <input type="text" name="role" value={form.role} onChange={handleChange} placeholder="e.g. Verified Customer" />
                {fieldErrors.role && <p className="rv-error">{fieldErrors.role[0]}</p>}
              </label>

              <div className="rv-field">
                <span>Rating</span>
                <div className="rv-star-picker" role="radiogroup" aria-label="Rating">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      className="rv-star-btn"
                      aria-label={`${value} star${value > 1 ? "s" : ""}`}
                      onMouseEnter={() => setHoverStar(value)}
                      onMouseLeave={() => setHoverStar(0)}
                      onClick={() => handleRate(value)}
                    >
                      <FiStar
                        className={(hoverStar || form.rating) >= value ? "rv-star rv-star--filled" : "rv-star"}
                      />
                    </button>
                  ))}
                </div>
                {fieldErrors.rating && <p className="rv-error">{fieldErrors.rating[0]}</p>}
              </div>

              <label className="rv-field">
                <span>Your review</span>
                <textarea name="review" rows={4} value={form.review} onChange={handleChange} required />
                {fieldErrors.review && <p className="rv-error">{fieldErrors.review[0]}</p>}
              </label>

              <label className="rv-field">
                <span>Photo <em>(optional)</em></span>
                <input type="file" accept="image/*" onChange={handlePhoto} />
                {fieldErrors.photo && <p className="rv-error">{fieldErrors.photo[0]}</p>}
              </label>

              {fieldErrors.non_field_errors && (
                <p className="rv-error">{fieldErrors.non_field_errors[0]}</p>
              )}

              <button className="rv-btn-primary" type="submit" disabled={submitting || !form.rating}>
                {submitting ? "Submitting…" : "Submit review"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}
