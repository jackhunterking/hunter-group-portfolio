import type { Metadata } from "next";
import { tr } from "@/lib/i18n/dictionaries";
import OranlarClient from "./OranlarClient";

export const metadata: Metadata = {
  title: tr.mortgage.oranlar.metaTitle,
  description: tr.mortgage.oranlar.metaDesc,
};

export default function OranlarPage() {
  return <OranlarClient />;
}
