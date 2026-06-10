import { PostHog } from "posthog-node";

let client: PostHog | null = null;

/**
 * Server-side PostHog client for capturing events from API routes / server code.
 *
 * Remember to `await posthog.shutdown()` (or `flush()`) before a serverless
 * function returns, otherwise queued events may be dropped.
 */
export function getPostHogServer(): PostHog {
  // Public project key, hardcoded as a fallback. Override via env if needed.
  const key =
    process.env.NEXT_PUBLIC_POSTHOG_KEY ??
    "phc_na55KbvucPk2mkBLzJhZLepgSNqF7bwTGTXXEhDTE972";

  if (!client) {
    client = new PostHog(key, {
      host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
      flushAt: 1,
      flushInterval: 0,
    });
  }
  return client;
}
