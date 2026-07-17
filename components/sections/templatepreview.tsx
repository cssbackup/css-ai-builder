"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Eye,
  Palette,
  Search,
  Sparkles,
  X,
} from "lucide-react";
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
  const [previewTemplate, setPreviewTemplate] =
    useState<BuilderTemplate | null>(null);
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
  const previewTemplateIndex = previewTemplate
    ? filteredTemplates.findIndex(
        (template) => template.id === previewTemplate.id,
      )
    : -1;
  const previewCarouselStart =
    previewTemplateIndex < 0
      ? 0
      : Math.min(
          Math.max(previewTemplateIndex - 1, 0),
          Math.max(filteredTemplates.length - 4, 0),
        );
  const previewCarouselTemplates = filteredTemplates.slice(
    previewCarouselStart,
    previewCarouselStart + 4,
  );

  const handleFilterSelect = (title: string) => {
    setSelectedFilter(title);
    setPage(0);
    setOpen(false);
  };

  const clearSearch = () => {
    setSearch("");
    setPage(0);
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

  const selectPreviewTemplate = (template: BuilderTemplate) => {
    setSelectedTemplate(template.id);
    setPreviewTemplate(template);
  };

  const handlePreviewSlide = (direction: "previous" | "next") => {
    if (!filteredTemplates.length) return;

    const currentIndex = Math.max(previewTemplateIndex, 0);
    const offset = direction === "next" ? 1 : -1;
    const nextIndex =
      (currentIndex + offset + filteredTemplates.length) %
      filteredTemplates.length;

    selectPreviewTemplate(filteredTemplates[nextIndex]);
  };

  return (
    <div className="w-full">
      <div className="relative mx-auto flex w-full max-w-7xl flex-col overflow-hidden border border-white/80 bg-white/95 px-5 py-5 shadow-[0_30px_80px_rgba(25,60,150,.18)] backdrop-blur-xl sm:px-7 lg:px-9 lg:py-7">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#315ff4] via-[#7ea4ff] to-cyan-300" />
        <div className="flex shrink-0 items-start gap-3 border-b border-blue-100 pb-5">
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[linear-gradient(145deg,#244bd5,#6e91ff)] text-white shadow-[0_12px_28px_rgba(49,95,244,.25)]">
            <Palette size={19} />
          </span>
          <div>
            <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[.18em] text-[#315ff4]">
              <Sparkles size={11} /> Curated by AI
            </div>
            <h2 className="mt-1 text-xl font-semibold tracking-[-.04em] text-[#08132f] sm:text-2xl">
              Pick a look for your {selectedCategory || "website"}
            </h2>
            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              Preview a direction, then make every section and detail your own.
            </p>
          </div>
        </div>

        <div className="mt-5 flex shrink-0 flex-col gap-3 md:flex-row">
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
              className="h-12 w-full rounded-2xl border border-blue-100 bg-blue-50/50 pl-11 pr-11 text-sm text-[#08132f] outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#315ff4] focus:bg-white focus:ring-4 focus:ring-blue-100"
            />

            {search && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-[#315ff4] sm:right-5"
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
              className={`flex h-12 w-full cursor-pointer items-center justify-between gap-4 rounded-2xl border px-5 text-sm font-semibold transition-all duration-300 md:w-[220px] ${
                open
                  ? "border-[#315ff4] bg-blue-50 text-[#315ff4] ring-4 ring-blue-100"
                  : "border-blue-100 bg-white text-[#315ff4] hover:border-blue-300"
              }`}
            >
              <span className="truncate">{selectedFilter}</span>
              {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {open && (
              <div className="absolute right-0 z-10 mt-2 w-full overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-[0_18px_45px_rgba(25,60,150,.16)] md:w-[220px]">
                {pageFilters.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => handleFilterSelect(item)}
                    className={`block w-full cursor-pointer px-5 py-3.5 text-left text-sm font-semibold transition hover:bg-blue-50 hover:text-[#315ff4] ${
                      selectedFilter === item
                        ? "bg-blue-50 text-[#315ff4]"
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
                className="fixed right-4 top-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#315ff4] text-white shadow-lg transition hover:bg-[#244bd5]"
                aria-label="Close preview"
              >
                <X size={22} />
              </button>

              <div className="flex h-full flex-col gap-5 overflow-y-auto p-4 sm:p-6 lg:overflow-hidden">
                <div className="grid min-h-0 flex-1 items-end gap-5 lg:grid-cols-[minmax(0,1fr)_390px] xl:grid-cols-[minmax(0,1fr)_410px] 2xl:grid-cols-[minmax(0,1fr)_710px] ">
                  <div className="flex min-h-0 flex-col justify-end gap-8 pt-10 lg:h-full lg:pt-0 ">
                    {/* <h2 className="text-2xl font-bold text-slate-950 underline">
                    {getTemplateDisplayTitle(previewTemplate)}
                  </h2>  */}

                    <div className="relative mx-auto w-full xl:max-w-[520px] 2xl:max-w-[710px] mb-6">
                      <Image
                        src="/macbook-frame.png"
                        alt="Laptop"
                        width={1200}
                        height={760}
                        className="pointer-events-none relative z-20 w-full"
                      />

                      <div className="absolute left-[7%] top-[3%] z-10 h-[88%] w-[86%] overflow-hidden bg-white">
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

                  <div className="relative overflow-hidden rounded-[10px] border border-gray-200 bg-white p-5 shadow-xl lg:max-h-[85vh] lg:p-4 mb-5">
                    <button
                      type="button"
                      onClick={() => setPreviewTemplate(null)}
                      className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-blue-100 bg-white text-slate-700 shadow-sm transition hover:bg-blue-50 hover:text-[#315ff4]"
                      aria-label="Close template preview"
                    >
                      <X size={18} />
                    </button>
                    {/* 
                    <p className="text-xs font-bold uppercase tracking-wider text-red-600">
                      TemplateId-{previewTemplate.numericId}
                    </p> */}

                    <h3 className="text-2xl font-bold text-slate-950">
                      {getTemplateDisplayTitle(previewTemplate)}
                    </h3>

                    {/* <p className="mt-3 text-sm leading-6 text-slate-600">
                      {previewTemplate.preview_description}
                    </p> */}

                    <div className="border-t pt-4 mt-3">
                      <h4 className="font-bold text-slate-950">
                        {"What's included:"}
                      </h4>

                      <ul className="mt-2 space-y-3">
                        {previewFeatures.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-center gap-2 text-sm text-slate-700"
                          >
                            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                              <Check size={10} strokeWidth={3} />
                            </span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      type="button"
                      onClick={() => openEditor(previewTemplate)}
                      className="mt-6 w-full cursor-pointer rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-1 font-bold text-white transition hover:opacity-90"
                    >
                      Edit here
                    </button>
                  </div>
                </div>

                {previewCarouselTemplates.length > 0 && (
                  <div className="relative mx-auto w-full max-w-7xl shrink-0 px-10 pb-1 sm:px-12">
                    {filteredTemplates.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={() => handlePreviewSlide("previous")}
                          className="absolute left-0 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-blue-100 bg-white text-slate-800 shadow-md transition hover:border-blue-300 hover:bg-blue-50 hover:text-[#315ff4]"
                          aria-label="Previous template"
                        >
                          <ChevronLeft size={20} strokeWidth={2.5} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handlePreviewSlide("next")}
                          className="absolute right-0 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-blue-100 bg-white text-slate-800 shadow-md transition hover:border-blue-300 hover:bg-blue-50 hover:text-[#315ff4]"
                          aria-label="Next template"
                        >
                          <ChevronRight size={20} strokeWidth={2.5} />
                        </button>
                      </>
                    )}

                    <div className="grid grid-cols-1 gap-3 min-[520px]:grid-cols-2 lg:grid-cols-4">
                      {previewCarouselTemplates.map((item) => {
                        const isActive = previewTemplate.id === item.id;

                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => selectPreviewTemplate(item)}
                            className={`group relative overflow-hidden rounded-2xl border bg-white p-2 text-left transition ${
                              isActive
                                ? "border-[#315ff4] shadow-lg"
                                : "border-blue-100 shadow-sm hover:border-blue-300 hover:shadow-md"
                            }`}
                          >
                            <div className="relative overflow-hidden rounded-xl">
                              <Image
                                src={item.previewimage ?? item.image}
                                alt={getTemplateDisplayTitle(item)}
                                width={380}
                                height={260}
                                className="h-24 w-full object-cover transition duration-300 group-hover:scale-105 sm:h-28"
                              />

                              {isActive && (
                                <span className="absolute left-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#315ff4] text-white">
                                  <Check size={11} strokeWidth={3} />
                                </span>
                              )}

                              <span className="absolute right-2 top-2 rounded-md bg-blue-50 px-2 py-1 text-[8px] font-bold uppercase tracking-wider text-blue-600">
                                {item.type === "Single Page Website"
                                  ? "Single"
                                  : "Multiple"}
                              </span>
                            </div>

                            {/* <div className="mt-3">
                            <h3 className="truncate text-sm font-extrabold text-slate-900">
                              {getTemplateDisplayTitle(item)}
                            </h3>
                          </div> */}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="mt-5 flex-1 px-1 pt-1">
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
                  className={`group relative cursor-pointer overflow-hidden rounded-2xl border bg-white p-2.5 text-left transition-all duration-300 ease-out hover:-translate-y-1 hover:border-blue-300 hover:shadow-[0_18px_38px_rgba(49,95,244,.14)] ${
                    isActive
                      ? "border-[#315ff4] shadow-[0_18px_38px_rgba(49,95,244,.18)]"
                      : "border-blue-100"
                  }`}
                >
                  <div className="relative overflow-hidden rounded-xl">
                    <Image
                      src={item.image}
                      alt={getTemplateDisplayTitle(item)}
                      width={480}
                      height={260}
                      className="h-32 w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    {isActive && (
                      <span className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#315ff4] text-white shadow-lg">
                        <Check size={11} strokeWidth={3} />
                      </span>
                    )}

                    <span className="absolute right-2 top-2 rounded-md bg-blue-50 px-2 py-1 text-[8px] font-bold uppercase tracking-wider text-blue-600">
                      {item.type === "Single Page Website"
                        ? "Single"
                        : "Multiple"}
                    </span>
                    <span className="absolute inset-x-2 bottom-2 flex translate-y-3 items-center justify-center gap-1 rounded-lg bg-[#08132f]/80 py-1.5 text-[9px] font-semibold text-white opacity-0 backdrop-blur transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <Eye size={11} /> Preview design
                    </span>
                  </div>

                  <div className="px-1 pb-1 pt-3">
                    <h3 className="truncate text-sm font-semibold text-[#08132f] sm:text-base">
                      {getTemplateDisplayTitle(item)}
                    </h3>

                    <p className="mt-0.5 truncate text-[10px] font-medium uppercase tracking-[.08em] text-slate-400">
                      Direction {item.numericId} · {selectedCategory}
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

        {/* {filteredTemplates.length > 4 && (
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
        )} */}
      </div>
    </div>
  );
}
