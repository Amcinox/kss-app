import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/lib/lang";
import { PitchScene } from "@/components/pitch-scene";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import { GA_ID } from "@/lib/analytics";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  // Set NEXT_PUBLIC_SITE_URL at deploy time so social-share URLs resolve.
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : undefined,
  title: {
    default: "KOBI SOCCER SCHOOL｜淡路島のサッカースクール",
    template: "%s｜KOBI SOCCER SCHOOL",
  },
  description:
    "兵庫県淡路市のサッカースクール。自分で観て、考えて、挑戦できる選手へ。ゲームの中で技術・判断力・創造性を育てます。初回無料の体験練習を受付中。",
  keywords: [
    "KOBI SOCCER SCHOOL",
    "淡路島 サッカースクール",
    "淡路市 サッカー",
    "兵庫 サッカースクール",
    "Awaji soccer school",
  ],
  openGraph: {
    title: "KOBI SOCCER SCHOOL｜淡路島のサッカースクール",
    description:
      "自分で観て、考えて、挑戦できる選手へ。淡路島で個の育成を行うサッカースクールです。",
    type: "website",
    locale: "ja_JP",
    alternateLocale: "en",
    images: ["/uploads/banner-wide.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#070908",
};

/**
 * Full-viewport wash that sits between the WebGL pitch and the page content, so
 * text keeps its contrast wherever the camera happens to be.
 */
const SCENE_WASH =
  "linear-gradient(180deg, rgba(7,9,8,0.10) 0%, rgba(7,9,8,0.45) 40%, rgba(7,9,8,0.82) 100%), " +
  "radial-gradient(120% 80% at 50% 0%, rgba(225,18,28,0.12), transparent 60%), " +
  "radial-gradient(90% 70% at 80% 100%, rgba(14,138,62,0.12), transparent 60%)";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      data-scroll-behavior="smooth"
      className={`${barlow.variable} ${barlowCondensed.variable} h-full`}
    >
      <body className="min-h-full font-sans">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        {/*
          Noto Sans JP is loaded from Google rather than `next/font/google`
          because next/font only offers its latin subsets — self-hosting it that
          way would ship the file without a single Japanese glyph. The lint rule
          below targets per-page fonts in the Pages Router; this is the App
          Router root layout, so the stylesheet applies to every route.
        */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          precedence="default"
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap"
        />

        <LangProvider>
          <PitchScene />
          <div
            aria-hidden
            className="pointer-events-none fixed inset-0 z-1"
            style={{ background: SCENE_WASH }}
          />

          <div className="relative z-2 flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </LangProvider>

        {/*
          Renders only when NEXT_PUBLIC_GA_ID is set, so `pnpm dev` never counts
          itself. GA4 enhanced measurement is on for this stream, which covers
          the App Router's client-side navigations through its history-change
          page views — there is no manual pageview call to make here.
        */}
        {GA_ID ? <GoogleAnalytics gaId={GA_ID} /> : null}
      </body>
    </html>
  );
}
