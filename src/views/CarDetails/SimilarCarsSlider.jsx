"use client";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "./SimilarCarsSlider.css";

const SIMILAR_CARS = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80",
    name: "Volkswagen Touareg",
    desc: "65 3.0 TDI V6 Bluemotion Tech Escape Tip...",
    year: "65",
    miles: "121000 miles",
    fuel: "Diesel",
    finance: "£210.10",
    price: "£9,999",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=600&q=80",
    name: "Volkswagen Sharan",
    desc: "14 2.0 TDI Bluemotion Tech S DSG Euro 5...",
    year: "14",
    miles: "78000 miles",
    fuel: "Diesel",
    finance: "£157.62",
    price: "£7,499",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=600&q=80",
    name: "Volkswagen Sharan",
    desc: "68 2.0 TDI SE Nav DSG Euro 6 (S/S) 5DR",
    year: "68",
    miles: "84000 miles",
    fuel: "Diesel",
    finance: "£299.33",
    price: "£14,250",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600&q=80",
    name: "Volkswagen Polo",
    desc: "10 1.4 SE DSG Euro 5 3DR",
    year: "10",
    miles: "21853 miles",
    fuel: "Petrol",
    finance: "£136.44",
    price: "£6,490",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80",
    name: "Honda Civic",
    desc: "15 1.6 iDTEC SE Plus Hatchback 5DR Diesel",
    year: "15",
    miles: "82000 miles",
    fuel: "Diesel",
    finance: "£110.20",
    price: "£6,250",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=80",
    name: "BMW 3 Series",
    desc: "18 2.0 320d SE Saloon 4DR Diesel Auto",
    year: "18",
    miles: "54000 miles",
    fuel: "Diesel",
    finance: "£245.80",
    price: "£11,750",
  },
];

export default function SimilarCarsSlider() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

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
          {SIMILAR_CARS.map((car) => (
            <SwiperSlide key={car.id}>
              <div className="sc-card">
                <div className="sc-img-wrap">
                  <img src={car.image} alt={car.name} loading="lazy" />
                  <div className="sc-badge">
                    <div className="sc-badge-icon">AA</div>
                    <div className="sc-badge-text">Cars<br />Standards</div>
                  </div>
                </div>

                <div className="sc-body">
                  <div className="sc-car-name">{car.name}</div>
                  <p className="sc-car-desc">{car.desc}</p>

                  <div className="sc-tags">
                    <span className="sc-tag">{car.year}</span>
                    <span className="sc-tag">{car.miles}</span>
                    <span className="sc-tag">{car.fuel}</span>
                  </div>

                  <div className="sc-price-row">
                    <span className="sc-full-price">{car.price}</span>
                  </div>
                </div>

                <button className="sc-btn">View this vehicle</button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </div>
  );
}
