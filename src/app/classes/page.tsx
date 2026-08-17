import type { Metadata } from "next";
import { ClassesContent } from "./classes-content";

export const metadata: Metadata = {
  title: "クラス・料金",
  description:
    "淡路島のサッカースクール KOBI のクラスと料金。レギュラークラスは1回¥1,000、11回¥10,000の回数券、個人レッスン60分¥5,000。週間スケジュールと練習会場のご案内。",
};

export default function ClassesPage() {
  return <ClassesContent />;
}
