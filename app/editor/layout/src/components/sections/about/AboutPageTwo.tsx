import Image from "next/image";
import { SectionProps } from "./../../../types/section";

const defaultStats = [
  { value: "10+", label: "Years of experience" },
  { value: "250+", label: "Projects delivered" },
  { value: "98%", label: "Client satisfaction" },
];

export default function AboutPageTwo({ data = {} }: SectionProps) {
  const sideImage = data.sideImage ?? "/bg1.jpg";
  const sideImageTitle = data.sideImageTitle ?? "About page team image";

  return (
    <main className="bg-[#f8fafc] text-slate-950">
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="relative min-h-[420px] overflow-hidden rounded-[28px] bg-slate-200 shadow-xl">
            <Image
              src={sideImage}
              alt={sideImageTitle}
              data-editor-media
              data-editor-media-type="image"
              data-editor-media-src={sideImage}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600">
              {data.pretitle ?? "About us"}
            </p>
            <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight md:text-5xl">
              {data.title ?? "We build thoughtful websites for growing brands."}
            </h1>
            <div className="mt-6 space-y-4 text-base leading-8 text-slate-600">
              <p>{data.desc}</p>
              <p>{data.desc2}</p>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {defaultStats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl bg-white p-5 shadow-sm"
                >
                  <p className="text-2xl font-black text-blue-600">
                    {item.value}
                  </p>
                  <p className="mt-2 text-xs font-semibold text-slate-600">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
