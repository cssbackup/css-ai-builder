"use client";

import { useState } from "react";
import { Check, CreditCard, LockKeyhole, ShieldCheck, WalletCards } from "lucide-react";
import PaymentPlans, { type PaymentPlan } from "./payment-plans";

export default function PaymentsTab() {
  const [enabled, setEnabled] = useState(false);
  const [showPlans, setShowPlans] = useState(false);
  const [activePlan, setActivePlan] = useState<PaymentPlan | null>(null);
  const features = ["Secure hosted checkout", "Direct bank payouts", "Simple refund management", "Dispute support", "Fast settlement tracking", "Fraud monitoring and compliance"];

  if (showPlans) {
    return <PaymentPlans onBack={() => setShowPlans(false)} onActivate={(plan) => { setActivePlan(plan); setEnabled(true); setShowPlans(false); }} />;
  }

  return (
    <section className="mx-auto w-full max-w-[1080px] px-4 py-6 sm:px-6 sm:py-8 lg:px-9">
      <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
        <div className="border-b border-zinc-100 bg-[linear-gradient(120deg,#f4f8ff,#fff_60%)] p-6 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-blue-700 text-white shadow-lg shadow-blue-200"><CreditCard size={22} /></span>
            <div className="flex-1"><h2 className="text-2xl font-semibold tracking-tight">Accept payments</h2><p className="mt-2 max-w-xl text-xs leading-5 text-zinc-500">Connect Lestow Payments to securely accept card payments, manage refunds, and track payouts from one workspace.</p></div>
            <span className={`w-fit rounded-full px-3 py-1.5 text-[10px] font-semibold ${enabled ? "bg-emerald-100 text-emerald-700" : "bg-zinc-100 text-zinc-600"}`}>{enabled ? `${activePlan?.name || "Payments"} active` : "Not connected"}</span>
          </div>
          <button type="button" onClick={() => { if (enabled) { setEnabled(false); setActivePlan(null); } else { setShowPlans(true); } }} className={`mt-6 h-10 rounded-xl px-5 text-xs font-medium transition ${enabled ? "border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50" : "bg-blue-700 text-white shadow-lg shadow-blue-200 hover:bg-blue-800"}`}>{enabled ? "Disable payments" : "Enable payments"}</button>
        </div>

        <div className="grid gap-7 p-6 sm:p-8 lg:grid-cols-[1fr_280px]">
          <div><h3 className="text-sm font-semibold">Payment methods and services</h3><p className="mt-2 text-xs text-zinc-500">Availability and processing fees can vary by country and payout currency.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">{features.map((feature) => <span key={feature} className="flex items-center gap-2.5 rounded-xl border border-zinc-100 bg-zinc-50/70 p-3 text-xs text-zinc-600"><i className="grid size-5 place-items-center rounded-full bg-emerald-100 text-emerald-700"><Check size={12} strokeWidth={3} /></i>{feature}</span>)}</div>
          </div>
          <aside className="rounded-2xl bg-zinc-950 p-5 text-white"><WalletCards className="text-blue-400" size={24} /><h3 className="mt-4 text-sm font-semibold">Built for secure selling</h3><p className="mt-2 text-xs leading-5 text-zinc-400">Customer payment data is handled through encrypted, PCI-compliant checkout infrastructure.</p><div className="mt-5 space-y-3 border-t border-white/10 pt-4 text-[11px] text-zinc-300"><span className="flex items-center gap-2"><ShieldCheck size={14} className="text-blue-400" /> Fraud protection included</span><span className="flex items-center gap-2"><LockKeyhole size={14} className="text-blue-400" /> Encrypted payment details</span></div></aside>
        </div>
      </div>
    </section>
  );
}
