"use client";

import { useT } from "@/lib/i18n/LanguageProvider";
import { RMA } from "@/lib/mortgage/identity";
import styles from "./MortgageDisclosure.module.css";

/**
 * Walled Real Mortgage Associates / FSRA disclosure band (spec §8).
 * Carries the mortgage-side regulated identity, separate from the RE/MAX
 * Hallmark footer. Rendered at the bottom of every Mortgage page.
 */
export default function MortgageDisclosure() {
  const t = useT();
  const c = t.mortgage.compliance;

  return (
    <section className={styles.band} aria-label={c.heading}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.identity}>
            <span className={styles.brokerage}>{RMA.brokerage}</span>
            <span className={styles.licence}>{RMA.licenceLine}</span>
          </div>

          <div className={styles.copy}>
            <span className={styles.heading}>{c.heading}</span>
            <p className={styles.brand}>{c.brand}</p>
            <p className={styles.legal}>{c.disclaimer}</p>
            <p className={styles.legal}>{c.legal}</p>
            <p className={styles.separate}>{c.separateNote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
