import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.brand}>
            <a href="/" className={styles.logo} aria-label="Jack Hunter Real Estate">
              <Image
                src="/logos/HUNTER_PrimaryLogo_WhiteGold.png"
                alt="Jack Hunter Real Estate"
                width={216}
                height={80}
              />
            </a>
            <p className={styles.promise}>
              &ldquo;Toronto&apos;da gayrimenkulün güvenilir adresi.&rdquo;
            </p>
          </div>

          <div className={styles.meta}>
            <div>
              <a href="mailto:hello@jackhunter.com">hello@jackhunter.com</a>
            </div>
            <div>647 &middot; 391 &middot; 3311</div>
            <div>1170 Merton St, Toronto</div>
          </div>

          <div className={styles.socials}>
            <a
              href="https://instagram.com/jack.hunter.x"
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
              href="https://linkedin.com/in/jack-h-hunter/"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.4" />
                <path
                  d="M8 10v7M8 7v.01M12 17v-4a2 2 0 014 0v4M12 10v7"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </a>
          </div>
        </div>

        <div className={styles.bottom}>
          <div>&copy; {new Date().getFullYear()} Jack Hunter Real Estate</div>
          <div>jackhunter.com</div>
        </div>
      </div>
    </footer>
  );
}
