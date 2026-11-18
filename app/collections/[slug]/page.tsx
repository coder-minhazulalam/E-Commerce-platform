import React from "react";
import { SiteHeader } from "../../../components/site-header";
import { SiteFooter } from "../../../components/site-footer";
import { CollectionDetailView } from "../../../components/collection-detail-view";
import { NINE_COLLECTIONS } from "../../../lib/collections";

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CollectionPageProps) {
  const { slug } = await params;
  const normalized = slug.toLowerCase();
  const collection = NINE_COLLECTIONS.find(
    (c) =>
      c.id.toLowerCase() === normalized ||
      c.slug.toLowerCase() === normalized ||
      String(c.number) === normalized,
  );
  if (!collection) {
    return { title: "Collection not found · Editorial Collections" };
  }
  return {
    title: `Collection 0${collection.number}: ${collection.title} · Editorial Collections`,
    description: collection.description,
  };
}

export default async function CollectionDetailPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="look-detail-page">
        <CollectionDetailView slug={slug} />
      </main>
      <SiteFooter />
    </div>
  );
}
