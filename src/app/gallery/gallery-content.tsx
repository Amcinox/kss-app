"use client";

import Image from "next/image";
import { Parallax, Reveal } from "@/components/motion";
import { CONTAINER, PAGE_PADDING, PageHeading } from "@/components/ui";
import { useLang } from "@/lib/lang";

export function GalleryContent() {
  const { t } = useLang();

  return (
    <div className={`${CONTAINER} ${PAGE_PADDING}`}>
      <PageHeading
        kicker={t.galleryKicker}
        title={t.galleryTitle}
        intro={t.galleryIntro}
      />

      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
        {t.gallery.map((photo, i) => (
          <Reveal key={photo.src} variant="depth" index={i}>
            <figure className="m-0 overflow-hidden rounded-md border border-bone/10 bg-[#0d100e]">
              <div className="relative aspect-4/3 overflow-hidden">
                <Parallax speed={1.2} className="absolute inset-x-0 h-[114%]">
                  <Image
                    src={photo.src}
                    alt={photo.cap}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1240px) 50vw, 400px"
                    className="object-cover"
                  />
                </Parallax>
              </div>
              <figcaption className="px-[18px] py-4 text-sm tracking-[0.06em] text-bone/60">
                {photo.cap}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
