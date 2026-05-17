import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import GuideCard from "@/components/GuideCard";
import LogoStrip from "@/components/LogoStrip";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Hoş Geldiniz — Ücretsiz Rehberler",
  description:
    "Toronto'da ev almak veya satmak isteyenler için Jack & Tara Hunter'ın hazırladığı ücretsiz rehberler.",
};

export default function RehberPage() {
  return (
    <main>
      <HeroSection />

      <section className={styles.guides} id="rehberler">
        <div className="container">
          <div className={styles.guidesHead}>
            <span className={styles.eyebrow}>
              <span className={styles.hairline} />
              Ücretsiz Rehberler
              <span className={`${styles.hairline} ${styles.hairlineRight}`} />
            </span>
            <h2 className={styles.guidesTitle}>
              Sizin <em>için.</em>
            </h2>
          </div>

          <div className={styles.guideGrid}>
            <GuideCard
              guide="alici"
              number="01"
              label="Alıcı"
              title={
                <>
                  Ev Alma <em>Rehberi</em>
                </>
              }
              description="Toronto'da ev sahibi olmanın profesyonel yol haritası."
            />
            <GuideCard
              guide="satici"
              number="02"
              label="Satıcı"
              title={
                <>
                  Ev Satma <em>Rehberi</em>
                </>
              }
              description="Evinizi en iyi koşullarda satmanın profesyonel stratejisi."
            />
          </div>
        </div>
      </section>

      <LogoStrip />
      <Footer />
    </main>
  );
}
