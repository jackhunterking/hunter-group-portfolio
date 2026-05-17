import Image from "next/image";
import styles from "./AboutSection.module.css";

interface PersonProps {
  name: string;
  title: string;
  positioning: string;
  credentials: string[];
  /** Photo path — when null, shows on-brand placeholder */
  photoSrc?: string;
}

const JACK: PersonProps = {
  name: "Jack Hunter",
  title: "Broker",
  positioning:
    "Verilerle okur, stratejiyle hareket ederim. Her işlemi finansal bir yatırım gibi değerlendiririm.",
  credentials: ["ABR", "SRS", "Broker"],
};

const TARA: PersonProps = {
  name: "Tara Hunter",
  title: "Emlak Danışmanı",
  positioning:
    "İnsanı dinler, detayı kaçırmam. Müşterinin hedefine ulaşması en büyük motivasyonum.",
  credentials: ["Platinum Award", "2x Top Producer"],
};

function PersonCard({ name, title, positioning, credentials, photoSrc }: PersonProps) {
  return (
    <article className={styles.person}>
      <div className={styles.photo}>
        {photoSrc ? (
          <Image src={photoSrc} alt={name} width={600} height={750} />
        ) : (
          <div className={styles.photoPlaceholder}>
            <div className={styles.placeholderMark}>
              <Image
                src="/logos/HUNTER_Brandmark_Gold.png"
                alt=""
                width={80}
                height={80}
              />
            </div>
            <span className={styles.placeholderLabel}>▢ {name} fotoğrafı</span>
          </div>
        )}
      </div>
      <div className={styles.personBody}>
        <h3 className={styles.personName}>{name}</h3>
        <p className={styles.personTitle}>{title}</p>
        <p className={styles.personPositioning}>{positioning}</p>
        <div className={styles.credentials}>
          {credentials.map((cred) => (
            <span key={cred} className={styles.credential}>
              {cred}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function AboutSection() {
  return (
    <section className={styles.about} id="hakkimizda">
      <div className="container">
        <div className={styles.head}>
          <span className={styles.eyebrow}>
            <span className={styles.hairline} />
            Biz Kimiz
          </span>
          <h2 className={styles.title}>
            Birlikte, <em>daha güçlü.</em>
          </h2>
          <p className={styles.subtitle}>
            Toronto&apos;da gayrimenkulün yeni nesli. Veriyle hareket eden bir
            broker ve insanı önceleyen bir danışman.
          </p>
        </div>

        <div className={styles.grid}>
          <PersonCard {...JACK} />
          <PersonCard {...TARA} />
        </div>
      </div>
    </section>
  );
}
