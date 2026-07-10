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

      <div className="relative z-10 flex h-full items-center px-5 py-12 sm:px-6 md:px-12">
        <div className="max-w-2xl space-y-4 text-white">
          {activeSlide.title && (
            <h1 className="text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
              {activeSlide.title}
            </h1>
          )}
          {activeSlide.desc && (
            <p className="max-w-xl text-sm leading-relaxed text-white/85 sm:text-base md:text-lg">
              {activeSlide.desc}
            </p>
          )}
          {activeSlide.button && (
            <a
              href={activeSlide.button.href}
              className="inline-flex rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              {activeSlide.button.label}
            </a>
          )}
        </div>
      </div>

      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={goToPreviousSlide}
            className="absolute left-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-950 shadow-lg transition hover:bg-white sm:left-4 sm:h-10 sm:w-10"
            aria-label="Previous video slide"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            onClick={goToNextSlide}
            className="absolute right-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-950 shadow-lg transition hover:bg-white sm:right-4 sm:h-10 sm:w-10"
            aria-label="Next video slide"
          >
            <ChevronRight size={22} />
          </button>

          <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {slides.map((slide, index) => (
              <button
                key={`${slide.title}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === safeActiveIndex ? "w-8 bg-white" : "w-2 bg-white/50"
                }`}
                aria-label={`Show video slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
