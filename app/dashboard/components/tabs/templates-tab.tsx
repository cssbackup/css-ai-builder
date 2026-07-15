"use client";

import { useState } from "react";
import Image from "next/image";
import { Filter } from "lucide-react";
import TemplateActions from "../template-actions";

const categories = ["All", "Business", "Realestate", "School"] as const;
const baseTemplates = [
  { id: "template-1", name: "Classic Image", type: "Single page", image: "/haellipreview.png" },
  { id: "template-2", name: "Video Lead", type: "Multiple pages", image: "/shayepreview.png" },
  { id: "template-3", name: "Slider Showcase", type: "Single page", image: "/stylampreview.png" },
  { id: "template-4", name: "Motion Slider", type: "Multiple pages", image: "/blackbaypreview.png" },
  { id: "template-5", name: "Editorial Blocks", type: "Single page", image: "/stylampreview.png" },
];

const templates = categories.slice(1).flatMap((category) => baseTemplates.map((template) => ({ ...template, category })));

export default function TemplatesTab() {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const visibleTemplates = category === "All" ? templates : templates.filter((template) => template.category === category);

  return (
    <section className="mx-auto w-full max-w-[1320px] px-4 py-6 sm:px-6 sm:py-8 lg:px-9">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><h2 className="text-2xl font-semibold tracking-tight">Templates</h2><p className="mt-1 text-xs text-zinc-500">Browse every design across all available website categories.</p></div>
        <label className="flex h-10 items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 text-xs text-zinc-600 shadow-sm"><Filter size={15} /><span className="hidden sm:inline">Category</span><select value={category} onChange={(event) => setCategory(event.target.value as (typeof categories)[number])} className="cursor-pointer bg-transparent pr-2 text-xs font-medium text-zinc-900 outline-none">{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
      </div>
      <p className="mt-5 text-[11px] text-zinc-500">Showing {visibleTemplates.length} templates{category !== "All" ? ` in ${category}` : " across all categories"}</p>
      <div className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {visibleTemplates.map((template) => {
          const editorHref = `/editor/layout?templateId=${template.id}&category=${template.category}`;
          return <article key={`${template.category}-${template.id}`} className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white transition hover:-translate-y-0.5 hover:shadow-lg">
            <div className="relative h-48 overflow-hidden bg-zinc-100 sm:h-52"><Image src={template.image} alt={`${template.name} ${template.category} template`} fill className="object-cover object-top transition duration-500 group-hover:scale-[1.02]" /></div>
            <div className="flex h-[68px] items-center gap-3 p-4"><div className="min-w-0 flex-1"><h3 className="truncate text-sm font-medium">{template.name}</h3><p className="mt-1 text-[10px] text-zinc-500">{template.category} · {template.type}</p></div><TemplateActions name={template.name} editorHref={editorHref} previewImage={template.image} /></div>
          </article>;
        })}
      </div>
    </section>
  );
}
