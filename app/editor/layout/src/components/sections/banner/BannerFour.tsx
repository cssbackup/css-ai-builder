"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BannerSlideData, SectionProps } from "./../../../types/section";

const fallbackSlides: BannerSlideData[] = [
  {
    image: "/bg1.jpg",
    video: "/video.mp4",
    alt: "Video banner slide",
    title: "Video stories that move",
    desc: "Use video backgrounds with editable slide text and buttons.",
    button: {
      label: "Watch now",
      href: "#",
      variant: "primary",
    },
  },
];

export default function BannerFour({ data = {} }: SectionProps) {
  const slides = (data.bannerSlides?.length
    ? data.bannerSlides
    : fallbackSlides
  ).filter((slide) => slide.video || slide.image);
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
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${activeSlide.image})` }}
        />
      )}

      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 flex h-full items-center px-6 md:px-12">
        <div className="max-w-2xl space-y-4 text-white">
          <h1 className="text-3xl font-semibold leading-tight md:text-5xl">
            {activeSlide.title}
          </h1>
          {activeSlide.desc && (
            <p className="max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
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
            className="absolute left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-950 shadow-lg transition hover:bg-white"
            aria-label="Previous video slide"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            onClick={goToNextSlide}
            className="absolute right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-950 shadow-lg transition hover:bg-white"
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
