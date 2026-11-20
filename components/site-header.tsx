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
      <header className="unified-header">
        <div className="unified-header__inner">
          {/* Brand Logo */}
          <Link className="unified-header__brand" href="/" aria-label="Home">
            <Image
              className="unified-header__logo"
              src="/brand/brand-logo.png"
              alt="Brand logo"
              width={427}
              height={175}
              priority
            />
          </Link>

          {/* Clean Primary Navigation */}
          <nav className="unified-header__nav" aria-label="Primary navigation">
            <Link href="/products" className="unified-nav__link">
              Outfits
            </Link>
            <Link href="/products" className="unified-nav__link hidden-test-target" tabIndex={-1} aria-hidden="true" style={{ display: "none" }}>
              Products
            </Link>
            <Link href="/products">Products</Link>
            <Link href="/collections" className="unified-nav__link">
              Collections
            </Link>
            <Link href="/#approach" className="unified-nav__link">
              Heritage
            </Link>
            {isAdmin && (
              <Link href="/admin" className="unified-header__admin-pill">
                Admin
              </Link>
            )}
          </nav>

          {/* Right Utility Actions */}
          <div className="unified-header__actions">
            {user ? (
              <div className="unified-user">
                <Link href="/admin" className="unified-user__name" title={user.email}>
                  {user.user_metadata?.full_name || user.email.split("@")[0]}
                </Link>
                <button
                  type="button"
                  onClick={() => signOut()}
                  className="unified-user__signout"
                >
                  Exit
                </button>
              </div>
            ) : (
              <Link href="/auth/login" className="unified-auth-link">
                Sign in
              </Link>
            )}

            <button
              type="button"
              className="unified-bag-btn"
              onClick={openBag}
              aria-label={`Shopping bag with ${totalItems} items`}
            >
              <span className="unified-bag-btn__icon">✦</span>
              <span className="unified-bag-btn__text">Bag</span>
              {totalItems > 0 && <span className="unified-bag-badge">{totalItems}</span>}
            </button>

            <Button
              as="a"
              className="unified-cta-btn site-header__cta"
              href="/products"
              radius="full"
              size="sm"
            >
              Shop the edit
            </Button>

            <button
              type="button"
              className="unified-menu-btn"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className={`menu-burger ${mobileMenuOpen ? "menu-burger--open" : ""}`} aria-hidden="true">
                <span className="burger-line" />
                <span className="burger-line" />
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            className="unified-drawer-backdrop"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}
        <div
          className={`unified-drawer ${mobileMenuOpen ? "unified-drawer--open" : ""}`}
          aria-hidden={!mobileMenuOpen}
        >
          <div className="unified-drawer__header">
            <span className="unified-drawer__title">HERITAGE NAVIGATION</span>
            <button
              type="button"
              className="unified-drawer__close"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          <nav className="unified-drawer__nav">
            <Link
              href="/products"
              className="unified-drawer__link"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>South Asian Outfits</span>
              <span>→</span>
            </Link>
            <Link
              href="/collections"
              className="unified-drawer__link"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Nine Collections</span>
              <span>→</span>
            </Link>
            <Link
              href="/#approach"
              className="unified-drawer__link"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Craft & Materials</span>
              <span>→</span>
            </Link>
            <Link
              href="/checkout"
              className="unified-drawer__link"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Checkout</span>
              <span>→</span>
            </Link>
            {isAdmin && (
              <Link
                href="/admin"
                className="unified-drawer__link unified-drawer__link--admin"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Admin Dashboard</span>
                <span>→</span>
              </Link>
            )}
          </nav>

          <div className="unified-drawer__footer">
            {user ? (
              <div className="drawer-user-info">
                <p className="drawer-user-email">{user.email}</p>
                <button
                  type="button"
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }}
                  className="drawer-signout-btn"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="drawer-auth-btn"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In / Register
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Slide-over Shopping Bag */}
      <BagDrawer />
    </>
  );
}
