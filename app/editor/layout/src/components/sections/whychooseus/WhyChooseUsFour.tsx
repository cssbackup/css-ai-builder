import type { SectionProps } from "../../../types/section";

const fallbackItems = [
  { title: "Trusted guidance", desc: "Clear support from the first visit to the final decision." },
  { title: "Focused process", desc: "Simple steps, useful details, and quick next actions." },
  { title: "Better outcomes", desc: "Layouts built to help visitors compare, trust, and contact." },
];

export default function WhyChooseUsFour({ data = {} }: SectionProps) {
  const items = data.whyChooseUsItems?.length ? data.whyChooseUsItems : fallbackItems;

  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-semibold text-slate-950 sm:text-4xl">
          {data.title ?? "What makes the experience better."}
        </h2>
        <div className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
          {items.map((item, index) => (
            <article key={item.title} className="grid gap-4 py-6 md:grid-cols-[120px_1fr]">
              <span className="text-3xl font-semibold text-slate-300">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="text-xl font-semibold text-slate-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
