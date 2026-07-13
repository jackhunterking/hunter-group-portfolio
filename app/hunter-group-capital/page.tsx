import type { Metadata } from "next";
import { getOfferings } from "@/lib/capital/repository";
import { Dashboard } from "./Dashboard";

export const metadata: Metadata = { title: "Hunter Group Capital", description: "Own part of a portfolio of real Canadian apartment buildings and communities." };

export default function CapitalPage() {
  return <Dashboard offerings={getOfferings()} />;
}
