/**
 * WhatsApp deep-link helper for Finansman CTAs.
 *
 * The site is WhatsApp-first (see ContactSection.tsx, which links to the same
 * number). Finansman leads route here rather than the guide-only
 * /api/lead-capture email route, which is scoped to alici/satici PDF guides.
 */

export const WA_NUMBER = "16473913311";

export function waHref(text: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}
