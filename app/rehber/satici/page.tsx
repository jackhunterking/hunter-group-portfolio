import type { Metadata } from "next";
import ThankYouLayout from "@/components/ThankYouLayout";

export const metadata: Metadata = {
  title: "Ev Satma Rehberi — Teşekkür Ederiz",
  description: "Ev Satma Rehberiniz hazır. Mülkünüzü en iyi koşullarda satmak için yanınızdayız.",
};

const SATICI_STEPS = [
  {
    number: "01",
    title: "Evinizin Değerini Öğrenin",
    description:
      "Profesyonel piyasa analizi ile mülkünüzün gerçek değerini birlikte belirleyelim.",
    href: "mailto:hello@jackhunter.com?subject=Evimin%20De%C4%9Ferini%20%C3%96%C4%9Frenmek%20%C4%B0stiyorum",
    cta: "Değer Analizi İste",
  },
  {
    number: "02",
    title: "Satış Stratejisi",
    description:
      "Fiyatlandırma, staging, pazarlama. Maksimum getiri için planı birlikte kuralım.",
    href: "mailto:hello@jackhunter.com?subject=Sat%C4%B1c%C4%B1%20Konsoltasyonu",
    cta: "Konsültasyon Al",
  },
  {
    number: "03",
    title: "Hazırlık Listesi",
    description:
      "Evinizi satışa hazırlamak için yapılması gerekenleri birlikte ele alalım.",
    href: "/rehber",
    cta: "Diğer Rehberlere Göz At",
  },
];

export default function SaticiThankYou() {
  return (
    <ThankYouLayout
      guideType="satici"
      guideName="Ev Satma Rehberi"
      guidePdfPath="/guides/ev-satma-rehberi.pdf"
      intro="Mülkünüzü en iyi koşullarda satmak için profesyonel strateji e-postanıza gönderildi. Bu arada, aşağıdaki adımlarla yolculuğunuza devam edebilirsiniz."
      nextSteps={SATICI_STEPS}
    />
  );
}
