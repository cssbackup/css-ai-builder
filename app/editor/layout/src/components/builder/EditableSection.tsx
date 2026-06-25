"use client";

import { ReactNode } from "react";
import { usePreview } from "../context/PreviewContext";

type EditableSectionProps = {
  label: string;
  children: ReactNode;
  onEdit: () => void;
};

export default function EditableSection({
  label,
  children,
  onEdit,
}: EditableSectionProps) {
  const { isPreview } = usePreview();
  console.log("EditableSection isPreview:", isPreview);

  return (
    <div className="group relative">
      {!isPreview && (
        <div className="absolute inset-0 z-20 hidden bg-black/10 backdrop-blur-xs group-hover:flex items-center justify-center">
          <button
            type="button"
            onClick={onEdit}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm cursor-pointer font-medium text-white"
          >
            Edit {label}
          </button>
        </div>
      )}

      <div className="relative">{children}</div>
    </div>
  );
}
