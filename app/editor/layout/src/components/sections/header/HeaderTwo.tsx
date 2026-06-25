"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { SectionProps } from "./../../../types/section";

export default function HeaderTwo({ data }: SectionProps) {
  return (
    <header className="flex h-16 w-full items-center bg-blue-400 px-4">
      <div className="flex w-full items-center justify-between gap-4">
        <Link
          href="/"
          className="shrink-0 text-base font-bold text-(--header-text) sm:text-lg"
        >
          {data.logo}
        </Link>

        <nav className="hidden items-center gap-4 md:flex lg:gap-6">
          {data.menu?.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm text-(--header-text) lg:text-base"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {!!data.buttons?.length && (
          <div className="hidden items-center gap-2 md:flex">
            {data.buttons.map((button) => (
              <Link
                key={button.label}
                href={button.href}
                className="bg-(--primary-link-bg) px-4 py-2 text-sm font-medium text-(--primary-link-color)"
              >
                {button.label}
              </Link>
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