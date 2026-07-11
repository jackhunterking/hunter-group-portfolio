"use client";

import { type FormEvent, type ReactNode, useState } from "react";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useLang } from "@/lib/i18n/LanguageProvider";
import styles from "./page.module.css";

type Lang = "tr" | "en";
type Status = "idle" | "submitting" | "success" | "error";
type CapitalContent = {
  heroEyebrow: string;
  heroTitle: string;
  heroSub: string;
  heroNote: string;
  primaryCta: string;
  secondaryCta: string;
  thesisEyebrow: string;
  thesisTitle: string;
  thesis: string;
  pillars: Array<{ title: string; text: string }>;
  officesEyebrow: string;
  officesTitle: string;
  offices: Array<{ city: string; text: string }>;
  productsEyebrow: string;
  productsTitle: string;
  products: Array<{ name: string; source: string; facts: string[] }>;
  workflowEyebrow: string;
  workflowTitle: string;
  workflow: string[];
  formEyebrow: string;
  formTitle: string;
  formSub: string;
  labels: Record<string, string>;
  options: Record<string, string[]>;
  compliance: string;
};

const CONTENT: Record<Lang, CapitalContent> = {
  tr: {
    heroEyebrow: "Toronto + Istanbul · Exempt Market",
    heroTitle: "Hunter Group Capital",
    heroSub:
      "Turkish-speaking investors için Kanada gelir odaklı apartman portföyleri, private REIT ve exempt-market ürünleri.",
    heroNote:
      "Eğitim, uygunluk değerlendirmesi, ürün inceleme ve lisanslı süreç koordinasyonu tek çatı altında.",
    primaryCta: "Yatırımcı Ön Görüşmesi",
    secondaryCta: "Ürünleri İncele",
    thesisEyebrow: "Yaklaşım",
    thesisTitle: "Kira geliri üreten gerçek varlıklara disiplinli erişim.",
    thesis:
      "Canadian multifamily yatırımında odak; güçlü kiracı talebi, profesyonel işletme, düzenli raporlama ve resmi offering dokümanlarıyla yürüyen bir süreçtir.",
    pillars: [
      {
        title: "Eğitim",
        text: "Ürün yapısını, riskleri, likidite kısıtlarını ve hedeflenen getiri mantığını Türkçe ve İngilizce açıklarız.",
      },
      {
        title: "Uygunluk",
        text: "Investor profile, risk toleransı, yatırım süresi ve muafiyet durumunu KYC/KYP/suitability sürecine hazırlarız.",
      },
      {
        title: "Koordinasyon",
        text: "Offering memorandum, subscription adımları ve dealer/issuer iletişimini kontrollü şekilde takip ederiz.",
      },
    ],
    officesEyebrow: "İki Ofis, Tek Köprü",
    officesTitle: "Toronto piyasaya, Istanbul aile sermayesine yakın.",
    offices: [
      {
        city: "Toronto",
        text: "Kanada pazar ilişkileri, dealer/issuer koordinasyonu, ürün inceleme ve yatırımcı toplantıları.",
      },
      {
        city: "Istanbul",
        text: "Türk yatırımcı eğitimi, aile ofisi görüşmeleri, belge hazırlığı ve iki dilde ilişki yönetimi.",
      },
    ],
    productsEyebrow: "Ürün Eğitimi",
    productsTitle: "Apartman portföyü odaklı ürünleri kaynak dokümanlarla inceliyoruz.",
    products: [
      {
        name: "Legacy / Epiphany Legacy Investment Mutual Fund Trust",
        source: "Kaynak: Legacy Class A Fact Sheet, Jan 30, 2026; IR Presentation, Sept 2, 2025",
        facts: [
          "Western Canada secondary-market residential and commercial real estate trust.",
          "Epiphany Group asset manager; Axcess Capital Advisors investment manager.",
          "Lethbridge corporate head office; growth map includes BC, Alberta, Saskatchewan, Manitoba.",
          "Class A materials reference quarterly distributions and targeted annual total return of 12% to 15%.",
        ],
      },
      {
        name: "Lankin Apartment REIT",
        source: "Kaynak: Lankin Apartment REIT Investment Offering deck",
        facts: [
          "Toronto-based real estate private equity firm focused on Canadian multifamily assets.",
          "Portfolio examples include Ontario and Alberta apartment communities.",
          "Materials reference long-term ownership, cash distributions, and targeted annualized returns of 14% to 18%.",
          "Private securities eligibility, hold periods, liquidity limits, and official offering documents apply.",
        ],
      },
    ],
    workflowEyebrow: "Lisanslı Süreç",
    workflowTitle: "Her lead aynı disiplinle ilerler.",
    workflow: [
      "KYC bilgileri ve yatırımcı profili alınır.",
      "KYP ürün incelemesi ve doküman kontrolü yapılır.",
      "Suitability ve muafiyet uygunluğu değerlendirilir.",
      "Offering memorandum ve risk açıklamaları yatırımcıyla gözden geçirilir.",
      "Subscription süreci dealer/issuer kanalıyla takip edilir.",
    ],
    formEyebrow: "Investor Intake",
    formTitle: "Ön görüşme için profilinizi paylaşın.",
    formSub:
      "Bu form yatırım talimatı değildir. Bilgiler ilk uygunluk ve görüşme hazırlığı için alınır.",
    labels: {
      firstName: "Ad",
      lastName: "Soyad",
      email: "E-posta",
      phone: "Telefon",
      city: "Şehir",
      country: "Ülke",
      meetingPreference: "Görüşme tercihi",
      preferredLanguage: "Dil",
      investableRange: "Yaklaşık yatırım aralığı",
      timeline: "Zamanlama",
      objective: "Öncelik",
      riskComfort: "Risk konforu",
      investorStatus: "Investor statüsü",
      products: "İlgilendiğiniz ürünler",
      message: "Not",
      contactConsent:
        "Hunter Group Capital'ın benimle bu talep hakkında iletişime geçmesini kabul ediyorum.",
      documentConsent:
        "Resmi offering dokümanlarını incelemeden yatırım kararı vermemem gerektiğini anlıyorum.",
      riskConsent:
        "Hedeflenen getirilerin garanti olmadığını, private securities ürünlerinde risk ve likidite kısıtları olduğunu anlıyorum.",
      submit: "Profili Gönder",
      submitting: "Gönderiliyor",
      success: "Profil alındı. Size en kısa sürede dönüş yapacağız.",
      error: "Form gönderilemedi. Lütfen tekrar deneyin veya WhatsApp'tan yazın.",
    },
    options: {
      meetingPreference: ["Toronto", "Istanbul", "Remote"],
      preferredLanguage: ["Turkish", "English", "Both"],
      investableRange: [
        "$25k-$100k",
        "$100k-$250k",
        "$250k-$500k",
        "$500k-$1M",
        "$1M+",
      ],
      timeline: ["Now", "1-3 months", "3-6 months", "6+ months"],
      objective: ["Income", "Growth", "Balanced", "Capital preservation"],
      riskComfort: ["Conservative", "Moderate", "Growth-oriented", "Unsure"],
      investorStatus: [
        "Accredited investor",
        "Eligible investor",
        "Permitted client",
        "Unsure",
      ],
      products: [
        "Legacy / Epiphany",
        "Lankin Apartment REIT",
        "Canadian multifamily generally",
        "Direct / JV opportunities",
      ],
    },
    compliance:
      "Private real estate securities may only be available to investors who qualify under applicable prospectus exemptions. Targeted returns and distributions are not guaranteed. Product availability, suitability, fees, risks, redemption rights, liquidity limits, and subscription requirements are governed by official offering documents and the applicable dealer/issuer process. Independent legal, tax, and financial advice is recommended.",
  },
  en: {
    heroEyebrow: "Toronto + Istanbul · Exempt Market",
    heroTitle: "Hunter Group Capital",
    heroSub:
      "Canadian income-focused apartment portfolios, private REITs, and exempt-market products for Turkish-speaking investors.",
    heroNote:
      "Education, eligibility review, product diligence, and licensed-process coordination under one roof.",
    primaryCta: "Investor Intake",
    secondaryCta: "Review Products",
    thesisEyebrow: "Approach",
    thesisTitle: "Disciplined access to real assets built around rental income.",
    thesis:
      "Canadian multifamily investing should be grounded in tenant demand, professional operations, regular reporting, and official offering documents.",
    pillars: [
      {
        title: "Education",
        text: "We explain product structure, risks, liquidity limits, and targeted-return mechanics in Turkish and English.",
      },
      {
        title: "Eligibility",
        text: "We prepare investor profile, risk tolerance, time horizon, and exemption status for the KYC/KYP/suitability workflow.",
      },
      {
        title: "Coordination",
        text: "We help coordinate offering memorandum review, subscription steps, and dealer/issuer communication.",
      },
    ],
    officesEyebrow: "Two Offices, One Bridge",
    officesTitle: "Toronto close to the market, Istanbul close to family capital.",
    offices: [
      {
        city: "Toronto",
        text: "Canadian market relationships, dealer/issuer coordination, product review, and investor meetings.",
      },
      {
        city: "Istanbul",
        text: "Turkish investor education, family-office conversations, document preparation, and bilingual relationship support.",
      },
    ],
    productsEyebrow: "Product Education",
    productsTitle: "We review apartment-portfolio products from source documents.",
    products: [
      {
        name: "Legacy / Epiphany Legacy Investment Mutual Fund Trust",
        source: "Source: Legacy Class A Fact Sheet, Jan 30, 2026; IR Presentation, Sept 2, 2025",
        facts: [
          "Western Canada secondary-market residential and commercial real estate trust.",
          "Epiphany Group asset manager; Axcess Capital Advisors investment manager.",
          "Lethbridge corporate head office; growth map includes BC, Alberta, Saskatchewan, Manitoba.",
          "Class A materials reference quarterly distributions and targeted annual total return of 12% to 15%.",
        ],
      },
      {
        name: "Lankin Apartment REIT",
        source: "Source: Lankin Apartment REIT Investment Offering deck",
        facts: [
          "Toronto-based real estate private equity firm focused on Canadian multifamily assets.",
          "Portfolio examples include Ontario and Alberta apartment communities.",
          "Materials reference long-term ownership, cash distributions, and targeted annualized returns of 14% to 18%.",
          "Private securities eligibility, hold periods, liquidity limits, and official offering documents apply.",
        ],
      },
    ],
    workflowEyebrow: "Licensed Workflow",
    workflowTitle: "Every lead moves through the same discipline.",
    workflow: [
      "KYC information and investor profile are collected.",
      "KYP product review and document checks are completed.",
      "Suitability and exemption eligibility are assessed.",
      "Offering memorandum and risk disclosure are reviewed with the investor.",
      "Subscription steps are coordinated through the dealer/issuer process.",
    ],
    formEyebrow: "Investor Intake",
    formTitle: "Share your profile for an introductory review.",
    formSub:
      "This form is not an investment instruction. It prepares the first eligibility and discovery conversation.",
    labels: {
      firstName: "First name",
      lastName: "Last name",
      email: "Email",
      phone: "Phone",
      city: "City",
      country: "Country",
      meetingPreference: "Meeting preference",
      preferredLanguage: "Language",
      investableRange: "Approximate investable range",
      timeline: "Timeline",
      objective: "Priority",
      riskComfort: "Risk comfort",
      investorStatus: "Investor status",
      products: "Products of interest",
      message: "Notes",
      contactConsent:
        "I agree that Hunter Group Capital may contact me about this request.",
      documentConsent:
        "I understand I should not make an investment decision before reviewing official offering documents.",
      riskConsent:
        "I understand targeted returns are not guaranteed and private securities involve risk and liquidity limits.",
      submit: "Submit Profile",
      submitting: "Submitting",
      success: "Profile received. We will follow up shortly.",
      error: "The form could not be submitted. Please try again or message us on WhatsApp.",
    },
    options: {
      meetingPreference: ["Toronto", "Istanbul", "Remote"],
      preferredLanguage: ["Turkish", "English", "Both"],
      investableRange: [
        "$25k-$100k",
        "$100k-$250k",
        "$250k-$500k",
        "$500k-$1M",
        "$1M+",
      ],
      timeline: ["Now", "1-3 months", "3-6 months", "6+ months"],
      objective: ["Income", "Growth", "Balanced", "Capital preservation"],
      riskComfort: ["Conservative", "Moderate", "Growth-oriented", "Unsure"],
      investorStatus: [
        "Accredited investor",
        "Eligible investor",
        "Permitted client",
        "Unsure",
      ],
      products: [
        "Legacy / Epiphany",
        "Lankin Apartment REIT",
        "Canadian multifamily generally",
        "Direct / JV opportunities",
      ],
    },
    compliance:
      "Private real estate securities may only be available to investors who qualify under applicable prospectus exemptions. Targeted returns and distributions are not guaranteed. Product availability, suitability, fees, risks, redemption rights, liquidity limits, and subscription requirements are governed by official offering documents and the applicable dealer/issuer process. Independent legal, tax, and financial advice is recommended.",
  },
};

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  city: "",
  country: "",
  meetingPreference: "Toronto",
  preferredLanguage: "Turkish",
  investableRange: "$100k-$250k",
  timeline: "1-3 months",
  objective: "Income",
  riskComfort: "Moderate",
  investorStatus: "Unsure",
  interestedProducts: ["Canadian multifamily generally"],
  message: "",
  contactConsent: false,
  documentConsent: false,
  riskConsent: false,
};

export default function HunterGroupCapitalClient() {
  const { lang } = useLang();
  const c = CONTENT[lang as Lang];
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<Status>("idle");

  const update = (name: string, value: string | boolean | string[]) => {
    setForm((current) => ({ ...current, [name]: value }));
  };

  const toggleProduct = (product: string) => {
    setForm((current) => {
      const exists = current.interestedProducts.includes(product);
      return {
        ...current,
        interestedProducts: exists
          ? current.interestedProducts.filter((item) => item !== product)
          : [...current.interestedProducts, product],
      };
    });
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");

    const response = await fetch("/api/capital-intake", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      setStatus("success");
      setForm(initialForm);
      return;
    }

    setStatus("error");
  };

  return (
    <main className={styles.main}>
      <Nav overlayHero />

      <section className={styles.hero}>
        <Image
          src="/hunter-x-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay} aria-hidden="true" />
        <div className="container">
          <div className={styles.heroInner}>
            <p className={styles.eyebrow}>{c.heroEyebrow}</p>
            <h1 className={styles.heroTitle}>{c.heroTitle}</h1>
            <p className={styles.heroSub}>{c.heroSub}</p>
            <p className={styles.heroNote}>{c.heroNote}</p>
            <div className={styles.heroActions}>
              <a href="#intake" className={styles.primaryCta}>
                {c.primaryCta}
              </a>
              <a href="#products" className={styles.secondaryCta}>
                {c.secondaryCta}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.thesis}>
        <div className="container">
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>{c.thesisEyebrow}</p>
            <h2>{c.thesisTitle}</h2>
            <p>{c.thesis}</p>
          </div>
          <div className={styles.pillarGrid}>
            {c.pillars.map((pillar) => (
              <article className={styles.panel} key={pillar.title}>
                <h3>{pillar.title}</h3>
                <p>{pillar.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.offices}>
        <div className="container">
          <div className={styles.officeLayout}>
            <div>
              <p className={styles.eyebrow}>{c.officesEyebrow}</p>
              <h2>{c.officesTitle}</h2>
            </div>
            <div className={styles.officeGrid}>
              {c.offices.map((office) => (
                <article className={styles.office} key={office.city}>
                  <span>{office.city}</span>
                  <p>{office.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.products} id="products">
        <div className="container">
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>{c.productsEyebrow}</p>
            <h2>{c.productsTitle}</h2>
          </div>
          <div className={styles.productGrid}>
            {c.products.map((product) => (
              <article className={styles.productCard} key={product.name}>
                <h3>{product.name}</h3>
                <p className={styles.source}>{product.source}</p>
                <ul>
                  {product.facts.map((fact) => (
                    <li key={fact}>{fact}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.workflow}>
        <div className="container">
          <div className={styles.workflowLayout}>
            <div>
              <p className={styles.eyebrow}>{c.workflowEyebrow}</p>
              <h2>{c.workflowTitle}</h2>
            </div>
            <ol className={styles.workflowList}>
              {c.workflow.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className={styles.intake} id="intake">
        <div className="container">
          <div className={styles.intakeLayout}>
            <div className={styles.intakeCopy}>
              <p className={styles.eyebrow}>{c.formEyebrow}</p>
              <h2>{c.formTitle}</h2>
              <p>{c.formSub}</p>
              <p className={styles.complianceInline}>{c.compliance}</p>
            </div>

            <form className={styles.form} onSubmit={submit}>
              <div className={styles.twoCol}>
                <Field label={c.labels.firstName}>
                  <input
                    required
                    value={form.firstName}
                    onChange={(event) => update("firstName", event.target.value)}
                  />
                </Field>
                <Field label={c.labels.lastName}>
                  <input
                    required
                    value={form.lastName}
                    onChange={(event) => update("lastName", event.target.value)}
                  />
                </Field>
              </div>

              <div className={styles.twoCol}>
                <Field label={c.labels.email}>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(event) => update("email", event.target.value)}
                  />
                </Field>
                <Field label={c.labels.phone}>
                  <input
                    value={form.phone}
                    onChange={(event) => update("phone", event.target.value)}
                  />
                </Field>
              </div>

              <div className={styles.twoCol}>
                <Field label={c.labels.city}>
                  <input
                    required
                    value={form.city}
                    onChange={(event) => update("city", event.target.value)}
                  />
                </Field>
                <Field label={c.labels.country}>
                  <input
                    required
                    value={form.country}
                    onChange={(event) => update("country", event.target.value)}
                  />
                </Field>
              </div>

              <div className={styles.twoCol}>
                <SelectField
                  label={c.labels.meetingPreference}
                  value={form.meetingPreference}
                  options={c.options.meetingPreference}
                  onChange={(value) => update("meetingPreference", value)}
                />
                <SelectField
                  label={c.labels.preferredLanguage}
                  value={form.preferredLanguage}
                  options={c.options.preferredLanguage}
                  onChange={(value) => update("preferredLanguage", value)}
                />
              </div>

              <div className={styles.twoCol}>
                <SelectField
                  label={c.labels.investableRange}
                  value={form.investableRange}
                  options={c.options.investableRange}
                  onChange={(value) => update("investableRange", value)}
                />
                <SelectField
                  label={c.labels.timeline}
                  value={form.timeline}
                  options={c.options.timeline}
                  onChange={(value) => update("timeline", value)}
                />
              </div>

              <div className={styles.twoCol}>
                <SelectField
                  label={c.labels.objective}
                  value={form.objective}
                  options={c.options.objective}
                  onChange={(value) => update("objective", value)}
                />
                <SelectField
                  label={c.labels.riskComfort}
                  value={form.riskComfort}
                  options={c.options.riskComfort}
                  onChange={(value) => update("riskComfort", value)}
                />
              </div>

              <SelectField
                label={c.labels.investorStatus}
                value={form.investorStatus}
                options={c.options.investorStatus}
                onChange={(value) => update("investorStatus", value)}
              />

              <fieldset className={styles.checkboxGroup}>
                <legend>{c.labels.products}</legend>
                {c.options.products.map((product) => (
                  <label key={product}>
                    <input
                      type="checkbox"
                      checked={form.interestedProducts.includes(product)}
                      onChange={() => toggleProduct(product)}
                    />
                    <span>{product}</span>
                  </label>
                ))}
              </fieldset>

              <Field label={c.labels.message}>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(event) => update("message", event.target.value)}
                />
              </Field>

              <div className={styles.consentGroup}>
                {(["contactConsent", "documentConsent", "riskConsent"] as const).map(
                  (key) => (
                    <label key={key}>
                      <input
                        required
                        type="checkbox"
                        checked={form[key]}
                        onChange={(event) => update(key, event.target.checked)}
                      />
                      <span>{c.labels[key]}</span>
                    </label>
                  )
                )}
              </div>

              <button type="submit" disabled={status === "submitting"}>
                {status === "submitting" ? c.labels.submitting : c.labels.submit}
              </button>
              {status === "success" && (
                <p className={styles.success}>{c.labels.success}</p>
              )}
              {status === "error" && <p className={styles.error}>{c.labels.error}</p>}
            </form>
          </div>
        </div>
      </section>

      <section className={styles.compliance}>
        <div className="container">
          <p>{c.compliance}</p>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className={styles.field}>
      <span>{label}</span>
      {children}
    </label>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <Field label={label}>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </Field>
  );
}
