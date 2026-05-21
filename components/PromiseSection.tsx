"use client";

import { useT } from "@/lib/i18n/LanguageProvider";
import styles from "./PromiseSection.module.css";

export default function PromiseSection() {
  const t = useT();
  const p = t.promise;

  return (
    <section className={styles.promise}>
      <div className="container">
        <div className={styles.inner}>
          <span className={styles.eyebrow}>
            <span className={styles.hairline} />
            {p.eyebrow}
          </span>
          <p className={styles.quote}>
            &ldquo;{p.quotePre} <em>{p.quoteEm}</em> {p.quoteEnd}&rdquo;
          </p>
          <p className={styles.attribution}>{p.attribution}</p>
        </div>
      </div>
    </section>
  );
}
