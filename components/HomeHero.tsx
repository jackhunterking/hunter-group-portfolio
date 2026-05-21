"use client";

import Image from "next/image";
import Link from "next/link";
import { useT } from "@/lib/i18n/LanguageProvider";
import styles from "./HomeHero.module.css";

export default function HomeHero() {
  const t = useT();
  const h = t.home.hero;
  const STATS = [
    { value: h.stat1Value, label: h.stat1Label },
    { value: h.stat2Value, label: h.stat2Label },
  ];

  return (
    <section className={styles.hero}>

      {/* Background collage — drop hero-collage.jpg into /public/ */}
      <div className={styles.media}>
        <Image
          src="/herobg.png"
          alt={h.photoAlt}
          fill
          priority
          className={styles.photo}
          style={{ objectFit: "cover", objectPosition: "center center" }}
        />
      </div>

      {/* Directional overlay: near-black on left for text, fades right to show photos */}
      <div className={styles.overlay} />

      {/* Hero content */}
      <div className={styles.content}>
        <div className={styles.contentInner}>

          <p className={styles.eyebrow}>
            <span className={styles.hairline} />
            {h.eyebrow}
          </p>

          <h1 className={styles.heading}>
            {h.heading} <em>{h.headingEm}</em>
          </h1>

          <p className={styles.subtitle}>{h.sub}</p>

          <div className={styles.ctas}>
            <Link href="/#rehberler" className={styles.ctaPrimary}>
              {h.ctaPrimary}
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
            <a href="#hakkimizda" className={styles.ctaSecondary}>
              {h.ctaSecondary}
            </a>
          </div>

          {/* Credibility bar */}
          <div className={styles.stats}>
            {STATS.map((s) => (
              <div key={s.label} className={styles.stat}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
            <div className={styles.stat}>
              <Image
                src="/logos/remax-logo.png"
                alt="RE/MAX Hallmark"
                width={90}
                height={30}
                className={styles.remaxLogo}
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>

        </div>
      </div>

      <a href="#hakkimizda" className={styles.scroll} aria-label={h.scrollAria}>
        <span className={styles.scrollLine} />
      </a>
    </section>
  );
}
