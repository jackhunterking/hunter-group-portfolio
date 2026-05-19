import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.brand}>
            <a href="/" className={styles.logo} aria-label="Hunter Group Real Estate">
              <Image
                src="/logos/HUNTER_Brandmark_Gold.png"
                alt="Hunter Group Real Estate"
                width={80}
                height={80}
              />
              <span className={styles.logoText}>Hunter Group<br />Real Estate</span>
            </a>
            <p className={styles.promise}>
              Toronto Merkezli Türk Emlak Grubu
            </p>
          </div>

          <div className={styles.meta}>
            <div>170 Merton St, Toronto, ON M4S 1A1</div>
          </div>

          <div className={styles.socials}>
            <a
              href="https://www.instagram.com/jack.ve.tara.remax/"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.4" />
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/jack.ve.tara.remax"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>

        <div className={styles.bottom}>
          <div>&copy; {new Date().getFullYear()} Hunter Group Real Estate</div>
          <div>jackhunter.com</div>
        </div>
      </div>
    </footer>
  );
}
