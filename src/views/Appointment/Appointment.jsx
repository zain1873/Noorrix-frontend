"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaCalendarAlt,
  FaCarSide,
  FaWrench,
  FaHeadset,
  FaCheckCircle,
  FaClipboardCheck,
  FaHandshake,
  FaPhoneAlt,
} from "react-icons/fa";
import Navbar from "../../components/Navbar/Navbar";
import NoorrixFooter from "../../components/Footer/Footer";

import { getCars } from "../../lib/cars";
import BookingModal from "../../components/BookingModal/BookingModal";

import "./Appointment.css";

const services = [
  {
    icon: FaCarSide,
    title: "Test Drive",
    desc: "Get behind the wheel of your dream car. Choose any vehicle in our stock and take it for a spin — no obligation, no pressure.",
  },
  {
    icon: FaWrench,
    title: "Service & MOT",
    desc: "Book your vehicle in for a full service, MOT, or repair. Our qualified technicians take care of everything, start to finish.",
  },
  {
    icon: FaHeadset,
    title: "Expert Advice",
    desc: "Not sure what you need? Book a slot with our team for finance, part-exchange, or general vehicle advice.",
  },
];

const benefits = [
  {
    icon: FaCheckCircle,
    title: "No Obligation",
    desc: "Every appointment is completely free and pressure-free. Come in, look around, ask questions — decide at your own pace.",
  },
  {
    icon: FaCalendarAlt,
    title: "Flexible Scheduling",
    desc: "Choose a date and time that works around your life — weekdays, evenings, or weekends.",
  },
  {
    icon: FaClipboardCheck,
    title: "Free Health Check",
    desc: "Every service appointment includes a complimentary vehicle health check, no extra charge.",
  },
  {
    icon: FaHandshake,
    title: "Friendly Expert Staff",
    desc: "Our team knows every car on the forecourt inside out, and we're here to help, not to sell.",
  },
];

const steps = [
  {
    number: "01",
    title: "Choose Your Visit Type",
    desc: "Pick a test drive, service appointment, or general enquiry — whatever suits you.",
  },
  {
    number: "02",
    title: "Pick a Date & Time",
    desc: "Browse available slots and choose what works best for your schedule.",
  },
  {
    number: "03",
    title: "We Get Ready",
    desc: "Your car is prepped and waiting, or your service bay is booked, ahead of your visit.",
  },
  {
    number: "04",
    title: "Visit the Showroom",
    desc: "Arrive at your slot and we'll take it from there — no waiting around.",
  },
];

/**
 * Car selection grid — lets the user pick a real vehicle from stock first,
 * then opens the existing BookingModal with that car, reusing the exact
 * same createAppointment call BookingModal already makes elsewhere in the
 * project (so a real car.id is always sent, never a placeholder).
 */
function CarPickerSection() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    getCars()
      .then((data) => {
        if (active) {
          setCars(Array.isArray(data) ? data : data?.cars || []);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (active) {
          setError(err?.message || "Could not load vehicles right now.");
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const openModal = (car) => setSelectedCar(car);

  const closeModal = () => setSelectedCar(null);

  return (
    <section className="ap-cars-section" id="appointment-form">
      <div className="ap-cars-inner">
        <div style={{ textAlign: "center" }}>
          <span className="ap-section-tag">Pick A Vehicle</span>
          <h2 className="ap-section-title">
            Or Choose Your <span>Car First</span>
          </h2>
          <p className="ap-section-subtitle" style={{ margin: "0 auto" }}>
            Browse our current stock and book a test drive or appointment straight against the
            car you're interested in.
          </p>
        </div>
        <div className="ap-accent-bar" style={{ margin: "16px auto 40px" }} />

        {loading && <p className="ap-cars-status">Loading vehicles…</p>}
        {!loading && error && <p className="ap-cars-status ap-cars-status--error">{error}</p>}
        {!loading && !error && cars.length === 0 && (
          <p className="ap-cars-status">No vehicles available right now.</p>
        )}

        {!loading && !error && cars.length > 0 && (
          <div className="ap-cars-grid">
            {cars.map((car) => (
              <div key={car.id} className="ap-car-card">
                <div className="ap-car-image">
                  <img src={car.image_url} alt={car.title} />
                </div>
                <div className="ap-car-info">
                  <div className="ap-car-title">{car.title}</div>
                  {car.subtitle && <div className="ap-car-subtitle">{car.subtitle}</div>}
                </div>
                <div className="ap-car-actions">
                  <button
                    type="button"
                    className="ap-car-btn ap-car-btn-primary"
                    onClick={() => openModal(car)}
                  >
                    <FaCarSide size={13} /> Book Test Drive
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedCar && (
        <BookingModal car={selectedCar} type="test_drive" onClose={closeModal} />
      )}
    </section>
  );
}

function Appointment() {
  return (
    <>
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3 text-sm">
          <Link href="/" className="breadcrumb text-gray-500 hover:text-blue-600 transition-colors">Home</Link>
          <span className="mx-2 text-gray-300">›</span>
          <span className="text-gray-500">Services</span>
          <span className="mx-2 text-gray-300">›</span>
          <span className="text-gray-900 font-medium">Appointment</span>
        </div>
      </div>

      {/* Hero Banner */}
 <section className="ap-hero">
  <div
    className="ap-hero-bg"
    style={{
      backgroundImage: `url("https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=1600&q=80")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
  />

  <div className="ap-hero-overlay" />
  <div className="ap-hero-top-accent" />
  <div className="ap-hero-glow" />

  <div className="ap-hero-container">
    <span className="ap-hero-tag">
      <FaCalendarAlt size={13} />
      Book an Appointment
    </span>

    <h1 className="ap-hero-title">
      Your Next Car, <span>On Your Schedule</span>
    </h1>

    <p className="ap-hero-subtitle">
      Book a test drive, schedule a vehicle inspection, or speak with our
      experts. Choose a convenient time, and we'll make sure everything is
      ready when you arrive.
    </p>

    <div className="ap-hero-buttons">
      <a href="#appointment-form" className="ap-hero-btn ap-hero-btn-primary">
        <FaCalendarAlt size={16} />
        Book Now
      </a>

      <a href="tel:07300503113" className="ap-hero-btn ap-hero-btn-secondary">
        <FaPhoneAlt size={16} />
        07300 503113
      </a>
    </div>
  </div>
</section>
      {/* Services Grid */}
      <section className="ap-services">
        <div className="ap-services-inner">
          <span className="ap-section-tag">What We Offer</span>
          <h2 className="ap-section-title">
            Ways to <span>Visit Us</span>
          </h2>
          <p className="ap-section-subtitle">
            From test drives to servicing to a simple chat — there's an appointment type for
            whatever you need.
          </p>
          <div className="ap-accent-bar" />
          <div className="ap-services-grid">
            {services.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="ap-service-card">
                <div className="ap-service-icon">
                  <Icon size={28} />
                </div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="ap-benefits">
        <div className="ap-benefits-inner">
          <span className="ap-section-tag">Why Choose Us</span>
          <h2 className="ap-section-title" style={{ textAlign: "center" }}>
            Why Book Your <span>Appointment Here</span>
          </h2>
          <p className="ap-section-subtitle" style={{ textAlign: "center", margin: "0 auto 16px" }}>
            We go the extra mile to make sure your visit is worth the trip.
          </p>
          <div className="ap-accent-bar" style={{ margin: "0 auto 48px" }} />
          <div className="ap-benefits-grid">
            {benefits.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="ap-benefit-card">
                <div className="ap-benefit-icon">
                  <Icon size={22} />
                </div>
                <div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="ap-process">
        <div className="ap-process-inner">
          <div style={{ textAlign: "center" }}>
            <span className="ap-section-tag">Simple Process</span>
            <h2 className="ap-section-title">
              How Booking <span>Works</span>
            </h2>
            <p className="ap-section-subtitle" style={{ margin: "0 auto" }}>
              Four simple steps and you're on our forecourt.
            </p>
          </div>
          <div className="ap-steps">
            {steps.map((step) => (
              <div key={step.number} className="ap-step">
                <div className="ap-step-number">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Car picker — pick a real vehicle, opens the existing BookingModal.
          Keeps the #appointment-form id so the hero/CTA "Book Now" anchor
          links still scroll to the right place. */}
      <CarPickerSection />

      {/* CTA Banner */}
      <section className="ap-cta">
        <div
          className="ap-cta-bg"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&q=80)` }}
        />
        <div className="ap-cta-overlay" />
        <div className="ap-cta-glow" />
        <div className="ap-cta-container">
          <span className="ap-cta-tag">We're Ready When You Are</span>
          <h2 className="ap-cta-title">
            Ready For Your <span>Next Visit?</span>
          </h2>
          <p className="ap-cta-subtitle">
            Book a test drive, a service slot, or just a conversation with our team. No pressure,
            no obligation — just honest help.
          </p>
          <div className="ap-cta-buttons">
            <a href="#appointment-form" className="ap-cta-btn ap-cta-btn-primary">
              <FaCalendarAlt size={16} /> Book an Appointment
            </a>
            <Link href="/cars" className="ap-cta-btn ap-cta-btn-secondary">
              <FaCarSide size={16} /> Browse Stock
            </Link>
          </div>
        </div>
      </section>


      <NoorrixFooter />
    </>
  );
}

export default Appointment;