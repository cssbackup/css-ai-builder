"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import React from "react";
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

  return (
    <header
      className="flex h-16 w-full items-center px-4"
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
          {menu?.items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm text-(--header-text) lg:text-base"
            >
              {item.label}
            </Link>
          ))}
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

        <button className="cursor-pointer text-(--header-text) md:hidden">
          <Menu size={22} />
        </button>
      </div>
    </header>
  );
}
