"use client";
import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar/Navbar";
import NoorrixFooter from "../components/Footer/Footer";
import {
  FaCalendarAlt, FaTachometerAlt, FaCog, FaLeaf, FaGasPump, FaClone,
  FaCar, FaPhoneAlt, FaExchangeAlt, FaThLarge, FaTint, FaTag,
  FaSlidersH, FaChevronDown, FaTimes, FaCheck,
} from "react-icons/fa";
import "../components/FeatureCards/FeatureCard.css";
import "./OurStock.css";
import { stockData, makeModels } from "../data/cars";
import { useAuth, loginGate } from "../context/AuthContext";

/* ─────────────────── Filter-only data ─────────────────── */
const makes = Object.keys(makeModels);

const bodyTypes     = ["SUV", "Hatchback", "Saloon", "Estate", "Coupe", "Convertible", "MPV", "Van"];
const fuelTypes     = ["Petrol", "Diesel", "Hybrid", "Electric", "Mild Hybrid"];
const transmissions = ["Automatic", "Manual", "CVT", "Semi-Automatic"];
const colours       = ["Black", "White", "Silver", "Grey", "Blue", "Red", "Green", "Orange"];

const priceOptions = [
  { label: "Under £10,000",      min: 0,     max: 10000    },
  { label: "£10,000 – £15,000",  min: 10000, max: 15000    },
  { label: "£15,000 – £20,000",  min: 15000, max: 20000    },
  { label: "£20,000 – £30,000",  min: 20000, max: 30000    },
  { label: "£30,000+",           min: 30000, max: Infinity  },
];
const mileageOptions = [
  { label: "Under 20,000",       min: 0,      max: 20000    },
  { label: "20,000 – 50,000",    min: 20000,  max: 50000    },
  { label: "50,000 – 100,000",   min: 50000,  max: 100000   },
  { label: "100,000+",           min: 100000, max: Infinity  },
];

const filterConfig = [
  { key: "make",         label: "Make",         Icon: FaExchangeAlt },
  { key: "model",        label: "Model",        Icon: FaCar         },
  { key: "bodyType",     label: "Body Type",    Icon: FaThLarge     },
  { key: "fuel",         label: "Fuel Type",    Icon: FaGasPump     },
  { key: "transmission", label: "Transmission", Icon: FaCog         },
  { key: "colour",       label: "Colour",       Icon: FaTint        },
  { key: "price",        label: "Price",        Icon: FaTag         },
  { key: "mileage",      label: "Mileage",      Icon: FaTachometerAlt },
];

/* ─────────────────── Component ─────────────────── */
export default function OurStock() {
  const router = useRouter();
  const { user } = useAuth();

  const [make,         setMake]         = useState("");
  const [model,        setModel]        = useState("");
  const [bodyType,     setBodyType]     = useState("");
  const [fuelType,     setFuelType]     = useState("");
  const [transmission, setTransmission] = useState("");
  const [colour,       setColour]       = useState("");
  const [priceLabel,   setPriceLabel]   = useState("");
  const [priceRange,   setPriceRange]   = useState({ min: 0, max: Infinity });
  const [mileageLabel, setMileageLabel] = useState("");
  const [mileageRange, setMileageRange] = useState({ min: 0, max: Infinity });

  const [showModal,      setShowModal]      = useState(false);
  const [expandedFilter, setExpandedFilter] = useState(null);

  /* ── Derived ── */
  const filtered = useMemo(
    () => stockData.filter((car) => {
      if (make         && car.make         !== make)         return false;
      if (model        && car.model        !== model)        return false;
      if (bodyType     && car.bodyType     !== bodyType)     return false;
      if (fuelType     && car.fuel         !== fuelType)     return false;
      if (transmission && car.transmission !== transmission) return false;
      if (colour       && car.colour       !== colour)       return false;
      if (car.priceNum   < priceRange.min   || car.priceNum   > priceRange.max)   return false;
      if (car.mileageNum < mileageRange.min || car.mileageNum > mileageRange.max) return false;
      return true;
    }),
    [make, model, bodyType, fuelType, transmission, colour, priceRange, mileageRange]
  );

  const activeCount = [make, model, bodyType, fuelType, transmission, colour, priceLabel, mileageLabel].filter(Boolean).length;

  /* ── Helpers ── */
  const clearAll = () => {
    setMake(""); setModel(""); setBodyType(""); setFuelType("");
    setTransmission(""); setColour("");
    setPriceLabel("");   setPriceRange({ min: 0, max: Infinity });
    setMileageLabel(""); setMileageRange({ min: 0, max: Infinity });
  };

  const handleSearch = () => {
    setShowModal(false);
    document.getElementById("browse-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const openModal = (key) => {
    setExpandedFilter(key);
    setShowModal(true);
  };

  const isActive = (key) => {
    switch (key) {
      case "make":         return !!make;
      case "model":        return !!model;
      case "bodyType":     return !!bodyType;
      case "fuel":         return !!fuelType;
      case "transmission": return !!transmission;
      case "colour":       return !!colour;
      case "price":        return !!priceLabel;
      case "mileage":      return !!mileageLabel;
      default:             return false;
    }
  };

  const getFilterTitle = (key) => {
    switch (key) {
      case "make":         return make         || "Any Make";
      case "model":        return model        || "Any Model";
      case "bodyType":     return bodyType     || "Any Body Type";
      case "fuel":         return fuelType     || "Any Fuel Type";
      case "transmission": return transmission || "Any Transmission";
      case "colour":       return colour       || "Any Colour";
      case "price":        return priceLabel   || "Price";
      case "mileage":      return mileageLabel || "Mileage";
      default:             return key;
    }
  };

  const getOptions = (key) => {
    switch (key) {
      case "make":         return makes;
      case "model":        return make ? (makeModels[make] ?? []) : [];
      case "bodyType":     return bodyTypes;
      case "fuel":         return fuelTypes;
      case "transmission": return transmissions;
      case "colour":       return colours;
      case "price":        return priceOptions.map((o) => o.label);
      case "mileage":      return mileageOptions.map((o) => o.label);
      default:             return [];
    }
  };

  const isSelected = (key, value) => {
    switch (key) {
      case "make":         return make         === value;
      case "model":        return model        === value;
      case "bodyType":     return bodyType     === value;
      case "fuel":         return fuelType     === value;
      case "transmission": return transmission === value;
      case "colour":       return colour       === value;
      case "price":        return priceLabel   === value;
      case "mileage":      return mileageLabel === value;
      default:             return false;
    }
  };

  const selectOption = (key, value) => {
    switch (key) {
      case "make":
        setMake((p) => (p === value ? "" : value));
        setModel("");
        break;
      case "model":
        setModel((p) => (p === value ? "" : value));
        break;
      case "bodyType":
        setBodyType((p) => (p === value ? "" : value));
        break;
      case "fuel":
        setFuelType((p) => (p === value ? "" : value));
        break;
      case "transmission":
        setTransmission((p) => (p === value ? "" : value));
        break;
      case "colour":
        setColour((p) => (p === value ? "" : value));
        break;
      case "price": {
        if (priceLabel === value) { setPriceLabel(""); setPriceRange({ min: 0, max: Infinity }); }
        else { const o = priceOptions.find((x) => x.label === value); if (o) { setPriceLabel(o.label); setPriceRange({ min: o.min, max: o.max }); } }
        break;
      }
      case "mileage": {
        if (mileageLabel === value) { setMileageLabel(""); setMileageRange({ min: 0, max: Infinity }); }
        else { const o = mileageOptions.find((x) => x.label === value); if (o) { setMileageLabel(o.label); setMileageRange({ min: o.min, max: o.max }); } }
        break;
      }
      default: break;
    }
  };

  const getCount = (key, value) =>
    stockData.filter((car) => {
      if (key !== "make"         && make         && car.make         !== make)         return false;
      if (key !== "model"        && model        && car.model        !== model)        return false;
      if (key !== "bodyType"     && bodyType     && car.bodyType     !== bodyType)     return false;
      if (key !== "fuel"         && fuelType     && car.fuel         !== fuelType)     return false;
      if (key !== "transmission" && transmission && car.transmission !== transmission) return false;
      if (key !== "colour"       && colour       && car.colour       !== colour)       return false;
      if (key !== "price"   && (car.priceNum   < priceRange.min   || car.priceNum   > priceRange.max))   return false;
      if (key !== "mileage" && (car.mileageNum < mileageRange.min || car.mileageNum > mileageRange.max)) return false;
      switch (key) {
        case "make":         return car.make         === value;
        case "model":        return car.model        === value;
        case "bodyType":     return car.bodyType     === value;
        case "fuel":         return car.fuel         === value;
        case "transmission": return car.transmission === value;
        case "colour":       return car.colour       === value;
        case "price": {
          const o = priceOptions.find((x) => x.label === value);
          return o ? car.priceNum >= o.min && car.priceNum <= o.max : false;
        }
        case "mileage": {
          const o = mileageOptions.find((x) => x.label === value);
          return o ? car.mileageNum >= o.min && car.mileageNum <= o.max : false;
        }
        default: return false;
      }
    }).length;

  /* ─────────────────── Render ─────────────────── */
  return (
    <>
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3 text-sm">
          <a href="/" className="breadcrumb text-gray-500 transition-colors">Home</a>
          <span className="mx-2 text-gray-300">›</span>
          <span className="text-gray-900 font-medium">Our Stock</span>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="stock-hero">
        <div className="stock-hero-bg" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80)` }} />
        <div className="stock-hero-overlay" />
        <div className="stock-hero-top-accent" />
        <div className="stock-hero-glow" />
        <div className="stock-hero-container">
          <span className="stock-hero-tag">Our Vehicle Inventory</span>
          <h1 className="stock-hero-title">Find Your Perfect <span>Drive</span></h1>
          <p className="stock-hero-subtitle">Explore our handpicked selection of premium vehicles. Every car is HPI checked, professionally inspected, and ready to drive away today.</p>
          <div className="stock-hero-buttons">
            <button className="stock-hero-btn stock-hero-btn-primary" onClick={handleSearch}><FaCar size={18} /> Browse Stock</button>
            <a href="/contact" className="stock-hero-btn stock-hero-btn-secondary"><FaPhoneAlt size={18} /> Get in Touch</a>
          </div>
          <div className="stock-hero-stats">
            <div className="stock-hero-stat-item"><span className="stock-hero-stat-number">50<span>+</span></span><span className="stock-hero-stat-label">Vehicles In Stock</span></div>
            <div className="stock-hero-stat-item"><span className="stock-hero-stat-number">100<span>%</span></span><span className="stock-hero-stat-label">HPI Checked</span></div>
            <div className="stock-hero-stat-item"><span className="stock-hero-stat-number">0<span>%</span></span><span className="stock-hero-stat-label">Finance Available</span></div>
            <div className="stock-hero-stat-item"><span className="stock-hero-stat-number">1K<span>+</span></span><span className="stock-hero-stat-label">Happy Customers</span></div>
          </div>
        </div>
      </section>

      {/* Filter Pills Bar */}
      <div className="stock-filter-bar">
        <button
          className={`stock-filters-btn${activeCount ? " stock-filters-btn--active" : ""}`}
          onClick={() => activeCount ? clearAll() : openModal("make")}
        >
          <FaSlidersH />
          {activeCount > 0 ? `Clear (${activeCount})` : "Filters"}
        </button>
        <div className="stock-pills-row">
          {filterConfig.map((f) => (
            <button
              key={f.key}
              className={`stock-pill${isActive(f.key) ? " stock-pill--active" : ""}`}
              onClick={() => openModal(f.key)}
            >
              <f.Icon className="stock-pill-icon" />
              <span>{getFilterTitle(f.key)}</span>
              <FaChevronDown className="stock-pill-caret" />
            </button>
          ))}
        </div>
      </div>

      {/* Filter Modal */}
      {showModal && (
        <div className="stock-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="stock-modal" onClick={(e) => e.stopPropagation()}>

            {/* Header */}
            <div className="stock-modal-header">
              <h2 className="stock-modal-title">Filter and sort</h2>
              <button className="stock-modal-close" onClick={() => setShowModal(false)}>
                <FaTimes />
              </button>
            </div>

            {/* Body */}
            <div className="stock-modal-body">
              {filterConfig.map((f) => {
                const options = getOptions(f.key);
                const open    = expandedFilter === f.key;
                const active  = isActive(f.key);
                return (
                  <div key={f.key} className="stock-modal-filter">
                    <button
                      className="stock-modal-filter-btn"
                      onClick={() => setExpandedFilter(open ? null : f.key)}
                    >
                      <div className="stock-modal-filter-left">
                        <f.Icon className="stock-modal-filter-icon" />
                        <div>
                          <div className={`stock-modal-filter-title${active ? " active" : ""}`}>
                            {getFilterTitle(f.key)}
                          </div>
                          <div className="stock-modal-filter-sub">Select {f.label}</div>
                        </div>
                      </div>
                      <FaChevronDown className={`stock-modal-chevron${open ? " rotated" : ""}`} />
                    </button>

                    {open && (
                      <div className="stock-modal-options">
                        {options.length === 0 ? (
                          <p className="stock-modal-empty">Select a make first</p>
                        ) : (
                          options.map((opt) => {
                            const count    = getCount(f.key, opt);
                            const selected = isSelected(f.key, opt);
                            return (
                              <div
                                key={opt}
                                className={`stock-modal-option${selected ? " selected" : ""}`}
                                onClick={() => selectOption(f.key, opt)}
                              >
                                <div className={`stock-modal-checkbox${selected ? " checked" : ""}`}>
                                  {selected && <FaCheck size={8} />}
                                </div>
                                <span className="stock-modal-option-label">{opt}</span>
                                <span className="stock-modal-option-count">({count})</span>
                              </div>
                            );
                          })
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="stock-modal-footer">
              <button className="stock-modal-clear" onClick={() => { clearAll(); }}>Clear all</button>
              <button className="stock-modal-search" onClick={handleSearch}>Search cars</button>
            </div>
          </div>
        </div>
      )}

      {/* Browse Section */}
      <div className="stock-browse-section" id="browse-section">
        <h2 className="stock-browse-title">
          Browse All Cars <span className="stock-browse-count">({filtered.length})</span>
        </h2>

        {filtered.length === 0 ? (
          <div className="stock-no-results">No vehicles match your search. Try adjusting your filters.</div>
        ) : (
          <div className="stock-cards-grid">
            {filtered.map((car) => (
              <div key={car.id} className="mazda-card" onClick={() => router.push(`/cars/${car.id}`)} style={{ cursor: "pointer" }}>
                <div className="card-image-container">
                  <img src={car.img} alt={car.title} className="card-image" />
                </div>
                <div className="card-content">
                  <h2 className="car-title">{car.title}</h2>
                  <p className="car-subtitle">{car.subtitle}</p>
                  <div className="specs-grid">
                    <div className="spec-item"><FaCalendarAlt  className="spec-icon" /><span className="spec-value">{car.year}</span></div>
                    <div className="spec-item"><FaTachometerAlt className="spec-icon" /><span className="spec-value">{car.cc}</span></div>
                    <div className="spec-item"><FaCog          className="spec-icon" /><span className="spec-value">{car.transmission}</span></div>
                    <div className="spec-item"><FaClone        className="spec-icon" /><span className="spec-value">{car.miles}</span></div>
                    <div className="spec-item"><FaLeaf         className="spec-icon" /><span className="spec-value">{car.mot}</span></div>
                    <div className="spec-item"><FaGasPump      className="spec-icon" /><span className="spec-value">{car.fuel}</span></div>
                  </div>
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
                  <div className="action-buttons">
                    <button className="btn btn-finance" onClick={(e) => e.stopPropagation()}>View Details</button>
                    <button className="btn btn-reserve" onClick={(e) => { e.stopPropagation(); router.push(loginGate(user, `/checkout?amount=200&car=${car.id}`)); }}>
                      <span className="reserve-title">Reserve For £200</span>
                      <span className="reserve-sub">Deposit fully refundable</span>
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
