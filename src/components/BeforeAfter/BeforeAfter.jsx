"use client";
import React, { useRef, useState, useCallback, useEffect } from 'react'
import './BeforeAfter.css'

/* ── Data ── */
const CARS = [
  {
    id: 1,
    name: '1967 Ford Mustang',
    badge: 'Full Restore',
    badgeType: 'restore',
    desc: 'Classic Mustang fully restored from damaged condition to showroom finish.',

    // BEFORE MUSTANG
    beforeImg:
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=640&q=80&auto=format&fit=crop',

    // AFTER MUSTANG
    afterImg:
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=640&q=80&auto=format&fit=crop',

    stats: [
      { value: '14 mo', label: 'Build time' },
      { value: '289 ci', label: 'Engine' },
      { value: '$42k', label: 'Investment' },
    ],
  },

  {
    id: 2,
    name: 'Nissan GT-R R35',
    badge: 'Custom Build',
    badgeType: 'custom',
    desc: 'Widebody GT-R transformed with full aero and performance rebuild.',

    // BEFORE GTR
    beforeImg:
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=640&q=80&auto=format&fit=crop',

    // AFTER GTR
    afterImg:
      'https://images.unsplash.com/photo-1612825173281-9a193378527e?w=640&q=80&auto=format&fit=crop',

    stats: [
      { value: '8 mo', label: 'Build time' },
      { value: '700 whp', label: 'Power' },
      { value: '$68k', label: 'Investment' },
    ],
  },

  {
    id: 3,
    name: '2021 BMW M3 Competition',
    badge: 'Detail & Ceramic',
    badgeType: 'detail',
    desc: 'BMW paint correction and ceramic protection package.',

    // BEFORE BMW
    beforeImg:
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=640&q=80&auto=format&fit=crop',

    // AFTER BMW
    afterImg:
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=640&q=80&auto=format&fit=crop',

    stats: [
      { value: '3 days', label: 'Duration' },
      { value: '9H', label: 'Ceramic' },
      { value: '$4.8k', label: 'Investment' },
    ],
  },

  {
    id: 4,
    name: '1970 Chevrolet Camaro',
    badge: 'Full Restore',
    badgeType: 'restore',
    desc: 'Ground-up restoration of a classic Camaro muscle car.',

    // BEFORE CAMARO
    beforeImg:
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=640&q=80&auto=format&fit=crop',

    // AFTER CAMARO
    afterImg:
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=640&q=80&auto=format&fit=crop',

    stats: [
      { value: '18 mo', label: 'Build time' },
      { value: '396 ci', label: 'Engine' },
      { value: '$55k', label: 'Investment' },
    ],
  },

  {
    id: 5,
    name: 'Porsche 911 Carrera',
    badge: 'Detail & Ceramic',
    badgeType: 'detail',
    desc: 'Porsche exterior detailing and premium ceramic treatment.',

    // BEFORE PORSCHE
    beforeImg:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=640&q=80&auto=format&fit=crop',

    // AFTER PORSCHE
    afterImg:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=640&q=80&auto=format&fit=crop',

    stats: [
      { value: '4 days', label: 'Duration' },
      { value: '9H', label: 'Ceramic' },
      { value: '$6.2k', label: 'Investment' },
    ],
  },

  {
    id: 6,
    name: 'Toyota Supra MK4',
    badge: 'Custom Build',
    badgeType: 'custom',
    desc: 'Toyota Supra rebuilt into a high-performance street machine.',

    // BEFORE SUPRA
    beforeImg:
      'https://images.unsplash.com/photo-1486496572940-2bb2341fdbdf?w=640&q=80&auto=format&fit=crop',

    // AFTER SUPRA
    afterImg:
      'https://images.unsplash.com/photo-1493238792000-8113da705763?w=640&q=80&auto=format&fit=crop',

    stats: [
      { value: '10 mo', label: 'Build time' },
      { value: '650 whp', label: 'Power' },
      { value: '$72k', label: 'Investment' },
    ],
  },
];

/* ── Single card with drag-slider ── */
function CarCard({ card }) {
  const wrapperRef = useRef(null)
  const dragging   = useRef(false)
  const [pos, setPos]             = useState(50)
  const [hintHidden, setHintHidden] = useState(false)

  const move = useCallback((clientX) => {
    const rect = wrapperRef.current?.getBoundingClientRect()
    if (!rect) return
    const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100))
    setPos(pct)
  }, [])

  const handleMouseDown = (e) => {
    dragging.current = true
    setHintHidden(true)
    move(e.clientX)
  }

  const handleTouchStart = (e) => {
    dragging.current = true
    setHintHidden(true)
    move(e.touches[0].clientX)
  }

  useEffect(() => {
    const onMouseMove = (e) => { if (dragging.current) move(e.clientX) }
    const onTouchMove = (e) => { if (dragging.current) move(e.touches[0].clientX) }
    const onUp        = ()  => { dragging.current = false }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('mouseup',   onUp)
    window.addEventListener('touchend',  onUp)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('mouseup',   onUp)
      window.removeEventListener('touchend',  onUp)
    }
  }, [move])

  return (
    <article className="car-card">

      {/* ── Compare area ── */}
      <div
        className="car-card__compare"
        ref={wrapperRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <img
          className="car-card__img car-card__img--before"
          src={card.beforeImg}
          alt={`${card.name} before`}
          loading="lazy"
        />
        <img
          className="car-card__img car-card__img--after"
          src={card.afterImg}
          alt={`${card.name} after`}
          loading="lazy"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        />

        <div className="car-card__line" style={{ left: `${pos}%` }} />

        <div className="car-card__knob" style={{ left: `${pos}%` }}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 12H3M15 18l6-6-6-6M9 6l-6 6 6 6" />
          </svg>
        </div>

        <span className="car-card__label car-card__label--before">Before</span>
        <span className="car-card__label car-card__label--after">After</span>

        <span className={`car-card__hint${hintHidden ? ' car-card__hint--hidden' : ''}`}>
          drag to compare
        </span>
      </div>

      {/* ── Body ── */}
      <div className="car-card__body">
        <div className="car-card__meta">
          <h2 className="car-card__name">{card.name}</h2>
          <span className={`car-card__badge car-card__badge--${card.badgeType}`}>
            {card.badge}
          </span>
        </div>

        <p className="car-card__desc">{card.desc}</p>

        <div className="car-card__stats">
          {card.stats.map((stat, i) => (
            <React.Fragment key={stat.label}>
              {i > 0 && <div className="car-card__stat-divider" />}
              <div className="car-card__stat">
                <span className="car-card__stat-value">{stat.value}</span>
                <span className="car-card__stat-label">{stat.label}</span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

    </article>
  )
}

/* ── Main export ── */
function BeforeAfter() {
  return (
    <section className="cars-section" aria-label="Car transformation showcase">

      {/* Header */}
      <div className="cars-section__header">
        <p className="cars-section__eyebrow">Transformations</p>
        <h1 className="cars-section__title">
          Before &amp; <em>After</em>
        </h1>
        <p className="cars-section__desc">
          Drag the slider on each card to reveal the transformation.
          Real results, real craftsmanship — from tired originals to stunning builds.
        </p>
      </div>

      {/* Cards */}
      <div className="cars-section__grid">
        {CARS.map(card => (
          <CarCard key={card.id} card={card} />
        ))}
      </div>

      {/* CTA */}
      <div className="cars-section__cta">
        <p className="cars-section__cta-text">Ready to transform your vehicle?</p>
        <button className="cars-section__cta-btn">
          Get a free quote &rarr;
        </button>
      </div>

    </section>
  )
}

export default BeforeAfter