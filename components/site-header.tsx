"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@heroui/react";

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileMenuOpen(false);
    }
    if (mobileMenuOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header className="site-header-wrapper">
      <div className="site-header">
        <Link className="site-header__brand" href="/" aria-label="Home">
          <Image
            className="site-header__logo"
            src="/brand/brand-logo.png"
            alt="Brand logo"
            width={427}
            height={175}
            priority
          />
        </Link>

        <nav className="site-header__nav" aria-label="Primary navigation">
          <Link href="/products">Products</Link>
          <Link href="/collections">Collections</Link>
          <Link href="/#approach">Our approach</Link>
        </nav>

        <div className="site-header__aside">
          <Button
            as="a"
            className="site-header__cta"
            href="/products"
            radius="full"
            size="sm"
            variant="bordered"
          >
            Shop the edit
          </Button>

          <button
            type="button"
            className="site-header__menu-btn"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className={`menu-icon ${mobileMenuOpen ? "menu-icon--open" : ""}`} aria-hidden="true">
              <span className="menu-icon__bar" />
              <span className="menu-icon__bar" />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div
          className="site-header__mobile-backdrop"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
      <div
        className={`site-header__mobile-drawer ${mobileMenuOpen ? "site-header__mobile-drawer--open" : ""}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="mobile-drawer__inner">
          <p className="section-index">Navigation</p>
          <nav className="mobile-drawer__links">
            <Link
              href="/products"
              className="mobile-drawer__link"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Products</span>
              <span className="mobile-drawer__arrow">→</span>
            </Link>
            <Link
              href="/collections"
              className="mobile-drawer__link"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Collections</span>
              <span className="mobile-drawer__arrow">→</span>
            </Link>
            <Link
              href="/#approach"
              className="mobile-drawer__link"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Our Approach</span>
              <span className="mobile-drawer__arrow">→</span>
            </Link>
          </nav>
          <div className="mobile-drawer__cta">
            <Link
              href="/products"
              className="banner__btn banner__btn--primary"
              style={{ width: "100%", justifyContent: "center" }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Shop the Collection
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
