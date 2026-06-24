"use client";
// Testimonials.jsx
import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaStar, FaRegStar, FaCommentAlt, FaPen } from "react-icons/fa";
import { getTestimonials } from "../../lib/testimonials";
import ReviewModal from "./ReviewModal";

// Swiper core styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./Testimonials.css";

const AVATAR_COLOURS = ["#ac1c7a", "#1c6fac", "#1c9c5b", "#c2750c", "#7a3fc2", "#c22f4a"];
const avatarColour = (name) => {
  const code = (name || "?").trim().charCodeAt(0) || 0;
  return AVATAR_COLOURS[code % AVATAR_COLOURS.length];
};

function StarRating({ rating }) {
  return (
    <div className="stars">
      {[...Array(5)].map((_, i) =>
        i < rating
          ? <FaStar key={i} />
          : <FaRegStar key={i} className="star-empty" />
      )}
    </div>
  );
}

export default function Testimonials() {
  const swiperRef = useRef(null);
  const containerRef = useRef(null);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    let active = true;
    getTestimonials().then((data) => {
      if (!active) return;
      setTestimonials(data);
      setLoading(false);
    });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!swiperRef.current?.autoplay) return;
        if (entry.isIntersecting) {
          swiperRef.current.autoplay.start();
        } else {
          swiperRef.current.autoplay.stop();
        }
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Nothing approved yet (and we're done loading) — don't show fake placeholder content.
  if (!loading && testimonials.length === 0) {
    return (
      <section className="testimonials-section testimonials-section--empty" ref={containerRef}>
        <div className="testimonials-bg" />
        <div className="testimonials-overlay" />
        <div className="testimonials-content">
          <div className="testimonials-header-row">
            <div className="section-heading sec-title">
              <h2>What Our Clients Say</h2>
              <p>Be the first to share your experience with us</p>
            </div>
            <button className="leave-review-btn" onClick={() => setShowForm(true)}>
              <FaPen className="leave-review-icon" />
              Leave a Review
            </button>
          </div>
        </div>
        {showForm && <ReviewModal onClose={() => setShowForm(false)} />}
      </section>
    );
  }

  if (loading) return null;

  return (
    <section className="testimonials-section" ref={containerRef}>
      {/* Background */}
      <div className="testimonials-bg" />
      {/* Overlay */}
      <div className="testimonials-overlay" />

      {/* Content */}
      <div className="testimonials-content">
        {/* Heading */}
        <div className="testimonials-header-row">
          <div className="section-heading sec-title">
            <h2 className="">What Our Clients Say</h2>
            <p>Real stories from real customers who love our service</p>
          </div>
          <button className="leave-review-btn" onClick={() => setShowForm(true)}>
            <FaPen className="leave-review-icon" />
            Leave a Review
          </button>
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          onSwiper={(swiper) => { swiperRef.current = swiper; }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="testimonials-swiper"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}>
              <div className="testimonial-card">
                {/* Top Row */}
                <div className="card-top">
                  <StarRating rating={t.rating} />
                  <div className="testimonial-badge">
                    <FaCommentAlt className="badge-icon" />
                    <span>Reviews</span>
                  </div>
                </div>

                {/* Review */}
                <p className="review-text">{t.review}</p>

                {/* Author */}
                <div className="author-row">
                  {t.photo_url ? (
                    <img
                      src={t.photo_url}
                      alt={t.name}
                      className="author-avatar"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="author-avatar author-avatar--initial"
                      style={{ background: avatarColour(t.name) }}
                      aria-hidden="true"
                    >
                      {(t.name || "?").trim().charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="author-info">
                    <span className="author-name">{t.name}</span>
                    {t.role && <span className="author-title">{t.role}</span>}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {showForm && <ReviewModal onClose={() => setShowForm(false)} />}
    </section>
  );
}
