import type { ReactNode } from "react";

/** Centred 1240px column with the page gutter. */
export const CONTAINER = "mx-auto w-full max-w-[1240px] px-5";

/** Top and bottom breathing room for a full inner page. */
export const PAGE_PADDING =
  "pt-[clamp(56px,8vw,110px)] pb-[clamp(64px,9vw,120px)]";

/** Gap between stacked sections on the home page. */
export const SECTION_PADDING = "pb-[clamp(64px,9vw,130px)]";

export const BTN_PRIMARY =
  "inline-flex min-h-14 cursor-pointer items-center justify-center rounded bg-blood px-[34px] py-[18px] font-display text-[17px] font-bold tracking-[0.16em] text-white uppercase shadow-[0_14px_40px_rgba(225,18,28,0.28)] transition-all hover:-translate-y-0.5 hover:bg-blood-hot";

export const BTN_GHOST =
  "inline-flex min-h-14 cursor-pointer items-center justify-center rounded border border-bone/28 px-[34px] py-[18px] font-display text-[17px] font-semibold tracking-[0.16em] uppercase transition-colors hover:border-pitch hover:text-mint";

export const BTN_PILL =
  "inline-flex min-h-[46px] cursor-pointer items-center justify-center rounded-full border border-bone/25 px-[22px] py-[13px] font-display text-sm tracking-[0.16em] uppercase transition-colors hover:border-blood hover:text-blood";

export function Kicker({
  tone = "blood",
  children,
}: {
  tone?: "blood" | "pitch";
  children: ReactNode;
}) {
  return (
    <p
      className={`mb-3.5 font-display text-[13px] tracking-[0.28em] uppercase ${
        tone === "blood" ? "text-blood" : "text-pitch"
      }`}
    >
      {children}
    </p>
  );
}

/** Section heading used inside the home page. */
export function SectionTitle({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <h2
      className={`m-0 font-display text-[clamp(32px,5vw,60px)] leading-[1.02] font-bold uppercase ${className}`}
    >
      {children}
    </h2>
  );
}

/** Smaller heading used for sub-sections on the inner pages. */
export function SubTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-7 font-display text-[clamp(28px,4.5vw,52px)] font-bold uppercase">
      {children}
    </h2>
  );
}

/** Kicker + H1 + intro block that opens the Classes, Gallery and Contact pages. */
export function PageHeading({
  kicker,
  title,
  intro,
  introClassName = "mb-[52px]",
}: {
  kicker: string;
  title: string;
  intro: string;
  introClassName?: string;
}) {
  return (
    <>
      <Kicker>{kicker}</Kicker>
      <h1 className="m-0 mb-5 font-display text-[clamp(40px,7vw,88px)] leading-[0.98] font-bold uppercase">
        {title}
      </h1>
      <p
        className={`m-0 max-w-[60ch] text-[17px] leading-[1.7] text-pretty text-bone/66 ${introClassName}`}
      >
        {intro}
      </p>
    </>
  );
}
