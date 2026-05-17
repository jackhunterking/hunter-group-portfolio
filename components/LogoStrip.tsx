import styles from "./LogoStrip.module.css";

interface LogoConfig {
  name: string;
  src?: string;
}

const LOGOS: LogoConfig[] = [
  { name: "RE/MAX Hallmark" },
  { name: "Platinum Club" },
  { name: "Executive Club" },
  { name: "100% Club" },
];

export default function LogoStrip() {
  return (
    <section className={styles.strip}>
      <div className="container">
        <div className={styles.eyebrow}>Akredite Kurumlar &amp; Ödüller</div>
        <div className={styles.row}>
          {LOGOS.map((logo) => (
            <div key={logo.name} className={styles.slot}>
              {logo.src ? (
                <img src={logo.src} alt={logo.name} />
              ) : (
                <div className={styles.placeholder}>
                  {logo.name}
                  <small>▢ Logo</small>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
