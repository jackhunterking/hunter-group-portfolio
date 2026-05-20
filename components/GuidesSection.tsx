import styles from "./GuidesSection.module.css";

const GUIDES = [
  {
    href: "https://drive.google.com/file/d/19rJFJmGST33V_kc5H-H7Z0yA_CHXaWl8/view?usp=sharing",
    number: "01",
    label: "Alıcı",
    title: "Alıcı Rehberi",
    description:
      "Kanada'da mülk satın almanın adım adım profesyonel yol haritası. Bütçe, mortgage, mülk arama ve kapanış.",
    icon: "M8 28L32 10l24 18v26H8V28z M26 54V38h12v16",
  },
  {
    href: "https://drive.google.com/file/d/1Xyd0OtYB9gnF7mrFQ0cYzRAxLM8hApXu/view?usp=sharing",
    number: "02",
    label: "Satıcı",
    title: "Satıcı Rehberi",
    description:
      "Mülkünüzü en iyi koşullarda satmanın profesyonel stratejisi. Fiyatlandırma, pazarlama ve müzakere.",
    icon: "M10 22L32 10l22 12v32H10V22z M22 54V36h20v18",
  },
];

export default function GuidesSection() {
  return (
    <section className={styles.section} id="rehberler">
      <div className="container">
        <div className={styles.head}>
          <span className={styles.eyebrow}>
            <span className={styles.hairline} />
            Ücretsiz Rehberler
            <span className={`${styles.hairline} ${styles.hairlineRight}`} />
          </span>
          <h2 className={styles.title}>
            Sizin <em>için.</em>
          </h2>
          <p className={styles.sub}>
            Alım veya satım sürecinizi doğru adımlarla başlatın.
            Rehberinizi ücretsiz görüntüleyin veya indirin.
          </p>
        </div>

        <div className={styles.grid}>
          {GUIDES.map((g) => (
            <a
              key={g.href}
              href={g.href}
              className={styles.card}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={styles.cardTop}>
                <svg
                  className={styles.icon}
                  width="40"
                  height="40"
                  viewBox="0 0 64 64"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d={g.icon}
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className={styles.number}>{g.number}</span>
              </div>
              <span className={styles.label}>{g.label}</span>
              <h3 className={styles.cardTitle}>{g.title}</h3>
              <p className={styles.cardDesc}>{g.description}</p>
              <span className={styles.cta}>
                Görüntüle / İndir
                <svg width="14" height="10" viewBox="0 0 16 12" fill="none" aria-hidden="true">
                  <path
                    d="M10 1l5 5-5 5M15 6H1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
