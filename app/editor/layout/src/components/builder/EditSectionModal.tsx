"use client";

import { useState } from "react";
import { Menu, X, Plus, Trash, ChevronDown } from "lucide-react";

type MenuItem = {
  label: string;
  href: string;
  children?: MenuItem[];
};

type SectionItem = {
  type: string;
  variant: string;
  data: {
    menu?: MenuItem[];
    [key: string]: unknown;
  };
};

type EditSectionModalProps = {
  sectionType: string;
  sections: SectionItem[];
  onClose: () => void;
  onSelectVariant: (type: string, variant: string) => void;
  onUpdateSectionData: (type: string, newData: Record<string, unknown>) => void;
};

const headerLayouts = [
  { id: "header-1", name: "Header 1" },
  { id: "header-2", name: "Header 2" },
];

const MAX_MENU_LINKS = 7;

const sidebarItems = [
  "Header Layout",
  "Logo Settings",
  "Navigation Menu",
  "Header Buttons",
  "Social Icons",
  "Color Settings",
];

export default function EditSectionModal({
  sectionType,
  sections,
  onClose,
  onSelectVariant,
  onUpdateSectionData,
}: EditSectionModalProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Header Layout");

  const currentSection = sections.find((item) => item.type === sectionType);
  const activeVariant = currentSection?.variant ?? "header-1";

  const activeHeaderData = currentSection?.data?.[activeVariant] as
    | {
        logo?: string;
        menu?: MenuItem[];
        buttons?: { label: string; href: string }[];
      }
    | undefined;

  const menuItems = activeHeaderData?.menu ?? [];

  const updateActiveHeaderData = (newData: Record<string, unknown>) => {
    if (!currentSection || !activeHeaderData) return;

    onUpdateSectionData(sectionType, {
      ...currentSection.data,
      [activeVariant]: {
        ...activeHeaderData,
        ...newData,
      },
    });
  };

  const updateMenuItem = (
    index: number,
    field: keyof MenuItem,
    value: string,
  ) => {
    const updatedMenu = menuItems.map((item, itemIndex) =>
      itemIndex === index ? { ...item, [field]: value } : item,
    );

    updateActiveHeaderData({ menu: updatedMenu });
  };

  const addMenuItem = () => {
    if (menuItems.length >= MAX_MENU_LINKS) return;

    const updatedMenu = [
      ...menuItems,
      {
        label: "New Item",
        href: "/new-item",
      },
    ];

    updateActiveHeaderData({ menu: updatedMenu });
  };

  const addDropdownItem = (menuIndex: number) => {
    const currentDropdowns = menuItems[menuIndex]?.children ?? [];

    if (currentDropdowns.length >= MAX_DROPDOWN_LINKS) return;

    const updatedMenu = menuItems.map((item, itemIndex) =>
      itemIndex === menuIndex
        ? {
            ...item,
            children: [
              ...(item.children ?? []),
              { label: "Dropdown Item", href: "/dropdown-item" },
            ],
          }
        : item,
    );

    updateActiveHeaderData({ menu: updatedMenu });
  };

  const updateDropdownItem = (
    menuIndex: number,
    childIndex: number,
    field: keyof MenuItem,
    value: string,
  ) => {
    const updatedMenu = menuItems.map((item, itemIndex) => {
      if (itemIndex !== menuIndex) return item;

      const updatedChildren = (item.children ?? []).map(
        (child, currentChildIndex) =>
          currentChildIndex === childIndex
            ? { ...child, [field]: value }
            : child,
      );

      return { ...item, children: updatedChildren };
    });

    updateActiveHeaderData({ menu: updatedMenu });
  };

  const deleteDropdownItem = (menuIndex: number, childIndex: number) => {
    const updatedMenu = menuItems.map((item, itemIndex) => {
      if (itemIndex !== menuIndex) return item;

      const updatedChildren = (item.children ?? []).filter(
        (_, currentChildIndex) => currentChildIndex !== childIndex,
      );

      return {
        ...item,
        children: updatedChildren.length ? updatedChildren : undefined,
      };
    });

    updateActiveHeaderData({ menu: updatedMenu });
  };

  const deleteMenuItem = (index: number) => {
    const updatedMenu = menuItems.filter((_, itemIndex) => itemIndex !== index);

    updateActiveHeaderData({ menu: updatedMenu });
  };

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const moveMenuItem = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return;

    const updatedMenu = [...menuItems];
    const [movedItem] = updatedMenu.splice(fromIndex, 1);
    updatedMenu.splice(toIndex, 0, movedItem);

    updateActiveHeaderData({ menu: updatedMenu });
  };

  const MAX_DROPDOWN_LINKS = 10;

  return (
    <div className="fixed inset-0 z-[9999] flex items-end justify-center bg-black/40 p-3">
      <div className="relative flex h-[80vh] w-full max-w-[880px] flex-col overflow-hidden rounded-3xl bg-[#f4f4f5] mx-3 shadow-2xl">
        <div className="relative flex items-center justify-center border-b px-5 py-2">
          <div className="flex items-center gap-3 rounded-full bg-white/90 p-1">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="rounded-full px-4 py-2 text-sm font-semibold text-gray-500"
            >
              Content
            </button>

            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="rounded-full border bg-white px-5 py-2 text-sm font-semibold text-gray-800 shadow-sm"
            >
              Design
            </button>
          </div>
        </div>

        {sidebarOpen && (
          <div className="absolute inset-0 z-[10000]">
            <div
              className="absolute inset-0 bg-black/30"
              onClick={() => setSidebarOpen(false)}
            />

            <aside className="absolute left-0 top-0 h-full w-72 bg-white p-4 shadow-xl">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold">Settings</h3>

                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="rounded-md border p-2"
                >
                  <X size={16} />
                </button>
              </div>

              <SidebarContent
                activeTab={activeTab}
                setActiveTab={(tab) => {
                  setActiveTab(tab);
                  setSidebarOpen(false);
                }}
              />
            </aside>
          </div>
        )}

        <main className="flex-1 overflow-y-auto px-5 py-3 pb-20">
          <div className="mb-3 pb-2 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900">{activeTab}</h3>
            <p className="mt-1 text-xs text-gray-500">
              Customize {activeTab.toLowerCase()} settings
            </p>
          </div>
          {activeTab === "Header Layout" && (
            <div className="space-y-4">
              {headerLayouts.map((layout) => {
                const isActive = currentSection?.variant === layout.id;

                return (
                  <button
                    key={layout.id}
                    type="button"
                    onClick={() => onSelectVariant(sectionType, layout.id)}
                    className={`w-full overflow-hidden rounded-2xl border bg-white text-left ${
                      isActive ? "border-gray-900" : "border-gray-200"
                    }`}
                  >
                    <div className="h-20 bg-gray-100">
                      {layout.id === "header-1" && (
                        <div className="h-full">
                          <div className="flex h-10 items-center justify-between bg-slate-900 px-4">
                            <div className="h-2 w-14 rounded bg-white" />
                            <div className="flex gap-3">
                              <div className="h-1.5 w-9 rounded bg-white" />
                              <div className="h-1.5 w-9 rounded bg-white" />
                              <div className="h-1.5 w-9 rounded bg-white" />
                            </div>
                            <div className="h-5 w-12 rounded-md bg-blue-600" />
                          </div>
                        </div>
                      )}

                      {layout.id === "header-2" && (
                        <div className="flex h-full items-start justify-between bg-slate-900 px-4 py-4">
                          <div className="h-2 w-16 rounded bg-white" />
                          <div className="flex gap-3">
                            <div className="h-1.5 w-9 rounded bg-white" />
                            <div className="h-1.5 w-9 rounded bg-white" />
                            <div className="h-1.5 w-9 rounded bg-white" />
                          </div>
                          <div className="h-5 w-12 rounded-md bg-blue-600" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {activeTab === "Navigation Menu" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="mt-1 text-xs text-gray-700 underline">
                    You can add up to {MAX_MENU_LINKS} menu links.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={addMenuItem}
                  disabled={menuItems.length >= MAX_MENU_LINKS}
                  className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-xs font-medium text-white disabled:bg-gray-300"
                >
                  <Plus size={14} />
                  Add Nav Links
                </button>
              </div>

              <div className="space-y-3">
                {menuItems.map((item, index) => (
                  <div
                    key={index}
                    draggable
                    onDragStart={() => setDraggedIndex(index)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      if (draggedIndex !== null) {
                        moveMenuItem(draggedIndex, index);
                        setDraggedIndex(null);
                      }
                    }}
                    onDragEnd={() => setDraggedIndex(null)}
                    className={`rounded-xl border border-gray-300 bg-white p-3 cursor-grab ${
                      draggedIndex === index ? "opacity-50" : ""
                    }`}
                  >
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-[auto_1fr_1fr_auto]">
                      <button
                        type="button"
                        className="cursor-grab rounded-md border border-gray-300 px-3 py-2 text-sm active:cursor-grabbing"
                        title="Drag menu item"
                      >
                        ⋮⋮
                      </button>

                      <input
                        value={item.label}
                        onChange={(e) =>
                          updateMenuItem(index, "label", e.target.value)
                        }
                        className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
                        placeholder="Menu label"
                      />

                      <input
                        value={item.href}
                        onChange={(e) =>
                          updateMenuItem(index, "href", e.target.value)
                        }
                        className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
                        placeholder="/link"
                      />

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => addDropdownItem(index)}
                          disabled={
                            (item.children?.length ?? 0) >= MAX_DROPDOWN_LINKS
                          }
                          className="rounded-md border border-gray-300 bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
                        >
                          Dropdown
                        </button>

                        <button
                          type="button"
                          onClick={() => deleteMenuItem(index)}
                          className="rounded-md border border-gray-300 bg-red-100 p-2 text-red-700"
                        >
                          <Trash size={15} />
                        </button>
                      </div>
                    </div>

                    {!!item.children?.length && (
                      <div className="mt-3 space-y-2 border-l pl-4">
                        {item.children.map((child, childIndex) => (
                          <div
                            key={childIndex}
                            className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_1fr_auto]"
                          >
                            <input
                              value={child.label}
                              onChange={(e) =>
                                updateDropdownItem(
                                  index,
                                  childIndex,
                                  "label",
                                  e.target.value,
                                )
                              }
                              className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
                              placeholder="Dropdown label"
                            />

                            <input
                              value={child.href}
                              onChange={(e) =>
                                updateDropdownItem(
                                  index,
                                  childIndex,
                                  "href",
                                  e.target.value,
                                )
                              }
                              className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
                              placeholder="/dropdown-link"
                            />

                            <button
                              type="button"
                              onClick={() =>
                                deleteDropdownItem(index, childIndex)
                              }
                              className="rounded-md border bg-red-100 p-2 text-red-700"
                            >
                              <Trash size={15} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <p className="mt-2 text-xs text-gray-500">
                      {item.children?.length ?? 0}/{MAX_DROPDOWN_LINKS} dropdown
                      links added
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>

        <div className="absolute bottom-0 left-0 right-0 flex justify-end gap-3 border-t bg-[#f4f4f5] p-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-gray-400 px-5 py-2 text-sm font-semibold text-gray-600"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full border bg-white px-5 py-2 text-sm font-semibold text-green-700 shadow-sm"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

function SidebarContent({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  return (
    <div className="space-y-2 text-sm">
      {sidebarItems.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => setActiveTab(item)}
          className={`w-full rounded-md px-3 py-2 text-left cursor-pointer ${
            activeTab === item
              ? "bg-blue-50 font-medium text-blue-700"
              : "hover:bg-gray-100"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
