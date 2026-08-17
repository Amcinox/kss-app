import type { Metadata } from "next";
import { CoachContent } from "./coach-content";

export const metadata: Metadata = {
  title: "The Coach",
  description:
    "Yassine “Kobi” Amrani — Casablanca academy player, JFA C licence, coaching children in Kobe since 2019. Background, method and promises to parents.",
};

export default function CoachPage() {
  return <CoachContent />;
}
