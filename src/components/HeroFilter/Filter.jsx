"use client";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { getFilters } from "../../lib/cars";
import "./Filter.css";

const DEFAULT_TRANSMISSIONS = ["Automatic", "Manual", "CVT", "Semi-Automatic"];

// Budget slider — matched to the actual used-car inventory (most stock is well under £30k).
// The slider at its MAX is treated as "Any budget" (no upper price limit), so a default
// search never filters cars out — the user must slide down to constrain the price.
const BUDGET_MIN = 5000;
const BUDGET_MAX = 50000;
const BUDGET_STEP = 1000;

export default function HeroFilter() {
  const router = useRouter();

  // Filter options come from the same /api/filters/ source as the stock page, so the
  // hero filter can only ever offer makes/models that are actually in stock.
  const [makeModels, setMakeModels] = useState({});
  const [transmissions, setTransmissions] = useState(DEFAULT_TRANSMISSIONS);

  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [transmission, setTransmission] = useState("");
  const [budget, setBudget] = useState(BUDGET_MAX);

  useEffect(() => {
    let active = true;
    getFilters().then((f) => {
      if (!active || !f) return;
      setMakeModels(f.makeModels || {});
      if (Array.isArray(f.transmissions) && f.transmissions.length) {
        setTransmissions(f.transmissions);
      }
    });
    return () => { active = false; };
  }, []);

  const makes = useMemo(() => Object.keys(makeModels), [makeModels]);
  const allModels = useMemo(
    () => Array.from(new Set(Object.values(makeModels).flat())).sort(),
    [makeModels]
  );
  const models = make ? (makeModels[make] || []) : allModels;

  const handleSearch = () => {
    // Carry the chosen filters to the Our Stock page via URL query params.
    // OurStock reads these with useSearchParams() and pre-applies them.
    const params = new URLSearchParams();
    if (make)         params.set("make", make);
    if (model)        params.set("model", model);
    if (transmission) params.set("transmission", transmission);
    // Slider at max = "Any budget" → send no price limit so every car shows.
    if (budget < BUDGET_MAX) params.set("priceMax", String(budget));

    const qs = params.toString();
    router.push(qs ? `/stock?${qs}` : "/stock");
  };

  return (
  <div className="hero-filter">
      <h2 className="filter-heading">Find Your Car</h2>

      <div className="filter-group">
        <label className="filter-label">Make</label>
        <select
          className="filter-select"
          value={make}
          onChange={(e) => { setMake(e.target.value); setModel(""); }}
        >
          <option value="">Any Make</option>
          {makes.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label className="filter-label">Model</label>
        <select className="filter-select" value={model} onChange={(e) => setModel(e.target.value)}>
          <option value="">Any Model</option>
          {models.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>

      </div>

      <div className="filter-group">
        <label className="filter-label">Transmission</label>
        <select
          className="filter-select"
          value={transmission}
          onChange={(e) => setTransmission(e.target.value)}
        >
          <option value="">Any Transmission</option>
          {transmissions.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label className="filter-label">
          Budget{" "}
          <span className="budget-value">
            {budget >= BUDGET_MAX ? "Any" : `£${budget.toLocaleString()}`}
          </span>
        </label>
        <input
          type="range"
          className="filter-range"
          min={BUDGET_MIN}
          max={BUDGET_MAX}
          step={BUDGET_STEP}
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
        />
        <div className="budget-minmax">
          <span>£{BUDGET_MIN.toLocaleString()}</span>
          <span>£{BUDGET_MAX.toLocaleString()}+</span>
        </div>
      </div>

      <button className="filter-btn" onClick={handleSearch}>
        Search Cars
      </button>
    </div>
  );
}
