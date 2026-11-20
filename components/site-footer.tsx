import React from "react";
import Link from "next/link";

export function SiteFooter() {
  const year = new Date().getFullYear();

  const nav = [
    {
      heading: "COLLECTIONS",
      links: [
        { label: "All 09 Looks", href: "/collections" },
        { label: "The Morning Edit", href: "/collections/morning-edit" },
        { label: "Office Hours", href: "/collections/office-hours" },
        { label: "Weekend Ease", href: "/collections/weekend-ease" },
        { label: "City Dusk", href: "/collections/city-dusk" },
      ],
    },
    {
      heading: "SHOP",
      links: [
        { label: "All Pieces", href: "/products" },
        { label: "Outerwear", href: "/products?category=Outerwear" },
        { label: "Knitwear", href: "/products?category=Knitwear" },
        { label: "Bottoms", href: "/products?category=Bottoms" },
        { label: "Shirts", href: "/products?category=Shirts" },
      ],
    },
    {
      heading: "STUDIO",
      links: [
        { label: "Our Approach", href: "/#approach" },
        { label: "Materials & Mills", href: "/#approach" },
        { label: "Amsterdam Flagship", href: "/#approach" },
        { label: "Admin Portal", href: "/admin" },
      ],
    },
    {
      heading: "ASSISTANCE",
      links: [
        { label: "Orders & Tracking", href: "/checkout" },
        { label: "Worldwide Shipping", href: "/#approach" },
        { label: "30-Day Returns", href: "/#approach" },
        { label: "Client Service", href: "mailto:concierge@everydayedit.com" },
      ],
    },
  ];

  return (
    <footer className="olaf-footer" aria-label="Site footer">
      {/* Massive Brand Typographic Headline Banner */}
      <div className="olaf-footer__banner">
        <span className="olaf-footer__brand-text">THE EVERYDAY EDIT</span>
        <span className="olaf-footer__city-tag">AMSTERDAM · EST. 2024</span>
      </div>

      <div className="olaf-footer__grid">
        {nav.map((col) => (
          <div key={col.heading} className="olaf-footer__col">
            <h3 className="olaf-footer__col-heading">{col.heading}</h3>
            <ul className="olaf-footer__col-list">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="olaf-footer__col-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="olaf-footer__bottom">
        <p className="olaf-footer__copy">
          &copy; {year} THE EVERYDAY EDIT B.V. ALL RIGHTS RESERVED.
        </p>
        <div className="olaf-footer__links">
          <Link href="/#approach" className="olaf-footer__legal-link">
            PRIVACY POLICY
          </Link>
          <Link href="/#approach" className="olaf-footer__legal-link">
            TERMS OF SERVICE
          </Link>
          <Link href="/#approach" className="olaf-footer__legal-link">
            CARBON STATEMENT
          </Link>
        </div>
      </div>
    </footer>
  );
}
