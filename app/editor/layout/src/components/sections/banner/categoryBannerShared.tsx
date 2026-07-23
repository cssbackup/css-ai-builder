import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import type { SectionData } from "../../../types/section";

export const getBannerStyle = (
  data: SectionData,
  fallbackColor: string,
): CSSProperties => {
  const mode = data.bannerBackgroundMode;
  const background =
    mode === "gradient"
      ? `linear-gradient(135deg, ${data.bannerBackgroundColor ?? fallbackColor}, ${data.bannerGradientColor ?? fallbackColor})`
      : mode === "solid"
        ? (data.bannerBackgroundColor ?? fallbackColor)
        : fallbackColor;

  return {
    minHeight: `${data.bannerHeight ?? 70}dvh`,
    background,
  };
};

export function BannerMedia({
  data,
  className = "object-cover",
}: {
  data: SectionData;
  className?: string;
}) {
  if (data.bannerBackgroundMode === "video" && data.backgroundVideo) {
    return (
      <video
        autoPlay
        loop
        muted
        playsInline
        poster={data.backgroundImage}
        data-editor-media
        data-editor-media-type="video"
        data-editor-media-src={data.backgroundVideo}
        className={`absolute inset-0 h-full w-full ${className}`}
      >
        <source src={data.backgroundVideo} />
      </video>
    );
  }

  if (!data.backgroundImage) return null;

  return (
    <Image
      src={data.backgroundImage}
      alt={data.backgroundImageTitle ?? data.title ?? ""}
      data-editor-media
      data-editor-media-type="image"
      data-editor-media-src={data.backgroundImage}
      fill
      priority
      sizes="100vw"
      unoptimized={data.backgroundImage.startsWith("data:")}
      className={className}
    />
  );
}

export function BannerButtons({
  data,
  primaryClassName,
  secondaryClassName,
}: {
  data: SectionData;
  primaryClassName: string;
  secondaryClassName: string;
}) {
  if (!data.buttons?.length) return null;

  return (
    <div className="flex flex-wrap gap-3">
      {data.buttons.map((button, index) => (
        <Link
          key={`${button.label}-${index}`}
          href={button.href}
          className={
            button.variant === "secondary"
              ? secondaryClassName
              : primaryClassName
          }
        >
          {button.label}
        </Link>
      ))}
    </div>
  );
}
