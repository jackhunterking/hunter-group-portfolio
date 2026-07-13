"use client";

import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Check } from "lucide-react";
import { useLang } from "@/lib/i18n/LanguageProvider";
import type { OfferingBundle } from "@/lib/capital/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";

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

const selectCls =
  "h-10 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-xs outline-none transition focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50";
const choiceCls =
  "flex flex-col gap-1.5 rounded-lg border bg-muted/40 p-4 text-left transition-colors hover:border-border";

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
  const pct = Math.round(((step + 1) / stepNames.length) * 100);

  return (
    <div className="grid items-start gap-6 md:grid-cols-[280px_minmax(0,1fr)]">
      {/* Stepper */}
      <aside className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 md:sticky md:top-20">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-gold">{p.eyebrow}</p>
        <h1 className="font-serif text-xl font-semibold leading-tight text-foreground">{p.title}</h1>
        <ol className="flex flex-col gap-0.5 max-md:hidden">
          {stepNames.map((name, i) => (
            <li key={name} className={cn(
              "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm",
              i === step ? "bg-secondary/60 font-semibold text-primary" : i < step ? "text-foreground" : "text-muted-foreground",
            )}>
              <span className={cn(
                "grid size-6 shrink-0 place-items-center rounded-full border text-[11px] font-semibold",
                i === step ? "border-primary bg-primary text-primary-foreground" : i < step ? "border-foreground bg-foreground text-background" : "border-border",
              )}>
                {i < step ? <Check className="size-3" /> : i + 1}
              </span>
              {name}
            </li>
          ))}
        </ol>
        <div className="flex flex-col gap-0.5 border-t border-border pt-3 max-md:hidden">
          <strong className="font-serif text-[17px] text-foreground">{offering.shortName[lang]}</strong>
          <small className="text-xs text-muted-foreground">{offering.manager.name[lang]}</small>
        </div>
      </aside>

      {/* Form */}
      <form onSubmit={submit} className="overflow-hidden rounded-xl border border-border bg-card">
        <header className="flex flex-col gap-2 border-b border-border px-5 py-4">
          <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
            <span>{p.stepLabel} {step + 1} / {stepNames.length}</span>
            <b className="text-primary">{pct}%</b>
          </div>
          <Progress value={pct} className="h-1.5" />
        </header>

        <div className="flex flex-col gap-5 p-5">
          {step === 0 && (
            <section className="flex flex-col gap-4">
              <p className="text-[15px] leading-relaxed text-muted-foreground">{p.offeringIntro}</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {offerings.map((item) => (
                  <button type="button" key={item.id} onClick={() => chooseOffering(item.id)}
                    className={cn(choiceCls, item.id === form.offeringId ? "border-primary bg-secondary/60" : "border-border")}>
                    <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground">{item.manager.headquarters.city}</span>
                    <strong className="font-serif text-lg text-foreground">{item.shortName[lang]}</strong>
                    <small className="text-[13px] leading-snug text-muted-foreground">{item.summary[lang]}</small>
                  </button>
                ))}
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>{p.labels.shareClass}</Label>
                <select className={selectCls} value={form.shareClassId} onChange={(e) => update("shareClassId", e.target.value)}>
                  {offering.shareClasses.map((item) => <option value={item.id} key={item.id}>{item.name}</option>)}
                </select>
              </div>
            </section>
          )}

          {step === 1 && (
            <section className="flex flex-col gap-4">
              <p className="text-[15px] leading-relaxed text-muted-foreground">{p.jurisdictionIntro}</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <button type="button" onClick={() => update("jurisdiction", "ontario")} className={cn(choiceCls, form.jurisdiction === "ontario" ? "border-primary bg-secondary/60" : "border-border")}>
                  <strong className="font-serif text-lg text-foreground">Ontario</strong>
                  <small className="text-[13px] text-muted-foreground">{p.ontarioTitle}</small>
                </button>
                <button type="button" onClick={() => update("jurisdiction", "turkey-cross-border")} className={cn(choiceCls, form.jurisdiction === "turkey-cross-border" ? "border-primary bg-secondary/60" : "border-border")}>
                  <strong className="font-serif text-lg text-foreground">{p.turkeyTitle}</strong>
                  <small className="text-[13px] text-muted-foreground">{p.turkeySub}</small>
                </button>
              </div>
              <div className="flex max-w-xs flex-col gap-1.5">
                <Label htmlFor="city">{p.labels.city}</Label>
                <Input id="city" required value={form.city} onChange={(e) => update("city", e.target.value)} />
              </div>
            </section>
          )}

          {step === 2 && (
            <section className="flex flex-col gap-4">
              <p className="text-[15px] leading-relaxed text-muted-foreground">{p.goalsIntro}</p>
              <div className="grid gap-4 sm:grid-cols-2">
                {GOAL_FIELDS.map(({ key, options }) => (
                  <div key={key} className="flex flex-col gap-1.5">
                    <Label>{p.labels[key as keyof typeof p.labels]}</Label>
                    <select className={selectCls} value={form[key] as string} onChange={(e) => update(key, e.target.value as never)}>
                      {options.map((o) => <option key={o} value={o}>{opt(o)}</option>)}
                    </select>
                  </div>
                ))}
              </div>
            </section>
          )}

          {step === 3 && (
            <section className="flex flex-col gap-4">
              <p className="text-[15px] leading-relaxed text-muted-foreground">{form.jurisdiction === "ontario" ? p.ontarioIntro : p.crossBorderIntro}</p>
              {form.jurisdiction === "ontario" ? (
                <div className="flex flex-col gap-2.5">
                  {CHECK_FIELDS.map((key) => (
                    <label key={key} className="flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-muted/40 p-3.5">
                      <Checkbox checked={form[key] as boolean} onCheckedChange={(v) => update(key, (v === true) as never)} className="mt-0.5" />
                      <span className="text-sm leading-snug text-foreground">{p.checks[key as keyof typeof p.checks]}</span>
                    </label>
                  ))}
                  <div className="flex max-w-xs flex-col gap-1.5">
                    <Label>{p.labels.priorOm}</Label>
                    <select className={selectCls} value={form.priorOmAmount} onChange={(e) => update("priorOmAmount", e.target.value)}>
                      {["$0", "Under $10k", "$10k-$30k", "Over $30k"].map((o) => <option key={o} value={o}>{opt(o)}</option>)}
                    </select>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl border border-border bg-secondary/50 p-5">
                  <strong className="font-serif text-lg text-foreground">{p.manualTitle}</strong>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.manualText}</p>
                </div>
              )}
            </section>
          )}

          {step === 4 && (
            <section className="flex flex-col gap-4">
              <p className="text-[15px] leading-relaxed text-muted-foreground">{p.contactIntro}</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5"><Label htmlFor="fn">{p.labels.firstName}</Label><Input id="fn" required value={form.firstName} onChange={(e) => update("firstName", e.target.value)} /></div>
                <div className="flex flex-col gap-1.5"><Label htmlFor="ln">{p.labels.lastName}</Label><Input id="ln" required value={form.lastName} onChange={(e) => update("lastName", e.target.value)} /></div>
                <div className="flex flex-col gap-1.5"><Label htmlFor="em">{p.labels.email}</Label><Input id="em" required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} /></div>
                <div className="flex flex-col gap-1.5"><Label htmlFor="ph">{p.labels.phone}</Label><Input id="ph" value={form.phone} onChange={(e) => update("phone", e.target.value)} /></div>
              </div>
              <div className="flex flex-col gap-2.5">
                <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-muted/40 p-3.5">
                  <Checkbox required checked={form.contactConsent} onCheckedChange={(v) => update("contactConsent", (v === true))} className="mt-0.5" />
                  <span className="text-sm leading-snug text-foreground">{p.contactConsent}</span>
                </label>
                <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-muted/40 p-3.5">
                  <Checkbox required checked={form.accuracyConsent} onCheckedChange={(v) => update("accuracyConsent", (v === true))} className="mt-0.5" />
                  <span className="text-sm leading-snug text-foreground">{p.accuracyConsent}</span>
                </label>
              </div>
              {status === "success" && result ? (
                <div className="rounded-xl border border-border bg-secondary/50 p-5">
                  <strong className="font-serif text-lg capitalize text-foreground">{result.preliminaryCategory.replaceAll("-", " ")}</strong>
                  {result.warnings.map((w) => <p key={w} className="mt-2 text-sm leading-relaxed text-muted-foreground">{w}</p>)}
                </div>
              ) : (
                <Button type="submit" disabled={status === "sending"} className="w-full">{status === "sending" ? p.submitting : p.submit}</Button>
              )}
              {status === "error" && <p className="text-sm text-destructive">{p.error}</p>}
            </section>
          )}
        </div>

        <footer className="flex justify-between border-t border-border px-5 py-4">
          <Button type="button" variant="outline" disabled={step === 0 || status === "success"} onClick={() => setStep((s) => s - 1)}>
            ← {lang === "tr" ? "Geri" : "Back"}
          </Button>
          {step < 4 && (
            <Button type="button" onClick={() => setStep((s) => s + 1)}>{lang === "tr" ? "Devam" : "Continue"} →</Button>
          )}
        </footer>
      </form>
    </div>
  );
}
