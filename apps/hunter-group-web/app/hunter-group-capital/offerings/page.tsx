import { Suspense } from "react";
import { OfferingsCatalogue } from "@/components/capital/OfferingsCatalogue";
import { getOfferings } from "@/lib/capital/repository";

export default function OfferingsPage() {
  return (
    <Suspense>
      <OfferingsCatalogue offerings={getOfferings()} />
    </Suspense>
  );
}
