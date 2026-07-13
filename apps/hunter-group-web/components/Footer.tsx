"use client";

import Image from "next/image";
import Link from "next/link";
import { useT, useLang } from "@/lib/i18n/LanguageProvider";
import { LEGAL_DOCS, LEGAL_SLUGS } from "@/lib/mortgage/legal";

const WA_URL = "https://wa.me/16473913311";

export default function Footer() {
  const t = useT();
  const { lang } = useLang();
  const f = t.footer;
  const n = t.nav;

  const docs = LEGAL_DOCS[lang];
  const LEGAL = [
    { href: `/${LEGAL_SLUGS.privacy}`, label: docs.privacy.title },
    { href: `/${LEGAL_SLUGS.terms}`, label: docs.terms.title },
    { href: `/${LEGAL_SLUGS.advertising}`, label: docs.advertising.title },
  ];

  const NAV = [
    { href: "/", label: n.home },
    { href: "/#hakkimizda", label: n.about },
    { href: "/#hizmetler", label: n.services },
    { href: "/mortgage", label: n.mortgage },
    { href: "/mortgage/oranlar", label: t.mortgage.oranlar.label },
    { href: "/rehber/ogren", label: t.ogren.label },
    { href: "/hunter-group-capital", label: n.capital },
    { href: "/#kaynaklar", label: n.resources },
    { href: "/#iletisim", label: n.contact },
  ];

  return (
    <footer className="border-t border-border bg-secondary/60">
      <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_0.8fr]">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5" aria-label={f.logoAria}>
              <Image src="/logos/HUNTER_Brandmark_Gold.png" alt="" width={40} height={40} />
              <span className="text-sm font-semibold leading-tight text-foreground">
                Hunter Group<br />
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold">Real Estate</span>
              </span>
            </Link>
            <p className="max-w-[34ch] text-sm leading-relaxed text-muted-foreground">{f.promise}</p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="mb-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{f.navHeading}</h4>
            <ul className="flex flex-col gap-2">
              {NAV.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-foreground/75 transition-colors hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{f.contactHeading}</h4>
            <ul className="flex flex-col gap-3">
              <li className="text-sm text-muted-foreground">{f.address}</li>
              <li>
                <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-foreground/80 transition-colors hover:text-wa">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  {f.waLabel}
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="mb-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{f.socialHeading}</h4>
            <div className="flex gap-2">
              <a href="https://www.instagram.com/jack.ve.tara.remax/" aria-label={f.instagramAria} target="_blank" rel="noopener noreferrer" className="inline-flex size-9 items-center justify-center rounded-md border border-border text-foreground/70 transition-colors hover:border-primary hover:text-primary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.4" />
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </a>
              <a href="https://www.facebook.com/jack.ve.tara.remax" aria-label={f.facebookAria} target="_blank" rel="noopener noreferrer" className="inline-flex size-9 items-center justify-center rounded-md border border-border text-foreground/70 transition-colors hover:border-primary hover:text-primary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-6">
          {LEGAL.map((link) => (
            <Link key={link.href} href={link.href} className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap justify-between gap-2 text-xs text-muted-foreground">
          <div>&copy; {new Date().getFullYear()} {f.copy}</div>
          <div>jackhunter.com</div>
        </div>
      </div>
    </footer>
  );
}
