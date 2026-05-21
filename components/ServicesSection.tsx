"use client";

import Link from "next/link";
import { useT } from "@/lib/i18n/LanguageProvider";
import styles from "./ServicesSection.module.css";

export default function ServicesSection() {
  const t = useT();
  const s = t.home.services;

  const SERVICES = [
    {
      number: "01",
      title: s.card1Title,
      description: s.card1Desc,
      iconPath: "M8 28L32 10l24 18v26H8V28z M26 54V38h12v16",
    },
    {
      number: "02",
      title: s.card2Title,
      description: s.card2Desc,
      iconPath: "M10 22L32 10l22 12v32H10V22z M22 54V36h20v18",
    },
  ];

  return (
    <section className={styles.services} id="hizmetler">
      <div className="container">
        <div className={styles.head}>
          <span className={styles.eyebrow}>
            <span className={styles.hairline} />
            {s.eyebrow}
          </span>
        </div>

        <div className={styles.grid}>
          {SERVICES.map((service) => (
            <article key={service.number} className={styles.card}>
              <div className={styles.cardHead}>
                <svg
                  className={styles.icon}
                  width="44"
                  height="44"
                  viewBox="0 0 64 64"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d={service.iconPath}
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className={styles.number}>{service.number}</span>
              </div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDescription}>{service.description}</p>
            </article>
          ))}
        </div>

        <div className={styles.cta}>
          <Link href="/#rehberler" className={styles.ctaLink}>
            {s.cta}
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
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
    </section>
  );
}
