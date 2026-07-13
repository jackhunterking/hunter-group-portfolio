"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu } from "lucide-react";
import { useLang } from "@/lib/i18n/LanguageProvider";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

function FlagTR() {
  return (
    <svg viewBox="0 0 30 20" className="h-3 w-[18px] rounded-[2px]" aria-hidden="true">
      <rect width="30" height="20" fill="#E30A17" />
      <circle cx="11" cy="10" r="4.5" fill="#fff" />
      <circle cx="12.3" cy="10" r="3.5" fill="#E30A17" />
      <polygon points="17.4,7.6 18.2,9.6 20.3,9.6 18.6,10.8 19.3,12.8 17.4,11.6 15.5,12.8 16.2,10.8 14.5,9.6 16.6,9.6" fill="#fff" />
    </svg>
  );
}
function FlagEN() {
  return (
    <svg viewBox="0 0 30 20" className="h-3 w-[18px] rounded-[2px]" aria-hidden="true">
      <rect width="30" height="20" fill="#012169" />
      <path d="M0,0 L30,20" stroke="#fff" strokeWidth="3" />
      <path d="M30,0 L0,20" stroke="#fff" strokeWidth="3" />
      <path d="M0,0 L30,20" stroke="#C8102E" strokeWidth="1.5" />
      <path d="M30,0 L0,20" stroke="#C8102E" strokeWidth="1.5" />
      <path d="M15,0 V20" stroke="#fff" strokeWidth="5" />
      <path d="M0,10 H30" stroke="#fff" strokeWidth="5" />
      <path d="M15,0 V20" stroke="#C8102E" strokeWidth="3" />
      <path d="M0,10 H30" stroke="#C8102E" strokeWidth="3" />
    </svg>
  );
}

interface NavProps {
  /** Starts transparent (light text) over a dark hero, goes solid on scroll. */
  overlayHero?: boolean;
}

export default function Nav({ overlayHero = false }: NavProps) {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const transparent = overlayHero && !scrolled;

  const SERVICES = [
    { href: "/rehber/alici", label: t.nav.servicesMenu.buy },
    { href: "/rehber/satici", label: t.nav.servicesMenu.sell },
    { href: "/mortgage", label: t.nav.servicesMenu.mortgage },
  ];
  const LINKS = [
    { href: "/#hakkimizda", label: t.nav.about },
    { href: "/#kaynaklar", label: t.nav.resources },
    { href: "/hunter-group-capital", label: t.nav.capital },
    { href: "/#iletisim", label: t.nav.contact },
  ];

  const linkColor = transparent
    ? "text-white/80 hover:text-gold"
    : "text-foreground/75 hover:text-primary";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        transparent
          ? "bg-transparent"
          : "border-b border-border bg-background/85 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5" aria-label={t.nav.logoAria}>
          <Image src="/logos/HUNTER_Brandmark_Gold.png" alt="" width={36} height={36} priority />
          <span className={cn("text-sm font-semibold leading-tight", transparent ? "text-white" : "text-foreground")}>
            Hunter Group<br />
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold">Real Estate</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          <Link href="/#hakkimizda" className={cn("rounded-md px-3 py-2 text-sm font-medium transition-colors", linkColor)}>
            {t.nav.about}
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger className={cn("inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium outline-none transition-colors", linkColor)}>
              {t.nav.services}
              <ChevronDown className="size-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-44">
              {SERVICES.map((s) => (
                <DropdownMenuItem key={s.href} asChild>
                  <Link href={s.href}>{s.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {LINKS.slice(1).map((l) => (
            <Link key={l.href} href={l.href} className={cn("rounded-md px-3 py-2 text-sm font-medium transition-colors", linkColor)}>
              {l.label}
            </Link>
          ))}

          <div className="ml-2 flex items-center gap-1.5 border-l border-border/50 pl-3" role="group" aria-label="Language">
            <LangButton active={lang === "tr"} transparent={transparent} onClick={() => setLang("tr")} label={t.nav.langTR}><FlagTR /></LangButton>
            <LangButton active={lang === "en"} transparent={transparent} onClick={() => setLang("en")} label={t.nav.langEN}><FlagEN /></LangButton>
          </div>
        </nav>

        {/* Mobile */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              aria-label={t.nav.menuOpen}
              className={cn("inline-flex size-9 items-center justify-center rounded-md md:hidden", transparent ? "text-white" : "text-foreground")}
            >
              <Menu className="size-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetTitle className="sr-only">{t.nav.menuOpen}</SheetTitle>
            <nav className="mt-6 flex flex-col gap-1">
              <Link href="/#hakkimizda" onClick={() => setOpen(false)} className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-muted">{t.nav.about}</Link>
              <p className="px-3 pt-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{t.nav.services}</p>
              {SERVICES.map((s) => (
                <Link key={s.href} href={s.href} onClick={() => setOpen(false)} className="rounded-md px-3 py-2.5 text-sm text-foreground/80 hover:bg-muted">{s.label}</Link>
              ))}
              {LINKS.slice(1).map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-muted">{l.label}</Link>
              ))}
              <div className="mt-4 flex items-center gap-2 border-t border-border pt-4">
                <SheetClose asChild>
                  <Button variant={lang === "tr" ? "default" : "outline"} size="sm" onClick={() => setLang("tr")}><FlagTR /> {t.nav.langTR}</Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button variant={lang === "en" ? "default" : "outline"} size="sm" onClick={() => setLang("en")}><FlagEN /> {t.nav.langEN}</Button>
                </SheetClose>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

function LangButton({
  active,
  transparent,
  onClick,
  label,
  children,
}: {
  active: boolean;
  transparent: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-semibold transition-colors",
        active
          ? transparent
            ? "text-white"
            : "text-foreground"
          : transparent
            ? "text-white/45 hover:text-white/80"
            : "text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
      <span>{label}</span>
    </button>
  );
}
