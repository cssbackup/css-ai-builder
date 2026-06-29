"use client";

import React, { useEffect, useState } from "react";
import { templates } from "./src/data/templates";
import { selectedConfig } from "./src/data/selectedConfig";
import { sectionRegistry } from "./src/lib/sectionRegistry";

import EditableSection from "./src/components/builder/EditableSection";
import EditSectionModal from "./src/components/builder/EditSectionModal";

import { SectionData } from "./src/types/section";

type SectionItem = {
  type: string;
  variant: string;
  data: Record<string, unknown>;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const formatSectionName = (sectionType: string) =>
  sectionType.charAt(0).toUpperCase() + sectionType.slice(1);

export default function Page() {
  return <EditorPage />;
}

function EditorPage() {
  const template = templates.find(
    (item) => item.id === selectedConfig.templateId,
  );

  const [sections, setSections] = useState<SectionItem[]>(
    selectedConfig.sections,
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

  if (!template) return null;

  const updateSectionVariant = (type: string, variant: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.type === type ? { ...section, variant } : section,
      ),
    );
  };

  const updateSectionData = (
    type: string,
    newData: Record<string, unknown>,
  ) => {
    setSections((prev) =>
      prev.map((section) =>
        section.type === type
          ? { ...section, data: { ...section.data, ...newData } }
          : section,
      ),
    );
  };

  const handleSectionSave = (sectionType: string) => {
    setEditingSection(null);
    setSavedToastSection(sectionType);
  };

  return (
    <main style={template.variables as React.CSSProperties}>
      {sections.map((section) => {
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
            key={section.type}
            label={section.type}
            onEdit={() => setEditingSection(section.type)}
          >
            <Component data={sectionData} />
          </EditableSection>
        );
      })}

      {editingSection && (
        <EditSectionModal
          sectionType={editingSection}
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
