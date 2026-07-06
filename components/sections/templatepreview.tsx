"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Check, ChevronDown, ChevronUp, Search, X } from "lucide-react";
import {
  buildSelectedConfig,
  getTemplateVariables,
  getTemplatesForCategory,
  hasCategoryContent,
  type BuilderTemplate,
} from "@/app/editor/layout/src/data/templateFlow";
import { sectionRegistry } from "@/app/editor/layout/src/lib/sectionRegistry";
import type { SectionData } from "@/app/editor/layout/src/types/section";

const pageFilters = [
  "All Pages",
  "Single Page Website",
  "Multiple Pages Website",
];

const steps = ["Business Info", "Category", "Choose Design"];

type TemplatePreviewProps = {
  selectedCategory: string;
};

export default function Templatepreview({
  selectedCategory,
}: TemplatePreviewProps) {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState("All Pages");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [previewTemplate, setPreviewTemplate] = useState<BuilderTemplate | null>(
    null,
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = previewTemplate ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [previewTemplate]);

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

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredTemplates = useMemo(() => {
    const query = search.trim().toLowerCase();
    const sourceTemplates = selectedCategory
      ? getTemplatesForCategory(selectedCategory)
      : [];

    return sourceTemplates.filter((item) => {
      const matchesFilter =
        selectedFilter === "All Pages" || item.type === selectedFilter;
      const matchesSearch =
        !query ||
        `${selectedCategory} ${item.title}`.toLowerCase().includes(query) ||
        item.title.toLowerCase().includes(query) ||
        selectedCategory.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [search, selectedCategory, selectedFilter]);

  const totalPages = Math.ceil(filteredTemplates.length / 4);
  const isLastPage = page === Math.max(totalPages - 1, 0);
  const isFirstPage = page === 0;
  const visibleTemplates = filteredTemplates.slice(page * 4, page * 4 + 4);

  const previewConfig = previewTemplate
    ? buildSelectedConfig(previewTemplate.id, selectedCategory)
    : null;
  const previewVariables = previewTemplate
    ? getTemplateVariables(previewTemplate.id)
    : {};
  const previewFeatures = previewTemplate
    ? [
        `${previewTemplate.prebuilt_pages}+ Pre-built Pages`,
        "Same category content across templates",
        "Different section component combinations",
        "Editable header, banner, about, products, and footer",
        "Mobile-first modular structure",
      ]
    : [];

  const handleFilterSelect = (title: string) => {
    setSelectedFilter(title);
    setPage(0);
    setOpen(false);
  };

  const clearSearch = () => {
    setSearch("");
    setPage(0);
  };

  const handleLoadMore = () => {
    if (isLastPage) {
      setPage(0);
      return;
    }

    setPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setPage((prev) => Math.max(prev - 1, 0));
  };

  const openEditor = (template: BuilderTemplate) => {
    setSelectedTemplate(template.id);
    const params = new URLSearchParams({
      templateId: template.id,
      category: selectedCategory,
    });

    router.push(`/editor?${params.toString()}`);
  };

  const getTemplateDisplayTitle = (template: BuilderTemplate) =>
    selectedCategory ? `${selectedCategory} ${template.title}` : template.title;

  return (
    <div className="w-full px-4">
      <div className="mx-auto flex w-full max-w-4xl flex-col rounded-[22px] border border-gray-300 bg-white px-4 py-6 shadow-sm sm:p-8 lg:max-w-5xl lg:p-6 xl:max-w-6xl xl:p-4 2xl:max-w-7xl 2xl:p-10">
        <div className="shrink-0 text-center">
          <Stepper currentStep={3} />

          <h2 className="text-xl font-bold leading-tight tracking-tight text-slate-950 sm:text-2xl lg:mt-4 lg:text-3xl 2xl:mt-6 2xl:text-4xl">
            Select your {selectedCategory || "website"} design.
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-xs leading-5 text-slate-500 sm:text-sm 2xl:text-lg">
            Choose any template. The content stays the same for this category,
            while each template uses a different component combination.
          </p>
        </div>

        <div className="mt-4 flex shrink-0 flex-col gap-2 sm:gap-3 md:mt-6 md:flex-row md:gap-4 lg:mt-4 2xl:mt-8">
          <div className="relative flex flex-1 items-center">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 sm:left-5" />

            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(0);
              }}
              type="text"
              placeholder="Search template e.g. template-2, Realestate, Business..."
              className="h-12 w-full rounded-full border border-slate-100 bg-slate-50 pl-11 pr-11 text-xs text-slate-700 outline-none placeholder:text-slate-700 focus:border-red-200 sm:pl-14 sm:pr-12 sm:text-sm lg:h-10 2xl:h-14"
            />

            {search && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-red-600 sm:right-5"
                aria-label="Clear search"
              >
                <X size={17} />
              </button>
            )}
          </div>

          <div ref={dropdownRef} className="relative shrink-0">
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
              <div className="absolute right-0 z-10 mt-2 w-full overflow-hidden rounded-xl border border-slate-100 bg-white shadow-lg md:w-[220px]">
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
          <div className="fixed inset-0 z-20 bg-white">
            <div className="relative h-screen w-full overflow-hidden bg-slate-50">
              <button
                type="button"
                onClick={() => setPreviewTemplate(null)}
                className="fixed right-4 top-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition hover:bg-red-700"
                aria-label="Close preview"
              >
                <X size={22} />
              </button>

              <div className="grid h-full items-center gap-6 p-6 lg:grid-cols-[minmax(0,1fr)_400px]">
                <div className="flex h-full min-h-0 flex-col justify-center gap-8">
                  <h2 className="text-2xl font-bold text-slate-950 underline">
                    {getTemplateDisplayTitle(previewTemplate)}
                  </h2>

                  <div className="relative mx-auto w-full max-w-[780px]">
                    <Image
                      src="/macbook-frame.png"
                      alt="Laptop"
                      width={1200}
                      height={760}
                      className="pointer-events-none relative z-20 w-full"
                    />

                    <div className="absolute left-[7%] top-[3%] z-10 h-[88%] w-[86%] overflow-y-auto overflow-x-hidden bg-white">
                      <div
                        className="origin-top-left bg-white"
                        style={{
                          ...previewVariables,
                          width: "1440px",
                          transform: "scale(0.45)",
                          transformOrigin: "top left",
                        }}
                      >
                        {previewConfig?.sections.map((section) => {
                          const Component = sectionRegistry[section.variant];
                          const defaultVariant = `${section.type}-1`;
                          const variantData =
                            section.data?.[section.variant] ??
                            section.data?.[defaultVariant];

                          if (!Component) return null;

                          return (
                            <Component
                              key={section.type}
                              data={variantData as SectionData}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative max-h-[85vh] overflow-hidden rounded-[10px] border border-gray-200 p-6 shadow-xl">
                  <button
                    type="button"
                    onClick={() => setPreviewTemplate(null)}
                    className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-red-50 hover:text-red-600"
                    aria-label="Close template preview"
                  >
                    <X size={18} />
                  </button>

                  <p className="text-xs font-bold uppercase tracking-wider text-red-600">
                    TemplateId-{previewTemplate.numericId}
                  </p>

                  <h3 className="mt-2 text-2xl font-bold text-slate-950">
                    {getTemplateDisplayTitle(previewTemplate)}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {previewTemplate.preview_description}
                  </p>

                  <div className="mt-4 border-t pt-4">
                    <h4 className="font-bold text-slate-950">
                      {"What's included:"}
                    </h4>

                    <ul className="mt-4 space-y-3">
                      {previewFeatures.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-3 text-sm text-slate-700"
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                            <Check size={14} strokeWidth={3} />
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => openEditor(previewTemplate)}
                    className="mt-6 w-full cursor-pointer rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-bold text-white transition hover:opacity-90"
                  >
                    Edit here
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-5 flex-1 px-1 pt-2 sm:px-2 sm:pt-1 md:mt-6 lg:mt-4 2xl:mt-8">
          <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 md:grid-cols-3 lg:gap-5 xl:grid-cols-4">
            {visibleTemplates.map((item) => {
              const isActive = selectedTemplate === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSelectedTemplate(item.id);
                    setPreviewTemplate(item);
                  }}
                  className={`relative cursor-pointer rounded-2xl border bg-white p-3 text-left transition hover:border-red-500 hover:shadow-md ${
                    isActive ? "border-red-500 shadow-md" : "border-slate-200"
                  }`}
                >
                  <div className="relative overflow-hidden rounded-xl">
                    <Image
                      src={item.image}
                      alt={getTemplateDisplayTitle(item)}
                      width={480}
                      height={260}
                      className="h-28 w-full object-cover"
                    />

                    {isActive && (
                      <span className="absolute left-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white">
                        <Check size={11} strokeWidth={3} />
                      </span>
                    )}

                    <span className="absolute right-2 top-2 rounded-md bg-blue-50 px-2 py-1 text-[8px] font-bold uppercase tracking-wider text-blue-600">
                      {item.type === "Single Page Website"
                        ? "Single"
                        : "Multiple"}
                    </span>
                  </div>

                  <div className="mt-4">
                    <h3 className="truncate text-sm font-extrabold text-slate-900 sm:text-base">
                      {getTemplateDisplayTitle(item)}
                    </h3>

                    <p className="truncate text-xs font-semibold text-slate-500">
                      TemplateId-{item.numericId} - {selectedCategory}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {filteredTemplates.length === 0 && (
            <p className="py-10 text-center text-sm text-slate-400">
              {selectedCategory && !hasCategoryContent(selectedCategory)
                ? "No JSON data found for this category."
                : "No template found."}
            </p>
          )}
        </div>

        {filteredTemplates.length > 4 && (
          <div className="mt-5 flex justify-center gap-3">
            {!isFirstPage && (
              <button
                type="button"
                onClick={handlePrevious}
                className="cursor-pointer rounded-full border border-slate-400 px-8 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-700 hover:text-white"
              >
                Previous
              </button>
            )}

            <button
              type="button"
              onClick={handleLoadMore}
              className="cursor-pointer rounded-full border border-red-600 px-8 py-2 text-sm font-bold text-red-600 transition hover:bg-red-700 hover:text-white"
            >
              {isLastPage ? "View Less" : "Load More"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Stepper({ currentStep }: { currentStep: number }) {
  return (
    <div className="mx-auto mb-2 flex w-full max-w-3xl items-center justify-center gap-1 overflow-hidden px-1">
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
