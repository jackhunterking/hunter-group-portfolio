"use client";

import { useLang } from "@/lib/i18n/LanguageProvider";
import { OfferingCard } from "@/components/capital/OfferingCard";
import type { OfferingBundle } from "@/lib/capital/types";
import styles from "@/components/capital/offerings.module.css";

export function Dashboard({ offerings }: { offerings: OfferingBundle[] }) {
  const { t } = useLang();
  const d = t.capitalApp.dashboard;

  return (
    <div className={styles.dashboard}>
      <header className={styles.dashHead}>
        <h1 className={styles.dashTitle}>{d.eyebrow}</h1>
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
    </div>
  );
}
