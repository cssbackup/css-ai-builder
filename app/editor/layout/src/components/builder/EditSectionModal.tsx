"use client";

import { useState } from "react";
import { Menu, Plus, Trash, X } from "lucide-react";
import { agrandirBolt, generalSansMedium } from "@/app/fonts";

type MenuItem = {
  label: string;
  href: string;
  children?: MenuItem[];
};

type SectionItem = {
  type: string;
  variant: string;
  data: {
    menu?: MenuItem[];
    [key: string]: unknown;
  };
};

type HeaderBackgroundType = "solid" | "gradient";
type FooterBackgroundType = "solid" | "gradient";

type EditSectionModalProps = {
  sectionType: string;
  sections: SectionItem[];
  onClose: () => void;
  onSave: (sectionType: string) => void;
  onSelectVariant: (type: string, variant: string) => void;
  onUpdateSectionData: (type: string, newData: Record<string, unknown>) => void;
};

const headerLayouts = [
  { id: "header-1", name: "Header 1" },
  { id: "header-2", name: "Header 2" },
];

const bannerLayouts = [
  { id: "banner-1", name: "Banner 1" },
  { id: "banner-2", name: "Banner 2" },
];

const aboutLayouts = [
  { id: "about-1", name: "About 1" },
  { id: "about-2", name: "About 2" },
];

const productLayouts = [
  { id: "product-1", name: "Product 1" },
  { id: "product-2", name: "Product 2" },
  { id: "product-3", name: "Product 3" },
];

const footerLayouts = [{ id: "footer-1", name: "Footer 1" }];

const MAX_MENU_LINKS = 7;

const sidebarItems = [
  "Logo Settings",
  "Header Layout",
  "Navigation Menu",
  "Banner Layout",
  "Header Buttons",
  "About Layout",
  "Product Layout",
  "Footer Layout",
  "Social Icons",
  "Color Settings",
];

export default function EditSectionModal({
  sectionType,
  sections,
  onClose,
  onSave,
  onSelectVariant,
  onUpdateSectionData,
}: EditSectionModalProps) {
  const [activeTab, setActiveTab] = useState(
    sectionType === "banner"
      ? "Banner Layout"
      : sectionType === "about"
        ? "About Layout"
        : sectionType === "product"
          ? "Product Layout"
          : sectionType === "footer"
            ? "Footer Layout"
            : "Header Layout",
  );
  const [colorPanelOpen, setColorPanelOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [lastChangedSection, setLastChangedSection] = useState(sectionType);

  const activeSectionType =
    activeTab === "Banner Layout"
      ? "banner"
      : activeTab === "About Layout"
        ? "about"
        : activeTab === "Product Layout"
          ? "product"
          : activeTab === "Footer Layout"
            ? "footer"
            : "header";
  const currentSection = sections.find(
    (item) => item.type === activeSectionType,
  );
  const activeVariant = currentSection?.variant?.startsWith(
    `${activeSectionType}-`,
  )
    ? currentSection.variant
    : `${activeSectionType}-1`;

  const activeHeaderData = currentSection?.data?.[activeVariant] as
    | {
        logo?: string;
        headerBackgroundType?: HeaderBackgroundType;
        headerBackgroundColor?: string;
        headerGradientColor?: string;
        menu?: MenuItem[];
        buttons?: { label: string; href: string }[];
      }
    | undefined;

  const menuItems = activeHeaderData?.menu ?? [];
  const headerBackgroundType =
    activeHeaderData?.headerBackgroundType ?? "solid";
  const headerSolidColor = activeHeaderData?.headerBackgroundColor ?? "#245c6e";
  const headerGradientColor =
    activeHeaderData?.headerGradientColor ?? "#0668ff";
  const headerPreviewBackground =
    headerBackgroundType === "gradient"
      ? `linear-gradient(90deg, ${headerSolidColor}, ${headerGradientColor})`
      : headerSolidColor;

  const activeFooterData = currentSection?.data?.[activeVariant] as
    | {
        footerBackgroundType?: FooterBackgroundType;
        footerBackgroundColor?: string;
        footerGradientColor?: string;
      }
    | undefined;
  const footerBackgroundType =
    activeFooterData?.footerBackgroundType ?? "solid";
  const footerSolidColor = activeFooterData?.footerBackgroundColor ?? "#0d1f2a";
  const footerGradientColor =
    activeFooterData?.footerGradientColor ?? "#1d4ed8";
  const footerPreviewBackground =
    footerBackgroundType === "gradient"
      ? `linear-gradient(90deg, ${footerSolidColor}, ${footerGradientColor})`
      : footerSolidColor;

  const updateActiveHeaderData = (newData: Record<string, unknown>) => {
    if (!currentSection || !activeHeaderData) return;

    setHasChanges(true);
    setLastChangedSection(activeSectionType);
    onUpdateSectionData(activeSectionType, {
      ...currentSection.data,
      [activeVariant]: {
        ...activeHeaderData,
        ...newData,
      },
    });
  };

  const updateActiveFooterData = (newData: Record<string, unknown>) => {
    if (!currentSection || !activeFooterData) return;

    setHasChanges(true);
    setLastChangedSection(activeSectionType);
    onUpdateSectionData(activeSectionType, {
      ...currentSection.data,
      [activeVariant]: {
        ...activeFooterData,
        ...newData,
      },
    });
  };

  const handleSidebarTabChange = (tab: string) => {
    setActiveTab(tab);
    setMobileSidebarOpen(false);
  };

  const selectSectionVariant = (variant: string) => {
    if (!variant.startsWith(`${activeSectionType}-`)) return;

    if (currentSection?.variant !== variant) {
      setHasChanges(true);
      setLastChangedSection(activeSectionType);
    }

    onSelectVariant(activeSectionType, variant);
    onSave(activeSectionType);
  };

  const handleDone = () => {
    if (hasChanges) {
      onSave(lastChangedSection);
      return;
    }

    onClose();
  };

  const updateMenuItem = (
    index: number,
    field: keyof MenuItem,
    value: string,
  ) => {
    const updatedMenu = menuItems.map((item, itemIndex) =>
      itemIndex === index ? { ...item, [field]: value } : item,
    );

    updateActiveHeaderData({ menu: updatedMenu });
  };

  const addMenuItem = () => {
    if (menuItems.length >= MAX_MENU_LINKS) return;

    const updatedMenu = [
      ...menuItems,
      {
        label: "New Item",
        href: "/new-item",
      },
    ];

    updateActiveHeaderData({ menu: updatedMenu });
  };

  const updateHeaderBackgroundType = (type: HeaderBackgroundType) => {
    setColorPanelOpen(type === "gradient");
    updateActiveHeaderData({ headerBackgroundType: type });
  };

  const updateHeaderSolidColor = (color: string) => {
    updateActiveHeaderData({ headerBackgroundColor: color });
  };

  const updateHeaderGradientColor = (color: string) => {
    updateActiveHeaderData({ headerGradientColor: color });
  };

  const updateFooterBackgroundType = (type: FooterBackgroundType) => {
    setColorPanelOpen(type === "gradient");
    updateActiveFooterData({ footerBackgroundType: type });
  };

  const updateFooterSolidColor = (color: string) => {
    updateActiveFooterData({ footerBackgroundColor: color });
  };

  const updateFooterGradientColor = (color: string) => {
    updateActiveFooterData({ footerGradientColor: color });
  };

  const addDropdownItem = (menuIndex: number) => {
    const currentDropdowns = menuItems[menuIndex]?.children ?? [];

    if (currentDropdowns.length >= MAX_DROPDOWN_LINKS) return;

    const updatedMenu = menuItems.map((item, itemIndex) =>
      itemIndex === menuIndex
        ? {
            ...item,
            children: [
              ...(item.children ?? []),
              { label: "Dropdown Item", href: "/dropdown-item" },
            ],
          }
        : item,
    );

    updateActiveHeaderData({ menu: updatedMenu });
  };

  const updateDropdownItem = (
    menuIndex: number,
    childIndex: number,
    field: keyof MenuItem,
    value: string,
  ) => {
    const updatedMenu = menuItems.map((item, itemIndex) => {
      if (itemIndex !== menuIndex) return item;

      const updatedChildren = (item.children ?? []).map(
        (child, currentChildIndex) =>
          currentChildIndex === childIndex
            ? { ...child, [field]: value }
            : child,
      );

      return { ...item, children: updatedChildren };
    });

    updateActiveHeaderData({ menu: updatedMenu });
  };

  const deleteDropdownItem = (menuIndex: number, childIndex: number) => {
    const updatedMenu = menuItems.map((item, itemIndex) => {
      if (itemIndex !== menuIndex) return item;

      const updatedChildren = (item.children ?? []).filter(
        (_, currentChildIndex) => currentChildIndex !== childIndex,
      );

      return {
        ...item,
        children: updatedChildren.length ? updatedChildren : undefined,
      };
    });

    updateActiveHeaderData({ menu: updatedMenu });
  };

  const deleteMenuItem = (index: number) => {
    const updatedMenu = menuItems.filter((_, itemIndex) => itemIndex !== index);

    updateActiveHeaderData({ menu: updatedMenu });
  };

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const moveMenuItem = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return;

    const updatedMenu = [...menuItems];
    const [movedItem] = updatedMenu.splice(fromIndex, 1);
    updatedMenu.splice(toIndex, 0, movedItem);

    updateActiveHeaderData({ menu: updatedMenu });
  };

  const MAX_DROPDOWN_LINKS = 10;

  return (
    <div className="fixed inset-0 z-[9999] flex items-end justify-center  p-3">
      <div className="relative mx-3 flex h-[70vh] w-full max-w-[880px] flex-col overflow-hidden rounded-3xl bg-[#f4f4f5] shadow-2xl">
        <div className="relative flex items-center justify-between border-b border-gray-400 px-5 py-3">
          <h3 className={`${agrandirBolt.className} font-medium text-2xl`}>
            Overview
          </h3>

          <button
            type="button"
            onClick={() => setMobileSidebarOpen((open) => !open)}
            className="rounded-md p-2 text-gray-950 lg:hidden"
            aria-label={
              mobileSidebarOpen ? "Close settings menu" : "Open settings menu"
            }
            aria-expanded={mobileSidebarOpen}
          >
            {mobileSidebarOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        <div className="relative flex min-h-0 flex-1">
          {mobileSidebarOpen && (
            <aside className="absolute inset-y-0 left-0 z-30 flex w-56 flex-col rounded-r-2xl border-r border-gray-400 bg-white p-3 shadow-xl lg:hidden">
              <div className="mb-2 flex items-center justify-between underline">
                <h3
                  className={`${generalSansMedium.className} text-sm font-semibold`}
                >
                  Settings
                </h3>
              </div>

              <SidebarContent
                items={sidebarItems}
                activeTab={activeTab}
                setActiveTab={handleSidebarTabChange}
              />
            </aside>
          )}

          <aside className="hidden h-full min-h-0 w-56 shrink-0 flex-col border-r border-gray-400 bg-white p-3 lg:flex">
            <div className="mb-2 flex items-center justify-between underline">
              <h3
                className={`${generalSansMedium.className} text-sm font-semibold`}
              >
                Settings
              </h3>
            </div>

            <SidebarContent
              items={sidebarItems}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </aside>

          <main className="min-w-0 flex-1 overflow-y-auto px-4 py-3 sm:px-5">
            <div className="mb-3 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-2 sm:flex-row">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  {activeTab}
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  Customize {activeTab.toLowerCase()} settings
                </p>
              </div>

              {activeSectionType === "header" &&
                activeTab === "Header Layout" && (
                  <div className="relative flex w-full flex-wrap items-center gap-3 sm:w-auto sm:shrink-0 sm:gap-5">
                    {headerBackgroundType === "solid" ? (
                      <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-gray-950">
                        Change color
                        <span
                          className="h-5 w-5 rounded-full border-2 border-gray-400"
                          style={{ background: headerSolidColor }}
                        />
                        <input
                          type="color"
                          value={headerSolidColor}
                          onChange={(event) =>
                            updateHeaderSolidColor(event.target.value)
                          }
                          className="h-8 w-8 cursor-pointer rounded border-0 bg-transparent p-0"
                          aria-label="Header solid color"
                        />
                      </label>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setColorPanelOpen((open) => !open)}
                        className="flex items-center gap-2 text-sm font-semibold text-gray-950"
                      >
                        Change color
                        <span
                          className="h-5 w-10 rounded-full border-2 border-gray-400"
                          style={{ background: headerPreviewBackground }}
                        />
                      </button>
                    )}

                    {(["solid", "gradient"] as const).map((type) => {
                      const isActive = headerBackgroundType === type;

                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => updateHeaderBackgroundType(type)}
                          className={`min-w-24 rounded-lg border px-5 py-1.5 text-sm font-semibold capitalize text-gray-950 transition ${
                            isActive
                              ? "border-gray-300 bg-white shadow-sm"
                              : "border-gray-500 bg-transparent hover:bg-white"
                          }`}
                        >
                          {type}
                        </button>
                      );
                    })}

                    {headerBackgroundType === "gradient" && colorPanelOpen && (
                      <div className="absolute right-0 top-11 z-20 grid w-72 grid-cols-2 gap-6 rounded-xl border border-gray-300 bg-white p-4 pt-7 shadow-xl">
                        <button
                          type="button"
                          onClick={() => setColorPanelOpen(false)}
                          className="absolute right-3 top-2 rounded-full p-1 text-gray-950 hover:bg-gray-100"
                          aria-label="Close gradient color picker"
                        >
                          <X size={18} />
                        </button>

                        <label className="space-y-4 text-sm font-semibold text-gray-950">
                          <span className="underline">Left Side</span>
                          <span className="flex items-center justify-between gap-3">
                            Color
                            <input
                              type="color"
                              value={headerSolidColor}
                              onChange={(event) =>
                                updateHeaderSolidColor(event.target.value)
                              }
                              className="h-9 w-9 cursor-pointer rounded border-0 bg-transparent p-0"
                              aria-label="Header gradient left color"
                            />
                          </span>
                        </label>

                        <label className="space-y-4 text-sm font-semibold text-gray-950">
                          <span className="underline">Right Side</span>
                          <span className="flex items-center justify-between gap-3">
                            Color
                            <input
                              type="color"
                              value={headerGradientColor}
                              onChange={(event) =>
                                updateHeaderGradientColor(event.target.value)
                              }
                              className="h-9 w-9 cursor-pointer rounded border-0 bg-transparent p-0"
                              aria-label="Header gradient right color"
                            />
                          </span>
                        </label>
                      </div>
                    )}
                  </div>
                )}

              {activeSectionType === "footer" &&
                activeTab === "Footer Layout" && (
                  <div className="relative flex w-full flex-wrap items-center gap-3 sm:w-auto sm:shrink-0 sm:gap-5">
                    {footerBackgroundType === "solid" ? (
                      <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-gray-950">
                        Change color
                        <span
                          className="h-5 w-5 rounded-full border-2 border-gray-400"
                          style={{ background: footerSolidColor }}
                        />
                        <input
                          type="color"
                          value={footerSolidColor}
                          onChange={(event) =>
                            updateFooterSolidColor(event.target.value)
                          }
                          className="h-8 w-8 cursor-pointer rounded border-0 bg-transparent p-0"
                          aria-label="Footer solid color"
                        />
                      </label>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setColorPanelOpen((open) => !open)}
                        className="flex items-center gap-2 text-sm font-semibold text-gray-950"
                      >
                        Change color
                        <span
                          className="h-5 w-10 rounded-full border-2 border-gray-400"
                          style={{ background: footerPreviewBackground }}
                        />
                      </button>
                    )}

                    {(["solid", "gradient"] as const).map((type) => {
                      const isActive = footerBackgroundType === type;

                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => updateFooterBackgroundType(type)}
                          className={`min-w-24 rounded-lg border px-5 py-1.5 text-sm font-semibold capitalize text-gray-950 transition ${
                            isActive
                              ? "border-gray-300 bg-white shadow-sm"
                              : "border-gray-500 bg-transparent hover:bg-white"
                          }`}
                        >
                          {type}
                        </button>
                      );
                    })}

                    {footerBackgroundType === "gradient" && colorPanelOpen && (
                      <div className="absolute right-0 top-11 z-20 grid w-72 grid-cols-2 gap-6 rounded-xl border border-gray-300 bg-white p-4 pt-7 shadow-xl">
                        <button
                          type="button"
                          onClick={() => setColorPanelOpen(false)}
                          className="absolute right-3 top-2 rounded-full p-1 text-gray-950 hover:bg-gray-100"
                          aria-label="Close footer gradient color picker"
                        >
                          <X size={18} />
                        </button>

                        <label className="space-y-4 text-sm font-semibold text-gray-950">
                          <span className="underline">Left Side</span>
                          <span className="flex items-center justify-between gap-3">
                            Color
                            <input
                              type="color"
                              value={footerSolidColor}
                              onChange={(event) =>
                                updateFooterSolidColor(event.target.value)
                              }
                              className="h-9 w-9 cursor-pointer rounded border-0 bg-transparent p-0"
                              aria-label="Footer gradient left color"
                            />
                          </span>
                        </label>

                        <label className="space-y-4 text-sm font-semibold text-gray-950">
                          <span className="underline">Right Side</span>
                          <span className="flex items-center justify-between gap-3">
                            Color
                            <input
                              type="color"
                              value={footerGradientColor}
                              onChange={(event) =>
                                updateFooterGradientColor(event.target.value)
                              }
                              className="h-9 w-9 cursor-pointer rounded border-0 bg-transparent p-0"
                              aria-label="Footer gradient right color"
                            />
                          </span>
                        </label>
                      </div>
                    )}
                  </div>
                )}
            </div>
            {activeSectionType === "header" &&
              activeTab === "Header Layout" && (
                <div className="space-y-4">
                  {headerLayouts.map((layout) => {
                    const isActive = currentSection?.variant === layout.id;

                    return (
                      <button
                        key={layout.id}
                        type="button"
                        onClick={() => selectSectionVariant(layout.id)}
                        className={`w-full overflow-hidden rounded-2xl border bg-white text-left ${
                          isActive ? "border-gray-400" : "border-gray-200"
                        }`}
                      >
                        <div className="h-20 bg-gray-100">
                          {layout.id === "header-1" && (
                            <div className="h-full">
                              <div
                                className="flex h-10 items-center justify-between px-4"
                                style={{ background: headerPreviewBackground }}
                              >
                                <div className="h-2 w-14 rounded bg-white" />
                                <div className="flex gap-3">
                                  <div className="h-1.5 w-9 rounded bg-white" />
                                  <div className="h-1.5 w-9 rounded bg-white" />
                                  <div className="h-1.5 w-9 rounded bg-white" />
                                </div>
                                <div className="h-5 w-12 rounded-md bg-blue-600" />
                              </div>
                            </div>
                          )}

                          {layout.id === "header-2" && (
                            <div
                              className="flex h-full items-start justify-between px-4 py-4"
                              style={{ background: headerPreviewBackground }}
                            >
                              <div className="h-2 w-16 rounded bg-white" />
                              <div className="flex gap-3">
                                <div className="h-1.5 w-9 rounded bg-white" />
                                <div className="h-1.5 w-9 rounded bg-white" />
                                <div className="h-1.5 w-9 rounded bg-white" />
                              </div>
                              <div className="h-5 w-12 rounded-md bg-blue-600" />
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

            {activeSectionType === "banner" &&
              activeTab === "Banner Layout" && (
                <div className="space-y-4">
                  {bannerLayouts.map((layout) => {
                    const isActive = currentSection?.variant === layout.id;

                    return (
                      <button
                        key={layout.id}
                        type="button"
                        onClick={() => selectSectionVariant(layout.id)}
                        className={`w-full overflow-hidden rounded-2xl border bg-white text-left ${
                          isActive ? "border-gray-400" : "border-gray-200"
                        }`}
                      >
                        <div className="h-28 bg-gray-100">
                          {layout.id === "banner-1" && (
                            <div className="relative flex h-full items-center overflow-hidden bg-slate-900 px-5">
                              <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-800 to-sky-700" />
                              <div className="relative z-10 w-2/3 space-y-2">
                                <div className="h-1.5 w-24 rounded bg-white/70" />
                                <div className="h-3 w-40 rounded bg-white" />
                                <div className="h-1.5 w-full rounded bg-white/60" />
                                <div className="h-1.5 w-4/5 rounded bg-white/60" />
                                <div className="h-5 w-16 rounded-md bg-blue-600" />
                              </div>
                            </div>
                          )}

                          {layout.id === "banner-2" && (
                            <div className="flex h-full items-center justify-center bg-indigo-50 px-5 text-center">
                              <div className="w-2/3 space-y-3">
                                <div className="mx-auto h-4 w-40 rounded bg-slate-900" />
                                <div className="mx-auto h-2 w-full rounded bg-slate-400" />
                                <div className="mx-auto h-2 w-4/5 rounded bg-slate-400" />
                                <div className="mx-auto h-6 w-20 rounded-md bg-blue-600" />
                              </div>
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

            {activeSectionType === "about" && activeTab === "About Layout" && (
              <div className="space-y-4">
                {aboutLayouts.map((layout) => {
                  const isActive = currentSection?.variant === layout.id;

                  return (
                    <button
                      key={layout.id}
                      type="button"
                      onClick={() => selectSectionVariant(layout.id)}
                      className={`w-full overflow-hidden rounded-2xl border bg-white text-left ${
                        isActive ? "border-gray-400" : "border-gray-200"
                      }`}
                    >
                      <div className="h-32 bg-gray-100">
                        {layout.id === "about-1" && (
                          <div className="grid h-full grid-cols-2 overflow-hidden bg-[#fbfaf6]">
                            <div className="flex flex-col justify-center gap-2 px-5">
                              <div className="h-4 w-24 rounded bg-slate-900" />
                              <div className="h-2 w-full rounded bg-slate-400" />
                              <div className="h-2 w-4/5 rounded bg-slate-400" />
                              <div className="h-5 w-20 rounded-full bg-blue-600" />
                            </div>
                            <div className="bg-slate-300" />
                          </div>
                        )}

                        {layout.id === "about-2" && (
                          <div className="grid h-full grid-cols-[1fr_1.4fr_1fr] gap-3 bg-white p-4">
                            <div className="space-y-2">
                              <div className="h-5 w-16 rounded bg-slate-900" />
                              <div className="h-5 w-12 rounded bg-slate-900" />
                              <div className="mt-4 h-2 w-20 rounded bg-slate-500" />
                              <div className="h-2 w-24 rounded bg-slate-400" />
                            </div>
                            <div className="rounded-2xl bg-slate-300" />
                            <div className="space-y-3">
                              <div className="h-12 rounded-2xl bg-slate-300" />
                              <div className="h-3 w-20 rounded bg-slate-900" />
                              <div className="h-2 w-full rounded bg-slate-400" />
                              <div className="h-2 w-4/5 rounded bg-slate-400" />
                            </div>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {activeSectionType === "product" &&
              activeTab === "Product Layout" && (
                <div className="space-y-4">
                  {productLayouts.map((layout) => {
                    const isActive = currentSection?.variant === layout.id;

                    return (
                      <button
                        key={layout.id}
                        type="button"
                        onClick={() => selectSectionVariant(layout.id)}
                        className={`w-full overflow-hidden rounded-2xl border bg-white text-left ${
                          isActive ? "border-gray-400" : "border-gray-200"
                        }`}
                      >
                        <div className="h-32 bg-gray-100">
                          {layout.id === "product-1" && (
                            <div className="grid h-full grid-cols-[1fr_1.4fr_1fr] items-center gap-3 bg-blue-50 px-5">
                              <div className="space-y-2">
                                <div className="h-4 w-20 rounded bg-slate-900" />
                                <div className="h-2 w-16 rounded bg-slate-500" />
                                <div className="mt-4 h-16 rounded bg-white shadow-sm" />
                              </div>
                              <div className="mx-auto h-24 w-24 rounded-full bg-slate-300" />
                              <div className="space-y-2">
                                <div className="h-4 w-24 rounded bg-slate-900" />
                                <div className="h-2 w-full rounded bg-slate-400" />
                                <div className="h-2 w-4/5 rounded bg-slate-400" />
                              </div>
                            </div>
                          )}

                          {layout.id === "product-2" && (
                            <div className="h-full bg-sky-100 p-4">
                              <div className="mx-auto mb-3 h-4 w-32 rounded bg-slate-900" />
                              <div className="grid h-20 grid-cols-3 gap-3">
                                <div className="rounded-lg border border-slate-400 bg-sky-50" />
                                <div className="rounded-lg border border-slate-400 bg-sky-50" />
                                <div className="rounded-lg border border-slate-400 bg-sky-50" />
                              </div>
                            </div>
                          )}

                          {layout.id === "product-3" && (
                            <div className="grid h-full grid-cols-[1fr_1.1fr] gap-4 bg-[#0d1f2a] p-4">
                              <div className="space-y-2">
                                <div className="h-2 w-16 rounded bg-blue-200" />
                                <div className="h-5 w-full rounded bg-white" />
                                <div className="h-5 w-4/5 rounded bg-white" />
                                <div className="mt-3 h-3 w-24 rounded bg-blue-600" />
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div className="rounded-lg bg-white/25" />
                                <div className="rounded-lg bg-white/25" />
                                <div className="rounded-lg bg-white/25" />
                                <div className="rounded-lg bg-white/25" />
                              </div>
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

            {activeSectionType === "footer" &&
              activeTab === "Footer Layout" && (
                <div className="space-y-4">
                  {footerLayouts.map((layout) => {
                    const isActive = currentSection?.variant === layout.id;

                    return (
                      <button
                        key={layout.id}
                        type="button"
                        onClick={() => selectSectionVariant(layout.id)}
                        className={`w-full overflow-hidden rounded-2xl border bg-white text-left ${
                          isActive ? "border-gray-400" : "border-gray-200"
                        }`}
                      >
                        <div
                          className="grid h-32 grid-cols-[1.2fr_1fr_1fr_1fr] gap-4 p-4"
                          style={{ background: footerPreviewBackground }}
                        >
                          <div className="space-y-2">
                            <div className="h-4 w-20 rounded bg-white" />
                            <div className="h-2 w-full rounded bg-white/60" />
                            <div className="h-2 w-4/5 rounded bg-white/60" />
                            <div className="mt-4 flex gap-2">
                              <div className="h-5 w-5 rounded-full bg-white/25" />
                              <div className="h-5 w-5 rounded-full bg-white/25" />
                              <div className="h-5 w-5 rounded-full bg-white/25" />
                            </div>
                          </div>
                          {[1, 2, 3].map((item) => (
                            <div key={item} className="space-y-2">
                              <div className="h-3 w-16 rounded bg-white" />
                              <div className="h-2 w-20 rounded bg-white/50" />
                              <div className="h-2 w-24 rounded bg-white/50" />
                              <div className="h-2 w-16 rounded bg-white/50" />
                            </div>
                          ))}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

            {activeSectionType === "header" &&
              activeTab === "Navigation Menu" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="mt-1 text-xs text-gray-700 underline">
                        You can add up to {MAX_MENU_LINKS} menu links.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={addMenuItem}
                      disabled={menuItems.length >= MAX_MENU_LINKS}
                      className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-xs font-medium text-white disabled:bg-gray-300"
                    >
                      <Plus size={14} />
                      Add Nav Links
                    </button>
                  </div>

                  <div className="space-y-3">
                    {menuItems.map((item, index) => (
                      <div
                        key={index}
                        draggable
                        onDragStart={() => setDraggedIndex(index)}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => {
                          if (draggedIndex !== null) {
                            moveMenuItem(draggedIndex, index);
                            setDraggedIndex(null);
                          }
                        }}
                        onDragEnd={() => setDraggedIndex(null)}
                        className={`cursor-grab rounded-xl border border-gray-300 bg-white p-2 shadow-sm ${
                          draggedIndex === index ? "opacity-50" : ""
                        }`}
                      >
                        <div className="grid grid-cols-1 gap-2 lg:grid-cols-[2.5rem_minmax(8rem,1fr)_minmax(8rem,1fr)_7rem_3.25rem] lg:items-center">
                          <button
                            type="button"
                            className="h-9 w-9 cursor-grab rounded-lg border border-gray-400 bg-white bg-[radial-gradient(circle_at_35%_35%,#6b7280_2px,transparent_2.5px),radial-gradient(circle_at_65%_35%,#6b7280_2px,transparent_2.5px),radial-gradient(circle_at_35%_65%,#6b7280_2px,transparent_2.5px),radial-gradient(circle_at_65%_65%,#6b7280_2px,transparent_2.5px)] px-2 py-2 text-transparent active:cursor-grabbing"
                            title="Drag menu item"
                          >
                            ⋮⋮
                          </button>

                          <input
                            value={item.label}
                            onChange={(e) =>
                              updateMenuItem(index, "label", e.target.value)
                            }
                            className="h-11 rounded-lg border border-gray-400 px-4 text-sm text-blue-700 outline-none focus:border-blue-600"
                            placeholder="Menu label"
                          />

                          <input
                            value={item.href}
                            onChange={(e) =>
                              updateMenuItem(index, "href", e.target.value)
                            }
                            className="h-11 rounded-lg border border-gray-400 px-4 text-sm text-blue-700 outline-none focus:border-blue-600"
                            placeholder="/link"
                          />

                          <button
                            type="button"
                            onClick={() => addDropdownItem(index)}
                            disabled={
                              (item.children?.length ?? 0) >= MAX_DROPDOWN_LINKS
                            }
                            className="h-11 rounded-lg border border-blue-500 bg-white px-3 text-xs font-medium text-blue-600 disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-100 disabled:text-gray-400"
                          >
                            Add Dropdown
                          </button>

                          <button
                            type="button"
                            onClick={() => deleteMenuItem(index)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-500 bg-white text-red-600"
                            aria-label="Delete menu item"
                          >
                            <Trash size={18} />
                          </button>
                        </div>

                        {!!item.children?.length && (
                          <div className="mt-2 space-y-2 lg:pl-[3.75rem]">
                            {item.children.map((child, childIndex) => (
                              <div
                                key={childIndex}
                                className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(10rem,1fr)_minmax(10rem,1fr)_3.5rem]"
                              >
                                <input
                                  value={child.label}
                                  onChange={(e) =>
                                    updateDropdownItem(
                                      index,
                                      childIndex,
                                      "label",
                                      e.target.value,
                                    )
                                  }
                                  className="h-11 rounded-lg border border-gray-300 px-4 text-sm outline-none focus:border-blue-600"
                                  placeholder="Dropdown label"
                                />

                                <input
                                  value={child.href}
                                  onChange={(e) =>
                                    updateDropdownItem(
                                      index,
                                      childIndex,
                                      "href",
                                      e.target.value,
                                    )
                                  }
                                  className="h-11 rounded-lg border border-gray-300 px-4 text-sm outline-none focus:border-blue-600"
                                  placeholder="/dropdown-link"
                                />

                                <button
                                  type="button"
                                  onClick={() =>
                                    deleteDropdownItem(index, childIndex)
                                  }
                                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-500 bg-white text-red-600"
                                  aria-label="Delete dropdown item"
                                >
                                  <Trash size={18} />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                        <p className="mt-2 text-xs text-gray-500">
                          {item.children?.length ?? 0}/{MAX_DROPDOWN_LINKS}{" "}
                          dropdown links added
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </main>
        </div>

        <div className="shrink-0 flex justify-end gap-3 border-t border-gray-400 bg-[#f4f4f5] p-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-gray-400 px-5 py-2 text-sm font-semibold text-gray-600"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDone}
            className="rounded-full border bg-white px-5 py-2 text-sm font-semibold text-green-700 shadow-sm"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

function SidebarContent({
  items,
  activeTab,
  setActiveTab,
}: {
  items: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  return (
    <div className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-1 text-sm">
      {items.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => setActiveTab(item)}
          className={`w-full rounded-md px-3 py-2 text-left cursor-pointer ${
            activeTab === item
              ? "bg-blue-50 font-medium text-blue-700"
              : "hover:bg-gray-100"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
