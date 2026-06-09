/**
 * HERO_RATES — manual, source-of-truth mortgage rates for the Finansman tab.
 *
 * FSRA discipline (see hunter-merged-site-build-spec.md §7 / CLAUDE.md guardrail 3):
 *   - These are entered manually and approved before publishing.
 *   - NEVER fetch, interpolate, or invent a rate.
 *   - If a tile's `rate` is null, the UI shows the `Güncelleniyor` fallback.
 *   - The disclosure modal is always rendered alongside any rate display.
 *
 * Ported from the Kredibaba source (`src/i18n/tr.js` → rates.tabs).
 * Update `asOf` whenever the numbers change.
 */

export const RATE_AS_OF = "2026-05-30";

export interface RateTile {
  /** Stable key, e.g. "3y" */
  key: string;
  /** Term label shown above the rate, e.g. "3 YIL" / "3 YR" */
  term: string;
  /** Rate string like "3.99%", or null → renders the Güncelleniyor fallback */
  rate: string | null;
  /** Optional detail line, e.g. "PRIME - 0.80%" */
  detail?: string;
}

export interface RateGroup {
  /** Which tile to surface in the compact hero summary */
  heroKey: string;
  tiles: RateTile[];
}

export interface HeroRates {
  fixed: RateGroup;
  variable: RateGroup;
}

export const HERO_RATES: HeroRates = {
  fixed: {
    heroKey: "3y",
    tiles: [
      { key: "1y", term: "1 YIL", rate: "4.69%" },
      { key: "2y", term: "2 YIL", rate: "4.00%" },
      { key: "3y", term: "3 YIL", rate: "3.99%" },
      { key: "4y", term: "4 YIL", rate: "4.09%" },
      { key: "5y", term: "5 YIL", rate: "4.14%" },
    ],
  },
  variable: {
    heroKey: "5y",
    tiles: [
      { key: "3y", term: "3 YIL", rate: "3.65%", detail: "PRIME - 0.80%" },
      { key: "5y", term: "5 YIL", rate: "3.50%", detail: "PRIME - 0.95%" },
    ],
  },
};

/** The single tile a compact summary should show for a group. */
export function heroTile(group: RateGroup): RateTile {
  return group.tiles.find((t) => t.key === group.heroKey) ?? group.tiles[0];
}
