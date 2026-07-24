import React from "react";
import type { SectionProps } from "../../../types/section";

export default function Testimonial1({ data = {} }: SectionProps) {
  return (
    <section className="w-full bg-[#1c1b19] px-8 md:px-24 py-24">
      <div className="max-w-[1400px] mx-auto">

        <div className="flex items-center justify-center w-full mb-16">
          <div className="flex-grow border-t border-[#33312c]"></div>
          {data.sectionTitle && (
            <span className="px-6 text-[#cfa94e] text-xs tracking-[0.2em] uppercase font-medium">
              {data.sectionTitle}
            </span>
          )}
          <div className="flex-grow border-t border-[#33312c]"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.testimonials?.map((item: any, index: number) => (
            <div
              key={index}
              className="border border-[#33312c] p-10 flex flex-col justify-between"
            >
              <div>
                <div className="text-5xl font-serif text-[#5c4d29] leading-none mb-4">
                  “
                </div>
                <p className="text-[#d4cfc3] font-serif italic text-[17px] leading-relaxed mb-10">
                  "{item.quote}"
                </p>
              </div>

              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full border border-[#5c4d29] bg-[#2a261e] flex items-center justify-center text-[#cfa94e] text-sm font-medium tracking-wider">
                  {item.initials}
                </div>
                <div className="flex flex-col">
                  <span className="text-white text-[15px] font-medium mb-1">
                    {item.name}
                  </span>
                  <span className="text-[#8c887d] text-[12px]">
                    {item.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}