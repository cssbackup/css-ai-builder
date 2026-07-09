import Image from "next/image";
import { SectionProps } from "./../../../types/section";

const defaultStats = [
  { value: "10+", label: "Years of experience" },
  { value: "250+", label: "Projects delivered" },
  { value: "98%", label: "Client satisfaction" },
];

export default function AboutPageThree({ data = {} }: SectionProps) {
  return (
    <main className="bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 lg:py-24">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-300">
          {data.pretitle ?? "About us"}
        </p>
        <div className="mt-5 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <h1 className="text-4xl font-black leading-tight tracking-tight md:text-6xl">
            {data.title ?? "We build thoughtful websites for growing brands."}
          </h1>
          <div className="space-y-5 text-base leading-8 text-slate-300">
            <p>{data.desc}</p>
            <p>{data.desc2}</p>
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {defaultStats.map((item) => (
            <div
              key={item.label}
              className="rounded-3xl border border-white/10 bg-white/5 p-7"
            >
              <p className="text-4xl font-black text-blue-300">{item.value}</p>
              <p className="mt-3 text-sm font-semibold text-slate-300">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-8">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-300">
            {data.subtitle ?? "Our approach"}
          </p>
          <h2 className="mt-3 text-3xl font-black">
            {data.philosophyTitle ?? "Clear thinking, careful execution."}
          </h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-slate-300">
            {data.philosophyDesc}
          </p>
        </div>
      </section>
    </main>
  );
}
