"use client";

import { createContext, useContext, useState } from "react";

type PreviewContextType = {
  isPreview: boolean;
  togglePreview: () => void;
};

const PreviewContext = createContext<PreviewContextType | null>(null);

export function PreviewProvider({ children }: { children: React.ReactNode }) {
  const [isPreview, setIsPreview] = useState(false);
  // false = by default EyeOff icon + editable visible

  return (
    <PreviewContext.Provider
      value={{
        isPreview,
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
