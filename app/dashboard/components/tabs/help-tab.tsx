"use client";

import { useState } from "react";
import { BookOpen, ChevronDown, CircleDollarSign, ExternalLink, Globe2, LifeBuoy, Mail, MessageCircleQuestion, Search, ShieldCheck } from "lucide-react";

const helpItems = [
  { title: "Generate your first site", description: "Turn a business idea into an AI-generated website and choose the right starting design.", icon: BookOpen },
  { title: "AI editor guide", description: "Edit generated sections, pages, brand styles, responsive layouts, and website content.", icon: MessageCircleQuestion },
  { title: "Domains & publishing", description: "Connect a custom domain, manage DNS, publish AI-assisted updates, and troubleshoot SSL.", icon: Globe2 },
  { title: "Plans & AI credits", description: "Compare builder plans, track AI-generation credits, and download subscription invoices.", icon: CircleDollarSign },
  { title: "Account & security", description: "Update your builder profile, change your password, and protect your website workspace.", icon: ShieldCheck },
  { title: "Builder support", description: "Get help with an AI generation, website section, editor workflow, or publishing issue.", icon: Mail },
];

const faqs = [
  { question: "How do I publish an AI-generated website?", answer: "Open the generated website in the editor, review every section in desktop and mobile preview, then select Publish. Your latest AI-assisted edits will be available at the published URL." },
  { question: "Can I connect my own domain?", answer: "Yes. Open your website settings, choose Domains, and follow the DNS instructions for your domain provider." },
  { question: "How do I change my AI builder plan?", answer: "Open Billing from the sidebar to review your active builder plan, generation allowance, renewal date, and plan-change options." },
  { question: "How do AI generation credits work?", answer: "A credit is used when Lestow generates or substantially rebuilds website content. Your available credits and reset date appear on the Billing page." },
];

export default function HelpTab() {
  const [query, setQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const filteredItems = helpItems.filter((item) => `${item.title} ${item.description}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <section className="mx-auto w-full max-w-[1100px] px-4 py-6 sm:px-6 sm:py-8 lg:px-9">
      <div className="overflow-hidden rounded-3xl border border-blue-100 bg-[linear-gradient(125deg,#edf6ff_0%,#f5f2ff_55%,#fffaf2_100%)] p-6 text-zinc-900 shadow-[0_20px_55px_rgba(86,110,160,.12)] sm:p-8">
        <span className="grid size-11 place-items-center rounded-2xl bg-white text-blue-700 shadow-sm"><LifeBuoy size={21} /></span>
        <h2 className="mt-5 text-2xl font-semibold tracking-tight">AI website builder help</h2>
        <p className="mt-2 text-xs text-zinc-500">Search guidance for AI generation, editing, publishing, domains, plans, and website payments.</p>
        <label className="mt-6 flex h-12 max-w-2xl items-center gap-3 rounded-2xl border border-white bg-white/90 px-4 text-zinc-500 shadow-sm"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search AI website builder help" className="min-w-0 flex-1 bg-transparent text-xs text-zinc-900 outline-none placeholder:text-zinc-400" /></label>
      </div>

      <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredItems.map(({ title, description, icon: Icon }, index) => (
          <button type="button" key={title} className={`group rounded-2xl border p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${index % 3 === 0 ? "border-sky-100 bg-sky-50/65" : index % 3 === 1 ? "border-violet-100 bg-violet-50/55" : "border-amber-100 bg-amber-50/55"}`}>
            <span className="grid size-10 place-items-center rounded-xl bg-white text-blue-700 shadow-sm"><Icon size={19} /></span>
            <span className="mt-5 flex items-center justify-between text-sm font-medium">{title}<ExternalLink size={15} className="text-zinc-400 group-hover:text-blue-700" /></span>
            <span className="mt-2 block text-xs leading-5 text-zinc-500">{description}</span>
          </button>
        ))}
      </div>
      {filteredItems.length === 0 && <div className="mt-7 rounded-2xl border border-dashed border-blue-200 bg-blue-50/40 p-8 text-center text-xs text-zinc-500">No help topics match “{query}”. Try another keyword.</div>}

      <div className="mt-9 grid gap-6 lg:grid-cols-[1fr_300px]">
        <div><h3 className="text-sm font-semibold">AI builder questions</h3><div className="mt-4 overflow-hidden rounded-2xl border border-indigo-100 bg-indigo-50/35">{faqs.map((faq, index) => <div key={faq.question} className="border-b border-indigo-100/70 last:border-0"><button type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)} className="flex w-full items-center gap-4 px-5 py-4 text-left text-xs font-medium"><span className="flex-1">{faq.question}</span><ChevronDown size={16} className={`text-zinc-400 transition ${openFaq === index ? "rotate-180" : ""}`} /></button>{openFaq === index && <p className="px-5 pb-5 text-xs leading-5 text-zinc-500">{faq.answer}</p>}</div>)}</div></div>
        <aside className="h-fit rounded-2xl border border-emerald-100 bg-emerald-50/55 p-5"><span className="grid size-10 place-items-center rounded-xl bg-white text-emerald-700 shadow-sm"><Mail size={18} /></span><h3 className="mt-4 text-sm font-semibold">Need help with your website?</h3><p className="mt-2 text-xs leading-5 text-zinc-500">Share the website name and the AI generation or editor issue. Our builder support team replies within one business day.</p><button type="button" className="mt-5 h-10 w-full rounded-xl bg-blue-700 text-xs font-medium text-white transition hover:bg-blue-800">Contact builder support</button><p className="mt-3 text-center text-[10px] text-zinc-500">support@lestow.ai</p></aside>
      </div>
    </section>
  );
}
