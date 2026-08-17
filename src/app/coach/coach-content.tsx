"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion";
import { CONTAINER, Kicker, PAGE_PADDING, SubTitle } from "@/components/ui";
import { useLang } from "@/lib/lang";

const BLOCK_GAP = "mb-[clamp(56px,8vw,110px)]";

export function CoachContent() {
  const { t } = useLang();

  return (
    <div className={`${CONTAINER} ${PAGE_PADDING}`}>
      {/* ---- portrait and bio ---- */}
      <div
        className={`grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-11 ${BLOCK_GAP}`}
      >
        <div>
          <Kicker tone="pitch">{t.coachKicker}</Kicker>
          <h1 className="m-0 mb-[22px] font-display text-[clamp(40px,6.5vw,82px)] leading-[0.98] font-bold uppercase">
            {t.coachName}
          </h1>
          <p className="m-0 mb-[18px] text-[17px] leading-[1.8] text-pretty text-bone/72">
            {t.coachBio1}
          </p>
          <p className="m-0 text-[17px] leading-[1.8] text-pretty text-bone/72">
            {t.coachBio2}
          </p>
        </div>

        <Image
          src="/uploads/coach.jpg"
          alt={t.coachName}
          width={1371}
          height={1600}
          priority
          sizes="(max-width: 900px) 100vw, 560px"
          className="block max-h-[560px] w-full rounded-lg object-cover object-top"
        />
      </div>

      {/* ---- pull quote ---- */}
      <blockquote
        className={`max-w-[40ch] border-l-[3px] border-blood py-2 pl-[26px] ${BLOCK_GAP}`}
      >
        <p className="m-0 font-display text-[clamp(24px,3.5vw,40px)] leading-[1.25] uppercase">
          {t.coachQuote}
        </p>
      </blockquote>

      {/* ---- how we work ---- */}
      <SubTitle>{t.philosophyTitle}</SubTitle>
      <div
        className={`grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[18px] ${BLOCK_GAP}`}
      >
        {t.philosophy.map((item, i) => (
          <Reveal key={item.num} variant="flip" index={i}>
            <div className="border-t border-bone/16 pt-[22px]">
              <p className="mb-3 font-display text-[13px] tracking-[0.2em] text-pitch">
                {item.num}
              </p>
              <h3 className="m-0 mb-2.5 font-display text-[23px] font-bold uppercase">
                {item.t}
              </h3>
              <p className="m-0 text-[15px] leading-[1.7] text-pretty text-bone/65">
                {item.d}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* ---- background ---- */}
      <SubTitle>{t.pathTitle}</SubTitle>
      <ol className="list-none p-0">
        {t.timeline.map((entry, i) => (
          <li key={entry.year}>
            <Reveal
              variant="roll"
              index={i}
              className="grid grid-cols-1 items-baseline gap-1 border-b border-bone/10 py-[22px] sm:grid-cols-[110px_1fr] sm:gap-6"
            >
              <span className="font-display text-[22px] tracking-[0.06em] text-blood">
                {entry.year}
              </span>
              <span className="text-base leading-[1.65] text-bone/78">
                {entry.text}
              </span>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}
