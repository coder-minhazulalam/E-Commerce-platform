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
    <section className="olaf-newsletter" aria-labelledby="newsletter-heading">
      <div className="olaf-newsletter__inner">
        <div className="olaf-newsletter__copy">
          <p className="olaf-newsletter__label">THE EDIT DISPATCH</p>
          <h2 id="newsletter-heading" className="olaf-newsletter__title">
            STAY IN THE EDIT.
          </h2>
          <p className="olaf-newsletter__desc">
            Early access to seasonal drops, studio lookbooks, and private community releases. Sent
            sparingly.
          </p>
        </div>

        <div className="olaf-newsletter__action">
          {submitted ? (
            <div className="olaf-newsletter__thanks" role="status">
              <span className="thanks-dot" />
              <span>You are subscribed to the Amsterdam studio dispatch.</span>
            </div>
          ) : (
            <form className="olaf-newsletter__form" onSubmit={handleSubmit} aria-label="Email newsletter signup">
              <label className="sr-only" htmlFor="newsletter-email">
                Your email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                className="olaf-newsletter__input"
                placeholder="ENTER YOUR EMAIL..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
              <button type="submit" className="olaf-newsletter__btn">
                JOIN DISPATCH ↗
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
