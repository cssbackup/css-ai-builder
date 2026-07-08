"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { SectionProps } from "../../../types/section";

const fallbackItems = [
  { question: "How does billing work?", answer: "Plans are billed based on your selected workspace." },
  { question: "Can I use it for commercial projects?", answer: "Yes, you can use it for business and commercial projects." },
];

export default function FaqTwo({ data = {} }: SectionProps) {
  const items = data.faqItems?.length ? data.faqItems : fallbackItems;
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-slate-950 px-5 py-12 text-white sm:px-6 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
        <h2 className="text-3xl font-semibold sm:text-4xl">{data.title ?? "Answers before they ask."}</h2>
        <div className="space-y-4">
          {items.map((item, index) => {
            const isOpen = openIndex === index;

            return (
            <article key={item.question} className="bg-white/10 p-5 sm:p-6">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="flex w-full items-center justify-between gap-3 text-left font-semibold"
              >
                {item.question}
                <ChevronDown
                  size={18}
                  className={`shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ease-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="mt-2 text-sm leading-6 text-slate-300">{item.answer}</p>
                </div>
              </div>
            </article>
          );
          })}
        </div>
      </div>
    </section>
  );
}
