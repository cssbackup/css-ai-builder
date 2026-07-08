"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  buildSelectedConfig,
  createAddableSection,
  getTemplateVariables,
} from "./src/data/templateFlow";
import { sectionRegistry } from "./src/lib/sectionRegistry";

import EditableSection from "./src/components/builder/EditableSection";
import EditSectionModal from "./src/components/builder/EditSectionModal";

import { SectionData, SectionItem } from "./src/types/section";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const formatSectionName = (sectionType: string) =>
  sectionType.charAt(0).toUpperCase() + sectionType.slice(1);

const lockedSectionTypes = new Set(["Topbar", "Header", "Footer"]);

const isLockedSection = (section?: SectionItem) =>
  Boolean(section && lockedSectionTypes.has(section.type));

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
  const templateId = searchParams.get("templateId") ?? "template-1";
  const category = searchParams.get("category") ?? "Realestate";
  const initialConfig = buildSelectedConfig(templateId, category);
  const templateVariables = getTemplateVariables(initialConfig.templateId);

  return (
    <EditorPage
      key={`${templateId}-${category}`}
      initialSections={initialConfig.sections}
      templateVariables={templateVariables}
      category={category}
    />
  );
}

function EditorPage({
  initialSections,
  templateVariables,
  category,
}: {
  initialSections: SectionItem[];
  templateVariables: Record<string, string>;
  category: string;
}) {
  const [sections, setSections] = useState<SectionItem[]>(() =>
    initialSections.map((section) => ({
      ...section,
      id: section.id ?? section.type,
    })),
  );

  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [savedToastSection, setSavedToastSection] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (!savedToastSection) return;

    const timeout = window.setTimeout(() => {
      setSavedToastSection(null);
    }, 2400);

    return () => window.clearTimeout(timeout);
  }, [savedToastSection]);

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
  };

  const updateInlineMedia = (
    sectionId: string,
    variant: string,
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

    setSections((prevSections) => {
      const targetIndex = prevSections.findIndex(
        (section) => (section.id ?? section.type) === afterSectionId,
      );

      if (targetIndex === -1) return [...prevSections, nextSection];

      return [
        ...prevSections.slice(0, targetIndex + 1),
        nextSection,
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
  const editingSectionItem = sections.find(
    (section) => (section.id ?? section.type) === editingSection,
  );

  return (
    <main
      className="w-full max-w-full overflow-x-hidden [overflow-wrap:anywhere]"
      style={templateVariables as React.CSSProperties}
    >
      {sections.map((section) => {
        const sectionId = section.id ?? section.type;
        const sectionIndex = sections.findIndex(
          (item) => (item.id ?? item.type) === sectionId,
        );
        const previousSection = sections[sectionIndex - 1];
        const nextSection = sections[sectionIndex + 1];
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
              updateInlineText(sectionId, section.variant, oldText, newText)
            }
            onInlineMediaEdit={(oldSrc, newSrc, mediaType, fileName) =>
              updateInlineMedia(
                sectionId,
                section.variant,
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
          sections={sections}
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
    </main>
  );
}
