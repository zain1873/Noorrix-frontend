"use client";
import React, { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "../components/Navbar/Navbar";
import NoorrixFooter from "../components/Footer/Footer";
import {
  FaCalendarAlt, FaTachometerAlt, FaCog, FaLeaf, FaGasPump, FaClone,
  FaCar, FaPhoneAlt, FaExchangeAlt, FaThLarge, FaTint, FaTag,
  FaSlidersH, FaChevronDown, FaTimes, FaCheck,
} from "react-icons/fa";
import "../components/FeatureCards/FeatureCard.css";
import "./OurStock.css";
import { useAuth, loginGate } from "../context/AuthContext";
import { gbp, miles, cc, ukDate, carUrl } from "../lib/format";
import HeartButton from "../components/HeartButton/HeartButton";
import AutoTraderBadge from "../components/AutoTraderBadge/AutoTraderBadge";

/* ── Fallback filter options (used until /api/filters/ provides live ones) ── */
const DEFAULT_BODY_TYPES    = ["SUV", "Hatchback", "Saloon", "Estate", "Coupe", "Convertible", "MPV", "Van"];
const DEFAULT_FUEL_TYPES    = ["Petrol", "Diesel", "Hybrid", "Electric", "Mild Hybrid"];
const DEFAULT_TRANSMISSIONS = ["Automatic", "Manual", "CVT", "Semi-Automatic"];
const DEFAULT_COLOURS       = ["Black", "White", "Silver", "Grey", "Blue", "Red", "Green", "Orange"];

const DEFAULT_PRICE_OPTIONS = [
  { label: "Under £10,000",      min: 0,     max: 10000    },
  { label: "£10,000 – £15,000",  min: 10000, max: 15000    },
  { label: "£15,000 – £20,000",  min: 15000, max: 20000    },
  { label: "£20,000 – £30,000",  min: 20000, max: 30000    },
  { label: "£30,000+",           min: 30000, max: Infinity  },
];
const DEFAULT_MILEAGE_OPTIONS = [
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

/* Convert API ranges ({max:null} = no upper bound) to numeric ranges; fall back to defaults. */
function normRanges(ranges, fallback) {
  return Array.isArray(ranges) && ranges.length
    ? ranges.map((r) => ({ label: r.label, min: r.min ?? 0, max: r.max == null ? Infinity : r.max }))
    : fallback;
}

/* Reads price values arriving from the URL — e.g. Home hero filter → /stock?make=BMW&priceMax=15000 */
function parsePriceFromParams(sp, priceOptions) {
  const hasMin = sp.has("priceMin");
  const hasMax = sp.has("priceMax");
  if (!hasMin && !hasMax) return { label: "", range: { min: 0, max: Infinity } };
  const min = hasMin ? Number(sp.get("priceMin")) : 0;
  const max = hasMax ? Number(sp.get("priceMax")) : Infinity;
  const preset = priceOptions.find((o) => o.min === min && o.max === max);
  let label;
  if (preset)       label = preset.label;
  else if (!hasMin) label = `Up to £${max.toLocaleString()}`;
  else if (!hasMax) label = `£${min.toLocaleString()}+`;
  else              label = `£${min.toLocaleString()} – £${max.toLocaleString()}`;
  return { label, range: { min, max } };
}

/* ─────────────────── Component ─────────────────── */
export default function OurStock({ cars = [], filters = null }) {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const { user }     = useAuth();

  /* ── Filter options: live from /api/filters/, else fallbacks ── */
  const f = filters || {};
  const makes          = f.makes || [];
  const makeModels     = f.makeModels || {};
  const bodyTypes      = f.bodyTypes || DEFAULT_BODY_TYPES;
  const fuelTypes      = f.fuelTypes || DEFAULT_FUEL_TYPES;
  const transmissions  = f.transmissions || DEFAULT_TRANSMISSIONS;
  const colours        = f.colours || DEFAULT_COLOURS;
  const priceOptions   = normRanges(f.priceRanges,   DEFAULT_PRICE_OPTIONS);
  const mileageOptions = normRanges(f.mileageRanges, DEFAULT_MILEAGE_OPTIONS);

  const initialPrice = parsePriceFromParams(searchParams, priceOptions);

  const [make,         setMake]         = useState(() => searchParams.get("make")         || "");
  const [model,        setModel]        = useState(() => searchParams.get("model")        || "");
  const [bodyType,     setBodyType]     = useState(() => searchParams.get("bodyType")     || "");
  const [fuelType,     setFuelType]     = useState(() => searchParams.get("fuel")         || "");
  const [transmission, setTransmission] = useState(() => searchParams.get("transmission") || "");
  const [colour,       setColour]       = useState(() => searchParams.get("colour")       || "");
  const [priceLabel,   setPriceLabel]   = useState(initialPrice.label);
  const [priceRange,   setPriceRange]   = useState(initialPrice.range);
  const [mileageLabel, setMileageLabel] = useState("");
  const [mileageRange, setMileageRange] = useState({ min: 0, max: Infinity });

  const [showModal,      setShowModal]      = useState(false);
  const [expandedFilter, setExpandedFilter] = useState(null);

  /* ── Derived ── */
  const filtered = useMemo(
    () => cars.filter((car) => {
      if (make         && car.make         !== make)         return false;
      if (model        && car.model        !== model)        return false;
      if (bodyType     && car.body_type    !== bodyType)     return false;
      if (fuelType     && car.fuel         !== fuelType)     return false;
      if (transmission && car.transmission !== transmission) return false;
      if (colour       && car.colour       !== colour)       return false;
      if (car.price   < priceRange.min   || car.price   > priceRange.max)   return false;
      if (car.mileage < mileageRange.min || car.mileage > mileageRange.max) return false;
      return true;
    }),
    [cars, make, model, bodyType, fuelType, transmission, colour, priceRange, mileageRange]
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
    cars.filter((car) => {
      if (key !== "make"         && make         && car.make         !== make)         return false;
      if (key !== "model"        && model        && car.model        !== model)        return false;
      if (key !== "bodyType"     && bodyType     && car.body_type    !== bodyType)     return false;
      if (key !== "fuel"         && fuelType     && car.fuel         !== fuelType)     return false;
      if (key !== "transmission" && transmission && car.transmission !== transmission) return false;
      if (key !== "colour"       && colour       && car.colour       !== colour)       return false;
      if (key !== "price"   && (car.price   < priceRange.min   || car.price   > priceRange.max))   return false;
      if (key !== "mileage" && (car.mileage < mileageRange.min || car.mileage > mileageRange.max)) return false;
      switch (key) {
        case "make":         return car.make         === value;
        case "model":        return car.model        === value;
        case "bodyType":     return car.body_type    === value;
        case "fuel":         return car.fuel         === value;
        case "transmission": return car.transmission === value;
        case "colour":       return car.colour       === value;
        case "price": {
          const o = priceOptions.find((x) => x.label === value);
          return o ? car.price >= o.min && car.price <= o.max : false;
        }
        case "mileage": {
          const o = mileageOptions.find((x) => x.label === value);
          return o ? car.mileage >= o.min && car.mileage <= o.max : false;
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
              <div key={car.id} className="mazda-card" onClick={() => router.push(carUrl(car))} style={{ cursor: "pointer" }}>
                <div className="card-image-container">
                  <img src={car.image_url} alt={car.title} className="card-image" />
                  <HeartButton car={car} />
                  {car.status === "reserved" && <span className="reserved-badge">Reserved</span>}
                  {car.status === "sold" && <span className="sold-badge">Sold</span>}
                  <AutoTraderBadge />
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
                    <a
                      href="tel:07300503113"
                      className="call-to-book"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span className="call-to-book-icon">
                        <FaPhoneAlt size={13} />
                      </span>
                      <span className="call-to-book-label">Call to Book</span>
                    </a>
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