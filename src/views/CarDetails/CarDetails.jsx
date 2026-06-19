"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth, loginGate } from "../../context/AuthContext";
import { gbp, money, miles, cc, ukDate } from "../../lib/format";

// ---------- react-icons ----------
import { FiChevronLeft, FiChevronRight, FiChevronDown, FiChevronUp, FiX } from "react-icons/fi";
import { FaStar, FaPhoneAlt, FaEnvelope, FaHome } from "react-icons/fa";
import HeartButton from "../../components/HeartButton/HeartButton";
import { MdLocationOn, MdOutlineDirectionsCar, MdGridView, MdColorLens } from "react-icons/md";
import { BsCalendar3, BsSpeedometer2, BsFuelPump, BsGear, BsCalendarCheck, BsShieldCheck, BsClock, BsCheckCircle } from "react-icons/bs";
import { TbEngine } from "react-icons/tb";
import { GiCarDoor } from "react-icons/gi";
import { RiPaintBrushLine } from "react-icons/ri";
import { IoMdPerson } from "react-icons/io";
import { HiCheckCircle } from "react-icons/hi";
import { AiOutlineCalendar, AiOutlineInfo, AiOutlineCar } from "react-icons/ai";
import { BiPlayCircle } from "react-icons/bi";
import Navbar from "../../components/Navbar/Navbar"

import "./CarDetails.css";
import NoorrixFooter from "../../components/Footer/Footer";
import MessageDealerCard from "../../components/DealerContactCard/DealerContactCard";
import SimilarCarsSlider from "./SimilarCarsSlider";

// ----------------------------------------------------------------
// DATA
// ----------------------------------------------------------------

const SLIDES = [
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=80",
  "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=900&q=80",
  "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=900&q=80",
  "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=900&q=80",
  "https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?w=900&q=80",
  "https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=900&q=80",
];

const SPECS = [
  { icon: <BsSpeedometer2 />, label: "Mileage",        value: "82,000 miles"  },
  { icon: <BsCalendar3    />, label: "Year",           value: "2015 (15 reg)" },
  { icon: <HiCheckCircle />,  label: "History check",  value: "All passed", green: true },
  { icon: <TbEngine       />, label: "Engine",         value: "1.6L"          },
  { icon: <BsFuelPump     />, label: "Fuel type",      value: "Diesel"        },
  { icon: <BsGear         />, label: "Transmission",   value: "Manual"        },
  { icon: <MdOutlineDirectionsCar />, label: "Body Type", value: "Hatchback"  },
  { icon: <GiCarDoor      />, label: "Doors",          value: "5"             },
  { icon: <IoMdPerson     />, label: "Seats",          value: "5"             },
  { icon: <RiPaintBrushLine />, label: "Colour",       value: "Blue"          },
];

const FEATURES = [
  "USB input",              "Trip computer",
  "Traction control",       "Reverse parking aid",
  "Remote central locking", "Rear park assist camera",
  "Rear electric windows",  "Radio/CD",
  "Power Assisted Steering","Passenger airbag",
];

const TABS = ["Features", "Specs", "Equipment", "Running costs & ULEZ"];

// ----------------------------------------------------------------
// GALLERY MODAL
// ----------------------------------------------------------------
function GalleryModal({ startIndex, onClose, slides }) {
  const [active, setActive] = useState(startIndex);

  const prev = () => setActive(i => (i - 1 + slides.length) % slides.length);
  const next = () => setActive(i => (i + 1) % slides.length);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleKey = (e) => {
    if (e.key === "ArrowLeft")  prev();
    if (e.key === "ArrowRight") next();
    if (e.key === "Escape")     onClose();
  };

  return (
    <div
      className="gallery-overlay"
      onClick={handleOverlayClick}
      onKeyDown={handleKey}
      tabIndex={-1}
      ref={el => el && el.focus()}
    >
      <div className="gallery-counter">
        {active + 1} / {slides.length}
      </div>

      <button className="gallery-close" onClick={onClose}>
        <FiX />
      </button>

      <div className="gallery-main">
        <button className="gallery-arrow prev" onClick={prev}>
          <FiChevronLeft />
        </button>

        <img
          key={active}
          className="gallery-main-img"
          src={slides[active]}
          alt={`Gallery ${active + 1}`}
        />

        <button className="gallery-arrow next" onClick={next}>
          <FiChevronRight />
        </button>
      </div>

      <div className="gallery-thumbs">
        {slides.map((src, i) => (
          <div
            key={i}
            className={`gallery-thumb-item ${active === i ? "active" : ""}`}
            onClick={() => setActive(i)}
          >
            <img src={src} alt={`Thumb ${i + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------
// IMAGE SLIDER
// ----------------------------------------------------------------
function ImageSlider({ slides, car }) {
  const [current,     setCurrent    ] = useState(0);
  const [showGallery, setShowGallery] = useState(false);

  const prev = () => setCurrent(i => (i - 1 + slides.length) % slides.length);
  const next = () => setCurrent(i => (i + 1) % slides.length);

  return (
    <>
      <div>
        <div className="image-slider-wrapper" style={{ width: "100%", maxWidth: "100%" }}>
          <div className="photo-count-badge">
            <MdGridView size={14} />
            {slides.length}
          </div>

          <HeartButton car={car} />

          {car.status === "reserved" && <span className="reserved-badge">Reserved</span>}
          {car.status === "sold" && <span className="sold-badge">Sold</span>}

          <img
            className="main-slide"
            src={slides[current]}
            alt={`Car slide ${current + 1}`}
          />

          <span className="viewed-badge">Viewed</span>

          <button
            className="view-gallery-btn"
            onClick={() => setShowGallery(true)}
          >
            <MdGridView size={14} />
            View gallery
          </button>

          <button className="slider-arrow prev" onClick={prev}>
            <FiChevronLeft size={18} />
          </button>
          <button className="slider-arrow next" onClick={next}>
            <FiChevronRight size={18} />
          </button>
        </div>

        <div className="thumbnails-row">
          {slides.slice(0, 3).map((src, i) => (
            <div
              key={i}
              className={`thumbnail ${current === i ? "active" : ""}`}
              onClick={() => setCurrent(i)}
            >
              <img src={src} alt={`Thumb ${i + 1}`} />
            </div>
          ))}
        </div>
      </div>

      {showGallery && (
        <GalleryModal
          startIndex={current}
          slides={slides}
          onClose={() => setShowGallery(false)}
        />
      )}
    </>
  );
}

// ----------------------------------------------------------------
// SPECS GRID
// ----------------------------------------------------------------




// ----------------------------------------------------------------
// DESCRIPTION + CAR OVERVIEW SECTION (Image 1 - Light)
// ----------------------------------------------------------------
function DescriptionOverviewSection({ car }) {
  const descText =
    car.description ||
    `This ${car.year} ${car.title} offers an exceptional blend of performance and efficiency. Featuring a ${cc(car.engine_cc)} ${(car.fuel || "").toLowerCase()} engine with ${(car.transmission || "").toLowerCase()} gearbox, this ${(car.body_type || "").toLowerCase()} has covered ${miles(car.mileage)} and comes with an MOT valid until ${ukDate(car.mot_date)}. A great opportunity to own a quality used vehicle from Noorrix Motors in Bedford.`;

  const overviewItems = [
    { icon: <BsCalendarCheck size={26} />,        label: "MOT date",  value: ukDate(car.mot_date)               },
    { icon: <MdColorLens size={26} />,            label: "Colour",    value: car.colour                         },
    { icon: <BsShieldCheck size={26} />,          label: "Condition", value: car.history_check || "HPI Checked" },
    { icon: <AiOutlineCar size={26} />,           label: "Make",      value: car.make                           },
    { icon: <MdOutlineDirectionsCar size={26} />, label: "Model",     value: car.model                          },
    { icon: <BsFuelPump size={26} />,             label: "Fuel Type", value: car.fuel                           },
  ];

  return (
    <div className="do-wrapper">
      <div className="do-inner">
        <div className="do-desc">
          <h3 className="do-desc-title">Description</h3>
          <p className="do-desc-body" style={{ whiteSpace: "pre-line" }}>{descText}</p>
        </div>
        <div className="do-overview">
          <h3 className="do-overview-title">Car Overview</h3>
          <div className="do-overview-grid">
            {overviewItems.map((item, i) => (
              <div className="do-card" key={i}>
                <div className="do-card-icon">{item.icon}</div>
                <span className="do-card-label">{item.label}</span>
                <span className="do-card-value">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------
// VEHICLE DESCRIPTION SECTION (Image 2 - Dark)
// ----------------------------------------------------------------
const ACCORDION_ITEMS = [
  { id: "summary",     label: "VEHICLE",       accent: "SUMMARY"  },
  { id: "performance", label: "PERFORMANCE &", accent: "ECONOMY"  },
  { id: "interior",    label: "INTERIOR /",    accent: "EXTERIOR" },
  { id: "safety",      label: "SAFETY /",      accent: "OTHER"    },
];

const ACCORDION_CONTENT = {
  summary:     "This 2015 Honda Civic 1.6 iDTEC SE Plus is a five door hatchback featuring a 1.6 litre diesel engine meeting Euro 6 emission standards. It comes with a full service history and a valid MOT.",
  performance: "Capable of impressive fuel economy with the 1.6L iDTEC engine. Features cruise control and a smooth manual gearbox ensuring a comfortable and efficient driving experience.",
  interior:    "Notable features include Bluetooth connectivity, USB input, rear parking camera, remote central locking, rear electric windows, and power assisted steering.",
  safety:      "This vehicle has been through a full safety inspection. All safety systems are operational and the vehicle has a clear history check with no previous accidents or structural damage recorded.",
};

// ----------------------------------------------------------------
// VEHICLE LOCATION SECTION
// ----------------------------------------------------------------
const VEHICLE_HOURS = [
  { day: "Monday",    hours: "10:00 AM to 06:00 PM" },
  { day: "Tuesday",   hours: "10:00 AM to 06:00 PM" },
  { day: "Wednesday", hours: "10:00 AM to 06:00 PM" },
  { day: "Thursday",  hours: "10:00 AM to 06:00 PM" },
  { day: "Friday",    hours: "10:00 AM to 06:00 PM" },
  { day: "Saturday",  hours: "10:00 AM to 06:00 PM" },
  { day: "Sunday",    hours: "11:00 AM to 04:00 PM" },
];

function VehicleLocationSection({ car }) {
  const [postcode, setPostcode] = useState("");
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const today = days[new Date().getDay()];

  const locAddress = car?.location?.address || "16 Eastside, Cauldwell Walk, Bedford MK42 9DT";

  const handleDirections = () => {
    if (postcode.trim()) {
      window.open(
        `https://www.google.com/maps/dir/${encodeURIComponent(postcode)}/${encodeURIComponent(locAddress)}`,
        "_blank"
      );
    }
  };

  return (
    <div className="vl-wrapper">
      <div className="vl-inner">
        <h2 className="vl-title">Vehicle location</h2>
        <p className="vl-address">
          This vehicle is located at {locAddress}
        </p>

        <div className="vl-phone">
          <FaPhoneAlt size={13} />
          <span>07300 503113 (WhatsApp) | 07435 761085</span>
        </div>

        <div className="vl-hours-list">
          {VEHICLE_HOURS.map((item) => (
            <div
              key={item.day}
              className={`vl-row ${item.day === today ? "vl-row--today" : ""}`}
            >
              <div className="vl-row-left">
                <BsClock className="vl-icon" />
                <span className="vl-day-name">{item.day}</span>
              </div>
              <div className="vl-row-right">
                <BsCheckCircle className="vl-icon" />
                <span className="vl-day-hours">{item.hours}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="vl-directions-card">
          <div className="vl-dir-text">
            <div className="vl-dir-title">Get directions</div>
            <div className="vl-dir-sub">Enter your location</div>
          </div>
          <div className="vl-dir-form">
            <input
              type="text"
              className="vl-input"
              placeholder="Postcode"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleDirections()}
            />
            <button className="vl-go-btn" onClick={handleDirections}>Go</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function VehicleDescriptionSection({ car }) {
  const [openAccordion, setOpenAccordion] = useState(null);

  const fullText = car?.description || "";
  const details  = car?.details || {};

  const toggleAccordion = (id) => setOpenAccordion(prev => prev === id ? null : id);

  return (
    <div className="vd-wrapper">
      <div className="vd-columns">
        <div className="vd-col-desc">
          <h2 className="vd-title">Car Specification</h2>
          <p className="vd-body" style={{ whiteSpace: "pre-line" }}>{fullText}</p>
        </div>

        <div className="vd-col-accordion">
          <div className="vd-accordion">
            {ACCORDION_ITEMS.map((item) => {
              const isOpen = openAccordion === item.id;
              const content = details[item.id] ?? ACCORDION_CONTENT[item.id];
              return (
                <div key={item.id} className="vd-accordion-item">
                  <button className="vd-accordion-header" onClick={() => toggleAccordion(item.id)}>
                    <span className="vd-acc-label">
                      <span className="vd-acc-accent">{item.label}</span>{" "}
                      <span className="vd-acc-white">{item.accent}</span>
                    </span>
                    {isOpen ? <FiChevronUp className="vd-acc-icon" /> : <FiChevronDown className="vd-acc-icon" />}
                  </button>
                  <div className={`vd-accordion-body ${isOpen ? "open" : ""}`}>
                    <p className="vd-acc-content">{content}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="vd-footer-notes">
        <p>For more info on this vehicle call our showroom on 07300 503113 or 07435 761085</p>
        <p>Every effort has been made to ensure the accuracy of the above information but errors may occur. Please check with a salesperson.</p>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------
// CAR FEATURES SECTION
// ----------------------------------------------------------------
function CarFeaturesSection({ car }) {
  const features = Array.isArray(car.features) ? car.features : [];
  if (!features.length) return null;

  return (
    <div className="cf-section">
      <h3 className="cf-title">Car Features</h3>
      <div className="cf-grid">
        {features.map((feature, i) => (
          <div className="cf-item" key={i}>
            <span className="cf-icon"><HiCheckCircle size={14} /></span>
            {feature}
          </div>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------
// DARK SPEC CARD  (replaces PriceCard + DealerCard + OutOfHoursPanel)
// ----------------------------------------------------------------
function DarkSpecCard({ car }) {
  const router = useRouter();
  const { user } = useAuth();
  const deposit = Number(car.deposit_amount) || 200;
  return (
    <div className="dark-spec-card">

      {/* ── Title ── */}
      <div className="dark-card-title">{car.title}</div>
      <div className="dark-card-subtitle">{car.subtitle}</div>

      {/* ── Price row ── */}
      <div className="dark-price-row">
        <div className="dark-price-right">
          <span className="dark-main-price">{gbp(car.price)}</span>
        </div>
      </div>

      {/* ── Spec icons ── */}
      <div className="dark-specs-icons">
        <div className="dark-spec-icon-item">
          <div className="dark-spec-circle"><BsCalendar3 /></div>
          <span className="dark-spec-label">{car.year}</span>
        </div>
        <div className="dark-spec-icon-item">
          <div className="dark-spec-circle"><BsSpeedometer2 /></div>
          <span className="dark-spec-label">{miles(car.mileage)}</span>
        </div>
        <div className="dark-spec-icon-item">
          <div className="dark-spec-circle"><RiPaintBrushLine /></div>
          <span className="dark-spec-label">{car.colour}</span>
        </div>
        <div className="dark-spec-icon-item">
          <div className="dark-spec-circle"><TbEngine /></div>
          <span className="dark-spec-label">{cc(car.engine_cc)}</span>
        </div>
        <div className="dark-spec-icon-item">
          <div className="dark-spec-circle"><BsGear /></div>
          <span className="dark-spec-label">{car.transmission}</span>
        </div>
        <div className="dark-spec-icon-item">
          <div className="dark-spec-circle"><BsFuelPump /></div>
          <span className="dark-spec-label">{car.fuel}</span>
        </div>
      </div>

      <div className="dark-divider" />

      {/* ── Action buttons ── */}
      <div className="dark-btns">

        {/* Reserve */}
        <button
          className="dark-btn-reserve"
          onClick={() => router.push(loginGate(user, `/checkout?amount=${deposit}&car=${car.id}`))}
        >
          Reserve now for {gbp(deposit)} <FiChevronRight size={16} />
        </button>

        {/* Make an enquiry + Part exchange side by side */}
        <div className="dark-btn-enquiry-row">
          <button className="dark-btn-outline">
            <FaEnvelope size={12} /> Make an enquiry
          </button>
          <button className="dark-btn-outline">
            <MdOutlineDirectionsCar size={14} /> Part exchange
          </button>
        </div>

        {/* View video — links to YouTube */}
        <a
          href={car.video_url || "https://www.youtube.com"}
          target="_blank"
          rel="noopener noreferrer"
          className="dark-btn-video"
        >
          <BiPlayCircle size={17} />
          View video walkthrough
        </a>
      </div>

      {/* ── Contact strip ── */}
      <div className="dark-contact-row">
        <a href="tel:07300503113" className="dark-contact-item">
          <FaPhoneAlt size={12} /> 07300 503113
        </a>
        <span className="dark-contact-divider">|</span>
        <a href="tel:07435761085" className="dark-contact-item">
          <FaPhoneAlt size={12} /> 07435 761085
        </a>
        <span className="dark-contact-divider">|</span>
        <a href="mailto:info@noorrixmotors.co.uk" className="dark-contact-item">
          <FaEnvelope size={12} /> sales@dealership.co.uk
        </a>
      </div>

    </div>
  );
}

// ----------------------------------------------------------------
// MAIN COMPONENT
// ----------------------------------------------------------------
export default function CarsListing({ car, similar = [] }) {
  const router = useRouter();

  const slides = (Array.isArray(car.images) && car.images.length)
    ? car.images
    : (car.image_url ? [car.image_url] : []);

  return (
    <>
      <Navbar/>
      {/* ── Breadcrumb ── */}
      <div className="breadcrumb">
        <div className="breadcrumb-inner">
          <Link href="/" className="breadcrumb-home">
            <FaHome size={13} /> Home
          </Link>
          <FiChevronRight className="separator" size={13} />
          <Link href="/stock">Used Cars</Link>
          <FiChevronRight className="separator" size={13} />
          <Link href={`/used-cars/${car.make.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>{car.make}</Link>
          <FiChevronRight className="separator" size={13} />
          <span className="current">{car.title}</span>
        </div>
      </div>

      {/* ── Page body ── */}
      <div className="wrapper">
      <div className="listing-container">
        <Link href={`/used-cars/${car.make.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} className="back-btn">
          <FiChevronLeft size={18} /> Back
        </Link>

        <div className="listing-grid" style={{ marginTop: 12 }}>

          {/* ======== LEFT COLUMN ======== */}
          <div>
            <ImageSlider slides={slides} car={car} />

            <div className="location-row">
              <div className="location-left">
                <MdLocationOn size={20} color="#888" />
                <div>
                  <span className="label">Car location</span>
                  {car.location?.name || "Bedford"}{" "}
                  {/* <a href="#" className="location-link">(See distance)</a> */}
                </div>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(car.location?.address || car.location?.name || "Bedford")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="view-map-btn"
              >
                View Map <FiChevronRight size={16} />
              </a>
            </div>

            <CarFeaturesSection car={car} />

            <MessageDealerCard/>
          </div>

          {/* ======== RIGHT COLUMN ======== */}
          <div className="right-panel">
            <DarkSpecCard car={car} />
          </div>

        </div>

      </div>
      </div>

          {/* ── NEW SECTIONS ADDED BELOW ── */}
            <DescriptionOverviewSection car={car} />
            <VehicleDescriptionSection car={car} />
            <VehicleLocationSection car={car} />
            <SimilarCarsSlider cars={similar} />

      <NoorrixFooter/>
    </>
  );
}