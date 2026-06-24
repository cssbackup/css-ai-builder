import Navbar from "./components/navbar";
import { FooterProvider } from "./components/footercontext";
import FooterWrapper from "./components/footerwrapper";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />

      <FooterProvider>
        {children}
        <FooterWrapper />
      </FooterProvider>
    </>
  );
}
