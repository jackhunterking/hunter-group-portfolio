/** The six Finansman borrowing journeys (route slugs for /finansman/[intent]). */
export const INTENTS = [
  "ev-almak",
  "yenileme",
  "tadilat",
  "borc-toparlama",
  "ev-degeri",
  "heloc",
] as const;

export type Intent = (typeof INTENTS)[number];

export function isIntent(value: string): value is Intent {
  return (INTENTS as readonly string[]).includes(value);
}
