import React from "react";

export function BrandStory() {
  return (
    <section className="brand-story" id="approach" aria-labelledby="story-heading">
      <div className="brand-story__header">
        <p className="section-index">04 / Our approach</p>
        <h2 id="story-heading" className="brand-story__title">
          Every piece considered.
        </h2>
      </div>

      <div className="brand-story__columns">
        <div className="brand-story__col">
          <h3 className="brand-story__col-title">Considered, not fast</h3>
          <p>
            We produce a small number of styles each season — deliberately. Each piece
            takes time to arrive at because we work backward from the question: would
            you still want to wear this in five years?
          </p>
        </div>
        <div className="brand-story__col">
          <h3 className="brand-story__col-title">Made for repeat wear</h3>
          <p>
            Nothing here is designed to be worn once. The cuts are proportioned to work
            across contexts — dressed up, dressed down, layered or alone. Versatility
            is a design decision, not an afterthought.
          </p>
        </div>
        <div className="brand-story__col">
          <h3 className="brand-story__col-title">Materials matter</h3>
          <p>
            We use linen, merino, cotton, and wool — materials that age well, breathe
            properly, and don&rsquo;t shed microplastics. No polyester blends. No shortcuts
            on fabric because the fabric is the garment.
          </p>
        </div>
      </div>
    </section>
  );
}
