"use client";

import React, { useState } from "react";
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
          onSelectVariant={updateSectionVariant}
          onUpdateSectionData={updateSectionData}
        />
      )}
    </main>
  );
}
