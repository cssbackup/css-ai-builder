"use client";

import { createContext, useContext, useState } from "react";

type PreviewContextType = {
  isPreview: boolean;
  viewportMode: "desktop" | "mobile";
  setViewportMode: (mode: "desktop" | "mobile") => void;
  togglePreview: () => void;
};

const PreviewContext = createContext<PreviewContextType | null>(null);

export function PreviewProvider({ children }: { children: React.ReactNode }) {
  const [isPreview, setIsPreview] = useState(false);
  const [viewportMode, setViewportMode] = useState<"desktop" | "mobile">(
    "desktop",
  );
  // false = by default EyeOff icon + editable visible

  return (
    <PreviewContext.Provider
      value={{
        isPreview,
        viewportMode,
        setViewportMode,
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
