/**
 * Mortgage calculator math — pure, framework-free functions.
 *
 * These power the /mortgage/araclar tools. They produce ESTIMATES ONLY:
 * none of this is a credit approval, qualification, or rate/cost guarantee
 * (CLAUDE.md guardrail 3 / spec §6–7). Every figure a user sees is rendered
 * alongside a plain-language "estimate only" note.
 *
 * ⚠️ Launch-blocking: the Ontario / Toronto land-transfer brackets, the
 * first-time-buyer rebate caps, and the default closing-cost assumptions below
 * are point-in-time public figures and must be confirmed by the RMA principal
 * broker before public launch. They are isolated here so they are easy to audit.
 */

/* ──────────────────────────────────────────────────────────────────────────
 * Mortgage payment
 * ────────────────────────────────────────────────────────────────────────── */

/** Standard amortized monthly payment. annualRatePct is e.g. 4.14 (percent). */
export function monthlyPayment(
  principal: number,
  annualRatePct: number,
  years: number,
): number {
  const r = annualRatePct / 100 / 12;
  const n = years * 12;
  if (n <= 0) return 0;
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

/** Inverse of monthlyPayment: the mortgage a given monthly payment supports. */
export function mortgageFromPayment(
  payment: number,
  annualRatePct: number,
  years: number,
): number {
  const r = annualRatePct / 100 / 12;
  const n = years * 12;
  if (n <= 0 || payment <= 0) return 0;
  if (r === 0) return payment * n;
  return (payment * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n));
}

/* ──────────────────────────────────────────────────────────────────────────
 * Land transfer tax — Ontario provincial + Toronto municipal (MLTT)
 * Brackets as published; confirm before launch.
 * ────────────────────────────────────────────────────────────────────────── */

interface Bracket {
  upTo: number | null; // null = no upper bound
  rate: number; // e.g. 0.005
}

/** Ontario provincial LTT (residential, 1–2 single-family residences). */
const ONTARIO_BRACKETS: Bracket[] = [
  { upTo: 55000, rate: 0.005 },
  { upTo: 250000, rate: 0.01 },
  { upTo: 400000, rate: 0.015 },
  { upTo: 2000000, rate: 0.02 },
  { upTo: null, rate: 0.025 },
];

/** Toronto municipal LTT (MLTT), incl. 2024 luxury tiers above $3M. */
const TORONTO_BRACKETS: Bracket[] = [
  { upTo: 55000, rate: 0.005 },
  { upTo: 250000, rate: 0.01 },
  { upTo: 400000, rate: 0.015 },
  { upTo: 2000000, rate: 0.02 },
  { upTo: 3000000, rate: 0.025 },
  { upTo: 4000000, rate: 0.035 },
  { upTo: 5000000, rate: 0.045 },
  { upTo: 10000000, rate: 0.055 },
  { upTo: 20000000, rate: 0.065 },
  { upTo: null, rate: 0.075 },
];

/** First-time buyer rebate caps. */
export const REBATE = {
  ontario: 4000,
  toronto: 4475,
};

function bracketTax(price: number, brackets: Bracket[]): number {
  let tax = 0;
  let lower = 0;
  for (const b of brackets) {
    const upper = b.upTo ?? Infinity;
    if (price > lower) {
      const taxable = Math.min(price, upper) - lower;
      tax += taxable * b.rate;
    }
    lower = upper;
    if (price <= upper) break;
  }
  return tax;
}

export interface LandTransferOpts {
  /** Property is in the City of Toronto (adds municipal LTT). */
  toronto: boolean;
  /** Eligible first-time buyer (applies provincial + Toronto rebates). */
  firstTimeBuyer: boolean;
}

export interface LandTransferResult {
  ontario: number;
  toronto: number;
  rebate: number;
  total: number;
}

export function landTransferTax(
  price: number,
  opts: LandTransferOpts,
): LandTransferResult {
  const p = Math.max(price, 0);
  const ontario = bracketTax(p, ONTARIO_BRACKETS);
  const toronto = opts.toronto ? bracketTax(p, TORONTO_BRACKETS) : 0;

  let rebate = 0;
  if (opts.firstTimeBuyer) {
    rebate += Math.min(ontario, REBATE.ontario);
    if (opts.toronto) rebate += Math.min(toronto, REBATE.toronto);
  }

  const total = Math.max(ontario + toronto - rebate, 0);
  return { ontario, toronto, rebate, total };
}

/* ──────────────────────────────────────────────────────────────────────────
 * Closing costs estimate
 * Default flat assumptions are typical GTA figures; confirm before launch.
 * ────────────────────────────────────────────────────────────────────────── */

export const CLOSING_DEFAULTS = {
  legal: 1800, // lawyer fees + disbursements
  titleInsurance: 450,
  inspection: 500,
  appraisal: 350,
};

export interface ClosingResult {
  landTransfer: number;
  legal: number;
  titleInsurance: number;
  inspection: number;
  appraisal: number;
  total: number;
}

export function closingCosts(
  price: number,
  opts: LandTransferOpts,
): ClosingResult {
  const ltt = landTransferTax(price, opts).total;
  const { legal, titleInsurance, inspection, appraisal } = CLOSING_DEFAULTS;
  const total = ltt + legal + titleInsurance + inspection + appraisal;
  return {
    landTransfer: ltt,
    legal,
    titleInsurance,
    inspection,
    appraisal,
    total,
  };
}

/* ──────────────────────────────────────────────────────────────────────────
 * Affordability estimate (GDS/TDS with stress-test qualifying rate)
 * ────────────────────────────────────────────────────────────────────────── */

/** Canadian mortgage stress test: qualify at the greater of contract+2% or 5.25%. */
export function qualifyingRate(contractRatePct: number): number {
  return Math.max(contractRatePct + 2, 5.25);
}

const GDS_LIMIT = 0.39;
const TDS_LIMIT = 0.44;

export interface AffordabilityInput {
  annualIncome: number;
  monthlyDebts: number;
  downPayment: number;
  ratePct: number;
  years: number;
  monthlyPropertyTax: number;
  monthlyHeating: number;
}

export interface AffordabilityResult {
  maxPrice: number;
  maxMortgage: number;
  qualifyingRate: number;
  maxMonthlyPayment: number;
}

export function affordability(input: AffordabilityInput): AffordabilityResult {
  const {
    annualIncome,
    monthlyDebts,
    downPayment,
    ratePct,
    years,
    monthlyPropertyTax,
    monthlyHeating,
  } = input;

  const qr = qualifyingRate(ratePct);
  const monthlyIncome = annualIncome / 12;

  // Allowance for principal+interest+tax+heat under each ratio.
  const gdsRoom = monthlyIncome * GDS_LIMIT;
  const tdsRoom = monthlyIncome * TDS_LIMIT - monthlyDebts;
  const maxPITH = Math.max(Math.min(gdsRoom, tdsRoom), 0);

  // Strip out tax + heat to leave principal + interest.
  const maxPI = Math.max(maxPITH - monthlyPropertyTax - monthlyHeating, 0);

  const maxMortgage = mortgageFromPayment(maxPI, qr, years);
  const maxPrice = maxMortgage + Math.max(downPayment, 0);

  return {
    maxPrice,
    maxMortgage,
    qualifyingRate: qr,
    maxMonthlyPayment: maxPI,
  };
}

/* ──────────────────────────────────────────────────────────────────────────
 * Payment difference — compare a current vs. a new scenario
 * ────────────────────────────────────────────────────────────────────────── */

export interface PaymentDiffResult {
  current: number;
  proposed: number;
  monthlyDelta: number; // proposed - current (negative = savings)
  annualDelta: number;
}

export function paymentDifference(
  balance: number,
  currentRatePct: number,
  newRatePct: number,
  years: number,
): PaymentDiffResult {
  const current = monthlyPayment(balance, currentRatePct, years);
  const proposed = monthlyPayment(balance, newRatePct, years);
  const monthlyDelta = proposed - current;
  return {
    current,
    proposed,
    monthlyDelta,
    annualDelta: monthlyDelta * 12,
  };
}

/* ──────────────────────────────────────────────────────────────────────────
 * Formatting helpers
 * ────────────────────────────────────────────────────────────────────────── */

export function fmtCAD(n: number): string {
  return "$" + Math.round(n).toLocaleString("en-CA");
}

export function fmtPct(n: number, decimals = 2): string {
  return `${n.toFixed(decimals)}%`;
}
