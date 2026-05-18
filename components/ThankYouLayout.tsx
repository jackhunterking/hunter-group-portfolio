import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import styles from "./ThankYouLayout.module.css";

interface NextStep {
  number: string;
  title: string;
  description: string;
  href: string;
  cta: string;
}

interface ThankYouLayoutProps {
  guideType: "alici" | "satici";
  guideName: string;
  guidePdfPath: string;
  intro: string;
  nextSteps: NextStep[];
}

export default function ThankYouLayout({
  guideType,
  guideName,
  guidePdfPath,
  intro,
  nextSteps,
}: ThankYouLayoutProps) {
  return (
    <main>
      <Nav />

      {/* Hero / Success */}
      <section className={styles.hero}>
        <div className={styles.watermark} aria-hidden="true">
          <Image
            src="/logos/HUNTER_Brandmark_Gold.png"
            alt=""
            width={720}
            height={720}
          />
        </div>

        <div className={`container ${styles.heroInner}`}>
          <div className={styles.check}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path
                d="M6 14l5 5 11-11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <span className={styles.eyebrow}>
            <span className={styles.hairline} />
            Teşekkür Ederiz
          </span>

          <h1 className={styles.heading}>
            Rehberiniz <em>yolda.</em>
          </h1>

          <p className={styles.intro}>{intro}</p>

          {/* Direct download button — works even if email hasn't arrived yet */}
          <a
            href={guidePdfPath}
            download
            className={styles.downloadBtn}
            data-guide={guideType}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 1v10M4 7l4 4 4-4M2 14h12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {guideName} İndir
          </a>
        </div>
      </section>

      {/* Next Steps */}
      <section className={styles.nextSection}>
        <div className="container">
          <div className={styles.nextHead}>
            <span className={styles.eyebrowDark}>
              <span className={styles.hairlineDark} />
              Sırada Ne Var
            </span>
            <h2 className={styles.nextTitle}>
              Yolculuğa <em>devam.</em>
            </h2>
          </div>

          <div className={styles.nextGrid}>
            {nextSteps.map((step) => (
              <article key={step.number} className={styles.stepCard}>
                <span className={styles.stepNumber}>{step.number}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
                <Link href={step.href} className={styles.stepCta}>
                  {step.cta}
                  <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                    <path
                      d="M10 1l5 5-5 5M15 6H1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Sign-off */}
      <section className={styles.signoff}>
        <div className="container">
          <p className={styles.signoffQuote}>
            &ldquo;Yolun her adımında yanınızdayız. Sorularınız için
            doğrudan bize yazabilirsiniz.&rdquo;
          </p>
          <p className={styles.signoffName}>— Jack &amp; Tara Hunter</p>
          <div className={styles.signoffContact}>
            <a
              href="https://wa.me/16473913311"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.signoffBtn}
            >
              WhatsApp&apos;tan Yazın
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
