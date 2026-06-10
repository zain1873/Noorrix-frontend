"use client";
import React from "react";
import { FaCalendarAlt, FaClock, FaArrowRight, FaCar, FaPhoneAlt } from "react-icons/fa";
import Navbar from "../components/Navbar/Navbar";
import NoorrixFooter from "../components/Footer/Footer";
import "./Blogs.css";

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function BlogCategory({ posts = [], categories = [], activeCategory = "" }) {
  return (
    <>
      <Navbar />

      {/* ── Breadcrumb ── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3 text-sm">
          <a href="/" className="breadcrumb-detail text-gray-500 transition-colors">
            Home
          </a>
          <span className="mx-2 text-gray-300">›</span>
          <a href="/blogs" className="breadcrumb text-gray-500 transition-colors">
            Blogs
          </a>
          <span className="mx-2 text-gray-300">›</span>
          <span className="text-gray-900 font-medium">{activeCategory}</span>
        </div>
      </div>

      {/* ── Category Header ── */}
      <section className="blogs-hero">
        <div className="blogs-hero-overlay" />
        <div className="blogs-hero-top-accent" />
        <div className="blogs-hero-glow" />
        <div className="blogs-hero-container">
          <span className="blogs-hero-tag">{activeCategory}</span>
          <h1 className="blogs-hero-title">
            <span>{activeCategory}</span> Articles
          </h1>
          <p className="blogs-hero-subtitle">
            Browse all {activeCategory.toLowerCase()} posts from the Noorrix Motors blog.
          </p>
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="blogs-grid-section">
        <div className="blogs-container">
          <div className="blogs-section-header">
            <span className="blogs-label">{activeCategory}</span>
            <h2 className="blogs-section-title">
              Latest <span>Posts</span>
            </h2>
            <div className="blogs-accent-bar" />
          </div>

          {posts.length === 0 ? (
            <p className="blogs-empty">No posts in this category yet. Check back soon.</p>
          ) : (
            <div className="blogs-grid">
              {posts.map((post) => (
                <article key={post.id} className="blog-card">
                  <div className="blog-card-image-wrapper">
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="blog-card-image"
                    />
                    {post.category && (
                      <span className="blog-card-category">{post.category.name}</span>
                    )}
                  </div>
                  <div className="blog-card-body">
                    <div className="blog-card-meta">
                      <span>
                        <FaCalendarAlt className="blogs-meta-icon" />
                        {formatDate(post.published_at)}
                      </span>
                      <span>
                        <FaClock className="blogs-meta-icon" />
                        {post.read_time} min read
                      </span>
                    </div>
                    <h3 className="blog-card-title">{post.title}</h3>
                    <p className="blog-card-excerpt">{post.excerpt}</p>
                    <a href={`/blogs/${post.slug}`} className="blog-card-link">
                      Read More <FaArrowRight className="blog-card-arrow" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="blogs-cta-section">
        <div className="blogs-cta-overlay" />
        <div className="blogs-cta-top-accent" />
        <div className="blogs-cta-container">
          <span className="blogs-label">Ready to Drive?</span>
          <h2 className="blogs-cta-title">
            Find Your <span>Perfect Car</span> Today
          </h2>
          <p className="blogs-cta-subtitle">
            Browse our hand-picked selection of quality used cars or get in touch with our team.
          </p>
          <div className="blogs-cta-buttons">
            <a href="/stock" className="blogs-cta-btn blogs-cta-btn-primary">
              <FaCar size={16} /> Browse Our Stock
            </a>
            <a href="/contact" className="blogs-cta-btn blogs-cta-btn-secondary">
              <FaPhoneAlt size={16} /> Contact Us
            </a>
          </div>
        </div>
      </section>

      <NoorrixFooter />
    </>
  );
}

export default BlogCategory;
