import styles from "./PromiseSection.module.css";

export default function PromiseSection() {
  return (
    <section className={styles.promise} id="iletisim">
      <div className="container">
        <div className={styles.inner}>
          <span className={styles.eyebrow}>
            <span className={styles.hairline} />
            Söz Veriyoruz
          </span>
          <p className={styles.quote}>
            &ldquo;Deneyiminiz olağanüstü olmalı. Anlık piyasa içgörüsü,
            isabetli kararlar ve <em>size özel bir özen</em> ile birlikte,
            hedeflerinize en iyi koşullarda ulaşmanız için yanınızdayız.&rdquo;
          </p>
          <p className={styles.attribution}>
            — Jack &amp; Tara Hunter
          </p>

          <div className={styles.contact}>
            <a href="mailto:hello@jackhunter.com" className={styles.contactBtn}>
              hello@jackhunter.com
            </a>
            <a href="tel:+16473913311" className={styles.contactBtn}>
              647 &middot; 391 &middot; 3311
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
