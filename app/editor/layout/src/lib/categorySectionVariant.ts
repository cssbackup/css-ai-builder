const categoryComponentPrefixes: Record<string, string> = {
  Realestate: "RealEstate",
};

const getTwoLayoutIndex = (variant: string) => {
  const match = variant.match(/(\d+)$/);
  const layoutNumber = match ? Number(match[1]) : 1;

  return layoutNumber % 2 === 0 ? 2 : 1;
};

export const getCategorySectionVariant = (
  category: string,
  sectionType: string,
  templateVariant: string,
) => {
  const prefix = categoryComponentPrefixes[category] ?? category;
  const componentSectionType =
    sectionType === "MarqueeSlide" ? "Marquee" : sectionType;
  const layoutIndex = getTwoLayoutIndex(templateVariant);

  return `${prefix}${componentSectionType}${layoutIndex}`;
};
