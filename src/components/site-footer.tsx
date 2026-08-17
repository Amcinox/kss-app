"use client";

import Image from "next/image";
import Link from "next/link";
import {
  EMAIL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  LINE_HANDLE,
  LINE_URL,
  NAV_ROUTES,
} from "@/lib/copy";
import { useLang } from "@/lib/lang";

const COLUMN_LABEL =
  "font-display text-[13px] tracking-[0.22em] text-bone/40 uppercase";

export function SiteFooter() {
  const { t } = useLang();

  return (
    <footer className="mt-10 border-t border-bone/12 bg-ink-deep/90">
      <div className="mx-auto grid max-w-[1240px] grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-[34px] px-5 pt-[54px] pb-10">
        <div className="flex flex-col gap-3.5">
          <Image
            src="/uploads/logo.png"
            alt="Kobi Soccer School"
            width={62}
            height={62}
            className="size-[62px] object-contain"
          />
          <p className="max-w-[30ch] text-[14.5px] leading-[1.7] text-bone/50">
            {t.footerBlurb}
          </p>
        </div>

        <nav className="flex flex-col gap-3" aria-label={t.navLabel}>
          <span className={COLUMN_LABEL}>{t.navLabel}</span>
          {NAV_ROUTES.map((href, i) => (
            <Link
              key={href}
              href={href}
              className="text-[15px] text-bone/80 transition-colors hover:text-blood"
            >
              {t.nav[i]}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3">
          <span className={COLUMN_LABEL}>{t.contactLabel}</span>
          <a
            href={LINE_URL}
            target="_blank"
            rel="noopener"
            className="text-[15px] text-bone/80 transition-colors hover:text-blood"
          >
            LINE {LINE_HANDLE}
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener"
            className="text-[15px] text-bone/80 transition-colors hover:text-blood"
          >
            Instagram {INSTAGRAM_HANDLE}
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="text-[15px] break-all text-bone/80 transition-colors hover:text-blood"
          >
            {EMAIL}
          </a>
          <span className="text-[15px] text-bone/50">{t.footerCity}</span>
        </div>
      </div>

      <div className="mx-auto max-w-[1240px] px-5 pb-[34px] text-[13px] tracking-[0.08em] text-bone/32">
        © 2026 Kobi Soccer School
      </div>
    </footer>
  );
}
