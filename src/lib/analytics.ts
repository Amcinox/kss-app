import { sendGAEvent } from "@next/third-parties/google";

/**
 * GA4 measurement ID. Public by design — it ships in the page source — but kept
 * in the environment so a preview deployment can point somewhere else, and so
 * local development sends nothing at all: with the variable unset the tag never
 * renders, which keeps `pnpm dev` traffic out of the property's reports.
 */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/** The ways a parent can reach the school, as reported to GA4. */
export type ContactChannel = "line" | "instagram" | "email";

/**
 * Records a contact-CTA click as a GA4 `generate_lead` event.
 *
 * The property was set up with "Generate leads" as its business objective, and
 * for this site an enquiry is the only conversion there is. Enhanced
 * measurement already logs the LINE and Instagram links as outbound clicks, but
 * not `mailto:` ones, and an outbound click cannot say which of them was a
 * genuine enquiry — so the three CTAs report themselves explicitly.
 */
export function trackContact(channel: ContactChannel) {
  if (!GA_ID) return;
  sendGAEvent("event", "generate_lead", { method: channel });
}
