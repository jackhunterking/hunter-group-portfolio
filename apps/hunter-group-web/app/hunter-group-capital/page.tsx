import type { Metadata } from "next";
import HunterGroupCapitalClient from "./HunterGroupCapitalClient";

export const metadata: Metadata = {
  title:
    "Hunter Group Capital | Canadian Multifamily Investment Access for Turkish Investors",
  description:
    "Toronto and Istanbul based exempt-market education and access for Turkish-speaking investors exploring Canadian income-generating rental apartment portfolios.",
};

export default function HunterGroupCapitalPage() {
  return <HunterGroupCapitalClient />;
}
