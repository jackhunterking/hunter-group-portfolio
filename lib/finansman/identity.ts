/**
 * RMA Mortgage regulated identity for the Finansman tab.
 *
 * These are the launch-ready values carried over from the Kredibaba source
 * (src/theme.jsx: BROKERAGE = "RMA Mortgage", licence 10464).
 *
 * NOTE on regulator: the Kredibaba constant read "FSCO Licence # 10464", but
 * FSCO was folded into FSRA in 2019 and all of Kredibaba's prose disclosures
 * say "FSRA". We use FSRA here to stay current and internally consistent.
 * → Confirm the exact FSRA brokerage licence number with the RMA principal
 *   broker before public launch (CLAUDE.md / spec §7).
 *
 * Compliance walling (spec §8): this identity appears ONLY on Finansman pages.
 * Real-estate pages keep the RE/MAX Hallmark identity. They never share a
 * disclosure block.
 */

export const RMA = {
  brokerage: "RMA Mortgage",
  authority: "FSRA",
  licenceNo: "10464",
  /** Convenience: "FSRA Licence No: 10464" */
  get licenceLine() {
    return `${this.authority} Licence No: ${this.licenceNo}`;
  },
} as const;
