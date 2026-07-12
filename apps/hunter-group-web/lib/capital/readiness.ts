export const READINESS_RULESET = {
  id: "ontario-ni-45-106-2026-07",
  effectiveDate: "2026-07-12",
  sources: [
    "National Instrument 45-106 Prospectus Exemptions",
    "OSC Companion Policy 45-106CP",
  ],
  omLimits: { nonEligible: 10000, eligible: 30000, eligibleWithAdvice: 100000 },
};

export type PreliminaryCategory = "potentially-accredited" | "potentially-eligible" | "potentially-non-eligible" | "manual-review";

export function classifyOntario(input: {
  accreditedIncome: boolean;
  accreditedFinancialAssets: boolean;
  accreditedNetAssets: boolean;
  eligibleIncome: boolean;
  eligibleNetAssets: boolean;
}): PreliminaryCategory {
  if (input.accreditedIncome || input.accreditedFinancialAssets || input.accreditedNetAssets) return "potentially-accredited";
  if (input.eligibleIncome || input.eligibleNetAssets) return "potentially-eligible";
  return "potentially-non-eligible";
}
