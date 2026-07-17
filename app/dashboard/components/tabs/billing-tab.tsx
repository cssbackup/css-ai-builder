import { Bot, CalendarDays, Check, CreditCard, Download, FileText, Globe2, HardDrive, ReceiptText, Rocket, Sparkles } from "lucide-react";

const usage = [
  { label: "AI generations", value: "34 / 100", percent: 34, icon: Sparkles, color: "from-blue-500 to-cyan-400", surface: "border-sky-100 bg-sky-50/70" },
  { label: "Published sites", value: "3 / 10", percent: 30, icon: Rocket, color: "from-violet-500 to-fuchsia-400", surface: "border-violet-100 bg-violet-50/65" },
  { label: "Custom domains", value: "2 / 5", percent: 40, icon: Globe2, color: "from-emerald-500 to-teal-400", surface: "border-emerald-100 bg-emerald-50/65" },
  { label: "Asset storage", value: "2.4 / 10 GB", percent: 24, icon: HardDrive, color: "from-amber-500 to-orange-400", surface: "border-amber-100 bg-amber-50/65" },
];

const invoices = [
  { id: "INV-2026-007", date: "Jul 1, 2026", amount: "$29.00" },
  { id: "INV-2026-006", date: "Jun 1, 2026", amount: "$29.00" },
  { id: "INV-2026-005", date: "May 1, 2026", amount: "$29.00" },
];

export default function BillingTab() {
  return (
    <section className="mx-auto w-full max-w-[1160px] px-4 py-6 sm:px-6 sm:py-8 lg:px-9">
      <div><span className="text-[10px] font-semibold uppercase tracking-[.16em] text-blue-700">Workspace subscription</span><h2 className="mt-1 text-2xl font-semibold tracking-tight">Power your AI websites</h2><p className="mt-1 text-xs text-zinc-500">Manage generation capacity, publishing limits, domains, storage, and plan billing.</p></div>

      <article className="relative mt-7 overflow-hidden rounded-[30px] border border-blue-100 bg-[linear-gradient(120deg,#eaf5ff_0%,#f3efff_52%,#fff8ed_100%)] p-6 shadow-[0_25px_70px_rgba(68,96,160,.15)] sm:p-8">
        <span className="absolute -right-16 -top-20 size-56 rounded-full bg-blue-300/25 blur-2xl" /><span className="absolute -bottom-24 right-[28%] size-48 rounded-full bg-violet-300/20 blur-2xl" />
        <div className="relative grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
          <div><div className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-2xl bg-white text-blue-700 shadow-sm"><Bot size={21} /></span><span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[10px] font-semibold text-emerald-700">Growth plan active</span></div><h3 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">Build more with Lestow AI</h3><p className="mt-3 max-w-xl text-xs leading-5 text-zinc-600">Your plan includes AI-assisted website generation, smart section rewrites, responsive publishing, custom domains, and reusable brand assets.</p><div className="mt-6 flex flex-wrap gap-3"><button type="button" className="h-11 rounded-xl bg-blue-700 px-5 text-xs font-medium text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-800">Explore higher plans</button><button type="button" className="h-11 rounded-xl border border-white bg-white/80 px-5 text-xs font-medium text-zinc-700 shadow-sm transition hover:bg-white">Manage subscription</button></div></div>
          <div className="relative min-w-[220px] rounded-3xl border border-white/80 bg-white/72 p-5 shadow-xl shadow-blue-100/60 backdrop-blur"><span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Growth</span><div className="mt-2 flex items-end gap-1"><strong className="text-4xl tracking-tight">$29</strong><span className="pb-1 text-xs text-zinc-500">/ month</span></div><div className="my-4 h-px bg-blue-100" /><span className="flex items-center gap-2 text-[11px] text-zinc-600"><CalendarDays size={14} className="text-blue-600" /> Renews August 1, 2026</span><span className="mt-3 flex items-center gap-2 text-[11px] text-zinc-600"><CreditCard size={14} className="text-violet-600" /> Visa ending in 4242</span></div>
        </div>
      </article>

      <div className="mt-7 flex items-end justify-between"><div><h3 className="text-sm font-semibold">Builder usage this cycle</h3><p className="mt-1 text-[10px] text-zinc-500">Limits reset when your plan renews.</p></div><span className="text-[10px] font-medium text-blue-700">12 days remaining</span></div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{usage.map(({ label, value, percent, icon: Icon, color, surface }) => <article key={label} className={`rounded-2xl border p-5 shadow-sm ${surface}`}><span className="grid size-9 place-items-center rounded-xl bg-white text-zinc-700 shadow-sm"><Icon size={17} /></span><p className="mt-5 text-[10px] text-zinc-500">{label}</p><strong className="mt-1 block text-lg">{value}</strong><div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white"><span className={`block h-full rounded-full bg-gradient-to-r ${color}`} style={{ width: `${percent}%` }} /></div></article>)}</div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_340px]">
        <article className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-[0_12px_35px_rgba(86,110,160,.08)]"><div className="flex items-center gap-3 border-b border-blue-50 bg-blue-50/45 p-5"><span className="grid size-9 place-items-center rounded-xl bg-white text-blue-700 shadow-sm"><FileText size={17} /></span><div><h3 className="text-sm font-semibold">Subscription invoices</h3><p className="mt-1 text-[10px] text-zinc-500">Receipts for your Lestow AI Website Builder plan.</p></div></div><div className="divide-y divide-blue-50">{invoices.map((invoice) => <div key={invoice.id} className="grid grid-cols-[1fr_auto_auto] items-center gap-4 px-5 py-4"><div><strong className="block text-xs font-medium">{invoice.id}</strong><span className="mt-1 block text-[10px] text-zinc-500">{invoice.date}</span></div><div className="text-right"><strong className="block text-xs">{invoice.amount}</strong><span className="text-[9px] text-emerald-700">Paid</span></div><button type="button" aria-label={`Download ${invoice.id}`} className="grid size-8 place-items-center rounded-lg text-zinc-400 transition hover:bg-blue-50 hover:text-blue-700"><Download size={15} /></button></div>)}</div></article>
        <aside className="rounded-2xl border border-violet-100 bg-[linear-gradient(145deg,#f5f1ff,#fff)] p-5 shadow-sm"><span className="grid size-10 place-items-center rounded-xl bg-white text-violet-700 shadow-sm"><ReceiptText size={18} /></span><h3 className="mt-5 text-sm font-semibold">Need more AI capacity?</h3><p className="mt-2 text-xs leading-5 text-zinc-500">Upgrade before launching a larger project to increase generation credits, published websites, storage, and collaborator seats.</p><div className="mt-5 grid gap-2 text-[11px] text-zinc-600"><span className="flex items-center gap-2"><Check size={13} className="text-violet-600" /> More full-site generations</span><span className="flex items-center gap-2"><Check size={13} className="text-violet-600" /> Additional live websites</span><span className="flex items-center gap-2"><Check size={13} className="text-violet-600" /> Team collaboration</span></div><button type="button" className="mt-6 h-10 w-full rounded-xl bg-violet-600 text-xs font-medium text-white transition hover:bg-violet-700">Compare AI plans</button></aside>
      </div>
    </section>
  );
}
