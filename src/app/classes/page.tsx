import type { Metadata } from "next";
import { ClassesContent } from "./classes-content";

export const metadata: Metadata = {
  title: "Classes & Prices",
  description:
    "Regular group training, Saturday clinics, 1-on-1 coaching and trial sessions in Nada-ku and Higashinada-ku, Kobe. Weekly schedule and prices.",
};

export default function ClassesPage() {
  return <ClassesContent />;
}
