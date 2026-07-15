import Image from "next/image";
import Link from "next/link";
import TemplateActions from "../template-actions";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  ExternalLink,
  Globe2,
  Layers3,
  Play,
  Plus,
} from "lucide-react";

const recentSites = [
  {
    name: "Blackbay Studio",
    image: "/blackbaypreview.png",
    status: "Published",
    updated: "Edited 2 hours ago",
    editorHref: "/editor/layout?templateId=template-1&category=Business",
    previewHref: "/published/template-1-business-77fa7a1c",
  },
  {
    name: "Haelli Homes",
    image: "/haellipreview.png",
    status: "Draft",
    updated: "Edited yesterday",
    editorHref: "/editor/layout?templateId=template-1&category=Realestate",
    previewHref: "/published/template-4-realestate-be551931",
  },
  {
    name: "Shaye School",
    image: "/shayepreview.png",
    status: "Published",
    updated: "Edited 3 days ago",
    editorHref: "/editor/layout?templateId=template-2&category=School",
    previewHref: "/published/template-2-school-a5c425ed",
  },
];

const summaryCards = [
  {
    label: "Total websites",
    count: 3,
    status: "All sites",
    detail: "2 published · 1 draft",
    footer: "3 active projects",
    icon: Layers3,
    surface: "border-[#d9ddfa] bg-[#e8e9ff]",
    accent: "text-[#2563eb]",
    tagStyle: "bg-white/65 text-[#2563eb]",
  },
  {
    label: "Live websites",
    count: 2,
    status: "Published",
    detail: "Available to visitors",
    footer: "All sites online",
    icon: CheckCircle2,
    surface: "border-[#ccebdd] bg-[#dcf5e9]",
    accent: "text-[#28805b]",
    tagStyle: "bg-white/65 text-[#2d8b63]",
  },
  {
    label: "Draft websites",
    count: 1,
    status: "In progress",
    detail: "Haelli Homes",
    footer: "Edited yesterday",
    icon: Clock3,
    href: "/editor/layout?templateId=template-1&category=Realestate",
    surface: "border-[#f1dfc5] bg-[#faebd7]",
    accent: "text-[#b96a22]",
    tagStyle: "bg-white/65 text-[#b96a22]",
  },
];

function SummaryCard({ card }: { card: (typeof summaryCards)[number] }) {
  const Icon = card.icon;

  return (
    <article
      className={`${card.surface} group flex  flex-col rounded-2xl border p-3 shadow-[0_8px_24px_rgba(45,40,65,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(45,40,65,0.1)]`}
    >
      <div className="flex justify-between items-center gap-2 ">
        <span
          className={`${card.tagStyle} grid size-8 place-items-center rounded-xl`}
        >
          <Icon size={15} />
        </span>
        <span
          className={`${card.tagStyle} rounded-md px-2 py-1 text-[8px] font-semibold uppercase tracking-wide`}
        >
          {card.status}
        </span>
      </div>
      <div className="mt-3 flex justify-between items-center">
        <div className="flex items-end gap-2">
          <strong className={`${card.accent} text-3xl leading-none`}>
            {card.count}
          </strong>
          <h3 className={`${card.accent} pb-0.5 text-sm font-medium`}>
            {card.label}
          </h3>
        </div>
        <p className="mt-2 text-[10px] text-zinc-600">{card.detail}</p>
      </div>
      <div className="mt-3 flex items-center border-t border-white/45 pt-2">
        <span className="text-[9px] text-zinc-600">{card.footer}</span>
        {card.href && (
          <Link
            href={card.href}
            className={`${card.accent} ml-auto flex items-center gap-1 text-[9px] font-semibold`}
          >
            Continue editing <ArrowRight size={11} />
          </Link>
        )}
      </div>
    </article>
  );
}

export default function DashboardTabContent({
  userName,
}: {
  userName: string;
}) {
  return (
    <section className="mx-auto w-full max-w-[1320px] px-4 py-5 sm:px-6 sm:py-7 lg:px-9 lg:py-9">
      <div className="relative isolate overflow-hidden rounded-[26px] border border-blue-100 bg-[#eef2ff] p-4 shadow-[0_20px_55px_rgba(48,75,155,.10)] sm:p-6">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center opacity-45"
        >
          <source src="/a2.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(255,255,255,.96)_0%,rgba(248,248,255,.88)_36%,rgba(231,227,255,.55)_68%,rgba(255,255,255,.75)_100%)]" />
        <div className="absolute -right-16 -top-24 -z-10 size-80 rounded-full bg-blue-300/20 blur-xl" />

        <div className="relative max-w-md py-2 sm:py-3">
          <p className="text-[11px] font-medium text-zinc-600">
            Welcome back, {userName.split(" ")[0] || userName}
          </p>
          <h2 className="mt-2 text-3xl font-semibold leading-[1.05] tracking-[-0.04em] text-zinc-950 sm:text-4xl">
            Build websites
            <br />
            in minutes.
          </h2>
          <p className="mt-3 text-sm text-zinc-600">
            AI-powered. Fast. Beautiful.
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <a
              href="/a2.mp4"
              target="_blank"
              rel="noreferrer"
              className="flex h-10 items-center gap-2 rounded-xl bg-blue-600 px-4 text-xs font-medium text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-700"
            >
              <Play size={14} fill="currentColor" /> Watch demo
            </a>
            <Link
              href="/"
              className="flex h-10 items-center gap-2 rounded-xl border border-blue-100 bg-white/90 px-4 text-xs font-medium text-blue-700 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-blue-300"
            >
              <Plus size={15} /> Create website
            </Link>
          </div>
        </div>

        <div className="relative mt-6 rounded-2xl border border-white/80 bg-white/55 p-2.5 shadow-[0_10px_35px_rgba(42,52,94,.08)] backdrop-blur-md sm:mt-8 sm:p-3">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {summaryCards.map((card) => (
              <SummaryCard key={card.label} card={card} />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-9 flex items-center justify-between">
        <h3 className="text-sm font-semibold">Recent websites</h3>
        <span className="flex items-center gap-1 text-xs text-blue-700">
          View all <ArrowRight size={14} />
        </span>
      </div>

      <div className="mt-4 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {recentSites.map((site) => (
          <article
            key={site.name}
            className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className="relative h-44 overflow-hidden bg-zinc-100">
              <Image
                src={site.image}
                alt={`${site.name} website preview`}
                fill
                className="object-cover object-top transition duration-500 group-hover:scale-[1.02]"
              />
              <span className="absolute inset-0 bg-zinc-950/0 transition group-hover:bg-zinc-950/10" />
            </div>
            <div className="flex h-[68px] items-center gap-3 p-4">
              <span className="grid size-9 place-items-center rounded-xl bg-blue-50 text-blue-700">
                <Globe2 size={18} />
              </span>
              <div className="min-w-0 flex-1">
                <h4 className="truncate text-sm font-medium group-hover:text-blue-700">
                  {site.name}
                </h4>
                <p className="mt-1 text-[10px] text-zinc-500">{site.updated}</p>
              </div>
              <span
                className={`rounded-full px-2 py-1 text-[9px] ${site.status === "Published" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}
              >
                {site.status}
              </span>
              <TemplateActions
                name={site.name}
                editorHref={site.editorHref}
                previewHref={site.previewHref}
                previewImage={site.image}
              />
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 flex items-center gap-3 rounded-2xl border border-blue-100 bg-blue-50/70 p-5">
        <span className="grid size-10 place-items-center rounded-xl bg-white text-blue-700">
          <ExternalLink size={18} />
        </span>
        <div className="flex-1">
          <h3 className="text-sm font-medium">Continue editing</h3>
          <p className="mt-1 text-xs text-zinc-500">
            Your latest draft is ready where you left it.
          </p>
        </div>
        <Link
          href="/editor/layout?templateId=template-1&category=Realestate"
          className="rounded-lg px-3 py-2 text-xs font-medium text-blue-700 transition hover:bg-white"
        >
          Open editor
        </Link>
      </div>
    </section>
  );
}
