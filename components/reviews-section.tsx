import React from "react";

export function ReviewsSection() {
  const reviews = [
    {
      stars: 5,
      quote:
        "The Wool Overcoat is exactly what I've been looking for — heavy enough for real winter, light enough for the city. The quality is immediately obvious.",
      name: "Mara T.",
      location: "Stockholm",
      product: "The Wool Overcoat",
    },
    {
      stars: 5,
      quote:
        "I've been searching for well-cut linen trousers for years. The fit is impeccable, they don't crease badly, and they travel perfectly. Worth every penny.",
      name: "James K.",
      location: "London",
      product: "Linen Wide-Leg Trousers",
    },
    {
      stars: 5,
      quote:
        "The ribbed crewneck has become my most-worn piece. It's quiet, perfect, and hasn't pilled after six months of regular wear. Exactly what basics should be.",
      name: "Sophie L.",
      location: "Paris",
      product: "Ribbed Knit Crewneck",
    },
  ];

  return (
    <section className="reviews-section" aria-labelledby="reviews-heading">
      <header className="reviews-section__header">
        <p className="section-index">05 / From the wardrobe</p>
        <h2 id="reviews-heading" className="reviews-section__title">
          Worn and considered.
        </h2>
      </header>

      <div className="reviews-grid" role="list">
        {reviews.map((r) => (
          <blockquote key={r.name} className="review-card" role="listitem">
            <div className="review-card__stars" aria-label={`${r.stars} out of 5 stars`}>
              {"★".repeat(r.stars)}
            </div>
            <p className="review-card__quote">&ldquo;{r.quote}&rdquo;</p>
            <footer className="review-card__footer">
              <cite className="review-card__author">{r.name}</cite>
              <span className="review-card__meta"> · {r.location} · {r.product}</span>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
