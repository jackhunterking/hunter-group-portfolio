"use client";

import { useEffect } from "react";
import { useT } from "@/lib/i18n/LanguageProvider";
import { RATE_AS_OF } from "@/lib/finansman/rates";
import { RMA } from "@/lib/finansman/identity";
import styles from "./RateDisclosureModal.module.css";

interface Props {
  onClose: () => void;
}

/**
 * FSRA rate disclosure modal — always available wherever rates are shown.
 * Rates are examples only; approval depends on file/lender; mortgage activity
 * is conducted through RMA Mortgage (FSRA). See CLAUDE.md guardrail 3 / spec §7.
 */
export default function RateDisclosureModal({ onClose }: Props) {
  const t = useT();
  const d = t.finansman.disclosure;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className={styles.backdrop} onClick={onClose} role="presentation">
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-label={d.title}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label={d.closeAria}
        >
          ×
        </button>

        <h3 className={styles.title}>{d.title}</h3>
        <p className={styles.intro}>{d.intro}</p>

        <ul className={styles.bullets}>
          {d.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>

        <div className={styles.identity}>
          <span className={styles.brokerage}>{RMA.brokerage}</span>
          <span className={styles.licence}>
            {d.licenceLabel}: {RMA.licenceNo}
          </span>
          <span className={styles.asOf}>
            {t.finansman.rates.asOf}: {RATE_AS_OF}
          </span>
        </div>
      </div>
    </div>
  );
}
