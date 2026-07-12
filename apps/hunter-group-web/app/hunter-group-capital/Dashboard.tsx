"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { OfferingCard } from "@/components/capital/OfferingCard";
import type { OfferingBundle } from "@/lib/capital/types";
import styles from "@/components/capital/offerings.module.css";

export function Dashboard({ offerings }: { offerings: OfferingBundle[] }) {
  const { t } = useLang();
  const d = t.capitalApp.dashboard;

  // Unique buildings / cities across the portfolios (properties may be shared).
  const propertyMap = new Map<string, OfferingBundle["properties"][number]>();
  offerings.forEach((o) => o.properties.forEach((p) => propertyMap.set(p.id, p)));
  const allProperties = [...propertyMap.values()];
  const cities = new Set(allProperties.map((p) => p.city));

  const stats = [
    { value: offerings.length, label: d.statOfferings },
    { value: allProperties.length, label: d.statBuildings },
    { value: cities.size, label: d.statCities },
  ];

  return (
    <div className={styles.dashboard}>
      <header className={styles.dashHead}>
        <p className={styles.eyebrow}>{d.eyebrow}</p>
        <h1 className={styles.dashTitle}>{d.title}</h1>
        <p className={styles.dashIntro}>{d.intro}</p>
        <dl className={styles.statStrip}>
          {stats.map((s) => (
            <div key={s.label}>
              <dt>{s.value}</dt>
              <dd>{s.label}</dd>
            </div>
          ))}
        </dl>
      </header>

      {offerings.length ? (
        <div className={styles.grid}>
          {offerings.map((o) => (
            <OfferingCard key={o.id} offering={o} />
          ))}
        </div>
      ) : (
        <p className={styles.empty}>{d.empty}</p>
      )}

      <div className={styles.dashFooterLink}>
        <Link href="/hunter-group-capital/offerings">{d.allOfferings} →</Link>
      </div>
    </div>
  );
}
