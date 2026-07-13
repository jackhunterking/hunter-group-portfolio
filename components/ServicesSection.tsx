"use client";

import { useT } from "@/lib/i18n/LanguageProvider";
import styles from "./ServicesSection.module.css";

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
          <article className={styles.card}>
            <h3 className={styles.cardTitle}>{s.buy.title}</h3>
            <p className={styles.cardDesc}>{s.buy.desc}</p>
          </article>

          <article className={styles.card}>
            <h3 className={styles.cardTitle}>{s.sell.title}</h3>
            <p className={styles.cardDesc}>{s.sell.desc}</p>
          </article>

          <article className={styles.card}>
            <h3 className={styles.cardTitle}>{s.mortgage.title}</h3>
            <p className={styles.cardDesc}>{s.mortgage.desc}</p>
          </article>

          <article className={styles.card}>
            <h3 className={styles.cardTitle}>{s.invest.title}</h3>
            <p className={styles.cardDesc}>{s.invest.desc}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
