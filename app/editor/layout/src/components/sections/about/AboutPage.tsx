import Image from "next/image";
import { SectionProps } from "./../../../types/section";

const defaultStats = [
  { value: "10+", label: "Years of experience" },
  { value: "250+", label: "Projects delivered" },
  { value: "98%", label: "Client satisfaction" },
];

export default function AboutPage({ data = {} }: SectionProps) {
  const sideImage = data.sideImage ?? "/bg1.jpg";
  const sideImageTitle = data.sideImageTitle ?? "About page team image";

  return (
    <main className="bg-white text-slate-950">
      <section className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.05fr_0.95fr] md:px-8 lg:py-20">
        <div className="flex flex-col justify-center">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600">
            {data.pretitle ?? "About us"}
          </p>

          <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight tracking-tight text-slate-950 md:text-5xl">
            {data.title ?? "We build thoughtful websites for growing brands."}
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
            {data.desc ??
              "Our team combines strategy, design, and technology to create digital experiences that explain your business clearly and help visitors take action."}
          </p>

          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
            {data.desc2 ??
              "From the first idea to the final launch, we focus on useful content, clean layouts, and flexible sections that your team can keep improving over time."}
          </p>
        </div>

        <div className="relative min-h-[360px] overflow-hidden rounded-2xl bg-slate-100 shadow-xl">
          <Image
            src={sideImage}
            alt={sideImageTitle}
            data-editor-media
            data-editor-media-type="image"
            data-editor-media-src={sideImage}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 45vw, 100vw"
          />
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 py-8 md:grid-cols-3 md:px-8">
          {defaultStats.map((item) => (
            <div key={item.label} className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-3xl font-black text-blue-600">{item.value}</p>
              <p className="mt-2 text-sm font-semibold text-slate-600">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-14 md:grid-cols-[0.8fr_1.2fr] md:px-8 lg:py-20">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600">
            {data.subtitle ?? "Our approach"}
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
            {data.philosophyTitle ?? "Clear thinking, careful execution."}
          </h2>
        </div>

        <div className="space-y-5 text-base leading-8 text-slate-600">
          <p>
            {data.philosophyDesc ??
              "We start by understanding the business, the audience, and the decisions visitors need to make. Then we shape pages around strong messaging, useful sections, and simple editing workflows."}
          </p>
          <p>
            {data.length
              ? `Our process is designed for ${data.length} focused steps, so every page has a clear purpose.`
              : "Our process keeps every page focused, practical, and easy to maintain after launch."}
          </p>
        </div>
      </section>
    </main>
  );
}
