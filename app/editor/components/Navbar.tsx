"use client";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  Eye,
  ChevronRight,
  PenTool,
  SwatchBook,
  LaptopMinimal,
  Smartphone,
} from "lucide-react";

type HeaderProps = {
  onMenuClick: () => void;
};

export default function Navbar({ onMenuClick }: HeaderProps) {
  return (
    <header className="fixed left-0 top-0 z-20 flex h-14 w-full items-center justify-between border-b border-gray-200 px-4">
      <div className="flex justify-between items-center w-full ">
        <div className="font-semibold ">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Nav logo"
              width={90}
              height={90}
              className="h-9 w-auto "
              priority
            />
          </Link>
        </div>

        <div className="hidden md:flex justify-between items-center gap-50">
          <div className="flex items-center gap-3 ">
            <Link href="/">
              <LaptopMinimal
                size={38}
                className="text-gray-500 bg-gray-50 border border-gray-200 py-2 rounded"
              />
            </Link>
            <Link href="/">
              {" "}
              <Smartphone
                size={38}
                className="text-gray-500 bg-gray-50 border border-gray-200 py-2 rounded"
              />
            </Link>
          </div>

          <nav className="hidden items-center gap-6 p-2 md:flex">
            <Link href="#" className="text-sm flex items-center gap-2">
              <SwatchBook size="20" className="text-gray-600" />
              Themes
            </Link>
            <Link href="#" className="text-sm flex items-center gap-2">
              <PenTool size="20" className="text-gray-600" />
              Customize
            </Link>
            <Link
              href="#"
              className="px-3 py-2 bg-gray-100 flex items-center gap-2 text-gray-600 rounded-lg text-sm"
            >
              <Eye size="17" />
              Preview
            </Link>
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
      <button className="md:hidden cursor-pointer" onClick={onMenuClick}>
        <Menu size={22} />
      </button>
    </header>
  );
}
