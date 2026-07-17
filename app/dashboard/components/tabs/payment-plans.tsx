"use client";

import { useState } from "react";
import { ArrowLeft, Check, Sparkles } from "lucide-react";

export type PaymentPlan = {
  name: string;
  price: number;
  description: string;
  features: string[];
};

const plans: PaymentPlan[] = [
  {
    name: "Starter",
    price: 12,
    description: "For new businesses accepting their first online payments.",
    features: ["Up to $5,000 monthly sales", "Secure hosted checkout", "Weekly payouts"],
  },
  {
    name: "Growth",
    price: 29,
    description: "For growing websites that need faster payouts and insights.",
    features: ["Up to $25,000 monthly sales", "Advanced payment analytics", "Three-day payouts", "Refund management"],
  },
  {
    name: "Scale",
    price: 59,
    description: "For established stores with higher payment volume.",
    features: ["Unlimited monthly sales", "Priority payment support", "Instant payout access", "Advanced fraud protection"],
  },
];

export default function PaymentPlans({ onBack, onActivate }: { onBack: () => void; onActivate: (plan: PaymentPlan) => void }) {
  const [selected, setSelected] = useState<PaymentPlan>(plans[1]);

  return (
    <section className="mx-auto w-full max-w-[1180px] px-4 py-6 sm:px-6 sm:py-8 lg:px-9">
      <button type="button" onClick={onBack} className="flex items-center gap-2 text-xs font-medium text-zinc-500 transition hover:text-blue-700"><ArrowLeft size={15} /> Back to payments</button>
      <div className="mt-6 text-center"><span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-blue-700"><Sparkles size={12} /> Simple monthly pricing</span><h2 className="mt-4 text-3xl font-semibold tracking-tight">Choose your payments plan</h2><p className="mx-auto mt-2 max-w-xl text-xs leading-5 text-zinc-500">Select the plan that matches your current sales volume. All prices are in US dollars and you can change plans later.</p></div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {plans.map((plan) => {
          const active = selected.name === plan.name;
          return (
            <button key={plan.name} type="button" onClick={() => setSelected(plan)} className={`relative flex min-h-[330px] cursor-pointer flex-col rounded-3xl border p-6 text-left transition ${active ? "border-blue-600 bg-blue-50/50 shadow-[0_18px_45px_rgba(37,99,235,.14)] ring-2 ring-blue-100" : "border-zinc-200 bg-white hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"}`}>
              {plan.name === "Growth" && <span className="absolute right-4 top-4 rounded-full bg-blue-700 px-2.5 py-1 text-[9px] font-semibold text-white">Most popular</span>}
              <span className="text-sm font-semibold">{plan.name}</span>
              <span className="mt-5 flex items-end gap-1"><strong className="text-4xl tracking-tight">${plan.price}</strong><small className="pb-1 text-xs text-zinc-500">/month</small></span>
              <p className="mt-4 min-h-10 text-xs leading-5 text-zinc-500">{plan.description}</p>
              <span className="my-5 h-px w-full bg-zinc-200" />
              <span className="grid gap-3">{plan.features.map((feature) => <span key={feature} className="flex items-center gap-2 text-xs text-zinc-600"><i className="grid size-5 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700"><Check size={11} strokeWidth={3} /></i>{feature}</span>)}</span>
              <span className={`mt-auto pt-6 text-center text-xs font-semibold ${active ? "text-blue-700" : "text-zinc-500"}`}>{active ? "Selected plan" : "Choose plan"}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl border border-zinc-200 bg-white p-4 sm:flex-row sm:px-6"><div><p className="text-xs font-semibold">{selected.name} plan selected</p><p className="mt-1 text-[10px] text-zinc-500">${selected.price} USD billed monthly. Cancel or switch plans anytime.</p></div><button type="button" onClick={() => onActivate(selected)} className="h-11 w-full rounded-xl bg-blue-700 px-6 text-xs font-medium text-white shadow-lg shadow-blue-200 transition hover:bg-blue-800 sm:w-auto">Activate {selected.name}</button></div>
    </section>
  );
}
