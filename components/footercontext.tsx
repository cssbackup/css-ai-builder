"use client";

import { createContext, useContext, useState } from "react";

const FooterContext = createContext<any>(null);

export function FooterProvider({ children }: { children: React.ReactNode }) {
  const [hideFooter, setHideFooter] = useState(false);

  return (
    <FooterContext.Provider value={{ hideFooter, setHideFooter }}>
      {children}
    </FooterContext.Provider>
  );
}

export function useFooter() {
  return useContext(FooterContext);
}
