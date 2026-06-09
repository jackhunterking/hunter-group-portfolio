import type { Metadata } from "next";
import { tr } from "@/lib/i18n/dictionaries";
import AraclarClient from "./AraclarClient";

export const metadata: Metadata = {
  title: tr.finansman.araclar.metaTitle,
  description: tr.finansman.araclar.metaDesc,
};

export default function AraclarPage() {
  return <AraclarClient />;
}
