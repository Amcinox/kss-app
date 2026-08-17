import type { Metadata } from "next";
import { CoachContent } from "./coach-content";

export const metadata: Metadata = {
  title: "コーチ紹介",
  description:
    "KOBI SOCCER SCHOOL 代表コーチ「Kobi」シャリフ・アブデルカビル。モロッコ出身、JFA B級コーチライセンス。指導方針と経歴をご紹介します。",
};

export default function CoachPage() {
  return <CoachContent />;
}
