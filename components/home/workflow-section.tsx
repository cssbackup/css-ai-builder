"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";

const modes = [
  {
    label: "Start from an AI brief",
    title: "Turn business context into a complete site plan",
    text: "Lestow identifies your audience, offer, page structure, and the clearest path to conversion before it starts designing.",
    image: "/lestow-dashboard.png",
    imageClass: "object-cover object-top",
    badge: "Strategy ready",
  },
  {
    label: "Direct your AI design team",
    title: "Shape every page through one conversation",
    text: "Ask for a stronger headline, a warmer palette, or a new section. Your design system stays consistent while the canvas updates.",
    image: "/auth-ai-builder-premium.png",
    imageClass: "object-cover object-[center_60%]",
    badge: "Live canvas",
  },
  {
    label: "Launch and keep evolving",
    title: "Publish a responsive, growth-ready website",
    text: "Mobile behavior, SEO essentials, lead capture, domain setup, and future content changes live in the same workflow.",
    image: "/haellipreview.png",
    imageClass: "object-cover object-top",
    badge: "Publish ready",
  },
];

export default function WorkflowSection() {
  const [active, setActive] = useState(0);
  const [cycle, setCycle] = useState(0);
  const progressRef = useRef<HTMLSpanElement>(null);
  const mode = modes[active];

  useEffect(() => {
    const animation = progressRef.current?.animate(
      [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }],
      { duration: 3000, easing: "linear", fill: "forwards" },
    );
    const timer = window.setTimeout(() => setActive((current) => (current + 1) % modes.length), 3000);
    return () => {
      window.clearTimeout(timer);
      animation?.cancel();
    };
  }, [active, cycle]);

  const selectMode = (index: number) => {
    setActive(index);
    setCycle((current) => current + 1);
  };

  return (
    <section id="workflow" className="relative overflow-hidden bg-[#020606] px-5 py-24 text-white sm:px-8 lg:py-36">
      <div data-workflow-beam className="absolute -left-[10%] -top-24 h-[125%] w-[36%] -rotate-[19deg] bg-[linear-gradient(90deg,transparent,#193950_35%,#4268d9_68%,transparent)] opacity-75 blur-[2px]" />
      <div data-workflow-beam className="absolute left-[32%] -top-36 h-[145%] w-[32%] -rotate-[19deg] bg-[linear-gradient(90deg,transparent,#558538_40%,#b9ff66_67%,transparent)] opacity-55 blur-sm" />
      <div data-workflow-beam className="absolute right-[-5%] -top-24 h-[130%] w-[35%] -rotate-[19deg] bg-[linear-gradient(90deg,transparent,#183a35_45%,#254f64_75%,transparent)] opacity-70 blur-[2px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_0%,rgba(0,0,0,.24)_68%,#020606_100%)]" />

      <div className="relative mx-auto max-w-[1240px]">
        <div data-reveal className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-[10px] font-semibold uppercase tracking-[.22em] text-[#b9ff66]">From prompt to production</p><h2 className="mt-4 max-w-2xl text-4xl font-medium leading-[.95] tracking-[-.055em] sm:text-6xl">Build with an AI team that stays in context.</h2></div><p className="max-w-sm text-sm leading-6 text-white/48">Move from first idea to a live website without handing work between disconnected tools.</p></div>

        <div data-workflow-stage className="relative overflow-hidden border border-white/10 bg-[linear-gradient(110deg,rgba(7,18,26,.97),rgba(16,40,51,.92)_55%,rgba(45,73,61,.9))] p-5 shadow-[0_45px_120px_rgba(0,0,0,.48)] sm:p-8 lg:p-12">
          <div className="absolute inset-0 opacity-15 [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:64px_64px]" />
          <div className="relative grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-center">
            <div>
              <div className="space-y-0">{modes.map((item, index) => <button type="button" key={item.label} aria-pressed={active === index} onClick={() => selectMode(index)} className={`group relative flex w-full items-center justify-between border-b border-white/20 py-6 text-left text-xl font-serif transition sm:text-2xl ${active === index ? "text-white" : "text-white/48 hover:text-white/80"}`}><span>{item.label}</span>{index === 2 && <span className="ml-3 border border-[#b9ff66] px-2 py-1 font-sans text-[9px] uppercase tracking-[.14em] text-[#b9ff66]">Always on</span>}{active === index && <span ref={progressRef} className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-blue-500 via-[#b9ff66] to-transparent" />}</button>)}</div>
              <div key={active} className="mt-8 animate-[editorFadeIn_.45s_ease-out_both]"><h3 className="max-w-md text-2xl font-medium leading-tight tracking-[-.04em]">{mode.title}</h3><p className="mt-4 max-w-md text-sm leading-6 text-white/55">{mode.text}</p><div className="mt-6 flex flex-wrap gap-3 text-[10px] text-white/55"><span className="flex items-center gap-2"><Check size={13} className="text-[#b9ff66]" /> No code required</span><span className="flex items-center gap-2"><Check size={13} className="text-[#b9ff66]" /> Fully editable</span></div><Link href="/auth" className="mt-7 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-xs font-semibold shadow-lg shadow-blue-950/30 transition hover:-translate-y-0.5 hover:bg-blue-500">Start building <ArrowRight size={14} /></Link></div>
            </div>

            <div key={`screen-${active}`} className="relative animate-[editorPopIn_.5s_ease-out_both]">
              <div className="absolute -inset-8 bg-[radial-gradient(circle,rgba(185,255,102,.18),transparent_65%)] blur-2xl" />
              <div className="relative overflow-hidden border border-white/20 bg-[#06101b] p-2 shadow-[0_30px_70px_rgba(0,0,0,.45)] sm:p-3"><div className="flex h-9 items-center justify-between px-2"><div className="flex gap-1.5"><span className="size-1.5 rounded-full bg-white/20" /><span className="size-1.5 rounded-full bg-white/20" /><span className="size-1.5 rounded-full bg-[#b9ff66]" /></div><span className="text-[8px] uppercase tracking-[.16em] text-white/35">Lestow AI studio</span><span className="flex items-center gap-1.5 rounded-full bg-[#b9ff66]/12 px-2 py-1 text-[8px] font-semibold text-[#b9ff66]"><Sparkles size={9} /> {mode.badge}</span></div><div className="relative aspect-[16/10] overflow-hidden bg-white"><Image src={mode.image} alt={mode.title} fill className={mode.imageClass} /></div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
