import Image from "next/image";
import type { ImageBlock as ImageBlockData } from "../types/section";

type ImageBlockProps = {
  block: ImageBlockData;
  className?: string;
};

export default function ImageBlock({ block, className }: ImageBlockProps) {
  return (
    <Image
      src={block.src}
      alt={block.alt ?? block.title ?? ""}
      fill={block.fill ?? true}
      sizes="100vw"
      priority={block.priority}
      unoptimized={block.src.startsWith("data:")}
      className={className}
    />
  );
}
