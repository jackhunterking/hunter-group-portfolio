import type { Metadata } from "next";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Alıcı Rehberi — Ücretsiz İndir",
  description: "Kanada'da mülk satın almanın profesyonel yol haritası. Ücretsiz görüntüleyin veya indirin.",
};

const GUIDE_URL =
  "https://drive.google.com/file/d/19rJFJmGST33V_kc5H-H7Z0yA_CHXaWl8/view?usp=sharing";

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
              Ücretsiz görüntüleyin veya indirin.
            </p>
          </div>

          <div className={styles.mockupWrap}>
            <Image
              src="/alis-rehberi-mockup.png"
              alt="Alıcı Rehberi önizleme"
              width={3000}
              height={1650}
              className={styles.mockup}
              priority
            />
          </div>

          <div className={styles.actions}>
            <a
              href={GUIDE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnPrimary}
            >
              Rehberi Görüntüle / İndir
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
                <path
                  d="M10 1l5 5-5 5M15 6H1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
