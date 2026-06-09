import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { tr } from "@/lib/i18n/dictionaries";
import { RMA } from "@/lib/finansman/identity";
import { INTENTS, isIntent } from "@/lib/finansman/intents";
import IntentClient from "./IntentClient";

export function generateStaticParams() {
  return INTENTS.map((intent) => ({ intent }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ intent: string }>;
}): Promise<Metadata> {
  const { intent } = await params;
  if (!isIntent(intent)) return {};
  const page = tr.finansmanIntents[intent];
  return {
    title: `${page.title} · ${RMA.brokerage}`,
    description: page.sub,
  };
}

export default async function IntentPage({
  params,
}: {
  params: Promise<{ intent: string }>;
}) {
  const { intent } = await params;
  if (!isIntent(intent)) notFound();
  return <IntentClient intent={intent} />;
}
