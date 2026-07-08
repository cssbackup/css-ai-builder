import { ArrowRight, Award, BookOpen, Clock, Rocket, Target, Users } from "lucide-react";
import type { SectionProps } from "../../../types/section";

const fallbackItems = [
  { title: "Expert Instructors", desc: "Learn from top industry professionals who bring real-world experience to every lesson.", stat: "01" },
  { title: "Career-Boost Certify", desc: "Earn certifications that help enhance your resume and open new opportunities.", stat: "02" },
  { title: "100+ High Impact Courses", desc: "Practical learning to help you apply your skills immediately and competitively.", stat: "03" },
];

const icons = [Users, Rocket, Target, Clock, Award, BookOpen];

export default function WhyChooseUsOne({ data = {} }: SectionProps) {
  const items = data.whyChooseUsItems?.length ? data.whyChooseUsItems : fallbackItems;
  const firstItems = items.slice(0, 3);
  const featured = firstItems[2] ?? firstItems[0];

  return (
    <section className="bg-white px-5 py-16 text-[#050505]">
      <div className="mx-auto max-w-7xl">
        <span className="inline-flex rounded-full border border-slate-300 px-4 py-2 text-xs font-medium uppercase">
          {data.pretitle ?? "Why choose us"}
        </span>
        <h2 className="mt-7 text-3xl font-medium leading-tight sm:text-4xl md:text-5xl">
          {data.title ?? "Why expert.io is The Right Choice for You"}
        </h2>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1fr_1fr_1.05fr]">
          <div className="grid gap-5 lg:col-span-2 lg:grid-cols-2">
            {firstItems.slice(0, 2).map((item, index) => {
              const Icon = icons[index];
              return (
                <article key={item.title} className="rounded-lg bg-[#f1f4f8] p-5 sm:p-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-900">
                    <Icon size={21} strokeWidth={1.5} />
                  </span>
                  <h3 className="mt-7 text-xl font-medium sm:mt-10 sm:text-2xl">{item.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-slate-700 sm:mt-6">{item.desc}</p>
                </article>
              );
            })}

            <article className="rounded-lg bg-[#f1f4f8] p-5 sm:p-7 lg:col-span-2">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-900">
                <Target size={21} strokeWidth={1.5} />
              </span>
              <h3 className="mt-7 text-xl font-medium sm:mt-10 sm:text-2xl">{featured.title}</h3>
              <p className="mt-4 text-sm leading-6 text-slate-700 sm:mt-6">{featured.desc}</p>
            </article>
          </div>

          <article className="rounded-lg bg-[#063a78] p-6 text-white sm:p-8">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/80">
              <Clock size={22} strokeWidth={1.5} />
            </span>
            <h3 className="mt-7 text-xl font-medium sm:mt-10 sm:text-2xl">
              {items[3]?.title ?? "Flexible Learning Schedules"}
            </h3>
            <p className="mt-7 text-sm leading-7 text-blue-50">
              {items[3]?.desc ?? "Learn at your own pace, anytime and anywhere, with a schedule designed around real life."}
            </p>
            <button className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#20e85f] px-5 py-3 text-sm font-semibold text-slate-950 sm:mt-10 sm:px-7 sm:py-4">
              Start Free Trial <ArrowRight size={17} />
            </button>
          </article>
        </div>
      </div>
    </section>
  );
}
