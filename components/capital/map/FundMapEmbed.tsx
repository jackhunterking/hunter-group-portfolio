"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { buildMapProperties } from "@/lib/capital/present";
import type { OfferingBundle } from "@/lib/capital/types";

// Lazy-load the map so Leaflet (CDN) + tiles load only when the Portfolio tab
// is opened.
const FundMap = dynamic(() => import("./FundMap").then((m) => m.FundMap), {
  ssr: false,
  loading: () => null,
});

export function FundMapEmbed({ offering }: { offering: OfferingBundle }) {
  const { lang, t } = useLang();
  const m = t.capitalApp.map;
  const buildings = buildMapProperties(offering, lang);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="font-serif text-lg font-semibold text-foreground">{m.portfolioBuildings}</h2>
        <p className="text-sm text-muted-foreground">{m.intro}</p>
      </div>
      <FundMap properties={buildings} selectedId={selectedId} onSelect={setSelectedId} variant="embed" />
    </div>
  );
}
