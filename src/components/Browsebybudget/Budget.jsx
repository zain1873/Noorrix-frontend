"use client";
import React, { useRef } from "react";
import "./Budjet.css";

const budgetCategories = [
  {
    label: "Lease monthly",
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&q=80&auto=format&fit=crop",
  },
  {
    label: "Under £20k",
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&q=80&auto=format&fit=crop",
  },
  {
    label: "Under £30k",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&q=80&auto=format&fit=crop",
  },
  {
    label: "Under £40k",
    image: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=400&q=80&auto=format&fit=crop",
  },
  {
    label: "Under £50k",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&q=80&auto=format&fit=crop",
  },
  {
    label: "Open budget",
    image: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=400&q=80&auto=format&fit=crop",
  },
];

const BrowseByBudget = () => {
  const sliderRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  const handleMouseDown = (e) => {
    isDown.current = true;
    sliderRef.current.classList.add("dragging");
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
    sliderRef.current.scrollLeft = scrollLeftStart.current - dist;
  };

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
        {budgetCategories.map((category, index) => (
          <div key={index} className="budget-card">
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