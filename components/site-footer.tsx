import React from "react";
import Link from "next/link";

export function SiteFooter() {
  const year = new Date().getFullYear();

  const nav = [
    {
      heading: "SOUTH ASIAN OUTFITS",
      links: [
        { label: "Royal Sherwanis", href: "/products?category=Sherwani" },
        { label: "Banarasi Sarees", href: "/products?category=Saree" },
        { label: "Heritage Kurtas", href: "/products?category=Kurta" },
        { label: "Tussar Panjabis", href: "/products?category=Panjabi" },
        { label: "Velvet Bandhgalas", href: "/products?category=Bandhgala" },
      ],
    },
    {
      heading: "COLLECTIONS",
      links: [
        { label: "All 09 Editorial Looks", href: "/collections" },
        { label: "The Morning Edit", href: "/collections/morning-edit" },
        { label: "Office Hours", href: "/collections/office-hours" },
        { label: "Weekend Ease", href: "/collections/weekend-ease" },
        { label: "City Dusk", href: "/collections/city-dusk" },
      ],
    },
    {
      heading: "HERITAGE & CRAFT",
      links: [
        { label: "Our Approach", href: "/#approach" },
        { label: "Ancestral Weaving", href: "/#approach" },
        { label: "Zari & Embroidery", href: "/#approach" },
        { label: "Admin Portal", href: "/admin" },
      ],
    },
    {
      heading: "CONCIERGE",
      links: [
        { label: "Track Your Order", href: "/checkout" },
        { label: "Bespoke Sizing", href: "/#approach" },
        { label: "Insured Global Shipping", href: "/#approach" },
        { label: "Client Assistance", href: "mailto:concierge@everydayedit.com" },
      ],
    },
  ];

  return (
    <footer className="olaf-footer" aria-label="Site footer">
      {/* Massive Brand Typographic Headline Banner */}
      <div className="olaf-footer__banner">
        <span className="olaf-footer__brand-text">THE EVERYDAY EDIT</span>
        <span className="olaf-footer__city-tag">SOUTH ASIAN HERITAGE · EST. 2024</span>
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
          &copy; {year} THE EVERYDAY EDIT. ALL RIGHTS RESERVED.
        </p>
        <div className="olaf-footer__links">
          <Link href="/#approach" className="olaf-footer__legal-link">
            PRIVACY POLICY
          </Link>
          <Link href="/#approach" className="olaf-footer__legal-link">
            TERMS OF SERVICE
          </Link>
          <Link href="/#approach" className="olaf-footer__legal-link">
            ARTISAN CHARTER
          </Link>
        </div>
      </div>
    </footer>
  );
}
