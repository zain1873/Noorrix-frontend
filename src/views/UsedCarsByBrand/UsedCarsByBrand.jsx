"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar/Navbar";
import NoorrixFooter from "../../components/Footer/Footer";
import { useAuth, loginGate } from "../../context/AuthContext";
import { gbp, money, miles, cc, ukDate, carUrl } from "../../lib/format";
import HeartButton from "../../components/HeartButton/HeartButton";
import {
  FaCalendarAlt, FaTachometerAlt, FaCog, FaLeaf,
  FaGasPump, FaClone,
} from "react-icons/fa";
import "../../components/FeatureCards/FeatureCard.css";
import "./UsedCarsByBrand.css";

const bmwLogo = "/assets/images/cars-logos/BMW-01.png";
const audiLogo = "/assets/images/cars-logos/audi-01.png";
const toyotaLogo = "/assets/images/cars-logos/toyota-01.png";
const hondaLogo = "/assets/images/cars-logos/honda-01.png";
const kiaLogo = "/assets/images/cars-logos/Kia-01.png";
const nissanLogo = "/assets/images/cars-logos/nissan-01.png";
const vauxhallLogo = "/assets/images/cars-logos/vauxhall-01.png";
const miniLogo = "/assets/images/cars-logos/MINI-01.png";
const mazdaLogo = "/assets/images/cars-logos/mazda-01.png";
const landRoverLogo = "/assets/images/cars-logos/land rover-01.png";
const fiatLogo = "/assets/images/cars-logos/fiat-01.png";
const hyundaiLogo = "/assets/images/cars-logos/hyundai-01.png";
const vwLogo = "/assets/images/cars-logos/volkswagen-01.png";
const jeepLogo = "/assets/images/cars-logos/jeep-01.png";
const renaultLogo = "/assets/images/cars-logos/Renault-01.png";
const seatLogo = "/assets/images/cars-logos/SEAT-01.png";

const brandLogos = {
  BMW:          bmwLogo,
  Audi:         audiLogo,
  Toyota:       toyotaLogo,
  Honda:        hondaLogo,
  Kia:          kiaLogo,
  Nissan:       nissanLogo,
  Vauxhall:     vauxhallLogo,
  Mini:         miniLogo,
  Mazda:        mazdaLogo,
  "Land Rover": landRoverLogo,
  Fiat:         fiatLogo,
  Hyundai:      hyundaiLogo,
  Volkswagen:   vwLogo,
  Jeep:         jeepLogo,
  Renault:      renaultLogo,
  SEAT:         seatLogo,
};

/* Fallback display name when the brand has no cars in stock (slug → "Mercedes Benz"). */
function prettifyBrand(slug) {
  return decodeURIComponent(slug || "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function UsedCarsByBrand({ brand, cars = [] }) {
  const router = useRouter();
  const { user } = useAuth();

  // The backend already resolved the brand slug to matching cars, so derive the
  // real make from the results; fall back to a prettified slug for an empty brand.
  const displayName = cars[0]?.make || prettifyBrand(brand);
  const logo = brandLogos[cars[0]?.make] || brandLogos[displayName];

  return (
    <>
      <Navbar />

      <div className="brand-breadcrumb-bar">
        <div className="brand-breadcrumb-inner">
          <Link href="/">Home</Link>
          <span>›</span>
          <Link href="/stock">Used Cars</Link>
          <span>›</span>
          <span className="brand-breadcrumb-current">{displayName}</span>
        </div>
      </div>

      <div className="brand-hero">
        <div className="brand-hero-inner">
          <div className="brand-hero-text">
            <h1 className="brand-hero-title">
              Used {displayName} cars in Bedford
            </h1>
            <p className="brand-hero-subtitle">
              If you're looking for a used {displayName} in Bedford, here at
              Noorrix Motors we've got a range of quality used cars for you.
            </p>
            <button
              className="brand-search-btn"
              onClick={() =>
                document
                  .getElementById("brand-cars")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Search {displayName} ({cars.length})
            </button>
          </div>

          {logo && (
            <div className="brand-logo-card">
              <img src={logo} alt={`${displayName} logo`} />
            </div>
          )}
        </div>
      </div>

      <div className="brand-cars-section" id="brand-cars">
        <h2 className="brand-cars-heading">
          {cars.length > 0
            ? `${cars.length} ${displayName} car${cars.length !== 1 ? "s" : ""} in stock`
            : `No ${displayName} cars currently in stock`}
        </h2>

        {cars.length === 0 ? (
          <div className="brand-no-results">
            <p>
              We don't have any {displayName} vehicles right now — check back
              soon or browse all our stock.
            </p>
            <Link href="/stock" className="brand-view-all-btn">
              View All Stock
            </Link>
          </div>
        ) : (
          <div className="stock-cards-grid">
            {cars.map((car) => (
              <Link
                key={car.id}
                href={carUrl(car)}
                className="mazda-card"
                style={{ cursor: "pointer", textDecoration: "none", display: "block" }}
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
                    <button className="btn btn-finance">
                      View Details
                    </button>
                    <button
                      className="btn btn-reserve"
                      onClick={(e) => { e.preventDefault(); router.push(loginGate(user, `/checkout?amount=${Number(car.deposit_amount) || 200}&car=${car.id}`)); }}
                    >
                      <span className="reserve-title">Reserve For {gbp(Number(car.deposit_amount) || 200)}</span>
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <NoorrixFooter />
    </>
  );
}
