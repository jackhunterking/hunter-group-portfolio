import Image from "next/image";
import Link from "next/link";
import styles from "./HomeHero.module.css";

const STATS = [
  { value: "18+", label: "Yıl Birleşik Deneyim" },
  { value: "Toronto", label: "& GTA Uzmanı" },
];

export default function HomeHero() {
  return (
    <section className={styles.hero}>

      {/* Background collage — drop hero-collage.jpg into /public/ */}
      <div className={styles.media}>
        <Image
          src="/herobg.png"
          alt="Jack ve Tara Hunter"
          fill
          priority
          className={styles.photo}
          style={{ objectFit: "cover", objectPosition: "center center" }}
        />
      </div>

      {/* Directional overlay: near-black on left for text, fades right to show photos */}
      <div className={styles.overlay} />

      {/* Hero content */}
      <div className={styles.content}>
        <div className={styles.contentInner}>

          <p className={styles.eyebrow}>
            <span className={styles.hairline} />
            Toronto Merkezli Türk Emlak Grubu · RE/MAX
          </p>

          <h1 className={styles.heading}>
            Aile gibi yaklaşıyor, <em>varlık inşa ediyoruz.</em>
          </h1>

          <p className={styles.subtitle}>
            Gayrimenkul, varlık oluşturmanın en güçlü yollarından biridir.
            18 yılı aşkın birleşik deneyimimizle Kanada genelinde her alım
            ve satım işleminde yanınızdayız — profesyonel bir ekip olarak
            değil, aile gibi.
          </p>

          <div className={styles.ctas}>
            <Link href="/rehber" className={styles.ctaPrimary}>
              Ücretsiz Rehberler
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
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

          {/* Credibility bar */}
          <div className={styles.stats}>
            {STATS.map((s) => (
              <div key={s.label} className={styles.stat}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
            <div className={styles.stat}>
              <Image
                src="/logos/remax-logo.png"
                alt="RE/MAX Hallmark"
                width={90}
                height={30}
                className={styles.remaxLogo}
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>

        </div>
      </div>

      <a href="#hakkimizda" className={styles.scroll} aria-label="Aşağı kaydır">
        <span className={styles.scrollLine} />
      </a>
    </section>
  );
}
