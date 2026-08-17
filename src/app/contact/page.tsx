import type { Metadata } from "next";
import { ContactContent } from "./contact-content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach Kobi Soccer School on LINE or Instagram to arrange a trial session in Kobe, plus answers to the questions parents ask most.",
};

export default function ContactPage() {
  return <ContactContent />;
}
