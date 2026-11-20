import React from "react";

export function FeaturesStrip() {
  const features = [
    {
      num: "01",
      title: "AMSTERDAM DESIGN",
      detail: "Clean Dutch minimalism paired with relaxed streetwear tailoring for effortless everyday wear.",
    },
    {
      num: "02",
      title: "NATURAL MATERIALITY",
      detail: "Heavyweight virgin wools, certified organic cottons, and breathable linens. No synthetic blends.",
    },
    {
      num: "03",
      title: "GLOBAL DISPATCH",
      detail: "Carbon-neutral tracked shipping worldwide with complimentary delivery on orders over $150.",
    },
    {
      num: "04",
      title: "LIFETIME SILHOUETTE",
      detail: "Intentional micro-capsules crafted to be worn, styled, and layered across seasons for years to come.",
    },
  ];

  return (
    <section className="olaf-features" aria-label="Brand pillars">
      <div className="olaf-features__grid">
        {features.map((f) => (
          <div key={f.num} className="olaf-feature-item">
            <div className="olaf-feature-item__header">
              <span className="olaf-feature-item__num">{f.num}</span>
              <span className="olaf-feature-item__line" />
            </div>
            <h3 className="olaf-feature-item__title">{f.title}</h3>
            <p className="olaf-feature-item__detail">{f.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
