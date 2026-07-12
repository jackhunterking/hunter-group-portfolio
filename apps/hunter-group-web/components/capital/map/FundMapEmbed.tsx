"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { buildMapProperties } from "@/lib/capital/present";
import type { OfferingBundle } from "@/lib/capital/types";
import styles from "./fund-map.module.css";

// Lazy-load the 3D map so the ArcGIS CDN + WebGL cost is paid only when the
// Map tab is opened.
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
        <div>
          <h2 className={styles.embedHeading}>{m.portfolioBuildings}</h2>
          <p className={styles.embedIntro}>{m.intro}</p>
        </div>
        <Link href={`/hunter-group-capital/map?offering=${offering.slug}`} className={styles.embedLink}>
          {m.title} →
        </Link>
      </div>
      <FundMap properties={buildings} selectedId={selectedId} onSelect={setSelectedId} variant="embed" />
    </div>
  );
}
