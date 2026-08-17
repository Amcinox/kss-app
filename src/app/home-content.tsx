"use client";

import Image from "next/image";
import Link from "next/link";
import { CountUp, Parallax, Reveal, Tilt } from "@/components/motion";
import {
  BTN_GHOST,
  BTN_PILL,
  BTN_PRIMARY,
  CONTAINER,
  Kicker,
  SECTION_PADDING,
  SectionTitle,
} from "@/components/ui";
import { useLang } from "@/lib/lang";

const CARD =
  "h-full rounded-md border border-bone/12 backdrop-blur-[6px] transition-colors";

/**
 * Japanese sets full-width, so the same point size runs roughly twice as wide as
 * Latin. The headline gets its own scale per language rather than one clamp that
 * is either timid in English or overflowing in Japanese.
 */
const HERO_TYPE = {
  ja: "text-[clamp(26px,7.4vw,86px)] leading-[1.12] tracking-[0.01em]",
  en: "max-w-[15ch] text-[clamp(46px,9vw,124px)] leading-[0.92] tracking-[-0.01em] text-balance",
} as const;

export function HomeContent() {
  const { t, lang } = useLang();

  return (
    <>
      {/* ---- hero ---- */}
      <section className="relative flex min-h-[88vh] items-center px-5 pt-16 pb-[70px] sm:pt-[90px]">
        <div className="mx-auto w-full max-w-[1240px]">
          <p
            className="mb-[26px] inline-flex items-center gap-2.5 rounded-full border border-blood/50 px-3.5 py-[7px]"
            style={{ animation: "rise .7s ease both" }}
          >
            <span className="size-[7px] animate-beacon rounded-full bg-blood" />
            <span className="font-display text-[13px] tracking-[0.24em] text-rose uppercase">
              {t.heroKicker}
            </span>
          </p>

          <h1
            className={`m-0 mb-[30px] font-display font-bold uppercase ${HERO_TYPE[lang]}`}
            style={{ animation: "rise .8s ease both" }}
          >
            {t.heroTitle1}
            <span
              className="block text-blood"
              style={{ animation: "rise .95s ease both" }}
            >
              {t.heroTitle2}
            </span>
          </h1>

          <p
            className="m-0 mb-[38px] max-w-[54ch] text-[clamp(16px,2vw,20px)] leading-[1.65] text-pretty text-bone/72"
            style={{ animation: "rise 1.1s ease both" }}
          >
            {t.heroSub}
          </p>

          <div
            className="flex flex-col gap-3.5 sm:flex-row sm:flex-wrap"
            style={{ animation: "rise 1.25s ease both" }}
          >
            <Link href="/contact" className={BTN_PRIMARY}>
              {t.ctaTrial}
            </Link>
            <Link href="/classes" className={BTN_GHOST}>
              {t.ctaClasses}
            </Link>
          </div>

          <p className="mt-13 flex items-center gap-2.5 font-display text-[13px] tracking-[0.18em] text-bone/42 uppercase">
            <span aria-hidden className="inline-block h-px w-[34px] bg-bone/30" />
            {t.kickHint}
          </p>
        </div>
      </section>

      {/* ---- marquee ---- */}
      <div className="overflow-hidden border-y border-bone/10 bg-blood/8 py-4">
        <div className="flex w-max animate-marquee">
          {[0, 1].map((i) => (
            <span
              key={i}
              aria-hidden={i === 1 || undefined}
              className="pr-10 font-display text-xl tracking-[0.28em] text-bone/60 uppercase"
            >
              {t.marquee}
            </span>
          ))}
        </div>
      </div>

      {/* ---- stats ---- */}
      <section className={`${CONTAINER} py-[clamp(64px,9vw,130px)]`}>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6">
          {t.stats.map((stat, i) => (
            <Reveal key={stat.l} variant="roll" index={i}>
              <div className="border-l-2 border-pitch py-1 pl-5">
                <CountUp
                  value={stat.n}
                  className="font-display text-[clamp(40px,6vw,64px)] leading-none font-bold"
                />
                <div className="mt-2 font-display text-sm tracking-[0.16em] text-bone/55 uppercase">
                  {stat.l}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---- coaching pillars ---- */}
      <section className={`${CONTAINER} ${SECTION_PADDING}`}>
        <Kicker>{t.pillarsKicker}</Kicker>
        <Reveal>
          {/* `ch` is half a full-width glyph, so a Latin measure orphans Japanese. */}
          <SectionTitle
            className={`mb-12 ${lang === "ja" ? "max-w-[34ch]" : "max-w-[20ch]"}`}
          >
            {t.pillarsTitle}
          </SectionTitle>
        </Reveal>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
          {t.pillars.map((pillar, i) => (
            <Reveal key={pillar.num} variant="swing" index={i}>
              <Tilt
                className={`${CARD} bg-panel/72 px-7 pt-[34px] pb-[38px] hover:border-blood/55`}
              >
                <p className="mb-[22px] font-display text-[13px] tracking-[0.2em] text-bone/35">
                  {pillar.num}
                </p>
                <h3 className="m-0 mb-3 font-display text-[26px] leading-tight font-bold tracking-[0.02em] uppercase">
                  {pillar.t}
                </h3>
                <p className="m-0 text-[15.5px] leading-[1.7] text-pretty text-bone/66">
                  {pillar.d}
                </p>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---- classes preview ---- */}
      <section className={`${CONTAINER} ${SECTION_PADDING}`}>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <SectionTitle>{t.classesTitle}</SectionTitle>
          <Link href="/classes" className={BTN_PILL}>
            {t.seeAll}
          </Link>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-[18px]">
          {t.classes.map((item, i) => (
            <Reveal key={item.name} variant="depth" index={i}>
              <Tilt
                className={`${CARD} relative flex flex-col gap-3.5 bg-linear-to-b from-[rgba(18,22,19,0.85)] to-[rgba(9,11,10,0.85)] px-6 pt-7 pb-[26px] hover:border-pitch/60`}
              >
                <span aria-hidden className="h-[3px] w-11 bg-blood" />
                <h3 className="m-0 font-display text-[23px] leading-[1.1] font-bold uppercase">
                  <Link
                    href="/classes"
                    className="after:absolute after:inset-0 after:content-['']"
                  >
                    {item.name}
                  </Link>
                </h3>
                <p className="m-0 text-[14.5px] leading-[1.6] text-bone/60">
                  {item.short}
                </p>
                <p className="mt-auto pt-3.5 font-display text-[22px] tracking-[0.04em] text-mint">
                  {item.price}
                </p>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---- photo strip ---- */}
      <section className={`${CONTAINER} ${SECTION_PADDING}`}>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-[repeat(auto-fit,minmax(230px,1fr))]">
          {t.gallery.map((photo, i) => (
            <Reveal key={photo.src} variant="flip" index={i}>
              <Link
                href="/gallery"
                className="relative block aspect-3/4 overflow-hidden rounded-md bg-[#12140f]"
              >
                <Parallax speed={1.4} className="absolute inset-x-0 h-[112%]">
                  <Image
                    src={photo.src}
                    alt={photo.cap}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1240px) 50vw, 300px"
                    className="object-cover contrast-105 saturate-90"
                  />
                </Parallax>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---- coach teaser ---- */}
      <section className={`${CONTAINER} ${SECTION_PADDING}`}>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-11 rounded-lg border border-bone/12 bg-[rgba(11,14,12,0.7)] p-[clamp(24px,4vw,48px)]">
          <Parallax speed={0.7}>
            <Image
              src="/uploads/coach-portrait.jpg"
              alt={t.coachName}
              width={1254}
              height={1254}
              sizes="(max-width: 900px) 100vw, 560px"
              className="block max-h-[480px] w-full rounded-md object-cover object-top"
            />
          </Parallax>

          <div>
            <Kicker tone="pitch">{t.coachKicker}</Kicker>
            <h2 className="m-0 mb-[18px] font-display text-[clamp(30px,4vw,50px)] leading-[1.04] font-bold uppercase">
              {t.coachName}
            </h2>
            <p className="m-0 mb-[26px] text-base leading-[1.75] text-pretty text-bone/70">
              {t.coachIntro}
            </p>
            <Link
              href="/coach"
              className="inline-flex min-h-12 items-center justify-center rounded border border-bone/25 px-[26px] py-[15px] font-display text-[15px] tracking-[0.16em] uppercase transition-colors hover:border-blood hover:text-blood"
            >
              {t.readMore}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
