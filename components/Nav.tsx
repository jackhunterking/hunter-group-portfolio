"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Nav.module.css";

interface NavProps {
  /** When true, nav is transparent at top and goes solid on scroll (for hero pages) */
  overlayHero?: boolean;
  /** Color theme — light nav for dark hero, dark nav for light hero */
  theme?: "light" | "dark";
}

const LINKS = [
  { href: "/", label: "Anasayfa" },
  { href: "/#hakkimizda", label: "Hakkımızda" },
  { href: "/#hizmetler", label: "Hizmetler" },
  { href: "/rehber", label: "Rehberler" },
  { href: "/#iletisim", label: "İletişim" },
];

export default function Nav({ overlayHero = true, theme = "light" }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!overlayHero) return;
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overlayHero]);

  const logoSrc =
    theme === "light"
      ? "/logos/HUNTER_PrimaryLogo_WhiteGold.png"
      : "/logos/HUNTER_PrimaryLogo_BlackBlue.png";

  const classes = [
    styles.nav,
    overlayHero && styles.overlay,
    scrolled && styles.scrolled,
    theme === "dark" && styles.dark,
    open && styles.menuOpen,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={classes}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo} aria-label="Jack Hunter Real Estate">
          <Image
            src={logoSrc}
            alt="Jack Hunter Real Estate"
            width={194}
            height={72}
            priority
          />
        </Link>

        <nav className={styles.links}>
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.link}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className={styles.menuToggle}
          onClick={() => setOpen(!open)}
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={open}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
