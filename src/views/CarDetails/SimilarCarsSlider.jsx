"use client";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { gbp, miles, carUrl } from "../../lib/format";
import HeartButton from "../../components/HeartButton/HeartButton";
import "./SimilarCarsSlider.css";

export default function SimilarCarsSlider({ cars = [] }) {
  const router = useRouter();
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  if (!cars.length) return null;

  return (
    <div className="sc-section">
      <div className="sc-inner">

        <div className="sc-header">
          <h2 className="sc-title">Similar cars</h2>
          <div className="sc-nav-btns">
            <button ref={prevRef} className="sc-nav-btn" aria-label="Previous">
              <FiChevronLeft size={18} />
            </button>
            <button ref={nextRef} className="sc-nav-btn" aria-label="Next">
              <FiChevronRight size={18} />
            </button>
          </div>
        </div>

        <Swiper
          className="sc-swiper"
          modules={[Autoplay, Navigation, Pagination]}
          grabCursor
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          breakpoints={{
            0:   { slidesPerView: 1, spaceBetween: 16 },
            480: { slidesPerView: 1.4, spaceBetween: 16 },
            640: { slidesPerView: 2, spaceBetween: 20 },
            900: { slidesPerView: 3, spaceBetween: 20 },
            1200: { slidesPerView: 4, spaceBetween: 24 },
          }}
        >
          {cars.map((car) => (
            <SwiperSlide key={car.id}>
              <div className="sc-card">
                <div className="sc-img-wrap">
                  <img src={car.image_url} alt={car.title} loading="lazy" />
                  <HeartButton car={car} />
                  {car.status === "reserved" && <span className="reserved-badge">Reserved</span>}
                  {car.status === "sold" && <span className="sold-badge">Sold</span>}
                  <div className="sc-badge">
                    <div className="sc-badge-icon">AA</div>
                    <div className="sc-badge-text">Cars<br />Standards</div>
                  </div>
                </div>

                <div className="sc-body">
                  <div className="sc-car-name">{car.title}</div>
                  <p className="sc-car-desc">{car.subtitle}</p>

                  <div className="sc-tags">
                    <span className="sc-tag">{car.year}</span>
                    <span className="sc-tag">{miles(car.mileage)}</span>
                    <span className="sc-tag">{car.fuel}</span>
                  </div>

                  <div className="sc-price-row">
                    <span className="sc-full-price">{gbp(car.price)}</span>
                  </div>
                </div>

                <button className="sc-btn" onClick={() => router.push(carUrl(car))}>
                  View this vehicle
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </div>
  );
}
