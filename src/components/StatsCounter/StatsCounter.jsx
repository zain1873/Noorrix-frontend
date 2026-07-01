"use client";
import { useEffect, useRef, useState } from "react";
import "./StatsCounter.css";

const STATS = [
  { value: 539, suffix: "",  label: "Happy Customers" },
  { value: 11,  suffix: "+", label: "Vehicles In Stock" },
  { value: 5,   suffix: "+", label: "Years of Experience" },
  { value: 97,  suffix: "%", label: "Satisfaction Rate" },
];

function StatItem({ value, suffix, label, triggered }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!triggered) return;
    const duration = 2000;
    const startTime = performance.now();

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // cubic ease-out
      setCount(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [triggered, value]);

  return (
    <div className="sc-stat">
      <span className="sc-number">
        {count}{suffix}
      </span>
      <span className="sc-label">{label}</span>
    </div>
  );
}

export default function StatsCounter() {
  const ref = useRef(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="sc-section" ref={ref}>
      <div className="sc-inner">
        <div className="sc-heading">
          <h2 className="sc-title">Our Journey of Excellence</h2>
          <p className="sc-subtitle">
            From thousands of successful deliveries to nationwide growth and award-winning service — we&apos;re proud of every milestone.
          </p>
        </div>

        <div className="sc-grid">
          {STATS.map((stat, i) => (
            <div key={stat.label} className="sc-stat-wrap">
              <StatItem {...stat} triggered={triggered} />
              {i < STATS.length - 1 && <div className="sc-divider" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
