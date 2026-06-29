"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { FaSearch, FaPhoneAlt, FaPhoneVolume, FaMobileAlt, FaEnvelope } from "react-icons/fa";
import { getFilters } from "../../lib/cars";
import "./VehicleSidebar.css";

const priceOptions = [
  { label: "Under £5,000", max: 5000 },
  { label: "Under £10,000", max: 10000 },
  { label: "Under £15,000", max: 15000 },
  { label: "Under £20,000", max: 20000 },
  { label: "Under £30,000", max: 30000 },
  { label: "Under £50,000", max: 50000 },
  { label: "No Maximum", max: null },
];

export default function VehicleSidebar() {
  const router = useRouter();
  const [makeModels, setMakeModels] = useState({});
  const [searchMake, setSearchMake] = useState("");
  const [searchModel, setSearchModel] = useState("");
  const [searchPrice, setSearchPrice] = useState("");

  // Same /api/filters/ source as HeroFilter/Filter.jsx, so this sidebar can
  // only ever offer makes/models that are actually in stock.
  useEffect(() => {
    let active = true;
    getFilters().then((f) => {
      if (!active || !f) return;
      setMakeModels(f.makeModels || {});
    });
    return () => { active = false; };
  }, []);

  const availableModels = searchMake ? (makeModels[searchMake] ?? []) : [];

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchMake) params.set("make", searchMake);
    if (searchModel) params.set("model", searchModel);
    const priceBand = priceOptions.find((p) => p.label === searchPrice);
    if (priceBand?.max != null) params.set("priceMax", String(priceBand.max));

    const qs = params.toString();
    router.push(qs ? `/stock?${qs}` : "/stock");
  };

  return (
    <div className="vs-sidebar">

      {/* Vehicles for Sale */}
      <div className="vs-sidebar-card">
        <h3 className="vs-sidebar-card-title">
          <FaSearch size={14} /> Vehicles for Sale
        </h3>
        <div className="vs-sidebar-selects">
          <select
            className="vs-sidebar-select"
            value={searchMake}
            onChange={(e) => { setSearchMake(e.target.value); setSearchModel(""); }}
          >
            <option value="">Any make</option>
            {Object.keys(makeModels).map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <select
            className="vs-sidebar-select"
            value={searchModel}
            onChange={(e) => setSearchModel(e.target.value)}
            disabled={!searchMake}
          >
            <option value="">Any model</option>
            {availableModels.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <select
            className="vs-sidebar-select"
            value={searchPrice}
            onChange={(e) => setSearchPrice(e.target.value)}
          >
            <option value="">Maximum price</option>
            {priceOptions.map((p) => (
              <option key={p.label} value={p.label}>{p.label}</option>
            ))}
          </select>
        </div>
        <button className="vs-sidebar-search-btn" onClick={handleSearch}>
          SEARCH
        </button>
      </div>

      {/* Get In Touch */}
      <div className="vs-sidebar-card">
        <h3 className="vs-sidebar-card-title">
          <FaPhoneAlt size={14} /> Get In Touch
        </h3>
        <p className="vs-sidebar-card-sub">Why not contact us directly?</p>
        <div className="vs-sidebar-contacts">
          <a href="tel:07300503113" className="vs-sidebar-contact-item">
            <FaMobileAlt size={15} />
            <span>07300 503 113</span>
          </a>
          <a href="mailto:info@noorrixmotors.co.uk" className="vs-sidebar-contact-item">
            <FaEnvelope size={15} />
            <span>Email Us</span>
          </a>
        </div>
      </div>

    </div>
  );
}
