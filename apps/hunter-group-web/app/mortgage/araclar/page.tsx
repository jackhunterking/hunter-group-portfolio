import type { Metadata } from "next";
import { tr } from "@/lib/i18n/dictionaries";
import AraclarClient from "./AraclarClient";

export const metadata: Metadata = {
  title: tr.mortgage.araclar.metaTitle,
  description: tr.mortgage.araclar.metaDesc,
};

export default function AraclarPage() {
  return <AraclarClient />;
}
