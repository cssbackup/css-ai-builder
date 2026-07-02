"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
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

const pages = ["Home", "About", "Services", "Product", "Contact"];

type HeaderProps = {
  onMenuClick: () => void;
};

export default function Navbar({ onMenuClick }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState("Home");
  const [pageItems, setPageItems] = useState(pages);
  const [pageToDelete, setPageToDelete] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { isPreview, togglePreview } = usePreview();

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

  const getPageEditHref = (page: string) =>
    `/editor/layout?page=${page.toLowerCase()}`;

  const handleEditPage = (page: string) => {
    setOpen(false);
    router.push(getPageEditHref(page));
  };

  const handleDeletePage = (page: string) => {
    setOpen(false);
    setPageToDelete(page);
  };

  const handleConfirmDeletePage = () => {
    if (!pageToDelete) return;

    setPageItems((prevPages) => {
      const nextPages = prevPages.filter((item) => item !== pageToDelete);

      if (selectedPage === pageToDelete) {
        setSelectedPage(nextPages[0] ?? "");
      }

      return nextPages;
    });

    setPageToDelete(null);
  };

  return (
    <header className="fixed left-0 top-0 z-20 flex h-14 w-full items-center justify-between border-b border-gray-200 px-4">
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
            <div className="flex items-center gap-2 rounded-xl border border-gray-300 bg-gray-50/80 px-4 py-1">
              <span className="text-md font-medium text-gray-900">Page :</span>

              <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="flex h-8 min-w-[30px] items-center justify-center gap-1 rounded-lg border border-gray-200 bg-white px-2 text-sm font-medium text-gray-800"
              >
                {selectedPage || "Page"}

                <ChevronDown
                  size={20}
                  className={`text-slate-600 transition-transform ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            {open && (
              <div className="absolute -right-22 top-[50px] z-[200] w-[220px] border-2 border-slate-200 bg-white">
                {pageItems.map((page) => (
                  <div
                    key={page}
                    className="flex w-full items-center gap-2 border-b border-slate-200 px-2 py-3 text-sm font-medium text-slate-800 last:border-b-0 hover:bg-slate-50 hover:text-black"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPage(page);
                        setOpen(false);
                      }}
                      className="flex min-w-0 flex-1 items-center gap-1 text-left"
                    >
                      <ChevronRight size={14} className="text-slate-800" />

                      <span className="min-w-0 flex-1 truncate">{page}</span>
                    </button>

                    {page !== "Home" && (
                      <button
                        type="button"
                        aria-label={`Edit ${page}`}
                        onClick={() => handleEditPage(page)}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-slate-300 bg-slate-100 text-slate-600 hover:bg-slate-200"
                      >
                        <Edit size={16} />
                      </button>
                    )}

                    <button
                      type="button"
                      aria-label={`Delete ${page}`}
                      onClick={() => handleDeletePage(page)}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-slate-300 bg-slate-100 text-red-600 hover:bg-red-50"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="hidden md:flex justify-between items-center gap-50">
          {isPreview ? (
            <div className="flex items-center gap-3 bg-gray-100 px-6 py-1 rounded-full">
              <Link href="/">
                <LaptopMinimal
                  size={28}
                  className="text-gray-600 py-1 rounded"
                />
              </Link>
              <Link href="/">
                {" "}
                <Smartphone size={28} className="text-gray-600 py-1 rounded" />
              </Link>
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
              className="px-3 py-2 bg-gray-100 flex items-center gap-2 text-gray-600 rounded-lg text-sm"
            >
              {isPreview ? <Eye size={17} /> : <EyeOff size={17} />}
              Preview
            </button>
            <Link
              href="#"
              className="px-3 py-2 bg-blue-500 flex items-center gap-1 rounded-lg text-white text-sm font-bold"
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
          className="px-3 py-2 bg-gray-100 flex items-center gap-2 text-gray-600 rounded-lg text-sm"
        >
          {isPreview ? <Eye size={17} /> : <EyeOff size={17} />}
          Preview
        </button>
        <button className="cursor-pointer" onClick={onMenuClick}>
          <Menu size={22} />
        </button>
      </div>

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
    </header>
  );
}
