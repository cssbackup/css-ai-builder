"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { SectionProps } from "../../../types/section";

export default function FaqFour({ data = {} }: SectionProps) {
  const items = data.faqItems ?? [];
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-white px-5 py-12 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-5xl">
        {data.title && <h2 className="text-3xl font-semibold text-slate-950 sm:text-4xl">{data.title}</h2>}
        <div className="mt-8 space-y-5">
          {items.map((item, index) => {
            const isOpen = openIndex === index;

            return (
            <article key={item.question} className="border-l-4 border-blue-600 pl-5">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="flex w-full items-center justify-between gap-3 text-left font-semibold text-slate-950"
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
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.answer}</p>
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
