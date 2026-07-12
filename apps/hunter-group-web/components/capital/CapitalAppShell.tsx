"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { getOfferingBySlug } from "@/lib/capital/repository";
import styles from "./capital-app.module.css";

const BASE = "/hunter-group-capital";
const WHATSAPP = "https://wa.me/16473913311";

type IconName = "dashboard" | "map" | "learn" | "process" | "profile";

function Icon({ name }: { name: IconName }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "dashboard":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="7" height="9" rx="1.2" />
          <rect x="14" y="3" width="7" height="5" rx="1.2" />
          <rect x="14" y="12" width="7" height="9" rx="1.2" />
          <rect x="3" y="16" width="7" height="5" rx="1.2" />
        </svg>
      );
    case "map":
      return (
        <svg {...common}>
          <path d="M9 3 3 5.5v15L9 18l6 3 6-2.5v-15L15 6 9 3Z" />
          <path d="M9 3v15M15 6v15" />
        </svg>
      );
    case "learn":
      return (
        <svg {...common}>
          <path d="M4 5.5A2 2 0 0 1 6 4h5v15H6a2 2 0 0 0-2 1.5V5.5Z" />
          <path d="M20 5.5A2 2 0 0 0 18 4h-5v15h5a2 2 0 0 1 2 1.5V5.5Z" />
        </svg>
      );
    case "process":
      return (
        <svg {...common}>
          <circle cx="5" cy="6" r="1.6" />
          <circle cx="5" cy="12" r="1.6" />
          <circle cx="5" cy="18" r="1.6" />
          <path d="M9 6h11M9 12h11M9 18h11" />
        </svg>
      );
    case "profile":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="3.4" />
          <path d="M5 20a7 7 0 0 1 14 0" />
        </svg>
      );
  }
}

export function CapitalAppShell({ children }: { children: React.ReactNode }) {
  const path = usePathname() ?? BASE;
  const { lang, setLang, t } = useLang();
  const nav = t.capitalApp.nav;

  const rel = path.replace(/^\/hunter-group-capital\/?/, "");
  const segments = rel.split("/").filter(Boolean);
  const section = segments[0] ?? "";

  const items: { key: IconName; href: string; label: string; active: boolean }[] = [
    { key: "dashboard", href: BASE, label: nav.dashboard, active: section === "" || section === "offerings" },
    { key: "map", href: `${BASE}/map`, label: nav.map, active: section === "map" },
    { key: "learn", href: `${BASE}/learn`, label: nav.learn, active: section === "learn" },
    { key: "process", href: `${BASE}/investment-process`, label: nav.process, active: section === "investment-process" },
    { key: "profile", href: `${BASE}/investor-profile`, label: nav.profile, active: section === "investor-profile" },
  ];

  // Contextual breadcrumb
  const crumbs: { label: string; href?: string }[] = [{ label: nav.dashboard, href: BASE }];
  if (section === "offerings") {
    const slug = segments[1];
    if (slug) {
      const offering = getOfferingBySlug(slug);
      crumbs.push({ label: offering ? offering.shortName[lang] : slug });
    } else {
      crumbs.push({ label: t.capitalApp.nav.offerings });
    }
  } else if (section === "map") {
    crumbs.push({ label: nav.map });
  } else if (section === "learn") {
    crumbs.push({ label: nav.learn });
  } else if (section === "investment-process") {
    crumbs.push({ label: nav.process });
  } else if (section === "investor-profile") {
    crumbs.push({ label: nav.profile });
  }

  return (
    <div className={styles.shell}>
      <aside className={styles.rail} aria-label={t.capitalApp.brand.name}>
        <Link href={BASE} className={styles.railBrand} aria-label={t.capitalApp.brand.name}>
          <Image src="/logos/HUNTER_Brandmark_Blue.png" alt="" width={30} height={30} />
        </Link>
        <nav className={styles.railNav} aria-label={t.capitalApp.brand.name}>
          {items.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`${styles.railItem} ${item.active ? styles.railItemActive : ""}`}
              aria-current={item.active ? "page" : undefined}
            >
              <span className={styles.railIcon}>
                <Icon name={item.key} />
              </span>
              <span className={styles.railLabel}>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      <div className={styles.main}>
        <header className={styles.topbar}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            {crumbs.map((crumb, i) => {
              const last = i === crumbs.length - 1;
              return (
                <span key={`${crumb.label}-${i}`} className={styles.crumb}>
                  {crumb.href && !last ? (
                    <Link href={crumb.href}>{crumb.label}</Link>
                  ) : (
                    <span aria-current={last ? "page" : undefined} className={last ? styles.crumbCurrent : ""}>
                      {crumb.label}
                    </span>
                  )}
                  {!last && <span className={styles.crumbSep} aria-hidden>›</span>}
                </span>
              );
            })}
          </nav>
          <div className={styles.topActions}>
            <div className={styles.langToggle} role="group" aria-label={t.capitalApp.lang.toggleAria}>
              <button type="button" onClick={() => setLang("tr")} className={lang === "tr" ? styles.langActive : ""} aria-pressed={lang === "tr"}>
                {t.capitalApp.lang.tr}
              </button>
              <span aria-hidden>·</span>
              <button type="button" onClick={() => setLang("en")} className={lang === "en" ? styles.langActive : ""} aria-pressed={lang === "en"}>
                {t.capitalApp.lang.en}
              </button>
            </div>
            <a className={styles.topCta} href={WHATSAPP} target="_blank" rel="noreferrer">
              {nav.talkToUs}
            </a>
          </div>
        </header>

        <main className={styles.content}>{children}</main>

        <footer className={styles.footer}>
          <span>{t.capitalApp.brand.name}</span>
          <p>{t.capitalApp.detail.ownershipNote} {t.capitalApp.common.notGuaranteed}.</p>
        </footer>
      </div>

      <nav className={styles.mobileBar} aria-label={t.capitalApp.brand.name}>
        {items.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className={`${styles.mobileItem} ${item.active ? styles.mobileItemActive : ""}`}
            aria-current={item.active ? "page" : undefined}
          >
            <Icon name={item.key} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
