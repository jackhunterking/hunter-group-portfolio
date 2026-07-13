import { Suspense } from "react";
import { getOfferings } from "@/lib/capital/repository";
import { InvestorProfile } from "./InvestorProfile";

export default function InvestorProfilePage() { return <Suspense><InvestorProfile offerings={getOfferings()} /></Suspense>; }
