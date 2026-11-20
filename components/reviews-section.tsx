import React from "react";

export function ReviewsSection() {
  const reviews = [
    {
      stars: 5,
      quote:
        "The Wool Overcoat has become my everyday uniform in Amsterdam. The weight is substantial, the silhouette is effortlessly oversized, and the tailoring turns heads.",
      name: "Bram V.",
      location: "Amsterdam",
      product: "The Wool Overcoat",
    },
    {
      stars: 5,
      quote:
        "Impeccable cut and drape. The linen trousers have that rare balance of high-end architectural structure and pure casual comfort. Essential piece.",
      name: "Lena S.",
      location: "Paris",
      product: "Linen Wide-Leg Trousers",
    },
    {
      stars: 5,
      quote:
        "Quiet luxury done right. The knitwear is heavy, soft, and keeps its shape after months of constant wear. You can immediately feel the quality of the yarn.",
      name: "Kenji M.",
      location: "Tokyo",
      product: "Ribbed Knit Crewneck",
    },
  ];

  return (
    <section className="olaf-section olaf-reviews-wrap" aria-labelledby="reviews-heading">
      <header className="olaf-section__header">
        <div className="olaf-section__title-group">
          <p className="olaf-section__label">COMMUNITY VOICES</p>
          <h2 id="reviews-heading" className="olaf-section__title">
            COMMUNITY & CRITIQUE
          </h2>
        </div>
        <span className="olaf-section__sublabel">VERIFIED CLIENTS WORLDWIDE</span>
      </header>

      <div className="olaf-reviews-grid" role="list">
        {reviews.map((r) => (
          <blockquote key={r.name} className="olaf-review-card" role="listitem">
            <div className="olaf-review-card__header">
              <span className="olaf-review-card__stars" aria-label={`${r.stars} out of 5 stars`}>
                {"★".repeat(r.stars)}
              </span>
              <span className="olaf-review-card__verified">VERIFIED ORDER</span>
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
