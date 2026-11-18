import React from "react";
import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  const year = new Date().getFullYear();

  const nav = [
    {
      heading: "Shop",
      links: [
        { label: "All Products", href: "/products" },
        { label: "New Arrivals", href: "/products?sort=featured" },
        { label: "Outerwear", href: "/products?category=Outerwear" },
        { label: "Knitwear", href: "/products?category=Knitwear" },
        { label: "Denim", href: "/products?category=Denim" },
      ],
    },
    {
      heading: "Collections",
      links: [
        { label: "View All", href: "/collections" },
        { label: "Morning Edit", href: "/collections/morning-edit" },
        { label: "Weekend Ease", href: "/collections/weekend-ease" },
        { label: "Office Hours", href: "/collections/office-hours" },
        { label: "Golden Hour", href: "/collections/golden-hour" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "About", href: "/#approach" },
        { label: "Journal", href: "#" },
        { label: "Sustainability", href: "#" },
        { label: "Press", href: "#" },
      ],
    },
    {
      heading: "Help",
      links: [
        { label: "Size Guide", href: "#" },
        { label: "Care Guide", href: "#" },
        { label: "Delivery", href: "#" },
        { label: "Returns", href: "#" },
        { label: "Contact", href: "#" },
      ],
    },
  ];

  return (
    <footer className="site-footer" aria-label="Site footer">
      <div className="site-footer__top">
        <div className="site-footer__brand">
          <Image
            src="/brand/brand-logo.png"
            alt="Brand logo"
            width={140}
            height={58}
            className="site-footer__logo"
          />
          <p className="site-footer__tagline">
            Clothes that earn their place.
          </p>
        </div>

        <nav className="site-footer__nav" aria-label="Footer navigation">
          {nav.map((col) => (
            <div key={col.heading} className="site-footer__col">
              <h3 className="site-footer__col-title">{col.heading}</h3>
              <ul className="site-footer__links">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="site-footer__link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="site-footer__bar">
        <p className="site-footer__copy">
          © {year} · All rights reserved
        </p>
        <div className="site-footer__legal">
          <Link href="#" className="site-footer__legal-link">
            Privacy
          </Link>
          <Link href="#" className="site-footer__legal-link">
            Terms
          </Link>
          <Link href="#" className="site-footer__legal-link">
            Instagram
          </Link>
        </div>
      </div>
    </footer>
  );
}
