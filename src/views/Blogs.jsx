"use client";
import React from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaArrowRight,
  FaCar,
  FaPhoneAlt,
} from "react-icons/fa";
import Navbar from "../components/Navbar/Navbar";
import NoorrixFooter from "../components/Footer/Footer";
import "./Blogs.css";

const featuredPost = {
  category: "Buying Guides",
  title: "The Complete Guide to Buying Your First Used Car in the UK",
  excerpt:
    "Buying your first car is an exciting milestone, but navigating the used car market can feel overwhelming. From setting a realistic budget to spotting hidden problems, this comprehensive guide walks you through every step of the process — so you can drive away with confidence.",
  image:
    "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1200&q=80",
  date: "5 June 2026",
  readTime: "12 min read",
};

const blogPosts = [
  {
    id: 1,
    category: "Buying Guides",
    title: "10 Things to Check Before Buying a Used Car",
    excerpt:
      "Purchasing a used car can be a great way to save money, but it's important to know what to look for. Our expert guide covers everything from mileage to service history.",
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=80",
    date: "2 Jun 2026",
    readTime: "6 min read",
  },
  {
    id: 2,
    category: "Car Tips",
    title: "How to Negotiate the Best Deal on Your Next Car",
    excerpt:
      "Negotiating a car price doesn't have to be intimidating. Learn our proven tips to help you get the best possible price and avoid common pitfalls.",
    image:
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&q=80",
    date: "28 May 2026",
    readTime: "5 min read",
  },
  {
    id: 3,
    category: "Maintenance",
    title: "The Ultimate Guide to Car Maintenance in the UK",
    excerpt:
      "Keeping your car in top condition doesn't require a mechanic every time. From oil changes to tyre pressure, here's everything you need to know.",
    image:
      "https://images.unsplash.com/photo-1486754735734-325b5831c3ad?w=600&q=80",
    date: "20 May 2026",
    readTime: "8 min read",
  },
  {
    id: 4,
    category: "News & Updates",
    title: "Electric vs Petrol: Which is Right for You in 2026?",
    excerpt:
      "With the EV revolution well underway, many buyers are wondering whether to make the switch. We break down the pros, cons, and costs of both options.",
    image:
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&q=80",
    date: "15 May 2026",
    readTime: "7 min read",
  },
  {
    id: 5,
    category: "Buying Guides",
    title: "Understanding HPI Checks: Why They Matter",
    excerpt:
      "An HPI check can save you from buying a car with hidden problems. Learn what it reveals, what red flags to watch for, and why it's non-negotiable.",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80",
    date: "8 May 2026",
    readTime: "4 min read",
  },
  {
    id: 6,
    category: "Car Tips",
    title: "Top 5 Family Cars Under £15,000 in 2026",
    excerpt:
      "Looking for a reliable, spacious family car without breaking the bank? We've rounded up the best used family cars available under £15,000.",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&q=80",
    date: "1 May 2026",
    readTime: "5 min read",
  },
  {
    id: 7,
    category: "Buying Guides",
    title: "What to Know About Part Exchange",
    excerpt:
      "Trading in your old car? Part exchange can simplify the process, but it pays to understand how valuations work and what to watch out for.",
    image:
      "https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=600&q=80",
    date: "24 Apr 2026",
    readTime: "4 min read",
  },
  {
    id: 8,
    category: "Maintenance",
    title: "Winter Car Care Tips for UK Drivers",
    excerpt:
      "UK winters can be harsh on your vehicle. From battery checks to antifreeze levels, here's how to prepare your car for the cold months ahead.",
    image:
      "https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?w=600&q=80",
    date: "18 Apr 2026",
    readTime: "6 min read",
  },
  {
    id: 9,
    category: "Car Tips",
    title: "How to Spot a Great Deal at a Car Dealership",
    excerpt:
      "Not all dealerships are created equal. Here are the signs of a trustworthy dealer and what to watch out for when shopping for your next used car.",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80",
    date: "10 Apr 2026",
    readTime: "5 min read",
  },
];

function Blogs() {
  return (
    <>
      <Navbar />

      {/* ── Breadcrumb ── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3 text-sm">
          <a
            href="/"
            className="breadcrumb text-gray-500 hover:text-blue-600 transition-colors"
          >
            Home
          </a>
          <span className="mx-2 text-gray-300">›</span>
          <span className="text-gray-900 font-medium">Blogs</span>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          HERO
      ════════════════════════════════════════════ */}
      <section className="blogs-hero">
        <div className="blogs-hero-overlay" />
        <div className="blogs-hero-top-accent" />
        <div className="blogs-hero-glow" />
        <div className="blogs-hero-container">
          <span className="blogs-hero-tag">Our Blog</span>
          <h1 className="blogs-hero-title">
            Automotive Tips, <span>News & Guides</span>
          </h1>
          <p className="blogs-hero-subtitle">
            Stay informed with expert advice on buying used cars, maintenance
            tips, industry news, and everything in between from the Noorrix
            Motors team.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FEATURED POST
      ════════════════════════════════════════════ */}
      <section className="blogs-featured-section">
        <div className="blogs-container">
          <div className="blogs-section-header">
            <span className="blogs-label">Featured Article</span>
            <h2 className="blogs-section-title">
              Editor&apos;s <span>Pick</span>
            </h2>
            <div className="blogs-accent-bar" />
          </div>

          <div className="blogs-featured-card">
            <div className="blogs-featured-image-wrapper">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="blogs-featured-image"
              />
              <span className="blogs-featured-badge">
                {featuredPost.category}
              </span>
            </div>
            <div className="blogs-featured-content">
              <div className="blogs-post-meta">
                <span>
                  <FaCalendarAlt className="blogs-meta-icon" />
                  {featuredPost.date}
                </span>
                <span>
                  <FaClock className="blogs-meta-icon" />
                  {featuredPost.readTime}
                </span>
              </div>
              <h3 className="blogs-featured-title">{featuredPost.title}</h3>
              <p className="blogs-featured-excerpt">{featuredPost.excerpt}</p>
              <button className="blogs-read-btn">
                Read Article <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          BLOG GRID
      ════════════════════════════════════════════ */}
      <section className="blogs-grid-section">
        <div className="blogs-container">
          <div className="blogs-section-header">
            <span className="blogs-label">All Articles</span>
            <h2 className="blogs-section-title">
              Latest <span>Blogs</span>
            </h2>
            <div className="blogs-accent-bar" />
          </div>

          {/* Cards */}
          <div className="blogs-grid">
            {blogPosts.map((post) => (
              <article key={post.id} className="blog-card">
                <div className="blog-card-image-wrapper">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="blog-card-image"
                  />
                </div>
                <div className="blog-card-body">
                  <div className="blog-card-meta">
                    <span>
                      <FaCalendarAlt className="blogs-meta-icon" />
                      {post.date}
                    </span>
                    <span>
                      <FaClock className="blogs-meta-icon" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="blog-card-title">{post.title}</h3>
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                  <button className="blog-card-link">
                    Read More{" "}
                    <FaArrowRight className="blog-card-arrow" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CTA BANNER
      ════════════════════════════════════════════ */}
      <section className="blogs-cta-section">
        <div className="blogs-cta-overlay" />
        <div className="blogs-cta-top-accent" />
        <div className="blogs-cta-container">
          <span className="blogs-label">Ready to Drive?</span>
          <h2 className="blogs-cta-title">
            Find Your <span>Perfect Car</span> Today
          </h2>
          <p className="blogs-cta-subtitle">
            Browse our hand-picked selection of quality used cars or get in
            touch with our team for expert advice.
          </p>
          <div className="blogs-cta-buttons">
            <a href="/stock" className="blogs-cta-btn blogs-cta-btn-primary">
              <FaCar size={16} />
              Browse Our Stock
            </a>
            <a href="/contact" className="blogs-cta-btn blogs-cta-btn-secondary">
              <FaPhoneAlt size={16} />
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          NEWSLETTER
      ════════════════════════════════════════════ */}
      {/* <section className="blogs-newsletter-section">
        <div className="blogs-newsletter-inner">
          <span className="blogs-label">Stay Updated</span>
          <h2 className="blogs-newsletter-title">Never Miss an Article</h2>
          <p className="blogs-newsletter-subtitle">
            Subscribe to our newsletter and get the latest car tips, buying
            guides, and automotive news straight to your inbox.
          </p>
          <div className="blogs-newsletter-form">
            <input
              type="email"
              placeholder="Enter your email address"
              className="blogs-newsletter-input"
            />
            <button className="blogs-newsletter-btn">Subscribe</button>
          </div>
        </div>
      </section> */}

      <NoorrixFooter />
    </>
  );
}

export default Blogs;
