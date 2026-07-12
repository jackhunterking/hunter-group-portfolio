import { documents, managers, offerings, properties, shareClasses, sources } from "./data";
import { validateCapitalData } from "./schema";
import type { OfferingBundle } from "./types";

validateCapitalData();

function bundle(id: string): OfferingBundle | undefined {
  const offering = offerings.find((item) => item.id === id);
  if (!offering) return undefined;
  const manager = managers.find((item) => item.id === offering.managerId);
  if (!manager) return undefined;
  return {
    ...offering,
    manager,
    shareClasses: shareClasses.filter((item) => offering.shareClassIds.includes(item.id)),
    properties: properties.filter((item) => offering.propertyIds.includes(item.id)),
    documents: documents.filter((item) => offering.documentIds.includes(item.id) && item.visibility !== "private"),
  };
}

export function getOfferings() {
  return offerings.map((item) => bundle(item.id)).filter((item): item is OfferingBundle => Boolean(item));
}

export function getOfferingBySlug(slug: string) {
  const offering = offerings.find((item) => item.slug === slug);
  return offering ? bundle(offering.id) : undefined;
}

export function getPropertiesForOffering(offeringId: string) {
  return properties.filter((item) => item.offeringIds.includes(offeringId));
}

export function getPublicSources() {
  return sources.filter((item) => item.visibility !== "dealer-only");
}

export const CAPITAL_SCHEMA_VERSION = "1.0.0";
