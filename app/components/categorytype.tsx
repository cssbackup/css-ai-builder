"use client";

import { useMemo, useState } from "react";
import {
  Briefcase,
  FileText,
  ShoppingCart,
  Home,
  GraduationCap,
  Heart,
  ShoppingBag,
  Gamepad2,
  Check,
  Search,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";

const types = [
  {
    title: "Business",
    desc: "Corporate, company or organization",
    icon: Briefcase,
  },
  {
    title: "Portfolio",
    desc: "Showcase your work and projects",
    icon: FileText,
  },
  {
    title: "Ecommerce",
    desc: "Sell products online",
    icon: ShoppingCart,
  },
  {
    title: "Realestate",
    desc: "Property listings and agents",
    icon: Home,
  },
  {
    title: "Education",
    desc: "Schools, courses, e-learning",
    icon: GraduationCap,
  },
  {
    title: "Hospitals",
    desc: "Clinics, doctors, healthcare",
    icon: Heart,
  },
  {
    title: "Fashion",
    desc: "Clothing, boutiques, trends",
    icon: ShoppingBag,
  },
  {
    title: "Games",
    desc: "Gaming portals, clans",
    icon: Gamepad2,
  },
  {
    title: "Financial",
    desc: "Banks, finance, accounting",
    icon: Briefcase,
  },
];

const steps = ["Business Info", "Category", "Choose Design"];

export default function Categorystep() {
  const [selected, setSelected] = useState("Business");
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const filteredTypes = useMemo(() => {
    if (!search.trim()) return types;

    return types.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  const handleSelect = (title: string) => {
    setSelected(title);
    setSearch(title);
    setOpen(false);
  };

  const handleAllItems = () => {
    setSelected("");
    setSearch("");
    setOpen(false);
  };

  const clearSearch = () => {
    setSearch("");
  };

  return (
    <div className="w-full">
      <div
        className="
          mx-auto flex w-full max-w-5xl flex-col
          rounded-[22px] border border-gray-200 bg-white shadow-sm
         lg:p-2
          sm:rounded-[26px] sm:px-6 sm:py-6
          md:px-8
          lg:rounded-[28px] lg:px-10
          max-h-[calc(100dvh-160px)]
          min-h-0
        "
      >
        <div className="shrink-0 text-center">
          <Stepper currentStep={2} />
          <h2
            className="
              text-[20px] font-bold leading-tight tracking-tight text-slate-950
              min-[375px]:text-[18px]
              sm:text-2xl
              md:text-2xl
              lg:text-3xl
            "
          >
            What type of website do you need?
          </h2>

          <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-slate-500 sm:text-sm md:text-base">
            Choose the option that best describes your goal.
          </p>
        </div>

        <div className="mt-4 flex shrink-0 flex-col gap-2 sm:gap-3 md:flex-row md:gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 sm:left-5 sm:h-5 sm:w-5" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search for a category (e.g., Realestate, Education)..."
              className="
                h-12 w-full rounded-full border border-slate-100 bg-slate-50
                pl-11 pr-11 text-xs text-slate-700 outline-none
                placeholder:text-slate-700 focus:border-red-200
                sm:h-14 sm:pl-14 sm:pr-12 sm:text-sm
              "
            />

            {search && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-red-600 sm:right-5"
              >
                <X size={17} />
              </button>
            )}
          </div>

          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className={`flex h-12 w-full items-center justify-between gap-4 rounded-full border px-5 text-xs font-bold cursor-pointer sm:h-14 sm:text-sm md:w-[190px] ${
                open
                  ? "border-red-200 bg-red-50 text-red-700"
                  : "border-slate-100 bg-slate-50 text-slate-900"
              }`}
            >
              <span className="truncate">{selected || "Popular Types"}</span>
              {open ? (
                <ChevronUp className="shrink-0" size={16} />
              ) : (
                <ChevronDown className="shrink-0" size={16} />
              )}
            </button>

            {open && (
              <div
                className="
                  absolute right-0 z-20 mt-2 max-h-64 w-full overflow-y-auto
                  rounded-2xl border border-slate-100 bg-white py-2 shadow-lg
                  md:w-[190px]
                "
              >
                <button
                  type="button"
                  onClick={handleAllItems}
                  className={`block w-full px-5 py-3 text-left text-sm transition hover:bg-red-50 hover:text-red-600 ${
                    selected === ""
                      ? "bg-red-50 font-bold text-red-600"
                      : "font-semibold text-slate-900"
                  }`}
                >
                  All Items
                </button>

                <div className="my-1 border-t border-slate-100" />

                {types.map((item) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => handleSelect(item.title)}
                    className={`block w-full px-5 py-3 text-left text-sm transition cursor-pointer hover:bg-red-50 hover:text-red-600 ${
                      selected === item.title
                        ? "bg-red-50 font-bold text-red-600"
                        : "text-slate-700"
                    }`}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 min-h-0 flex-1 overflow-y-auto px-1 pt-2 sm:px-2 sm:pt-3">
          <div
            className="
              grid grid-cols-1 gap-3
              min-[480px]:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              lg:gap-4
            "
          >
            {filteredTypes.map((item) => {
              const Icon = item.icon;
              const isActive = selected === item.title;

              return (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => handleSelect(item.title)}
                  className={`relative min-h-[116px] cursor-pointer rounded-2xl border p-4 text-left transition hover:border-red-300 sm:min-h-[132px] sm:p-5 ${
                    isActive
                      ? "border-red-500 bg-red-50"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  {isActive && (
                    <span className="absolute right-2 top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-white shadow">
                      <Check size={15} />
                    </span>
                  )}

                  <div
                    className={`mb-3 flex h-9 w-9 items-center justify-center rounded-xl sm:mb-4 sm:h-10 sm:w-10 ${
                      isActive
                        ? "bg-red-600 text-white"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    <Icon size={19} />
                  </div>

                  <h3 className="text-sm font-extrabold text-slate-950 sm:text-base">
                    {item.title}
                  </h3>

                  <p className="mt-1.5 text-xs leading-5 text-slate-500 sm:mt-2 sm:text-sm sm:leading-6">
                    {item.desc}
                  </p>
                </button>
              );
            })}
          </div>

          {filteredTypes.length === 0 && (
            <p className="py-10 text-center text-sm text-slate-400">
              No category found.
            </p>
          )}
        </div>
      </div>
    </div>
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
