"use client";
import { useState, useEffect, useRef, Fragment } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth, loginGate } from "../../context/AuthContext";
import { gbp, money, miles, cc, ukDate } from "../../lib/format";
import { FiHome } from "react-icons/fi";

// ---------- react-icons ----------
import { FiChevronLeft, FiChevronRight, FiChevronDown, FiChevronUp, FiX, FiCopy, FiShare2, FiCheck, FiAlertTriangle } from "react-icons/fi";
import { FaStar, FaPhoneAlt, FaEnvelope, FaHome } from "react-icons/fa";
import { FaFacebookF, FaXTwitter, FaWhatsapp, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import HeartButton from "../../components/HeartButton/HeartButton";
import BookingModal from "../../components/BookingModal/BookingModal";
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
import CheckList from "../../components/CheckList/Checklist"

import "./CarDetails.css";
import NoorrixFooter from "../../components/Footer/Footer";
import MessageDealerCard from "../../components/DealerContactCard/DealerContactCard";
import SimilarCarsSlider from "./SimilarCarsSlider";
import DrivenBySatisfaction from "@/components/DrivenSatisfaction/DrivenSatisfaction";

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

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return createPortal(
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
    </div>,
    document.body
  );
}

// ----------------------------------------------------------------
// SHARE MODAL
// ----------------------------------------------------------------
function ShareModal({ onClose, title, url }) {
  const [copied, setCopied] = useState(false);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const platforms = [
    {
      name: "Facebook",
      icon: <FaFacebookF />,
      className: "share-icon facebook",
      action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, "_blank", "noopener,noreferrer,width=600,height=500"),
    },
    {
      name: "X",
      icon: <FaXTwitter />,
      className: "share-icon x",
      action: () => window.open(`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`, "_blank", "noopener,noreferrer,width=600,height=500"),
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp />,
      className: "share-icon whatsapp",
      action: () => window.open(`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`, "_blank", "noopener,noreferrer"),
    },
    {
      name: "Instagram",
      icon: <FaInstagram />,
      className: "share-icon instagram",
      action: async () => {
        // Instagram has no public web-share endpoint, so copy the link instead
        await handleCopy();
      },
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedinIn />,
      className: "share-icon linkedin",
      action: () => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, "_blank", "noopener,noreferrer,width=600,height=500"),
    },
    {
      name: "Email",
      icon: <FaEnvelope />,
      className: "share-icon email",
      action: () => { window.location.href = `mailto:?subject=${encodedTitle}&body=${encodedUrl}`; },
    },
    {
      name: "Copy link",
      icon: <FiCopy />,
      className: "share-icon copy",
      action: async () => { await handleCopy(); },
    },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // no-op fallback
    }
  };

  return createPortal(
    <div className="share-modal-overlay" onClick={handleOverlayClick}>
      <div className="share-modal-card">
        <button className="share-modal-close" onClick={onClose}>
          <FiX />
        </button>
        <h3 className="share-modal-title">Share this advert</h3>
        <p className="share-modal-sub">Choose a platform below or copy the link.</p>

        <div className="share-modal-icons">
          {platforms.map((p) => (
            <button
              key={p.name}
              className={p.className}
              onClick={p.action}
              title={p.name}
              aria-label={`Share via ${p.name}`}
            >
              {p.icon}
            </button>
          ))}
        </div>

        {copied && <div className="share-copied-toast">Link copied!</div>}
      </div>
    </div>,
    document.body
  );
}

function ShareButton({ car }) {
  const [showShare, setShowShare] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";

  return (
    <>
      <button className="share-advert-btn" onClick={() => setShowShare(true)}>
        <FiShare2 size={15} />
        Share Advert
      </button>

      {showShare && (
        <ShareModal
          onClose={() => setShowShare(false)}
          title={car.title}
          url={url}
        />
      )}
    </>
  );
}


function ImageSlider({ slides, car }) {
  const [current,     setCurrent    ] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [paused,      setPaused     ] = useState(false);
  const [isMobile,    setIsMobile   ] = useState(false);
  const thumbsRowRef = useRef(null);
  const thumbRefs = useRef([]);

  const prev = () => setCurrent(i => (i - 1 + slides.length) % slides.length);
  const next = () => setCurrent(i => (i + 1) % slides.length);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (isMobile || paused || showGallery || slides.length <= 1) return;
    const id = setInterval(() => {
      setCurrent(i => (i + 1) % slides.length);
    }, 3000);
    return () => clearInterval(id);
  }, [isMobile, paused, showGallery, slides.length]);

  useEffect(() => {
    const el = thumbRefs.current[current];
    const container = thumbsRowRef.current;
    if (!el || !container) return;
    const targetLeft = el.offsetLeft - (container.clientWidth - el.offsetWidth) / 2;
    container.scrollTo({ left: targetLeft, behavior: "smooth" });
  }, [current]);

  return (
    <>
      <div>
        <div
          className="image-slider-wrapper"
          style={{ width: "100%", maxWidth: "100%" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
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

        <div className="thumbnails-row" ref={thumbsRowRef}>
          {slides.map((src, i) => (
            <div
              key={i}
              ref={el => (thumbRefs.current[i] = el)}
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
// VEHICLE TITLE + PRICE CARD  (Right panel — end of Enquire CTA)
// Pulls car.title / car.subtitle / car.price straight from backend
// ----------------------------------------------------------------
function VehicleTitlePriceCard({ car }) {
  if (!car.title && !car.price) return null;

  return (
    <div className="vtp-card">
      {car.title && <h1 className="vtp-title">{car.title}</h1>}
      {car.subtitle && <p className="vtp-subtitle">{car.subtitle}</p>}
      {car.price != null && <div className="vtp-price">{gbp(car.price)}</div>}
    </div>
  );
}

// ----------------------------------------------------------------
// MOT INFORMATION CARD  (Right panel — end of Enquire CTA)
// Pulls car.mot_date straight from backend
// ----------------------------------------------------------------
function MotInfoCard({ car }) {
  if (!car.mot_date) return null;

  return (
    <div className="mot-card">
      <div className="mot-card-inner">
        <BsShieldCheck className="mot-icon" />
        <h3 className="mot-card-title">MOT Information</h3>
        <p className="mot-card-date">Current MOT Date: {ukDate(car.mot_date)}</p>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------
// VEHICLE SPECS GRID (below gallery)
// Road Tax, Registration & Insurance removed (backend-driven, not needed here)
// ----------------------------------------------------------------
function VehicleSpecsGrid({ car }) {
  const items = [
      { icon: <AiOutlineCar />,           label: "Make",          value: car.make },
      { icon: <MdOutlineDirectionsCar />, label: "Model",         value: car.model },
      { icon: <BsCalendar3 />,            label: "Year",          value: car.year },
      { icon: <TbEngine />,               label: "Engine",        value: car.engine },
      { icon: <BsFuelPump />,             label: "Fuel Type",     value: car.fuel },
      { icon: <BsSpeedometer2 />,         label: "Mileage",       value: car.mileage ? miles(car.mileage) : "-" },
      { icon: <BsGear />,                 label: "Transmission",  value: car.transmission },
      { icon: <MdOutlineDirectionsCar />, label: "Body Type",     value: car.body_type },
      { icon: <BsCalendarCheck />,        label: "MOT Date",      value: car.mot_date ? ukDate(car.mot_date) : "-" },
      { icon: <RiPaintBrushLine />,       label: "Colour",        value: car.colour },
      { icon: <HiCheckCircle />,          label: "History check", value: car.history_check },
    ];

  return (
    <div className="vsg-wrapper">
      <div className="vsg-grid">
        {items.map((item, i) => (
          <div className="vsg-item" key={i}>
            <span className="vsg-icon">{item.icon}</span>
            <div className="vsg-text">
              <span className="vsg-label">{item.label}</span>
              <span className="vsg-value">{item.value || "-"}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------
// ENQUIRE CTA CARD (Right sidebar) — replaces the old do-card-block
// ----------------------------------------------------------------
function EnquireCTA({ car }) {
  const router = useRouter();

  return (
    <div className="enquire-cta-card">
      <h3 className="enquire-cta-title">Want to know more about this vehicle?</h3>
      <p className="enquire-cta-body">
        Looking for a car that ticks every box? This vehicle blends dependability, performance, and comfort. Explore the details and decide with confidence.
      </p>
      <button
        className="enquire-cta-btn"
        onClick={() => router.push(`/contact?car=${car.id || ""}`)}
      >
        Enquire now
      </button>
    </div>
  );
}

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
      <div className="vl-columns">
        <div className="vl-inner">
          <h2 className="vl-title">Vehicle location</h2>
          <p className="vl-address">
            This vehicle is located at {locAddress}
          </p>

          <div className="vl-phone">
            <FaPhoneAlt size={13} />
            <span>07300 503113 (WhatsApp)</span>
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
        </div>

        <div className="vl-map">
          <iframe
            title="Showroom location map"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(locAddress)}&output=embed`}
          />
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------
// SPECIFICATIONS & FEATURES SECTION
// ----------------------------------------------------------------
const CATEGORY_ORDER = ["Exterior", "Interior", "Performance", "Size and dimensions", "Audio and Communications"];

function buildFeatureCategories(features) {
  const grouped = features.reduce((acc, f) => {
    (acc[f.category] ??= []).push(f.text);
    return acc;
  }, {});

  return CATEGORY_ORDER
    .map((name) => [name, grouped[name] || []])
    .filter(([, items]) => items.length > 0);
}

function SpecFeaturePanel({ items }) {
  if (!items || !items.length) {
    return <p className="sf-empty">No details available.</p>;
  }
  return (
    <div className="sf-panel-list">
      {items.map((item, i) => {
        const label = typeof item === "string" ? item : item.label;
        const value = typeof item === "string" ? null : item.value;
        return (
          <div className="sf-row" key={i}>
            <span className="sf-check"><FiCheck size={10} /></span>
            <span className="sf-label">{label}</span>
            {value !== null && value !== undefined && value !== "" && (
              <span className="sf-value">{value}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}


function CarFeaturesSection({ car }) {
  const [openCategory, setOpenCategory] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Features: expects car.features = [{ category, text }]
  const features = Array.isArray(car.features) ? car.features : [];
  const featureCategories = buildFeatureCategories(features);

  if (!featureCategories.length) return null;

  const toggleCategory = (name) => {
    setOpenCategory((prev) => (prev === name ? null : name));
  };

  // On mobile everything is a single stacked column (natural order).
  // On desktop, split into two independent columns.
  const columns = isMobile
    ? [featureCategories]
    : [
        featureCategories.filter((_, i) => i % 2 === 0),
        featureCategories.filter((_, i) => i % 2 === 1),
      ];

  return (
    <div className="sf-section">
      <div className="sf-header">
        <h3 className="sf-title">Specifications and Features</h3>
      </div>

      <div className="sf-cat-grid">
        {columns.map((colItems, ci) => (
          <div className="sf-col" key={ci}>
            {colItems.map(([name, items]) => (
              <Fragment key={name}>
                <button
                  className={`sf-cat-btn ${openCategory === name ? "open" : ""}`}
                  onClick={() => toggleCategory(name)}
                >
                  <span>{name}</span>
                  {openCategory === name ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
                </button>

                {openCategory === name && (
                  <div className="sf-panel">
                    <SpecFeaturePanel items={items} />
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}


// ----------------------------------------------------------------
// FOOTER HIGHLIGHT SLIDER (rotating trust badges)
// ----------------------------------------------------------------
const FOOTER_HIGHLIGHTS = [
  {
    icon: <BsShieldCheck size={20} />,
    title: "Approved Used Cars",
    sub: "Certified quality for extra reassurance",
  },
  {
    icon: <AiOutlineCar size={20} />,
    title: "Test Drive",
    sub: "Step in, buckle up, test the difference",
  },
  {
    icon: <MdOutlineDirectionsCar size={20} />,
    title: "Verified Mileage",
    sub: "All cars checked and confirmed",
  },
];

function FooterHighlightSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % FOOTER_HIGHLIGHTS.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const current = FOOTER_HIGHLIGHTS[index];

  return (
    <div className="lsc-footer">
      <span className="lsc-footer-icon" key={`icon-${index}`}>{current.icon}</span>
      <div className="lsc-footer-text" key={`text-${index}`}>
        <div className="lsc-footer-title">{current.title}</div>
        <div className="lsc-footer-sub">{current.sub}</div>
      </div>
      <div className="lsc-footer-dots">
        {FOOTER_HIGHLIGHTS.map((_, i) => (
          <span key={i} className={`lsc-footer-dot ${i === index ? "active" : ""}`} />
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------
// DESCRIPTION CARD (Right Panel) + READ MORE MODAL
// ----------------------------------------------------------------
function DescriptionModal({ text, onClose }) {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return createPortal(
    <div className="desc-modal-overlay" onClick={handleOverlayClick}>
      <div className="desc-modal-card">
        <div className="desc-modal-header">
          <h3 className="desc-modal-title">Description</h3>
          <button className="desc-modal-close" onClick={onClose}>
            <FiX />
          </button>
        </div>
        <div className="desc-modal-body">
          <p style={{ whiteSpace: "pre-line" }}>{text}</p>
        </div>
      </div>
    </div>,
    document.body
  );
}

function DescriptionCard({ car }) {
  const [showModal, setShowModal] = useState(false);

  const descText =
    car.description ||
    `This ${car.year || ""} ${car.title || ""} offers an exceptional blend of performance and efficiency.`;

  if (!descText) return null;

  return (
    <>
      <div className="desc-card">
        <h3 className="desc-card-title">Description</h3>
        <p className="desc-card-body">{descText}</p>
        <button className="desc-read-more" onClick={() => setShowModal(true)}>
          Read More
        </button>
      </div>

      {showModal && (
        <DescriptionModal text={descText} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}

function DarkSpecCard({ car }) {
  const router = useRouter();
  const { user } = useAuth();
  const deposit = Number(car.deposit_amount) || 200;
  const [booking, setBooking] = useState(null); // null | "test_drive" | "appointment"

  return (
    <div className="light-spec-card">

      {car.ulez_compliant && (
        <div className="lsc-badge">
          <HiCheckCircle size={14} /> ULEZ Compliant
        </div>
      )}

      {/* ── Title ── */}
      <div className="lsc-title">{car.title}</div>
      <div className="lsc-subtitle">{car.subtitle}</div>

      {/* ── Price ── */}
      <div className="lsc-price">{gbp(car.price)}</div>

      {/* ── Main action buttons ── */}
      <div className="lsc-btns">
        <button className="lsc-btn" onClick={() => setBooking("appointment")}>
          <BsCalendarCheck size={15} /> Appointment
        </button>
        <button className="lsc-btn" onClick={() => setBooking("test_drive")}>
          <AiOutlineCar size={15} /> Test Drive
        </button>
        {/* <button
          className="lsc-btn"
          onClick={() => router.push(loginGate(user, `/checkout?amount=${deposit}&car=${car.id}`))}
        >
          Reserve for {gbp(deposit)}
        </button> */}
        <a
          href={car.video_url || "https://www.youtube.com"}
          target="_blank"
          rel="noopener noreferrer"
          className="lsc-btn"
        >
          <BiPlayCircle size={16} /> Check Video
        </a>
      </div>

      {/* ── Secondary row (enquiry / part exchange) ── */}
      <div className="lsc-secondary-row">
        <button className="lsc-btn-outline" onClick={() => router.push("/contact")}>
          <FaEnvelope size={12} /> Make an enquiry
        </button>
        <button className="lsc-btn-outline" onClick={() => router.push("/part-exchange")}>
          <MdOutlineDirectionsCar size={13} /> Part exchange
        </button>
      </div>

      {/* ── Footer strip (rotating trust badges) ── */}
      <FooterHighlightSlider />

      {/* ── Contact strip ── */}
      <div className="lsc-contact-row">
        <a href="tel:07300503113" className="lsc-contact-item">
          <FaPhoneAlt size={12} /> 07300 503113
        </a>
        <span className="lsc-contact-divider">|</span>
        <a href="mailto:info@noorrixmotors.co.uk" className="lsc-contact-item">
          <FaEnvelope size={12} /> info@noorrixmotors.co.uk
        </a>
      </div>

      {booking && (
        <BookingModal car={car} type={booking} onClose={() => setBooking(null)} />
      )}
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
        <div className="page-top-row">
        <Link href="/" className="back-btn">
          <FiHome size={18} /> Back
        </Link>
        <ShareButton car={car} />
      </div>

        <div className="listing-grid" style={{ marginTop: 12 }}>

          {/* ======== LEFT COLUMN ======== */}
          <div>
            <ImageSlider slides={slides} car={car} />

            <VehicleSpecsGrid car={car} />

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
            <DescriptionCard car={car} />
            <EnquireCTA car={car} />
            <VehicleTitlePriceCard car={car} />
            <MotInfoCard car={car} />
          </div>

        </div>

      </div>
      </div>

          {/* ── NEW SECTIONS ADDED BELOW ── */}
            <CheckList/>
            <DrivenBySatisfaction/>
            <VehicleLocationSection car={car} />
            <SimilarCarsSlider cars={similar} />

      <NoorrixFooter/>
    </>
  );
}