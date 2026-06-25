"use client";

import { PreviewProvider } from "./layout/src/components/context/PreviewContext";

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PreviewProvider>{children}</PreviewProvider>;
}
