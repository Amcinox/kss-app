"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/components/motion";
import { useLang } from "@/lib/lang";
import type { Clip } from "@/lib/copy";

/**
 * A muted training clip that plays only while it is on screen. The night-pitch
 * canvas already runs its own animation loop, so a video decoding out of view is
 * work nobody can see — and on a phone it is battery nobody agreed to spend.
 *
 * The frame doubles as a play/pause button: WCAG 2.2.2 asks for a stop control
 * for anything that moves for longer than five seconds, and both clips do.
 */
export function SessionClip({ clip }: { clip: Clip }) {
  const { t } = useLang();
  const reduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  // What the visitor wants. Whether it is *currently* playing is also down to
  // scroll position, so this stays the single thing the button toggles.
  const [wantsPlay, setWantsPlay] = useState(true);
  const playing = wantsPlay && !reduced;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!playing) {
      video.pause();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Rejects when the browser's autoplay policy says no; the poster and
          // the play button are already the fallback, so there is nothing to do.
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(video);

    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [playing]);

  return (
    <figure className="m-0 overflow-hidden rounded-md border border-bone/10 bg-[#0d100e]">
      <button
        type="button"
        onClick={() => setWantsPlay((on) => !on)}
        aria-pressed={playing}
        className="group relative block aspect-9/16 w-full cursor-pointer overflow-hidden"
      >
        <video
          ref={videoRef}
          src={clip.src}
          poster={clip.poster}
          width={clip.w}
          height={clip.h}
          muted
          loop
          playsInline
          preload="none"
          tabIndex={-1}
          aria-label={clip.cap}
          className="size-full object-cover"
        />

        <span
          aria-hidden
          className={`absolute inset-x-0 bottom-0 flex items-end justify-start bg-linear-to-t from-black/55 to-transparent p-3 transition-opacity ${
            // Never fully hidden: on a touch screen there is no hover, and the
            // pause control has to stay findable while the clip is moving.
            playing
              ? "opacity-55 group-hover:opacity-100 group-focus:opacity-100"
              : "opacity-100"
          }`}
        >
          <span className="flex size-10 items-center justify-center rounded-full bg-ink/70 backdrop-blur-[3px]">
            {playing ? <PauseIcon /> : <PlayIcon />}
          </span>
        </span>

        <span className="sr-only">
          {playing ? t.clipPause : t.clipPlay}：{clip.cap}
        </span>
      </button>

      <figcaption className="px-[18px] py-4 text-sm tracking-[0.06em] text-bone/60">
        {clip.cap}
      </figcaption>
    </figure>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 fill-bone" aria-hidden>
      <path d="M8 5.5v13l11-6.5z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 fill-bone" aria-hidden>
      <path d="M7 5h3.4v14H7zm6.6 0H17v14h-3.4z" />
    </svg>
  );
}
