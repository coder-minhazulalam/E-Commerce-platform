import React from "react";
import { SiteHeader } from "../../../components/site-header";
import { LookDetailView } from "../../../components/look-detail-view";
import { NINE_LOOKS } from "../../../lib/looks";

interface LookPageProps {
  params: Promise<{ lookId: string }>;
}

export async function generateMetadata({ params }: LookPageProps) {
  const { lookId } = await params;
  const normalized = lookId.toLowerCase();
  const look = NINE_LOOKS.find(
    (l) =>
      l.id.toLowerCase() === normalized ||
      l.slug.toLowerCase() === normalized ||
      String(l.lookNumber) === normalized,
  );
  if (!look) {
    return { title: "Look not found · Editorial Lookbook" };
  }
  return {
    title: `Look 0${look.lookNumber}: ${look.title} · Editorial Lookbook`,
    description: look.description,
  };
}

export default async function LookDetailPage({ params }: LookPageProps) {
  const { lookId } = await params;
  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="look-detail-page">
        <LookDetailView lookId={lookId} />
      </main>
    </div>
  );
}
