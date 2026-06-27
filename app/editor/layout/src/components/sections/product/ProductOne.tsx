"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { ProductSlideData, SectionProps } from "./../../../types/section";

const fallbackSlides: ProductSlideData[] = [
  {
    image: "/55.jpg",
    alt: "Laptop product one",
    productTitle: "Builder Nor Showcase",
    productSubtitle: "Create the art of below",
    productInfoTitle: "Inspiration Need",
    productInfoDesc:
      "We assist travelers worldwide with ETA visas and arrivals cards. Get accurate guidance, faster processing, and reliable support before your journey begins.",
    productFeatures: [
      { label: "Small suitcase", price: "+$100" },
      { label: "Cold wind color", price: "+$50" },
      { label: "360° Spin wheels", price: "+$95" },
      { label: "Fixes handle", price: "0" },
    ],
    productTotalPrice: "$1245",
    productShippingText: "Free shipping available",
    button: {
      label: "Know more",
      href: "#",
      variant: "primary",
    },
  },
];

export default function ProductOne({ data }: SectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const slides = data.productSlides?.length
    ? data.productSlides
    : fallbackSlides;
  const activeSlide = slides[activeIndex] ?? slides[0];

  const nextImage = () => {
    setActiveIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setActiveIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-7xl bg-radial  from-white  via-blue-50 to-transparent px-6 py-20 md:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.4fr_1fr]">
          <div>
            <h1 className="text-4xl font-bold leading-tight text-black md:text-5xl">
              {activeSlide.productTitle}
            </h1>

            <p className="mt-3 text-sm text-black">
              {activeSlide.productSubtitle}
            </p>

            <div className="mt-8 w-full max-w-[210px] rounded-sm bg-white p-4 shadow">
              {activeSlide.productFeatures.map((item) => (
                <div
                  key={item.label}
                  className="flex justify-between border-b border-dashed border-gray-300 py-2 text-xs text-black"
                >
                  <span>{item.label}</span>
                  <span>{item.price}</span>
                </div>
              ))}

              <div className="mt-3 flex items-end justify-between">
                <div>
                  <p className="text-[10px] font-bold text-black">
                    Total Price:
                  </p>
                  <p className="text-[9px] text-gray-500">
                    {activeSlide.productShippingText}
                  </p>
                </div>
                <p className="text-xl text-black">
                  {activeSlide.productTotalPrice}
                </p>
              </div>
            </div>

            {activeSlide.button && (
              <Link
                href={activeSlide.button.href}
                className="mt-4 inline-block rounded bg-blue-600 px-6 py-2 text-xs font-bold text-white"
              >
                {activeSlide.button.label}
              </Link>
            )}
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="relative h-[300px] w-full max-w-[420px] md:h-[360px]">
              <div className="absolute bottom-2 left-1/2 h-12 w-[80%] -translate-x-1/2 rounded-full bg-slate-500/90 blur-2xl" />

              <Image
                src={activeSlide.image}
                alt={activeSlide.alt}
                fill
                className="object-contain drop-shadow-[0_28px_24px_rgba(15,23,42,0.18)]"
                priority
              />
            </div>

            <div className="mt-6 flex items-center gap-4">
              <button
                type="button"
                onClick={prevImage}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-gray-600 shadow transition hover:bg-gray-100"
              >
                <ArrowLeft size={22} />
              </button>

              <button
                type="button"
                onClick={nextImage}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-gray-600 shadow transition hover:bg-gray-100"
              >
                <ArrowRight size={22} />
              </button>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-black">
              {activeSlide.productInfoTitle}
            </h2>

            <p className="mt-3 max-w-xs text-xs leading-relaxed text-black">
              {activeSlide.productInfoDesc}
            </p>

            <div className="mt-8 rounded-sm bg-white p-5 shadow">
              {activeSlide.productFeatures.map((item) => (
                <div
                  key={item.label}
                  className="flex justify-between border-b border-dashed border-gray-300 py-3 text-sm text-black"
                >
                  <span>{item.label}</span>
                  <span>{item.price}</span>
                </div>
              ))}

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-black">Total Price:</p>
                  <p className="text-[10px] text-gray-500">
                    {activeSlide.productShippingText}
                  </p>
                </div>

                {activeSlide.button && (
                  <Link
                    href={activeSlide.button.href}
                    className="rounded-lg bg-blue-600 px-5 py-3 text-xs font-bold text-white"
                  >
                    {activeSlide.button.label}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
