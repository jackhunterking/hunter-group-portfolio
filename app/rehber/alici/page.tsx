import type { Metadata } from "next";
import Nav from "@/components/Nav";
import GuideCard from "@/components/GuideCard";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Alıcı Rehberi — Ücretsiz İndir",
  description: "Kanada'da mülk satın almanın profesyonel yol haritası. Ücretsiz rehberi indirin.",
};

export default function AliciRehber() {
  return (
    <main>
      <Nav />
      <section className={styles.page}>
        <div className="container">
          <div className={styles.head}>
            <span className={styles.eyebrow}>
              <span className={styles.hairline} />
              Alıcı Rehberi
            </span>
            <h1 className={styles.title}>
              Doğru mülkü, <em>doğru fiyata.</em>
            </h1>
            <p className={styles.sub}>
              Kanada&apos;da mülk satın almanın adım adım profesyonel yol haritası.
              E-posta adresinizi bırakın, rehber anında gönderilsin.
            </p>
          </div>
          <div className={styles.cardWrap}>
            <GuideCard
              guide="alici"
              number="01"
              label="Alıcı"
              title={<>Alıcı <em>Rehberi</em></>}
              description="Bütçe belirleme, mortgage ön onayı, mülk arama ve kapanış sürecine kadar her adımda yanınızdayız."
              imageSrc="/alis-rehberi-mockup.png"
            />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
