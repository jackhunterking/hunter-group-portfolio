"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n/LanguageProvider";
import styles from "../info.module.css";

export default function ProcessPage() {
  const { t } = useLang();
  const p = t.capitalApp.process;
  const phaseFor = (i: number) => (i < 3 ? p.phaseResearch : i < 5 ? p.phaseReadiness : p.phaseLicensed);

  return (
    <main className={styles.page}>
      <header className={styles.head}>
        <p className={styles.eyebrow}>{p.eyebrow}</p>
        <h1 className={styles.title}>{p.title}</h1>
        <p className={styles.intro}>{p.intro}</p>
      </header>

      <ol className={styles.timeline}>
        {p.steps.map((step, i) => (
          <li key={step.title}>
            <b>{String(i + 1).padStart(2, "0")}</b>
            <div>
              <h2>{step.title}</h2>
              <p>{step.text}</p>
            </div>
            <span className={styles.phase}>{phaseFor(i)}</span>
          </li>
        ))}
      </ol>

      <div className={styles.cta}>
        <div>
          <h2>{p.ctaTitle}</h2>
          <p>{p.ctaText}</p>
        </div>
        <Link href="/hunter-group-capital/offerings">{p.ctaButton}</Link>
      </div>
    </main>
  );
}
