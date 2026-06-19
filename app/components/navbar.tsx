"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, User, ChevronDown } from "lucide-react";

export default function Navbar() {
  const navItems = [
    { label: "Home", title: "Go to Homepage" },
    { label: "Features", title: "Explore Features" },
    { label: "Templates", title: "Browse Templates" },
    { label: "Pricing", title: "View Pricing Plans" },
    { label: "Resources", title: "Access Resources" },
  ];

  const languages = [
    {
      code: "EN",
      name: "English",
      flag: "https://flagcdn.com/w40/gb.png",
    },
    {
      code: "FR",
      name: "French",
      flag: "https://flagcdn.com/w40/fr.png",
    },
    {
      code: "AR",
      name: "Arabic",
      flag: "https://flagcdn.com/w40/sa.png",
    },
    {
      code: "HI",
      name: "Hindi",
      flag: "https://flagcdn.com/w40/in.png",
    },
  ];

  const [activeItem, setActiveItem] = useState("Home");
  const [isOpen, setIsOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  return (
    <nav className="fixed top-0 z-12 w-full bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src="/logo.png"
              alt="Nav logo"
              width={90}
              height={90}
              className="h-11 w-auto"
              priority
            />
          </Link>

          <div className="flex gap-4 ">
            <div className="flex items-center gap-30 lg:gap-10 xl:gap-25">
              <div className="hidden h-16 items-center gap-8 lg:flex">
                {navItems.map((item) => {
                  const isActive = activeItem === item.label;

                  return (
                    <a
                      key={item.label}
                      href="#"
                      title={item.title}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveItem(item.label);
                      }}
                      className={`flex h-full items-center border-b-2 px-0 text-[14px] font-semibold transition-colors duration-150 ${
                        isActive
                          ? "border-red-600 text-red-600"
                          : "border-transparent text-black hover:border-red-600 hover:text-red-600"
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </div>

              <div className="flex items-center gap-4 sm:gap-3 ">
                <div className="flex items-center gap-3">
                  <div className="relative inline-block">
                    <button
                      type="button"
                      onClick={() => setLanguageOpen(!languageOpen)}
                      className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm cursor-pointer"
                    >
                      <Image
                        src={selectedLanguage.flag}
                        alt={selectedLanguage.name}
                        width={16}
                        height={16}
                        className="h-4 w-6 rounded-sm object-contain"
                      />

                      <span className="text-sm font-medium text-gray-700">
                        {selectedLanguage.code}
                      </span>

                      <ChevronDown
                        size={15}
                        className={`text-gray-500 transition ${
                          languageOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {languageOpen && (
                      <div className="absolute left-0 top-full z-50 mt-2 w-[140px] rounded-2xl bg-white overflow-hidden  shadow-xl ring-1 ring-gray-100">
                        {languages.map((language) => (
                          <button
                            key={language.code}
                            type="button"
                            onClick={() => {
                              setSelectedLanguage(language);
                              setLanguageOpen(false);
                            }}
                            className="flex w-full items-center gap-3 px-4 py-3 text-left cursor-pointer transition hover:bg-gray-100"
                          >
                            <Image
                              src={language.flag}
                              alt={language.name}
                              width={24}
                              height={24}
                              className="rounded-sm object-cover"
                            />

                            <span className="text-[15px] font-medium text-gray-700">
                              {language.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <a
                    href="#"
                    className="flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-red-600"
                    title="Login"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-red-700">
                      <User size={22} className="text-white" />
                    </span>
                  </a>
                </div>

                <Link
                  href="#"
                  className="hidden cursor-pointer rounded-md bg-red-700 px-6 py-3 font-medium text-white lg:block lg:text-sm"
                  title="Start Now"
                >
                  Get Started Free
                </Link>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex cursor-pointer items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 lg:hidden"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`border-t border-gray-200 bg-white transition-all duration-200 lg:hidden ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="space-y-2 px-4 py-4">
          {navItems.map((item) => {
            const isActive = activeItem === item.label;

            return (
              <a
                key={item.label}
                href="#"
                title={item.title}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveItem(item.label);
                  setIsOpen(false);
                }}
                className={`block border-b-2 text-[14px] font-semibold transition-colors duration-150 ${
                  isActive
                    ? "border-red-700 text-red-700"
                    : "border-transparent text-gray-600 hover:text-red-600"
                }`}
              >
                {item.label}
              </a>
            );
          })}

          <button
            className="w-full rounded-md bg-red-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-red-700"
            title="Start Now"
          >
            Get Started Free
          </button>
        </div>
      </div>
    </nav>
  );
}
