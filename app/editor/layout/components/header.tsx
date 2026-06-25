"use client";
import Link from "next/link";
import Image from "next/image";
import { Menu, ChevronRight } from "lucide-react";

export default function Navbar() {
  return (
    <header className="flex h-16 w-full items-center justify-between px-4 bg-(--header-bg)">
      <div className="flex justify-between items-center w-full ">
        <div className="font-semibold ">
          <Link href="/" className="text-(--header-text) text-md">
            AeroHead1
          </Link>
        </div>

        <nav className="hidden items-center gap-6 p-2 md:flex ">
          <Link
            href="#"
            className="text-md flex items-center gap-2 text-(--header-text)"
          >
            Home
          </Link>
          <Link
            href="#"
            className="text-md flex items-center gap-2 text-(--header-text)"
          >
            About
          </Link>

          <Link
            href="#"
            className="text-md flex items-center gap-2 text-(--header-text)"
          >
            Services
          </Link>
          <Link
            href="#"
            className="text-md flex items-center gap-2 text-(--header-text)"
          >
            Contact Us
          </Link>
        </nav>
        <div className="hidden md:flex">
          <Link
            href="#"
            className="px-3 py-3 bg-gray-50 flex items-center gap-1 text-black text-sm font-semibold"
          >
            Get early access
            <ChevronRight size="17" className="font-extrabold" />
          </Link>
        </div>
      </div>
      <button className="md:hidden cursor-pointer">
        <Menu size={22} />
      </button>
    </header>
  );
}
