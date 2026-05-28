"use client";
import { useState } from "react";
import "./Filter.css";

const makeModels = {
  "": ["Any Model"],
  Toyota: ["Any Model", "Aygo", "Yaris", "Corolla", "Prius", "C-HR", "Camry", "RAV4", "Land Cruiser", "Hilux", "GR86", "Supra"],
  Honda: ["Any Model", "Jazz", "Civic", "HR-V", "CR-V", "Accord", "ZR-V", "e:Ny1", "Legend"],
  BMW: ["Any Model", "1 Series", "2 Series", "3 Series", "4 Series", "5 Series", "7 Series", "8 Series", "X1", "X2", "X3", "X4", "X5", "X6", "X7", "Z4", "M2", "M3", "M4", "M5", "iX", "i4", "i5"],
  "Mercedes-Benz": ["Any Model", "A-Class", "B-Class", "C-Class", "E-Class", "S-Class", "CLA", "CLS", "GLA", "GLB", "GLC", "GLE", "GLS", "G-Class", "EQA", "EQB", "EQC", "EQE", "EQS", "AMG GT"],
  Ford: ["Any Model", "Fiesta", "Focus", "Puma", "Kuga", "Mustang", "Mustang Mach-E", "Galaxy", "S-Max", "Mondeo", "Explorer", "Ranger", "Transit", "Transit Custom"],
  Audi: ["Any Model", "A1", "A3", "A4", "A5", "A6", "A7", "A8", "Q2", "Q3", "Q4 e-tron", "Q5", "Q7", "Q8", "TT", "R8", "e-tron GT"],
  Volkswagen: ["Any Model", "Polo", "Golf", "Golf GTI", "Golf R", "Passat", "Arteon", "T-Cross", "T-Roc", "Tiguan", "Touareg", "ID.3", "ID.4", "ID.5", "ID.7", "Caddy", "Transporter"],
  Hyundai: ["Any Model", "i10", "i20", "i30", "i30 N", "IONIQ 5", "IONIQ 6", "Kona", "Tucson", "Santa Fe", "Staria"],
  Kia: ["Any Model", "Picanto", "Rio", "Ceed", "ProCeed", "Stinger", "Sportage", "Niro", "Sorento", "EV6", "EV9"],
  Nissan: ["Any Model", "Micra", "Juke", "Qashqai", "X-Trail", "Leaf", "Ariya", "Navara", "Pathfinder"],
  "Land Rover": ["Any Model", "Defender", "Discovery", "Discovery Sport", "Freelander", "Range Rover", "Range Rover Sport", "Range Rover Evoque", "Range Rover Velar"],
  Jaguar: ["Any Model", "XE", "XF", "XJ", "F-Type", "E-Pace", "F-Pace", "I-Pace"],
  Vauxhall: ["Any Model", "Corsa", "Astra", "Mokka", "Crossland", "Grandland", "Insignia", "Combo", "Vivaro", "Movano"],
  Peugeot: ["Any Model", "108", "208", "308", "408", "508", "2008", "3008", "5008", "e-208", "e-2008", "Partner", "Expert", "Boxer"],
  Renault: ["Any Model", "Clio", "Megane", "Arkana", "Austral", "Kadjar", "Captur", "Koleos", "Zoe", "Megane E-Tech", "Trafic", "Master"],
  Citroën: ["Any Model", "C1", "C3", "C4", "C5 X", "C3 Aircross", "C5 Aircross", "Berlingo", "SpaceTourer"],
  SEAT: ["Any Model", "Ibiza", "Leon", "Leon ST", "Arona", "Ateca", "Tarraco"],
  Škoda: ["Any Model", "Fabia", "Scala", "Octavia", "Superb", "Kamiq", "Karoq", "Kodiaq", "Enyaq"],
  Mazda: ["Any Model", "2", "3", "6", "MX-5", "CX-3", "CX-30", "CX-5", "CX-60", "CX-80", "MX-30"],
  Volvo: ["Any Model", "S60", "S90", "V40", "V60", "V90", "XC40", "XC60", "XC90", "C40"],
  Tesla: ["Any Model", "Model 3", "Model Y", "Model S", "Model X", "Cybertruck"],
  Porsche: ["Any Model", "718 Boxster", "718 Cayman", "911", "Cayenne", "Macan", "Panamera", "Taycan"],
  Lexus: ["Any Model", "CT", "IS", "ES", "LS", "RC", "LC", "UX", "NX", "RX", "GX", "LX"],
  Infiniti: ["Any Model", "Q30", "Q50", "Q60", "QX30", "QX50", "QX70", "QX80"],
  Jeep: ["Any Model", "Renegade", "Compass", "Cherokee", "Grand Cherokee", "Wrangler", "Gladiator"],
  Mitsubishi: ["Any Model", "Colt", "ASX", "Eclipse Cross", "Outlander", "L200"],
  Subaru: ["Any Model", "Impreza", "Legacy", "Outback", "Forester", "XV", "BRZ", "WRX STI"],
  Suzuki: ["Any Model", "Alto", "Celerio", "Swift", "Ignis", "Baleno", "S-Cross", "Vitara", "Jimny"],
  Fiat: ["Any Model", "500", "500X", "500L", "Panda", "Tipo", "Doblo", "Ducato"],
  Alfa: ["Any Model", "Giulia", "Stelvio", "Tonale", "Giulietta", "MiTo"],
  Mini: ["Any Model", "Hatch", "Convertible", "Clubman", "Countryman", "Paceman", "Roadster", "Coupe", "Aceman"],
  "Aston Martin": ["Any Model", "DB11", "DB12", "Vantage", "DBS", "DBX"],
  Bentley: ["Any Model", "Continental GT", "Continental GTC", "Flying Spur", "Bentayga"],
  Rolls: ["Any Model", "Ghost", "Wraith", "Dawn", "Cullinan", "Phantom", "Spectre"],
  Ferrari: ["Any Model", "296 GTB", "296 GTS", "Roma", "Portofino", "SF90", "F8 Tributo", "812"],
  Lamborghini: ["Any Model", "Huracan", "Urus", "Revuelto"],
  Maserati: ["Any Model", "Ghibli", "Quattroporte", "Levante", "GranTurismo", "GranCabrio", "Grecale"],
};

const makes = ["Any Make", ...Object.keys(makeModels).filter((k) => k !== "")];

const allModels = [
  "Any Model",
  ...Array.from(
    new Set(
      Object.entries(makeModels)
        .filter(([k]) => k !== "")
        .flatMap(([, models]) => models.filter((m) => m !== "Any Model"))
    )
  ).sort(),
];

const transmissions = ["Any Transmission", "Automatic", "Manual", "CVT", "Semi-Automatic"];

export default function HeroFilter() {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [transmission, setTransmission] = useState("");

  const [budget, setBudget] = useState(50000);

  const models = make ? makeModels[make] : allModels;

  const handleSearch = () => {
    console.log({ make, model, transmission, budget });
    // Hook up your search/filter logic here
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
          {makes.map((m) => (
            <option key={m} value={m === "Any Make" ? "" : m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label className="filter-label">Model</label>
        <select className="filter-select" value={model} onChange={(e) => setModel(e.target.value)}>
          {models.map((m) => (
            <option key={m} value={m === "Any Model" ? "" : m}>
              {m}
            </option>
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
          {transmissions.map((t) => (
            <option key={t} value={t === "Any Transmission" ? "" : t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label className="filter-label">
          Budget <span className="budget-value">${budget.toLocaleString()}</span>
        </label>
        <input
          type="range"
          className="filter-range"
          min={5000}
          max={200000}
          step={1000}
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
        />
        <div className="budget-minmax">
          <span>$5,000</span>
          <span>$200,000</span>
        </div>
      </div>

      <button className="filter-btn" onClick={handleSearch}>
        Search Cars
      </button>
    </div>
  );
}