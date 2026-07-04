import Image from "next/image";
import {
  getBlocksByType,
  getTextBlockByRole,
  resolveSectionBlocks,
} from "../types/section";
import { SectionProps } from "./../../../types/section";
import BlockRenderer from "../blocks/BlockRenderer";

export default function BannerTwo({ data = {}, blocks }: SectionProps) {
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
        <div
          className="absolute inset-0 bg-black/40"
          style={{
            backgroundColor: data.overlayColor,
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center gap-3 px-4 text-center">
          <BlockRenderer
            block={getTextBlockByRole(resolvedBlocks, "pretitle")}
            className="text-lg font-medium lg:text-xl text-(--secondary-pretitle-text)"
          />

          <BlockRenderer
            block={heading}
            className="max-w-4xl text-3xl font-semibold leading-tight text-white lg:text-5xl"
          />

          <BlockRenderer
            block={paragraph}
            className="max-w-3xl text-md text-(--secondary-subtitle-text) lg:text-md"
          />

          {!!buttonBlocks.length && (
            <div className="flex items-center gap-2">
              {buttonBlocks.map((button) => (
                <BlockRenderer
                  key={button.id}
                  block={button}
                  className="mt-2 inline-block rounded-full bg-(--secondary-link-bg) px-5 py-2 font-medium text-(--secondary-link-color)"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
