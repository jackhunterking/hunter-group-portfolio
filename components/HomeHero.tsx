import Image from "next/image";
import Link from "next/link";
import styles from "./HomeHero.module.css";

export default function HomeHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.media}>
        {/* REPLACE: <Image className={styles.photo} src="/jack-tara-home.jpg" alt="" fill priority style={{objectFit:"cover"}} /> */}
        <div className={styles.watermark} aria-hidden="true">
          <Image
            src="/logos/HUNTER_Brandmark_Gold.png"
            alt=""
            width={720}
            height={720}
            priority
          />
        </div>
      </div>
      <div className={styles.overlay} />

      <div className={styles.placeholderLabel}>▢ Anasayfa hero görseli</div>

      <div className={styles.content}>
        <div className={`container ${styles.contentInner}`}>
          <div className={styles.eyebrow}>
            <span className={styles.hairline} />
            Toronto Gayrimenkul
          </div>
          <h1 className={styles.heading}>
            Hayalinizdeki ev,
            <br />
            <em>doğru ellerde.</em>
          </h1>
          <p className={styles.subtitle}>
            Jack &amp; Tara Hunter ile gayrimenkul yolculuğunuz, ilk
            adımdan kapanışa kadar.
          </p>
          <div className={styles.ctas}>
            <Link href="/rehber" className={styles.ctaPrimary}>
              Ücretsiz Rehberler
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                <path
                  d="M10 1l5 5-5 5M15 6H1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <a href="#hakkimizda" className={styles.ctaSecondary}>
              Bizi Tanıyın
            </a>
          </div>
        </div>
      </div>

      <a href="#hakkimizda" className={styles.scroll} aria-label="Aşağı kaydır">
        <span className={styles.scrollLine} />
      </a>
    </section>
  );
}
