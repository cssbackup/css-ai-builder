"use client";

import { useState } from "react";
import Image from "next/image";
import { Briefcase, Check, User, Users } from "lucide-react";
import Button from "@/components/ui/Button";

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
    <section className="w-full mx-auto overflow-hidden rounded-2xl border bg-white border-gray-300 shadow-[0_2px_16px_rgba(15,23,42,0.10)] ">
      <div className="mx-auto md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 2xl:py-10 lg:py-4 md:py-5 sm:py-4 py-6 px-6 sm:px-10 ">
        <Stepper currentStep={1} />

        <div className="mt-0 text-center 2xl:mt-10 md:mt-4 sm:mt-4">
          <h2 className="text-lg font-bold text-slate-900 sm:text-xl lg:text-2xl">
            Let&apos;s start with your business
          </h2>
          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            This helps us create a website that fits your needs.
          </p>
        </div>

        <div className="mt-4 2xl:mt-6 lg:mt-4 md:mt-6 sm:mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-6">
          <div className="hidden lg:block ">
            <div className="rounded h-full bg-gradient-to-br from-red-50 to-white p-2">
              <Image
                src="/category_type.png"
                alt="bussinesscategory"
                width="300"
                height="200"
                className="object-cover rounded-lg"
              />
            </div>
          </div>

          <div className="min-w-0">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
              {categories.map((item) => {
                const Icon = item.icon;
                const isActive = selected === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelected(item.id)}
                    className={[
                      "relative flex min-h-12 items-center justify-center rounded-xl border px-3 py-2 text-center cursor-pointer transition-all sm:min-h-24 sm:flex-col sm:py-3",
                      isActive
                        ? "border-red-600 bg-red-50"
                        : "border-slate-300 hover:border-slate-300",
                    ].join(" ")}
                  >
                    {isActive && (
                      <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-white ring-2 ring-white">
                        <Check size={12} strokeWidth={3} />
                      </span>
                    )}

                    <div className="flex items-center justify-center gap-3 sm:flex-col sm:gap-1">
                      <span
                        className={[
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                          isActive ? "bg-red-600 text-white" : "text-slate-600",
                        ].join(" ")}
                      >
                        <Icon size={18} />
                      </span>

                      <div className="flex min-w-0 flex-wrap items-center justify-center gap-x-1 sm:flex-col">
                        <span className="text-sm font-bold text-slate-900 sm:text-base">
                          {item.title}
                        </span>
                        <span className="text-xs text-slate-500">
                          ({item.subtitle})
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <form className="mt-4 2xl:mt-8 lg:mt-4 md:mt-4 sm:mt-5 space-y-4 2xl:space-y-6 lg:space-y-4 md:space-y-4 sm:space-y-4">
              <div>
                <label className="mb-1 block text-sm font-bold text-slate-950">
                  {active.labels.name}
                </label>
                <input
                  type="text"
                  placeholder={active.labels.namePlaceholder}
                  className="h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-300 focus:border-red-500 focus:ring-4 focus:ring-red-100 sm:h-14 sm:px-5"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-bold text-slate-950">
                  {active.labels.desc}
                </label>

                <div className="relative">
                  <textarea
                    maxLength={300}
                    placeholder={active.labels.descPlaceholder}
                    className="h-20 w-full resize-none rounded-xl border border-slate-300 bg-white overflow-hidden px-4 py-3 pr-16 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-300 focus:border-red-500 focus:ring-4 focus:ring-red-100 sm:h-24 sm:px-5 sm:py-4"
                  />

                  <span className="absolute bottom-3 right-4 text-xs font-semibold text-slate-400 sm:text-sm">
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

function Stepper({ currentStep }: { currentStep: number }) {
  return (
    <div className="mx-auto flex w-full max-w-3xl items-center justify-center gap-1 overflow-hidden px-1 mb-5">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        return (
          <div key={step} className="flex min-w-0 flex-1 items-center">
            <div
              className={[
                "flex min-w-0 flex-1 items-center justify-center gap-1 rounded-full border px-1.5 py-1 text-[10px] font-bold sm:gap-2 sm:px-3 sm:text-xs",
                isCompleted
                  ? "border-red-600 bg-red-600 text-white"
                  : isActive
                    ? "border-red-600 bg-white text-red-600 shadow-sm"
                    : "border-slate-300 bg-white text-slate-950",
              ].join(" ")}
            >
              <span
                className={[
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px]",
                  isCompleted
                    ? "border-white bg-red-700 text-white"
                    : isActive
                      ? "border-red-600 bg-white text-red-600"
                      : "border-slate-400 bg-white text-slate-800",
                ].join(" ")}
              >
                {isCompleted ? <Check size={12} strokeWidth={3} /> : index + 1}
              </span>

              <span className="truncate">{step}</span>
            </div>

            {index < steps.length - 1 && (
              <div
                className={`h-px w-2 shrink-0 sm:w-6 ${
                  index < currentStep ? "bg-red-600" : "bg-slate-300"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
