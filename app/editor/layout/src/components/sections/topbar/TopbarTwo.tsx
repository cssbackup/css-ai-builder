import Link from "next/link";
import type { ElementType } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { SectionProps, SocialLinkData } from "./../../../types/section";
import {
  getBlocksByType,
  getTextBlockByRole,
  resolveSectionBlocks,
} from "../types/section";
import BlockRenderer from "../blocks/BlockRenderer";

const socialIcons: Record<SocialLinkData["label"], ElementType> = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  twitter: FaTwitter,
  linkedin: FaLinkedinIn,
};

const getVisibleSocialLinks = (socialLinks: SocialLinkData[] = []) =>
  socialLinks.slice(0, 4);

export default function TopbarTwo({ data = {}, blocks }: SectionProps) {
  const resolvedBlocks = resolveSectionBlocks({ blocks, data });
  const announcement = getTextBlockByRole(resolvedBlocks, "announcement");
  const buttonBlocks = getBlocksByType(resolvedBlocks, "button").filter(
    (button) => button.role !== "social",
  );
  const topbarSolidColor = data.topbarBackgroundColor ?? "var(--secondary-bg)";
  const topbarGradientColor = data.topbarGradientColor ?? "#0668ff";
  const topbarBackground =
    data.topbarBackgroundType === "gradient"
      ? `linear-gradient(90deg, ${topbarSolidColor}, ${topbarGradientColor})`
      : topbarSolidColor;
  const topbarTextColor = data.topbarTextColor ?? "var(--primary-text)";
  const topbarText = announcement?.content ?? "";
  const phone = data.phone ?? "";
  const email = data.email ?? "";
  const location = data.location ?? "";
  const socialLinks = getVisibleSocialLinks(data.socialLinks);

  return (
    <section style={{ background: topbarBackground, color: topbarTextColor }}>
      <div className="mx-auto flex h-11 max-w-7xl items-center justify-between px-4 lg:px-6">
        {announcement ? (
          <BlockRenderer block={announcement} className="text-sm font-semibold" />
        ) : (
          topbarText && <p className="text-sm font-semibold">{topbarText}</p>
        )}

        <div className="flex items-center divide-x divide-white/20">
          {phone && (
            <Link
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="flex items-center gap-2 px-5 text-sm transition hover:opacity-80"
            >
              <FaPhoneAlt className="text-xs" />
              <span>{phone}</span>
            </Link>
          )}

          {email && (
            <Link
              href={`mailto:${email}`}
              className="flex items-center gap-2 px-5 text-sm transition hover:opacity-80"
            >
              <FaEnvelope className="text-xs" />
              <span>{email}</span>
            </Link>
          )}

          {location && (
            <span className="flex items-center gap-2 px-5 text-sm">
              <FaMapMarkerAlt className="text-xs" />
              <span>{location}</span>
            </span>
          )}

          <div className="flex items-center">
            {buttonBlocks.map((button) => (
              <BlockRenderer
                key={button.id}
                block={button}
                className="px-4 text-sm font-semibold transition hover:opacity-80"
              />
            ))}
            {socialLinks.map((socialLink, index) => {
              const Icon = socialIcons[socialLink.label];

              return (
                <Link
                  key={`${socialLink.label}-${index}`}
                  href={socialLink.href}
                  className="flex h-11 w-11 items-center justify-center transition hover:bg-white/10"
                  aria-label={socialLink.label}
                >
                  <Icon size={14} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
