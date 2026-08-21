import type { Metadata } from "next";
import { CoachContent } from "./coach-content";

export const metadata: Metadata = {
  title: "コーチ紹介",
  description:
    "KOBI SOCCER SCHOOL 代表コーチ「Kobi」シャリフ・アブデルカビル。モロッコ出身、淡路島を拠点に活動。JFA公認B級コーチライセンス。指導方針・指導歴・資格・選手歴をご紹介します。",
};

export default function CoachPage() {
  return <CoachContent />;
}
