"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronRight, ChevronDown } from "lucide-react";
import { SectionProps } from "./../../../types/section";

export default function HeaderOne({ data }: SectionProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative w-full bg-(--header-bg) px-4">
      <div className="mx-auto flex h-16 w-full items-center justify-between gap-4">
        <Link
          href="/"
          className="shrink-0 text-base font-semibold text-(--header-text) sm:text-lg"
        >
          {data.logo}
        </Link>

        <nav className="hidden items-center gap-4 md:flex lg:gap-6">
          {data.menu?.map((item) => {
            const hasDropdown = !!item.children?.length;

            return (
              <div key={item.label} className="group/item relative">
                <Link
                  href={item.href}
                  className="flex items-center gap-1 text-sm text-(--header-text) lg:text-base"
                >
                  {item.label}

                  {hasDropdown && (
                    <ChevronDown
                      size={15}
                      className="transition-transform duration-200 group-hover/item:rotate-180"
                    />
                  )}
                </Link>

                {hasDropdown && (
                  <div className="invisible absolute left-0 top-full z-[1000] pt-2 opacity-0 transition-all duration-200 group-hover/item:visible group-hover/item:opacity-100">
                    <div className="min-w-44 rounded-md border bg-white py-2 shadow-lg">
                      {item.children?.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {!!data.buttons?.length && (
          <div className="hidden items-center gap-2 md:flex">
            {data.buttons.map((button) => (
              <Link
                key={button.label}
                href={button.href}
                className="flex items-center gap-1 rounded bg-(--primary-link-bg) px-3 py-2 text-sm font-semibold text-(--primary-link-color)"
              >
                {button.label}
              </Link>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="cursor-pointer text-(--header-text) md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="absolute left-0 top-16 z-[1000] w-full border-t bg-(--header-bg) px-4 py-4 shadow-lg md:hidden">
          <nav className="flex flex-col gap-3">
            {data.menu?.map((item) => {
              const hasDropdown = !!item.children?.length;

              return (
                <div key={item.label} className="flex flex-col gap-2">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-2 text-sm font-medium text-(--header-text)"
                  >
                    {item.label}
                    {hasDropdown && <ChevronDown size={15} />}
                  </Link>

                  {hasDropdown && (
                    <div className="ml-4 flex flex-col gap-1 border-l pl-3">
                      {item.children?.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={() => setOpen(false)}
                          className="py-2 text-sm text-(--header-text)/80"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {!!data.buttons?.length &&
              data.buttons.map((button) => (
                <Link
                  key={button.label}
                  href={button.href}
                  onClick={() => setOpen(false)}
                  className="mt-2 inline-flex w-fit items-center gap-1 rounded bg-(--primary-link-bg) px-3 py-2 text-sm font-semibold text-(--primary-link-color)"
                >
                  {button.label}
                </Link>
              ))}
          </nav>
        </div>
      )}
    </header>
  );
}
