"use client";
import React, { useRef, useEffect, useState } from "react";
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
import { getCars } from "../../lib/cars";
import { gbp, money, miles, cc, ukDate, carUrl } from "../../lib/format";
import { useAuth, loginGate } from "../../context/AuthContext";
import HeartButton from "../HeartButton/HeartButton";
import "./FeatureCard.css";


const FeatureCard = () => {
  const router = useRouter();
  const { user } = useAuth();
  const swiperRef = useRef(null);
  const containerRef = useRef(null);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    let active = true;
    getCars().then((data) => { if (active) setCars(Array.isArray(data) ? data : []); });
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
        {cars.map((car) => (
          <SwiperSlide key={car.id}>
            <div className="mazda-card" onClick={() => router.push(carUrl(car))} style={{ cursor: "pointer" }}>
              {/* Image Section */}
              <div className="card-image-container">
                <img
                  src={car.image_url}
                  alt={car.title}
                  className="card-image"
                />
                <HeartButton car={car} />
                {car.status === "reserved" && <span className="reserved-badge">Reserved</span>}
                {car.status === "sold" && <span className="sold-badge">Sold</span>}
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
                    <span className="spec-value">{cc(car.engine_cc)}</span>
                  </div>
                  <div className="spec-item">
                    <FaCog className="spec-icon" />
                    <span className="spec-value">{car.transmission}</span>
                  </div>
                  <div className="spec-item">
                    <FaClone className="spec-icon" />
                    <span className="spec-value">{miles(car.mileage)}</span>
                  </div>
                  <div className="spec-item">
                    <FaLeaf className="spec-icon" />
                    <span className="spec-value">{ukDate(car.mot_date)}</span>
                  </div>
                  <div className="spec-item">
                    <FaGasPump className="spec-icon" />
                    <span className="spec-value">{car.fuel}</span>
                  </div>
                </div>

                {/* Price Section */}
                <div className="price-section">
                  <div className="monthly-price">
                    <span className="price-amount">{money(car.monthly)}</span>
                    <span className="price-label">Per month</span>
                  </div>
                  <div className="total-price">
                    <span className="total-amount">{gbp(car.price)}</span>
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
                  <button className="btn btn-finance" onClick={(e) => { e.stopPropagation(); router.push(carUrl(car)); }}>View Details</button>
                  <button className="btn btn-reserve" onClick={(e) => { e.stopPropagation(); router.push(loginGate(user, `/checkout?amount=${Number(car.deposit_amount) || 200}&car=${car.id}`)); }}>
                    <span className="reserve-title">Reserve For {gbp(Number(car.deposit_amount) || 200)}</span>
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