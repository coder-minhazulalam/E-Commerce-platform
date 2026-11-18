import React from "react";
import { SiteHeader } from "../components/site-header";
import { BannerSection } from "../components/banner-section";
import { FeaturesStrip } from "../components/features-strip";
import { CollectionsPreview } from "../components/collections-preview";
import { FeaturedProducts } from "../components/featured-products";
import { BrandStory } from "../components/brand-story";
import { ReviewsSection } from "../components/reviews-section";
import { NewsletterSection } from "../components/newsletter-section";
import { SiteFooter } from "../components/site-footer";

export default function HomePage() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main id="main-content">
        <BannerSection />
        <FeaturesStrip />
        <CollectionsPreview />
        <FeaturedProducts />
        <BrandStory />
        <ReviewsSection />
        <NewsletterSection />
      </main>
      <SiteFooter />
    </div>
  );
}
