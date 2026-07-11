"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  Eye,
  ChevronRight,
  Edit,
  SwatchBook,
  LaptopMinimal,
  Smartphone,
  ChevronDown,
  EyeOff,
  Trash,
} from "lucide-react";
import { usePreview } from "../layout/src/components/context/PreviewContext";

const MAX_PAGE_ITEMS = 7;
const MAX_DROPDOWN_ITEMS = 10;

const createPageHref = (label: string) => {
  const slug = label.trim().toLowerCase().replace(/\s+/g, "-");

  return slug === "home" ? "#" : `#${slug}`;
};

type HeaderProps = {
  onMenuClick: () => void;
};

export default function Navbar({ onMenuClick }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [pageToDelete, setPageToDelete] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const {
    currentPage,
    isPreview,
    pageLinks,
    setCurrentPage,
    setPageLinks,
    togglePreview,
    viewportMode,
    setViewportMode,
  } = usePreview();
  const [showPopup, setShowPopup] = useState(false);
  const [newPageName, setNewPageName] = useState("");
  const [expandedPageLabel, setExpandedPageLabel] = useState<string | null>(
    null,
  );
  const [dropdownParentForNew, setDropdownParentForNew] = useState<
    string | null
  >(null);
  const [newDropdownName, setNewDropdownName] = useState("");
  const [dropdownToDelete, setDropdownToDelete] = useState<{
    parentLabel: string;
    childIndex: number;
    childLabel: string;
  } | null>(null);

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

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEditPage = (page: string) => {
    setOpen(false);
    setCurrentPage(page);
  };

  const handleDeletePage = (page: string) => {
    setOpen(false);
    setPageToDelete(page);
  };

  const openAddDropdownPopup = (page: string) => {
    const parentPage = pageLinks.find((item) => item.label === page);
    if ((parentPage?.children?.length ?? 0) >= MAX_DROPDOWN_ITEMS) return;

    setDropdownParentForNew(page);
    setNewDropdownName("");
    setExpandedPageLabel(page);
  };

  const closeDropdownPopup = () => {
    setDropdownParentForNew(null);
    setNewDropdownName("");
  };

  const handleCreateDropdownLink = () => {
    if (!dropdownParentForNew || !newDropdownName.trim()) return;

    const trimmedDropdownName = newDropdownName.trim();

    setPageLinks(
      pageLinks.map((item) => {
        if (item.label !== dropdownParentForNew) return item;

        const children = item.children ?? [];
        if (children.length >= MAX_DROPDOWN_ITEMS) return item;

        return {
          ...item,
          children: [
            ...children,
            {
              label: trimmedDropdownName,
              href: createPageHref(trimmedDropdownName),
            },
          ],
        };
      }),
    );
    setExpandedPageLabel(dropdownParentForNew);
    closeDropdownPopup();
  };

  const handleConfirmDeleteDropdown = () => {
    if (!dropdownToDelete) return;

    setPageLinks(
      pageLinks.map((item) => {
        if (item.label !== dropdownToDelete.parentLabel) return item;

        const nextChildren = (item.children ?? []).filter(
          (_, index) => index !== dropdownToDelete.childIndex,
        );

        return {
          ...item,
          children: nextChildren.length ? nextChildren : undefined,
        };
      }),
    );
    if (currentPage === dropdownToDelete.childLabel) {
      setCurrentPage(dropdownToDelete.parentLabel);
    }
    setDropdownToDelete(null);
  };

  const handleConfirmDeletePage = () => {
    if (!pageToDelete) return;

    setPageLinks(pageLinks.filter((item) => item.label !== pageToDelete));

    if (currentPage === pageToDelete) {
      const nextPage = pageLinks.find((item) => item.label !== pageToDelete);
      setCurrentPage(nextPage?.label ?? "");
    }

    setPageToDelete(null);
  };

  const closePagePopup = () => {
    setShowPopup(false);
    setNewPageName("");
  };

  const addNewPage = () => {
    setShowPopup(true);
    setOpen(false);
  };

  const handleCreatePage = () => {
    if (!newPageName.trim() || pageLinks.length >= MAX_PAGE_ITEMS) return;

    const trimmedPageName = newPageName.trim();
    const normalizedPageName = trimmedPageName.toLowerCase();
    const alreadyExists = pageLinks.some(
      (page) => page.label.trim().toLowerCase() === normalizedPageName,
    );

    if (alreadyExists) return;

    setPageLinks([
      ...pageLinks,
      { label: trimmedPageName, href: createPageHref(trimmedPageName) },
    ]);
    setCurrentPage(trimmedPageName);
    window.dispatchEvent(
      new CustomEvent("ai-builder-page-added", {
        detail: {
          label: trimmedPageName,
          href: createPageHref(trimmedPageName),
        },
      }),
    );

    setNewPageName("");
    setShowPopup(false);
  };

  const canAddMorePages = pageLinks.length < MAX_PAGE_ITEMS;

  return (
    <header className="fixed left-0 top-0 z-[9000] flex h-14 w-full items-center justify-between border-b border-gray-200 bg-white/95 px-4 shadow-sm backdrop-blur transition-all duration-300">
      <div className="flex justify-between items-center w-full ">
        <div className="flex items-center gap-8">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Nav logo"
              width={90}
              height={90}
              className="h-9 w-auto"
              priority
            />
          </Link>

          <div ref={dropdownRef} className="relative z-[100]">
            <div className="flex items-center gap-2 rounded-xl border border-gray-300 bg-gray-50/80 px-4 py-1 shadow-sm transition-all duration-300 hover:border-slate-400 hover:bg-white">
              <span className="text-md font-medium text-gray-900">Page :</span>

              <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="flex h-8 min-w-[30px] items-center justify-center gap-1 rounded-lg border border-gray-200 bg-white px-2 text-sm font-medium text-gray-800 shadow-sm transition-all duration-300 hover:border-slate-400 hover:shadow"
              >
                {currentPage || "Page"}

                <ChevronDown
                  size={20}
                  className={`text-slate-600 transition-transform ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            {open && (
              <div className="absolute -right-30 top-[50px] z-[9010] overflow-visible border-2 border-slate-200 bg-white shadow-2xl animate-editor-pop">
                {pageLinks.map((page) => {
                  const isExpanded = expandedPageLabel === page.label;
                  const dropdownLinks = page.children ?? [];
                  const canAddDropdownLinks =
                    dropdownLinks.length < MAX_DROPDOWN_ITEMS;

                  return (
                    <div
                      key={page.label}
                      className="relative border-b border-slate-200 text-sm font-medium text-slate-800 last:border-b-0"
                    >
                      <div className="flex h-14 w-full items-center gap-8 px-2 transition-colors duration-200 hover:bg-slate-50 hover:text-black">
                        <div className="flex min-w-0 flex-1 items-center gap-2">
                          <ChevronRight
                            size={15}
                            className="shrink-0 text-slate-700"
                          />

                          <button
                            type="button"
                            onClick={() => {
                              setCurrentPage(page.label);
                              setOpen(false);
                            }}
                            className="flex min-w-0 flex-1 text-left"
                          >
                            <span className="min-w-0 flex-1 truncate font-semibold">
                              {page.label}
                            </span>
                          </button>
                        </div>

                        <div className="flex items-baseline gap-2">
                          <button
                            type="button"
                            aria-label={`${isExpanded ? "Hide" : "Show"} ${page.label} dropdown links`}
                            onClick={() =>
                              setExpandedPageLabel(
                                isExpanded ? null : page.label,
                              )
                            }
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-slate-300 bg-slate-100 text-slate-600 shadow-sm transition hover:bg-slate-200 ${
                              isExpanded
                                ? "ring-1 ring-blue-600 text-blue-600"
                                : ""
                            }`}
                          >
                            <ChevronRight
                              size={16}
                              className="text-slate-800"
                            />
                          </button>

                          {page.label !== currentPage && (
                            <button
                              type="button"
                              aria-label={`Edit ${page.label}`}
                              onClick={() => handleEditPage(page.label)}
                              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-slate-300 bg-slate-100 text-slate-600 transition-all duration-200 hover:bg-slate-200 hover:shadow-sm"
                            >
                              <Edit size={16} />
                            </button>
                          )}

                          {page.label.toLowerCase() !== "home" && (
                            <button
                              type="button"
                              aria-label={`Delete ${page.label}`}
                              onClick={() => handleDeletePage(page.label)}
                              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-slate-300 bg-slate-100 text-red-600 transition-all duration-200 hover:bg-red-50 hover:shadow-sm"
                            >
                              <Trash size={16} />
                            </button>
                          )}
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="absolute left-[calc(100%+8px)] top-0 z-[9020] border border-slate-200 bg-white shadow-2xl animate-editor-pop">
                          <div className="max-h-64 overflow-y-auto">
                            {dropdownLinks.map((child, childIndex) => (
                              <div
                                key={`${page.label}-${childIndex}-${child.label}`}
                                className="flex min-h-12 items-center gap-3 border-b border-slate-100 px-2 text-[16px] text-slate-800 last:border-b-0 hover:bg-slate-50"
                              >
                                <ChevronRight
                                  size={10}
                                  className="shrink-0 text-slate-700"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    setCurrentPage(child.label);
                                    setOpen(false);
                                  }}
                                  className="min-w-0 flex-1 truncate text-left"
                                >
                                  {child.label}
                                </button>

                                <button
                                type="button"
                                aria-label={`Delete ${child.label}`}
                                onClick={() =>
                                  setDropdownToDelete({
                                    parentLabel: page.label,
                                    childIndex,
                                    childLabel: child.label,
                                  })
                                }
                                className="flex h-6 w-6 shrink-0 items-center justify-center rounded border border-slate-300 bg-slate-50 text-red-600 transition hover:bg-red-50"
                              >
                                <Trash size={12} />
                                </button>
                              </div>
                            ))}
                          </div>

                          <div className="flex items-center justify-between gap-2 border-t border-slate-200 p-2">
                            <span className="text-[11px] font-semibold text-slate-500">
                              {dropdownLinks.length}/{MAX_DROPDOWN_ITEMS}
                            </span>
                          <button
                            type="button"
                            disabled={!canAddDropdownLinks}
                            onClick={() => openAddDropdownPopup(page.label)}
                            className={`rounded px-2 py-1.5 text-[10px] font-semibold text-white transition ${
                              canAddDropdownLinks
                                ? "bg-blue-600 hover:bg-blue-700"
                                  : "cursor-not-allowed bg-blue-300"
                              }`}
                            >
                              Add Dropdown
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

                <div className="flex justify-end px-2 py-1">
                  <button
                    disabled={!canAddMorePages}
                    className={`rounded-md px-8 py-2 text-sm font-semibold text-white transition-all duration-200 ${
                      canAddMorePages
                        ? "bg-blue-600 hover:bg-blue-700 hover:shadow-md"
                        : "cursor-not-allowed bg-blue-300"
                    }`}
                    onClick={addNewPage}
                  >
                    Add More{" "}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="hidden md:flex justify-between items-center gap-50">
          {isPreview ? (
            <div className="flex items-center gap-3 bg-gray-100 px-6 py-1 rounded-full">
              <button
                type="button"
                aria-label="Show desktop preview"
                onClick={() => setViewportMode("desktop")}
                className={`rounded px-1 py-1 ${
                  viewportMode === "desktop" ? "bg-white shadow-sm" : ""
                }`}
              >
                <LaptopMinimal size={28} className="text-gray-600" />
              </button>
              <button
                type="button"
                aria-label="Show mobile preview"
                onClick={() => setViewportMode("mobile")}
                className={`rounded px-1 py-1 ${
                  viewportMode === "mobile" ? "bg-white shadow-sm" : ""
                }`}
              >
                <Smartphone size={28} className="text-gray-600" />
              </button>
            </div>
          ) : (
            " "
          )}

          <nav className="hidden items-center gap-6 p-2 md:flex">
            <Link href="#" className="text-sm flex items-center gap-2">
              <SwatchBook size="20" className="text-gray-600" />
              Themes
            </Link>

            <button
              type="button"
              onClick={togglePreview}
              className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-600 transition-all duration-300 hover:bg-gray-200"
            >
              {isPreview ? <Eye size={17} /> : <EyeOff size={17} />}
              Preview
            </button>
            <Link
              href="#"
              className="flex items-center gap-1 rounded-lg bg-blue-500 px-3 py-2 text-sm font-bold text-white transition-all duration-300 hover:bg-blue-600 hover:shadow-md"
            >
              Publish
              <ChevronRight size="17" className="font-extrabold" />
            </Link>
          </nav>
        </div>
      </div>
      <div className="md:hidden flex gap-4">
        <button
          type="button"
          onClick={togglePreview}
          className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-600 transition-all duration-300 hover:bg-gray-200"
        >
          {isPreview ? <Eye size={17} /> : <EyeOff size={17} />}
          Preview
        </button>
        <button className="cursor-pointer" onClick={onMenuClick}>
          <Menu size={22} />
        </button>
      </div>

      {showPopup &&
        createPortal(
          <div
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-white/35 px-4 backdrop-blur-sm animate-editor-fade"
            onClick={closePagePopup}
          >
            <button
              type="button"
              aria-label="Close page popup"
              onClick={closePagePopup}
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-700 shadow-lg transition hover:bg-slate-100"
            >
              ×
            </button>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleCreatePage();
              }}
              onClick={(event) => event.stopPropagation()}
              className="flex w-[min(92vw,440px)] items-center gap-2 animate-editor-pop"
            >
              <input
                type="text"
                value={newPageName}
                onChange={(e) => setNewPageName(e.target.value)}
                placeholder="Enter page name"
                autoFocus
                className="h-11 min-w-0 flex-1 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none shadow-lg focus:border-blue-500"
              />

              <button
                type="submit"
                disabled={!canAddMorePages}
                className={`h-11 shrink-0 rounded-md px-5 text-sm font-semibold text-white shadow-lg ${
                  canAddMorePages
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "cursor-not-allowed bg-blue-300"
                }`}
              >
                Enter
              </button>
            </form>
          </div>,
          document.body,
        )}

      {dropdownParentForNew &&
        createPortal(
          <div
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-white/35 px-4 backdrop-blur-sm animate-editor-fade"
            onClick={closeDropdownPopup}
          >
            <button
              type="button"
              aria-label="Close dropdown popup"
              onClick={closeDropdownPopup}
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-700 shadow-lg transition hover:bg-slate-100"
            >
              ×
            </button>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleCreateDropdownLink();
              }}
              onClick={(event) => event.stopPropagation()}
              className="flex w-[min(92vw,440px)] items-center gap-2 animate-editor-pop"
            >
              <input
                type="text"
                value={newDropdownName}
                onChange={(e) => setNewDropdownName(e.target.value)}
                placeholder="Enter page name"
                autoFocus
                className="h-11 min-w-0 flex-1 rounded-md border border-blue-500 bg-white px-3 text-sm text-slate-900 outline-none shadow-lg"
              />

              <button
                type="submit"
                disabled={!newDropdownName.trim()}
                className={`h-11 shrink-0 rounded-md px-5 text-sm font-semibold text-white shadow-lg ${
                  newDropdownName.trim()
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "cursor-not-allowed bg-blue-300"
                }`}
              >
                Enter
              </button>
            </form>
          </div>,
          document.body,
        )}

      {pageToDelete &&
        createPortal(
          <div className="pointer-events-none fixed inset-0 z-[10001] flex items-center justify-center px-4">
            <div className="pointer-events-auto w-[min(92vw,390px)] rounded-2xl border border-slate-300 bg-white p-6 text-center shadow-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">
                Delete {pageToDelete}
              </p>

              <h3 className="mt-2 text-xl font-semibold leading-7 text-slate-950">
                Are you sure you want to delete {pageToDelete} button?
              </h3>

              <div className="mt-6 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={handleConfirmDeletePage}
                  className="rounded-full bg-red-600 px-7 py-2 text-sm font-semibold text-white hover:bg-red-700"
                >
                  Yes
                </button>

                <button
                  type="button"
                  onClick={() => setPageToDelete(null)}
                  className="rounded-full border border-slate-300 px-7 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}

      {dropdownToDelete &&
        createPortal(
          <div className="pointer-events-none fixed inset-0 z-[10001] flex items-center justify-center px-4">
            <div className="pointer-events-auto w-[min(92vw,390px)] rounded-2xl border border-slate-300 bg-white p-6 text-center shadow-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">
                Delete {dropdownToDelete.childLabel}
              </p>

              <h3 className="mt-2 text-xl font-semibold leading-7 text-slate-950">
                Are you sure you want to delete {dropdownToDelete.childLabel} button?
              </h3>

              <div className="mt-6 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={handleConfirmDeleteDropdown}
                  className="rounded-full bg-red-600 px-7 py-2 text-sm font-semibold text-white hover:bg-red-700"
                >
                  Yes
                </button>

                <button
                  type="button"
                  onClick={() => setDropdownToDelete(null)}
                  className="rounded-full border border-slate-300 px-7 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </header>
  );
}
