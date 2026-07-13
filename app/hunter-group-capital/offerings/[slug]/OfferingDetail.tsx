"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

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

  function setTab(next: string) {
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
    <div className="flex flex-col gap-4">
      <Link href="/hunter-group-capital" className="inline-flex items-center gap-1.5 self-start text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
        <ArrowLeft className="size-4" /> {d.back}
      </Link>

      {/* Banner */}
      <section className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <div className="h-36 bg-cover bg-center" style={vm.bannerImage.src ? undefined : { backgroundImage: vm.bannerImage.gradient }}>
          {vm.bannerImage.src && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={vm.bannerImage.src} alt={vm.bannerImage.alt} className="h-full w-full object-cover" />
          )}
        </div>
        <div className="grid items-start gap-6 p-6 pt-5 md:grid-cols-[auto_minmax(0,1fr)_auto]">
          <div
            className="-mt-16 grid size-24 place-items-center overflow-hidden rounded-2xl border-4 border-card bg-white font-serif text-2xl font-semibold text-primary shadow"
            style={vm.logo.src ? undefined : { backgroundImage: vm.logo.gradient }}
          >
            {vm.logo.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={vm.logo.src} alt={vm.logo.alt} className="h-full w-full object-contain p-2.5" />
            ) : (
              <span aria-hidden>{vm.logo.initials}</span>
            )}
          </div>

          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-gold">
              {taxonomyLabel(strategies, offering.strategyIds[0], lang)} · {offering.manager.name[lang]}
            </p>
            <h1 className="mt-1 font-serif text-2xl font-semibold leading-tight text-foreground sm:text-3xl">{offering.name[lang]}</h1>
            <p className="mt-1.5 max-w-[62ch] text-sm leading-relaxed text-muted-foreground">{offering.summary[lang]}</p>
            {vm.headline && (
              <p className="mt-2 flex items-baseline gap-2">
                <strong className="text-xl font-bold text-primary">{vm.headline}</strong>
                <span className="text-xs text-muted-foreground">{offering.offeringSize ? t.capitalApp.card.offeringSize : t.capitalApp.card.aumLabel}</span>
              </p>
            )}
          </div>

          <aside className="flex min-w-52 flex-col gap-2.5 rounded-xl border border-border bg-secondary/40 p-4">
            {vm.fundingPercent !== null && <FundingRing percent={vm.fundingPercent} label={d.funded} />}
            <Button asChild className="tracking-[0.05em]">
              <Link href={profileHref}>{d.invest}</Link>
            </Button>
            <Button asChild variant="outline">
              <a href={WHATSAPP} target="_blank" rel="noreferrer">{d.contactUs}</a>
            </Button>
          </aside>
        </div>
      </section>

      {/* Tabs */}
      <Tabs value={tab} onValueChange={setTab} className="gap-5">
        <TabsList className="sticky top-16 z-10 h-auto flex-wrap justify-start">
          {TABS.map((key) => (
            <TabsTrigger key={key} value={key} className="text-sm">
              {d.tabs[TAB_LABEL[key]]}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="offer-details"><OfferDetailsTab offering={offering} /></TabsContent>
        <TabsContent value="portfolio"><PortfolioTab offering={offering} /></TabsContent>
        <TabsContent value="documents"><DocumentsTab offering={offering} /></TabsContent>
        <TabsContent value="contact"><ContactTab profileHref={profileHref} /></TabsContent>
      </Tabs>
    </div>
  );
}

function FundingRing({ percent, label }: { percent: number; label: string }) {
  const r = 26;
  const circ = 2 * Math.PI * r;
  const dash = (percent / 100) * circ;
  return (
    <div className="mb-1 flex items-center gap-3">
      <svg viewBox="0 0 64 64" width="56" height="56" aria-hidden>
        <circle cx="32" cy="32" r={r} fill="none" stroke="var(--border)" strokeWidth="6" />
        <circle cx="32" cy="32" r={r} fill="none" stroke="var(--gold)" strokeWidth="6" strokeLinecap="round" strokeDasharray={`${dash} ${circ}`} transform="rotate(-90 32 32)" />
      </svg>
      <div className="flex flex-col">
        <strong className="text-xl font-bold leading-none text-foreground">{percent}%</strong>
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
    </div>
  );
}

const CARD = "rounded-xl border border-border bg-card p-6";
const H2 = "font-serif text-lg font-semibold text-foreground";

function OfferDetailsTab({ offering }: { offering: OfferingBundle }) {
  const { lang, t } = useLang();
  const d = t.capitalApp.detail;
  const vm = buildFundDetailViewModel(offering, lang);
  const fields = d.fields as Record<string, string>;

  return (
    <div className="flex flex-col gap-7">
      <section className="flex flex-col gap-2.5 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.08em] text-muted-foreground">{d.investmentSummary}</p>
        <p className="mx-auto max-w-[76ch] text-[15px] leading-relaxed text-muted-foreground">{offering.thesis[lang]}</p>
      </section>

      {vm.summaryTiles.length > 0 && (
        <dl className="grid gap-4 sm:grid-cols-3">
          {vm.summaryTiles.map((tile) => (
            <div key={tile.key} className="rounded-xl border border-border bg-card p-5 text-center">
              <dd className="text-2xl font-bold leading-tight text-foreground">{tile.value}</dd>
              <dt className="mt-1.5 text-xs text-muted-foreground">{tile.label}</dt>
            </div>
          ))}
        </dl>
      )}

      <section className={CARD}>
        <h2 className={cn(H2, "mb-4")}>{d.fundDetailsHeading}</h2>
        <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
          {vm.fundDetails.map((r) => (
            <div key={r.key}>
              <dt className="mb-0.5 text-xs text-muted-foreground">{fields[r.key] ?? r.key}</dt>
              <dd className="border-b border-border pb-2 text-[15px] font-semibold text-foreground">{r.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {vm.highlights.length > 0 && (
        <section className="flex flex-col gap-3">
          <h2 className={H2}>{d.whyInvest}</h2>
          <ul className="flex flex-col gap-2">
            {vm.highlights.map((h) => (
              <li key={h} className="relative max-w-[76ch] pl-6 text-[14.5px] leading-relaxed text-foreground before:absolute before:left-0 before:top-0 before:font-bold before:text-gold before:content-['✓']">
                {h}
              </li>
            ))}
          </ul>
        </section>
      )}

      {vm.trailingReturns.length > 0 && (
        <section className="flex flex-col gap-3">
          <h2 className={H2}>{d.trailingReturns}</h2>
          <div className="max-w-lg overflow-hidden rounded-xl border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{d.periodCol}</TableHead>
                  <TableHead>{d.returnCol}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vm.trailingReturns.map((row) => (
                  <TableRow key={row.period}>
                    <TableCell>{row.period}</TableCell>
                    <TableCell>
                      <strong className="font-bold text-foreground">{row.value}</strong>
                      {row.note && <span className="text-[13px] font-normal text-muted-foreground"> · {row.note}</span>}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <p className="text-xs text-muted-foreground">{t.capitalApp.common.notGuaranteed}</p>
        </section>
      )}

      {vm.providers.length > 0 && (
        <section className={CARD}>
          <h2 className={cn(H2, "mb-4")}>{d.providersHeading}</h2>
          <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {vm.providers.map((r) => (
              <div key={r.key}>
                <dt className="mb-0.5 text-xs text-muted-foreground">{fields[r.key] ?? r.key}</dt>
                <dd className="text-[15px] font-semibold text-foreground">{r.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {vm.lastUpdated && (
        <p className="text-xs text-muted-foreground">{d.lastUpdated}: {vm.lastUpdated}</p>
      )}

      <section className="flex flex-col gap-3">
        <h2 className={H2}>{d.aboutManager}</h2>
        <p className="text-[15px] leading-relaxed text-muted-foreground">{offering.manager.description[lang]}</p>
        <dl className="mt-1 grid gap-4 border-t border-border pt-4 sm:grid-cols-3">
          <div><dt className="mb-0.5 text-[11px] font-semibold text-muted-foreground">{d.headquarters}</dt><dd className="text-sm text-foreground">{offering.manager.headquarters.city}, {offering.manager.headquarters.province}</dd></div>
          <div><dt className="mb-0.5 text-[11px] font-semibold text-muted-foreground">{d.regions}</dt><dd className="text-sm text-foreground">{offering.regionIds.map((id) => taxonomyLabel(regions, id, lang)).join(" · ")}</dd></div>
          <div><dt className="mb-0.5 text-[11px] font-semibold text-muted-foreground">{d.assetClass}</dt><dd className="text-sm text-foreground">{offering.assetClassIds.map((id) => taxonomyLabel(assetClasses, id, lang)).join(" · ")}</dd></div>
        </dl>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className={H2}>{d.risksHeading}</h2>
        <ul className="flex flex-col gap-2">
          {offering.risks.map((risk) => (
            <li key={risk.en} className="relative max-w-[76ch] pl-4 text-sm leading-relaxed text-muted-foreground before:absolute before:left-0.5 before:top-2 before:size-1.5 before:rounded-full before:bg-gold before:content-['']">
              {risk[lang]}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function PortfolioTab({ offering }: { offering: OfferingBundle }) {
  const { lang, t } = useLang();
  return (
    <div className="flex flex-col gap-5">
      <FundMapEmbed offering={offering} />
      <div className="flex flex-col gap-2.5">
        {offering.properties.map((property) => {
          const size = formatUnits(property, lang);
          return (
            <article key={property.id} className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border bg-card px-5 py-3.5">
              <div>
                <h3 className="text-[15px] font-semibold text-foreground">{property.name[lang]}</h3>
                <small className="text-[12.5px] text-muted-foreground">{property.city}, {property.province}</small>
              </div>
              <div className="flex flex-wrap items-center gap-2.5 text-[12.5px] text-muted-foreground">
                <span>{taxonomyLabel(assetClasses, property.assetClassId, lang)}</span>
                {size && <span>{size}</span>}
                <span>{localizeStatus(property.status, lang)}</span>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
                    property.verificationStatus === "verified" && "bg-ok-bg text-ok",
                    property.verificationStatus === "partial" && "bg-warn-bg text-warn",
                    property.verificationStatus === "pending" && "bg-muted text-muted-foreground",
                  )}
                >
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
  if (!offering.documents.length) return <p className="py-8 text-center text-muted-foreground">{dc.empty}</p>;
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{dc.colName}</TableHead>
            <TableHead>{dc.colType}</TableHead>
            <TableHead>{dc.colDate}</TableHead>
            <TableHead>{dc.colAccess}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {offering.documents.map((doc) => {
            const isPublic = doc.visibility === "public";
            return (
              <TableRow key={doc.id}>
                <TableCell>
                  <span className="block font-semibold text-foreground">{doc.title[lang]}</span>
                  {doc.description && <small className="text-xs text-muted-foreground">{doc.description[lang]}</small>}
                </TableCell>
                <TableCell className="text-muted-foreground">{dc.types[doc.type]}</TableCell>
                <TableCell className="text-muted-foreground">{doc.effectiveDate}</TableCell>
                <TableCell>
                  {isPublic && doc.href ? (
                    <a href={doc.href} target="_blank" rel="noreferrer" className="font-bold text-primary hover:underline">{dc.download}</a>
                  ) : (
                    <span className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-semibold text-muted-foreground">{isPublic ? dc.public : dc.approvedInvestor}</span>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

function ContactTab({ profileHref }: { profileHref: string }) {
  const { t } = useLang();
  const c = t.capitalApp.detail.contact;
  const d = t.capitalApp.detail;
  return (
    <div className="max-w-xl rounded-xl border border-border bg-card p-6">
      <h2 className="mb-2 font-serif text-xl font-semibold text-foreground">{c.heading}</h2>
      <p className="mb-5 text-[14.5px] leading-relaxed text-muted-foreground">{c.body}</p>
      <div className="flex flex-wrap gap-2.5">
        <Button asChild><Link href={profileHref}>{d.invest}</Link></Button>
        <Button asChild variant="wa"><a href={WHATSAPP} target="_blank" rel="noreferrer">{c.cta}</a></Button>
      </div>
    </div>
  );
}
