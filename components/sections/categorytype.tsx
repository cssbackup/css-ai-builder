"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
import { getCategoryNamesWithContent } from "@/app/editor/layout/src/data/templateFlow";

const types = [
  {
    title: "Business",
    desc: "Grow your business",
    icon: Briefcase,
  },
  {
    title: "Portfolio",
    desc: "Showcase your work",
    icon: FileText,
  },
  {
    title: "Ecommerce",
    desc: "Sell products online",
    icon: ShoppingCart,
  },
  {
    title: "Realestate",
    desc: "List homes for sale",
    icon: Home,
  },
  {
    title: "School",
    desc: "Manage admissions",
    icon: GraduationCap,
  },
  {
    title: "Hospitals",
    desc: "Manage patient care",
    icon: Heart,
  },
  {
    title: "Fashion",
    desc: "Promote fashion brands",
    icon: ShoppingBag,
  },
  {
    title: "Games",
    desc: "Build gaming communities",
    icon: Gamepad2,
  },
  {
    title: "Financial",
    desc: "Offer financial services",
    icon: Briefcase,
  },
];

const steps = ["Business Info", "Category", "Choose Design"];
const availableCategoryNames = getCategoryNamesWithContent();
const availableTypes = types.filter((item) =>
  availableCategoryNames.includes(item.title),
);

type CategoryTypeProps = {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
};

export default function Categorystep({
  selectedCategory,
  onCategoryChange,
}: CategoryTypeProps) {
  const [selected, setSelected] = useState(selectedCategory);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredTypes = useMemo(() => {
    if (!search.trim()) return availableTypes;

    return availableTypes.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  const handleSelect = (title: string) => {
    setSelected(title);
    onCategoryChange(title);
    setOpen(false);
  };

  const handleAllItems = () => {
    setSelected("");
    onCategoryChange("");
    setSearch("");
    setOpen(false);
  };

  const clearSearch = () => {
    setSearch("");
  };

  return (
    <div className="w-full ">
      <div
        className="
          mx-auto flex max-w-4xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl flex-col
          rounded-[22px] border border-gray-300 bg-white shadow-sm
          sm:p-10
          md:p-8
         lg:p-5
         xl:p-4
         2xl:p-10
        px-4
        py-6
        "
      >
        <div className="shrink-0 text-center">
          <Stepper currentStep={2} />
          <h2
            className="
              text-[20px] font-bold leading-tight tracking-tight text-slate-950
              min-[375px]:text-[18px]
              sm:text-2xl
              md:text-[25px]
              lg:text-[30px]
              lg:mt-3
              xl:text-[30px]
              2xl:mt-6
              2xl:text-4xl 
            "
          >
            What type of website do you need?
          </h2>

          <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-slate-500 2xl:text-lg text-base sm:text-sm md:text-sm">
            Choose the option that best describes your goal.
          </p>
        </div>

        <div className="mt-4 lg:mt-3 xl:mt-4 2xl:mt-8 md:mt-6 flex shrink-0 flex-col gap-2 sm:gap-3 md:flex-row md:gap-4">
          <div className="relative flex-1 flex items-center">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 sm:left-5 sm:h-4 2xl:h-10 sm:w-4" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search for a category (e.g., Realestate, Education)..."
              className="
                h-12 sm:h-13 md:h-15 lg:h-10 2xl:h-14  w-full rounded-full border border-slate-100 bg-slate-50
                pl-11 pr-11 text-xs text-slate-700 outline-none
                placeholder:text-slate-700 focus:border-red-200
                 sm:pl-14 sm:pr-12 sm:text-sm
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

          <div ref={dropdownRef} className="relative shrink-0">
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className={`flex h-12 lg:h-10 2xl:h-14 w-full items-center justify-between gap-4 rounded-full border px-5 text-xs font-bold cursor-pointer sm:h-13 md:h-15 sm:text-sm md:w-[190px] ${
                open
                  ? "border-red-200 bg-red-50 text-red-700"
                  : "border-slate-100 bg-slate-50 text-slate-900"
              }`}
            >
              <span className="truncate">Popular Types</span>
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

                {availableTypes.map((item) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => handleSelect(item.title)}
                    className={`flex w-full cursor-pointer items-center justify-between gap-3 px-5 py-3 text-left text-sm transition hover:bg-red-50 hover:text-red-600 ${
                      selected === item.title
                        ? "bg-red-50 font-bold text-red-600"
                        : "text-slate-700"
                    }`}
                  >
                    <span>{item.title}</span>
                    {selected === item.title && (
                      <Check size={14} strokeWidth={3} />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-3 flex-1 overflow-y-auto px-1 pt-2 sm:px-2 sm:pt-1 2xl:mt-8 xl:mt-3 lg:mt-2 md:mt-6 max-[479px]:max-h-[300px] max-[550px]:max-h-[280px] ">
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
                  className={`relative max-h-[90px] cursor-pointer rounded-2xl border py-2 px-5 text-left transition hover:border-red-300 sm:min-h-[80px] 2xl:py-5 2xl:px-5 sm:py-2 sm:px-4 ${
                    isActive
                      ? "border-red-500 bg-red-50"
                      : "border-slate-300 bg-white"
                  }`}
                >
                  {isActive && (
                    <span className="absolute -right-2 -top-1 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-white shadow">
                      <Check size={15} />
                    </span>
                  )}

                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-extrabold text-slate-950 sm:text-base lg:text-[14px]">
                      {item.title}
                    </h3>

                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-xl sm:h-8 sm:w-8 ${
                        isActive
                          ? "bg-red-600 text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <Icon size={14} />
                    </div>
                  </div>

                  <p className="mt-1 text-xs leading-5 text-slate-500 sm:mt-0 sm:text-[14px] sm:leading-6">
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

              <span className="truncate 2xl:text-md semibold">{step}</span>
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
