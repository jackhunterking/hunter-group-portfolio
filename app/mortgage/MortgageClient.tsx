"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RateDisclosureModal from "@/components/RateDisclosureModal";
import AdvisorStrip from "@/components/mortgage/AdvisorStrip";
import MortgageDisclosure from "@/components/mortgage/MortgageDisclosure";
import { useT } from "@/lib/i18n/LanguageProvider";
import { HERO_RATES, heroTile, RATE_AS_OF } from "@/lib/mortgage/rates";
import { waHref } from "@/lib/mortgage/wa";
import styles from "./mortgage.module.css";

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function Arrow() {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
      <path d="M10 1l5 5-5 5M15 6H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function MortgageClient() {
  const t = useT();
  const f = t.mortgage;
  const [showDisclosure, setShowDisclosure] = useState(false);

  const tiles = [
    { label: f.rates.fixedLabel, tile: heroTile(HERO_RATES.fixed) },
    { label: f.rates.variableLabel, tile: heroTile(HERO_RATES.variable) },
  ];

  const whatsapp = waHref(f.cta.whatsappText);

  return (
    <main>
      <Nav overlayHero />

      {/* ── Rate-first hero (photo-backed) ── */}
      <section className={styles.hero}>
        <div className={styles.heroMedia}>
          <Image
            src="/mortgage/home.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className={styles.heroPhoto}
          />
        </div>
        <div className={styles.heroOverlay} aria-hidden="true" />

        <div className="container">
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <span className={styles.eyebrow}>
                <span className={styles.hairline} />
                {f.hero.eyebrow}
              </span>
              <h1 className={styles.heading}>
                {f.hero.heading} <em>{f.hero.headingEm}</em>
              </h1>
              <p className={styles.sub}>{f.hero.sub}</p>
              <div className={styles.heroActions}>
                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.primaryBtn}
                >
                  <WhatsAppIcon />
                  {f.hero.ctaPrimary}
                </a>
                <a href="#secenekler" className={styles.secondaryBtn}>
                  {f.hero.ctaSecondary}
                </a>
              </div>

              <ul className={styles.trust}>
                {f.trust.map((item) => (
                  <li key={item} className={styles.trustItem}>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8.5l3.2 3.2L13 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.rateCard}>
              <span className={styles.rateCardLabel}>{f.rates.eyebrow}</span>
              <div className={styles.rateTiles}>
                {tiles.map(({ label, tile }) => (
                  <div key={label} className={styles.rateTile}>
                    <span className={styles.rateTerm}>{tile.term}</span>
                    <span className={styles.rateKind}>{label}</span>
                    <span className={styles.rateValue}>
                      {tile.rate ?? f.rates.updating}
                    </span>
                    {tile.detail ? (
                      <span className={styles.rateDetail}>{tile.detail}</span>
                    ) : null}
                  </div>
                ))}
              </div>
              <div className={styles.rateFoot}>
                <span className={styles.rateAsOf}>
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
              <div className={styles.rateLinks}>
                <Link href="/mortgage/oranlar" className={styles.rateLink}>
                  {f.oranlar.label} <Arrow />
                </Link>
                <Link href="/mortgage/araclar" className={styles.rateLink}>
                  {f.araclar.label} <Arrow />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Journey cards ── */}
      <section className={styles.journeys} id="secenekler">
        <div className="container">
          <div className={styles.sectionHead}>
            <span className={styles.sectionEyebrow}>{f.journeys.eyebrow}</span>
            <h2 className={styles.sectionTitle}>{f.journeys.title}</h2>
            <p className={styles.sectionSub}>{f.journeys.sub}</p>
          </div>
          <div className={styles.journeyGrid}>
            {f.journeys.items.map((item) => (
              <Link
                key={item.slug}
                href={`/mortgage/${item.slug}`}
                className={styles.journeyCard}
              >
                <h3 className={styles.journeyTitle}>{item.title}</h3>
                <p className={styles.journeyDesc}>{item.desc}</p>
                <span className={styles.journeyArrow}>
                  <Arrow />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Advisor strip (real team + Equifax) ── */}
      <AdvisorStrip />

      {/* ── Persona row ── */}
      <section className={styles.personas}>
        <div className="container">
          <div className={styles.sectionHead}>
            <span className={styles.sectionEyebrow}>{f.personas.eyebrow}</span>
            <h2 className={styles.sectionTitle}>{f.personas.title}</h2>
          </div>
          <div className={styles.personaGrid}>
            {f.personas.items.map((p) => (
              <Link
                key={p.title}
                href={`/mortgage/${p.journey}`}
                className={styles.personaCard}
              >
                <h3 className={styles.personaTitle}>{p.title}</h3>
                <span className={styles.personaText}>{p.text}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Primary WhatsApp CTA ── */}
      <section className={styles.cta}>
        <div className={styles.ctaMedia}>
          <Image src="/mortgage/interior.jpg" alt="" fill sizes="100vw" className={styles.ctaPhoto} />
        </div>
        <div className={styles.ctaOverlay} aria-hidden="true" />
        <div className="container">
          <div className={styles.ctaInner}>
            <h2 className={styles.ctaTitle}>{f.cta.title}</h2>
            <p className={styles.ctaSub}>{f.cta.sub}</p>
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.primaryBtn}
            >
              <WhatsAppIcon />
              {f.cta.button}
            </a>
          </div>
        </div>
      </section>

      <MortgageDisclosure />
      <Footer />

      {showDisclosure ? (
        <RateDisclosureModal onClose={() => setShowDisclosure(false)} />
      ) : null}
    </main>
  );
}
