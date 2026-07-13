import type { Manager, Offering, OfferingDocument, Property, ShareClass, SourceReference } from "./types";

export const sources: SourceReference[] = [
  { id: "legacy-fact-2026-01", title: "Legacy Investment Class A Unit Fact Sheet", effectiveDate: "2026-01-30", visibility: "public" },
  { id: "legacy-ir-2025-09", title: "Legacy Trust IR Presentation", effectiveDate: "2025-09-02", visibility: "approved-investor" },
  { id: "lankin-fact-2025-q2", title: "Lankin Apartment REIT Fund Fact Sheet Q2 2025", effectiveDate: "2025-06-30", visibility: "public" },
  { id: "lankin-deck", title: "Supplied Lankin Apartment REIT Investment Offering", effectiveDate: "2026-07-12", visibility: "approved-investor" },
];

export const managers: Manager[] = [
  {
    id: "epiphany-group",
    slug: "epiphany-group",
    name: { en: "Epiphany Group", tr: "Epiphany Group" },
    headquarters: { city: "Lethbridge", province: "Alberta", country: "Canada" },
    description: {
      en: "Asset manager focused on residential and commercial real estate in Western Canadian secondary markets, backed by 100+ years of combined senior management experience.",
      tr: "Batı Kanada'nın ikincil pazarlarında konut ve ticari gayrimenkule odaklanan, 100 yılı aşkın birleşik üst yönetim deneyimine sahip varlık yöneticisi.",
    },
  },
  {
    id: "lankin-investments",
    slug: "lankin-investments",
    name: { en: "Lankin Investments", tr: "Lankin Investments" },
    headquarters: { city: "Woodbridge", province: "Ontario", country: "Canada" },
    description: {
      en: "Woodbridge, Ontario real estate manager specializing in institutional-grade Canadian multi-family assets across strategic rental markets.",
      tr: "Stratejik kiralama pazarlarında kurumsal nitelikte Kanada çok konutlu varlıklarında uzmanlaşmış, Woodbridge (Ontario) merkezli gayrimenkul yöneticisi.",
    },
  },
];

const current = <T extends string | number>(value: T, sourceId: string, asOfDate: string, sourcePage?: number) => ({ value, classification: "current" as const, asOfDate, sourceId, sourcePage, approval: "approved-public" as const });
const target = (value: string, sourceId: string, asOfDate: string, sourcePage?: number) => ({ value, classification: "target" as const, asOfDate, sourceId, sourcePage, approval: "approved-public" as const });

export const shareClasses: ShareClass[] = [
  {
    id: "legacy-class-a", offeringId: "legacy-epiphany", name: "Class A",
    minimumInvestment: current(2508, "legacy-fact-2026-01", "2026-01-30", 1),
    unitPrice: current(4.75, "legacy-fact-2026-01", "2026-01-30", 1),
    targetReturn: target("12-15% annually", "legacy-fact-2026-01", "2026-01-30", 1),
    targetDistribution: target("Quarterly; up to 8.2% annually", "legacy-fact-2026-01", "2026-01-30", 1),
    term: current("Open-ended fund", "legacy-fact-2026-01", "2026-01-30", 1),
    registeredAccountTypes: ["RRSP", "TFSA", "RESP", "LIRA", "RRIF"],
  },
  {
    id: "lankin-class-a", offeringId: "lankin-apartment-reit", name: "Class A (Series A)",
    minimumInvestment: current(5000, "lankin-fact-2025-q2", "2025-06-30", 1),
    unitPrice: current(10.74, "lankin-deck", "2026-07-12", 12),
    targetReturn: target("14-18% annualized", "lankin-fact-2025-q2", "2025-06-30", 1),
    targetDistribution: target("8% annually, paid monthly", "lankin-fact-2025-q2", "2025-06-30", 1),
    distributionPerUnit: target("$0.81 per unit, paid monthly", "lankin-fact-2025-q2", "2025-06-30", 1),
    term: current("Open-ended fund", "lankin-fact-2025-q2", "2025-06-30", 1),
    redemptionTerms: { en: "Redemption free after the 3rd year; penalties apply prior.", tr: "3. yıldan sonra ücretsiz itfa; öncesinde ceza uygulanır." },
    drip: { en: "DRIP available at a 2% discount.", tr: "DRIP %2 indirimle mevcuttur." },
    registeredAccountTypes: ["RRSP", "TFSA", "RESP", "LIRA", "RRIF"],
  },
];

export const properties: Property[] = [
  { id: "cold-lake", offeringIds: ["legacy-epiphany"], managerId: "epiphany-group", name: { en: "Cold Lake Apartment Complex", tr: "Cold Lake Apartman Kompleksi" }, city: "Cold Lake", province: "Alberta", country: "Canada", latitude: 54.4642, longitude: -110.1825, assetClassId: "multifamily", units: current(63, "legacy-ir-2025-09", "2025-09-02", 15), status: "stabilized", verificationStatus: "verified" },
  { id: "bayer-lethbridge", offeringIds: ["legacy-epiphany"], managerId: "epiphany-group", name: { en: "Lethbridge Commercial Property", tr: "Lethbridge Ticari Mülkü" }, city: "Lethbridge", province: "Alberta", country: "Canada", latitude: 49.6956, longitude: -112.8451, assetClassId: "commercial", squareFeet: current(77000, "legacy-ir-2025-09", "2025-09-02", 15), status: "commercial", verificationStatus: "verified" },
  { id: "lankin-edmonton", offeringIds: ["lankin-apartment-reit"], managerId: "lankin-investments", name: { en: "2014 Sherwood Dr, Edmonton", tr: "2014 Sherwood Dr, Edmonton" }, city: "Edmonton", province: "Alberta", country: "Canada", latitude: 53.5232, longitude: -113.3300, assetClassId: "multifamily", status: "stabilized", verificationStatus: "verified" },
  { id: "lankin-newmarket", offeringIds: ["lankin-apartment-reit"], managerId: "lankin-investments", name: { en: "75-77 Huron Heights Dr, Newmarket", tr: "75-77 Huron Heights Dr, Newmarket" }, city: "Newmarket", province: "Ontario", country: "Canada", latitude: 44.0501, longitude: -79.4380, assetClassId: "multifamily", status: "stabilized", verificationStatus: "verified" },
  { id: "lankin-brampton", offeringIds: ["lankin-apartment-reit"], managerId: "lankin-investments", name: { en: "75/85/90 Orenda Rd, Brampton", tr: "75/85/90 Orenda Rd, Brampton" }, city: "Brampton", province: "Ontario", country: "Canada", latitude: 43.7089, longitude: -79.7376, assetClassId: "multifamily", status: "new-construction", verificationStatus: "verified" },
];

export const documents: OfferingDocument[] = [
  { id: "legacy-fact", offeringId: "legacy-epiphany", title: { en: "Class A Unit Fact Sheet", tr: "Class A Bilgi Formu" }, description: { en: "January 30th, 2026", tr: "30 Ocak 2026" }, type: "fact-sheet", effectiveDate: "2026-01-30", version: "2026.01", visibility: "public", href: "/capital/docs/legacy-class-a-fact-sheet-2026-01-30.pdf" },
  { id: "legacy-om", offeringId: "legacy-epiphany", title: { en: "Offering Memorandum", tr: "Teklif Muhtırası" }, description: { en: "September 2025 mid-year update", tr: "Eylül 2025 yıl ortası güncellemesi" }, type: "offering-memorandum", effectiveDate: "2025-09-02", version: "2025.09", visibility: "approved-investor" },
  { id: "legacy-presentation", offeringId: "legacy-epiphany", title: { en: "Investor Presentation", tr: "Yatırımcı Sunumu" }, type: "presentation", effectiveDate: "2025-09-02", version: "2025.09", visibility: "approved-investor" },
  { id: "lankin-fact", offeringId: "lankin-apartment-reit", title: { en: "Fund Fact Sheet — Class A", tr: "Fon Bilgi Formu — Class A" }, description: { en: "Q2 2025", tr: "2025 2. Çeyrek" }, type: "fact-sheet", effectiveDate: "2025-06-30", version: "2025.Q2", visibility: "public", href: "/capital/docs/lankin-apartment-reit-fact-sheet-q2-2025.pdf" },
  { id: "lankin-om", offeringId: "lankin-apartment-reit", title: { en: "Offering Memorandum", tr: "Teklif Muhtırası" }, description: { en: "2026 SEDAR filing version", tr: "2026 SEDAR başvuru sürümü" }, type: "offering-memorandum", effectiveDate: "2026-01-15", version: "2026", visibility: "approved-investor" },
  { id: "lankin-subscription", offeringId: "lankin-apartment-reit", title: { en: "Subscription Agreement", tr: "Abonelik Sözleşmesi" }, type: "subscription-agreement", effectiveDate: "2025-06-30", version: "current", visibility: "approved-investor" },
  { id: "lankin-report", offeringId: "lankin-apartment-reit", title: { en: "Report & Financial Statements", tr: "Rapor ve Mali Tablolar" }, description: { en: "Q1 2025", tr: "2025 1. Çeyrek" }, type: "report", effectiveDate: "2025-03-31", version: "2025.Q1", visibility: "approved-investor" },
];

export const offerings: Offering[] = [
  {
    id: "legacy-epiphany", slug: "legacy-epiphany", managerId: "epiphany-group",
    name: { en: "Epiphany Legacy Investment Mutual Fund Trust", tr: "Epiphany Legacy Investment Mutual Fund Trust" },
    shortName: { en: "Legacy Investment", tr: "Legacy Investment" },
    summary: { en: "A REIT targeting Western Canada residential and commercial secondary properties in emerging markets.", tr: "Gelişmekte olan pazarlarda Batı Kanada konut ve ticari ikincil mülklerini hedefleyen bir REIT." },
    thesis: { en: "The Epiphany Legacy Investment Mutual Fund Trust generates sustainable growth through strategic real estate investments across Western Canada's secondary markets. Since inception in Fall 2021 it has secured over $85 million in assets under management — a blend of multi-residential and commercial properties — with a disciplined approach to asset acquisition and management.", tr: "Epiphany Legacy Investment Mutual Fund Trust, Batı Kanada'nın ikincil pazarlarındaki stratejik gayrimenkul yatırımlarıyla sürdürülebilir büyüme üretir. 2021 sonbaharındaki kuruluşundan bu yana, çok konutlu ve ticari mülklerin bir karışımından oluşan 85 milyon doları aşkın yönetilen varlık edinmiştir." },
    status: "available", strategyIds: ["core-plus"], assetClassIds: ["multifamily", "commercial"], regionIds: ["alberta", "saskatchewan", "manitoba", "british-columbia"], shareClassIds: ["legacy-class-a"], propertyIds: ["cold-lake", "bayer-lethbridge"], documentIds: ["legacy-fact", "legacy-om", "legacy-presentation"], featured: true,
    portfolioFacts: [current("27 properties", "legacy-ir-2025-09", "2025-09-02", 6), current("7 communities", "legacy-fact-2026-01", "2026-01-30", 2), current("543 units", "legacy-fact-2026-01", "2026-01-30", 2)],
    fundType: { en: "Mutual Fund Trust", tr: "Mutual Fund Trust" },
    fundStatus: { en: "Offering Memorandum", tr: "Offering Memorandum" },
    inceptionDate: "2021-09",
    aum: current("$85M+", "legacy-ir-2025-09", "2025-09-02", 6),
    offeringSize: current(38160000, "legacy-fact-2026-01", "2026-01-30", 1),
    amountRaised: current(18480000, "legacy-fact-2026-01", "2026-01-30", 1),
    fundingPercent: 48.4,
    distributionFrequency: { en: "Quarterly", tr: "Üç aylık" },
    riskProfile: { en: "Low - Moderate", tr: "Düşük - Orta" },
    highlights: [
      { en: "Registered fund eligible (RRSP, TFSA, RESP, LIRA, RRIF).", tr: "Kayıtlı fon uygun (RRSP, TFSA, RESP, LIRA, RRIF)." },
      { en: "27 properties across Western Canada, $85M+ in assets.", tr: "Batı Kanada genelinde 27 mülk, 85M$+ varlık." },
      { en: "Over a century of combined senior management experience.", tr: "Yüz yılı aşkın birleşik üst yönetim deneyimi." },
      { en: "Insider ownership of approximately $13M.", tr: "Yaklaşık 13M$ içeriden sahiplik." },
    ],
    trailingReturns: [
      { period: { en: "2024", tr: "2024" }, value: "13.97%", note: { en: "Yield 8.2%", tr: "Getiri %8,2" } },
      { period: { en: "Since inception (avg.)", tr: "Kuruluştan bu yana (ort.)" }, value: "11.87%" },
    ],
    lastUpdated: "2026-01-30",
    risks: [{ en: "Private securities may be illiquid and redemption rights are governed by offering documents.", tr: "Özel menkul kıymetler likit olmayabilir; itfa hakları teklif belgelerine tabidir." }, { en: "Target returns and distributions are not guaranteed.", tr: "Hedef getiriler ve dağıtımlar garanti değildir." }], verifiedAt: "2026-07-12",
  },
  {
    id: "lankin-apartment-reit", slug: "lankin-apartment-reit", managerId: "lankin-investments",
    name: { en: "Lankin Apartment REIT", tr: "Lankin Apartment REIT" },
    shortName: { en: "Lankin Apartment REIT", tr: "Lankin Apartment REIT" },
    summary: { en: "Institutional-grade Canadian multi-family real estate with tax-efficient monthly cash distributions.", tr: "Vergi açısından verimli aylık nakit dağıtımlı, kurumsal nitelikte Kanada çok konutlu gayrimenkulü." },
    thesis: { en: "Lankin Apartment REIT is a real estate investment trust designed to provide investors with consistent monthly cash distributions and long-term capital appreciation. The fund targets newly constructed and stabilized properties within strategic rental markets across Canada, generating steady cash flow through active management in high-growth, resilient rental markets.", tr: "Lankin Apartment REIT, yatırımcılara istikrarlı aylık nakit dağıtımları ve uzun vadeli sermaye artışı sağlamak üzere tasarlanmış bir gayrimenkul yatırım ortaklığıdır. Fon, Kanada genelindeki stratejik kiralama pazarlarında yeni inşa edilmiş ve stabilize mülkleri hedefler." },
    status: "available", strategyIds: ["core-plus"], assetClassIds: ["multifamily"], regionIds: ["ontario", "alberta"], shareClassIds: ["lankin-class-a"], propertyIds: ["lankin-edmonton", "lankin-newmarket", "lankin-brampton"], documentIds: ["lankin-fact", "lankin-om", "lankin-subscription", "lankin-report"], featured: true,
    portfolioFacts: [current("3 properties", "lankin-fact-2025-q2", "2025-06-30", 1), current("529 units", "lankin-fact-2025-q2", "2025-06-30", 1), current("$205M+ AUM", "lankin-fact-2025-q2", "2025-06-30", 1)],
    fundType: { en: "Mutual Fund Trust", tr: "Mutual Fund Trust" },
    fundStatus: { en: "Offering Memorandum", tr: "Offering Memorandum" },
    inceptionDate: "2024",
    aum: current("$205M+", "lankin-fact-2025-q2", "2025-06-30", 1),
    unitsTotal: current(529, "lankin-fact-2025-q2", "2025-06-30", 1),
    managementFee: { en: "0.70% of AUM", tr: "AUM'nin %0,70'i" },
    valuationFrequency: { en: "Quarterly", tr: "Üç aylık" },
    distributionFrequency: { en: "Monthly", tr: "Aylık" },
    riskProfile: { en: "Low - Moderate", tr: "Düşük - Orta" },
    highlights: [
      { en: "Access to institutional-grade Canadian multi-family real estate.", tr: "Kurumsal nitelikte Kanada çok konutlu gayrimenkulüne erişim." },
      { en: "Long-term growth and tax-efficient monthly cash distributions.", tr: "Uzun vadeli büyüme ve vergi açısından verimli aylık nakit dağıtımları." },
      { en: "Total targeted annualized returns of 14%–18%.", tr: "Toplam hedeflenen yıllıklandırılmış getiri %14–18." },
      { en: "Targeted annualized cash distribution of $0.81 per unit, paid monthly.", tr: "Birim başına yıllık 0,81$ hedeflenen nakit dağıtımı, aylık ödenir." },
      { en: "Distribution Reinvestment Plan (DRIP) available at a 2% discount.", tr: "Dağıtım Yeniden Yatırım Planı (DRIP) %2 indirimle mevcuttur." },
    ],
    trailingReturns: [
      { period: { en: "Targeted annualized", tr: "Hedeflenen yıllıklandırılmış" }, value: "14–18%", note: { en: "Fund inception 2024; track record building.", tr: "Fon kuruluşu 2024; performans geçmişi oluşuyor." } },
    ],
    serviceProviders: { auditor: "BDO Canada LLP", legalCounsel: "Borden Ladner Gervais LLP (BLG)", appraiser: "Avison Young" },
    lastUpdated: "2025-06-30",
    risks: [{ en: "Distributions are discretionary and may change.", tr: "Dağıtımlar isteğe bağlıdır ve değişebilir." }, { en: "Private securities may have indefinite hold periods and limited liquidity.", tr: "Özel menkul kıymetlerin belirsiz bekleme süreleri ve sınırlı likiditesi olabilir." }], verifiedAt: "2026-07-12",
  },
];
