import type { SectionProps } from "../../../types/section";
import Link from "next/link";


export default function BusinessBanner1({ data = {} }: SectionProps) {
  return (
    <section className="relative w-full h-screen flex flex-col justify-center items-start text-left px-8 md:px-24 overflow-hidden">
      {data?.backgroundImage && (
        <img
          src={data.backgroundImage}
          alt="Banner Background"
          className="absolute inset-0 w-full h-full md:h-auto object-cover z-0"
        />
      )}

      <div className="absolute inset-0 bg-black/40 z-10"></div>

      <div className="relative z-20 flex flex-col items-start max-w-3xl text-white mt-16">
        {data.pretitle && (
          <span className="text-xs md:text-sm tracking-[0.2em] uppercase mb-4">
            {data.pretitle}
          </span>
        )}

        {data.title && (
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif italic text-[#cfa94e] mb-6 tracking-wide leading-tight">
            {data.title}
          </h1>
        )}

        {data.desc && (
          <p className="text-sm md:text-lg font-light mb-10 max-w-2xl text-gray-200">
            {data.desc}
          </p>
        )}

        {data.buttons && data.buttons.length > 0 && (
          <div className="flex flex-wrap justify-start gap-4">
            {data.buttons.map((btn, index) => (
              <Link
                key={index}
                href={btn.href}
                className={
                  btn.variant === "primary"
                    ? "bg-[#c03a2b] text-white px-8 py-4 text-[10px] tracking-[0.15em] uppercase hover:bg-[#d95345] transition-colors"
                    : "border border-white text-white px-8 py-4 text-[10px] tracking-[0.15em] uppercase hover:bg-white hover:text-black transition-colors"
                }
              >
                {btn.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
