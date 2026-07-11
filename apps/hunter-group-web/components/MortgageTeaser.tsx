"use client";

import { useState } from "react";
import Link from "next/link";
import { useT } from "@/lib/i18n/LanguageProvider";
import { HERO_RATES, heroTile } from "@/lib/mortgage/rates";
import RateTiles from "./mortgage/RateTiles";
import RateDisclosureModal from "./RateDisclosureModal";
import styles from "./MortgageTeaser.module.css";

export default function MortgageTeaser() {
  const t = useT();
  const f = t.mortgage;
  const [showDisclosure, setShowDisclosure] = useState(false);

  const fixed = heroTile(HERO_RATES.fixed);
  const variable = heroTile(HERO_RATES.variable);

  const tiles = [
    { label: f.rates.fixedLabel, tile: fixed },
    { label: f.rates.variableLabel, tile: variable },
  ];

  return (
    <section className={styles.section} id="mortgage-teaser">
      <div className="container">
        <div className={styles.inner}>
          <span className={styles.eyebrow}>
            <span className={styles.hairline} />
            {f.teaser.eyebrow}
            <span className={`${styles.hairline} ${styles.hairlineRight}`} />
          </span>

          <h2 className={styles.title}>
            {f.teaser.title} <em>{f.teaser.titleEm}</em>
          </h2>

          <p className={styles.sub}>{f.teaser.sub}</p>

          <div className={styles.ratesWrap}>
            <RateTiles
              tiles={tiles.map(({ label, tile }) => ({
                term: tile.term,
                kind: label,
                rate: tile.rate,
                detail: tile.detail,
              }))}
              updatingLabel={f.rates.updating}
            />
          </div>

          <button
            type="button"
            className={styles.disclosure}
            onClick={() => setShowDisclosure(true)}
          >
            {f.rates.disclosureLabel}
          </button>

          <Link href="/mortgage" className={styles.cta}>
            {f.teaser.cta}
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
              <path
                d="M10 1l5 5-5 5M15 6H1"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>

      {showDisclosure ? (
        <RateDisclosureModal onClose={() => setShowDisclosure(false)} />
      ) : null}
    </section>
  );
}
