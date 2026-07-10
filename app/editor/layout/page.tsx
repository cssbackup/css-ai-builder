"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowUp, MessageCircle, Phone } from "lucide-react";
import {
  buildSelectedConfig,
  createAddableSection,
  createAboutPageSection,
  createContactPageSection,
  createGalleryPageSection,
  createServicePageSection,
  getTemplateVariables,
} from "./src/data/templateFlow";
import { sectionRegistry } from "./src/lib/sectionRegistry";

import EditableSection from "./src/components/builder/EditableSection";
import EditSectionModal from "./src/components/builder/EditSectionModal";
import { usePreview } from "./src/components/context/PreviewContext";

import { SectionData, SectionItem } from "./src/types/section";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const formatSectionName = (sectionType: string) =>
  sectionType.charAt(0).toUpperCase() + sectionType.slice(1);

const lockedSectionTypes = new Set(["Topbar", "Header", "Footer"]);

const isLockedSection = (section?: SectionItem) =>
  Boolean(section && lockedSectionTypes.has(section.type));

const addAboutPageSection = (sections: SectionItem[], category: string) => {
  if (sections.some((section) => section.id === "AboutPage")) return sections;

  const aboutPageSection = createAboutPageSection(category);
  const footerIndex = sections.findIndex((section) => section.type === "Footer");

  if (footerIndex === -1) return [...sections, aboutPageSection];

  return [
    ...sections.slice(0, footerIndex),
    aboutPageSection,
    ...sections.slice(footerIndex),
  ];
};

const addGalleryPageSection = (sections: SectionItem[], category: string) => {
  if (sections.some((section) => section.id === "GalleryPage")) return sections;

  const galleryPageSection = createGalleryPageSection(category);
  const footerIndex = sections.findIndex((section) => section.type === "Footer");

  if (footerIndex === -1) return [...sections, galleryPageSection];

  return [
    ...sections.slice(0, footerIndex),
    galleryPageSection,
    ...sections.slice(footerIndex),
  ];
};

const addContactPageSection = (sections: SectionItem[], category: string) => {
  if (sections.some((section) => section.id === "ContactPage")) return sections;

  const contactPageSection = createContactPageSection(category);
  const footerIndex = sections.findIndex((section) => section.type === "Footer");

  if (footerIndex === -1) return [...sections, contactPageSection];

  return [
    ...sections.slice(0, footerIndex),
    contactPageSection,
    ...sections.slice(footerIndex),
  ];
};

const addServicePageSection = (sections: SectionItem[], category: string) => {
  if (sections.some((section) => section.id === "ServicePage")) return sections;

  const servicePageSection = createServicePageSection(category);
  const galleryIndex = sections.findIndex((section) => section.id === "GalleryPage");
  const footerIndex = sections.findIndex((section) => section.type === "Footer");
  const insertIndex =
    galleryIndex !== -1 ? galleryIndex : footerIndex === -1 ? sections.length : footerIndex;

  return [
    ...sections.slice(0, insertIndex),
    servicePageSection,
    ...sections.slice(insertIndex),
  ];
};

const areMenusEqual = (
  currentMenu: { label: string; href: string; children?: { label: string; href: string }[] }[] = [],
  nextMenu: { label: string; href: string; children?: { label: string; href: string }[] }[],
): boolean =>
  currentMenu.length === nextMenu.length &&
  currentMenu.every(
    (item, index) =>
      item.label === nextMenu[index]?.label &&
      item.href === nextMenu[index]?.href &&
      areMenusEqual(item.children, nextMenu[index]?.children ?? []),
  );

const replaceFirstTextValue = (
  value: unknown,
  oldText: string,
  newText: string,
): { value: unknown; replaced: boolean } => {
  if (typeof value === "string") {
    return value.trim() === oldText.trim()
      ? { value: newText, replaced: true }
      : { value, replaced: false };
  }

  if (Array.isArray(value)) {
    let replaced = false;
    const nextValue = value.map((item) => {
      if (replaced) return item;

      const result = replaceFirstTextValue(item, oldText, newText);
      replaced = result.replaced;

      return result.value;
    });

    return { value: nextValue, replaced };
  }

  if (isRecord(value)) {
    let replaced = false;
    const nextValue = Object.fromEntries(
      Object.entries(value).map(([key, item]) => {
        if (replaced) return [key, item];

        const result = replaceFirstTextValue(item, oldText, newText);
        replaced = result.replaced;

        return [key, result.value];
      }),
    );

    return { value: nextValue, replaced };
  }

  return { value, replaced: false };
};

const replaceFirstMediaValue = (
  value: unknown,
  oldSrc: string,
  newSrc: string,
  mediaType: "image" | "video",
  fileName: string,
): { value: unknown; replaced: boolean } => {
  if (typeof value === "string") {
    return value === oldSrc
      ? { value: newSrc, replaced: true }
      : { value, replaced: false };
  }

  if (Array.isArray(value)) {
    let replaced = false;
    const nextValue = value.map((item) => {
      if (replaced) return item;

      const result = replaceFirstMediaValue(
        item,
        oldSrc,
        newSrc,
        mediaType,
        fileName,
      );
      replaced = result.replaced;

      return result.value;
    });

    return { value: nextValue, replaced };
  }

  if (isRecord(value)) {
    let replaced = false;
    const nextValue = Object.fromEntries(
      Object.entries(value).map(([key, item]) => {
        if (replaced) return [key, item];

        const result = replaceFirstMediaValue(
          item,
          oldSrc,
          newSrc,
          mediaType,
          fileName,
        );
        replaced = result.replaced;

        return [key, result.value];
      }),
    );

    if (replaced && mediaType === "image") {
      if ("backgroundImageTitle" in nextValue) {
        nextValue.backgroundImageTitle = fileName;
      }
      if ("sideImageTitle" in nextValue) {
        nextValue.sideImageTitle = fileName;
      }
      if ("alt" in nextValue && !nextValue.alt) {
        nextValue.alt = fileName;
      }
    }

    return { value: nextValue, replaced };
  }

  return { value, replaced: false };
};

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <EditorLayoutPage />
    </Suspense>
  );
}

function EditorLayoutPage() {
  const searchParams = useSearchParams();
  const { currentPage, pageLinks, setCurrentPage, setPageLinks } = usePreview();
  const templateId = searchParams.get("templateId") ?? "template-1";
  const category = searchParams.get("category") ?? "Realestate";
  const page = currentPage || searchParams.get("page") || "home";
  const initialConfig = useMemo(
    () => buildSelectedConfig(templateId, category),
    [templateId, category],
  );
  const templateVariables = getTemplateVariables(initialConfig.templateId);

  useEffect(() => {
    setCurrentPage("Home");
  }, [category, setCurrentPage, templateId]);

  useEffect(() => {
    const headerSection = initialConfig.sections.find(
      (section) => section.type === "Header",
    );
    const headerData = headerSection?.data?.[headerSection.variant];
    const categoryPageLinks = headerData?.menu;

    if (!Array.isArray(categoryPageLinks) || !categoryPageLinks.length) return;

    const currentLinksStartWithCategoryLinks = categoryPageLinks.every(
      (item, index) =>
        item.label === pageLinks[index]?.label &&
        item.href === pageLinks[index]?.href &&
        areMenusEqual(item.children ?? [], pageLinks[index]?.children ?? []),
    );

    if (!currentLinksStartWithCategoryLinks) {
      setPageLinks(categoryPageLinks);
    }
  }, [initialConfig.sections, pageLinks, setPageLinks]);

  return (
    <EditorPage
      key={`${templateId}-${category}`}
      initialSections={initialConfig.sections}
      templateVariables={templateVariables}
      category={category}
      page={page}
      pageLinks={pageLinks}
    />
  );
}

function EditorPage({
  initialSections,
  templateVariables,
  category,
  page,
  pageLinks,
}: {
  initialSections: SectionItem[];
  templateVariables: Record<string, string>;
  category: string;
  page: string;
  pageLinks: {
    label: string;
    href: string;
    children?: { label: string; href: string }[];
  }[];
}) {
  const [sections, setSections] = useState<SectionItem[]>(() =>
    addContactPageSection(
      addGalleryPageSection(
        addServicePageSection(
          addAboutPageSection(
            initialSections.map((section) => ({
              ...section,
              id: section.id ?? section.type,
            })),
            category,
          ),
          category,
        ),
        category,
      ),
      category,
    ),
  );

  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [savedToastSection, setSavedToastSection] = useState<string | null>(
    null,
  );
  const [inlineUpdateToast, setInlineUpdateToast] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (!savedToastSection) return;

    const timeout = window.setTimeout(() => {
      setSavedToastSection(null);
    }, 2400);

    return () => window.clearTimeout(timeout);
  }, [savedToastSection]);

  useEffect(() => {
    if (!inlineUpdateToast) return;

    const timeout = window.setTimeout(() => {
      setInlineUpdateToast(null);
    }, 2400);

    return () => window.clearTimeout(timeout);
  }, [inlineUpdateToast]);

  const updateSectionVariant = (sectionId: string, variant: string) => {
    setSections((prev) =>
      prev.map((section) =>
        (section.id ?? section.type) === sectionId
          ? { ...section, variant }
          : section,
      ),
    );
  };

  const updateSectionData = (
    sectionId: string,
    newData: Record<string, SectionData>,
  ) => {
    setSections((prev) =>
      prev.map((section) =>
        (section.id ?? section.type) === sectionId
          ? { ...section, data: { ...section.data, ...newData } }
          : section,
      ),
    );
  };

  const updateInlineText = (
    sectionId: string,
    variant: string,
    sectionType: string,
    oldText: string,
    newText: string,
  ) => {
    setSections((prev) =>
      prev.map((section) => {
        if ((section.id ?? section.type) !== sectionId) return section;

        const activeData = section.data[variant];
        if (!activeData) return section;

        const result = replaceFirstTextValue(activeData, oldText, newText);

        if (!result.replaced || !isRecord(result.value)) return section;

        return {
          ...section,
          data: {
            ...section.data,
            [variant]: result.value as SectionData,
          },
        };
      }),
    );
    setInlineUpdateToast(`${formatSectionName(sectionType)} Content - Updated`);
  };

  const updateInlineMedia = (
    sectionId: string,
    variant: string,
    sectionType: string,
    oldSrc: string,
    newSrc: string,
    mediaType: "image" | "video",
    fileName: string,
  ) => {
    setSections((prev) =>
      prev.map((section) => {
        if ((section.id ?? section.type) !== sectionId) return section;

        const activeData = section.data[variant];
        if (!activeData) return section;

        const result = replaceFirstMediaValue(
          activeData,
          oldSrc,
          newSrc,
          mediaType,
          fileName,
        );

        if (!result.replaced || !isRecord(result.value)) return section;

        return {
          ...section,
          data: {
            ...section.data,
            [variant]: result.value as SectionData,
          },
        };
      }),
    );
    setInlineUpdateToast(
      `${formatSectionName(sectionType)} ${
        mediaType === "video" ? "Video" : "Image"
      } - Updated`,
    );
  };

  const deleteSection = (sectionId: string) => {
  setSections((prevSections) =>
    prevSections.filter((section) => (section.id ?? section.type) !== sectionId)
  );

  setEditingSection(null);
};

  const addSectionAfter = (afterSectionId: string, sectionType: string) => {
    const nextSection = createAddableSection(sectionType, category);
    if (!nextSection) return;
    const isAboutEditor = page.toLowerCase() === "about";
    const scopedNextSection = isAboutEditor
      ? { ...nextSection, page: "about" }
      : nextSection;

    setSections((prevSections) => {
      const targetIndex = prevSections.findIndex(
        (section) => (section.id ?? section.type) === afterSectionId,
      );

      if (targetIndex === -1) return [...prevSections, scopedNextSection];

      return [
        ...prevSections.slice(0, targetIndex + 1),
        scopedNextSection,
        ...prevSections.slice(targetIndex + 1),
      ];
    });
  };

  const moveSection = (sectionId: string, direction: -1 | 1) => {
    setSections((prevSections) => {
      const currentIndex = prevSections.findIndex(
        (section) => (section.id ?? section.type) === sectionId,
      );
      const targetIndex = currentIndex + direction;

      if (
        currentIndex === -1 ||
        targetIndex < 0 ||
        targetIndex >= prevSections.length ||
        isLockedSection(prevSections[currentIndex]) ||
        isLockedSection(prevSections[targetIndex])
      ) {
        return prevSections;
      }

      const nextSections = [...prevSections];
      [nextSections[currentIndex], nextSections[targetIndex]] = [
        nextSections[targetIndex],
        nextSections[currentIndex],
      ];

      return nextSections;
    });
  };

  const handleSectionSave = (sectionType: string) => {
    setEditingSection(null);
    setSavedToastSection(sectionType);
  };
  const syncedSections = useMemo(
    () =>
      sections.map((section) => {
        if (section.type !== "Header") return section;

        const activeVariant = section.variant;
        const activeData = section.data[activeVariant];

        if (!activeData || areMenusEqual(activeData.menu, pageLinks)) {
          return section;
        }

        return {
          ...section,
          data: {
            ...section.data,
            [activeVariant]: {
              ...activeData,
              menu: pageLinks,
            },
          },
        };
      }),
    [pageLinks, sections],
  );
  const editingSectionItem = syncedSections.find(
    (section) => (section.id ?? section.type) === editingSection,
  );
  const footerSection = syncedSections.find(
    (section) => section.type === "Footer",
  );
  const footerVariantData = footerSection
    ? footerSection.data?.[footerSection.variant] ??
      footerSection.data?.["Footer-1"]
    : undefined;
  const footerData = isRecord(footerVariantData)
    ? (footerVariantData as SectionData)
    : undefined;
  const whatsappLink = footerData?.whatsappLink;
  const callLink = footerData?.callLink;
  const currentPageSlug = page.trim().toLowerCase();
  const pageShellSectionTypes = ["Topbar", "Header", "Footer"];
  const visibleSections =
    currentPageSlug && currentPageSlug !== "home"
      ? syncedSections.filter(
          (section) =>
            pageShellSectionTypes.includes(section.type) ||
            section.page?.toLowerCase() === currentPageSlug,
        )
      : syncedSections.filter((section) => !section.page);
  const scrollToTopbar = () => {
    const scrollContainer = document.querySelector<HTMLElement>(
      "[data-template-scroll]",
    );

    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main
      className="editor-smooth-surface w-full max-w-full overflow-x-hidden [overflow-wrap:anywhere]"
      style={templateVariables as React.CSSProperties}
    >
      {visibleSections.map((section) => {
        const sectionId = section.id ?? section.type;
        const sectionIndex = visibleSections.findIndex(
          (item) => (item.id ?? item.type) === sectionId,
        );
        const previousSection = visibleSections[sectionIndex - 1];
        const nextSection = visibleSections[sectionIndex + 1];
        const canMoveUp =
          Boolean(previousSection) &&
          !isLockedSection(section) &&
          !isLockedSection(previousSection);
        const canMoveDown =
          Boolean(nextSection) &&
          !isLockedSection(section) &&
          !isLockedSection(nextSection);
        const Component = sectionRegistry[section.variant];
        const defaultVariant = `${section.type}-1`;
        const variantData =
          section.data?.[section.variant] ?? section.data?.[defaultVariant];

        const sectionData = (
          isRecord(variantData) ? variantData : section.data
        ) as SectionData;

        if (!Component) return null;

        return (
          <EditableSection
            key={sectionId}
            label={section.type}
            onEdit={() => setEditingSection(sectionId)}
            onDelete={() => deleteSection(sectionId)}
            onAddSection={(sectionType) => addSectionAfter(sectionId, sectionType)}
            canMoveUp={canMoveUp}
            canMoveDown={canMoveDown}
            onMoveUp={() => moveSection(sectionId, -1)}
            onMoveDown={() => moveSection(sectionId, 1)}
            onInlineTextEdit={(oldText, newText) =>
              updateInlineText(
                sectionId,
                section.variant,
                section.type,
                oldText,
                newText,
              )
            }
            onInlineMediaEdit={(oldSrc, newSrc, mediaType, fileName) =>
              updateInlineMedia(
                sectionId,
                section.variant,
                section.type,
                oldSrc,
                newSrc,
                mediaType,
                fileName,
              )
            }
          >
            <Component data={sectionData} />
          </EditableSection>
        );
      })}

      {editingSectionItem && (
        <EditSectionModal
          key={editingSectionItem.id ?? editingSectionItem.type}
          sectionId={editingSectionItem.id ?? editingSectionItem.type}
          sectionType={editingSectionItem.type}
          sections={syncedSections}
          onClose={() => setEditingSection(null)}
          onSave={handleSectionSave}
          onSelectVariant={updateSectionVariant}
          onUpdateSectionData={updateSectionData}
        />
      )}

      {savedToastSection && (
        <div
          key={savedToastSection}
          className="fixed bottom-3 left-1/2 z-[10000] w-[min(92vw,300px)] -translate-x-1/2 rounded-[22px] border border-gray-500 bg-blue-600 px-1 py-3 text-center text-lg font-medium text-white shadow-[0_18px_45px_rgba(15,23,42,0.12)]"
          role="status"
          aria-live="polite"
        >
          {formatSectionName(savedToastSection)} changes saved
        </div>
      )}

      {inlineUpdateToast && (
        <div
          key={inlineUpdateToast}
          className="fixed right-4 top-4 z-[10003] rounded-lg border border-emerald-200 bg-white px-4 py-3 text-sm font-semibold text-emerald-700 shadow-[0_12px_35px_rgba(15,23,42,0.16)]"
          role="status"
          aria-live="polite"
        >
          {inlineUpdateToast}
        </div>
      )}

      {(whatsappLink || callLink) && (
        <div className="fixed bottom-5 left-5 z-[9000] flex flex-col gap-3 md:left-[var(--template-floating-left,1.25rem)]">
          {whatsappLink && (
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white shadow-[0_12px_32px_rgba(16,185,129,0.32)] transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-600"
              aria-label="Open WhatsApp"
            >
              <MessageCircle size={22} />
            </a>
          )}

          {callLink && (
            <a
              href={callLink}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-[0_12px_32px_rgba(37,99,235,0.32)] transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700"
              aria-label="Call now"
            >
              <Phone size={21} />
            </a>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={scrollToTopbar}
        className="fixed bottom-5 right-5 z-[9000] flex h-12 w-12 items-center justify-center rounded-full bg-slate-950 text-white shadow-[0_12px_32px_rgba(15,23,42,0.28)] transition-all duration-300 hover:-translate-y-1 hover:bg-slate-800"
        aria-label="Scroll to topbar"
      >
        <ArrowUp size={22} />
      </button>
    </main>
  );
}
