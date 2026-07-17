"use client";

import { useState, type FormEvent } from "react";
import { Bell, Check, Save, Settings2 } from "lucide-react";

type UserProfile = { name: string; email: string; password?: string; avatar?: string };

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return <button type="button" aria-label={label} aria-pressed={checked} onClick={onChange} className={`relative h-6 w-11 shrink-0 rounded-full transition ${checked ? "bg-blue-700" : "bg-zinc-200"}`}><span className={`absolute top-1 size-4 rounded-full bg-white shadow-sm transition-all ${checked ? "left-6" : "left-1"}`} /></button>;
}

export default function SettingsTab({ user }: { user: UserProfile; onSave: (user: UserProfile) => void }) {
  const [saved, setSaved] = useState(false);
  const [options, setOptions] = useState({ autosave: true, seo: true, publishAlerts: true, domainAlerts: true });
  const toggle = (key: keyof typeof options) => { setOptions((current) => ({ ...current, [key]: !current[key] })); setSaved(false); };
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); window.localStorage.setItem("lestow-site-settings", JSON.stringify(options)); setSaved(true); };

  return (
    <section className="mx-auto w-full max-w-[980px] px-4 py-6 sm:px-6 sm:py-8 lg:px-9">
      <div><h2 className="text-2xl font-semibold tracking-tight">Website settings</h2><p className="mt-1 text-xs text-zinc-500">Manage the defaults used across your Lestow websites.</p></div>
      <form onSubmit={submit} className="mt-7 overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-[0_18px_50px_rgba(86,110,160,.10)]">
        <section className="grid divide-y divide-zinc-100 p-5 sm:p-6"><div className="mb-2 flex items-center gap-3 pb-4"><span className="grid size-10 place-items-center rounded-xl bg-violet-50 text-violet-700"><Settings2 size={18} /></span><div><h3 className="text-sm font-semibold">Building & publishing</h3><p className="mt-1 text-[10px] text-zinc-500">Essential behavior for editing and launching websites.</p></div></div>{[{ key: "autosave" as const, title: "Autosave website changes", text: "Continuously save edits made in the builder." }, { key: "seo" as const, title: "Generate SEO essentials", text: "Create titles, descriptions, and social sharing details." }].map(({ key, title, text }) => <div key={key} className="flex items-center gap-4 py-4"><div className="flex-1"><h4 className="text-xs font-medium">{title}</h4><p className="mt-1 text-[10px] text-zinc-500">{text}</p></div><Toggle checked={options[key]} onChange={() => toggle(key)} label={title} /></div>)}</section>

        <section className="border-t border-blue-50 bg-blue-50/35 p-5 sm:p-6"><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-white text-emerald-700 shadow-sm"><Bell size={18} /></span><div><h3 className="text-sm font-semibold">Important notifications</h3><p className="mt-1 text-[10px] text-zinc-500">Sent to your verified email: {user.email}</p></div></div><div className="mt-4 grid gap-3 sm:grid-cols-2">{[{ key: "publishAlerts" as const, title: "Publishing status", text: "Successful launches and deployment failures." }, { key: "domainAlerts" as const, title: "Domain health", text: "DNS, SSL, and connection problems." }].map(({ key, title, text }) => <div key={key} className="flex items-center gap-3 rounded-xl border border-white bg-white/80 p-3"><div className="flex-1"><h4 className="text-xs font-medium">{title}</h4><p className="mt-1 text-[10px] text-zinc-500">{text}</p></div><Toggle checked={options[key]} onChange={() => toggle(key)} label={title} /></div>)}</div></section>
        <div className="flex items-center gap-3 border-t border-zinc-100 p-5 sm:px-6"><button type="submit" className="flex h-10 items-center gap-2 rounded-xl bg-blue-700 px-5 text-xs font-medium text-white transition hover:bg-blue-800"><Save size={14} /> Save settings</button>{saved && <span className="flex items-center gap-1.5 text-xs text-emerald-700"><Check size={15} /> Saved</span>}</div>
      </form>
    </section>
  );
}
