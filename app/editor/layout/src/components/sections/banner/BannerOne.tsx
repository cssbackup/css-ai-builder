import Link from "next/link";
import Image from "next/image";
import { SectionProps } from "./../../../types/section";
import { agrandirBolt } from "@/app/fonts";

export default function BannerOne({ data }: SectionProps) {
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
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col justify-center gap-2 px-6">
          {data.pretitle && (
            <p className="text-lg text-(--primary-pretitle-text) lg:text-xl">
              {data.pretitle}
            </p>
          )}

          <h1
            className={`${agrandirBolt.className} text-3xl font-semibold leading-tight text-(--primary-title-text) lg:text-5xl`}
          >
            {data.title}
          </h1>

          {data.desc && (
            <p className="text-lg text-(--primary-subtitle-text) lg:text-md w-60dvw">
              {data.desc}
            </p>
          )}

          {!!buttons.length && (
            <div className="flex items-center gap-2">
              {buttons.map((button, index) => (
                <Link
                  key={`${button.label}-${index}`}
                  href={button.href}
                  className="mt-2 inline-block bg-(--primary-link-bg) px-4 py-2 text-(--primary-link-color)"
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
