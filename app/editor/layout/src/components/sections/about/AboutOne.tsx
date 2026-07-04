import { SectionProps } from "./../../../types/section";
import {
  getBlocksByType,
  getTextBlockByRole,
  resolveSectionBlocks,
} from "../types/section";
import BlockRenderer from "../blocks/BlockRenderer";

export default function AboutOne({ data = {}, blocks }: SectionProps) {
  const resolvedBlocks = resolveSectionBlocks({ blocks, data });
  const heading = getTextBlockByRole(resolvedBlocks, "heading");
  const paragraph = getTextBlockByRole(resolvedBlocks, "paragraph");
  const image = getBlocksByType(resolvedBlocks, "image").find(
    (block) => block.role === "background" || !block.role,
  );
  const buttonBlocks = getBlocksByType(resolvedBlocks, "button");

  return (
    <div className="bg-(--lightcream-bg) w-full flex items-center py-14">
      <div className="px-6 w-1/2 flex flex-col gap-3">
        <BlockRenderer block={heading} className="text-5xl font-semibold" />
        <BlockRenderer block={paragraph} />
        {!!buttonBlocks.length && (
          <div className="mt-2 flex flex-wrap gap-2">
            {buttonBlocks.map((button) => (
              <BlockRenderer
                key={button.id}
                block={button}
                className="inline-block rounded-full bg-(--blue-bg) px-5 py-2 font-medium text-(--secondary-link-color)"
              />
            ))}
          </div>
        )}
      </div>
      <div className="relative min-h-80 w-1/2">
        <BlockRenderer block={image} className="object-cover" />
      </div>
    </div>
  );
}
