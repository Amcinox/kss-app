import type { Metadata } from "next";
import { GalleryContent } from "./gallery-content";

export const metadata: Metadata = {
  title: "Training Gallery",
  description:
    "Photos from regular Kobi Soccer School sessions in Kobe. No staged shots — this is what a Tuesday evening actually looks like.",
};

export default function GalleryPage() {
  return <GalleryContent />;
}
