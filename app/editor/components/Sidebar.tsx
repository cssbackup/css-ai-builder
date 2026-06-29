"use client";

import { useState } from "react";
import {
  House,
  LayoutPanelLeft,
  PanelsTopLeft,
  Palette,
  Type,
  SearchCheck,
  Settings2,
  LogOut,
  FileText,
  Monitor,
  Layers3,
  ArrowRight,
  X,
} from "lucide-react";

const sidebarItems = [
  {
    label: "Home",
    icon: House,
  },
  {
    label: "Section",
    icon: LayoutPanelLeft,
    children: [
      { label: "Home", icon: House },
      { label: "Hero Section", icon: PanelsTopLeft },
      { label: "Features", icon: Layers3 },
      { label: "Testimonials", icon: Monitor },
      { label: "Footer", icon: FileText },
    ],
  },
  {
    label: "Theme Color",
    icon: Palette,
  },
  {
    label: "Theme Fonts",
    icon: Type,
  },
  {
    label: "SEO",
    icon: SearchCheck,
    children: [
      { label: "Meta Tags", icon: FileText },
      { label: "Open Graph", icon: Monitor },
      { label: "Schema Markup", icon: Layers3 },
      { label: "Sitemap", icon: FileText },
      { label: "Robots.txt", icon: FileText },
    ],
  },
  {
    label: "Settings",
    icon: Settings2,
  },
  {
    label: "Logout",
    icon: LogOut,
  },
];

type SidebarProps = {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (value: boolean) => void;
};

export default function Sidebar({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}: SidebarProps) {
  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/30 md:hidden">
          <aside className="relative h-full w-64 border-r border-black bg-white">
            <div className="flex h-14 items-center justify-between border-b border-black px-4">
              <span className="underline">Menu</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="cursor-pointer"
              >
                <X size={22} />
              </button>
            </div>

            <SidebarContent collapsed={false} />
          </aside>
        </div>
      )}

      <aside
        className={`fixed left-0 top-14 z-40 hidden h-[calc(100vh-3.5rem)] overflow-visible border-r border-gray-200 bg-white transition-all duration-300 md:block ${
          collapsed ? "w-12" : "w-40"
        }`}
      >
        <SidebarContent collapsed={collapsed} />

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-4 top-1/2 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-black bg-black text-white"
        >
          <ArrowRight
            size={18}
            className={`transition-transform ${collapsed ? "" : "rotate-180"}`}
          />
        </button>
      </aside>
    </>
  );
}

function SidebarContent({ collapsed }: { collapsed: boolean }) {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [dropdownTop, setDropdownTop] = useState(0);

  const activeItem = sidebarItems.find((item) => item.label === openItem);

  return (
    <div className="relative flex h-full flex-col overflow-visible p-2">
      <div className="space-y-2 h-full relative pt-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const hasChildren = !!item.children?.length;
          const isLogout = item.label?.toLowerCase() === "logout";

          return (
            <button
              key={item.label}
              onClick={(e) => {
                if (hasChildren) {
                  const buttonTop = e.currentTarget.offsetTop;
                  setDropdownTop(buttonTop);
                  setOpenItem(openItem === item.label ? null : item.label);
                } else {
                  setOpenItem(null);
                }
              }}
              className={`group flex w-full cursor-pointer items-center gap-3 rounded-md px-2 py-2 text-left transition-colors ${
                isLogout
                  ? "mt-auto text-lg bg-red-200 py-3 text-red-500 hover:text-white hover:bg-red-700 absolute bottom-2"
                  : "text-gray-500 bg-white hover:bg-gray-200"
              }`}
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
                <Icon
                  size={16}
                  className={
                    isLogout
                      ? "text-red-500 group-hover:text-white"
                      : "text-gray-600 group-hover:text-gray-600"
                  }
                />
              </span>

              {!collapsed && (
                <>
                  <span
                    className={`text-sm ${
                      isLogout
                        ? "text-red-700 group-hover:text-white"
                        : "text-gray-700 group-hover:text-gray-600 "
                    }`}
                  >
                    {item.label}
                  </span>

                  {hasChildren && (
                    <ArrowRight
                      size={16}
                      className={`ml-auto shrink-0 transition-colors duration-200 ${
                        isLogout
                          ? "text-white"
                          : "text-gray-700 group-hover:text-gray-600"
                      }`}
                    />
                  )}
                </>
              )}
            </button>
          );
        })}
      </div>

      {activeItem?.children && (
        <div
          style={{ top: dropdownTop }}
          className="absolute left-full z-50 ml-2 w-52 rounded border border-gray-300 bg-white p-2 shadow-xl md:w-48"
        >
          <button
            onClick={() => setOpenItem(null)}
            className="absolute right-1 top-1 inline-block cursor-pointer"
          >
            <X size={18} />
          </button>

          <div className="space-y-1">
            {activeItem.children.map((child, index) => {
              const Icon = child.icon;

              return (
                <button
                  key={`${child.label}-${index}`}
                  className="flex w-full cursor-pointer items-center gap-2 rounded-md bg-gray-50/50 px-2 py-2 text-left hover:bg-gray-200"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full">
                    <Icon size={15} />
                  </span>

                  <span className="text-sm">{child.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
