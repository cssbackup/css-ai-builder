import { Award, BookOpen, Clock, Rocket, Target, Users } from "lucide-react";
import type { SectionProps } from "../../../types/section";

const fallbackItems = [
  { title: "Trusted guidance", desc: "Clear support from the first visit to the final decision." },
  { title: "Focused process", desc: "Simple steps, useful details, and quick next actions." },
  { title: "Better outcomes", desc: "Layouts built to help visitors compare, trust, and contact." },
];
const icons = [Users, Rocket, Target, Clock, Award, BookOpen];

export default function WhyChooseUsTwo({ data = {} }: SectionProps) {
  const items = data.whyChooseUsItems?.length ? data.whyChooseUsItems : fallbackItems;

  return (
    <section className="bg-slate-950 px-6 py-20 text-white">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-semibold sm:text-4xl">{data.title ?? "Reasons visitors can believe in."}</h2>
        <div className="mt-10 grid gap-px overflow-hidden bg-white/15 md:grid-cols-3">
          {items.map((item, index) => {
            const Icon = icons[index % icons.length];
            return (
              <article key={item.title} className="bg-slate-950 p-6 sm:p-8">
                <Icon className="text-cyan-300" size={32} />
                <h3 className="mt-6 text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{item.desc}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
