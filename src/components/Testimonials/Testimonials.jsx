"use client";
// Testimonials.jsx
import { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaStar, FaCommentAlt } from "react-icons/fa";

// Swiper core styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./Testimonials.css";

const testimonials = [
  {
    id: 1,
    text: "Dude, your stuff is the bomb! House rent is the real deal! I STRONGLY recommend house rent to EVERYONE interested in running a successful online business!",
    author: "Lana Bernier",
    title: "Senior Paradigm Strategist",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
  },
  {
    id: 2,
    text: '"I like Infinity Estate more and more each day because it makes my life a lot easier. We can\'t understand how we\'ve been living without Infinity Estate. Infinity Estate has got everything I need. The service was excellent."',
    author: "Mrs. Van Hartmann",
    title: "Legacy Usability Manager",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80",
  },
  {
    id: 3,
    text: "You've saved our business! Infinity Estate has got everything I need. We were treated like royalty. It's really wonderful.",
    author: "Philip Deckow",
    title: "District Assurance Officer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
  },
  {
    id: 4,
    text: "Absolutely fantastic experience from start to finish. The team was professional, responsive, and went above and beyond to make sure we found exactly what we were looking for.",
    author: "Sarah Mitchell",
    title: "Chief Marketing Officer",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=80",
  },
  {
    id: 5,
    text: "I've worked with many real estate platforms before, but nothing compares to this. The UI is clean, the listings are accurate, and the customer support is world-class.",
    author: "James Fowler",
    title: "VP of Operations",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80",
  },
  {
    id: 6,
    text: "We closed on our dream home within two weeks of using this platform. The automated alerts and personalized recommendations made all the difference. Highly recommended!",
    author: "Angela Torres",
    title: "Regional Sales Director",
    avatar: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=80&q=80",
  },
];

export default function Testimonials() {
  const swiperRef = useRef(null);
  const containerRef = useRef(null);

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

  return (
    <section className="testimonials-section" ref={containerRef}>
      {/* Background */}
      <div className="testimonials-bg" />
      {/* Overlay */}
      <div className="testimonials-overlay" />

      {/* Content */}
      <div className="testimonials-content">
        {/* Heading */}
        <div className="section-heading sec-title">
          <h2 className="">What Our Clients Say</h2>
          <p>Real stories from real customers who love our service</p>
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
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                  <div className="testimonial-badge">
                    <FaCommentAlt className="badge-icon" />
                    <span>Testimonial</span>
                  </div>
                </div>

                {/* Review */}
                <p className="review-text">{t.text}</p>

                {/* Author */}
                <div className="author-row">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="author-avatar"
                    loading="lazy"
                  />
                  <div className="author-info">
                    <span className="author-name">{t.author}</span>
                    <span className="author-title">{t.title}</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}