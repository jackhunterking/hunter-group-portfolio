"use client";

import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/lib/i18n/LanguageProvider";
import styles from "./capital-topbar.module.css";

const BASE = "/hunter-group-capital";
const WHATSAPP = "https://wa.me/16473913311";

export function CapitalTopbar({ children }: { children: React.ReactNode }) {
  const { lang, setLang, t } = useLang();
  const c = t.capitalApp;

  return (
    <div className={styles.shell}>
      <header className={styles.topbar}>
        <Link href={BASE} className={styles.brand} aria-label={c.brand.name}>
          <Image src="/logos/HUNTER_Brandmark_Blue.png" alt="" width={28} height={28} />
          <span>
            <strong>Hunter Group</strong>
            <small>Capital</small>
          </span>
        </Link>

        <div className={styles.actions}>
          <div className={styles.langToggle} role="group" aria-label={c.lang.toggleAria}>
            <button type="button" onClick={() => setLang("tr")} className={lang === "tr" ? styles.langActive : ""} aria-pressed={lang === "tr"}>
              {c.lang.tr}
            </button>
            <span aria-hidden>·</span>
            <button type="button" onClick={() => setLang("en")} className={lang === "en" ? styles.langActive : ""} aria-pressed={lang === "en"}>
              {c.lang.en}
            </button>
          </div>
          <a className={styles.cta} href={WHATSAPP} target="_blank" rel="noreferrer">
            {c.nav.talkToUs}
          </a>
        </div>
      </header>

      <main className={styles.content}>{children}</main>

      <footer className={styles.footer}>
        <span>{c.brand.name}</span>
        <p>
          {c.detail.ownershipNote} {c.common.notGuaranteed}.
        </p>
      </footer>
    </div>
  );
}
