import type { Metadata } from "next";
import InvestorMapClient from "./InvestorMapClient";

export const metadata: Metadata = {
  title: "Equiton Investor 3D Map Demo",
  description:
    "Mobile-first verified-address investor visualization for Equiton Apartment Fund exposure.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function InvestorMapPage() {
  return <InvestorMapClient />;
}
