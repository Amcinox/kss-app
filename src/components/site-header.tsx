"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NAV_ROUTES } from "@/lib/copy";
import { useLang } from "@/lib/lang";

const PILL =
  "font-display text-sm font-semibold tracking-[0.14em] uppercase px-3.5 py-2.5 rounded-full border transition-all duration-250 hover:border-blood/90 hover:text-white";

const ACTIVE_PILL = "border-blood/70 bg-blood/18 text-white";
const IDLE_PILL = "border-bone/16 text-bone/62";

/** Three bars that cross into an X while the panel is open. */
function MenuIcon({ open }: { open: boolean }) {
  const bar =
    "absolute left-1/2 h-[1.5px] w-[18px] -translate-x-1/2 bg-current transition-all duration-300";
  return (
    <span aria-hidden className="relative block size-5">
      <span
        className={`${bar} ${open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-[5px]"}`}
      />
      <span
        className={`${bar} top-1/2 -translate-y-1/2 ${open ? "opacity-0" : "opacity-100"}`}
      />
      <span
        className={`${bar} ${open ? "top-1/2 -translate-y-1/2 -rotate-45" : "top-[13px]"}`}
      />
    </span>
  );
}

export function SiteHeader() {
  const { t, toggle } = useLang();
  const pathname = usePathname();
  const progressRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);

  // The panel is a navigation aid, not page state — drop it once we've moved.
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.body.scrollHeight - window.innerHeight;
      const ratio = window.scrollY / Math.max(1, scrollable);
      if (progressRef.current) {
        progressRef.current.style.width = `${Math.min(100, ratio * 100).toFixed(1)}%`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-30 border-b border-bone/10 bg-ink/72 backdrop-blur-[14px]">
      <div className="mx-auto flex max-w-[1240px] items-center gap-3 px-5 py-3">
        <Link href="/" className="mr-auto flex items-center gap-3">
          <Image
            src="/uploads/logo.png"
            alt=""
            width={44}
            height={44}
            priority
            className="block size-10 object-contain sm:size-11"
          />
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-bold tracking-[0.06em] uppercase sm:text-xl">
              Kobi
            </span>
            <span className="font-display text-[10px] font-medium tracking-[0.22em] text-pitch uppercase sm:text-[11px]">
              Soccer School
            </span>
          </span>
        </Link>

        <nav
          aria-label={t.navLabel}
          className="hidden items-center gap-1.5 md:flex"
        >
          {NAV_ROUTES.map((href, i) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`${PILL} ${active ? ACTIVE_PILL : IDLE_PILL}`}
              >
                {t.nav[i]}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={toggle}
          className="shrink-0 cursor-pointer rounded-full border border-pitch/60 bg-pitch/14 px-3.5 py-2.5 font-display text-sm font-bold tracking-[0.14em] text-mint transition-colors hover:bg-pitch/30 hover:text-white"
        >
          {t.langLabel}
        </button>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          aria-label={t.menuLabel}
          className={`flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border transition-colors md:hidden ${
            menuOpen ? ACTIVE_PILL : IDLE_PILL
          }`}
        >
          <MenuIcon open={menuOpen} />
        </button>
      </div>

      {/* Collapsible panel — 0fr → 1fr animates the height without a magic number. */}
      <div
        id="site-menu"
        inert={!menuOpen}
        className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out md:hidden ${
          menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <nav aria-label={t.navLabel} className="min-h-0 overflow-hidden">
          <ul className="flex list-none flex-col gap-1.5 border-t border-bone/10 bg-ink/95 px-5 py-4">
            {NAV_ROUTES.map((href, i) => {
              const active = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                    className={`flex min-h-12 items-center rounded-full border px-5 font-display text-base font-semibold tracking-[0.14em] uppercase transition-colors ${
                      active ? ACTIVE_PILL : IDLE_PILL
                    }`}
                  >
                    {t.nav[i]}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className="h-0.5 bg-bone/8">
        <div
          ref={progressRef}
          className="h-full w-0 bg-linear-to-r from-pitch to-blood transition-[width] duration-100 ease-linear"
        />
      </div>
    </header>
  );
}
