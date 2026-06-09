import type { Metadata } from "next";
import { tr } from "@/lib/i18n/dictionaries";
import FinansmanClient from "./FinansmanClient";

export const metadata: Metadata = {
  title: tr.finansman.metaTitle,
  description: tr.finansman.metaDesc,
};

export default function FinansmanPage() {
  return <FinansmanClient />;
}
