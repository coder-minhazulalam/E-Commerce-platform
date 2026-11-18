import React from "react";

export function FeaturesStrip() {
  const features = [
    { mark: "✦", title: "Considered pieces", detail: "A small, intentional edit — never overproduced." },
    { mark: "→", title: "Free delivery over $150", detail: "Standard tracked shipping on qualifying orders." },
    { mark: "↩", title: "30-day returns", detail: "Easy, free returns within 30 days of delivery." },
    { mark: "◈", title: "Natural materials only", detail: "Linen, merino, cotton, wool — no polyester blends." },
  ];

  return (
    <section className="features-strip" aria-label="Brand commitments">
      {features.map((f) => (
        <div key={f.title} className="features-strip__item">
          <span className="features-strip__mark" aria-hidden="true">{f.mark}</span>
          <div>
            <h3 className="features-strip__title">{f.title}</h3>
            <p className="features-strip__detail">{f.detail}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
