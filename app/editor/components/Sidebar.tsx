"use client";

import { useEffect, useRef, useState } from "react";
import {
  House,
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
  Plus,
} from "lucide-react";

const sidebarItems = [
  {
    label: "Dashboard",
    icon: House,
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

type PageItem = {
  label: string;
  icon: typeof FileText;
};

export default function Sidebar({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}: SidebarProps) {
  const [pages, setPages] = useState<PageItem[]>([
    { label: "Home Page", icon: FileText },
    { label: "About Page", icon: FileText },
    { label: "Contact Page", icon: FileText },
  ]);

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

            <SidebarContent
              collapsed={false}
              pages={pages}
              setPages={setPages}
            />
          </aside>
        </div>
      )}

      <aside
        className={`fixed left-0 top-14 z-40 hidden h-[calc(100vh-3.5rem)] overflow-visible border-r border-gray-200 bg-white transition-all duration-300 md:block ${
          collapsed ? "w-12" : "w-40"
        }`}
      >
        <SidebarContent
          collapsed={collapsed}
          pages={pages}
          setPages={setPages}
        />

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

function SidebarContent({
  collapsed,
  pages,
  setPages,
}: {
  collapsed: boolean;
  pages: PageItem[];
  setPages: React.Dispatch<React.SetStateAction<PageItem[]>>;
}) {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [dropdownTop, setDropdownTop] = useState(0);
  const [showPageModal, setShowPageModal] = useState(false);
  const [pageName, setPageName] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);

  const updatedSidebarItems = sidebarItems.map((item) =>
    item.label === "Pages" ? { ...item, children: pages } : item,
  );

  const activeItem = updatedSidebarItems.find(
    (item) => item.label === openItem,
  );

  const handleAddPage = () => {
    if (!pageName.trim()) return;

    setPages((prev) => [
      ...prev,
      {
        label: pageName.trim(),
        icon: FileText,
      },
    ]);

    setPageName("");
    setShowPageModal(false);
    setOpenItem("Pages");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenItem(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        ref={dropdownRef}
        className="relative flex h-full flex-col overflow-visible p-2"
      >
        <div className="relative h-full space-y-2 pt-2">
          {updatedSidebarItems.map((item) => {
            const Icon = item.icon;
            const hasChildren = !!item.children?.length;
            const isLogout = item.label.toLowerCase() === "logout";

            return (
              <button
                key={item.label}
                onClick={(e) => {
                  if (hasChildren) {
                    setDropdownTop(e.currentTarget.offsetTop);
                    setOpenItem(openItem === item.label ? null : item.label);
                  } else {
                    setOpenItem(null);
                  }
                }}
                className={`group flex w-full cursor-pointer items-center gap-3 rounded-md px-2 py-2 text-left transition-colors ${
                  isLogout
                    ? "absolute bottom-2 bg-red-200 py-3 text-lg text-red-500 hover:bg-red-700 hover:text-white"
                    : "bg-white text-gray-500 hover:bg-gray-200"
                }`}
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
                  <Icon
                    size={16}
                    className={
                      isLogout
                        ? "text-red-500 group-hover:text-white"
                        : "text-gray-600"
                    }
                  />
                </span>

                {!collapsed && (
                  <>
                    <span
                      className={`text-sm ${
                        isLogout
                          ? "text-red-700 group-hover:text-white"
                          : "text-gray-700"
                      }`}
                    >
                      {item.label}
                    </span>

                    {hasChildren && (
                      <ArrowRight
                        size={16}
                        className="ml-auto shrink-0 text-gray-700"
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
              className="absolute right-1 top-1 cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="space-y-1 pt-5">
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

              {activeItem.label === "Pages" && (
                <button
                  onClick={() => setShowPageModal(true)}
                  className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-black px-3 py-2 text-sm text-white hover:bg-gray-800"
                >
                  <Plus size={15} />
                  Add More
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {showPageModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="w-[90%] max-w-md rounded-xl bg-white p-5 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Add New Page
              </h2>

              <button
                onClick={() => setShowPageModal(false)}
                className="cursor-pointer rounded-full bg-gray-100 p-1 hover:bg-gray-200"
              >
                <X size={18} />
              </button>
            </div>

            <input
              value={pageName}
              onChange={(e) => setPageName(e.target.value)}
              placeholder="Enter page name"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black"
            />

            <button
              onClick={handleAddPage}
              className="mt-4 w-full cursor-pointer rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
            >
              Add Page
            </button>
          </div>
        </div>
      )}
    </>
  );
}
