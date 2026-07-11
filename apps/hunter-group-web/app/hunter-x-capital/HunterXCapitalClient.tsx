"use client";

import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useT } from "@/lib/i18n/LanguageProvider";
import styles from "./page.module.css";

const WA_URL =
  "https://wa.me/16473913311?text=Hunter%20X%20Capital%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum";

/* Reusable WhatsApp logo (official mark) */
function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.030-.966-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.825 9.825 0 016.988 2.9 9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/* Path 01, Joint Venture diagram (4 connected nodes) */
function PathDiagramJV() {
  return (
    <svg
      className={styles.pathDiagram}
      width="84"
      height="56"
      viewBox="0 0 84 56"
      fill="none"
      aria-hidden="true"
    >
      <line x1="14" y1="28" x2="42" y2="14" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
      <line x1="14" y1="28" x2="42" y2="42" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
      <line x1="42" y1="14" x2="70" y2="28" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
      <line x1="42" y1="42" x2="70" y2="28" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
      <line x1="42" y1="14" x2="42" y2="42" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
      <circle cx="14" cy="28" r="6" stroke="currentColor" strokeWidth="1.4" fill="#0d1119" />
      <circle cx="42" cy="14" r="6" stroke="currentColor" strokeWidth="1.4" fill="#0d1119" />
      <circle cx="42" cy="42" r="6" stroke="currentColor" strokeWidth="1.4" fill="#0d1119" />
      <circle cx="70" cy="28" r="6" stroke="currentColor" strokeWidth="1.4" fill="#0d1119" />
    </svg>
  );
}

/* Path 02, Solo diagram (single node with ring) */
function PathDiagramSolo() {
  return (
    <svg
      className={styles.pathDiagram}
      width="84"
      height="56"
      viewBox="0 0 84 56"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="42" cy="28" r="22" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 3" opacity="0.4" />
      <circle cx="42" cy="28" r="14" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 3" opacity="0.6" />
      <circle cx="42" cy="28" r="8" stroke="currentColor" strokeWidth="1.4" fill="#0d1119" />
    </svg>
  );
}

/* Snapshot icons */
function IconBuilding() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="6" y="4" width="20" height="24" stroke="currentColor" strokeWidth="1.4" />
      <line x1="11" y1="10" x2="14" y2="10" stroke="currentColor" strokeWidth="1.4" />
      <line x1="18" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="1.4" />
      <line x1="11" y1="16" x2="14" y2="16" stroke="currentColor" strokeWidth="1.4" />
      <line x1="18" y1="16" x2="21" y2="16" stroke="currentColor" strokeWidth="1.4" />
      <line x1="11" y1="22" x2="14" y2="22" stroke="currentColor" strokeWidth="1.4" />
      <line x1="18" y1="22" x2="21" y2="22" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
function IconPin() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M16 4c-5 0-9 4-9 9 0 6 9 15 9 15s9-9 9-15c0-5-4-9-9-9z" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="16" cy="13" r="3" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
function IconCycle() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="6" cy="24" r="2.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="26" cy="24" r="2.5" stroke="currentColor" strokeWidth="1.4" />
      <line x1="16" y1="9" x2="7" y2="21" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
      <line x1="16" y1="9" x2="25" y2="21" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
      <line x1="9" y1="24" x2="23" y2="24" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
    </svg>
  );
}

/* Process step icons */
function IconAcquire() {
  return (
    <svg width="34" height="34" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="13" cy="13" r="8" stroke="currentColor" strokeWidth="1.4" />
      <line x1="19" y1="19" x2="27" y2="27" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <rect x="9" y="9" width="8" height="8" stroke="currentColor" strokeWidth="0.9" opacity="0.6" />
    </svg>
  );
}
function IconDevelop() {
  return (
    <svg width="34" height="34" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M5 26L16 6l11 20H5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <line x1="11" y1="26" x2="11" y2="20" stroke="currentColor" strokeWidth="1.4" />
      <line x1="16" y1="26" x2="16" y2="16" stroke="currentColor" strokeWidth="1.4" />
      <line x1="21" y1="26" x2="21" y2="20" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
function IconOperate() {
  return (
    <svg width="34" height="34" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <line x1="4" y1="26" x2="28" y2="26" stroke="currentColor" strokeWidth="1.4" />
      <rect x="8" y="18" width="3" height="8" stroke="currentColor" strokeWidth="1.4" />
      <rect x="14.5" y="12" width="3" height="14" stroke="currentColor" strokeWidth="1.4" />
      <rect x="21" y="6" width="3" height="20" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
function IconExit() {
  return (
    <svg width="34" height="34" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M14 6H8a2 2 0 00-2 2v16a2 2 0 002 2h6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M20 11l5 5-5 5M25 16H13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Partner meeting table icon */
function IconTable() {
  return (
    <svg width="72" height="72" viewBox="0 0 80 80" fill="none" aria-hidden="true">
      <ellipse cx="40" cy="44" rx="22" ry="10" stroke="currentColor" strokeWidth="1.4" />
      <ellipse cx="40" cy="42" rx="22" ry="10" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
      <circle cx="40" cy="18" r="5" stroke="currentColor" strokeWidth="1.4" fill="#050810" />
      <circle cx="16" cy="42" r="5" stroke="currentColor" strokeWidth="1.4" fill="#050810" />
      <circle cx="64" cy="42" r="5" stroke="currentColor" strokeWidth="1.4" fill="#050810" />
      <circle cx="26" cy="64" r="5" stroke="currentColor" strokeWidth="1.4" fill="#050810" />
      <circle cx="54" cy="64" r="5" stroke="currentColor" strokeWidth="1.4" fill="#050810" />
    </svg>
  );
}

export default function HunterXCapitalClient() {
  const t = useT();
  const c = t.capital;

  return (
    <main className={styles.main}>
      <Nav overlayHero />

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroMedia}>
          <Image
            src="/hunter-x-bg.png"
            alt=""
            fill
            priority
            className={styles.heroPhoto}
            sizes="100vw"
          />
        </div>
        <div className={styles.heroOverlay} aria-hidden="true" />
        <div className="container">
          <div className={styles.heroInner}>
            <p className={styles.heroEyebrow}>
              <span className={styles.hairline} />
              {c.hero.eyebrow}
            </p>
            <h1 className={styles.heroTitle}>
              {c.hero.titlePre}<em>{c.hero.titleEm}</em>{c.hero.titlePost}
            </h1>
            <p className={styles.heroSub}>
              {c.hero.sub} <em>{c.hero.subEm}</em>
            </p>
            <p className={styles.heroSubSmall}>{c.hero.subSmall}</p>

            <div className={styles.heroCtas}>
              <a href="#yatirim-yollari" className={styles.heroCtaPrimary}>
                <span className={styles.heroCtaNum}>01</span>
                {c.hero.ctaJV}
                <svg width="14" height="10" viewBox="0 0 16 12" fill="none" aria-hidden="true">
                  <path d="M10 1l5 5-5 5M15 6H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#yatirim-yollari" className={styles.heroCtaSecondary}>
                <span className={styles.heroCtaNum}>02</span>
                {c.hero.ctaSolo}
                <svg width="14" height="10" viewBox="0 0 16 12" fill="none" aria-hidden="true">
                  <path d="M10 1l5 5-5 5M15 6H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* STRATEGY SNAPSHOT */}
      <section className={styles.snapshot}>
        <div className="container">
          <div className={styles.snapGrid}>
            <div className={styles.snapItem}>
              <div className={styles.snapIcon}><IconBuilding /></div>
              <span className={styles.snapLabel}>{c.snapshot.label1}</span>
              <p className={styles.snapText}>{c.snapshot.text1}</p>
            </div>
            <div className={styles.snapItem}>
              <div className={styles.snapIcon}><IconPin /></div>
              <span className={styles.snapLabel}>{c.snapshot.label2}</span>
              <p className={styles.snapText}>{c.snapshot.text2}</p>
            </div>
            <div className={styles.snapItem}>
              <div className={styles.snapIcon}><IconCycle /></div>
              <span className={styles.snapLabel}>{c.snapshot.label3}</span>
              <p className={styles.snapText}>{c.snapshot.text3}</p>
            </div>
          </div>
        </div>
      </section>

      {/* TWO PATHS */}
      <section className={styles.paths} id="yatirim-yollari">
        <div className="container">
          <div className={styles.pathsHead}>
            <span className={styles.eyebrow}>
              <span className={styles.hairline} />
              {c.paths.eyebrow}
            </span>
            <h2 className={styles.sectionTitle}>
              {c.paths.title} <em>{c.paths.titleEm}</em>
            </h2>
          </div>

          <div className={styles.pathGrid}>
            {/* PATH 01, JOINT VENTURE */}
            <article className={styles.pathCard}>
              <div className={styles.pathDiagramWrap}>
                <PathDiagramJV />
              </div>

              <div className={styles.pathTop}>
                <span className={styles.pathNum}>01</span>
                <span className={styles.pathTag}>{c.paths.path1Tag}</span>
              </div>

              <h3 className={styles.pathTitle}>{c.paths.path1Title}</h3>
              <p className={styles.pathLead}>{c.paths.path1Lead}</p>

              <div className={styles.minBlock}>
                <span className={styles.minLabel}>{c.paths.path1MinLabel}</span>
                <span className={styles.minValue}>
                  {c.paths.path1MinValue}<em>{c.paths.path1MinUnit}</em>
                </span>
                <span className={styles.minNote}>{c.paths.path1MinNote}</span>
              </div>

              <div className={styles.divider} />

              <div className={styles.roles}>
                <span className={styles.rolesLabel}>{c.paths.path1RolesLabel}</span>

                <div className={styles.role}>
                  <span className={styles.roleName}>{c.paths.path1Role1Name}</span>
                  <p className={styles.roleDesc}>{c.paths.path1Role1Desc}</p>
                </div>

                <div className={styles.role}>
                  <span className={styles.roleName}>{c.paths.path1Role2Name}</span>
                  <p className={styles.roleDesc}>{c.paths.path1Role2Desc}</p>
                </div>
              </div>
            </article>

            {/* PATH 02, SOLO */}
            <article className={styles.pathCard}>
              <div className={styles.pathDiagramWrap}>
                <PathDiagramSolo />
              </div>

              <div className={styles.pathTop}>
                <span className={styles.pathNum}>02</span>
                <span className={styles.pathTag}>{c.paths.path2Tag}</span>
              </div>

              <h3 className={styles.pathTitle}>{c.paths.path2Title}</h3>
              <p className={styles.pathLead}>{c.paths.path2Lead}</p>

              <div className={styles.minBlock}>
                <span className={styles.minLabel}>{c.paths.path2MinLabel}</span>
                <span className={styles.minValue}>
                  {c.paths.path2MinValue}<em>{c.paths.path2MinUnit}</em>
                </span>
                <span className={styles.minNote}>{c.paths.path2MinNote}</span>
              </div>

              <div className={styles.divider} />

              <ul className={styles.soloList}>
                <li>{c.paths.path2List1}</li>
                <li>{c.paths.path2List2}</li>
                <li>{c.paths.path2List3}</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* PARTNER MEETING */}
      <section className={styles.partnerMeet}>
        <div className="container">
          <div className={styles.pmInner}>
            <div className={styles.pmIcon}><IconTable /></div>
            <span className={styles.pmEyebrow}>
              <span className={styles.hairline} />
              {c.partnerMeet.eyebrow}
            </span>
            <p className={styles.pmQuote}>
              {c.partnerMeet.quotePre} <em>{c.partnerMeet.quoteEm1}</em>{" "}
              {c.partnerMeet.quoteMid} <em>{c.partnerMeet.quoteEm2}</em>{" "}
              {c.partnerMeet.quoteEnd}
            </p>
            <p className={styles.pmTagline}>{c.partnerMeet.tagline}</p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className={styles.how}>
        <div className="container">
          <div className={styles.howHead}>
            <span className={styles.eyebrow}>
              <span className={styles.hairline} />
              {c.how.eyebrow}
            </span>
            <h2 className={styles.sectionTitle}>
              {c.how.title} <em>{c.how.titleEm}</em>
            </h2>
          </div>

          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.stepIcon}><IconAcquire /></div>
              <span className={styles.stepNum}>01</span>
              <h4 className={styles.stepTitle}>{c.how.step1Title}</h4>
              <p className={styles.stepText}>{c.how.step1Text}</p>
            </div>

            <div className={styles.step}>
              <div className={styles.stepIcon}><IconDevelop /></div>
              <span className={styles.stepNum}>02</span>
              <h4 className={styles.stepTitle}>{c.how.step2Title}</h4>
              <p className={styles.stepText}>{c.how.step2Text}</p>
            </div>

            <div className={styles.step}>
              <div className={styles.stepIcon}><IconOperate /></div>
              <span className={styles.stepNum}>03</span>
              <h4 className={styles.stepTitle}>{c.how.step3Title}</h4>
              <p className={styles.stepText}>{c.how.step3Text}</p>
            </div>

            <div className={styles.step}>
              <div className={styles.stepIcon}><IconExit /></div>
              <span className={styles.stepNum}>04</span>
              <h4 className={styles.stepTitle}>{c.how.step4Title}</h4>
              <p className={styles.stepText}>{c.how.step4Text}</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY + CTA */}
      <section className={styles.why}>
        <div className="container">
          <div className={styles.whyInner}>
            <span className={styles.eyebrow}>
              <span className={styles.hairline} />
              {c.why.eyebrow}
            </span>
            <h2 className={styles.whyTitle}>
              {c.why.title} <em>{c.why.titleEm}</em>
            </h2>
            <p className={styles.whyText}>{c.why.text}</p>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whyCta}
            >
              <WhatsAppIcon size={20} />
              {c.why.cta}
            </a>
          </div>
        </div>
      </section>

      {/* COMPLIANCE FOOTER */}
      <section className={styles.compliance}>
        <div className="container">
          <p className={styles.compText}>{c.compliance}</p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
