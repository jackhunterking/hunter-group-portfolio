"use client";

import { useLang } from "@/lib/i18n/LanguageProvider";
import styles from "../info.module.css";

export default function LearnPage() {
  const { t } = useLang();
  const l = t.capitalApp.learn;
  return (
    <main className={styles.page}>
      <header className={styles.head}>
        <p className={styles.eyebrow}>{l.eyebrow}</p>
        <h1 className={styles.title}>{l.title}</h1>
        <p className={styles.intro}>{l.intro}</p>
      </header>

      <section className={styles.topicGrid}>
        {l.topics.map((topic) => (
          <article key={topic.term} className={styles.topicCard}>
            <span className={styles.defLabel}>{l.definitionLabel}</span>
            <h2>{topic.term}</h2>
            <p>{topic.text}</p>
          </article>
        ))}
      </section>

      <section className={styles.legalPanel}>
        <h2>{l.categoriesHeading}</h2>
        <div className={styles.categoryGrid}>
          {l.categories.map((c) => (
            <article key={c.title}>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </article>
          ))}
        </div>
        <p className={styles.disclaimer}>{l.disclaimer}</p>
      </section>
    </main>
  );
}
