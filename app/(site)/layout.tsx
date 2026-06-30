import Navbar from "../../components/layout/navbar";
import { FooterProvider } from "../../components/layout/footercontext";
import FooterWrapper from "../../components/layout/footerwrapper";

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
