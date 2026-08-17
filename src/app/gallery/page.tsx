import type { Metadata } from "next";
import { GalleryContent } from "./gallery-content";

export const metadata: Metadata = {
  title: "ギャラリー",
  description:
    "淡路島での KOBI SOCCER SCHOOL の練習風景。演出のない、実際のトレーニングの動画と写真です。",
};

export default function GalleryPage() {
  return <GalleryContent />;
}
