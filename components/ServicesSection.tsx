"use client";

import Link from "next/link";
import { useT } from "@/lib/i18n/LanguageProvider";
import styles from "./ServicesSection.module.css";

function Arrow() {
  return (
    <svg width="15" height="11" viewBox="0 0 16 12" fill="none" aria-hidden="true">
      <path
        d="M10 1l5 5-5 5M15 6H1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ServicesSection() {
  const t = useT();
  const s = t.home.services;

  return (
    <section className={styles.services} id="hizmetler">
      <div className="container">
        <div className={styles.head}>
          <span className={styles.eyebrow}>
            <span className={styles.hairline} />
            {s.eyebrow}
            <span className={`${styles.hairline} ${styles.hairlineRight}`} />
          </span>
          <h2 className={styles.title}>
            {s.title} <em>{s.titleEm}</em>
          </h2>
          <p className={styles.sub}>{s.sub}</p>
        </div>

        <div className={styles.grid}>
          {/* Buying — RE/MAX Hallmark; Hunter X Capital folds in as the investment option */}
          <article className={styles.card}>
            <span className={styles.tag}>{s.buy.tag}</span>
            <h3 className={styles.cardTitle}>{s.buy.title}</h3>
            <p className={styles.cardDesc}>{s.buy.desc}</p>
            <div className={styles.links}>
              <Link href="/rehber/alici" className={styles.cardLink}>
                {s.buy.homeLabel}
                <Arrow />
              </Link>
              <Link href="/hunter-x-capital" className={styles.cardLink}>
                {s.buy.investLabel}
                <Arrow />
              </Link>
            </div>
          </article>

          {/* Selling — RE/MAX Hallmark */}
          <article className={styles.card}>
            <span className={styles.tag}>{s.sell.tag}</span>
            <h3 className={styles.cardTitle}>{s.sell.title}</h3>
            <p className={styles.cardDesc}>{s.sell.desc}</p>
            <div className={styles.links}>
              <Link href="/rehber/satici" className={styles.cardLink}>
                {s.sell.cta}
                <Arrow />
              </Link>
            </div>
          </article>

          {/* Financing — RMA Mortgage · FSRA */}
          <article className={styles.card}>
            <span className={styles.tag}>{s.mortgage.tag}</span>
            <h3 className={styles.cardTitle}>{s.mortgage.title}</h3>
            <p className={styles.cardDesc}>{s.mortgage.desc}</p>
            <div className={styles.links}>
              <Link href="/mortgage" className={styles.cardLink}>
                {s.mortgage.cta}
                <Arrow />
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
