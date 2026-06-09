import type { Metadata } from "next";
import { tr } from "@/lib/i18n/dictionaries";
import OranlarClient from "./OranlarClient";

export const metadata: Metadata = {
  title: tr.finansman.oranlar.metaTitle,
  description: tr.finansman.oranlar.metaDesc,
};

export default function OranlarPage() {
  return <OranlarClient />;
}
