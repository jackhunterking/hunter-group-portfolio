"use client";

import { useState } from "react";
import Link from "next/link";
import { useT } from "@/lib/i18n/LanguageProvider";
import { HERO_RATES, heroTile } from "@/lib/finansman/rates";
import RateDisclosureModal from "./RateDisclosureModal";
import styles from "./FinansmanTeaser.module.css";

export default function FinansmanTeaser() {
  const t = useT();
  const f = t.finansman;
  const [showDisclosure, setShowDisclosure] = useState(false);

  const fixed = heroTile(HERO_RATES.fixed);
  const variable = heroTile(HERO_RATES.variable);

  const tiles = [
    { label: f.rates.fixedLabel, tile: fixed },
    { label: f.rates.variableLabel, tile: variable },
  ];

  return (
    <section className={styles.section} id="finansman-teaser">
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

          <div className={styles.rates}>
            {tiles.map(({ label, tile }) => (
              <div key={label} className={styles.tile}>
                <span className={styles.tileTerm}>{tile.term}</span>
                <span className={styles.tileLabel}>{label}</span>
                <span className={styles.tileRate}>
                  {tile.rate ?? f.rates.updating}
                </span>
                {tile.detail ? (
                  <span className={styles.tileDetail}>{tile.detail}</span>
                ) : null}
              </div>
            ))}
          </div>

          <button
            type="button"
            className={styles.disclosure}
            onClick={() => setShowDisclosure(true)}
          >
            {f.rates.disclosureLabel}
          </button>

          <Link href="/finansman" className={styles.cta}>
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
