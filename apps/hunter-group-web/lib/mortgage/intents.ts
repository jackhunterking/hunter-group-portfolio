/** The six Mortgage borrowing journeys (route slugs for /mortgage/[intent]). */
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
