import Image from "next/image";
import {
  getBlocksByType,
  getTextBlockByRole,
  resolveSectionBlocks,
} from "../types/section";
import { SectionProps } from "./../../../types/section";
import { agrandirBolt } from "@/app/fonts";
import BlockRenderer from "../blocks/BlockRenderer";

export default function BannerOne({ data = {}, blocks }: SectionProps) {
  const resolvedBlocks = resolveSectionBlocks({ blocks, data });
  const heading = getTextBlockByRole(resolvedBlocks, "heading");
  const paragraph = getTextBlockByRole(resolvedBlocks, "paragraph");
  const backgroundImage = getBlocksByType(resolvedBlocks, "image").find(
    (block) => block.role === "background" || !block.role,
  );
  const backgroundVideo = getBlocksByType(resolvedBlocks, "video").find(
    (block) => block.role === "background" || !block.role,
  );
  const buttonBlocks = getBlocksByType(resolvedBlocks, "button").slice(0, 3);
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
        {backgroundMode === "image" && backgroundImage && (
          <Image
            src={backgroundImage.src}
            alt={backgroundImage.alt ?? heading?.content ?? "Banner image"}
            fill
            sizes="100vw"
            unoptimized={backgroundImage.src.startsWith("data:")}
            className="object-cover"
          />
        )}

        {backgroundMode === "video" && backgroundVideo && (
          <BlockRenderer
            block={backgroundVideo}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        {/* Optional Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col justify-center gap-2 px-6">
          <BlockRenderer
            block={getTextBlockByRole(resolvedBlocks, "pretitle")}
            className="text-lg text-(--primary-pretitle-text) lg:text-xl"
          />

          <BlockRenderer
            block={heading}
            className={`${agrandirBolt.className} text-3xl font-semibold leading-tight text-(--primary-title-text) lg:text-5xl`}
          />

          <BlockRenderer
            block={paragraph}
            className="text-lg text-(--primary-subtitle-text) lg:text-md w-60dvw"
          />

          {!!buttonBlocks.length && (
            <div className="flex items-center gap-2">
              {buttonBlocks.map((button) => (
                <BlockRenderer
                  key={button.id}
                  block={button}
                  className="mt-2 inline-block bg-(--primary-link-bg) px-4 py-2 text-(--primary-link-color)"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
