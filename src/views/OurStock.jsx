"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Navbar from "../components/Navbar/Navbar";
import NoorrixFooter from "../components/Footer/Footer";
import {
  FaCalendarAlt, FaTachometerAlt, FaCog, FaLeaf, FaGasPump, FaClone,
  FaCar, FaPhoneAlt, FaExchangeAlt, FaThLarge, FaTint, FaTag,
  FaSlidersH, FaChevronDown, FaTimes, FaCheck, FaCheckCircle,
} from "react-icons/fa";
import "../components/FeatureCards/FeatureCard.css";
import "./OurStock.css";
import { useAuth, loginGate } from "../context/AuthContext";
import { gbp, miles, cc, ukDate, carUrl } from "../lib/format";
import HeartButton from "../components/HeartButton/HeartButton";
import AutoTraderBadge from "../components/AutoTraderBadge/AutoTraderBadge";
import { PRICE_BANDS } from "../lib/priceBands";
import { getCarsPage } from "../lib/cars";

/* ── Fallback filter options (used until /api/filters/ provides live ones) ── */
const DEFAULT_BODY_TYPES    = ["SUV", "Hatchback", "Saloon", "Estate", "Coupe", "Convertible", "MPV", "Van"];
const DEFAULT_FUEL_TYPES    = ["Petrol", "Diesel", "Hybrid", "Electric", "Mild Hybrid"];
const DEFAULT_TRANSMISSIONS = ["Automatic", "Manual", "CVT", "Semi-Automatic"];
const DEFAULT_COLOURS       = ["Black", "White", "Silver", "Grey", "Blue", "Red", "Green", "Orange"];

/* Availability filter — "Available" and "Sold" each show ONLY cars with that status.
   /api/filters/ sends `statuses`; reserved is deliberately never offered as an option. */
const DEFAULT_STATUSES = ["available", "sold"];
const statusLabel = (value) => (value ? value.charAt(0).toUpperCase() + value.slice(1) : "");
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
  { key: "status",       label: "Availability", Icon: FaCheckCircle },
];

/* ── Paging + sort (the API does the filtering, sorting and slicing) ── */
const PAGE_SIZE = 12;
const DEFAULT_SORT = "-created_at";
const SORT_OPTIONS = [
  { value: "-created_at", label: "Newest" },
  { value: "price",       label: "Price: low to high" },
  { value: "-price",      label: "Price: high to low" },
  { value: "mileage",     label: "Mileage: low to high" },
  { value: "-year",       label: "Year: newest first" },
];

/* The page URL keeps the param names other pages already link with
   (e.g. Home hero filter → /stock?make=BMW&priceMax=15000); these map them to the API's. */
const STRING_PARAMS = { make: "make", model: "model", bodyType: "body_type", fuel: "fuel", transmission: "transmission", colour: "colour" };
const RANGE_PARAMS  = { price: ["price_min", "price_max"], mileage: ["mileage_min", "mileage_max"] };
const FILTER_URL_KEYS = [...Object.keys(STRING_PARAMS), "priceMin", "priceMax", "mileageMin", "mileageMax", "status"];

/* Convert API ranges ({max:null} = no upper bound) to numeric ranges; fall back to defaults. */
function normRanges(ranges, fallback) {
  return Array.isArray(ranges) && ranges.length
    ? ranges.map((r) => ({ label: r.label, min: r.min ?? 0, max: r.max == null ? Infinity : r.max }))
    : fallback;
}

/* Whole number ≥ 0 from a URL value, or null if missing/invalid. */
function wholeNumber(value) {
  if (value == null || value === "") return null;
  const n = Math.round(Number(value));
  return Number.isFinite(n) && n >= 0 ? n : null;
}

/* {min, max} from e.g. priceMin/priceMax in the URL; null = no bound (a min of 0 is no bound too). */
function rangeFromParams(sp, prefix) {
  return { min: wholeNumber(sp.get(`${prefix}Min`)) || null, max: wholeNumber(sp.get(`${prefix}Max`)) };
}

/* Pill label for a URL range: the matching preset band, else a readable custom range. */
function rangeLabel({ min, max }, options, fmt) {
  if (min == null && max == null) return "";
  const preset = options.find((o) => o.min === (min ?? 0) && o.max === (max ?? Infinity));
  if (preset)        return preset.label;
  if (min == null)   return `Up to ${fmt(max)}`;
  if (max == null)   return `${fmt(min)}+`;
  return `${fmt(min)} – ${fmt(max)}`;
}

/* URL params for a chosen band (null = clear it). Unbounded ends are left out. */
function rangeToParams(prefix, band) {
  return {
    [`${prefix}Min`]: band?.min > 0 ? band.min : null,
    [`${prefix}Max`]: band && Number.isFinite(band.max) ? band.max : null,
  };
}

const pageNumber = (sp) => Math.max(1, parseInt(sp.get("page"), 10) || 1);
const sortValue  = (sp) => (SORT_OPTIONS.some((o) => o.value === sp.get("sort")) ? sp.get("sort") : DEFAULT_SORT);

/* Page URL → API query string. Params with no (valid) value are left out. */
function buildApiQuery(sp) {
  const api = new URLSearchParams({ page: String(pageNumber(sp)), page_size: String(PAGE_SIZE) });
  for (const [key, apiKey] of Object.entries(STRING_PARAMS)) {
    const value = sp.get(key);
    if (value) api.set(apiKey, value);
  }
  for (const [prefix, [minKey, maxKey]] of Object.entries(RANGE_PARAMS)) {
    const { min, max } = rangeFromParams(sp, prefix);
    if (min != null) api.set(minKey, String(min));
    if (max != null) api.set(maxKey, String(max));
  }
  const status = sp.get("status");
  if (DEFAULT_STATUSES.includes(status)) api.set("status", status);
  const sort = sortValue(sp);
  if (sort !== DEFAULT_SORT) api.set("ordering", sort);
  return api.toString();
}

/* Current URL with `changes` applied; a null/empty value removes that param. */
function buildHref(pathname, sp, changes) {
  const next = new URLSearchParams(sp.toString());
  for (const [key, value] of Object.entries(changes)) {
    if (value == null || value === "") next.delete(key);
    else next.set(key, String(value));
  }
  const qs = next.toString();
  return qs ? `${pathname}?${qs}` : pathname;
}

/* Page buttons: first, last, and the current page ±1, with "…" for the gaps. */
function pageList(current, total) {
  const pages = [];
  for (let p = 1; p <= total; p++) {
    if (p === 1 || p === total || Math.abs(p - current) <= 1) pages.push(p);
    else if (pages[pages.length - 1] !== "…") pages.push("…");
  }
  return pages;
}

/* ─────────────────── Component ─────────────────── */
export default function OurStock({ filters = null }) {
  const router       = useRouter();
  const pathname     = usePathname();
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
  const mileageOptions = normRanges(f.mileageRanges, DEFAULT_MILEAGE_OPTIONS);

  // Price: use the API's bands only once they reach down to the budget end of the
  // inventory (first band ≤ £1,500). An API still serving the old "Under £10,000"
  // first band would put every car in one band, so fall back to lib/priceBands.js.
  const apiPriceOptions = normRanges(f.priceRanges, null);
  const priceOptions    = apiPriceOptions?.[0]?.max <= 1500 ? apiPriceOptions : PRICE_BANDS;

  // Availability: API `statuses`, narrowed to the two we offer.
  const statusOptions = (Array.isArray(f.statuses) && f.statuses.length ? f.statuses : DEFAULT_STATUSES)
    .filter((v) => DEFAULT_STATUSES.includes(v))
    .map((v) => ({ label: statusLabel(v), value: v }));

  /* ── Current filters, sort and page: the URL is the single source of truth, so
        refresh, back/forward and shared links all restore the same view ── */
  const make         = searchParams.get("make")         || "";
  const model        = searchParams.get("model")        || "";
  const bodyType     = searchParams.get("bodyType")     || "";
  const fuelType     = searchParams.get("fuel")         || "";
  const transmission = searchParams.get("transmission") || "";
  const colour       = searchParams.get("colour")       || "";
  const status       = DEFAULT_STATUSES.includes(searchParams.get("status")) ? searchParams.get("status") : "";
  const priceLabel   = rangeLabel(rangeFromParams(searchParams, "price"),   priceOptions,   (n) => `£${n.toLocaleString()}`);
  const mileageLabel = rangeLabel(rangeFromParams(searchParams, "mileage"), mileageOptions, (n) => `${n.toLocaleString()} miles`);
  const sort         = sortValue(searchParams);
  const page         = pageNumber(searchParams);
  const apiQuery     = buildApiQuery(searchParams);

  const [showModal,      setShowModal]      = useState(false);
  const [expandedFilter, setExpandedFilter] = useState(null);

  /* ── Fetch the current page. Each new query aborts the in-flight request, so a slow
        response can never overwrite a newer one. `result.query` is the query the shown
        data belongs to — while it differs from `apiQuery`, a request is in flight. ── */
  const [result,  setResult]  = useState({ query: null, data: null, failed: false });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    getCarsPage(apiQuery, { signal: controller.signal }).then((data) => {
      if (controller.signal.aborted) return;
      setResult({ query: apiQuery, data, failed: !data });
    });
    return () => controller.abort();
  }, [apiQuery, attempt]);

  const loading    = result.query !== apiQuery;
  const data       = result.data;
  const cars       = data?.results ?? [];
  const count      = data?.count ?? 0;
  const totalPages = data?.total_pages ?? 0;

  // A page past the last one (e.g. a stale shared link) comes back empty — jump to page 1.
  useEffect(() => {
    if (result.query === apiQuery && data && data.results.length === 0 && data.count > 0 && page > 1) {
      router.replace(buildHref(pathname, searchParams, { page: null }), { scroll: false });
    }
  }, [result.query, apiQuery, data, page, router, pathname, searchParams]);

  const activeCount = [make, model, bodyType, fuelType, transmission, colour, priceLabel, mileageLabel, status].filter(Boolean).length;

  /* ── Helpers ── */
  /* Update the URL (which triggers the fetch). Filter and sort changes go back to page 1. */
  const navigate = (changes, { resetPage = true } = {}) => {
    const href = buildHref(pathname, searchParams, resetPage ? { ...changes, page: null } : changes);
    router.push(href, { scroll: false });
  };

  const goToPage = (p) => {
    navigate({ page: p > 1 ? p : null }, { resetPage: false });
    document.getElementById("browse-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const retry = () => {
    setResult((r) => ({ ...r, query: null }));
    setAttempt((n) => n + 1);
  };

  // Clears every filter; the chosen sort stays.
  const clearAll = () => navigate(Object.fromEntries(FILTER_URL_KEYS.map((key) => [key, null])));

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
      case "status":       return !!status;
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
      case "status":       return statusLabel(status) || "Availability";
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
      case "status":       return statusOptions.map((o) => o.label);
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
      case "status":       return statusLabel(status) === value;
      default:             return false;
    }
  };

  // Clicking the selected option again clears that filter.
  const toggle = (current, value) => (current === value ? null : value);

  const selectOption = (key, value) => {
    switch (key) {
      case "make":         navigate({ make: toggle(make, value), model: null }); break;
      case "model":        navigate({ model:        toggle(model, value) });        break;
      case "bodyType":     navigate({ bodyType:     toggle(bodyType, value) });     break;
      case "fuel":         navigate({ fuel:         toggle(fuelType, value) });     break;
      case "transmission": navigate({ transmission: toggle(transmission, value) }); break;
      case "colour":       navigate({ colour:       toggle(colour, value) });       break;
      case "price": {
        const band = priceLabel === value ? null : priceOptions.find((x) => x.label === value);
        navigate(rangeToParams("price", band));
        break;
      }
      case "mileage": {
        const band = mileageLabel === value ? null : mileageOptions.find((x) => x.label === value);
        navigate(rangeToParams("mileage", band));
        break;
      }
      case "status": {
        const o = statusOptions.find((x) => x.label === value);
        navigate({ status: o && status !== o.value ? o.value : null });
        break;
      }
      default: break;
    }
  };

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
        <div className="stock-browse-header">
          <h2 className="stock-browse-title">
            Browse All Cars
            {data && <span className="stock-browse-count">{count} {count === 1 ? "car" : "cars"} found</span>}
          </h2>
          <label className="stock-sort">
            <span className="stock-sort-label">Sort by</span>
            <select
              className="stock-sort-select"
              value={sort}
              onChange={(e) => navigate({ sort: e.target.value === DEFAULT_SORT ? null : e.target.value })}
            >
              {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </label>
        </div>

        {result.failed && !loading ? (
          <div className="stock-no-results">
            We couldn&apos;t load cars right now.{" "}
            <button type="button" className="stock-retry" onClick={retry}>Try again</button>
          </div>
        ) : !data || (loading && count === 0) ? (
          <div className="stock-no-results" role="status">Loading cars…</div>
        ) : count === 0 ? (
          <div className="stock-no-results">No vehicles match your search. Try adjusting your filters.</div>
        ) : (
          <>
          <div className={`stock-cards-grid${loading ? " stock-cards-grid--loading" : ""}`} aria-busy={loading}>
            {cars.map((car) => (
              <div key={car.id} className="mazda-card" onClick={() => router.push(carUrl(car))} style={{ cursor: "pointer" }}>
                <div className="card-image-container">
                  <img src={car.image_url} alt={car.title} className="card-image" />
                  <HeartButton car={car} />
                  {car.status === "reserved" && <span className="reserved-badge">Reserved</span>}
                  {car.status === "sold" && <span className="sold-badge">Sold</span>}
                  <AutoTraderBadge showCarguru />
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

          {totalPages > 1 && (
            <nav className="stock-pagination" aria-label="Stock pages">
              <button
                type="button"
                className="stock-page-btn"
                onClick={() => goToPage(page - 1)}
                disabled={page <= 1 || loading}
              >
                ‹ Prev
              </button>
              {pageList(page, totalPages).map((p, i) =>
                p === "…" ? (
                  <span key={`gap-${i}`} className="stock-page-gap">…</span>
                ) : (
                  <button
                    key={p}
                    type="button"
                    className={`stock-page-btn${p === page ? " stock-page-btn--active" : ""}`}
                    onClick={() => goToPage(p)}
                    disabled={loading}
                    aria-current={p === page ? "page" : undefined}
                  >
                    {p}
                  </button>
                )
              )}
              <button
                type="button"
                className="stock-page-btn"
                onClick={() => goToPage(page + 1)}
                disabled={page >= totalPages || loading}
              >
                Next ›
              </button>
            </nav>
          )}
          </>
        )}
      </div>

      <NoorrixFooter />
    </>
  );
}