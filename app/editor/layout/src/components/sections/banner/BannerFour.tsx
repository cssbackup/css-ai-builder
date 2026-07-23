"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SectionProps } from "./../../../types/section";

export default function BannerFour({ data = {} }: SectionProps) {
  const slides = (data.bannerSlides ?? []).filter(
    (slide) => slide.video || slide.image,
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const bannerHeight = data.bannerHeight ?? 70;
  const safeActiveIndex = slides.length ? activeIndex % slides.length : 0;
  const activeSlide = slides[safeActiveIndex] ?? slides[0];

  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % slides.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  const goToPreviousSlide = () => {
    setActiveIndex((index) => (index - 1 + slides.length) % slides.length);
  };

  const goToNextSlide = () => {
    setActiveIndex((index) => (index + 1) % slides.length);
  };

  if (!activeSlide) return null;

  return (
    <section
      className="relative w-full overflow-hidden bg-slate-950"
      style={{ height: `${bannerHeight}dvh` }}
    >
      {activeSlide.video ? (
        <video
          key={activeSlide.video}
          className="absolute inset-0 h-full w-full object-cover"
          src={activeSlide.video}
          poster={activeSlide.image}
          data-editor-media
          data-editor-media-type="video"
          data-editor-media-src={activeSlide.video}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <div
          data-editor-media
          data-editor-media-type="image"
          data-editor-media-src={activeSlide.image}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: activeSlide.image
              ? `url(${activeSlide.image})`
              : undefined,
          }}
        />
      )}

      <div className="pointer-events-none absolute inset-0 bg-black/55" />

      <div className="absolute left-6 top-6 z-20 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.28em] text-white/75 sm:left-10 sm:top-9">
        <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
        Motion feature
      </div>

      <div className="relative z-10 flex h-full items-end px-5 pb-8 pt-28 sm:px-8 sm:pb-10 lg:px-12 lg:pb-12">
        <div className="grid w-full items-end gap-7 border-t border-white/35 pt-7 text-white lg:grid-cols-[1fr_360px]">
          <div>
          {activeSlide.title && (
            <h1 className="max-w-4xl text-4xl font-semibold leading-[1.02] sm:text-5xl lg:text-7xl">
              {activeSlide.title}
            </h1>
          )}
          </div>
          <div>
          {activeSlide.desc && (
            <p className="max-w-xl text-sm leading-6 text-white/75 sm:text-base">
              {activeSlide.desc}
            </p>
          )}
          {activeSlide.button && (
            <a
              href={activeSlide.button.href}
              className="mt-5 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-red-500 hover:text-white"
            >
              {activeSlide.button.label}
            </a>
          )}
          </div>
        </div>
      </div>

      {slides.length > 1 && (
        <>
          <div className="absolute right-6 top-6 z-20 flex items-center gap-2 sm:right-10 sm:top-8">
            <span className="mr-2 text-xs font-semibold tabular-nums text-white/70">
              {String(safeActiveIndex + 1).padStart(2, "0")} /{" "}
              {String(slides.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={goToPreviousSlide}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/35 bg-black/20 text-white backdrop-blur transition hover:bg-white hover:text-slate-950"
              aria-label="Previous video slide"
            >
              <ChevronLeft size={19} />
            </button>
            <button
              type="button"
              onClick={goToNextSlide}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/35 bg-black/20 text-white backdrop-blur transition hover:bg-white hover:text-slate-950"
              aria-label="Next video slide"
            >
              <ChevronRight size={19} />
            </button>
          </div>
        </>
      )}
    </section>
  );
}
