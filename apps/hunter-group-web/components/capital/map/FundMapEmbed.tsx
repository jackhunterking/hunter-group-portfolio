"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { buildMapProperties } from "@/lib/capital/present";
import type { OfferingBundle } from "@/lib/capital/types";
import styles from "./fund-map.module.css";

/**
 * Placeholder embed for the fund's portfolio map (Phase 4).
 * Phase 5 replaces the body with the lazy-loaded 3D buildings map.
 */
export function FundMapEmbed({ offering }: { offering: OfferingBundle }) {
  const { lang, t } = useLang();
  const m = t.capitalApp.map;
  const buildings = buildMapProperties(offering, lang);

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
      <ul className={styles.buildingList}>
        {buildings.map((b) => (
          <li key={b.id}>
            <span className={styles.dot} style={{ background: b.accent }} aria-hidden />
            <span className={styles.buildingName}>{b.name}</span>
            <span className={styles.buildingMeta}>
              {b.city}, {b.province}
              {b.detail ? ` · ${b.detail}` : ""}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
