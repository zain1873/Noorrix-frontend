"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaCalendarAlt, FaTachometerAlt, FaCog, FaLeaf, FaGasPump, FaClone, FaHeartBroken,
} from "react-icons/fa";
import Navbar from "../../components/Navbar/Navbar";
import NoorrixFooter from "../../components/Footer/Footer";
import HeartButton from "../../components/HeartButton/HeartButton";
import { useAuth, loginGate } from "../../context/AuthContext";
import { getCars } from "../../lib/cars";
import { getFavourites, getGuestFavouriteIds } from "../../lib/favourites";
import { gbp, money, miles, cc, ukDate, carUrl } from "../../lib/format";
import "../../components/FeatureCards/FeatureCard.css";
import "../OurStock.css";
import "./Favourites.css";

export default function Favourites() {
  const router = useRouter();
  const { user, hydrated } = useAuth();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!hydrated) return;
    let active = true;

    (async () => {
      setLoading(true);
      let result = [];
      if (user) {
        result = await getFavourites();
      } else {
        const guestIds = new Set(getGuestFavouriteIds());
        if (guestIds.size) {
          const all = await getCars();
          result = (all || []).filter((c) => guestIds.has(c.id));
        }
      }
      if (active) {
        setCars(Array.isArray(result) ? result : []);
        setLoading(false);
      }
    })();

    return () => { active = false; };
  }, [user, hydrated]);

  return (
    <>
      <Navbar />

      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3 text-sm">
          <a href="/" className="breadcrumb text-gray-500 transition-colors">Home</a>
          <span className="mx-2 text-gray-300">›</span>
          <span className="text-gray-900 font-medium">Favourites</span>
        </div>
      </div>

      <div className="stock-browse-section">
        <h2 className="stock-browse-title">
          Your Favourites <span className="stock-browse-count">({cars.length})</span>
        </h2>

        {!loading && cars.length === 0 ? (
          <div className="fav-empty">
            <FaHeartBroken size={36} />
            <p>No saved cars yet</p>
            <span>Tap the heart on any car to save it here.</span>
          </div>
        ) : (
          <div className="stock-cards-grid">
            {cars.map((car) => (
              <div
                key={car.id}
                className="mazda-card"
                onClick={() => router.push(carUrl(car))}
                style={{ cursor: "pointer" }}
              >
                <div className="card-image-container">
                  <img src={car.image_url} alt={car.title} className="card-image" />
                  <HeartButton car={car} />
                  {car.status === "reserved" && <span className="reserved-badge">Reserved</span>}
                  {car.status === "sold" && <span className="sold-badge">Sold</span>}
                </div>
                <div className="card-content">
                  <h2 className="car-title">{car.title}</h2>
                  <p className="car-subtitle">{car.subtitle}</p>
                  <div className="specs-grid">
                    <div className="spec-item"><FaCalendarAlt  className="spec-icon" /><span className="spec-value">{car.year}</span></div>
                    <div className="spec-item"><FaTachometerAlt className="spec-icon" /><span className="spec-value">{cc(car.engine_cc)}</span></div>
                    <div className="spec-item"><FaCog          className="spec-icon" /><span className="spec-value">{car.transmission}</span></div>
                    <div className="spec-item"><FaClone        className="spec-icon" /><span className="spec-value">{miles(car.mileage)}</span></div>
                    <div className="spec-item"><FaLeaf         className="spec-icon" /><span className="spec-value">{ukDate(car.mot_date)}</span></div>
                    <div className="spec-item"><FaGasPump      className="spec-icon" /><span className="spec-value">{car.fuel}</span></div>
                  </div>
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
                  <div className="action-buttons">
                    <button className="btn btn-finance" onClick={(e) => { e.stopPropagation(); router.push(carUrl(car)); }}>View Details</button>
                    <button className="btn btn-reserve" onClick={(e) => { e.stopPropagation(); router.push(loginGate(user, `/checkout?amount=${Number(car.deposit_amount) || 200}&car=${car.id}`)); }}>
                      <span className="reserve-title">Reserve For {gbp(Number(car.deposit_amount) || 200)}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <NoorrixFooter />
    </>
  );
}
