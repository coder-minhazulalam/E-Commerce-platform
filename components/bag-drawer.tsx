"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useBag } from "../lib/cart-context";
import { lookbookImage } from "../lib/assets";
import { formatPrice } from "../lib/products";

export function BagDrawer() {
  const { items, isBagOpen, closeBag, removeItem, updateQuantity, subtotal, shipping, total, totalItems } = useBag();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isBagOpen) closeBag();
    }
    if (isBagOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isBagOpen, closeBag]);

  if (!isBagOpen) return null;

  return (
    <div className="bag-drawer-portal">
      <div className="bag-drawer-backdrop" onClick={closeBag} aria-hidden="true" />
      <aside className="bag-drawer" aria-labelledby="bag-drawer-title" role="dialog" aria-modal="true">
        <header className="bag-drawer__header">
          <div>
            <p className="section-index">Your Wardrobe Edit</p>
            <h2 id="bag-drawer-title" className="bag-drawer__title">
              Shopping Bag ({totalItems})
            </h2>
          </div>
          <button
            type="button"
            className="bag-drawer__close-btn"
            onClick={closeBag}
            aria-label="Close shopping bag"
          >
            ✕
          </button>
        </header>

        {items.length === 0 ? (
          <div className="bag-drawer__empty">
            <p className="bag-drawer__empty-text">Your bag is empty.</p>
            <p className="bag-drawer__empty-sub">
              Considered pieces designed for repeat wear are waiting in the collection.
            </p>
            <Link href="/products" className="banner__btn banner__btn--primary" onClick={closeBag}>
              Explore Collection
            </Link>
          </div>
        ) : (
          <>
            <div className="bag-drawer__items" role="list">
              {items.map((item) => (
                <div key={item.id} className="bag-item" role="listitem">
                  <div className="bag-item__media">
                    <Image
                      src={lookbookImage(item.imageIndex, 240)}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="bag-item__img"
                    />
                  </div>
                  <div className="bag-item__details">
                    <div className="bag-item__top">
                      <div>
                        <p className="bag-item__category">{item.category}</p>
                        <h3 className="bag-item__name">{item.name}</h3>
                        <p className="bag-item__size">Size: <b>{item.size}</b></p>
                      </div>
                      <button
                        type="button"
                        className="bag-item__remove"
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove ${item.name} size ${item.size} from bag`}
                      >
                        Remove
                      </button>
                    </div>

                    <div className="bag-item__bottom">
                      <div className="bag-item__qty" aria-label="Quantity controls">
                        <button
                          type="button"
                          className="bag-qty-btn"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="bag-qty-num">{item.quantity}</span>
                        <button
                          type="button"
                          className="bag-qty-btn"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <p className="bag-item__price">
                        {formatPrice(item.price * item.quantity, item.currency)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <footer className="bag-drawer__footer">
              <div className="bag-drawer__receipt">
                <div className="bag-receipt__row">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal, "USD")}</span>
                </div>
                <div className="bag-receipt__row">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Complimentary" : formatPrice(shipping, "USD")}</span>
                </div>
                {shipping > 0 && (
                  <p className="bag-receipt__perk">
                    Add {formatPrice(150 - subtotal, "USD")} more to unlock complimentary shipping.
                  </p>
                )}
                <div className="bag-receipt__row bag-receipt__row--total">
                  <span>Total</span>
                  <span>{formatPrice(total, "USD")}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="banner__btn banner__btn--primary bag-drawer__checkout-btn"
                onClick={closeBag}
              >
                Proceed to Checkout
              </Link>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
