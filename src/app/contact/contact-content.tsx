"use client";

import { useState } from "react";
import {
  EMAIL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  LINE_HANDLE,
  LINE_URL,
} from "@/lib/copy";
import { CONTAINER, PAGE_PADDING, PageHeading, SubTitle } from "@/components/ui";
import { useLang } from "@/lib/lang";

const CHANNEL_CARD =
  "flex min-h-[150px] flex-col justify-center gap-2.5 rounded-lg border px-[30px] py-[34px] transition-colors";

const CHANNEL_LABEL =
  "font-display text-[13px] tracking-[0.24em] uppercase";

const CHANNEL_TITLE =
  "font-display text-[clamp(24px,3vw,34px)] font-bold uppercase";

export function ContactContent() {
  const { t } = useLang();
  const [openFaq, setOpenFaq] = useState(-1);

  return (
    <div className={`${CONTAINER} ${PAGE_PADDING}`}>
      <PageHeading
        kicker={t.contactKicker}
        title={t.contactTitle}
        intro={t.contactIntro}
        introClassName="mb-[46px]"
      />

      {/* ---- channels ---- */}
      <div className="mb-[clamp(56px,8vw,100px)] grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[18px]">
        <a
          href={LINE_URL}
          target="_blank"
          rel="noopener"
          className={`${CHANNEL_CARD} border-pitch/50 bg-pitch/10 hover:bg-pitch/22`}
        >
          <span className={`${CHANNEL_LABEL} text-mint`}>LINE</span>
          <span className={CHANNEL_TITLE}>{t.lineCta}</span>
          <span className="text-[15px] text-bone/60">{LINE_HANDLE}</span>
        </a>

        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener"
          className={`${CHANNEL_CARD} border-blood/50 bg-blood/10 hover:bg-blood/22`}
        >
          <span className={`${CHANNEL_LABEL} text-rose`}>Instagram</span>
          <span className={CHANNEL_TITLE}>{t.igCta}</span>
          <span className="text-[15px] text-bone/60">{INSTAGRAM_HANDLE}</span>
        </a>

        {/* No target/rel — a mailto: hands off to the mail client, not a tab. */}
        <a
          href={`mailto:${EMAIL}`}
          className={`${CHANNEL_CARD} border-bone/25 bg-bone/6 hover:bg-bone/12`}
        >
          <span className={`${CHANNEL_LABEL} text-bone/70`}>Email</span>
          <span className={CHANNEL_TITLE}>{t.emailCta}</span>
          <span className="text-[15px] break-all text-bone/60">{EMAIL}</span>
        </a>
      </div>

      {/* ---- frequently asked ---- */}
      <SubTitle>{t.faqTitle}</SubTitle>
      <div className="border-t border-bone/14">
        {t.faqs.map((faq, i) => {
          const open = openFaq === i;
          return (
            <div key={i} className="border-b border-bone/14">
              <h3 className="m-0">
                <button
                  type="button"
                  id={`faq-trigger-${i}`}
                  aria-expanded={open}
                  aria-controls={`faq-panel-${i}`}
                  onClick={() => setOpenFaq(open ? -1 : i)}
                  className="flex min-h-14 w-full cursor-pointer items-center justify-between gap-5 border-none bg-transparent py-6 text-left font-display text-[clamp(18px,2.2vw,24px)] font-semibold uppercase transition-colors hover:text-blood"
                >
                  <span>{faq.q}</span>
                  <span aria-hidden className="text-[26px] leading-none text-blood">
                    {open ? "–" : "+"}
                  </span>
                </button>
              </h3>

              {open && (
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${i}`}
                >
                  <p className="m-0 max-w-[70ch] pb-[26px] text-base leading-[1.75] text-pretty text-bone/68">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
