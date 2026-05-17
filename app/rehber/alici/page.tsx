import type { Metadata } from "next";
import ThankYouLayout from "@/components/ThankYouLayout";

export const metadata: Metadata = {
  title: "Ev Alma Rehberi — Teşekkür Ederiz",
  description: "Ev Alma Rehberiniz hazır. Toronto'da hayalinizdeki eve giden yolda yanınızdayız.",
};

const ALICI_STEPS = [
  {
    number: "01",
    title: "Mortgage Ön Onayı",
    description:
      "Bütçenizi netleştirmenin ilk adımı. Doğru profesyonelle bağlantı kuralım.",
    href: "mailto:hello@jackhunter.com?subject=Mortgage%20%C3%96n%20Onay%C4%B1%20Hakk%C4%B1nda",
    cta: "Görüşme Talep Et",
  },
  {
    number: "02",
    title: "Tercihlerinizi Konuşalım",
    description:
      "Mahalle, bütçe, zaman çizelgesi. Sizin için doğru fırsatları bulalım.",
    href: "mailto:hello@jackhunter.com?subject=Al%C4%B1c%C4%B1%20Konsoltasyonu",
    cta: "Konsültasyon Al",
  },
  {
    number: "03",
    title: "Piyasa Güncellemeleri",
    description:
      "Toronto piyasasındaki fırsatları kaçırmamak için bizden haber alın.",
    href: "/rehber",
    cta: "Diğer Rehberlere Göz At",
  },
];

export default function AliciThankYou() {
  return (
    <ThankYouLayout
      guideType="alici"
      guideName="Ev Alma Rehberi"
      guidePdfPath="/guides/ev-alma-rehberi.pdf"
      intro="Toronto'da ev sahibi olmanın profesyonel yol haritası e-postanıza gönderildi. Bu arada, aşağıdaki adımlarla yolculuğunuza devam edebilirsiniz."
      nextSteps={ALICI_STEPS}
    />
  );
}
