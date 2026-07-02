import Link from "next/link";
import Image from "next/image";
import { SectionProps } from "./../../../types/section";

export default function BannerTwo({ data }: SectionProps) {
  const backgroundMode = data.bannerBackgroundMode ?? "image";
  const bannerHeight = data.bannerHeight ?? 70;
  const bannerBackground =
    backgroundMode === "gradient"
      ? `linear-gradient(90deg, ${data.bannerBackgroundColor ?? "#0f172a"}, ${
          data.bannerGradientColor ?? "#0ea5e9"
        })`
      : backgroundMode === "solid"
        ? (data.bannerBackgroundColor ?? "#0f172a")
        : undefined;
  const buttons = data.buttons?.slice(0, 3) ?? [];

  return (
    <section
      className="flex w-full items-center"
      style={{ height: `${bannerHeight}dvh` }}
    >
      <div
        className="relative h-full w-full overflow-hidden"
        style={{ background: bannerBackground }}
      >
        {/* Background Image */}
        {backgroundMode === "image" && data.backgroundImage && (
          <Image
            src={data.backgroundImage}
            alt={data.backgroundImageTitle ?? data.title ?? "Banner image"}
            fill
            sizes="100vw"
            unoptimized={data.backgroundImage.startsWith("data:")}
            className="object-cover"
          />
        )}

        {backgroundMode === "video" && data.backgroundVideo && (
          <video
            src={data.backgroundVideo}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        )}

        {/* Optional Dark Overlay */}
        <div
          className="absolute inset-0 bg-black/40"
          style={{
            backgroundColor: data.overlayColor,
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center gap-3 px-4 text-center">
          {data.pretitle && (
            <p className="text-lg font-medium lg:text-xl text-(--secondary-pretitle-text)">
              {data.pretitle}
            </p>
          )}

          <h1
            className="max-w-4xl text-3xl font-semibold leading-tight text-white lg:text-5xl"
            style={{
              color: data.titleColor,
            }}
          >
            {data.title}
          </h1>

          {data.desc && (
            <p className="max-w-3xl text-md text-(--secondary-subtitle-text) lg:text-md">
              {data.desc}
            </p>
          )}

          {!!buttons.length && (
            <div className="flex items-center gap-2">
              {buttons.map((button, index) => (
                <Link
                  key={`${button.label}-${index}`}
                  href={button.href}
                  className="mt-2 inline-block rounded-full bg-(--secondary-link-bg) px-5 py-2 font-medium text-(--secondary-link-color)"
                >
                  {button.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
