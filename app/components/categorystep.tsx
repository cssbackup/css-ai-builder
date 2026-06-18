"use client";

import { useState } from "react";
import { Briefcase, Building2, Check, User, Users } from "lucide-react";

type Category = "clients" | "myself" | "company";

const categories = [
  {
    id: "clients",
    title: "Clients",
    subtitle: "Agency",
    icon: Users,
    labels: {
      name: "Client Name",
      desc: "Client Description",
      namePlaceholder: "Enter client name",
      descPlaceholder: "Tell us about your client...",
    },
  },
  {
    id: "myself",
    title: "Myself",
    subtitle: "Individual",
    icon: User,
    labels: {
      name: "Your Full Name",
      desc: "Professional Bio",
      namePlaceholder: "Enter your full name",
      descPlaceholder: "Tell us about your skills and experience...",
    },
  },
  {
    id: "company",
    title: "My Company",
    subtitle: "Business",
    icon: Briefcase,
    labels: {
      name: "Business Name",
      desc: "Business Description",
      namePlaceholder: "Enter your business name",
      descPlaceholder: "Tell us what your business does...",
    },
  },
] as const;

const steps = ["Business Info", "Category", "Choose Design"];

export default function CategoryStep() {
  const [selected, setSelected] = useState<Category>("clients");

  const active = categories.find((item) => item.id === selected)!;

  return (
    <section className="w-full rounded-2xl bg-white p-4 shadow-[0_2px_16px_rgba(15,23,42,0.10)] sm:p-6 lg:p-1">
      <div className="mx-auto max-w-4xl">
        <Stepper />

        <div className="mt-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Let&apos;s start with your business
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            This helps us create a website that fits your needs.
          </p>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-5 lg:grid-cols-[260px_1fr] lg:items-start">
          <div className="hidden lg:block">
            <div className="rounded-[36px] bg-gradient-to-br from-red-50 to-white p-6">
              <div className="flex h-72 items-center justify-center rounded-[28px] bg-red-100/50 text-red-500">
                <Building2 size={110} strokeWidth={1.5} />
              </div>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {categories.map((item) => {
                const Icon = item.icon;
                const isActive = selected === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelected(item.id)}
                    className={[
                      "relative flex h-[100px] flex-col items-center justify-center rounded-xl border bg-white px-3 py-3 text-center transition-all",
                      isActive
                        ? "border-red-600 bg-red-50"
                        : "border-slate-200 hover:border-slate-300",
                    ].join(" ")}
                  >
                    {isActive && (
                      <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-white ring-2 ring-white">
                        <Check size={12} strokeWidth={3} />
                      </span>
                    )}

                    <span
                      className={[
                        "mb-2 flex h-9 w-9 p-1 items-center justify-center rounded-lg",
                        isActive ? "bg-red-600 text-white" : "text-slate-600",
                      ].join(" ")}
                    >
                      <Icon size={18} />
                    </span>

                    <span className="text-[18px] font-bold text-slate-900">
                      {item.title}
                    </span>

                    <span className=" text-sm text-slate-500">
                      ({item.subtitle})
                    </span>
                  </button>
                );
              })}
            </div>

            <form className="mt-4 space-y-3 bg-blue-500">
              <div>
                <label className="mb-1 block font-bold text-slate-950">
                  {active.labels.name}
                </label>
                <input
                  type="text"
                  placeholder={active.labels.namePlaceholder}
                  className="h-14 w-full rounded-xl border border-slate-200 bg-white px-5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                />
              </div>

              <div>
                <label className="mb-1 block font-bold text-slate-950">
                  {active.labels.desc}
                </label>
                <div className="relative">
                  <textarea
                    maxLength={300}
                    placeholder={active.labels.descPlaceholder}
                    className="min-h-20 w-full resize-none rounded-xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                  />
                  <span className="absolute bottom-3 right-4 text-sm font-semibold text-slate-400">
                    0/300
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stepper() {
  return (
    <div className="mx-auto flex w-full max-w-3xl items-center justify-center overflow-x-auto px-1">
      {steps.map((step, index) => {
        const isCompleted = index === 0;
        const isActive = index === 1;

        return (
          <div key={step} className="flex shrink-0 items-center">
            <div
              className={[
                "flex items-center gap-2 rounded-full border px-2 py-1 text-xs font-bold sm:px-3",
                isCompleted
                  ? "border-red-600 bg-red-600 text-white"
                  : isActive
                    ? "border-slate-300 bg-white text-slate-950 shadow-sm"
                    : "border-slate-300 bg-white text-slate-950",
              ].join(" ")}
            >
              <span
                className={[
                  "flex h-5 w-5 items-center justify-center rounded-full border text-[11px]",
                  isCompleted
                    ? "border-white bg-red-700 text-white"
                    : "border-slate-400 bg-white text-slate-800",
                ].join(" ")}
              >
                {isCompleted ? <Check size={12} strokeWidth={3} /> : index + 1}
              </span>
              <span className="hidden sm:inline">{step}</span>
            </div>

            {index < steps.length - 1 && (
              <div className="h-px w-5 bg-slate-300 sm:w-8" />
            )}
          </div>
        );
      })}
    </div>
  );
}
