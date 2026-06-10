"use client";
import React from "react";
import { FaCalendarAlt, FaClock, FaArrowLeft, FaCar, FaPhoneAlt } from "react-icons/fa";
import Navbar from "../components/Navbar/Navbar";
import NoorrixFooter from "../components/Footer/Footer";
import "./BlogDetail.css";
import "./Blogs.css";

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function BlogDetail({ post }) {
  return (
    <>
      <Navbar />

      {/* ── Breadcrumb ── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3 text-sm">
          <a href="/" className="breadcrumb-detail text-gray-500  transition-colors">
            Home
          </a>
          <span className="mx-2 text-gray-300">›</span>
          <a href="/blogs" className=" breadcrumb-detail text-gray-500 transition-colors">
            Blogs
          </a>
          <span className="mx-2 text-gray-300">›</span>
          <span className="text-gray-900 font-medium">{post.title}</span>
        </div>
      </div>

      {/* ── Hero Image ── */}
      <div className="blog-detail-hero">
        <img
          src={post.image_url}
          alt={post.title}
          className="blog-detail-hero-img"
        />
        <div className="blog-detail-hero-overlay" />
      </div>

      {/* ── Article ── */}
      <main className="blog-detail-main">
        <div className="blog-detail-container">

          {/* Back link */}
          <a href="/blogs" className="blog-detail-back">
            <FaArrowLeft size={13} /> Back to Blog
          </a>

          {/* Header */}
          <header className="blog-detail-header">
            {post.category && (
              <span className="blog-detail-category">{post.category.name}</span>
            )}
            <h1 className="blog-detail-title">{post.title}</h1>
            <div className="blog-detail-meta">
              <span>
                <FaCalendarAlt className="blog-detail-meta-icon" />
                {formatDate(post.published_at)}
              </span>
              <span>
                <FaClock className="blog-detail-meta-icon" />
                {post.read_time} min read
              </span>
            </div>
          </header>

          {/* Excerpt */}
          <p className="blog-detail-excerpt">{post.excerpt}</p>

          {/* Body */}
          <div
            className="blog-detail-body"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />

        </div>
      </main>

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

export default BlogDetail;
