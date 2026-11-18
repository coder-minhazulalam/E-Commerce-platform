"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "../../components/site-header";
import { SiteFooter } from "../../components/site-footer";
import { useBag } from "../../lib/cart-context";
import { useAuth } from "../../lib/auth-context";
import { lookbookImage } from "../../lib/assets";
import { formatPrice } from "../../lib/products";

interface OrderPlaced {
  orderNumber: string;
  items: ReturnType<typeof useBag>["items"];
  subtotal: number;
  shipping: number;
  total: number;
  shippingName: string;
  shippingAddress: string;
  shippingCity: string;
  date: string;
}

export default function CheckoutPage() {
  const { items, subtotal, shipping, total, clearBag } = useBag();
  const { user } = useAuth();

  const [name, setName] = useState(user?.user_metadata?.full_name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("United States");
  const [cardNumber, setCardNumber] = useState("•••• •••• •••• 4242");
  const [cardExpiry, setCardExpiry] = useState("12/28");
  const [cardCvc, setCardCvc] = useState("888");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<OrderPlaced | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setIsSubmitting(true);

    const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const orderData: OrderPlaced = {
      orderNumber,
      items: [...items],
      subtotal,
      shipping,
      total,
      shippingName: name,
      shippingAddress: address,
      shippingCity: city,
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    };

    // Attempt to record to backend
    try {
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
    } catch {
      // Offline fallback
    }

    // Save order locally for admin/account history
    try {
      const existing = JSON.parse(localStorage.getItem("placed_orders") || "[]");
      localStorage.setItem("placed_orders", JSON.stringify([orderData, ...existing]));
    } catch {
      // ignore
    }

    setTimeout(() => {
      clearBag();
      setOrderConfirmed(orderData);
      setIsSubmitting(false);
    }, 800);
  };

  if (orderConfirmed) {
    return (
      <div className="site-shell">
        <SiteHeader />
        <main className="checkout-page">
          <div className="order-confirmed-card" role="status" aria-live="polite">
            <div className="order-confirmed__icon" aria-hidden="true">✓</div>
            <p className="section-index">Thank You for Choosing Considered Pieces</p>
            <h1 className="order-confirmed__title">Your order is confirmed.</h1>
            <p className="order-confirmed__number">
              Order Reference: <b>{orderConfirmed.orderNumber}</b>
            </p>
            <p className="order-confirmed__lead">
              A receipt and tracking confirmation have been sent to <b>{email}</b>.
              Expected delivery: 3–5 business days.
            </p>

            <div className="order-summary-box">
              <h3 className="order-summary__heading">Order Summary</h3>
              <div className="order-summary__items">
                {orderConfirmed.items.map((i) => (
                  <div key={i.id} className="order-summary__row">
                    <span>
                      {i.name} (Size {i.size}) × {i.quantity}
                    </span>
                    <span>{formatPrice(i.price * i.quantity, "USD")}</span>
                  </div>
                ))}
                <div className="order-summary__row order-summary__row--divider">
                  <span>Shipping</span>
                  <span>{orderConfirmed.shipping === 0 ? "Complimentary" : formatPrice(orderConfirmed.shipping, "USD")}</span>
                </div>
                <div className="order-summary__row order-summary__row--total">
                  <span>Total Paid</span>
                  <span>{formatPrice(orderConfirmed.total, "USD")}</span>
                </div>
              </div>

              <div className="order-destination">
                <p className="order-destination__label">Dispatched To:</p>
                <p>{orderConfirmed.shippingName}</p>
                <p>{orderConfirmed.shippingAddress}, {orderConfirmed.shippingCity}</p>
              </div>
            </div>

            <div className="order-confirmed__actions">
              <Link href="/products" className="banner__btn banner__btn--primary">
                Continue Browsing
              </Link>
              <Link href="/admin" className="banner__btn banner__btn--ghost">
                View in Admin Dashboard
              </Link>
            </div>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="site-shell">
        <SiteHeader />
        <main className="checkout-page">
          <div className="checkout-empty">
            <h1 className="page-intro">Your Shopping Bag is Empty</h1>
            <p style={{ color: "var(--muted)", margin: "16px 0 32px" }}>
              Please add pieces from our collections before checking out.
            </p>
            <Link href="/products" className="banner__btn banner__btn--primary">
              Discover Products
            </Link>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="checkout-page">
        <header className="page-intro">
          <p className="section-index">Step 4 / Secure Checkout</p>
          <h1>Finalise your order.</h1>
          <p>Carefully inspected, packaged without plastic, and delivered with standard tracking.</p>
        </header>

        <div className="checkout-layout">
          {/* Left Column: Delivery & Payment Form */}
          <form className="checkout-form" onSubmit={handleSubmit}>
            <section className="checkout-section">
              <h2 className="checkout-section__title">1. Contact & Delivery</h2>
              <div className="checkout-grid">
                <div className="auth-field" style={{ gridColumn: "1 / -1" }}>
                  <label htmlFor="checkout-email">Email Address</label>
                  <input
                    id="checkout-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="auth-input"
                  />
                </div>

                <div className="auth-field" style={{ gridColumn: "1 / -1" }}>
                  <label htmlFor="checkout-name">Recipient Full Name</label>
                  <input
                    id="checkout-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Mara T."
                    className="auth-input"
                  />
                </div>

                <div className="auth-field" style={{ gridColumn: "1 / -1" }}>
                  <label htmlFor="checkout-addr">Street Address</label>
                  <input
                    id="checkout-addr"
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="124 Birger Jarlsgatan, Apt 4B"
                    className="auth-input"
                  />
                </div>

                <div className="auth-field">
                  <label htmlFor="checkout-city">City</label>
                  <input
                    id="checkout-city"
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Stockholm"
                    className="auth-input"
                  />
                </div>

                <div className="auth-field">
                  <label htmlFor="checkout-postal">Postal Code</label>
                  <input
                    id="checkout-postal"
                    type="text"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="114 20"
                    className="auth-input"
                  />
                </div>

                <div className="auth-field" style={{ gridColumn: "1 / -1" }}>
                  <label htmlFor="checkout-country">Country</label>
                  <select
                    id="checkout-country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="auth-input"
                  >
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Sweden">Sweden</option>
                    <option value="France">France</option>
                    <option value="Germany">Germany</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>
              </div>
            </section>

            <section className="checkout-section">
              <h2 className="checkout-section__title">2. Payment Method</h2>
              <p className="checkout-section__note">
                Encrypted with SSL. Simulated purchase for demonstration.
              </p>
              <div className="checkout-grid">
                <div className="auth-field" style={{ gridColumn: "1 / -1" }}>
                  <label htmlFor="card-number">Card Number</label>
                  <input
                    id="card-number"
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="auth-input"
                  />
                </div>

                <div className="auth-field">
                  <label htmlFor="card-expiry">Expires</label>
                  <input
                    id="card-expiry"
                    type="text"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className="auth-input"
                  />
                </div>

                <div className="auth-field">
                  <label htmlFor="card-cvc">Security Code (CVC)</label>
                  <input
                    id="card-cvc"
                    type="text"
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value)}
                    className="auth-input"
                  />
                </div>
              </div>
            </section>

            <button
              type="submit"
              disabled={isSubmitting}
              className="banner__btn banner__btn--primary checkout-submit-btn"
            >
              {isSubmitting ? "Securing Payment…" : `Place Order · ${formatPrice(total, "USD")}`}
            </button>
          </form>

          {/* Right Column: Receipt Breakdown */}
          <aside className="checkout-summary" aria-labelledby="summary-heading">
            <h2 id="summary-heading" className="checkout-summary__title">
              Order Details ({items.length} items)
            </h2>

            <div className="checkout-summary__list" role="list">
              {items.map((item) => (
                <div key={item.id} className="checkout-line-item" role="listitem">
                  <div className="checkout-line-item__img">
                    <Image
                      src={lookbookImage(item.imageIndex, 160)}
                      alt={item.name}
                      fill
                      sizes="60px"
                    />
                  </div>
                  <div className="checkout-line-item__info">
                    <h4>{item.name}</h4>
                    <p>Size {item.size} · Qty {item.quantity}</p>
                    <span className="checkout-line-item__price">
                      {formatPrice(item.price * item.quantity, item.currency)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="checkout-breakdown">
              <div className="checkout-breakdown__row">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal, "USD")}</span>
              </div>
              <div className="checkout-breakdown__row">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Complimentary" : formatPrice(shipping, "USD")}</span>
              </div>
              <div className="checkout-breakdown__row checkout-breakdown__row--total">
                <span>Total Due</span>
                <span>{formatPrice(total, "USD")}</span>
              </div>
            </div>

            <div className="checkout-trust-badge">
              <span className="checkout-trust-icon">✦</span>
              <p>30-Day Returns · Ethically Sourced Natural Fibres · Free Tracking</p>
            </div>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
