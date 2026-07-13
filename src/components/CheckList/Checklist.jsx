import React from "react";
import {
  FaCouch,
  FaCarSide,
  FaCar,
  FaOilCan,
  FaTools,
  FaCheckCircle,
} from "react-icons/fa";

import { GiCarWheel, GiMechanicGarage } from "react-icons/gi";

import {
  MdSpeed,
  MdCarRepair,
  MdVerified,
  MdChecklist,
  MdElectricBolt,
  MdHistory,
  MdOutlineDirectionsCar,
} from "react-icons/md";

import { TbEngine } from "react-icons/tb";
import { BsGear } from "react-icons/bs";

import "./CheckList.css";

// ----------------------------------------------------------------
// INSPECTION CHECKLIST SECTION (Static)
// ----------------------------------------------------------------

const INSPECTION_ITEMS = [
  { icon: <FaCouch />, label: "Interior" },
  { icon: <MdSpeed />, label: "Road Test" },
  { icon: <FaTools />, label: "Suspension" },
  { icon: <MdCarRepair />, label: "Under the bonnet" },
  { icon: <FaOilCan />, label: "Oil" },
  { icon: <GiCarWheel />, label: "Wheels & Brakes" },
  { icon: <MdOutlineDirectionsCar />, label: "Body Work" },
  { icon: <MdVerified />, label: "MOT" },
  { icon: <MdChecklist />, label: "Multi Point Check" },
  { icon: <MdElectricBolt />, label: "Electric" },
  { icon: <TbEngine />, label: "Engine" },
  { icon: <BsGear />, label: "Transmission" },
  { icon: <GiMechanicGarage />, label: "Exhaust System" },
  { icon: <MdHistory />, label: "Vehicle History" },
  { icon: <FaCarSide />, label: "Underbody" },
];

function InspectionChecklistSection() {
  return (
    <section className="ic-wrapper">
      <div className="ic-inner">
        <h2 className="ic-title">Checked. Rechecked. Guaranteed.</h2>

        <p className="ic-subtitle">
          Every vehicle undergoes a comprehensive inspection by our experienced
          technicians to ensure quality, safety, and reliability before it
          reaches you.
        </p>

        <div className="ic-grid">
          {INSPECTION_ITEMS.map((item, index) => (
            <div className="ic-item" key={index}>
              <div className="ic-item-left">
                <span className="ic-icon">{item.icon}</span>
                <span className="ic-label">{item.label}</span>
              </div>

              <span className="ic-passed">
                <FaCheckCircle size={14} />
                <span>Passed</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default InspectionChecklistSection;