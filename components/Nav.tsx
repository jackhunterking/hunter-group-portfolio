"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Nav.module.css";

interface NavProps {
  /** Starts transparent over a dark hero and goes solid on scroll */
  overlayHero?: boolean;
}

const LINKS = [
  { href: "/", label: "Anasayfa" },
  { href: "/#hakkimizda", label: "Hakkımızda" },
  { href: "/#hizmetler", label: "Hizmetler" },
  { href: "/#rehberler", label: "Rehberler" },
  { href: "/#iletisim", label: "İletişim" },
];

export default function Nav({ overlayHero = false }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const transparent = overlayHero && !scrolled;

  const classes = [
    styles.nav,
    transparent ? styles.transparent : styles.solid,
    open && styles.menuOpen,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={classes}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} aria-label="Hunter Group Real Estate">
          <Image
            src="/logos/HUNTER_Brandmark_Gold.png"
            alt="Hunter Group Real Estate"
            width={80}
            height={80}
            priority
          />
          <span className={styles.logoText}>Hunter Group<br className={styles.logoBr} /> Real Estate</span>
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
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
