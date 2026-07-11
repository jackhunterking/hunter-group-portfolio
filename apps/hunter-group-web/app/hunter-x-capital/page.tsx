import type { Metadata } from "next";
import HunterXCapitalClient from "./HunterXCapitalClient";

export const metadata: Metadata = {
  title: "Hunter X Capital, Çoklu Konut Yatırım Ortaklığı",
  description:
    "Ontario'da çoklu konut projeleri için operasyon ve geliştirme ortağı. Sermaye sizin, proje sizin, biz yürütme ekibinizyiz.",
};

export default function HunterXCapitalPage() {
  return <HunterXCapitalClient />;
}
