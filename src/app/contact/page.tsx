import type { Metadata } from "next";
import { ContactContent } from "./contact-content";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description:
    "KOBI SOCCER SCHOOL へのお問い合わせと、初回無料の体験練習のお申し込み。LINEが一番早くご連絡いただけます。よくあるご質問も掲載しています。",
};

export default function ContactPage() {
  return <ContactContent />;
}
