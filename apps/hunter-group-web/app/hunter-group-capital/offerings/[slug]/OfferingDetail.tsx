"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { assetClasses, regions, strategies, taxonomyLabel } from "@/lib/capital/taxonomies";
import {
  formatSourceLine,
  formatUnits,
  localizeStatus,
  localizeVerification,
  offeringMetrics,
  primaryShareClass,
  resolveImage,
  type MetricTile,
} from "@/lib/capital/present";
import type { OfferingBundle } from "@/lib/capital/types";
import { FundMapEmbed } from "@/components/capital/map/FundMapEmbed";
import styles from "./detail.module.css";

const WHATSAPP = "https://wa.me/16473913311";
const TABS = ["overview", "portfolio", "map", "terms", "documents"] as const;
type TabKey = (typeof TABS)[number];

export function OfferingDetail({ offering }: { offering: OfferingBundle }) {
  const { lang, t } = useLang();
  const d = t.capitalApp.detail;
  const router = useRouter();
  const params = useSearchParams();
  const tab = (TABS.includes(params.get("tab") as TabKey) ? params.get("tab") : "overview") as TabKey;

  function setTab(next: TabKey) {
    const p = new URLSearchParams(params.toString());
    if (next === "overview") p.delete("tab");
    else p.set("tab", next);
    const qs = p.toString();
    router.replace(qs ? `?${qs}` : "?", { scroll: false });
  }

  const share = primaryShareClass(offering);
  const banner = resolveImage(offering.media?.banner, `${offering.slug}-banner`, offering.shortName[lang], lang);
  const logo = resolveImage(offering.media?.logo, `${offering.slug}-logo`, offering.shortName[lang], lang);
  const profileHref = `/hunter-group-capital/investor-profile?offering=${offering.slug}${share ? `&shareClass=${share.id}` : ""}`;

  return (
    <div className={styles.detail}>
      <Link href="/hunter-group-capital" className={styles.back}>
        ← {t.capitalApp.nav.backToDashboard}
      </Link>

      {/* Banner (L1) */}
      <section className={styles.banner}>
        <div
          className={styles.bannerMedia}
          style={banner.src ? undefined : { backgroundImage: banner.gradient }}
        >
          {banner.src && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={banner.src} alt={banner.alt} />
          )}
        </div>
        <div className={styles.bannerBody}>
          <div className={styles.bannerLogo} style={logo.src ? undefined : { backgroundImage: logo.gradient }}>
            {logo.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logo.src} alt={logo.alt} />
            ) : (
              <span aria-hidden>{logo.initials}</span>
            )}
          </div>
          <div className={styles.bannerMain}>
            <p className={styles.eyebrow}>
              {taxonomyLabel(strategies, offering.strategyIds[0], lang)} · {offering.manager.name[lang]}
            </p>
            <h1 className={styles.bannerName}>{offering.shortName[lang]}</h1>
            <p className={styles.bannerSummary}>{offering.summary[lang]}</p>
            <p className={styles.ownershipNote}>{d.ownershipNote}</p>
          </div>
          <div className={styles.bannerActions}>
            <span className={styles.verifiedBadge}>
              {d.verifiedOn} {offering.verifiedAt}
            </span>
            <Link href={profileHref} className={styles.ctaPrimary}>
              {d.startProfile}
            </Link>
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className={styles.ctaGhost}>
              {d.contactUs}
            </a>
          </div>
        </div>
      </section>

      {/* Tab bar */}
      <div className={styles.tabbar} role="tablist">
        {TABS.map((key) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={tab === key}
            className={`${styles.tab} ${tab === key ? styles.tabActive : ""}`}
            onClick={() => setTab(key)}
          >
            {d.tabs[key]}
          </button>
        ))}
      </div>

      <div className={styles.tabPanel}>
        {tab === "overview" && <OverviewTab offering={offering} />}
        {tab === "portfolio" && <PortfolioTab offering={offering} />}
        {tab === "map" && <FundMapEmbed offering={offering} />}
        {tab === "terms" && <TermsTab offering={offering} />}
        {tab === "documents" && <DocumentsTab offering={offering} />}
      </div>
    </div>
  );
}

function MetricTiles({ tiles }: { tiles: MetricTile[] }) {
  return (
    <dl className={styles.tiles}>
      {tiles.map((tile) => (
        <div key={tile.key} className={styles.tile}>
          <dt>{tile.label}</dt>
          <dd>{tile.value}</dd>
          {tile.source && <small>{tile.source}</small>}
        </div>
      ))}
    </dl>
  );
}

function OverviewTab({ offering }: { offering: OfferingBundle }) {
  const { lang, t } = useLang();
  const d = t.capitalApp.detail;
  const tiles = offeringMetrics(offering, lang, "plain");

  return (
    <div className={styles.overview}>
      <MetricTiles tiles={tiles} />
      <p className={styles.notGuaranteed}>{t.capitalApp.common.notGuaranteed}</p>

      <section className={styles.block}>
        <h2 className={styles.blockHeading}>{d.thesisHeading}</h2>
        <p className={styles.prose}>{offering.thesis[lang]}</p>
      </section>

      <section className={styles.managerCard}>
        <p className={styles.eyebrow}>{d.aboutManager}</p>
        <h3>{offering.manager.name[lang]}</h3>
        <p className={styles.prose}>{offering.manager.description[lang]}</p>
        <dl className={styles.managerMeta}>
          <div>
            <dt>{d.headquarters}</dt>
            <dd>
              {offering.manager.headquarters.city}, {offering.manager.headquarters.province}
            </dd>
          </div>
          <div>
            <dt>{d.regions}</dt>
            <dd>{offering.regionIds.map((id) => taxonomyLabel(regions, id, lang)).join(" · ")}</dd>
          </div>
          <div>
            <dt>{d.assetClass}</dt>
            <dd>{offering.assetClassIds.map((id) => taxonomyLabel(assetClasses, id, lang)).join(" · ")}</dd>
          </div>
        </dl>
      </section>

      <section className={styles.block}>
        <h2 className={styles.blockHeading}>{d.risksHeading}</h2>
        <ul className={styles.riskList}>
          {offering.risks.map((risk) => (
            <li key={risk.en}>{risk[lang]}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function PortfolioTab({ offering }: { offering: OfferingBundle }) {
  const { lang, t } = useLang();
  const p = t.capitalApp.portfolio;

  return (
    <div className={styles.portfolio}>
      <div className={styles.sectionHead}>
        <div>
          <h2 className={styles.blockHeading}>{p.heading}</h2>
          <p className={styles.prose}>{p.intro}</p>
        </div>
        <Link href={`/hunter-group-capital/map?offering=${offering.slug}`} className={styles.textLink}>
          {p.openMap} →
        </Link>
      </div>
      <div className={styles.propertyGrid}>
        {offering.properties.map((property) => {
          const image = resolveImage(property.media?.card, property.id, property.name[lang], lang);
          const size = formatUnits(property, lang);
          return (
            <article key={property.id} className={styles.propertyCard}>
              <div
                className={styles.propertyMedia}
                style={image.src ? undefined : { backgroundImage: image.gradient }}
              >
                {image.src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={image.src} alt={image.alt} />
                ) : (
                  <span className={styles.propertyInitials} aria-hidden>
                    {image.initials}
                  </span>
                )}
                <span className={styles.propertyChip}>{taxonomyLabel(assetClasses, property.assetClassId, lang)}</span>
              </div>
              <div className={styles.propertyBody}>
                <small>
                  {property.city}, {property.province}
                </small>
                <h3>{property.name[lang]}</h3>
                <div className={styles.propertyMeta}>
                  {size && <span>{size}</span>}
                  <span>{localizeStatus(property.status, lang)}</span>
                  <span className={styles.verifyPill} data-status={property.verificationStatus}>
                    {localizeVerification(property.verificationStatus, lang)}
                  </span>
                </div>
                <Link
                  href={`/hunter-group-capital/map?offering=${offering.slug}&property=${property.id}`}
                  className={styles.textLink}
                >
                  {p.openMap} →
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function TermsTab({ offering }: { offering: OfferingBundle }) {
  const { lang, t } = useLang();
  const tm = t.capitalApp.terms;
  const share = primaryShareClass(offering);
  const tiles = offeringMetrics(offering, lang, "full");

  return (
    <div className={styles.terms}>
      <div className={styles.sectionHead}>
        <div>
          <h2 className={styles.blockHeading}>{tm.heading}</h2>
          <p className={styles.prose}>{tm.intro}</p>
        </div>
        {share && <span className={styles.shareClassPill}>{share.name}</span>}
      </div>

      <table className={styles.termsTable}>
        <tbody>
          {tiles.map((tile) => (
            <tr key={tile.key}>
              <th scope="row">{tile.label}</th>
              <td>{tile.value}</td>
              <td className={styles.provenance}>{tile.source ?? ""}</td>
            </tr>
          ))}
          <tr>
            <th scope="row">{tm.riskProfile}</th>
            <td>{tm.riskProfileValue}</td>
            <td className={styles.provenance} />
          </tr>
        </tbody>
      </table>
      <p className={styles.notGuaranteed}>{t.capitalApp.common.notGuaranteed}</p>
    </div>
  );
}

function DocumentsTab({ offering }: { offering: OfferingBundle }) {
  const { lang, t } = useLang();
  const dc = t.capitalApp.documents;

  if (!offering.documents.length) {
    return (
      <div className={styles.documents}>
        <p className={styles.empty}>{dc.empty}</p>
      </div>
    );
  }

  return (
    <div className={styles.documents}>
      <div className={styles.sectionHead}>
        <div>
          <h2 className={styles.blockHeading}>{dc.heading}</h2>
          <p className={styles.prose}>{dc.intro}</p>
        </div>
      </div>
      <div className={styles.tableScroll}>
        <table className={styles.docTable}>
          <thead>
            <tr>
              <th>{dc.colName}</th>
              <th>{dc.colType}</th>
              <th>{dc.colDate}</th>
              <th>{dc.colVersion}</th>
              <th>{dc.colAccess}</th>
            </tr>
          </thead>
          <tbody>
            {offering.documents.map((doc) => {
              const isPublic = doc.visibility === "public";
              return (
                <tr key={doc.id}>
                  <td className={styles.docName}>{doc.title[lang]}</td>
                  <td>{dc.types[doc.type]}</td>
                  <td>{doc.effectiveDate}</td>
                  <td>{doc.version}</td>
                  <td>
                    {isPublic && doc.href ? (
                      <a href={doc.href} className={styles.textLink} target="_blank" rel="noreferrer">
                        {dc.download}
                      </a>
                    ) : (
                      <span className={styles.accessPill} data-public={isPublic}>
                        {isPublic ? dc.public : dc.approvedInvestor}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
