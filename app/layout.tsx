import type { Metadata } from "next";
import { agrandirBolt, generalSansMedium } from "./fonts";
import "./globals.css";
import "./main.css";

export const metadata: Metadata = {
  title: "CSS AI Builder",
  description: "Create your website with CSS AI Builder in Minutes",
  icons: {
    icon: "/fav-icon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`h-full ${generalSansMedium.className} ${agrandirBolt.variable}`}
    >
      <body className="min-h-dvh overflow-x-hidden overflow-y-auto">
        {children}
      </body>
    </html>
  );
}
