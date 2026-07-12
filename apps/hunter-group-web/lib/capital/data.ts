import type { Manager, Offering, OfferingDocument, Property, ShareClass, SourceReference } from "./types";

export const sources: SourceReference[] = [
  { id: "legacy-fact-2026-01", title: "Legacy Investment Class A Unit Fact Sheet", effectiveDate: "2026-01-30", visibility: "public" },
  { id: "legacy-ir-2025-09", title: "Legacy Trust IR Presentation", effectiveDate: "2025-09-02", visibility: "approved-investor" },
  { id: "lankin-deck", title: "Supplied Lankin Apartment REIT Investment Offering", effectiveDate: "2026-07-12", visibility: "approved-investor" },
];

export const managers: Manager[] = [
  {
    id: "epiphany-group",
    slug: "epiphany-group",
    name: { en: "Epiphany Group", tr: "Epiphany Group" },
    headquarters: { city: "Lethbridge", province: "Alberta", country: "Canada" },
    description: {
      en: "Asset manager focused on residential and commercial real estate in Western Canadian secondary markets.",
      tr: "Batı Kanada'nın ikincil pazarlarında konut ve ticari gayrimenkule odaklanan varlık yöneticisi.",
    },
  },
  {
    id: "lankin-investments",
    slug: "lankin-investments",
    name: { en: "Lankin Investments", tr: "Lankin Investments" },
    headquarters: { city: "Toronto", province: "Ontario", country: "Canada" },
    description: {
      en: "Toronto-based real estate private equity firm specializing in institutional-grade Canadian multifamily assets.",
      tr: "Kurumsal nitelikte Kanada çok konutlu varlıklarında uzmanlaşmış Toronto merkezli gayrimenkul özel sermaye şirketi.",
    },
  },
];

const current = (value: string, sourceId: string, asOfDate: string, sourcePage?: number) => ({ value, classification: "current" as const, asOfDate, sourceId, sourcePage, approval: "approved-public" as const });
const target = (value: string, sourceId: string, asOfDate: string, sourcePage?: number) => ({ value, classification: "target" as const, asOfDate, sourceId, sourcePage, approval: "approved-public" as const });

export const shareClasses: ShareClass[] = [
  {
    id: "legacy-class-a", offeringId: "legacy-epiphany", name: "Class A",
    minimumInvestment: { value: 2508, classification: "current", asOfDate: "2026-01-30", sourceId: "legacy-fact-2026-01", sourcePage: 1, approval: "approved-public" },
    unitPrice: { value: 4.75, classification: "current", asOfDate: "2026-01-30", sourceId: "legacy-fact-2026-01", sourcePage: 1, approval: "approved-public" },
    targetReturn: target("12-15% annually", "legacy-fact-2026-01", "2026-01-30", 1),
    targetDistribution: target("Quarterly; up to 8.2% annually", "legacy-fact-2026-01", "2026-01-30", 1),
    term: current("Open-ended fund", "legacy-fact-2026-01", "2026-01-30", 1),
    registeredAccountTypes: ["RRSP", "TFSA", "RESP", "LIRA", "RRIF"],
  },
  {
    id: "lankin-reit-units", offeringId: "lankin-apartment-reit", name: "REIT Units",
    unitPrice: { value: 10, classification: "current", asOfDate: "2026-07-12", sourceId: "lankin-deck", sourcePage: 12, approval: "approved-public" },
    targetReturn: target("14-18% annualized", "lankin-deck", "2026-07-12", 12),
    targetDistribution: target("8% annually, paid monthly", "lankin-deck", "2026-07-12", 12),
    term: current("Open-ended fund", "lankin-deck", "2026-07-12", 21),
    registeredAccountTypes: [],
  },
];

export const properties: Property[] = [
  { id: "cold-lake", offeringIds: ["legacy-epiphany"], managerId: "epiphany-group", name: { en: "Cold Lake Apartment Complex", tr: "Cold Lake Apartman Kompleksi" }, city: "Cold Lake", province: "Alberta", country: "Canada", latitude: 54.4642, longitude: -110.1825, assetClassId: "multifamily", units: { value: 63, classification: "current", asOfDate: "2025-09-02", sourceId: "legacy-ir-2025-09", sourcePage: 15, approval: "approved-public" }, status: "stabilized", verificationStatus: "verified" },
  { id: "bayer-lethbridge", offeringIds: ["legacy-epiphany"], managerId: "epiphany-group", name: { en: "Lethbridge Commercial Property", tr: "Lethbridge Ticari Mülkü" }, city: "Lethbridge", province: "Alberta", country: "Canada", latitude: 49.6956, longitude: -112.8451, assetClassId: "commercial", squareFeet: { value: 77000, classification: "current", asOfDate: "2025-09-02", sourceId: "legacy-ir-2025-09", sourcePage: 15, approval: "approved-public" }, status: "commercial", verificationStatus: "verified" },
  { id: "edmonton-241", offeringIds: ["lankin-apartment-reit"], managerId: "lankin-investments", name: { en: "Edmonton Multifamily", tr: "Edmonton Çok Konutlu" }, city: "Edmonton", province: "Alberta", country: "Canada", latitude: 53.5461, longitude: -113.4938, assetClassId: "multifamily", units: { value: 241, classification: "current", asOfDate: "2026-07-12", sourceId: "lankin-deck", sourcePage: 11, approval: "approved-public" }, status: "stabilized", verificationStatus: "partial" },
  { id: "sherwood-park", offeringIds: ["lankin-apartment-reit"], managerId: "lankin-investments", name: { en: "Sherwood Park", tr: "Sherwood Park" }, city: "Sherwood Park", province: "Alberta", country: "Canada", latitude: 53.5412, longitude: -113.2957, assetClassId: "multifamily", units: { value: 177, classification: "current", asOfDate: "2026-07-12", sourceId: "lankin-deck", sourcePage: 12, approval: "approved-public" }, status: "new-construction", verificationStatus: "partial" },
  { id: "newmarket-110", offeringIds: ["lankin-apartment-reit"], managerId: "lankin-investments", name: { en: "Newmarket Apartment Building", tr: "Newmarket Apartman Binası" }, city: "Newmarket", province: "Ontario", country: "Canada", latitude: 44.0592, longitude: -79.4613, assetClassId: "multifamily", units: { value: 110, classification: "current", asOfDate: "2026-07-12", sourceId: "lankin-deck", sourcePage: 12, approval: "approved-public" }, status: "stabilized", verificationStatus: "partial" },
  { id: "brampton-242", offeringIds: ["lankin-apartment-reit"], managerId: "lankin-investments", name: { en: "Brampton Apartment Portfolio", tr: "Brampton Apartman Portföyü" }, city: "Brampton", province: "Ontario", country: "Canada", latitude: 43.7315, longitude: -79.7624, assetClassId: "multifamily", units: { value: 242, classification: "current", asOfDate: "2026-07-12", sourceId: "lankin-deck", sourcePage: 12, approval: "approved-public" }, status: "stabilized", verificationStatus: "partial" },
];

export const documents: OfferingDocument[] = [
  { id: "legacy-fact", offeringId: "legacy-epiphany", title: { en: "Class A Fact Sheet", tr: "Class A Bilgi Formu" }, type: "fact-sheet", effectiveDate: "2026-01-30", version: "2026.01", visibility: "public" },
  { id: "legacy-presentation", offeringId: "legacy-epiphany", title: { en: "Investor Presentation", tr: "Yatırımcı Sunumu" }, type: "presentation", effectiveDate: "2025-09-02", version: "2025.09", visibility: "approved-investor" },
  { id: "lankin-presentation", offeringId: "lankin-apartment-reit", title: { en: "Investment Offering Presentation", tr: "Yatırım Teklifi Sunumu" }, type: "presentation", effectiveDate: "2026-07-12", version: "supplied", visibility: "approved-investor" },
];

export const offerings: Offering[] = [
  {
    id: "legacy-epiphany", slug: "legacy-epiphany", managerId: "epiphany-group",
    name: { en: "Epiphany Legacy Investment Mutual Fund Trust", tr: "Epiphany Legacy Investment Mutual Fund Trust" },
    shortName: { en: "Legacy / Epiphany", tr: "Legacy / Epiphany" },
    summary: { en: "Western Canadian residential and commercial real estate in growing secondary markets.", tr: "Büyüyen ikincil pazarlarda Batı Kanada konut ve ticari gayrimenkulü." },
    thesis: { en: "An open-ended real estate trust using active management to pursue quarterly income and long-term growth across Western Canada.", tr: "Batı Kanada genelinde üç aylık gelir ve uzun vadeli büyüme hedefleyen, aktif yönetilen açık uçlu gayrimenkul tröstü." },
    status: "available", strategyIds: ["core-plus"], assetClassIds: ["multifamily", "commercial"], regionIds: ["alberta", "saskatchewan", "manitoba", "british-columbia"], shareClassIds: ["legacy-class-a"], propertyIds: ["cold-lake", "bayer-lethbridge"], documentIds: ["legacy-fact", "legacy-presentation"], featured: true,
    portfolioFacts: [current("29 properties", "legacy-fact-2026-01", "2026-01-30", 2), current("7 communities", "legacy-fact-2026-01", "2026-01-30", 2), current("543 units", "legacy-fact-2026-01", "2026-01-30", 2)],
    risks: [{ en: "Private securities may be illiquid and redemption rights are governed by offering documents.", tr: "Özel menkul kıymetler likit olmayabilir; itfa hakları teklif belgelerine tabidir." }, { en: "Target returns and distributions are not guaranteed.", tr: "Hedef getiriler ve dağıtımlar garanti değildir." }], verifiedAt: "2026-07-12",
  },
  {
    id: "lankin-apartment-reit", slug: "lankin-apartment-reit", managerId: "lankin-investments",
    name: { en: "Lankin Apartment REIT", tr: "Lankin Apartment REIT" },
    shortName: { en: "Lankin Apartment REIT", tr: "Lankin Apartment REIT" },
    summary: { en: "Institutional-grade Canadian multifamily properties in strategic rental markets.", tr: "Stratejik kiralama pazarlarında kurumsal nitelikte Kanada çok konutlu mülkleri." },
    thesis: { en: "A long-term ownership strategy focused on newly constructed and stabilized rental properties, monthly distributions, and capital appreciation.", tr: "Yeni inşa edilmiş ve stabilize kiralık mülklere, aylık dağıtımlara ve sermaye artışına odaklanan uzun vadeli sahiplik stratejisi." },
    status: "available", strategyIds: ["core-plus"], assetClassIds: ["multifamily"], regionIds: ["ontario", "alberta"], shareClassIds: ["lankin-reit-units"], propertyIds: ["edmonton-241", "sherwood-park", "newmarket-110", "brampton-242"], documentIds: ["lankin-presentation"], featured: true,
    portfolioFacts: [current("Canadian multifamily", "lankin-deck", "2026-07-12", 11), current("Ontario and Alberta examples", "lankin-deck", "2026-07-12", 12), current("New construction and stabilized assets", "lankin-deck", "2026-07-12", 11)],
    risks: [{ en: "Distributions are discretionary and may change.", tr: "Dağıtımlar isteğe bağlıdır ve değişebilir." }, { en: "Private securities may have indefinite hold periods and limited liquidity.", tr: "Özel menkul kıymetlerin belirsiz bekleme süreleri ve sınırlı likiditesi olabilir." }], verifiedAt: "2026-07-12",
  },
];
