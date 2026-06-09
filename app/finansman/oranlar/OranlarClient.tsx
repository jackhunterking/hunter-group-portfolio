"use client";

import { useState } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RateDisclosureModal from "@/components/RateDisclosureModal";
import AdvisorStrip from "@/components/finansman/AdvisorStrip";
import FinansmanDisclosure from "@/components/finansman/FinansmanDisclosure";
import { useT } from "@/lib/i18n/LanguageProvider";
import { HERO_RATES, RATE_AS_OF } from "@/lib/finansman/rates";
import { waHref } from "@/lib/finansman/wa";
import styles from "./oranlar.module.css";

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function CalcIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="2.5" width="16" height="19" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 7h8M8 12h2m3 0h3M8 16h2m3 0h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export default function OranlarClient() {
  const t = useT();
  const f = t.finansman;
  const o = f.oranlar;
  const [tab, setTab] = useState<"fixed" | "variable">("fixed");
  const [showDisclosure, setShowDisclosure] = useState(false);

  const group = tab === "fixed" ? HERO_RATES.fixed : HERO_RATES.variable;
  const whatsapp = waHref(o.whatsappText);

  return (
    <main>
      <Nav overlayHero />

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <Link href="/finansman" className={styles.back}>
              {f.backToFinansman}
            </Link>
            <span className={styles.eyebrow}>{o.label}</span>
            <h1 className={styles.title}>{o.title}</h1>
            <p className={styles.sub}>{o.sub}</p>
          </div>
        </div>
      </section>

      {/* ── Rate table ── */}
      <section className={styles.rates}>
        <div className="container">
          <div className={styles.card}>
            <div className={styles.cardHead}>
              <h2 className={styles.cardTitle}>{o.cardTitle}</h2>
              <div className={styles.tabs} role="tablist" aria-label={o.label}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={tab === "fixed"}
                  className={`${styles.tab} ${tab === "fixed" ? styles.tabActive : ""}`}
                  onClick={() => setTab("fixed")}
                >
                  {f.rates.fixedLabel}
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={tab === "variable"}
                  className={`${styles.tab} ${tab === "variable" ? styles.tabActive : ""}`}
                  onClick={() => setTab("variable")}
                >
                  {f.rates.variableLabel}
                </button>
              </div>
            </div>

            <div className={styles.tableHead}>
              <span>{o.termHeading}</span>
              <span>{o.rateHeading}</span>
            </div>
            <ul className={styles.rows}>
              {group.tiles.map((tile) => (
                <li key={tile.key} className={styles.row}>
                  <span className={styles.rowTerm}>{tile.term}</span>
                  <span className={styles.rowRight}>
                    {tile.detail ? (
                      <span className={styles.rowDetail}>{tile.detail}</span>
                    ) : null}
                    <span className={styles.rowRate}>
                      {tile.rate ?? f.rates.updating}
                    </span>
                  </span>
                </li>
              ))}
            </ul>

            <div className={styles.cardFoot}>
              <span className={styles.asOf}>
                {f.rates.asOf}: {RATE_AS_OF}
              </span>
              <button
                type="button"
                className={styles.disclosureBtn}
                onClick={() => setShowDisclosure(true)}
              >
                {f.rates.disclosureLabel}
              </button>
            </div>
            <p className={styles.note}>{o.note}</p>
          </div>
        </div>
      </section>

      {/* ── Advisor strip ── */}
      <AdvisorStrip />

      {/* ── CTA band ── */}
      <section className={styles.cta}>
        <div className="container">
          <div className={styles.ctaInner}>
            <div className={styles.ctaCopy}>
              <h2 className={styles.ctaTitle}>{o.cta.title}</h2>
              <p className={styles.ctaSub}>{o.cta.sub}</p>
            </div>
            <div className={styles.ctaActions}>
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.primaryBtn}
              >
                <WhatsAppIcon />
                {o.cta.whatsappBtn}
              </a>
              <Link href="/finansman/araclar" className={styles.ghostBtn}>
                <CalcIcon />
                {o.cta.calcBtn}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FinansmanDisclosure />
      <Footer />

      {showDisclosure ? (
        <RateDisclosureModal onClose={() => setShowDisclosure(false)} />
      ) : null}
    </main>
  );
}
