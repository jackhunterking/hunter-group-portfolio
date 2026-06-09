"use client";

import { useState } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AdvisorStrip from "@/components/mortgage/AdvisorStrip";
import MortgageDisclosure from "@/components/mortgage/MortgageDisclosure";
import { useT } from "@/lib/i18n/LanguageProvider";
import { HERO_RATES, heroTile } from "@/lib/mortgage/rates";
import { waHref } from "@/lib/mortgage/wa";
import {
  monthlyPayment,
  affordability,
  landTransferTax,
  closingCosts,
  paymentDifference,
  fmtCAD,
} from "@/lib/mortgage/calculators";
import styles from "./araclar.module.css";

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/* ── Reusable slider field ── */
interface SliderProps {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
}

function Slider({ label, value, onChange, min, max, step, format }: SliderProps) {
  return (
    <div className={styles.field}>
      <div className={styles.fieldHead}>
        <label className={styles.fieldLabel}>{label}</label>
        <span className={styles.fieldValue}>{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={styles.range}
      />
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className={styles.toggle}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span>{label}</span>
    </label>
  );
}

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.resultRow}>
      <span className={styles.resultRowLabel}>{label}</span>
      <span className={styles.resultRowValue}>{value}</span>
    </div>
  );
}

/* ── Default starting rate from the published HERO_RATES ── */
const DEFAULT_RATE = Number(
  (heroTile(HERO_RATES.fixed).rate ?? "4.14%").replace("%", ""),
);

export default function AraclarClient() {
  const t = useT();
  const f = t.mortgage;
  const a = f.araclar;

  /* Payment calculator */
  const [price, setPrice] = useState(750000);
  const [down, setDown] = useState(150000);
  const [pRate, setPRate] = useState(DEFAULT_RATE);
  const [pYears, setPYears] = useState(25);
  const principal = Math.max(price - down, 0);
  const monthly = monthlyPayment(principal, pRate, pYears);
  const downPct = price > 0 ? Math.round((down / price) * 100) : 0;

  /* Affordability */
  const [income, setIncome] = useState(140000);
  const [debts, setDebts] = useState(600);
  const [affDown, setAffDown] = useState(150000);
  const [affRate, setAffRate] = useState(DEFAULT_RATE);
  const [affYears, setAffYears] = useState(25);
  const [propTax, setPropTax] = useState(450);
  const [heating, setHeating] = useState(150);
  const aff = affordability({
    annualIncome: income,
    monthlyDebts: debts,
    downPayment: affDown,
    ratePct: affRate,
    years: affYears,
    monthlyPropertyTax: propTax,
    monthlyHeating: heating,
  });

  /* Land transfer tax */
  const [lttPrice, setLttPrice] = useState(750000);
  const [toronto, setToronto] = useState(true);
  const [firstTime, setFirstTime] = useState(false);
  const ltt = landTransferTax(lttPrice, { toronto, firstTimeBuyer: firstTime });

  /* Closing costs */
  const [closePrice, setClosePrice] = useState(750000);
  const [closeToronto, setCloseToronto] = useState(true);
  const [closeFirstTime, setCloseFirstTime] = useState(false);
  const closing = closingCosts(closePrice, {
    toronto: closeToronto,
    firstTimeBuyer: closeFirstTime,
  });

  /* Payment difference */
  const [balance, setBalance] = useState(500000);
  const [curRate, setCurRate] = useState(5.49);
  const [newRate, setNewRate] = useState(DEFAULT_RATE);
  const [diffYears, setDiffYears] = useState(25);
  const diff = paymentDifference(balance, curRate, newRate, diffYears);

  const cad = (v: number) => fmtCAD(v);
  const pct = (v: number) => `${v}%`;
  const years = (v: number) => `${v} ${a.yearsSuffix}`;

  const whatsapp = waHref(a.whatsappText);
  const preApprovalWa = waHref(`${a.preApproval.title} — ${a.whatsappText}`);

  const index = [
    { anchor: a.payment.anchor, label: a.payment.title },
    { anchor: a.affordability.anchor, label: a.affordability.title },
    { anchor: a.ltt.anchor, label: a.ltt.title },
    { anchor: a.closing.anchor, label: a.closing.title },
    { anchor: a.paymentDiff.anchor, label: a.paymentDiff.title },
    { anchor: a.preApproval.anchor, label: a.preApproval.title },
  ];

  return (
    <main>
      <Nav overlayHero />

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <Link href="/mortgage" className={styles.back}>
              {f.backToMortgage}
            </Link>
            <span className={styles.eyebrow}>{a.label}</span>
            <h1 className={styles.title}>{a.title}</h1>
            <p className={styles.sub}>{a.sub}</p>
          </div>
        </div>
      </section>

      {/* ── Tool index ── */}
      <nav className={styles.toolIndex} aria-label={a.indexLabel}>
        <div className="container">
          <ul className={styles.indexList}>
            {index.map((item) => (
              <li key={item.anchor}>
                <a href={`#${item.anchor}`} className={styles.indexLink}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className={styles.tools}>
        <div className="container">
          {/* ── Payment calculator ── */}
          <section id={a.payment.anchor} className={styles.tool}>
            <div className={styles.toolHead}>
              <span className={styles.toolEyebrow}>{a.payment.eyebrow}</span>
              <h2 className={styles.toolTitle}>{a.payment.title}</h2>
            </div>
            <div className={styles.calc}>
              <div className={styles.inputs}>
                <Slider label={a.payment.homePrice} value={price} onChange={setPrice} min={200000} max={2500000} step={10000} format={cad} />
                <Slider label={`${a.payment.downPayment} (${downPct}%)`} value={down} onChange={setDown} min={0} max={price} step={5000} format={cad} />
                <Slider label={a.payment.interestRate} value={pRate} onChange={setPRate} min={1} max={9} step={0.05} format={(v) => `${v.toFixed(2)}%`} />
                <Slider label={a.payment.amortization} value={pYears} onChange={setPYears} min={5} max={30} step={1} format={years} />
              </div>
              <div className={styles.result}>
                <span className={styles.resultLabel}>{a.payment.estMonthly}</span>
                <div className={styles.resultBig}>
                  {cad(monthly)}
                  <span className={styles.resultUnit}>{a.perMonth}</span>
                </div>
                <div className={styles.resultRows}>
                  <ResultRow label={a.payment.sumPrincipal} value={cad(principal)} />
                  <ResultRow label={a.payment.sumDown} value={cad(down)} />
                  <ResultRow label={a.payment.sumRate} value={`${pRate.toFixed(2)}%`} />
                </div>
                <p className={styles.resultNote}>{a.estimateNote}</p>
              </div>
            </div>
          </section>

          {/* ── Affordability ── */}
          <section id={a.affordability.anchor} className={styles.tool}>
            <div className={styles.toolHead}>
              <span className={styles.toolEyebrow}>{a.affordability.eyebrow}</span>
              <h2 className={styles.toolTitle}>{a.affordability.title}</h2>
            </div>
            <div className={styles.calc}>
              <div className={styles.inputs}>
                <Slider label={a.affordability.annualIncome} value={income} onChange={setIncome} min={40000} max={500000} step={5000} format={cad} />
                <Slider label={a.affordability.monthlyDebts} value={debts} onChange={setDebts} min={0} max={5000} step={50} format={cad} />
                <Slider label={a.affordability.downPayment} value={affDown} onChange={setAffDown} min={0} max={1000000} step={5000} format={cad} />
                <Slider label={a.affordability.interestRate} value={affRate} onChange={setAffRate} min={1} max={9} step={0.05} format={(v) => `${v.toFixed(2)}%`} />
                <Slider label={a.affordability.amortization} value={affYears} onChange={setAffYears} min={5} max={30} step={1} format={years} />
                <Slider label={a.affordability.propertyTax} value={propTax} onChange={setPropTax} min={0} max={1500} step={25} format={cad} />
                <Slider label={a.affordability.heating} value={heating} onChange={setHeating} min={0} max={500} step={10} format={cad} />
              </div>
              <div className={styles.result}>
                <span className={styles.resultLabel}>{a.affordability.maxPrice}</span>
                <div className={styles.resultBig}>{cad(aff.maxPrice)}</div>
                <div className={styles.resultRows}>
                  <ResultRow label={a.affordability.maxMortgage} value={cad(aff.maxMortgage)} />
                  <ResultRow label={a.affordability.maxPayment} value={`${cad(aff.maxMonthlyPayment)}${a.perMonth}`} />
                </div>
                <p className={styles.resultNote}>
                  {a.affordability.qualifyingNote.replace("{rate}", aff.qualifyingRate.toFixed(2))}
                </p>
              </div>
            </div>
          </section>

          {/* ── Land transfer tax ── */}
          <section id={a.ltt.anchor} className={styles.tool}>
            <div className={styles.toolHead}>
              <span className={styles.toolEyebrow}>{a.ltt.eyebrow}</span>
              <h2 className={styles.toolTitle}>{a.ltt.title}</h2>
            </div>
            <div className={styles.calc}>
              <div className={styles.inputs}>
                <Slider label={a.ltt.price} value={lttPrice} onChange={setLttPrice} min={200000} max={3000000} step={10000} format={cad} />
                <Toggle label={a.ltt.torontoToggle} checked={toronto} onChange={setToronto} />
                <Toggle label={a.ltt.firstTimeToggle} checked={firstTime} onChange={setFirstTime} />
              </div>
              <div className={styles.result}>
                <span className={styles.resultLabel}>{a.ltt.total}</span>
                <div className={styles.resultBig}>{cad(ltt.total)}</div>
                <div className={styles.resultRows}>
                  <ResultRow label={a.ltt.ontarioLine} value={cad(ltt.ontario)} />
                  {toronto ? <ResultRow label={a.ltt.torontoLine} value={cad(ltt.toronto)} /> : null}
                  {ltt.rebate > 0 ? <ResultRow label={a.ltt.rebateLine} value={`− ${cad(ltt.rebate)}`} /> : null}
                </div>
                <p className={styles.resultNote}>{a.ltt.note}</p>
              </div>
            </div>
          </section>

          {/* ── Closing costs ── */}
          <section id={a.closing.anchor} className={styles.tool}>
            <div className={styles.toolHead}>
              <span className={styles.toolEyebrow}>{a.closing.eyebrow}</span>
              <h2 className={styles.toolTitle}>{a.closing.title}</h2>
            </div>
            <div className={styles.calc}>
              <div className={styles.inputs}>
                <Slider label={a.closing.price} value={closePrice} onChange={setClosePrice} min={200000} max={3000000} step={10000} format={cad} />
                <Toggle label={a.ltt.torontoToggle} checked={closeToronto} onChange={setCloseToronto} />
                <Toggle label={a.ltt.firstTimeToggle} checked={closeFirstTime} onChange={setCloseFirstTime} />
              </div>
              <div className={styles.result}>
                <span className={styles.resultLabel}>{a.closing.total}</span>
                <div className={styles.resultBig}>{cad(closing.total)}</div>
                <div className={styles.resultRows}>
                  <ResultRow label={a.closing.lttLine} value={cad(closing.landTransfer)} />
                  <ResultRow label={a.closing.legalLine} value={cad(closing.legal)} />
                  <ResultRow label={a.closing.titleLine} value={cad(closing.titleInsurance)} />
                  <ResultRow label={a.closing.inspectionLine} value={cad(closing.inspection)} />
                  <ResultRow label={a.closing.appraisalLine} value={cad(closing.appraisal)} />
                </div>
                <p className={styles.resultNote}>{a.closing.note}</p>
              </div>
            </div>
          </section>

          {/* ── Payment difference ── */}
          <section id={a.paymentDiff.anchor} className={styles.tool}>
            <div className={styles.toolHead}>
              <span className={styles.toolEyebrow}>{a.paymentDiff.eyebrow}</span>
              <h2 className={styles.toolTitle}>{a.paymentDiff.title}</h2>
            </div>
            <div className={styles.calc}>
              <div className={styles.inputs}>
                <Slider label={a.paymentDiff.balance} value={balance} onChange={setBalance} min={50000} max={2000000} step={10000} format={cad} />
                <Slider label={a.paymentDiff.currentRate} value={curRate} onChange={setCurRate} min={1} max={9} step={0.05} format={(v) => `${v.toFixed(2)}%`} />
                <Slider label={a.paymentDiff.newRate} value={newRate} onChange={setNewRate} min={1} max={9} step={0.05} format={(v) => `${v.toFixed(2)}%`} />
                <Slider label={a.paymentDiff.amortization} value={diffYears} onChange={setDiffYears} min={5} max={30} step={1} format={years} />
              </div>
              <div className={styles.result}>
                <span className={styles.resultLabel}>{a.paymentDiff.monthlyDiff}</span>
                <div className={styles.resultBig}>
                  {cad(Math.abs(diff.monthlyDelta))}
                  <span className={styles.resultUnit}>
                    {a.perMonth} {diff.monthlyDelta <= 0 ? a.paymentDiff.savesLabel : a.paymentDiff.costsLabel}
                  </span>
                </div>
                <div className={styles.resultRows}>
                  <ResultRow label={a.paymentDiff.currentPayment} value={`${cad(diff.current)}${a.perMonth}`} />
                  <ResultRow label={a.paymentDiff.newPayment} value={`${cad(diff.proposed)}${a.perMonth}`} />
                  <ResultRow label={a.paymentDiff.annualDiff} value={`${diff.annualDelta <= 0 ? "− " : "+ "}${cad(Math.abs(diff.annualDelta))}`} />
                </div>
                <p className={styles.resultNote}>{a.estimateNote}</p>
              </div>
            </div>
          </section>

          {/* ── Pre-approval (a step, not a calculator) ── */}
          <section id={a.preApproval.anchor} className={styles.preApproval}>
            <span className={styles.toolEyebrow}>{a.preApproval.eyebrow}</span>
            <h2 className={styles.toolTitle}>{a.preApproval.title}</h2>
            <p className={styles.preApprovalBody}>{a.preApproval.body}</p>
            <a href={preApprovalWa} target="_blank" rel="noopener noreferrer" className={styles.primaryBtn}>
              <WhatsAppIcon />
              {a.preApproval.cta}
            </a>
          </section>
        </div>
      </div>

      {/* ── Advisor strip ── */}
      <AdvisorStrip />

      {/* ── CTA band ── */}
      <section className={styles.cta}>
        <div className="container">
          <div className={styles.ctaInner}>
            <h2 className={styles.ctaTitle}>{a.cta.title}</h2>
            <p className={styles.ctaSub}>{a.cta.sub}</p>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={styles.primaryBtn}>
              <WhatsAppIcon />
              {a.cta.whatsappBtn}
            </a>
          </div>
        </div>
      </section>

      <MortgageDisclosure />
      <Footer />
    </main>
  );
}
