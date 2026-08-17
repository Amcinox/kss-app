"use client";

import Link from "next/link";
import { Reveal, Tilt } from "@/components/motion";
import {
  BTN_PRIMARY,
  CONTAINER,
  PAGE_PADDING,
  PageHeading,
  SubTitle,
} from "@/components/ui";
import { useLang } from "@/lib/lang";

const BLOCK_GAP = "mb-[clamp(56px,8vw,100px)]";

export function ClassesContent() {
  const { t } = useLang();

  return (
    <div className={`${CONTAINER} ${PAGE_PADDING}`}>
      <PageHeading
        kicker={t.classesKicker}
        title={t.classesTitle}
        intro={t.classesIntro}
        introClassName="mb-14"
      />

      {/* ---- programmes ---- */}
      <div
        className={`grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[18px] ${BLOCK_GAP}`}
      >
        {t.classes.map((item, i) => (
          <Reveal key={item.name} variant="swingR" index={i}>
            <Tilt className="flex h-full flex-col gap-4 rounded-md border border-bone/13 bg-panel/75 px-7 py-8 transition-colors hover:border-blood/50">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h2 className="m-0 font-display text-[27px] font-bold uppercase">
                  {item.name}
                </h2>
                <span className="font-display text-2xl text-mint">
                  {item.price}
                </span>
              </div>

              <p className="m-0 text-[15.5px] leading-[1.7] text-pretty text-bone/68">
                {item.long}
              </p>

              <ul className="mt-1.5 flex list-none flex-wrap gap-2 p-0">
                {item.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-bone/18 px-3 py-1.5 font-display text-[12.5px] tracking-[0.1em] text-bone/60 uppercase"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </Tilt>
          </Reveal>
        ))}
      </div>

      {/* ---- weekly schedule ---- */}
      <SubTitle>{t.scheduleTitle}</SubTitle>
      <ul className="list-none overflow-hidden rounded-md border border-bone/13 p-0">
        {t.schedule.map((row, i) => (
          <li key={`${row.day}-${row.time}`}>
            <Reveal
              index={i}
              className="grid grid-cols-2 gap-x-5 gap-y-2 border-b border-bone/9 bg-[rgba(10,13,11,0.6)] px-5 py-5 sm:grid-cols-[repeat(auto-fit,minmax(160px,1fr))] sm:px-6"
            >
              <span className="font-display text-xl tracking-[0.1em] text-blood uppercase">
                {row.day}
              </span>
              <span className="font-display text-xl tracking-[0.06em]">
                {row.time}
              </span>
              <span className="col-span-2 text-[15px] text-bone/80 sm:col-span-1">
                {row.group}
              </span>
              <span className="col-span-2 text-[15px] text-bone/55 sm:col-span-1">
                {row.place}
              </span>
            </Reveal>
          </li>
        ))}
      </ul>
      <p
        className={`mt-4 max-w-[60ch] text-[14.5px] leading-[1.7] text-bone/55 ${BLOCK_GAP}`}
      >
        {t.scheduleNote}
      </p>

      {/* ---- grounds ---- */}
      <SubTitle>{t.locationsTitle}</SubTitle>
      <div className="mb-[clamp(48px,7vw,90px)] grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[18px]">
        {t.locations.map((ground, i) => (
          <Reveal key={ground.name} variant="swing" index={i}>
            <Tilt className="h-full rounded-md border border-bone/13 bg-panel/75 px-[26px] py-[30px]">
              <h3 className="m-0 mb-2.5 font-display text-2xl font-bold uppercase">
                {ground.name}
              </h3>
              <p className="m-0 mb-2 text-[15px] leading-[1.65] text-bone/66">
                {ground.addr}
              </p>
              <p className="m-0 font-display text-sm tracking-[0.08em] text-mint uppercase">
                {ground.access}
              </p>
            </Tilt>
          </Reveal>
        ))}
      </div>

      {/* ---- trial call to action ---- */}
      <div className="flex flex-wrap items-center justify-between gap-6 rounded-lg border border-blood/45 bg-blood/8 p-[clamp(28px,5vw,56px)]">
        <div>
          <h2 className="m-0 mb-2 font-display text-[clamp(26px,3.5vw,40px)] font-bold uppercase">
            {t.trialCtaTitle}
          </h2>
          <p className="m-0 text-base text-bone/70">{t.trialCtaSub}</p>
        </div>
        <Link href="/contact" className={BTN_PRIMARY}>
          {t.ctaTrial}
        </Link>
      </div>
    </div>
  );
}
