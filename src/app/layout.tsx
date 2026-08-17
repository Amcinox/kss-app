import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/lib/lang";
import { PitchScene } from "@/components/pitch-scene";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

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
  title: {
    default: "Kobi Soccer School",
    template: "%s · Kobi Soccer School",
  },
  description:
    "Small-group football coaching for children in Kobe. Technique, decisions, character. Ages 4–14, led by coach Yassine “Kobi” Amrani.",
  keywords: [
    "Kobi Soccer School",
    "Kobe football school",
    "神戸 サッカースクール",
    "Hyogo youth football",
  ],
  openGraph: {
    title: "Kobi Soccer School",
    description:
      "Small-group football coaching for children in Kobe. Technique, decisions, character.",
    type: "website",
    locale: "en",
    alternateLocale: "ja_JP",
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
      lang="en"
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
      </body>
    </html>
  );
}
