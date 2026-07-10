"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type PageLink = {
  label: string;
  href: string;
  children?: PageLink[];
};

const defaultPageLinks: PageLink[] = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];
const currentPageStorageKey = "ai-builder-current-page";
const pageLinksStorageKey = "ai-builder-page-links";

const getStoredCurrentPage = () => {
  if (typeof window === "undefined") return "Home";

  return "Home";
};

const getStoredPageLinks = () => {
  if (typeof window === "undefined") return defaultPageLinks;

  const storedValue = window.localStorage.getItem(pageLinksStorageKey);
  if (!storedValue) return defaultPageLinks;

  try {
    const parsedValue = JSON.parse(storedValue) as PageLink[];

    return Array.isArray(parsedValue) && parsedValue.length
      ? parsedValue
      : defaultPageLinks;
  } catch {
    return defaultPageLinks;
  }
};

type PreviewContextType = {
  isPreview: boolean;
  viewportMode: "desktop" | "mobile";
  currentPage: string;
  pageLinks: PageLink[];
  setViewportMode: (mode: "desktop" | "mobile") => void;
  setCurrentPage: (page: string) => void;
  setPageLinks: (links: PageLink[]) => void;
  togglePreview: () => void;
};

const PreviewContext = createContext<PreviewContextType | null>(null);

export function PreviewProvider({ children }: { children: React.ReactNode }) {
  const [isPreview, setIsPreview] = useState(false);
  const [viewportMode, setViewportMode] = useState<"desktop" | "mobile">(
    "desktop",
  );
  const [currentPage, setCurrentPage] = useState(getStoredCurrentPage);
  const [pageLinks, setPageLinks] = useState<PageLink[]>(getStoredPageLinks);
  // false = by default EyeOff icon + editable visible

  useEffect(() => {
    window.localStorage.setItem(currentPageStorageKey, currentPage);
  }, [currentPage]);

  useEffect(() => {
    window.localStorage.setItem(pageLinksStorageKey, JSON.stringify(pageLinks));
  }, [pageLinks]);

  return (
    <PreviewContext.Provider
      value={{
        isPreview,
        viewportMode,
        currentPage,
        pageLinks,
        setViewportMode,
        setCurrentPage,
        setPageLinks,
        togglePreview: () => setIsPreview((prev) => !prev),
      }}
    >
      {children}
    </PreviewContext.Provider>
  );
}

export function usePreview() {
  const context = useContext(PreviewContext);

  if (!context) {
    throw new Error("usePreview must be used inside PreviewProvider");
  }

  return context;
}

export function useOptionalPreview() {
  return useContext(PreviewContext);
}
