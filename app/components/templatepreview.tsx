"use client";

import { useMemo, useState, useEffect } from "react";
import { Check, Search, ChevronDown, ChevronUp, X } from "lucide-react";

const pageFilters = [
  "All Pages",
  "Single Page Website",
  "Multiple Pages Website",
];

const templates = [
  {
    id: 1,
    title: "Premium Template 1",
    category: "Realestate",
    type: "Single Page Website",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800",
  },
  {
    id: 2,
    title: "Premium Template 2",
    category: "Digital Marketing",
    type: "Multiple Pages Website",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
  },
  {
    id: 3,
    title: "Premium Template 3",
    category: "Ecommerce",
    type: "Single Page Website",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
  },
  {
    id: 4,
    title: "Premium Template 4",
    category: "Business",
    type: "Multiple Pages Website",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800",
  },
  {
    id: 5,
    title: "Premium Template 5",
    category: "Education",
    type: "Single Page Website",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800",
  },
  {
    id: 6,
    title: "Premium Template 6",
    category: "Fashion",
    type: "Multiple Pages Website",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800",
  },
  {
    id: 7,
    title: "Premium Template 7",
    category: "Hospital",
    type: "Single Page Website",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800",
  },
  {
    id: 8,
    title: "Premium Template 8",
    category: "Portfolio",
    type: "Multiple Pages Website",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
  },
  {
    id: 9,
    title: "Premium Template 9",
    category: "Agency",
    type: "Single Page Website",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800",
  },
  {
    id: 10,
    title: "Premium Template 10",
    category: "Restaurant",
    type: "Multiple Pages Website",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
  },
  {
    id: 11,
    title: "Premium Template 11",
    category: "Travel",
    type: "Single Page Website",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800",
  },
  {
    id: 12,
    title: "Premium Template 12",
    category: "Fitness",
    type: "Multiple Pages Website",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800",
  },
];

type Template = (typeof templates)[number];

const steps = ["Business Info", "Category", "Choose Design"];

export default function Templatepreview() {
  const [selectedFilter, setSelectedFilter] = useState("All Pages");
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

  useEffect(() => {
    if (previewTemplate) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [previewTemplate]);

  const closePreview = () => {
    setPreviewTemplate(null);
  };

  const filteredTemplates = useMemo(() => {
    const query = search.trim().toLowerCase();

    return templates.filter((item) => {
      const matchesFilter =
        selectedFilter === "All Pages" || item.type === selectedFilter;

      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [search, selectedFilter]);

  const visibleTemplates = filteredTemplates.slice(0, visibleCount);
  const isAllVisible = visibleCount >= filteredTemplates.length;

  const handleFilterSelect = (title: string) => {
    setSelectedFilter(title);
    setOpen(false);
    setVisibleCount(4);
  };

  const handleTemplateSelect = (id: number) => {
    setSelectedTemplate(id);
  };

  const clearSearch = () => {
    setSearch("");
    setVisibleCount(4);
  };

  const handleLoadMore = () => {
    if (isAllVisible) {
      setVisibleCount(4);
      return;
    }

    setVisibleCount((prev) => Math.min(prev + 8, filteredTemplates.length));
  };

  return (
    <div className="w-full px-4">
      <div
        className="
      mx-auto flex w-full max-w-4xl flex-col
      rounded-[22px] border border-gray-300 bg-white shadow-sm
      px-4 py-6
      sm:p-8
      lg:max-w-5xl lg:p-6
      xl:max-w-6xl xl:p-4
      2xl:max-w-7xl 2xl:p-10
    "
      >
        <div className="shrink-0 text-center">
          <Stepper currentStep={3} />

          <h2
            className="
          font-bold leading-tight tracking-tight text-slate-950
          text-xl
          sm:text-2xl
          lg:text-3xl
          lg:mt-4
          2xl:mt-6 2xl:text-4xl
        "
          >
            Select your design.
          </h2>

          <p
            className="
          mx-auto mt-2 max-w-md leading-5 text-slate-500
          text-xs
          sm:text-sm
          2xl:text-lg
        "
          >
            Choose the option that best describes your goal.
          </p>
        </div>

        <div
          className="
        mt-4 flex shrink-0 flex-col gap-2
        sm:gap-3
        md:mt-6 md:flex-row md:gap-4
        lg:mt-4
        2xl:mt-8
      "
        >
          <div className="relative flex flex-1 items-center">
            <Search
              className="
            absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500
            sm:left-5
          "
            />

            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setVisibleCount(4);
              }}
              type="text"
              placeholder="Search template e.g. Realestate, Digital Marketing, Ecommerce..."
              className="
            h-12 w-full rounded-full border border-slate-100 bg-slate-50
            pl-11 pr-11 text-xs text-slate-700 outline-none
            placeholder:text-slate-700 focus:border-red-200
            sm:pl-14 sm:pr-12 sm:text-sm
            lg:h-10
            2xl:h-14
          "
            />

            {search && (
              <button
                type="button"
                onClick={clearSearch}
                className="
              absolute right-4 top-1/2 -translate-y-1/2
              text-slate-400 transition hover:text-red-600
              sm:right-5
            "
              >
                <X size={17} />
              </button>
            )}
          </div>

          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className={`flex h-12 w-full cursor-pointer items-center justify-between gap-4 rounded-full border px-5 text-xs font-bold sm:text-sm md:w-[220px] lg:h-10 2xl:h-14 ${
                open
                  ? "border-red-200 bg-red-50 text-red-700"
                  : "border-red-100 bg-white text-red-700"
              }`}
            >
              <span className="truncate">{selectedFilter}</span>
              {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {open && (
              <div className="absolute right-0 z-20 mt-2 w-full overflow-hidden rounded-xl border border-slate-100 bg-white shadow-lg md:w-[220px]">
                {pageFilters.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => handleFilterSelect(item)}
                    className={`block w-full cursor-pointer px-5 py-4 text-left text-sm font-semibold transition hover:bg-red-50 hover:text-red-600 ${
                      selectedFilter === item
                        ? "bg-red-50 text-red-600"
                        : "text-slate-700"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {previewTemplate && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
            onClick={closePreview}
          >
            <div
              className="
        relative w-full max-w-6xl overflow-hidden
        rounded-3xl shadow-2xl bg-slate-50
      "
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={closePreview}
                className="
          absolute right-1 top-1
          flex h-8 w-8 items-center justify-center
          rounded-full bg-red-600 text-white
          shadow-lg transition hover:bg-red-700 cursor-pointer
        "
              >
                <X size={22} />
              </button>

              {/* Screen preview popup */}

              <div className="grid items-center gap-4 p-6 lg:grid-cols-[1fr_340px] ">
                {/* Left Side */}
                <div>
                  <h2 className="mb-6 text-2xl font-bold text-slate-950 ">
                    {previewTemplate.title}
                  </h2>

                  <div className="group relative w-full max-w-[800px] ">
                    <img
                      src="/macbook-frame.png"
                      alt="Laptop"
                      className="relative z-20 w-full pointer-events-none"
                    />

                    <div
                      className="
          absolute left-[7%] top-[0%] z-10 
          h-[95%] w-[86%]
          overflow-hidden rounded-[40px] bg-black
        "
                    >
                      <img
                        src={previewTemplate.image}
                        alt={previewTemplate.title}
                        className="
            w-full object-top
            transition-transform duration-[1000ms] ease-linear
            group-hover:-translate-y-[70%]
          "
                      />
                    </div>
                  </div>
                </div>

                {/* Right Side */}
                <div className="rounded-[28px] bg-white p-8 shadow-sm">
                  <h3 className="text-2xl font-bold text-slate-950">
                    {previewTemplate.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    A modern and professional template designed for clinics,
                    hospitals, and healthcare businesses.
                  </p>

                  <div className="mt-4 border-t pt-4">
                    <h4 className="font-bold text-slate-950">
                      {"What's included:"}
                    </h4>

                    <ul className="mt-4 space-y-4">
                      {[
                        "12+ Pre-built Pages",
                        "Fully Responsive Design",
                        "Modern & Clean Layout",
                        "SEO Optimized",
                        "Easy to Customize",
                      ].map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-3 text-slate-700"
                        >
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">
                            <Check size={14} strokeWidth={3} />
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      handleTemplateSelect(previewTemplate.id);
                      closePreview();
                    }}
                    className="
        mt-8 w-full rounded-lg
        bg-gradient-to-r from-blue-600 to-purple-600
        px-6 py-4 font-bold text-white
        transition hover:opacity-90
      "
                  >
                    Edit here →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div
          className={`mt-5 flex-1 px-1 pt-2 sm:px-2 sm:pt-1 md:mt-6 lg:mt-4 2xl:mt-8 ${
            visibleCount > 4 ? "max-h-[210px] overflow-y-auto pr-2" : ""
          }`}
        >
          <div
            className="
          grid grid-cols-1 gap-4
          min-[480px]:grid-cols-2
          md:grid-cols-3
          xl:grid-cols-4
          lg:gap-5
        "
          >
            {visibleTemplates.map((item) => {
              const isActive = selectedTemplate === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    handleTemplateSelect(item.id);
                    setPreviewTemplate(item);
                  }}
                  className={`relative cursor-pointer rounded-2xl border bg-white p-3 text-left transition hover:border-red-500 hover:shadow-md ${
                    isActive ? "border-red-500 shadow-md" : "border-slate-200"
                  }`}
                >
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-24 w-full object-cover"
                    />

                    {isActive && (
                      <span className="absolute left-2 top-2 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white">
                        <Check size={11} strokeWidth={3} />
                      </span>
                    )}

                    <span className="absolute right-2 top-2 z-10 rounded-md bg-blue-50 px-2 py-1 text-[8px] font-bold uppercase tracking-wider text-blue-600">
                      {item.type === "Single Page Website"
                        ? "Single"
                        : "Multiple"}
                    </span>
                  </div>

                  <div className="mt-4">
                    <h3 className="truncate text-sm font-extrabold text-slate-900 sm:text-base">
                      {item.title}
                    </h3>

                    <p className="truncate text-xs font-semibold text-slate-500">
                      {item.category}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {filteredTemplates.length === 0 && (
            <p className="py-10 text-center text-sm text-slate-400">
              No template found.
            </p>
          )}
        </div>

        {filteredTemplates.length > 4 && (
          <div className="mt-5 flex justify-center">
            <button
              type="button"
              onClick={handleLoadMore}
              className="cursor-pointer rounded-full border border-red-600 px-8 py-2 text-sm font-bold text-red-600 transition hover:bg-red-700 hover:text-white"
            >
              {isAllVisible ? "View Less" : "Load More"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Stepper({ currentStep }: { currentStep: number }) {
  return (
    <div className="mx-auto flex w-full max-w-3xl items-center justify-center gap-1 overflow-hidden px-1 mb-2">
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
