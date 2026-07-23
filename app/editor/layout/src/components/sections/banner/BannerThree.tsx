"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  getBlock,
  resolveSectionBlocks,
  type ButtonBlock,
  type CardBlock,
} from "../types/section";
import { SectionProps } from "./../../../types/section";
import BlockRenderer from "../blocks/BlockRenderer";

export default function BannerThree({ data = {}, blocks }: SectionProps) {
  const resolvedBlocks = resolveSectionBlocks({ blocks, data });
  const carousel = getBlock(resolvedBlocks, "carousel", "banner-slider");
  const slides = useMemo(
    () =>
      (carousel?.items.filter(
        (item): item is CardBlock => item.type === "card",
      ) ?? []).filter((slide) => slide.image),
    [carousel],
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const bannerHeight = data.bannerHeight ?? 70;
  const safeActiveIndex = slides.length ? activeIndex % slides.length : 0;
  const activeSlide = slides[safeActiveIndex] ?? slides[0];
  const slideButton = activeSlide?.blocks?.find(
    (block): block is ButtonBlock => block.type === "button",
  );

  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % slides.length);
    }, 3000);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  const goToPreviousSlide = () => {
    setActiveIndex((index) => (index - 1 + slides.length) % slides.length);
  };

  const goToNextSlide = () => {
    setActiveIndex((index) => (index + 1) % slides.length);
  };

  if (!activeSlide?.image) return null;

  return (
    <section
      className="relative grid w-full overflow-hidden bg-[#f3efe7] lg:grid-cols-[58%_42%]"
      style={{ minHeight: `${bannerHeight}dvh` }}
    >
      <div className="relative min-h-[420px] overflow-hidden lg:m-5 lg:mr-0">
        <Image
          key={activeSlide.id}
          src={activeSlide.image}
          alt={activeSlide.alt ?? activeSlide.title ?? ""}
          data-editor-media
          data-editor-media-type="image"
          data-editor-media-src={activeSlide.image}
          fill
          priority
          sizes="(min-width: 1024px) 58vw, 100vw"
          unoptimized={activeSlide.image?.startsWith("data:")}
          className="object-cover transition-opacity duration-500"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
        <span className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-900">
          Featured story
        </span>
      </div>

      <div className="relative flex items-center px-6 py-16 sm:px-10 lg:px-12">
        <div className="max-w-xl">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-[#9b6848]">
            Slide {String(safeActiveIndex + 1).padStart(2, "0")}
          </p>
          {activeSlide.title && (
            <h1 className="font-serif text-4xl leading-[1.02] text-[#27211d] sm:text-5xl lg:text-6xl">
              {activeSlide.title}
            </h1>
          )}
          {activeSlide.desc && (
            <p className="mt-6 max-w-lg text-sm leading-7 text-[#6d625b] sm:text-base">
              {activeSlide.desc}
            </p>
          )}
          {slideButton && (
            <BlockRenderer
              block={slideButton}
              className="mt-8 inline-flex rounded-full bg-[#27211d] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#9b6848]"
            />
          )}
        </div>
      </div>

      {slides.length > 1 && (
        <>
          <div className="absolute bottom-5 left-5 z-20 flex gap-2 lg:bottom-10 lg:left-[calc(58%+3rem)]">
            <button
              type="button"
              onClick={goToPreviousSlide}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#27211d]/20 bg-white text-[#27211d] transition hover:bg-[#27211d] hover:text-white"
              aria-label="Previous banner slide"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={goToNextSlide}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#27211d]/20 bg-white text-[#27211d] transition hover:bg-[#27211d] hover:text-white"
              aria-label="Next banner slide"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="absolute bottom-7 right-6 z-20 flex gap-2 lg:right-10">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === safeActiveIndex
                    ? "w-8 bg-[#9b6848]"
                    : "w-2 bg-[#27211d]/20"
                }`}
                aria-label={`Show banner slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
