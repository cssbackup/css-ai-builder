"use client";

import { useState, type FormEvent } from "react";
import { Bell, Check, UserRound } from "lucide-react";

type UserProfile = { name: string; email: string; avatar?: string };

export default function SettingsTab({ user, onSave }: { user: UserProfile; onSave: (user: UserProfile) => void }) {
  const [form, setForm] = useState(user);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextUser = { name: form.name.trim(), email: form.email.trim(), avatar: user.avatar };
    if (!nextUser.name || !nextUser.email) return;
    onSave(nextUser);
    setForm(nextUser);
    setSaved(true);
  };

  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 sm:py-8 lg:px-9">
      <div><h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Settings</h2><p className="mt-1 text-xs text-zinc-500">Manage only the preferences connected to your account.</p></div>
      <form onSubmit={handleSubmit} className="mt-6 sm:mt-7">
        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
          <div className="flex flex-col gap-4 border-b border-zinc-100 p-4 sm:flex-row sm:p-5">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-700"><UserRound size={19} /></span>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-medium">Profile</h3>
              <p className="mt-1 text-xs text-zinc-500">Name and email shown across your workspace.</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <label className="grid gap-1.5 text-[10px] text-zinc-500">Name<input required value={form.name} onChange={(event) => { setForm((current) => ({ ...current, name: event.target.value })); setSaved(false); }} className="h-10 min-w-0 rounded-xl border border-zinc-200 px-3 text-xs text-zinc-900 outline-none focus:border-blue-400" /></label>
                <label className="grid gap-1.5 text-[10px] text-zinc-500">Email<input required type="email" value={form.email} onChange={(event) => { setForm((current) => ({ ...current, email: event.target.value })); setSaved(false); }} className="h-10 min-w-0 rounded-xl border border-zinc-200 px-3 text-xs text-zinc-900 outline-none focus:border-blue-400" /></label>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 sm:gap-4 sm:p-5">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-700"><Bell size={19} /></span>
            <div className="min-w-0 flex-1"><h3 className="text-sm font-medium">Notifications</h3><p className="mt-1 text-xs text-zinc-500">Receive important publishing and account updates.</p></div>
            <button type="button" aria-label="Toggle notifications" className="relative h-6 w-11 shrink-0 cursor-pointer rounded-full bg-blue-700 after:absolute after:right-1 after:top-1 after:size-4 after:rounded-full after:bg-white" />
          </div>
        </div>
        <div className="mt-5 flex items-center gap-3">
          <button type="submit" className="h-10 rounded-xl bg-zinc-950 px-5 text-xs font-medium text-white transition hover:bg-blue-700">Save changes</button>
          {saved && <span className="flex items-center gap-1.5 text-xs text-emerald-700"><Check size={15} /> Changes saved</span>}
        </div>
      </form>
    </section>
  );
}
