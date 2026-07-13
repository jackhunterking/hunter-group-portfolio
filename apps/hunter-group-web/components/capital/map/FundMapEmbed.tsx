"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { buildMapProperties } from "@/lib/capital/present";
import type { OfferingBundle } from "@/lib/capital/types";
import styles from "./fund-map.module.css";

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
    <div className={styles.embed}>
      <div className={styles.embedHead}>
        <h2 className={styles.embedHeading}>{m.portfolioBuildings}</h2>
        <p className={styles.embedIntro}>{m.intro}</p>
      </div>
      <FundMap properties={buildings} selectedId={selectedId} onSelect={setSelectedId} variant="embed" />
    </div>
  );
}
