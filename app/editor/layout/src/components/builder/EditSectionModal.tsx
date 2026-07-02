"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { Menu, Plus, Trash, X } from "lucide-react";
import { agrandirBolt, generalSansMedium } from "@/app/fonts";
import { ButtonData, SectionData, SocialLinkData } from "../../types/section";

type MenuItem = {
  label: string;
  href: string;
  children?: MenuItem[];
};

type SectionItem = {
  type: string;
  variant: string;
  data: Record<string, SectionData>;
};

type HeaderBackgroundType = "solid" | "gradient";
type TopbarBackgroundType = "solid" | "gradient";
type FooterBackgroundType = "solid" | "gradient";
type BannerBackgroundMode = "image" | "video" | "solid" | "gradient";
type EditSectionModalProps = {
  sectionType: string;
  sections: SectionItem[];
  onClose: () => void;
  onSave: (sectionType: string) => void;
  onSelectVariant: (type: string, variant: string) => void;
  onUpdateSectionData: (
    type: string,
    newData: Record<string, SectionData>,
  ) => void;
};

const headerLayouts = [
  { id: "Header-1", name: "Header 1" },
  { id: "Header-2", name: "Header 2" },
];

const topbarLayouts = [
  { id: "Topbar-1", name: "Topbar 1" },
  { id: "Topbar-2", name: "Topbar 2" },
];

const bannerLayouts = [
  { id: "Banner-1", name: "Banner 1" },
  { id: "Banner-2", name: "Banner 2" },
];

const aboutLayouts = [
  { id: "About-1", name: "About 1" },
  { id: "About-2", name: "About 2" },
];

const productLayouts = [
  { id: "Product-1", name: "Product 1" },
  { id: "Product-2", name: "Product 2" },
  { id: "Product-3", name: "Product 3" },
];

const footerLayouts = [{ id: "Footer-1", name: "Footer 1" }];

const MAX_MENU_LINKS = 7;
const MAX_TOPBAR_SOCIAL_LINKS = 4;
const MAX_HEADER_BUTTONS = 3;
const MAX_BANNER_BUTTONS = 3;
const MAX_LINK_TEXT_LENGTH = 20;
const socialLinkLabels: SocialLinkData["label"][] = [
  "facebook",
  "instagram",
  "twitter",
  "linkedin",
];

const sidebarItemsBySection: Record<string, string[]> = {
  Topbar: ["Topbar Layout", "Topbar Content"],
  Header: [
    "Logo Settings",
    "Header Layout",
    "Navigation Menu",
    "Header Buttons",
  ],
  Banner: [
    "Banner Content",
    "Banner Layout",
    "Banner Buttons",
    "Banner Background",
  ],
  About: ["About Layout"],
  Product: ["Product Layout"],
  Footer: ["Footer Layout"],
};

const normalizeSectionType = (sectionType: string) => {
  const normalized = sectionType.trim().toLowerCase();

  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
};

const getDefaultTab = (sectionType: string) =>
  sidebarItemsBySection[normalizeSectionType(sectionType)]?.[0] ??
  "Header Layout";

const formatSectionTitle = (sectionType: string) =>
  normalizeSectionType(sectionType);

const limitLinkText = (value: string) => value.slice(0, MAX_LINK_TEXT_LENGTH);

const clampBannerHeight = (height: number) => {
  if (!Number.isFinite(height)) return 70;

  return Math.min(100, Math.max(40, height));
};

const getVisibleSocialLinks = (
  socialLinks: { label: SocialLinkData["label"]; href: string }[] = [],
) => socialLinks.slice(0, MAX_TOPBAR_SOCIAL_LINKS);

export default function EditSectionModal({
  sectionType,
  sections,
  onClose,
  onSave,
  onSelectVariant,
  onUpdateSectionData,
}: EditSectionModalProps) {
  const [activeTab, setActiveTab] = useState(getDefaultTab(sectionType));
  const [colorPanelOpen, setColorPanelOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [lastChangedSection, setLastChangedSection] = useState(sectionType);
  const [bannerGenerationType, setBannerGenerationType] = useState<
    "image" | "video" | null
  >(null);
  const bannerImageInputRef = useRef<HTMLInputElement>(null);
  const bannerVideoInputRef = useRef<HTMLInputElement>(null);
  const activeSectionType = normalizeSectionType(sectionType);
  const visibleSidebarItems = sidebarItemsBySection[activeSectionType] ?? [];
  const currentSection = sections.find(
    (item) => normalizeSectionType(item.type) === activeSectionType,
  );
  const activeSectionKey = currentSection?.type ?? activeSectionType;
  const activeVariant = currentSection?.variant?.startsWith(
    `${activeSectionType}-`,
  )
    ? currentSection.variant
    : `${activeSectionType}-1`;

  const activeTopbarData = currentSection?.data?.[activeVariant] as
    | {
        topbarBackgroundType?: TopbarBackgroundType;
        topbarBackgroundColor?: string;
        topbarGradientColor?: string;
        topbarTextColor?: string;
        text?: string[];
        phone?: string;
        email?: string;
        location?: string;
        socialLinks?: {
          label: "facebook" | "instagram" | "twitter" | "linkedin";
          href: string;
        }[];
      }
    | undefined;

  const activeHeaderData = currentSection?.data?.[activeVariant] as
    | {
        logo?: string;
        headerBackgroundType?: HeaderBackgroundType;
        headerBackgroundColor?: string;
        headerGradientColor?: string;
        headerTextColor?: string;
        menu?: MenuItem[];
        buttons?: { label: string; href: string }[];
      }
    | undefined;

  const activeBannerData = currentSection?.data?.[activeVariant] as
    | {
        backgroundImage?: string;
        backgroundImageTitle?: string;
        pretitle?: string;
        title?: string;
        desc?: string;
        overlayColor?: string;
        titleColor?: string;
        bannerBackgroundMode?: BannerBackgroundMode;
        bannerBackgroundColor?: string;
        bannerGradientColor?: string;
        backgroundVideo?: string;
        bannerHeight?: number;
        buttons?: ButtonData[];
      }
    | undefined;

  const menuItems = activeHeaderData?.menu ?? [];
  const topbarBackgroundType =
    activeTopbarData?.topbarBackgroundType ?? "solid";
  const topbarSolidColor = activeTopbarData?.topbarBackgroundColor ?? "#245c6e";
  const topbarGradientColor =
    activeTopbarData?.topbarGradientColor ?? "#0668ff";
  const topbarTextColor = activeTopbarData?.topbarTextColor ?? "#ffffff";
  const topbarPreviewBackground =
    topbarBackgroundType === "gradient"
      ? `linear-gradient(90deg, ${topbarSolidColor}, ${topbarGradientColor})`
      : topbarSolidColor;
  const headerBackgroundType =
    activeHeaderData?.headerBackgroundType ?? "solid";
  const headerSolidColor = activeHeaderData?.headerBackgroundColor ?? "#245c6e";
  const headerGradientColor =
    activeHeaderData?.headerGradientColor ?? "#0668ff";
  const headerTextColor = activeHeaderData?.headerTextColor ?? "#ffffff";
  const headerPreviewBackground =
    headerBackgroundType === "gradient"
      ? `linear-gradient(90deg, ${headerSolidColor}, ${headerGradientColor})`
      : headerSolidColor;
  const bannerBackgroundMode =
    activeBannerData?.bannerBackgroundMode ?? "image";
  const bannerSolidColor = activeBannerData?.bannerBackgroundColor ?? "#0f172a";
  const bannerGradientColor =
    activeBannerData?.bannerGradientColor ?? "#0ea5e9";
  const bannerHeight = activeBannerData?.bannerHeight ?? 70;
  const bannerPreviewBackground =
    bannerBackgroundMode === "gradient"
      ? `linear-gradient(90deg, ${bannerSolidColor}, ${bannerGradientColor})`
      : bannerBackgroundMode === "solid"
        ? bannerSolidColor
        : "linear-gradient(90deg, #020617, #0f172a, #0369a1)";

  const activeFooterData = currentSection?.data?.[activeVariant] as
    | {
        footerBackgroundType?: FooterBackgroundType;
        footerBackgroundColor?: string;
        footerGradientColor?: string;
        footerTextColor?: string;
      }
    | undefined;
  const footerBackgroundType =
    activeFooterData?.footerBackgroundType ?? "solid";
  const footerSolidColor = activeFooterData?.footerBackgroundColor ?? "#0d1f2a";
  const footerGradientColor =
    activeFooterData?.footerGradientColor ?? "#1d4ed8";
  const footerTextColor = activeFooterData?.footerTextColor ?? "#ffffff";
  const footerPreviewBackground =
    footerBackgroundType === "gradient"
      ? `linear-gradient(90deg, ${footerSolidColor}, ${footerGradientColor})`
      : footerSolidColor;
  const topbarSocialLinks = getVisibleSocialLinks(
    activeTopbarData?.socialLinks,
  );
  const usesSectionColorPanel =
    (activeSectionType === "Topbar" && activeTab === "Topbar Layout") ||
    (activeSectionType === "Header" && activeTab === "Header Layout") ||
    (activeSectionType === "Footer" && activeTab === "Footer Layout");

  const updateActiveTopbarData = (newData: Record<string, unknown>) => {
    if (!currentSection || !activeTopbarData) return;

    setHasChanges(true);
    setLastChangedSection(activeSectionKey);
    onUpdateSectionData(activeSectionKey, {
      ...currentSection.data,
      [activeVariant]: {
        ...activeTopbarData,
        ...newData,
      },
    });
  };

  const updateActiveHeaderData = (newData: Record<string, unknown>) => {
    if (!currentSection || !activeHeaderData) return;

    setHasChanges(true);
    setLastChangedSection(activeSectionKey);
    onUpdateSectionData(activeSectionKey, {
      ...currentSection.data,
      [activeVariant]: {
        ...activeHeaderData,
        ...newData,
      },
    });
  };

  const updateActiveBannerData = (newData: Record<string, unknown>) => {
    if (!currentSection || !activeBannerData) return;

    setHasChanges(true);
    setLastChangedSection(activeSectionKey);
    onUpdateSectionData(activeSectionKey, {
      ...currentSection.data,
      [activeVariant]: {
        ...activeBannerData,
        ...newData,
      },
    });
  };

  const updateActiveFooterData = (newData: Record<string, unknown>) => {
    if (!currentSection || !activeFooterData) return;

    setHasChanges(true);
    setLastChangedSection(activeSectionKey);
    onUpdateSectionData(activeSectionKey, {
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
      setLastChangedSection(activeSectionKey);
    }

    onSelectVariant(activeSectionKey, variant);
    onSave(activeSectionKey);
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
    const nextValue = field === "label" ? limitLinkText(value) : value;
    const updatedMenu = menuItems.map((item, itemIndex) =>
      itemIndex === index ? { ...item, [field]: nextValue } : item,
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

  const updateTopbarBackgroundType = (type: TopbarBackgroundType) => {
    updateActiveTopbarData({ topbarBackgroundType: type });
  };

  const updateTopbarSolidColor = (color: string) => {
    updateActiveTopbarData({ topbarBackgroundColor: color });
  };

  const updateTopbarGradientColor = (color: string) => {
    updateActiveTopbarData({ topbarGradientColor: color });
  };

  const updateTopbarTextColor = (color: string) => {
    updateActiveTopbarData({ topbarTextColor: color });
  };

  const updateTopbarText = (value: string) => {
    updateActiveTopbarData({ text: [value] });
  };

  const updateTopbarField = (
    field: "phone" | "email" | "location",
    value: string,
  ) => {
    updateActiveTopbarData({ [field]: value });
  };

  const updateTopbarSocialLink = (
    index: number,
    field: "label" | "href",
    value: string,
  ) => {
    const updatedSocialLinks = topbarSocialLinks.map(
      (socialLink, socialIndex) =>
        socialIndex === index
          ? field === "label"
            ? {
                ...socialLink,
                label: value as SocialLinkData["label"],
              }
            : {
                ...socialLink,
                href: value,
              }
          : socialLink,
    );

    updateActiveTopbarData({
      socialLinks: getVisibleSocialLinks(updatedSocialLinks),
    });
  };

  const addTopbarSocialLink = () => {
    const currentSocialLinks = getVisibleSocialLinks(
      activeTopbarData?.socialLinks,
    );

    if (currentSocialLinks.length >= MAX_TOPBAR_SOCIAL_LINKS) {
      return;
    }

    const updatedSocialLinks = [
      ...currentSocialLinks,
      { label: "instagram" as const, href: "#" },
    ];

    updateActiveTopbarData({ socialLinks: updatedSocialLinks });
  };

  const deleteTopbarSocialLink = (index: number) => {
    const updatedSocialLinks = topbarSocialLinks.filter(
      (_, socialIndex) => socialIndex !== index,
    );

    updateActiveTopbarData({ socialLinks: updatedSocialLinks });
  };

  const updateHeaderBackgroundType = (type: HeaderBackgroundType) => {
    updateActiveHeaderData({ headerBackgroundType: type });
  };

  const updateHeaderSolidColor = (color: string) => {
    updateActiveHeaderData({ headerBackgroundColor: color });
  };

  const updateHeaderGradientColor = (color: string) => {
    updateActiveHeaderData({ headerGradientColor: color });
  };

  const updateHeaderTextColor = (color: string) => {
    updateActiveHeaderData({ headerTextColor: color });
  };

  const updateHeaderLogo = (logo: string) => {
    updateActiveHeaderData({ logo });
  };

  const updateHeaderButton = (
    index: number,
    field: "label" | "href",
    value: string,
  ) => {
    const nextValue = field === "label" ? limitLinkText(value) : value;
    const updatedButtons = (activeHeaderData?.buttons ?? []).map(
      (button, buttonIndex) =>
        buttonIndex === index ? { ...button, [field]: nextValue } : button,
    );

    updateActiveHeaderData({ buttons: updatedButtons });
  };

  const addHeaderButton = () => {
    if ((activeHeaderData?.buttons ?? []).length >= MAX_HEADER_BUTTONS) return;

    const updatedButtons = [
      ...(activeHeaderData?.buttons ?? []),
      { label: "New Button", href: "#", variant: "primary" },
    ];

    updateActiveHeaderData({ buttons: updatedButtons });
  };

  const deleteHeaderButton = (index: number) => {
    const updatedButtons = (activeHeaderData?.buttons ?? []).filter(
      (_, buttonIndex) => buttonIndex !== index,
    );

    updateActiveHeaderData({ buttons: updatedButtons });
  };

  const updateBannerField = (field: string, value: string) => {
    updateActiveBannerData({ [field]: value });
  };

  const updateBannerBackgroundMode = (mode: BannerBackgroundMode) => {
    updateActiveBannerData({ bannerBackgroundMode: mode });
  };

  const readBannerBackgroundFile = (
    file: File,
    onLoad: (dataUrl: string) => void,
  ) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        onLoad(reader.result);
      }
    };

    reader.readAsDataURL(file);
  };

  const showBannerGenerationLoader = (type: "image" | "video") => {
    setBannerGenerationType(type);
    window.setTimeout(() => setBannerGenerationType(null), 2000);
  };

  const handleBannerImageFileChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    showBannerGenerationLoader("image");
    readBannerBackgroundFile(file, (dataUrl) => {
      updateActiveBannerData({
        bannerBackgroundMode: "image",
        backgroundImage: dataUrl,
        backgroundImageTitle:
          activeBannerData?.backgroundImageTitle || file.name,
      });
    });
    event.target.value = "";
  };

  const handleBannerVideoFileChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    showBannerGenerationLoader("video");
    readBannerBackgroundFile(file, (dataUrl) => {
      updateActiveBannerData({
        bannerBackgroundMode: "video",
        backgroundVideo: dataUrl,
      });
    });
    event.target.value = "";
  };

  const updateBannerHeight = (height: number) => {
    updateActiveBannerData({ bannerHeight: clampBannerHeight(height) });
  };

  const updateBannerButton = (
    index: number,
    field: "label" | "href",
    value: string,
  ) => {
    const nextValue = field === "label" ? limitLinkText(value) : value;
    const updatedButtons = (activeBannerData?.buttons ?? []).map(
      (button, buttonIndex) =>
        buttonIndex === index ? { ...button, [field]: nextValue } : button,
    );

    updateActiveBannerData({ buttons: updatedButtons });
  };

  const addBannerButton = () => {
    if ((activeBannerData?.buttons ?? []).length >= MAX_BANNER_BUTTONS) return;

    const updatedButtons = [
      ...(activeBannerData?.buttons ?? []),
      { label: "New Button", href: "#" },
    ];

    updateActiveBannerData({ buttons: updatedButtons });
  };

  const deleteBannerButton = (index: number) => {
    const updatedButtons = (activeBannerData?.buttons ?? []).filter(
      (_, buttonIndex) => buttonIndex !== index,
    );

    updateActiveBannerData({ buttons: updatedButtons });
  };

  const updateFooterBackgroundType = (type: FooterBackgroundType) => {
    updateActiveFooterData({ footerBackgroundType: type });
  };

  const updateFooterSolidColor = (color: string) => {
    updateActiveFooterData({ footerBackgroundColor: color });
  };

  const updateFooterGradientColor = (color: string) => {
    updateActiveFooterData({ footerGradientColor: color });
  };

  const updateFooterTextColor = (color: string) => {
    updateActiveFooterData({ footerTextColor: color });
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
    const nextValue = field === "label" ? limitLinkText(value) : value;
    const updatedMenu = menuItems.map((item, itemIndex) => {
      if (itemIndex !== menuIndex) return item;

      const updatedChildren = (item.children ?? []).map(
        (child, currentChildIndex) =>
          currentChildIndex === childIndex
            ? { ...child, [field]: nextValue }
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
    <div className="pointer-events-none fixed inset-0 z-[9999] flex items-end justify-center p-3">
      <div className="pointer-events-auto relative mx-3 flex h-[70vh] w-full max-w-[880px] flex-col overflow-hidden rounded-3xl bg-[#f4f4f5] shadow-2xl">
        <div className="relative flex items-center justify-between border-b border-gray-400 px-5 py-3">
          <h3 className={`${agrandirBolt.className} font-medium text-2xl`}>
            {formatSectionTitle(sectionType)}
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
                items={visibleSidebarItems}
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
              items={visibleSidebarItems}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </aside>

          <main className="min-w-0 flex-1 overflow-y-auto px-4 py-3 sm:px-5">
            {!usesSectionColorPanel && (
              <div className="mb-3 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-2 sm:flex-row">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    {activeTab}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    Customize {activeTab.toLowerCase()} settings
                  </p>
                </div>

                {false &&
                  activeSectionType === "Header" &&
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

                      {headerBackgroundType === "gradient" &&
                        colorPanelOpen && (
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
                                    updateHeaderGradientColor(
                                      event.target.value,
                                    )
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

                {false &&
                  activeSectionType === "Footer" &&
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

                      {footerBackgroundType === "gradient" &&
                        colorPanelOpen && (
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
                                    updateFooterGradientColor(
                                      event.target.value,
                                    )
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
            )}

            {activeSectionType === "Topbar" &&
              activeTab === "Topbar Layout" && (
                <div className="space-y-4">
                  <SectionColorPanel
                    title="Topbar Layout"
                    backgroundType={topbarBackgroundType}
                    backgroundColor={topbarSolidColor}
                    gradientColor={topbarGradientColor}
                    textColor={topbarTextColor}
                    onBackgroundTypeChange={updateTopbarBackgroundType}
                    onBackgroundColorChange={updateTopbarSolidColor}
                    onGradientColorChange={updateTopbarGradientColor}
                    onTextColorChange={updateTopbarTextColor}
                  />

                  {topbarLayouts.map((layout) => {
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
                          className="flex h-20 items-center justify-between px-5"
                          style={{
                            background: topbarPreviewBackground,
                            color: topbarTextColor,
                          }}
                        >
                          <div className="h-2 w-32 rounded bg-current opacity-80" />
                          <div className="flex items-center gap-3">
                            <div className="h-2 w-20 rounded bg-current opacity-70" />
                            <div className="h-2 w-24 rounded bg-current opacity-70" />
                            <div className="flex gap-2">
                              <div className="h-4 w-4 rounded-full bg-current opacity-80" />
                              <div className="h-4 w-4 rounded-full bg-current opacity-80" />
                              <div className="h-4 w-4 rounded-full bg-current opacity-80" />
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

            {activeSectionType === "Topbar" &&
              activeTab === "Topbar Content" && (
                <div className="space-y-4">
                  <div className="rounded-xl border border-gray-200 bg-white p-4">
                    <label className="block text-sm font-semibold text-gray-900">
                      Topbar Text
                    </label>
                    <input
                      value={activeTopbarData?.text?.[0] ?? ""}
                      onChange={(event) => updateTopbarText(event.target.value)}
                      className="mt-2 h-11 w-full rounded-lg border border-gray-300 px-4 text-sm text-gray-900 outline-none focus:border-blue-600"
                      placeholder="Enter topbar text"
                    />
                  </div>

                  <div className="grid gap-4 lg:grid-cols-3">
                    {(["phone", "email", "location"] as const).map((field) => (
                      <div
                        key={field}
                        className="rounded-xl border border-gray-200 bg-white p-4"
                      >
                        <label className="block text-sm font-semibold capitalize text-gray-900">
                          {field}
                        </label>
                        <input
                          value={activeTopbarData?.[field] ?? ""}
                          onChange={(event) =>
                            updateTopbarField(field, event.target.value)
                          }
                          className="mt-2 h-11 w-full rounded-lg border border-gray-300 px-4 text-sm text-gray-900 outline-none focus:border-blue-600"
                          placeholder={`Enter ${field}`}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 rounded-xl border border-gray-200 bg-white p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900">
                          Social Icons
                        </h4>
                        <p className="mt-1 text-xs text-gray-500">
                          You can add up to {MAX_TOPBAR_SOCIAL_LINKS} social
                          icons.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={addTopbarSocialLink}
                        disabled={
                          topbarSocialLinks.length >= MAX_TOPBAR_SOCIAL_LINKS
                        }
                        className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-xs font-medium text-white disabled:cursor-not-allowed disabled:bg-gray-300"
                      >
                        <Plus size={14} />
                        Add Icon
                      </button>
                    </div>

                    <div className="space-y-3">
                      {topbarSocialLinks.map((socialLink, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-1 gap-3 rounded-xl border border-gray-300 bg-white p-3 shadow-sm lg:grid-cols-[minmax(8rem,1fr)_minmax(8rem,1fr)_3.5rem]"
                        >
                          <select
                            value={socialLink.label}
                            onChange={(event) =>
                              updateTopbarSocialLink(
                                index,
                                "label",
                                event.target.value as SocialLinkData["label"],
                              )
                            }
                            className="h-11 rounded-lg border border-gray-300 px-4 text-sm capitalize outline-none focus:border-blue-600"
                          >
                            {socialLinkLabels.map((socialName) => (
                              <option key={socialName} value={socialName}>
                                {socialName}
                              </option>
                            ))}
                          </select>

                          <input
                            value={socialLink.href}
                            onChange={(event) =>
                              updateTopbarSocialLink(
                                index,
                                "href",
                                event.target.value,
                              )
                            }
                            className="h-11 rounded-lg border border-gray-300 px-4 text-sm outline-none focus:border-blue-600"
                            placeholder="Social link"
                          />

                          <button
                            type="button"
                            onClick={() => deleteTopbarSocialLink(index)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-500 bg-white text-red-600"
                            aria-label="Delete social icon"
                          >
                            <Trash size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            {activeSectionType === "Header" &&
              activeTab === "Logo Settings" && (
                <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-4">
                  <label className="block text-sm font-semibold text-gray-900">
                    Logo Text
                  </label>
                  <input
                    value={activeHeaderData?.logo ?? ""}
                    onChange={(event) => updateHeaderLogo(event.target.value)}
                    className="h-11 w-full rounded-lg border border-gray-300 px-4 text-sm text-gray-900 outline-none focus:border-blue-600"
                    placeholder="Enter logo text"
                  />
                </div>
              )}

            {activeSectionType === "Header" &&
              activeTab === "Header Layout" && (
                <div className="space-y-4">
                  <SectionColorPanel
                    title="Header Layout"
                    backgroundType={headerBackgroundType}
                    backgroundColor={headerSolidColor}
                    gradientColor={headerGradientColor}
                    textColor={headerTextColor}
                    onBackgroundTypeChange={updateHeaderBackgroundType}
                    onBackgroundColorChange={updateHeaderSolidColor}
                    onGradientColorChange={updateHeaderGradientColor}
                    onTextColorChange={updateHeaderTextColor}
                  />

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
                          {layout.id === "Header-1" && (
                            <div className="h-full">
                              <div
                                className="flex h-10 items-center justify-between px-4"
                                style={{
                                  background: headerPreviewBackground,
                                  color: headerTextColor,
                                }}
                              >
                                <div className="h-2 w-14 rounded bg-current" />
                                <div className="flex gap-3">
                                  <div className="h-1.5 w-9 rounded bg-current" />
                                  <div className="h-1.5 w-9 rounded bg-current" />
                                  <div className="h-1.5 w-9 rounded bg-current" />
                                </div>
                                <div className="h-5 w-12 rounded-md bg-blue-600" />
                              </div>
                            </div>
                          )}

                          {layout.id === "Header-2" && (
                            <div
                              className="flex h-full items-start justify-between px-4 py-4"
                              style={{
                                background: headerPreviewBackground,
                                color: headerTextColor,
                              }}
                            >
                              <div className="h-2 w-16 rounded bg-current" />
                              <div className="flex gap-3">
                                <div className="h-1.5 w-9 rounded bg-current" />
                                <div className="h-1.5 w-9 rounded bg-current" />
                                <div className="h-1.5 w-9 rounded bg-current" />
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

            {activeSectionType === "Header" &&
              activeTab === "Header Buttons" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-700 underline">
                      Manage header action buttons.
                    </p>

                    <button
                      type="button"
                      onClick={addHeaderButton}
                      disabled={
                        (activeHeaderData?.buttons ?? []).length >=
                        MAX_HEADER_BUTTONS
                      }
                      className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-xs font-medium text-white disabled:cursor-not-allowed disabled:bg-gray-300"
                    >
                      <Plus size={14} />
                      Add Button
                    </button>
                  </div>

                  <p className="text-xs text-gray-500">
                    {(activeHeaderData?.buttons ?? []).length}/
                    {MAX_HEADER_BUTTONS} header buttons added
                  </p>

                  <div className="space-y-3">
                    {(activeHeaderData?.buttons ?? []).map((button, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-1 gap-3 rounded-xl border border-gray-300 bg-white p-3 shadow-sm lg:grid-cols-[minmax(8rem,1fr)_minmax(8rem,1fr)_3.5rem]"
                      >
                        <input
                          value={button.label}
                          onChange={(event) =>
                            updateHeaderButton(
                              index,
                              "label",
                              event.target.value,
                            )
                          }
                          className="h-11 rounded-lg border border-gray-300 px-4 text-sm outline-none focus:border-blue-600"
                          placeholder="Button label"
                        />

                        <input
                          value={button.href}
                          onChange={(event) =>
                            updateHeaderButton(
                              index,
                              "href",
                              event.target.value,
                            )
                          }
                          className="h-11 rounded-lg border border-gray-300 px-4 text-sm outline-none focus:border-blue-600"
                          placeholder="/link"
                        />

                        <button
                          type="button"
                          onClick={() => deleteHeaderButton(index)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-500 bg-white text-red-600"
                          aria-label="Delete header button"
                        >
                          <Trash size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {activeSectionType === "Banner" &&
              activeTab === "Banner Content" && (
                <div className="space-y-4">
                  <div className="rounded-xl border border-gray-200 bg-white p-4">
                    <label className="block text-sm font-semibold text-gray-900">
                      Pretitle
                    </label>
                    <input
                      value={activeBannerData?.pretitle ?? ""}
                      onChange={(event) =>
                        updateBannerField("pretitle", event.target.value)
                      }
                      className="mt-2 h-11 w-full rounded-lg border border-gray-300 px-4 text-sm text-gray-900 outline-none focus:border-blue-600"
                      placeholder="Enter banner pretitle"
                    />
                  </div>

                  <div className="rounded-xl border border-gray-200 bg-white p-4">
                    <label className="block text-sm font-semibold text-gray-900">
                      Title
                    </label>
                    <input
                      value={activeBannerData?.title ?? ""}
                      onChange={(event) =>
                        updateBannerField("title", event.target.value)
                      }
                      className="mt-2 h-11 w-full rounded-lg border border-gray-300 px-4 text-sm text-gray-900 outline-none focus:border-blue-600"
                      placeholder="Enter banner title"
                    />
                  </div>

                  <div className="rounded-xl border border-gray-200 bg-white p-4">
                    <label className="block text-sm font-semibold text-gray-900">
                      Description
                    </label>
                    <textarea
                      value={activeBannerData?.desc ?? ""}
                      onChange={(event) =>
                        updateBannerField("desc", event.target.value)
                      }
                      className="mt-2 min-h-28 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none focus:border-blue-600"
                      placeholder="Enter banner description"
                    />
                  </div>

                  {activeVariant === "Banner-2" && (
                    <div className="grid gap-4 lg:grid-cols-2">
                      <div className="rounded-xl border border-gray-200 bg-white p-4">
                        <label className="block text-sm font-semibold text-gray-900">
                          Title Color
                        </label>
                        <input
                          type="color"
                          value={activeBannerData?.titleColor ?? "#ffffff"}
                          onChange={(event) =>
                            updateBannerField("titleColor", event.target.value)
                          }
                          className="mt-2 h-10 w-12 cursor-pointer rounded border-0 bg-transparent p-0"
                          aria-label="Banner title color"
                        />
                      </div>

                      <div className="rounded-xl border border-gray-200 bg-white p-4">
                        <label className="block text-sm font-semibold text-gray-900">
                          Overlay Color
                        </label>
                        <input
                          type="color"
                          value={activeBannerData?.overlayColor ?? "#000000"}
                          onChange={(event) =>
                            updateBannerField(
                              "overlayColor",
                              event.target.value,
                            )
                          }
                          className="mt-2 h-10 w-12 cursor-pointer rounded border-0 bg-transparent p-0"
                          aria-label="Banner overlay color"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

            {activeSectionType === "Banner" &&
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
                          {layout.id === "Banner-1" && (
                            <div
                              className="relative flex h-full items-center overflow-hidden bg-slate-900 px-5"
                              style={{ background: bannerPreviewBackground }}
                            >
                              {bannerBackgroundMode === "image" && (
                                <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-800 to-sky-700" />
                              )}
                              <div className="relative z-10 w-2/3 space-y-2">
                                <div className="h-1.5 w-24 rounded bg-white/70" />
                                <div className="h-3 w-40 rounded bg-white" />
                                <div className="h-1.5 w-full rounded bg-white/60" />
                                <div className="h-1.5 w-4/5 rounded bg-white/60" />
                                <div className="h-5 w-16 rounded-md bg-blue-600" />
                              </div>
                            </div>
                          )}

                          {layout.id === "Banner-2" && (
                            <div
                              className="flex h-full items-center justify-center bg-indigo-50 px-5 text-center"
                              style={{ background: bannerPreviewBackground }}
                            >
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

            {activeSectionType === "Banner" &&
              activeTab === "Banner Background" && (
                <div className="space-y-4">
                  <section className="rounded-xl bg-[#f4f4f5] px-4 py-3">
                    <div className="border-b border-gray-300 pb-3">
                      <h4 className="text-lg font-semibold text-gray-950">
                        Banner Background
                      </h4>
                      <p className="mt-1 text-sm font-medium text-gray-500">
                        Customize banner background settings
                      </p>
                    </div>

                    <input
                      ref={bannerImageInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleBannerImageFileChange}
                      className="hidden"
                      aria-label="Choose banner image"
                    />
                    <input
                      ref={bannerVideoInputRef}
                      type="file"
                      accept="video/*"
                      onChange={handleBannerVideoFileChange}
                      className="hidden"
                      aria-label="Choose banner video"
                    />

                    <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                      {(
                        [
                          [
                            "image",
                            activeBannerData?.backgroundImage
                              ? "Change Image"
                              : "Add Image",
                          ],
                          [
                            "video",
                            activeBannerData?.backgroundVideo
                              ? "Change Video"
                              : "Add Video",
                          ],
                          ["solid", "Solid"],
                          ["gradient", "Gradient"],
                        ] as const
                      ).map(([mode, label]) => {
                        const isActive = bannerBackgroundMode === mode;

                        return (
                          <button
                            key={mode}
                            type="button"
                            onClick={() => updateBannerBackgroundMode(mode)}
                            className={`h-11 rounded-lg px-4 text-sm font-semibold transition ${
                              isActive
                                ? "bg-blue-600 text-white"
                                : "bg-sky-200 text-slate-950 hover:bg-sky-300"
                            }`}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  </section>

                  {bannerBackgroundMode === "image" && (
                    <div className="grid gap-4 lg:grid-cols-2">
                      <div className="rounded-xl border border-gray-200 bg-white p-4">
                        <label className="block text-sm font-semibold text-gray-900">
                          Background Image
                        </label>
                        <button
                          type="button"
                          onClick={() => bannerImageInputRef.current?.click()}
                          className="mt-2 flex h-11 w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 text-left text-sm text-gray-900 transition hover:border-blue-500 focus:border-blue-600 focus:outline-none"
                        >
                          <span className="font-medium">
                            {activeBannerData?.backgroundImage
                              ? "Change image"
                              : "Upload image"}
                          </span>
                          <span className="max-w-[55%] truncate text-xs text-gray-500">
                            {activeBannerData?.backgroundImage?.startsWith(
                              "data:",
                            )
                              ? "Selected from desktop"
                              : activeBannerData?.backgroundImage ||
                                "Image path"}
                          </span>
                        </button>
                      </div>

                      <div className="rounded-xl border border-gray-200 bg-white p-4">
                        <label className="block text-sm font-semibold text-gray-900">
                          Image Alt Text
                        </label>
                        <input
                          value={activeBannerData?.backgroundImageTitle ?? ""}
                          onChange={(event) =>
                            updateBannerField(
                              "backgroundImageTitle",
                              event.target.value,
                            )
                          }
                          className="mt-2 h-11 w-full rounded-lg border border-gray-300 px-4 text-sm text-gray-900 outline-none focus:border-blue-600"
                          placeholder="Banner image"
                        />
                      </div>
                    </div>
                  )}

                  {bannerBackgroundMode === "video" && (
                    <div className="rounded-xl border border-gray-200 bg-white p-4">
                      <label className="block text-sm font-semibold text-gray-900">
                        Background Video
                      </label>
                      <button
                        type="button"
                        onClick={() => bannerVideoInputRef.current?.click()}
                        className="mt-2 flex h-11 w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 text-left text-sm text-gray-900 transition hover:border-blue-500 focus:border-blue-600 focus:outline-none"
                      >
                        <span className="font-medium">
                          {activeBannerData?.backgroundVideo
                            ? "Change video"
                            : "Upload video"}
                        </span>
                        <span className="max-w-[55%] truncate text-xs text-gray-500">
                          {activeBannerData?.backgroundVideo?.startsWith(
                            "data:",
                          )
                            ? "Selected from desktop"
                            : activeBannerData?.backgroundVideo || "Video path"}
                        </span>
                      </button>
                    </div>
                  )}

                  {(bannerBackgroundMode === "solid" ||
                    bannerBackgroundMode === "gradient") && (
                    <div className="grid gap-4 lg:grid-cols-2">
                      <ColorInput
                        label={
                          bannerBackgroundMode === "gradient"
                            ? "Background left"
                            : "Background color"
                        }
                        value={bannerSolidColor}
                        onChange={(color) =>
                          updateBannerField("bannerBackgroundColor", color)
                        }
                      />

                      {bannerBackgroundMode === "gradient" && (
                        <ColorInput
                          label="Background right"
                          value={bannerGradientColor}
                          onChange={(color) =>
                            updateBannerField("bannerGradientColor", color)
                          }
                        />
                      )}
                    </div>
                  )}

                  <div className="rounded-xl border border-gray-200 bg-white p-4">
                    <div className="flex items-center justify-between gap-3">
                      <label className="text-sm font-semibold text-gray-900">
                        Banner Height
                      </label>
                      <input
                        type="number"
                        min={40}
                        max={100}
                        value={bannerHeight}
                        onChange={(event) =>
                          updateBannerHeight(Number(event.target.value))
                        }
                        className="h-10 w-24 rounded-lg border border-gray-300 px-3 text-sm text-gray-900 outline-none focus:border-blue-600"
                      />
                    </div>
                    <input
                      type="range"
                      min={40}
                      max={100}
                      value={bannerHeight}
                      onChange={(event) =>
                        updateBannerHeight(Number(event.target.value))
                      }
                      className="mt-4 w-full accent-blue-600"
                    />
                  </div>
                </div>
              )}

            {activeSectionType === "Banner" &&
              activeTab === "Banner Buttons" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-700 underline">
                      Manage banner action buttons.
                    </p>

                    <button
                      type="button"
                      onClick={addBannerButton}
                      disabled={
                        (activeBannerData?.buttons ?? []).length >=
                        MAX_BANNER_BUTTONS
                      }
                      className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-xs font-medium text-white disabled:cursor-not-allowed disabled:bg-gray-300"
                    >
                      <Plus size={14} />
                      Add Button
                    </button>
                  </div>

                  <p className="text-xs text-gray-500">
                    {(activeBannerData?.buttons ?? []).length}/
                    {MAX_BANNER_BUTTONS} banner buttons added
                  </p>

                  <div className="space-y-3">
                    {(activeBannerData?.buttons ?? []).map((button, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-1 gap-3 rounded-xl border border-gray-300 bg-white p-3 shadow-sm lg:grid-cols-[minmax(8rem,1fr)_minmax(8rem,1fr)_3.5rem]"
                      >
                        <input
                          value={button.label}
                          onChange={(event) =>
                            updateBannerButton(
                              index,
                              "label",
                              event.target.value,
                            )
                          }
                          className="h-11 rounded-lg border border-gray-300 px-4 text-sm outline-none focus:border-blue-600"
                          placeholder="Button label"
                        />

                        <input
                          value={button.href}
                          onChange={(event) =>
                            updateBannerButton(
                              index,
                              "href",
                              event.target.value,
                            )
                          }
                          className="h-11 rounded-lg border border-gray-300 px-4 text-sm outline-none focus:border-blue-600"
                          placeholder="/link"
                        />

                        <button
                          type="button"
                          onClick={() => deleteBannerButton(index)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-500 bg-white text-red-600"
                          aria-label="Delete banner button"
                        >
                          <Trash size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {activeSectionType === "About" && activeTab === "About Layout" && (
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
                        {layout.id === "About-1" && (
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

                        {layout.id === "About-2" && (
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

            {activeSectionType === "Product" &&
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
                          {layout.id === "Product-1" && (
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

                          {layout.id === "Product-2" && (
                            <div className="h-full bg-sky-100 p-4">
                              <div className="mx-auto mb-3 h-4 w-32 rounded bg-slate-900" />
                              <div className="grid h-20 grid-cols-3 gap-3">
                                <div className="rounded-lg border border-slate-400 bg-sky-50" />
                                <div className="rounded-lg border border-slate-400 bg-sky-50" />
                                <div className="rounded-lg border border-slate-400 bg-sky-50" />
                              </div>
                            </div>
                          )}

                          {layout.id === "Product-3" && (
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

            {activeSectionType === "Footer" &&
              activeTab === "Footer Layout" && (
                <div className="space-y-4">
                  <SectionColorPanel
                    title="Footer Layout"
                    backgroundType={footerBackgroundType}
                    backgroundColor={footerSolidColor}
                    gradientColor={footerGradientColor}
                    textColor={footerTextColor}
                    onBackgroundTypeChange={updateFooterBackgroundType}
                    onBackgroundColorChange={updateFooterSolidColor}
                    onGradientColorChange={updateFooterGradientColor}
                    onTextColorChange={updateFooterTextColor}
                  />

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
                          style={{
                            background: footerPreviewBackground,
                            color: footerTextColor,
                          }}
                        >
                          <div className="space-y-2">
                            <div className="h-4 w-20 rounded bg-current" />
                            <div className="h-2 w-full rounded bg-current opacity-60" />
                            <div className="h-2 w-4/5 rounded bg-current opacity-60" />
                            <div className="mt-4 flex gap-2">
                              <div className="h-5 w-5 rounded-full bg-current opacity-25" />
                              <div className="h-5 w-5 rounded-full bg-current opacity-25" />
                              <div className="h-5 w-5 rounded-full bg-current opacity-25" />
                            </div>
                          </div>
                          {[1, 2, 3].map((item) => (
                            <div key={item} className="space-y-2">
                              <div className="h-3 w-16 rounded bg-current" />
                              <div className="h-2 w-20 rounded bg-current opacity-50" />
                              <div className="h-2 w-24 rounded bg-current opacity-50" />
                              <div className="h-2 w-16 rounded bg-current opacity-50" />
                            </div>
                          ))}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

            {activeSectionType === "Header" &&
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
          <div className="flex gap-3">
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

      {bannerGenerationType && (
        <div className="fixed inset-0 z-[10002] flex items-center justify-center bg-white/35 backdrop-blur-sm">
          <style>
            {`
              @keyframes bannerLoaderSpin {
                to { transform: rotate(360deg); }
              }

              @keyframes bannerTextRoll {
                0%, 100% { transform: translateY(0); opacity: 0.65; }
                45% { transform: translateY(-0.22rem); opacity: 1; }
              }
            `}
          </style>
          <div className="relative overflow-hidden rounded-[1.35rem] p-[3px] shadow-2xl">
            <div className="absolute -inset-24 bg-[conic-gradient(from_0deg,#2563eb,#a855f7,#22c55e,#f59e0b,#ef4444,#2563eb)] animate-[bannerLoaderSpin_1.6s_linear_infinite]" />
            <div className="relative flex items-center gap-3 rounded-[1.2rem] bg-white/90 px-6 py-5 text-2xl font-medium text-slate-950 shadow-sm">
              <span className="grid h-6 w-6 place-items-center rounded-md bg-blue-600 text-xs text-white">
                AI
              </span>
              <span className="inline-flex overflow-hidden">
                {`generating ${bannerGenerationType}`
                  .split("")
                  .map((char, index) => (
                    <span
                      key={`${char}-${index}`}
                      className="inline-block animate-[bannerTextRoll_1.1s_ease-in-out_infinite]"
                      style={{ animationDelay: `${index * 0.045}s` }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </span>
                  ))}
              </span>
            </div>
          </div>
        </div>
      )}
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

function SectionColorPanel({
  title,
  backgroundType,
  backgroundColor,
  gradientColor,
  textColor,
  onBackgroundTypeChange,
  onBackgroundColorChange,
  onGradientColorChange,
  onTextColorChange,
}: {
  title: string;
  backgroundType: "solid" | "gradient";
  backgroundColor: string;
  gradientColor: string;
  textColor: string;
  onBackgroundTypeChange: (type: "solid" | "gradient") => void;
  onBackgroundColorChange: (color: string) => void;
  onGradientColorChange: (color: string) => void;
  onTextColorChange: (color: string) => void;
}) {
  return (
    <section className="rounded-xl bg-[#f4f4f5] px-4 py-3">
      <div className="grid gap-4 border-b border-gray-300 pb-3 lg:grid-cols-[minmax(150px,1fr)_auto] lg:items-center">
        <div className="min-w-0">
          <h4 className="text-lg font-semibold text-gray-950">{title}</h4>
          <p className="mt-1 text-sm font-medium text-gray-500">
            Customize {title.toLowerCase()} settings
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-[auto_auto_auto] sm:items-center">
          <span className="text-sm font-semibold text-gray-950 sm:whitespace-nowrap">
            Background Type :
          </span>

          {(["solid", "gradient"] as const).map((type) => {
            const isActive = backgroundType === type;

            return (
              <button
                key={type}
                type="button"
                onClick={() => onBackgroundTypeChange(type)}
                className={`h-10 min-w-28 rounded-xl border px-5 text-sm font-semibold capitalize text-gray-950 shadow-sm transition ${
                  isActive
                    ? "border-gray-300 bg-white"
                    : "border-gray-500 bg-transparent hover:bg-white"
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <ColorInput
          label="Text color"
          value={textColor}
          onChange={onTextColorChange}
        />

        <ColorInput
          label={
            backgroundType === "gradient"
              ? "Background left"
              : "Background color"
          }
          value={backgroundColor}
          onChange={onBackgroundColorChange}
        />

        {backgroundType === "gradient" && (
          <ColorInput
            label="Background right"
            value={gradientColor}
            onChange={onGradientColorChange}
          />
        )}
      </div>
    </section>
  );
}

function ColorInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (color: string) => void;
}) {
  return (
    <label className="flex min-w-0 cursor-pointer items-center gap-3 text-sm font-semibold text-gray-950">
      <span className="shrink-0">{label}</span>
      <span className="flex items-center gap-2">
        <span
          className="h-5 w-5 rounded-full border-2 border-gray-400"
          style={{ background: value }}
        />
        <input
          type="color"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-8 w-8 cursor-pointer rounded border-0 bg-transparent p-0"
          aria-label={label}
        />
      </span>
    </label>
  );
}
