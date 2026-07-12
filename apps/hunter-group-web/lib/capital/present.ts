/**
 * Presentation layer for the capital data.
 *
 * This module NEVER mutates the underlying data. It only derives display
 * strings, localized labels, metric tiles, image fallbacks, and map view-models
 * so screens stay thin. The English canonical strings in data.ts are the source
 * of truth; Turkish display values are derived here at render time.
 */
import {
  assetClasses,
  regions,
  strategies,
  taxonomyLabel,
} from "./taxonomies";
import type {
  ImageSlot,
  Lang,
  LocalizedText,
  MetricClassification,
  OfferingBundle,
  Property,
  ShareClass,
  SourcedValue,
} from "./types";

/* ------------------------------------------------------------------ */
/* Localized label tables                                             */
/* ------------------------------------------------------------------ */

const CLASSIFICATION: Record<MetricClassification, LocalizedText> = {
  historical: { en: "Historical", tr: "Geçmiş" },
  current: { en: "Current", tr: "Güncel" },
  target: { en: "Target", tr: "Hedef" },
  illustrative: { en: "Illustrative", tr: "Örnek" },
};

const STATUS: Record<Property["status"], LocalizedText> = {
  stabilized: { en: "Stabilized", tr: "Stabilize" },
  "new-construction": { en: "New construction", tr: "Yeni inşaat" },
  "value-add": { en: "Value-add", tr: "Değer artırma" },
  commercial: { en: "Commercial", tr: "Ticari" },
};

const VERIFICATION: Record<Property["verificationStatus"], LocalizedText> = {
  verified: { en: "Verified", tr: "Doğrulandı" },
  partial: { en: "Partial", tr: "Kısmi" },
  pending: { en: "Pending", tr: "Beklemede" },
};

export function localizeStatus(status: Property["status"], lang: Lang) {
  return STATUS[status][lang];
}

export function localizeVerification(status: Property["verificationStatus"], lang: Lang) {
  return VERIFICATION[status][lang];
}

/* ------------------------------------------------------------------ */
/* Number / currency / units formatting                               */
/* ------------------------------------------------------------------ */

export function formatCurrencyCad(value: number, lang: Lang): string {
  const locale = lang === "tr" ? "tr-TR" : "en-CA";
  const grouped = new Intl.NumberFormat(locale, {
    maximumFractionDigits: Number.isInteger(value) ? 0 : 2,
  }).format(value);
  return lang === "tr" ? `${grouped} CAD` : `$${grouped} CAD`;
}

function formatCount(value: number, lang: Lang): string {
  return new Intl.NumberFormat(lang === "tr" ? "tr-TR" : "en-CA").format(value);
}

/** "63 units" / "63 ünite" or "77,000 sq ft" / "77.000 ft²". Null if unsourced. */
export function formatUnits(property: Property, lang: Lang): string | null {
  if (property.units) {
    const n = formatCount(property.units.value, lang);
    return lang === "tr" ? `${n} ünite` : `${n} units`;
  }
  if (property.squareFeet) {
    const n = formatCount(property.squareFeet.value, lang);
    return lang === "tr" ? `${n} ft²` : `${n} sq ft`;
  }
  return null;
}

/* ------------------------------------------------------------------ */
/* Provenance line                                                    */
/* ------------------------------------------------------------------ */

/** "Target · 2026-01-30 · p.1" / "Hedef · 2026-01-30 · s.1" */
export function formatSourceLine(value: SourcedValue | undefined, lang: Lang): string | null {
  if (!value) return null;
  const parts: string[] = [CLASSIFICATION[value.classification][lang], value.asOfDate];
  if (value.sourcePage) parts.push(lang === "tr" ? `s.${value.sourcePage}` : `p.${value.sourcePage}`);
  return parts.join(" · ");
}

/* ------------------------------------------------------------------ */
/* Return / distribution / term phrase localization                   */
/* ------------------------------------------------------------------ */

// Exact-match table for the known canonical English strings guarantees correct
// Turkish output for real data; genericReturnTr() gracefully handles new strings.
const RETURN_PHRASES_TR: Record<string, string> = {
  "12-15% annually": "Yıllık %12-15",
  "14-18% annualized": "Yıllıklandırılmış %14-18",
  "Quarterly; up to 8.2% annually": "Üç aylık; yıllık en fazla %8,2",
  "8% annually, paid monthly": "Yıllık %8; aylık ödenir",
  "Open-ended fund": "Açık uçlu fon",
};

function genericReturnTr(text: string): string {
  let out = text;
  // Move "%" in front of the number and use Turkish decimal comma: "8.2%" -> "%8,2"
  out = out.replace(/(\d+(?:\.\d+)?)-(\d+(?:\.\d+)?)%/g, (_m, a: string, b: string) =>
    `%${a.replace(".", ",")}-${b.replace(".", ",")}`,
  );
  out = out.replace(/(\d+(?:\.\d+)?)%/g, (_m, a: string) => `%${a.replace(".", ",")}`);
  // Cadence / qualifier words
  out = out
    .replace(/\bannualized\b/gi, "yıllıklandırılmış")
    .replace(/\bannually\b/gi, "yıllık")
    .replace(/\bpaid monthly\b/gi, "aylık ödenir")
    .replace(/\bmonthly\b/gi, "aylık")
    .replace(/\bQuarterly\b/g, "Üç aylık")
    .replace(/\bquarterly\b/gi, "üç aylık")
    .replace(/\bup to\b/gi, "en fazla");
  return out;
}

/** Localize a sourced return/distribution/term string. English is returned as-is. */
export function formatReturnPhrase(text: string, lang: Lang): string {
  if (lang !== "tr") return text;
  return RETURN_PHRASES_TR[text] ?? genericReturnTr(text);
}

export function formatSourcedPhrase(value: SourcedValue<string> | undefined, lang: Lang): string | null {
  if (!value) return null;
  return formatReturnPhrase(value.value, lang);
}

/* ------------------------------------------------------------------ */
/* Image slot resolution (elegant placeholder when no src)            */
/* ------------------------------------------------------------------ */

export type ResolvedImage = {
  src?: string;
  alt: string;
  gradient: string;
  initials: string;
};

function hashString(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i += 1) {
    h = (h << 5) - h + seed.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function initialsFrom(label: string): string {
  const words = label.replace(/[^\p{L}\p{N} ]/gu, " ").trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "HG";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

/** Deterministic muted gradient + initials fallback; uses `slot.src` when present. */
export function resolveImage(
  slot: ImageSlot | undefined,
  seed: string,
  label: string,
  lang: Lang,
  accent?: string,
): ResolvedImage {
  const hue = hashString(seed) % 360;
  const base = accent ?? `hsl(${hue}, 22%, 34%)`;
  const dark = accent ? `${accent}` : `hsl(${hue}, 26%, 22%)`;
  const gradient = `linear-gradient(135deg, ${dark} 0%, ${base} 60%, hsl(${(hue + 24) % 360}, 18%, 46%) 100%)`;
  return {
    src: slot?.src,
    alt: slot?.alt?.[lang] ?? label,
    gradient,
    initials: initialsFrom(label),
  };
}

/* ------------------------------------------------------------------ */
/* View models                                                        */
/* ------------------------------------------------------------------ */

export function primaryShareClass(bundle: OfferingBundle): ShareClass | undefined {
  return bundle.shareClasses[0];
}

export type MetricTile = {
  key: string;
  label: string;
  value: string;
  source: string | null;
};

/**
 * Metric tiles for a fund's overview/terms. `plain` returns only the headline
 * few (overview, lighter); full includes unit price + accounts (terms, denser).
 */
export function offeringMetrics(bundle: OfferingBundle, lang: Lang, variant: "plain" | "full" = "plain"): MetricTile[] {
  const sc = primaryShareClass(bundle);
  if (!sc) return [];
  const tiles: MetricTile[] = [];
  const L = (en: string, tr: string) => (lang === "tr" ? tr : en);

  if (sc.targetReturn) {
    tiles.push({
      key: "return",
      label: L("Target return", "Hedef getiri"),
      value: formatReturnPhrase(sc.targetReturn.value, lang),
      source: formatSourceLine(sc.targetReturn, lang),
    });
  }
  if (sc.targetDistribution) {
    tiles.push({
      key: "distribution",
      label: L("Target distribution", "Hedef dağıtım"),
      value: formatReturnPhrase(sc.targetDistribution.value, lang),
      source: formatSourceLine(sc.targetDistribution, lang),
    });
  }
  tiles.push({
    key: "minimum",
    label: L("Minimum", "Minimum"),
    value: sc.minimumInvestment
      ? formatCurrencyCad(sc.minimumInvestment.value, lang)
      : L("Review required", "İnceleme gerekir"),
    source: sc.minimumInvestment ? formatSourceLine(sc.minimumInvestment, lang) : null,
  });
  if (sc.term) {
    tiles.push({
      key: "term",
      label: L("Term", "Vade"),
      value: formatReturnPhrase(sc.term.value, lang),
      source: formatSourceLine(sc.term, lang),
    });
  }

  if (variant === "full") {
    if (sc.unitPrice) {
      tiles.push({
        key: "unit-price",
        label: L("Unit price", "Birim fiyat"),
        value: formatCurrencyCad(sc.unitPrice.value, lang),
        source: formatSourceLine(sc.unitPrice, lang),
      });
    }
    if (sc.registeredAccountTypes.length > 0) {
      tiles.push({
        key: "accounts",
        label: L("Eligible accounts", "Uygun hesaplar"),
        value: sc.registeredAccountTypes.join(", "),
        source: null,
      });
    }
  }

  return tiles;
}

export function offeringTaxonomyLabels(bundle: OfferingBundle, lang: Lang) {
  return {
    strategies: bundle.strategyIds.map((id) => taxonomyLabel(strategies, id, lang)),
    assetClasses: bundle.assetClassIds.map((id) => taxonomyLabel(assetClasses, id, lang)),
    regions: bundle.regionIds.map((id) => taxonomyLabel(regions, id, lang)),
  };
}

/* ------------------------------------------------------------------ */
/* Map view model                                                     */
/* ------------------------------------------------------------------ */

export type MapProperty = {
  id: string;
  name: string;
  city: string;
  province: string;
  latitude: number;
  longitude: number;
  accent: string;
  status: string;
  detail: string;
  verification: string;
  assetClass: string;
};

/** Portfolio buildings for the 3D map, sourced from real lat/lng. */
export function buildMapProperties(bundle: OfferingBundle, lang: Lang): MapProperty[] {
  return bundle.properties.map((p) => ({
    id: p.id,
    name: p.name[lang],
    city: p.city,
    province: p.province,
    latitude: p.latitude,
    longitude: p.longitude,
    accent: assetClasses.find((a) => a.id === p.assetClassId)?.color ?? "#2f6f4f",
    status: STATUS[p.status][lang],
    detail: formatUnits(p, lang) ?? "",
    verification: VERIFICATION[p.verificationStatus][lang],
    assetClass: taxonomyLabel(assetClasses, p.assetClassId, lang),
  }));
}
