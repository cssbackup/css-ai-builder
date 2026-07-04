"use client";

import { ReactNode, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Edit, Plus, Trash } from "lucide-react";
import { usePreview } from "../context/PreviewContext";

type EditableSectionProps = {
  label: string;
  children: ReactNode;
  onEdit: () => void;
  onDelete: () => void;
  onInlineTextEdit: (oldText: string, newText: string) => void;
};

export default function EditableSection({
  label,
  children,
  onEdit,
  onDelete,
  onInlineTextEdit,
}: EditableSectionProps) {
  const { isPreview } = usePreview();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const activeEditableRef = useRef<HTMLElement | null>(null);
  const originalTextRef = useRef("");

  const handleConfirmDelete = () => {
    setShowDeleteConfirm(false);
    onDelete();
  };
  const sectionName = label.charAt(0).toUpperCase() + label.slice(1);

  const finishInlineEdit = (element: HTMLElement, shouldSave: boolean) => {
    const oldText = originalTextRef.current;
    const newText = element.innerText.trim();

    element.removeAttribute("contenteditable");
    element.removeAttribute("spellcheck");
    element.classList.remove(
      "outline",
      "outline-2",
      "outline-blue-500",
      "rounded-sm",
      "cursor-text",
    );

    activeEditableRef.current = null;
    originalTextRef.current = "";

    if (shouldSave && oldText && newText && oldText !== newText) {
      onInlineTextEdit(oldText, newText);
    } else if (!shouldSave) {
      element.innerText = oldText;
    }
  };

  const startInlineEdit = (element: HTMLElement) => {
    if (activeEditableRef.current === element) return;

    if (activeEditableRef.current) {
      finishInlineEdit(activeEditableRef.current, true);
    }

    originalTextRef.current = element.innerText.trim();
    activeEditableRef.current = element;

    element.setAttribute("contenteditable", "true");
    element.setAttribute("spellcheck", "false");
    element.classList.add(
      "outline",
      "outline-2",
      "outline-blue-500",
      "rounded-sm",
      "cursor-text",
    );
    element.focus();

    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(element);
    range.collapse(false);
    selection?.removeAllRanges();
    selection?.addRange(range);
  };

  const handleInlineTextClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isPreview) return;

    const target = event.target as HTMLElement;

    if (target.closest("[data-editor-toolbar]")) return;

    const editableElement = target.closest<HTMLElement>(
      "h1,h2,h3,h4,h5,h6,p,span,a,button,li",
    );

    if (!editableElement || !event.currentTarget.contains(editableElement)) {
      return;
    }

    const text = editableElement.innerText.trim();

    if (!text) return;

    event.preventDefault();
    event.stopPropagation();
    startInlineEdit(editableElement);
  };

  const handleInlineTextBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;

    if (target === activeEditableRef.current) {
      finishInlineEdit(target, true);
    }
  };

  const handleInlineTextKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
  ) => {
    const target = event.target as HTMLElement;

    if (target !== activeEditableRef.current) return;

    if (event.key === "Enter") {
      event.preventDefault();
      finishInlineEdit(target, true);
    }

    if (event.key === "Escape") {
      event.preventDefault();
      finishInlineEdit(target, false);
    }
  };

  return (
    <div className="group relative isolate">
      {!isPreview && (
        <div
          data-editor-toolbar
          className="pointer-events-none absolute inset-0 z-40 hidden group-hover:block"
        >
          <div className="sticky top-1/2 flex  justify-center px-3">
            <div className="pointer-events-auto flex max-w-[calc(100vw-2rem)] flex-wrap items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-1 shadow-lg">
              <span className="text-sm font-medium text-gray-900">
                {label} :
              </span>

              <button
                type="button"
                onClick={onEdit}
                className="flex items-center gap-1 rounded-full border border-gray-400 px-3 py-1 text-xs font-medium text-slate-700  hover:bg-slate-100"
              >
                <Edit size={12} />
                Edit
              </button>

              <button
                type="button"
                onClick={() => {}}
                className="flex items-center gap-1 rounded-full border border-gray-400 px-3 py-1 text-xs font-medium text-slate-700  hover:bg-slate-100"
              >
                <Plus size={12} />
                Add
              </button>

              <button
                type="button"
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium text-red-600  hover:bg-red-50"
              >
                <Trash size={12} />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm &&
        createPortal(
          <div className="pointer-events-none fixed inset-0 z-[10001] flex items-center justify-center px-4">
            <div className="pointer-events-auto w-[min(92vw,390px)] rounded-2xl border border-slate-300 bg-white p-6 text-center shadow-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">
                Delete {sectionName}
              </p>

              <h3 className="mt-2 text-xl font-semibold text-slate-950">
                Are you sure you want to delete {label} section?
              </h3>

              <div className="mt-6 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  className="rounded-full bg-red-600 px-7 py-2 text-sm font-semibold text-white hover:bg-red-700"
                >
                  Yes
                </button>

                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(false)}
                  className="rounded-full border border-slate-300 px-7 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}

      <div
        className="relative z-0"
        onClick={handleInlineTextClick}
        onBlur={handleInlineTextBlur}
        onKeyDown={handleInlineTextKeyDown}
      >
        {children}
      </div>
    </div>
  );
}
