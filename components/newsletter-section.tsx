"use client";

import React, { useState } from "react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  }

  return (
    <section className="newsletter-section" aria-labelledby="newsletter-heading">
      <div className="newsletter-inner">
        <div className="newsletter-copy">
          <p className="section-index">06 / Stay considered</p>
          <h2 id="newsletter-heading" className="newsletter-title">
            Updates, selectively sent.
          </h2>
          <p className="newsletter-sub">
            New pieces, restocks, and occasional notes on how things are made.
            Never more than once a fortnight.
          </p>
        </div>
        {submitted ? (
          <p className="newsletter-thanks" role="status">
            ✦ &nbsp; You&rsquo;re on the list. We&rsquo;ll be in touch, sparingly.
          </p>
        ) : (
          <form className="newsletter-form" onSubmit={handleSubmit} aria-label="Email newsletter signup">
            <label className="sr-only" htmlFor="newsletter-email">
              Your email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              className="newsletter-input"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
            <button type="submit" className="newsletter-btn">
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
