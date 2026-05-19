import type { Metadata } from "next";
import Nav from "@/components/Nav";
import GuideCard from "@/components/GuideCard";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Satıcı Rehberi — Ücretsiz İndir",
  description: "Mülkünüzü en iyi koşullarda satmanın profesyonel stratejisi. Ücretsiz rehberi indirin.",
};

export default function SaticiRehber() {
  return (
    <main>
      <Nav />
      <section className={styles.page}>
        <div className="container">
          <div className={styles.head}>
            <span className={styles.eyebrow}>
              <span className={styles.hairline} />
              Satıcı Rehberi
            </span>
            <h1 className={styles.title}>
              Mülkünüzü en iyi <em>koşullarda satın.</em>
            </h1>
            <p className={styles.sub}>
              Fiyatlandırma stratejisinden kapanışa kadar profesyonel satış rehberi.
              E-posta adresinizi bırakın, rehber anında gönderilsin.
            </p>
          </div>
          <div className={styles.cardWrap}>
            <GuideCard
              guide="satici"
              number="02"
              label="Satıcı"
              title={<>Satıcı <em>Rehberi</em></>}
              description="Fiyatlandırma, pazarlama, müzakere ve kapanış sürecinde maksimum getiri için yanınızdayız."
              imageSrc="/satis-rehberi-mockup.png"
            />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
