"use client";
import React, { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  FaCalendarAlt,
  FaTachometerAlt,
  FaCog,
  FaLeaf,
  FaGasPump,
  FaClone,
} from "react-icons/fa";
import { stockData } from "../../data/cars";
import "./FeatureCard.css";


const FeatureCard = () => {
  const router = useRouter();
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
    <div className="card-wrapper wrapper sp" ref={containerRef}>
      {/* Section Heading */}
      <div className="section-heading">
        <h2 className="sec-title">Dealer's Top Picks</h2>
        <p>Only the best rides make our featured car list.</p>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        spaceBetween={16}
        grabCursor={true}
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
        breakpoints={{
          0:    { slidesPerView: 1 },
          480:  { slidesPerView: 2 },
          768:  { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {stockData.map((car) => (
          <SwiperSlide key={car.id}>
            <div className="mazda-card" onClick={() => router.push(`/cars/${car.id}`)} style={{ cursor: "pointer" }}>
              {/* Image Section */}
              <div className="card-image-container">
                <img
                  src={car.img}
                  alt={car.title}
                  className="card-image"
                />
              </div>

              {/* Content Section */}
              <div className="card-content">
                {/* Title */}
                <h2 className="car-title">{car.title}</h2>
                <p className="car-subtitle">{car.subtitle}</p>

                {/* Specs Grid */}
                <div className="specs-grid">
                  <div className="spec-item">
                    <FaCalendarAlt className="spec-icon" />
                    <span className="spec-value">{car.year}</span>
                  </div>
                  <div className="spec-item">
                    <FaTachometerAlt className="spec-icon" />
                    <span className="spec-value">{car.cc}</span>
                  </div>
                  <div className="spec-item">
                    <FaCog className="spec-icon" />
                    <span className="spec-value">{car.transmission}</span>
                  </div>
                  <div className="spec-item">
                    <FaClone className="spec-icon" />
                    <span className="spec-value">{car.miles}</span>
                  </div>
                  <div className="spec-item">
                    <FaLeaf className="spec-icon" />
                    <span className="spec-value">{car.mot}</span>
                  </div>
                  <div className="spec-item">
                    <FaGasPump className="spec-icon" />
                    <span className="spec-value">{car.fuel}</span>
                  </div>
                </div>

                {/* Price Section */}
                <div className="price-section">
                  <div className="monthly-price">
                    <span className="price-amount">{car.monthly}</span>
                    <span className="price-label">Per month</span>
                  </div>
                  <div className="total-price">
                    <span className="total-amount">{car.total}</span>
                    <span className="total-label">Total Price</span>
                  </div>
                </div>

                {/* Rating Badges */}
                {/* <div className="rating-badges">
                  <div className="badge autotrader-badge">
                    <span className="badge-source autotrader-source">≡AutoTrader</span>
                    <span className="badge-label great">Great Price</span>
                  </div>
                  <div className="badge gurus-badge">
                    <span className="badge-source gurus-source">CarGurus·</span>
                    <span className="badge-label good">Good Price</span>
                  </div>
                </div> */}

                {/* Action Buttons */}
                <div className="action-buttons">
                  <button className="btn btn-finance" onClick={(e) => { e.stopPropagation(); router.push(`/cars/${car.id}`); }}>View Details</button>
                  <button className="btn btn-reserve" onClick={(e) => { e.stopPropagation(); router.push('/login'); }}>
                    <span className="reserve-title">Reserve For £200</span>
                    <span className="reserve-sub">Deposit fully refundable</span>
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeatureCard;