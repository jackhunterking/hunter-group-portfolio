import { notFound } from "next/navigation";
import { getOfferingBySlug, getOfferings } from "@/lib/capital/repository";
import { OfferingDetail } from "./OfferingDetail";

export function generateStaticParams() { return getOfferings().map((item) => ({ slug: item.slug })); }

export default async function OfferingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const offering = getOfferingBySlug(slug);
  if (!offering) notFound();
  return <OfferingDetail offering={offering} />;
}
