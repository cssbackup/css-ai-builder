import { layoutRegistry } from "../registry/layoutRegistry";
import type { BlockSection } from "../types/section";

type SectionRendererProps = {
  section: BlockSection;
};

export default function SectionRenderer({ section }: SectionRendererProps) {
  const Layout = layoutRegistry[section.layoutId];

  if (!Layout) return null;

  return <Layout section={section} blocks={section.blocks} />;
}
