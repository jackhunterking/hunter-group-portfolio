import { Suspense } from "react";
import { getOfferings } from "@/lib/capital/repository";
import { CapitalMap } from "./CapitalMap";

export default function MapPage() { return <Suspense><CapitalMap offerings={getOfferings()} /></Suspense>; }
