import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./main.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { FooterProvider } from "./components/footercontext";
import FooterWrapper from "./components/footerwrapper";

export const metadata: Metadata = {
  title: "CSS AI Builder",
  description: "Create your website with CSS AI Builder in Minutes",
  icons: {
    icon: "/fav-icon.ico",
  },
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`h-full ${inter.className}`}>
      <body className="min-h-dvh flex flex-col overflow-x-hidden overflow-y-auto">
        <Navbar />

        <FooterProvider>
          {children}
          <FooterWrapper />
        </FooterProvider>
      </body>
    </html>
  );
}
