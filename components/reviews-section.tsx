import React from "react";

export function ReviewsSection() {
  const reviews = [
    {
      stars: 5,
      quote:
        "The Royal Zardozi Sherwani is truly majestic. The weight of the raw silk and the intricacy of the gold zari embroidery surpassed every expectation. It felt custom made.",
      name: "Tariq A.",
      location: "London",
      product: "Royal Zardozi Sherwani",
    },
    {
      stars: 5,
      quote:
        "The drape of the Banarasi Katan silk saree is pure poetry. You can instantly feel the generational craftsmanship in the weave. Received endless compliments.",
      name: "Priyanka R.",
      location: "New York",
      product: "Banarasi Katan Silk Saree",
    },
    {
      stars: 5,
      quote:
        "The Handloom Tussar Silk Panjabi has that perfect natural texture and understated kantha collar detailing. Extremely comfortable in summer heat and looks regal.",
      name: "Zayan H.",
      location: "Dhaka",
      product: "Handloom Tussar Silk Panjabi",
    },
  ];

  return (
    <section className="olaf-section olaf-reviews-wrap" aria-labelledby="reviews-heading">
      <header className="olaf-section__header">
        <div className="olaf-section__title-group">
          <p className="olaf-section__label">COMMUNITY VOICES</p>
          <h2 id="reviews-heading" className="olaf-section__title">
            TESTIMONIALS & REVIEWS
          </h2>
        </div>
        <span className="olaf-section__sublabel">VERIFIED GLOBAL ORDERS</span>
      </header>

      <div className="olaf-reviews-grid" role="list">
        {reviews.map((r) => (
          <blockquote key={r.name} className="olaf-review-card" role="listitem">
            <div className="olaf-review-card__header">
              <span className="olaf-review-card__stars" aria-label={`${r.stars} out of 5 stars`}>
                {"★".repeat(r.stars)}
              </span>
              <span className="olaf-review-card__verified">VERIFIED PATRON</span>
            </div>
            <p className="olaf-review-card__quote">&ldquo;{r.quote}&rdquo;</p>
            <footer className="olaf-review-card__footer">
              <cite className="olaf-review-card__author">{r.name}</cite>
              <span className="olaf-review-card__meta">
                {r.location} · {r.product}
              </span>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
