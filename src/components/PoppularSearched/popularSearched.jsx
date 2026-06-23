"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FiTrendingUp } from "react-icons/fi";
import { FaGasPump, FaOilCan, FaPlug, FaLeaf, FaSeedling, FaCog } from "react-icons/fa";
import { MdElectricBolt } from "react-icons/md";
import { GiGearStick, GiGears } from "react-icons/gi";
import { getCars } from "../../lib/cars";
import { brandSlug, carUrl } from "../../lib/format";
import "./popularSearched.css";

const volkswagenLogo = "/assets/images/cars-logos/volkswagen-01.png";
const audiLogo = "/assets/images/cars-logos/audi-01.png";
const bmwLogo = "/assets/images/cars-logos/BMW-01.png";
const toyotaLogo = "/assets/images/cars-logos/toyota-01.png";
const nissanLogo = "/assets/images/cars-logos/nissan-01.png";
const landRoverLogo = "/assets/images/cars-logos/land rover-01.png";
const kiaLogo = "/assets/images/cars-logos/Kia-01.png";
const citroenLogo = "/assets/images/cars-logos/Citroen-01.png";
const fiatLogo = "/assets/images/cars-logos/fiat-01.png";
const hondaLogo = "/assets/images/cars-logos/honda-01.png";
const hyundaiLogo = "/assets/images/cars-logos/hyundai-01.png";
const jeepLogo = "/assets/images/cars-logos/jeep-01.png";
const mazdaLogo = "/assets/images/cars-logos/mazda-01.png";
const mgLogo = "/assets/images/cars-logos/MG-01.png";
const miniLogo = "/assets/images/cars-logos/MINI-01.png";
const renaultLogo = "/assets/images/cars-logos/Renault-01.png";
const seatLogo = "/assets/images/cars-logos/SEAT-01.png";
const vauxhallLogo = "/assets/images/cars-logos/vauxhall-01.png";
const MercedesLogo = "/assets/images/cars-logos/MERCEDES-01.png";

const tabs = ["Make", "Body Type", "Fuel", "Gearbox", "Trending"];

const makeItems = [
  { label: "Volkswagen", logo: volkswagenLogo },
  { label: "Audi", logo: audiLogo },
  { label: "BMW", logo: bmwLogo },
  { label: "Toyota", logo: toyotaLogo },
  { label: "Nissan", logo: nissanLogo },
  { label: "Land Rover", logo: landRoverLogo },
  { label: "Kia", logo: kiaLogo },
  { label: "Citroen", logo: citroenLogo },
  { label: "Fiat", logo: fiatLogo },
  { label: "Honda", logo: hondaLogo },
  { label: "Hyundai", logo: hyundaiLogo },
  { label: "Jeep", logo: jeepLogo },
  { label: "Mazda", logo: mazdaLogo },
  { label: "MG", logo: mgLogo },
  { label: "MINI", logo: miniLogo },
  { label: "Renault", logo: renaultLogo },
  { label: "SEAT", logo: seatLogo },
  { label: "Vauxhall", logo: vauxhallLogo },
  { label: "Mercedes-Benz", logo: MercedesLogo },
];

const bodyTypeItems = [
  { label: "Hatchback", img: "https://images.unsplash.com/photo-1541443131876-44b03de101c5?w=120&h=60&fit=crop&auto=format" },
  { label: "Estate", img: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=120&h=60&fit=crop&auto=format" },
  { label: "SUV", img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=120&h=60&fit=crop&auto=format" },
  { label: "Saloon", img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=120&h=60&fit=crop&auto=format" },
  { label: "Coupe", img: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=120&h=60&fit=crop&auto=format" },
  { label: "People Carrier", img: "https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?w=120&h=60&fit=crop&auto=format" },
  { label: "Convertible", img: "https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?w=120&h=60&fit=crop&auto=format" },
  { label: "Pick-Up", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&h=60&fit=crop&auto=format" },
];

const fuelItems = [
  { label: "Petrol", Icon: FaGasPump },
  { label: "Diesel", Icon: FaOilCan },
  { label: "Electric", Icon: MdElectricBolt },
  { label: "Hybrid", Icon: FaLeaf },
  { label: "Plug-in Hybrid", Icon: FaPlug },
  { label: "Mild Hybrid", Icon: FaSeedling },
];

const gearboxItems = [
  { label: "Automatic", Icon: GiGearStick },
  { label: "Manual", Icon: FaCog },
  { label: "Semi-Auto", Icon: GiGears },
];

const MakeCard = ({ item }) => (
  <Link href={`/used-cars/${brandSlug(item.label)}`} className="search-card make-card" aria-label={item.label}>
    <img
      src={item.logo}
      alt={item.label}
      className="make-logo"
      onError={(e) => { e.target.style.display = "none"; }}
    />
    <span className="make-label">{item.label}</span>
  </Link>
);

const BodyTypeCard = ({ item }) => (
  <Link href={`/stock?bodyType=${encodeURIComponent(item.label)}`} className="search-card body-card" aria-label={item.label}>
    <img
      src={item.img}
      alt={item.label}
      className="body-img"
      onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=120&h=60&fit=crop"; }}
    />
    <span className="body-label">{item.label}</span>
  </Link>
);

const FuelCard = ({ item }) => (
  <Link href={`/stock?fuel=${encodeURIComponent(item.label)}`} className="search-card fuel-card" aria-label={item.label}>
    <item.Icon className="fuel-icon" />
    <span className="fuel-label">{item.label}</span>
  </Link>
);

const GearboxCard = ({ item }) => (
  <Link href={`/stock?transmission=${encodeURIComponent(item.label)}`} className="search-card gearbox-card" aria-label={item.label}>
    <item.Icon className="fuel-icon" />
    <span className="fuel-label">{item.label}</span>
  </Link>
);

const TrendingCard = ({ car }) => (
  <Link href={carUrl(car)} className="search-card body-card" aria-label={car.title}>
    <img
      src={car.image_url}
      alt={car.title}
      className="body-img"
      onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=120&h=60&fit=crop"; }}
    />
    <span className="body-label">{car.title}</span>
  </Link>
);

export default function PopularSearches() {
  const [activeTab, setActiveTab] = useState("Make");
  const [trendingCars, setTrendingCars] = useState([]);

  useEffect(() => {
    let active = true;
    getCars().then((data) => { if (active) setTrendingCars(Array.isArray(data) ? data : []); });
    return () => { active = false; };
  }, []);

  const renderCards = () => {
    switch (activeTab) {
      case "Make":
        return makeItems.map((item) => <MakeCard key={item.label} item={item} />);
      case "Body Type":
        return bodyTypeItems.map((item) => <BodyTypeCard key={item.label} item={item} />);
      case "Fuel":
        return fuelItems.map((item) => <FuelCard key={item.label} item={item} />);
      case "Gearbox":
        return gearboxItems.map((item) => <GearboxCard key={item.label} item={item} />);
      case "Trending":
        return trendingCars.map((car) => <TrendingCard key={car.id} car={car} />);
      default:
        return null;
    }
  };

  return (
    <section className="popular-searches-section wrapper">
      <h2 className="section-title sec-title">Popular searches</h2>

      {/* Tab Nav */}
      <div className="tabs-wrapper">
        <div className="tabs-list" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              className={`tab-btn${activeTab === tab ? " tab-btn--active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
              {tab === "Trending" && (
                <FiTrendingUp className="trending-icon" aria-hidden="true" />
              )}
            </button>
          ))}
        </div>
        <div className="tabs-underline" />
      </div>

      {/* Cards Row */}
      <div className="cards-container">
        <div className="cards-scroll">
          {renderCards()}
        </div>

      </div>
    </section>
  );
}