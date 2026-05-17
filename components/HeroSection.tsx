import Image from "next/image";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.media}>
        {/* When the real photo is ready:
            <Image
              src="/jack-tara-hero.jpg"
              alt=""
              fill
              priority
              className={styles.photo}
              style={{ objectFit: "cover", objectPosition: "center 30%" }}
            />
        */}
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

      <div className={styles.placeholderLabel}>▢ Hero portresi yerleşecek alan</div>

      {/* Top bar */}
      <div className={styles.topbar}>
        <div className={`container ${styles.topbarInner}`}>
          <a href="/" className={styles.logoHunter} aria-label="Hunter Group Real Estate">
            <Image
              src="/logos/HUNTER_Brandmark_Gold.png"
              alt="Hunter Group Real Estate"
              width={80}
              height={80}
              priority
            />
          </a>
          <Image
            src="/logos/remax-logo.png"
            alt="RE/MAX Hallmark"
            width={120}
            height={40}
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>

      {/* Hero content */}
      <div className={styles.content}>
        <div className={styles.contentInner}>
          <div className={styles.eyebrow}>
            <span className={styles.hairline} />
            Hoş Geldiniz
          </div>
          <h1 className={styles.heading}>
            Jack <em>&amp;</em>
            <br />
            Tara Hunter
          </h1>
          <p className={styles.welcome}>
            Toronto&apos;da gayrimenkulün güvenilir adresi.
          </p>
        </div>
      </div>

      <a href="#rehberler" className={styles.scroll} aria-label="Rehberlere git">
        Rehberler
        <span className={styles.scrollLine} />
      </a>
    </section>
  );
}
