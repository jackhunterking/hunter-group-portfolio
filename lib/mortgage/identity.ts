/**
 * Real Mortgage Associates regulated identity for the Mortgage tab.
 *
 * Real Mortgage Associates publishes Brokerage Licence #10464. Jack's FSRA
 * mortgage licence number is M26001258.
 *
 * Compliance walling: this identity appears ONLY on Mortgage pages.
 * Real-estate pages keep the RE/MAX Hallmark identity. They never share a
 * disclosure block.
 */

export const RMA = {
  brokerage: "Real Mortgage Associates",
  authority: "FSRA",
  brokerageLicenceNo: "10464",
  licenceNo: "M26001258",
  /** Brokerage and Jack Hunter licence disclosure line. */
  get licenceLine() {
    return `${this.brokerage} Brokerage Licence #${this.brokerageLicenceNo} · Jack Hunter ${this.authority} Licence #${this.licenceNo}`;
  },
} as const;
