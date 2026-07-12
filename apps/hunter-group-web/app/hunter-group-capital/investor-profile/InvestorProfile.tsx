"use client";

import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLang } from "@/lib/i18n/LanguageProvider";
import type { OfferingBundle } from "@/lib/capital/types";
import styles from "./profile.module.css";

type Form = {
  offeringId: string; shareClassId: string; jurisdiction: "ontario" | "turkey-cross-border";
  firstName: string; lastName: string; email: string; phone: string; city: string;
  objective: string; horizon: string; riskTolerance: string; lossCapacity: string; liquidityNeed: string; experience: string; intendedAmount: string; accountPreference: string;
  accreditedIncome: boolean; accreditedFinancialAssets: boolean; accreditedNetAssets: boolean; eligibleIncome: boolean; eligibleNetAssets: boolean; priorOmAmount: string;
  contactConsent: boolean; accuracyConsent: boolean;
};

const GOAL_FIELDS: { key: keyof Form; options: string[] }[] = [
  { key: "objective", options: ["Income", "Growth", "Balanced income and growth", "Capital preservation"] },
  { key: "horizon", options: ["1-3 years", "3-5 years", "5+ years"] },
  { key: "riskTolerance", options: ["Conservative", "Moderate", "Growth-oriented", "Unsure"] },
  { key: "lossCapacity", options: ["Limited loss", "Some loss", "Significant loss", "Unsure"] },
  { key: "liquidityNeed", options: ["High", "Moderate", "Low"] },
  { key: "experience", options: ["New to private markets", "Some private market experience", "Experienced private market investor"] },
  { key: "intendedAmount", options: ["Under $10k", "$10k-$25k", "$25k-$100k", "$100k+"] },
  { key: "accountPreference", options: ["Non-registered", "Registered account", "Corporate/entity", "Unsure"] },
];

const CHECK_FIELDS: (keyof Form)[] = [
  "accreditedIncome",
  "accreditedFinancialAssets",
  "accreditedNetAssets",
  "eligibleIncome",
  "eligibleNetAssets",
];

export function InvestorProfile({ offerings }: { offerings: OfferingBundle[] }) {
  const params = useSearchParams();
  const { lang, t } = useLang();
  const p = t.capitalApp.profile;
  const opt = (value: string) => p.options[value] ?? value;

  const initialOffering = offerings.find((o) => o.slug === params.get("offering")) ?? offerings[0];
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [result, setResult] = useState<{ preliminaryCategory: string; warnings: string[] }>();
  const [form, setForm] = useState<Form>({ offeringId: initialOffering.id, shareClassId: params.get("shareClass") ?? initialOffering.shareClasses[0]?.id ?? "", jurisdiction: "ontario", firstName: "", lastName: "", email: "", phone: "", city: "", objective: "Balanced income and growth", horizon: "5+ years", riskTolerance: "Moderate", lossCapacity: "Some loss", liquidityNeed: "Low", experience: "Some private market experience", intendedAmount: "$25k-$100k", accountPreference: "Non-registered", accreditedIncome: false, accreditedFinancialAssets: false, accreditedNetAssets: false, eligibleIncome: false, eligibleNetAssets: false, priorOmAmount: "$0", contactConsent: false, accuracyConsent: false });
  const offering = offerings.find((o) => o.id === form.offeringId) ?? offerings[0];

  useEffect(() => { try { const saved = localStorage.getItem("hunter-capital-readiness"); if (saved) setForm((current) => ({ ...current, ...JSON.parse(saved) })); } catch {} }, []);
  useEffect(() => { try { localStorage.setItem("hunter-capital-readiness", JSON.stringify(form)); } catch {} }, [form]);

  function update<K extends keyof Form>(key: K, value: Form[K]) { setForm((current) => ({ ...current, [key]: value })); }
  function chooseOffering(id: string) { const next = offerings.find((o) => o.id === id)!; setForm((current) => ({ ...current, offeringId: id, shareClassId: next.shareClasses[0]?.id ?? "" })); }
  async function submit(event: FormEvent) {
    event.preventDefault();
    setStatus("sending");
    const response = await fetch("/api/investor-readiness", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    if (response.ok) { const data = await response.json(); setResult(data); setStatus("success"); try { localStorage.removeItem("hunter-capital-readiness"); } catch {} } else setStatus("error");
  }

  const stepNames = p.stepNames;

  return (
    <main className={styles.page}>
      <aside className={styles.side}>
        <p className={styles.eyebrow}>{p.eyebrow}</p>
        <h1>{p.title}</h1>
        <ol className={styles.steps}>
          {stepNames.map((name, i) => (
            <li key={name} className={i === step ? styles.active : i < step ? styles.done : ""}>
              <span>{i < step ? "✓" : i + 1}</span>
              {name}
            </li>
          ))}
        </ol>
        <div className={styles.sideFund}>
          <strong>{offering.shortName[lang]}</strong>
          <small>{offering.manager.name[lang]}</small>
        </div>
      </aside>

      <form onSubmit={submit} className={styles.form}>
        <header className={styles.progress}>
          <span>{p.stepLabel} {step + 1} / {stepNames.length}</span>
          <b>{Math.round(((step + 1) / stepNames.length) * 100)}%</b>
        </header>

        {step === 0 && (
          <section className={styles.section}>
            <p className={styles.sectionIntro}>{p.offeringIntro}</p>
            <div className={styles.offerChoices}>
              {offerings.map((item) => (
                <button type="button" key={item.id} className={item.id === form.offeringId ? styles.selected : ""} onClick={() => chooseOffering(item.id)}>
                  <span>{item.manager.headquarters.city}</span>
                  <strong>{item.shortName[lang]}</strong>
                  <small>{item.summary[lang]}</small>
                </button>
              ))}
            </div>
            <label className={styles.field}>
              <span>{p.labels.shareClass}</span>
              <select value={form.shareClassId} onChange={(e) => update("shareClassId", e.target.value)}>
                {offering.shareClasses.map((item) => (
                  <option value={item.id} key={item.id}>{item.name}</option>
                ))}
              </select>
            </label>
          </section>
        )}

        {step === 1 && (
          <section className={styles.section}>
            <p className={styles.sectionIntro}>{p.jurisdictionIntro}</p>
            <div className={styles.jurisdictions}>
              <button type="button" className={form.jurisdiction === "ontario" ? styles.selected : ""} onClick={() => update("jurisdiction", "ontario")}>
                <strong>Ontario</strong>
                <small>{p.ontarioTitle}</small>
              </button>
              <button type="button" className={form.jurisdiction === "turkey-cross-border" ? styles.selected : ""} onClick={() => update("jurisdiction", "turkey-cross-border")}>
                <strong>{p.turkeyTitle}</strong>
                <small>{p.turkeySub}</small>
              </button>
            </div>
            <label className={styles.field}>
              <span>{p.labels.city}</span>
              <input required value={form.city} onChange={(e) => update("city", e.target.value)} />
            </label>
          </section>
        )}

        {step === 2 && (
          <section className={styles.section}>
            <p className={styles.sectionIntro}>{p.goalsIntro}</p>
            <div className={styles.grid}>
              {GOAL_FIELDS.map(({ key, options }) => (
                <label key={key} className={styles.field}>
                  <span>{p.labels[key as keyof typeof p.labels]}</span>
                  <select value={form[key] as string} onChange={(e) => update(key, e.target.value as never)}>
                    {options.map((o) => (
                      <option key={o} value={o}>{opt(o)}</option>
                    ))}
                  </select>
                </label>
              ))}
            </div>
          </section>
        )}

        {step === 3 && (
          <section className={styles.section}>
            <p className={styles.sectionIntro}>{form.jurisdiction === "ontario" ? p.ontarioIntro : p.crossBorderIntro}</p>
            {form.jurisdiction === "ontario" ? (
              <div className={styles.checks}>
                {CHECK_FIELDS.map((key) => (
                  <label key={key}>
                    <input type="checkbox" checked={form[key] as boolean} onChange={(e) => update(key, e.target.checked as never)} />
                    <span>{p.checks[key as keyof typeof p.checks]}</span>
                  </label>
                ))}
                <label className={styles.field}>
                  <span>{p.labels.priorOm}</span>
                  <select value={form.priorOmAmount} onChange={(e) => update("priorOmAmount", e.target.value)}>
                    {["$0", "Under $10k", "$10k-$30k", "Over $30k"].map((o) => (
                      <option key={o} value={o}>{opt(o)}</option>
                    ))}
                  </select>
                </label>
              </div>
            ) : (
              <div className={styles.notice}>
                <strong>{p.manualTitle}</strong>
                <p>{p.manualText}</p>
              </div>
            )}
          </section>
        )}

        {step === 4 && (
          <section className={styles.section}>
            <p className={styles.sectionIntro}>{p.contactIntro}</p>
            <div className={styles.grid}>
              <label className={styles.field}><span>{p.labels.firstName}</span><input required value={form.firstName} onChange={(e) => update("firstName", e.target.value)} /></label>
              <label className={styles.field}><span>{p.labels.lastName}</span><input required value={form.lastName} onChange={(e) => update("lastName", e.target.value)} /></label>
              <label className={styles.field}><span>{p.labels.email}</span><input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} /></label>
              <label className={styles.field}><span>{p.labels.phone}</span><input value={form.phone} onChange={(e) => update("phone", e.target.value)} /></label>
            </div>
            <div className={styles.checks}>
              <label><input required type="checkbox" checked={form.contactConsent} onChange={(e) => update("contactConsent", e.target.checked)} /><span>{p.contactConsent}</span></label>
              <label><input required type="checkbox" checked={form.accuracyConsent} onChange={(e) => update("accuracyConsent", e.target.checked)} /><span>{p.accuracyConsent}</span></label>
            </div>
            {status === "success" && result ? (
              <div className={styles.result}>
                <strong>{result.preliminaryCategory.replaceAll("-", " ")}</strong>
                {result.warnings.map((w) => <p key={w}>{w}</p>)}
              </div>
            ) : (
              <button className={styles.submit} disabled={status === "sending"}>{status === "sending" ? p.submitting : p.submit}</button>
            )}
            {status === "error" && <p className={styles.errorMsg}>{p.error}</p>}
          </section>
        )}

        <footer className={styles.nav}>
          <button type="button" disabled={step === 0 || status === "success"} onClick={() => setStep((s) => s - 1)}>← {lang === "tr" ? "Geri" : "Back"}</button>
          {step < 4 && <button type="button" onClick={() => setStep((s) => s + 1)}>{lang === "tr" ? "Devam" : "Continue"} →</button>}
        </footer>
      </form>
    </main>
  );
}
