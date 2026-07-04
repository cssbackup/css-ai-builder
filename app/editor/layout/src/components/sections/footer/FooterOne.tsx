import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import {
  FooterColumnData,
  FooterSocialData,
  SectionProps,
} from "./../../../types/section";
import {
  getBlock,
  getBlocksByType,
  getTextBlockByRole,
  resolveSectionBlocks,
} from "../types/section";

const socialIcons = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  twitter: FaTwitter,
  linkedin: FaLinkedinIn,
};

const fallbackSocialLinks: FooterSocialData[] = [
  { label: "facebook", href: "#" },
  { label: "instagram", href: "#" },
  { label: "twitter", href: "#" },
  { label: "linkedin", href: "#" },
];

const fallbackColumns: FooterColumnData[] = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Website Design", href: "#" },
      { label: "Landing Pages", href: "#" },
      { label: "AI Website Builder", href: "#" },
      { label: "SEO Optimization", href: "#" },
      { label: "Website Maintenance", href: "#" },
    ],
  },
];

export default function FooterOne({ data = {}, blocks }: SectionProps) {
  const resolvedBlocks = resolveSectionBlocks({ blocks, data });
  const logo = getBlock(resolvedBlocks, "logo");
  const paragraph = getTextBlockByRole(resolvedBlocks, "paragraph");
  const columnBlocks = getBlocksByType(resolvedBlocks, "list").filter(
    (block) => block.role === "footer-column",
  );
  const legalBlock = getBlocksByType(resolvedBlocks, "list").find(
    (block) => block.role === "legal",
  );
  const footerBackground =
    data.footerBackgroundType === "gradient"
      ? `linear-gradient(90deg, ${data.footerBackgroundColor ?? "#0d1f2a"}, ${
          data.footerGradientColor ?? "#1d4ed8"
        })`
      : (data.footerBackgroundColor ?? "#0d1f2a");
  const textColor = data.footerTextColor ?? "#ffffff";
  const mutedTextColor = data.footerMutedTextColor ?? "#cbd5e1";
  const socialLinks = data.footerSocialLinks?.length
    ? data.footerSocialLinks
    : fallbackSocialLinks;
  const columns = data.footerColumns?.length
    ? data.footerColumns
    : fallbackColumns;
  const contact = data.footerContact ?? {
    location: "New Delhi, India",
    email: "hello@example.com",
    phone: "+91 12345 67890",
  };
  const legalLinks = data.footerLegalLinks?.length
    ? data.footerLegalLinks
    : [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms & Conditions", href: "#" },
      ];
  const copyrightText =
    data.copyrightText ??
    `© ${new Date().getFullYear()} ${
      logo?.text ?? "BlackBay"
    }. All rights reserved.`;

  return (
    <footer style={{ background: footerBackground, color: textColor }}>
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="text-3xl font-bold">
              {logo?.text ?? "BlackBay"}
            </Link>

            <p className="mt-5 text-sm leading-7" style={{ color: mutedTextColor }}>
              {paragraph?.content ??
                "We create modern websites that are fast, responsive, and AI-powered to help your business grow online."}
            </p>

            <div className="mt-6 flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = socialIcons[social.label];

                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-blue-600"
                    aria-label={social.label}
                  >
                    <Icon size={16} />
                  </Link>
                );
              })}
            </div>
          </div>

          {(columnBlocks.length ? columnBlocks : columns).map((column) => (
            <div key={column.title}>
              <h3 className="mb-6 text-xl font-semibold">{column.title}</h3>

              <ul className="space-y-3" style={{ color: mutedTextColor }}>
                {("items" in column ? column.items : column.links).map((item) => {
                  const label = typeof item === "string" ? item : item.label;
                  const href = typeof item === "string" ? "#" : item.href;

                  return (
                  <li key={label}>
                    <Link href={href} className="transition hover:text-white">
                      {label}
                    </Link>
                  </li>
                  );
                })}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="mb-6 text-xl font-semibold">Contact</h3>

            <div className="space-y-4" style={{ color: mutedTextColor }}>
              <p>{contact.location}</p>

              <Link
                href={`mailto:${contact.email}`}
                className="block transition hover:text-white"
              >
                {contact.email}
              </Link>

              <Link
                href={`tel:${contact.phone.replace(/\s/g, "")}`}
                className="block transition hover:text-white"
              >
                {contact.phone}
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <div
            className="flex flex-col items-center justify-between gap-4 text-sm md:flex-row"
            style={{ color: mutedTextColor }}
          >
            <p>{copyrightText}</p>

            <div className="flex gap-6">
              {(legalBlock?.items ?? legalLinks).map((item) => {
                const label = typeof item === "string" ? item : item.label;
                const href = typeof item === "string" ? "#" : item.href;

                return (
                <Link
                  key={label}
                  href={href}
                  className="transition hover:text-white"
                >
                  {label}
                </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
