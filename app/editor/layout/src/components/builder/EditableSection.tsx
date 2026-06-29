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

  return (
    <div className="group relative">
      {!isPreview && (
        <div className="pointer-events-none absolute inset-0 z-20 hidden bg-black/10 backdrop-blur-[1px] group-hover:block">
          <div className="sticky top-1/2 flex -translate-y-1/2 justify-center">
            <button
              type="button"
              onClick={onEdit}
              className="pointer-events-auto rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-lg transition hover:bg-blue-700"
            >
              Edit {label}
            </button>
          </div>
        </div>
      )}

      <div className="relative">{children}</div>
    </div>
  );
}
