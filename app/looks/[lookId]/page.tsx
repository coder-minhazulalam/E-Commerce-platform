import { redirect } from "next/navigation";

export default async function LegacyLookDetailPage({
  params,
}: {
  params: Promise<{ lookId: string }>;
}) {
  const { lookId } = await params;
  redirect(`/collections/${lookId}`);
}
