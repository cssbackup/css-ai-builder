"use client";

import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import React, { useState } from "react";
import { SectionProps } from "./../../../types/section";
import { getBlock, getBlocksByType, resolveSectionBlocks } from "../types/section";
import BlockRenderer from "../blocks/BlockRenderer";

export default function HeaderTwo({ data = {}, blocks }: SectionProps) {
  const resolvedBlocks = resolveSectionBlocks({ blocks, data });
  const logo = getBlock(resolvedBlocks, "logo");
  const menu = getBlock(resolvedBlocks, "menu");
  const buttonBlocks = getBlocksByType(resolvedBlocks, "button");
  const headerSolidColor = data.headerBackgroundColor ?? "var(--header-bg)";
  const headerGradientColor =
    data.headerGradientColor ?? "var(--blue-bg, #0668ff)";
  const headerBackground =
    data.headerBackgroundType === "gradient"
      ? `linear-gradient(90deg, ${headerSolidColor}, ${headerGradientColor})`
      : headerSolidColor;
  const headerTextColor = data.headerTextColor ?? "var(--header-text)";
  const [open, setOpen] = useState(false);

  return (
    <header
      className="relative z-[70] flex min-h-16 w-full items-center px-4"
      style={
        {
          background: headerBackground,
          "--header-text": headerTextColor,
        } as React.CSSProperties
      }
    >
      <div className="flex w-full items-center justify-between gap-4">
        <Link
          href="/"
          className="shrink-0 text-base font-bold text-(--header-text) sm:text-lg"
        >
          {logo?.text}
        </Link>

        <nav className="hidden items-center gap-4 md:flex lg:gap-6">
          {menu?.items.map((item) => {
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
                          className="block whitespace-nowrap px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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

        {!!buttonBlocks.length && (
          <div className="hidden items-center gap-2 md:flex">
            {buttonBlocks.map((button) => (
              <BlockRenderer
                key={button.id}
                block={button}
                className="bg-(--primary-link-bg) px-4 py-2 text-sm font-medium text-(--primary-link-color)"
              />
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
        <div
          className="absolute left-0 top-16 z-[1000] w-full border-t px-4 py-4 shadow-lg md:hidden"
          style={{ background: headerBackground }}
        >
          <nav className="flex flex-col gap-3">
            {menu?.items.map((item) => {
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

            {!!buttonBlocks.length &&
              buttonBlocks.map((button) => (
                <BlockRenderer
                  key={button.id}
                  block={button}
                  className="mt-2 inline-flex w-fit bg-(--primary-link-bg) px-4 py-2 text-sm font-medium text-(--primary-link-color)"
                />
              ))}
          </nav>
        </div>
      )}
    </header>
  );
}
