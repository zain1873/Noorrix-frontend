"use client";
import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCars } from "../../lib/cars";
import "./Budjet.css";

const BUDGET_BANDS = [
  { label: "Under £3k", max: 3000 },
  { label: "Under £4k", max: 4000 },
  { label: "Under £5k", max: 5000 },
  { label: "Under £10k", max: 10000 },
];

const BrowseByBudget = () => {
  const router = useRouter();
  const sliderRef = useRef(null);
  const isDown = useRef(false);
  const hasDragged = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getCars().then((data) => {
      if (!active) return;
      setCars(Array.isArray(data) ? data : []);
      setLoading(false);
    });
    return () => { active = false; };
  }, []);

  const handleMouseDown = (e) => {
    isDown.current = true;
    hasDragged.current = false;
    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeftStart.current = sliderRef.current.scrollLeft;
  };

  const handleMouseUp = () => {
    isDown.current = false;
    sliderRef.current.classList.remove("dragging");
  };

  const handleMouseLeave = () => {
    isDown.current = false;
    sliderRef.current.classList.remove("dragging");
  };

  const handleMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const dist = (x - startX.current) * 2;
    if (Math.abs(dist) > 5) {
      hasDragged.current = true;
      sliderRef.current.classList.add("dragging");
    }
    sliderRef.current.scrollLeft = scrollLeftStart.current - dist;
  };

  const handleCardClick = (max) => {
    if (hasDragged.current) return;
    router.push(`/stock?priceMax=${max}`);
  };

  // Only show a band if we actually have stock in it — and use a real car's
  // photo from that band (preferring one priced *within* this band specifically,
  // so each card shows a different car rather than always the cheapest one).
  const cards = BUDGET_BANDS.map((band, i) => {
    const lower = i === 0 ? 0 : BUDGET_BANDS[i - 1].max;
    const inBand = cars.filter((c) => Number(c.price) > lower && Number(c.price) <= band.max);
    const upToBand = cars.filter((c) => Number(c.price) <= band.max);
    const rep = inBand[0] || upToBand[0];
    return rep ? { ...band, image: rep.image_url } : null;
  }).filter(Boolean);

  if (loading || cards.length === 0) return null;

  return (
    <section className="browse-section wrapper">
      <h2 className="browse-title sec-title">Browse by budget</h2>
      <div
        className="cards-wrapper"
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        {cards.map((category) => (
          <div
            key={category.label}
            className="budget-card"
            onClick={() => handleCardClick(category.max)}
          >
            <div className="card-image-wrapper">
              <img src={category.image} alt={category.label} loading="lazy" draggable="false" />
            </div>
            <p className="card-label">{category.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrowseByBudget;
