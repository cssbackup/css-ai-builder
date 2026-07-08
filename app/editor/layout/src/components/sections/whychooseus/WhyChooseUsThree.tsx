import { Award, BookOpen, Clock, Rocket, Target, Users } from "lucide-react";
import type { SectionProps } from "../../../types/section";

const fallbackItems = [
  { title: "Trusted guidance", desc: "Clear support from the first visit to the final decision." },
  { title: "Focused process", desc: "Simple steps, useful details, and quick next actions." },
  { title: "Better outcomes", desc: "Layouts built to help visitors compare, trust, and contact." },
];
const icons = [Users, Rocket, Target, Clock, Award, BookOpen];

export default function WhyChooseUsThree({ data = {} }: SectionProps) {
  const items = data.whyChooseUsItems?.length ? data.whyChooseUsItems : fallbackItems;

  return (
    <section className="bg-[#f8fafc] px-6 py-20">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="mx-auto max-w-2xl text-3xl font-semibold text-slate-950 sm:text-4xl">
          {data.title ?? "Built for confident decisions."}
        </h2>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {items.map((item, index) => {
            const Icon = icons[index % icons.length];
            return (
              <article key={item.title} className="bg-white p-6 shadow-sm sm:p-8">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-rose-700">
                  <Icon size={24} />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.desc}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
