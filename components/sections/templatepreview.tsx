"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Search,
  X,
} from "lucide-react";
import {
  getTemplatesForCategory,
  hasCategoryContent,
  type BuilderTemplate,
} from "@/app/editor/layout/src/data/templateFlow";

const pageFilters = [
  "All Pages",
  "Single Page Website",
  "Multiple Pages Website",
];

type TemplatePreviewProps = {
  selectedCategory: string;
  selectedTemplate: string;
  showPreview: boolean;
  onTemplateChange: (templateId: string) => void;
  onClosePreview: () => void;
};

export default function Templatepreview({
  selectedCategory,
  selectedTemplate,
  showPreview,
  onTemplateChange,
  onClosePreview,
}: TemplatePreviewProps) {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState("All Pages");
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [previewScale, setPreviewScale] = useState(0.45);
  const [previewViewportHeight, setPreviewViewportHeight] = useState(900);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const previewScreenRef = useRef<HTMLDivElement>(null);
  const previewTemplate = useMemo(
    () =>
      showPreview
        ? (getTemplatesForCategory(selectedCategory).find(
            (item) => item.id === selectedTemplate,
          ) ?? null)
        : null,
    [selectedCategory, selectedTemplate, showPreview],
  );

  useEffect(() => {
    document.body.style.overflow = previewTemplate ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [previewTemplate]);

  useEffect(() => {
    if (!previewTemplate || !previewScreenRef.current) return;

    const screen = previewScreenRef.current;
    const updateScale = () => {
      const scale = screen.clientWidth / 1440;
      setPreviewScale(scale);
      setPreviewViewportHeight(screen.clientHeight / scale);
    };
    const observer = new ResizeObserver(updateScale);

    observer.observe(screen);

    return () => observer.disconnect();
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
    onTemplateChange(template.id);
    const params = new URLSearchParams({
      templateId: template.id,
      category: selectedCategory,
    });

    router.push(`/editor?${params.toString()}`);
  };

  const getTemplateDisplayTitle = (template: BuilderTemplate) =>
    selectedCategory ? `${selectedCategory} ${template.title}` : template.title;

  const selectPreviewTemplate = (template: BuilderTemplate) => {
    onTemplateChange(template.id);
  };

  const closePreview = () => {
    onClosePreview();
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
      <div className="onboarding-responsive-scroll relative mx-auto flex max-h-[calc(100dvh-90px)] w-full max-w-7xl flex-col overflow-y-auto border border-white/80 bg-white/95 px-5 py-5 shadow-[0_30px_80px_rgba(25,60,150,.18)] backdrop-blur-xl sm:max-h-[calc(100dvh-106px)] sm:px-7 lg:max-h-none lg:overflow-visible lg:px-9 lg:py-7 2xl:max-w-[1500px] 2xl:px-11 2xl:py-9">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#315ff4] via-[#7ea4ff] to-cyan-300" />
        <div className="flex shrink-0 items-start gap-3 border-b border-blue-100 pb-5">
          <div>
            <h2 className="mt-1 text-xl font-semibold tracking-[-.04em] text-[#08132f] sm:text-2xl 2xl:text-3xl">
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

        {previewTemplate &&
          typeof document !== "undefined" &&
          createPortal(
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#f7fbff] p-1 sm:p-2">
              <section className="relative flex h-[calc(100dvh-8px)] w-[calc(100vw-8px)] max-w-[1400px] flex-col overflow-hidden rounded-[22px] border border-blue-100 bg-white shadow-[0_24px_70px_rgba(40,91,145,.14)] sm:h-[calc(100dvh-16px)] sm:w-[calc(100vw-16px)] sm:rounded-[28px] lg:h-[92dvh] lg:max-h-[860px] lg:w-[94vw]">
                <div className="onboarding-responsive-scroll relative z-10 grid min-h-0 flex-1 content-start gap-4 overflow-y-auto px-3 py-3 sm:px-5 lg:grid-cols-[minmax(0,1fr)_310px] lg:content-stretch lg:overflow-hidden xl:grid-cols-[minmax(0,1fr)_340px]">
                  <div className="relative order-1 flex h-[clamp(260px,62vw,520px)] min-h-0 items-center justify-center overflow-hidden rounded-[22px] border border-blue-100 bg-transparent p-3 lg:h-auto lg:min-h-0">
                    <button
                      type="button"
                      onClick={closePreview}
                      className="absolute right-3 top-3 z-30 grid size-8 place-items-center rounded-full border border-blue-100 bg-white text-slate-500 shadow-md transition hover:border-blue-300 hover:text-[#315ff4] lg:hidden"
                      aria-label="Close template preview"
                    >
                      <X size={17} />
                    </button>

                    <div className="relative inline-block max-h-full max-w-full">
                      <Image
                        src="/macbook-frame.png"
                        alt={`${getTemplateDisplayTitle(previewTemplate)} shown on a laptop`}
                        width={1071}
                        height={694}
                        priority
                        className="pointer-events-none relative z-20 block h-auto max-h-full w-auto max-w-full lg:max-h-[55dvh]"
                      />

                      <div
                        ref={previewScreenRef}
                        className="absolute left-[7.65%] top-[3%] z-10 h-[87.7%] w-[84.7%] overflow-hidden bg-white"
                      >
                        <iframe
                          key={`${previewTemplate.id}-${selectedCategory}`}
                          src={`/template-preview?templateId=${encodeURIComponent(previewTemplate.id)}&category=${encodeURIComponent(selectedCategory)}`}
                          title={`${getTemplateDisplayTitle(previewTemplate)} scrollable website preview`}
                          className="absolute left-0 top-0 border-0 bg-white"
                          style={{
                            width: "1440px",
                            height: `${previewViewportHeight}px`,
                            transform: `scale(${previewScale})`,
                            transformOrigin: "top left",
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <aside className="relative order-2 h-fit flex flex-col rounded-[22px] border border-blue-100/80 bg-white p-4 shadow-[0_20px_50px_rgba(41,91,151,.12)] ">
                    <button
                      type="button"
                      onClick={closePreview}
                      className="absolute right-3 top-3 z-10 hidden size-8 place-items-center rounded-full border border-blue-100 bg-white text-slate-500 shadow-sm transition hover:border-blue-300 hover:text-[#315ff4] lg:grid"
                      aria-label="Close template preview"
                    >
                      <X size={17} />
                    </button>

                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-[9px] font-bold uppercase tracking-[.18em] text-emerald-600">
                          Ready to customize
                        </p>
                        <h3 className="mt-1 text-xl font-semibold leading-tight tracking-[-.04em] text-[#08132f]">
                          {getTemplateDisplayTitle(previewTemplate)}
                        </h3>
                      </div>
                      <span className="absolute right-3 top-3 rounded-full bg-blue-50 px-2.5 py-1 text-[9px] font-bold uppercase text-[#315ff4] lg:right-12">
                        {previewTemplate.type === "Single Page Website"
                          ? "Single"
                          : "Multiple"}
                      </span>
                    </div>

                    <div className="mt-4 min-h-0 flex-1 border-t border-blue-100 pt-3">
                      <h4 className="text-xs font-semibold text-[#08132f]">
                        What&apos;s included
                      </h4>
                      <ul className="mt-2 space-y-2">
                        {previewFeatures.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-start gap-2 text-[11px] leading-4 text-slate-600"
                          >
                            <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#315ff4,#20c997)] text-white">
                              <Check size={9} strokeWidth={3} />
                            </span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      type="button"
                      onClick={() => openEditor(previewTemplate)}
                      className="mt-4 w-full rounded-xl bg-[linear-gradient(120deg,#315ff4,#3478f6_52%,#20c997)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(49,95,244,.24)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(49,95,244,.3)]"
                    >
                      Edit Template
                    </button>
                  </aside>
                </div>

                {filteredTemplates.length > 0 && (
                  <div className="relative z-10 shrink-0 border-t border-blue-100/80 bg-white/68 px-3 pb-3 pt-2.5 backdrop-blur-xl sm:px-5">
                    <div className="mb-2 flex items-center gap-3">
                      <span className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[.18em] text-[#315ff4]">
                        Choose more templates
                      </span>
                      <span className="h-px flex-1 bg-gradient-to-r from-blue-300 via-emerald-200 to-transparent" />
                    </div>

                    <div className="relative px-8 sm:px-10">
                      {filteredTemplates.length > 1 && (
                        <>
                          <button
                            type="button"
                            onClick={() => handlePreviewSlide("previous")}
                            className="absolute left-0 top-1/2 z-20 grid size-7 -translate-y-1/2 place-items-center rounded-full border border-blue-100 bg-white text-slate-600 shadow-md transition hover:border-blue-300 hover:text-[#315ff4]"
                            aria-label="Previous template"
                          >
                            <ChevronLeft size={16} strokeWidth={2.5} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handlePreviewSlide("next")}
                            className="absolute right-0 top-1/2 z-20 grid size-7 -translate-y-1/2 place-items-center rounded-full border border-blue-100 bg-white text-slate-600 shadow-md transition hover:border-blue-300 hover:text-[#315ff4]"
                            aria-label="Next template"
                          >
                            <ChevronRight size={16} strokeWidth={2.5} />
                          </button>
                        </>
                      )}

                      <div className="flex snap-x gap-2.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        {filteredTemplates.map((item) => {
                          const isActive = previewTemplate.id === item.id;

                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => selectPreviewTemplate(item)}
                              className={`group relative w-[180px] shrink-0 snap-start overflow-hidden rounded-xl border bg-white p-1.5 text-left transition sm:w-[220px] ${
                                isActive
                                  ? "border-[#315ff4] shadow-[0_8px_22px_rgba(49,95,244,.18)]"
                                  : "border-blue-100 hover:-translate-y-0.5 hover:border-blue-300"
                              }`}
                            >
                              <Image
                                src={item.previewimage ?? item.image}
                                alt={getTemplateDisplayTitle(item)}
                                width={320}
                                height={120}
                                className="h-[62px] w-full rounded-lg object-cover transition duration-300 group-hover:scale-[1.02] sm:h-[72px]"
                              />
                              {isActive && (
                                <span className="absolute left-2.5 top-2.5 grid size-5 place-items-center rounded-full bg-[#315ff4] text-white shadow-md">
                                  <Check size={11} strokeWidth={3} />
                                </span>
                              )}
                              <span className="absolute right-2.5 top-2.5 rounded-md bg-white/90 px-1.5 py-0.5 text-[7px] font-bold uppercase text-[#315ff4] backdrop-blur">
                                {item.type === "Single Page Website"
                                  ? "Single"
                                  : "Multiple"}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </section>
            </div>,
            document.body,
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
                    onTemplateChange(item.id);
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
