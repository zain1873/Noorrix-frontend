"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearch, FaPhoneAlt, FaPhoneVolume, FaMobileAlt, FaEnvelope } from "react-icons/fa";
import "./VehicleSidebar.css";

const makeModels = {
  Toyota: ["Aygo", "Yaris", "Corolla", "Prius", "C-HR", "RAV4", "Land Cruiser"],
  Honda: ["Jazz", "Civic", "HR-V", "CR-V", "Accord"],
  BMW: ["1 Series", "2 Series", "3 Series", "4 Series", "5 Series", "X1", "X3", "X5", "M3", "M4"],
  "Mercedes-Benz": ["A-Class", "C-Class", "E-Class", "S-Class", "GLA", "GLC", "GLE"],
  Ford: ["Fiesta", "Focus", "Puma", "Kuga", "Mustang", "Ranger"],
  Audi: ["A1", "A3", "A4", "A5", "A6", "Q3", "Q5", "Q7", "TT"],
  Volkswagen: ["Polo", "Golf", "Golf GTI", "Passat", "Tiguan", "T-Roc"],
  Hyundai: ["i10", "i20", "i30", "IONIQ 5", "Kona", "Tucson"],
  Kia: ["Picanto", "Ceed", "Sportage", "Sorento", "EV6"],
  Nissan: ["Micra", "Juke", "Qashqai", "X-Trail", "Leaf"],
  "Land Rover": ["Defender", "Discovery", "Discovery Sport", "Range Rover", "Range Rover Sport"],
  Jaguar: ["XE", "XF", "F-Type", "E-Pace", "F-Pace"],
  Vauxhall: ["Corsa", "Astra", "Mokka", "Grandland"],
  Porsche: ["911", "Cayenne", "Macan", "Panamera", "Taycan"],
  Tesla: ["Model 3", "Model Y", "Model S", "Model X"],
  Volvo: ["XC40", "XC60", "XC90", "V60", "S60"],
  Mini: ["Hatch", "Convertible", "Clubman", "Countryman"],
  Mazda: ["2", "3", "6", "MX-5", "CX-30", "CX-5"],
  Peugeot: ["208", "308", "2008", "3008", "5008"],
  Renault: ["Clio", "Megane", "Captur", "Kadjar"],
};

const priceOptions = [
  "Under £5,000",
  "Under £10,000",
  "Under £15,000",
  "Under £20,000",
  "Under £30,000",
  "Under £50,000",
  "No Maximum",
];

export default function VehicleSidebar() {
  const router = useRouter();
  const [searchMake, setSearchMake] = useState("");
  const [searchModel, setSearchModel] = useState("");
  const [searchPrice, setSearchPrice] = useState("");

  const availableModels = searchMake ? (makeModels[searchMake] ?? []) : [];

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
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
        <button className="vs-sidebar-search-btn" onClick={() => router.push("/stock")}>
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
