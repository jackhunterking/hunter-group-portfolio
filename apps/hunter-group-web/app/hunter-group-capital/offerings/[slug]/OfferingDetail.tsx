"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { assetClasses, regions, strategies, taxonomyLabel } from "@/lib/capital/taxonomies";
import {
  buildFundDetailViewModel,
  formatUnits,
  localizeStatus,
  localizeVerification,
  primaryShareClass,
} from "@/lib/capital/present";
import type { OfferingBundle } from "@/lib/capital/types";
import { FundMapEmbed } from "@/components/capital/map/FundMapEmbed";
import styles from "./detail.module.css";

const WHATSAPP = "https://wa.me/16473913311";
const TABS = ["offer-details", "portfolio", "documents", "contact"] as const;
type TabKey = (typeof TABS)[number];
const TAB_LABEL: Record<TabKey, "offerDetails" | "portfolio" | "documents" | "contact"> = {
  "offer-details": "offerDetails",
  portfolio: "portfolio",
  documents: "documents",
  contact: "contact",
};

export function OfferingDetail({ offering }: { offering: OfferingBundle }) {
  const { lang, t } = useLang();
  const d = t.capitalApp.detail;
  const router = useRouter();
  const params = useSearchParams();
  const tab = (TABS.includes(params.get("tab") as TabKey) ? params.get("tab") : "offer-details") as TabKey;

  function setTab(next: TabKey) {
    const p = new URLSearchParams(params.toString());
    if (next === "offer-details") p.delete("tab");
    else p.set("tab", next);
    const qs = p.toString();
    router.replace(qs ? `?${qs}` : "?", { scroll: false });
  }

  const vm = buildFundDetailViewModel(offering, lang);
  const share = primaryShareClass(offering);
  const profileHref = `/hunter-group-capital/investor-profile?offering=${offering.slug}${share ? `&shareClass=${share.id}` : ""}`;

  return (
    <div className={styles.detail}>
      <Link href="/hunter-group-capital" className={styles.back}>
        ← {d.back}
      </Link>

      {/* Banner */}
      <section className={styles.banner}>
        <div className={styles.bannerMedia} style={vm.bannerImage.src ? undefined : { backgroundImage: vm.bannerImage.gradient }}>
          {vm.bannerImage.src && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={vm.bannerImage.src} alt={vm.bannerImage.alt} />
          )}
        </div>
        <div className={styles.bannerBody}>
          <div className={styles.bannerLogo} style={vm.logo.src ? undefined : { backgroundImage: vm.logo.gradient }}>
            {vm.logo.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={vm.logo.src} alt={vm.logo.alt} />
            ) : (
              <span aria-hidden>{vm.logo.initials}</span>
            )}
          </div>
          <div className={styles.bannerMain}>
            <p className={styles.eyebrow}>
              {taxonomyLabel(strategies, offering.strategyIds[0], lang)} · {offering.manager.name[lang]}
            </p>
            <h1 className={styles.bannerName}>{offering.name[lang]}</h1>
            <p className={styles.bannerSummary}>{offering.summary[lang]}</p>
            {vm.headline && (
              <p className={styles.bannerHeadline}>
                <strong>{vm.headline}</strong>
                <span>{offering.offeringSize ? t.capitalApp.card.offeringSize : t.capitalApp.card.aumLabel}</span>
              </p>
            )}
          </div>
          <aside className={styles.bannerCta}>
            {vm.fundingPercent !== null && <FundingRing percent={vm.fundingPercent} label={d.funded} />}
            <Link href={profileHref} className={styles.invest}>
              {d.invest}
            </Link>
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className={styles.contactBtn}>
              {d.contactUs}
            </a>
          </aside>
        </div>
      </section>

      {/* Tabs */}
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
            {d.tabs[TAB_LABEL[key]]}
          </button>
        ))}
      </div>

      <div className={styles.tabPanel}>
        {tab === "offer-details" && <OfferDetailsTab offering={offering} />}
        {tab === "portfolio" && <PortfolioTab offering={offering} />}
        {tab === "documents" && <DocumentsTab offering={offering} />}
        {tab === "contact" && <ContactTab profileHref={profileHref} />}
      </div>
    </div>
  );
}

function FundingRing({ percent, label }: { percent: number; label: string }) {
  const r = 26;
  const circ = 2 * Math.PI * r;
  const dash = (percent / 100) * circ;
  return (
    <div className={styles.ring}>
      <svg viewBox="0 0 64 64" width="64" height="64" aria-hidden>
        <circle cx="32" cy="32" r={r} fill="none" stroke="var(--hgc-hairline)" strokeWidth="6" />
        <circle
          cx="32"
          cy="32"
          r={r}
          fill="none"
          stroke="var(--hgc-green)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ}`}
          transform="rotate(-90 32 32)"
        />
      </svg>
      <div className={styles.ringText}>
        <strong>{percent}%</strong>
        <span>{label}</span>
      </div>
    </div>
  );
}

function OfferDetailsTab({ offering }: { offering: OfferingBundle }) {
  const { lang, t } = useLang();
  const d = t.capitalApp.detail;
  const vm = buildFundDetailViewModel(offering, lang);
  const fields = d.fields as Record<string, string>;

  return (
    <div className={styles.offer}>
      <section className={styles.block}>
        <p className={styles.sectionLabel}>{d.investmentSummary}</p>
        <p className={styles.prose}>{offering.thesis[lang]}</p>
      </section>

      {vm.summaryTiles.length > 0 && (
        <dl className={styles.summaryTiles}>
          {vm.summaryTiles.map((tile) => (
            <div key={tile.key}>
              <dd>{tile.value}</dd>
              <dt>{tile.label}</dt>
            </div>
          ))}
        </dl>
      )}

      <section className={styles.card}>
        <h2 className={styles.cardHeading}>{d.fundDetailsHeading}</h2>
        <dl className={styles.detailGrid}>
          {vm.fundDetails.map((r) => (
            <div key={r.key}>
              <dt>{fields[r.key] ?? r.key}</dt>
              <dd>{r.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {vm.highlights.length > 0 && (
        <section className={styles.block}>
          <h2 className={styles.blockHeading}>{d.whyInvest}</h2>
          <ul className={styles.highlightList}>
            {vm.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </section>
      )}

      {vm.trailingReturns.length > 0 && (
        <section className={styles.block}>
          <h2 className={styles.blockHeading}>{d.trailingReturns}</h2>
          <table className={styles.returnsTable}>
            <thead>
              <tr>
                <th>{d.periodCol}</th>
                <th>{d.returnCol}</th>
              </tr>
            </thead>
            <tbody>
              {vm.trailingReturns.map((row) => (
                <tr key={row.period}>
                  <td>{row.period}</td>
                  <td>
                    <strong>{row.value}</strong>
                    {row.note && <span className={styles.returnNote}> · {row.note}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className={styles.notGuaranteed}>{t.capitalApp.common.notGuaranteed}</p>
        </section>
      )}

      {vm.providers.length > 0 && (
        <section className={styles.card}>
          <h2 className={styles.cardHeading}>{d.providersHeading}</h2>
          <dl className={styles.detailGrid}>
            {vm.providers.map((r) => (
              <div key={r.key}>
                <dt>{fields[r.key] ?? r.key}</dt>
                <dd>{r.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {vm.lastUpdated && (
        <p className={styles.lastUpdated}>
          {d.lastUpdated}: {vm.lastUpdated}
        </p>
      )}

      <section className={styles.block}>
        <h2 className={styles.blockHeading}>{d.aboutManager}</h2>
        <p className={styles.prose}>{offering.manager.description[lang]}</p>
        <dl className={styles.managerMeta}>
          <div>
            <dt>{d.headquarters}</dt>
            <dd>{offering.manager.headquarters.city}, {offering.manager.headquarters.province}</dd>
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
      <FundMapEmbed offering={offering} />
      <div className={styles.propertyList}>
        {offering.properties.map((property) => {
          const size = formatUnits(property, lang);
          return (
            <article key={property.id} className={styles.propertyRow}>
              <div>
                <h3>{property.name[lang]}</h3>
                <small>{property.city}, {property.province}</small>
              </div>
              <div className={styles.propertyMeta}>
                <span>{taxonomyLabel(assetClasses, property.assetClassId, lang)}</span>
                {size && <span>{size}</span>}
                <span>{localizeStatus(property.status, lang)}</span>
                <span className={styles.verifyPill} data-status={property.verificationStatus}>
                  {localizeVerification(property.verificationStatus, lang)}
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function DocumentsTab({ offering }: { offering: OfferingBundle }) {
  const { lang, t } = useLang();
  const dc = t.capitalApp.documents;
  if (!offering.documents.length) {
    return <p className={styles.empty}>{dc.empty}</p>;
  }
  return (
    <div className={styles.tableScroll}>
      <table className={styles.docTable}>
        <thead>
          <tr>
            <th>{dc.colName}</th>
            <th>{dc.colType}</th>
            <th>{dc.colDate}</th>
            <th>{dc.colAccess}</th>
          </tr>
        </thead>
        <tbody>
          {offering.documents.map((doc) => {
            const isPublic = doc.visibility === "public";
            return (
              <tr key={doc.id}>
                <td>
                  <span className={styles.docName}>{doc.title[lang]}</span>
                  {doc.description && <small className={styles.docDesc}>{doc.description[lang]}</small>}
                </td>
                <td>{dc.types[doc.type]}</td>
                <td>{doc.effectiveDate}</td>
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
  );
}

function ContactTab({ profileHref }: { profileHref: string }) {
  const { t } = useLang();
  const c = t.capitalApp.detail.contact;
  const d = t.capitalApp.detail;
  return (
    <div className={styles.contactCard}>
      <h2>{c.heading}</h2>
      <p>{c.body}</p>
      <div className={styles.contactActions}>
        <Link href={profileHref} className={styles.invest}>
          {d.invest}
        </Link>
        <a href={WHATSAPP} target="_blank" rel="noreferrer" className={styles.contactBtn}>
          {c.cta}
        </a>
      </div>
    </div>
  );
}
