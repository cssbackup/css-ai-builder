"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { SectionProps } from "../../../types/section";

export default function Header1({
    data = {},
    solidBackground = false,
}: SectionProps & { solidBackground?: boolean }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const scrollContainer = document.querySelector<HTMLElement>(
            "[data-template-scroll]",
        );
        const scrollTarget: Window | HTMLElement = scrollContainer ?? window;
        const handleScroll = () => {
            const scrollTop = scrollContainer?.scrollTop ?? window.scrollY;
            setIsScrolled(scrollTop > 50);
        };

        handleScroll();
        scrollTarget.addEventListener("scroll", handleScroll, { passive: true });

        return () => scrollTarget.removeEventListener("scroll", handleScroll);
    }, []);

    const isActive = isScrolled || solidBackground;

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 px-10 py-5 flex items-center justify-between font-sans transition-all duration-300 ${isActive
                ? "bg-[#f4f2ef] text-black shadow-sm"
                : "bg-transparent text-white"
                }`}
        >
            <div className="flex items-center gap-3">
                {data.logoImage && (
                    <Image
                        src={data.logoImage}
                        alt={data.logoImageTitle ?? data.logo ?? "Logo"}
                        width={32}
                        height={32}
                        className="w-8 h-8 object-contain transition-all duration-300"
                    />
                )}
                <span className="text-xl font-medium tracking-widest">{data.logo}</span>
            </div>

            <nav className="hidden md:flex items-center gap-8 text-[10px] tracking-[0.15em] uppercase">
                {data.menu?.map((item, index) => (
                    <Link
                        key={index}
                        href={item.href}
                        className={`transition-colors ${isActive ? "hover:text-gray-800" : "hover:text-gray-300"
                            }`}
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>

            <button
                type="button"
                className="md:hidden z-[60] flex flex-col gap-1.5"
                onClick={() => setIsOpen((open) => !open)}
                aria-label="Toggle navigation menu"
                aria-expanded={isOpen}
            >
                <div className={`w-6 h-0.5 transition-all ${isActive ? "bg-black" : "bg-white"} ${isOpen ? "rotate-45 translate-y-2" : ""}`}></div>
                <div className={`w-6 h-0.5 transition-all ${isActive ? "bg-black" : "bg-white"} ${isOpen ? "opacity-0" : ""}`}></div>
                <div className={`w-6 h-0.5 transition-all ${isActive ? "bg-black" : "bg-white"} ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}></div>
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-[#f4f2ef] text-black flex flex-col items-center justify-center gap-8 text-lg uppercase tracking-[0.2em] z-50">
                    {data.menu?.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="hover:text-gray-500"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            )}

            <div className="hidden md:flex items-center gap-8 text-[10px] tracking-[0.15em] uppercase">
                {data.buttons?.map((btn, index) => (
                    <Link
                        key={index}
                        href={btn.href}
                        className={`transition-all duration-300 ${btn.variant === "primary"
                            ? isActive
                                ? "bg-[#ba3022] text-white border border-[#ba3022] px-4 py-2 hover:bg-[#9a261a]"
                                : "border border-white px-4 py-2 hover:bg-white hover:text-black"
                            : isActive
                                ? "hover:text-gray-500"
                                : "hover:text-gray-300"
                            }`}
                    >
                        {btn.label}
                    </Link>
                ))}
            </div>
        </header>
    );
}
