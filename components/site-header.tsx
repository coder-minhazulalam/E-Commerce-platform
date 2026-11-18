"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@heroui/react";
import { useBag } from "../lib/cart-context";
import { useAuth } from "../lib/auth-context";
import { BagDrawer } from "./bag-drawer";

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, openBag } = useBag();
  const { user, isAdmin, signOut } = useAuth();

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
    <>
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
            {isAdmin && (
              <Link href="/admin" className="site-header__admin-badge">
                Admin
              </Link>
            )}
          </nav>

          <div className="site-header__aside">
            {user ? (
              <div className="site-header__user-menu">
                <Link href="/admin" className="site-header__user-name" title={user.email}>
                  {user.user_metadata?.full_name || user.email.split("@")[0]}
                </Link>
                <button
                  type="button"
                  onClick={() => signOut()}
                  className="site-header__signout-btn"
                >
                  Exit
                </button>
              </div>
            ) : (
              <Link href="/auth/login" className="site-header__auth-link">
                Sign in
              </Link>
            )}

            <button
              type="button"
              className="site-header__bag-btn"
              onClick={openBag}
              aria-label={`Shopping bag with ${totalItems} items`}
            >
              <span>Bag</span>
              {totalItems > 0 && <span className="bag-badge">{totalItems}</span>}
            </button>

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
              {isAdmin && (
                <Link
                  href="/admin"
                  className="mobile-drawer__link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span style={{ color: "var(--brass)", fontWeight: 600 }}>Admin Dashboard</span>
                  <span className="mobile-drawer__arrow">→</span>
                </Link>
              )}
              {user ? (
                <button
                  type="button"
                  className="mobile-drawer__link"
                  style={{ textAlign: "left", width: "100%", background: "#f8f8f8" }}
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }}
                >
                  <span>Sign out ({user.email})</span>
                  <span className="mobile-drawer__arrow">↪</span>
                </button>
              ) : (
                <Link
                  href="/auth/login"
                  className="mobile-drawer__link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>Sign in / Create Account</span>
                  <span className="mobile-drawer__arrow">→</span>
                </Link>
              )}
            </nav>
            <div className="mobile-drawer__cta">
              <button
                type="button"
                className="banner__btn banner__btn--primary"
                style={{ width: "100%", justifyContent: "center" }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  openBag();
                }}
              >
                View Shopping Bag ({totalItems})
              </button>
            </div>
          </div>
        </div>
      </header>
      <BagDrawer />
    </>
  );
}
