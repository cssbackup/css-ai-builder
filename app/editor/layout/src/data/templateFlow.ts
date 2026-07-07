import { selectedConfig } from "./selectedConfig";
import categoryContentJson from "./categoryContent.json";
import type { SectionItem, SelectedConfig } from "../types/section";

export type CategoryKey = string;

export type BuilderTemplate = {
  id: string;
  numericId: number;
  title: string;
  type: "Single Page Website" | "Multiple Pages Website";
  image: string;
  previewimage?: string;
  preview_description: string;
  prebuilt_pages: number;
  sectionVariants: Record<string, string>;
  variables?: Record<string, string>;
};

type SectionContentMap = Partial<Record<string, Record<string, unknown>>>;

type CategoryContentRecord = {
  templates: BuilderTemplate[];
  common: SectionContentMap;
  categories: Record<
    string,
    {
      templates: string[];
      sections: SectionContentMap;
    }
  >;
};

const categoryContent = categoryContentJson as CategoryContentRecord;
export const builderTemplates = categoryContent.templates;

export const getCategoryNamesWithContent = () =>
  Object.keys(categoryContent.categories);

export const hasCategoryContent = (category: string) =>
  Boolean(categoryContent.categories[category]);

export const getTemplateIdsForCategory = (category: string) =>
  categoryContent.categories[category]?.templates ?? [];

export const getTemplatesForCategory = (category: string) => {
  const templateIds = getTemplateIdsForCategory(category);

  return builderTemplates.filter((template) =>
    templateIds.includes(template.id),
  );
};

const cloneSections = (sections: SectionItem[]) =>
  structuredClone(sections) as SectionItem[];

const applyBannerVariantDefaults = (
  variant: string,
  data: Record<string, unknown>,
) => {
  if (variant === "Banner-1") {
    return {
      ...data,
      bannerBackgroundMode: "image",
      backgroundImage: data.backgroundImage ?? "/bg1.jpg",
    };
  }

  if (variant === "Banner-2") {
    return {
      ...data,
      bannerBackgroundMode: "video",
      backgroundVideo: data.backgroundVideo ?? "/video.mp4",
      backgroundImage: data.backgroundImage ?? "/bg2.jpg",
    };
  }

  if (variant === "Banner-3") {
    return {
      ...data,
      bannerSlides:
        Array.isArray(data.bannerSlides) && data.bannerSlides.length
          ? data.bannerSlides
          : [
              {
                image: "/bg1.jpg",
                alt: "Website slider one",
                title: data.title ?? "Build a better website",
                desc: data.desc ?? "Show your story with image slider banners.",
                button: {
                  label: "Learn more",
                  href: "#",
                  variant: "primary",
                },
              },
              {
                image: "/bg2.jpg",
                alt: "Website slider two",
                title: "Change every slide",
                desc: "Each slide can have its own image, text, and button.",
                button: {
                  label: "Explore",
                  href: "#",
                  variant: "primary",
                },
              },
            ],
    };
  }

  if (variant === "Banner-4") {
    return {
      ...data,
      bannerSlides: [
        {
          image: "/bg1.jpg",
          video: "/video.mp4",
          alt: "Video slider one",
          title: data.title ?? "Video background slide",
          desc: data.desc ?? "Use motion behind each banner slide.",
          button: {
            label: "Watch now",
            href: "#",
            variant: "primary",
          },
        },
        {
          image: "/bg2.jpg",
          video: "/video.mp4",
          alt: "Video slider two",
          title: "Motion-led website hero",
          desc: "Upload videos from desktop and edit content in the editor.",
          button: {
            label: "Explore",
            href: "#",
            variant: "primary",
          },
        },
      ],
    };
  }

  return data;
};

const mergeCategoryData = (
  section: SectionItem,
  category: string,
): SectionItem => {
  const sectionContent = {
    ...categoryContent.common[section.type],
    ...categoryContent.categories[category]?.sections?.[section.type],
  };

  if (!Object.keys(sectionContent).length) return section;

  const nextData = Object.fromEntries(
    Object.entries(section.data).map(([variant, data]) => [
      variant,
      section.type === "Banner"
        ? applyBannerVariantDefaults(variant, { ...data, ...sectionContent })
        : { ...data, ...sectionContent },
    ]),
  );

  return { ...section, data: nextData };
};

export const getBuilderTemplate = (templateId?: string | null) =>
  builderTemplates.find((template) => template.id === templateId) ??
  builderTemplates[0];

export const getTemplateVariables = (templateId?: string | null) => {
  const template = getBuilderTemplate(templateId);
  const variables = template.variables ?? builderTemplates[0]?.variables ?? {};

  return Object.fromEntries(
    Object.entries(variables).filter(
      (entry): entry is [string, string] => typeof entry[1] === "string",
    ),
  );
};

export const buildSelectedConfig = (
  templateId?: string | null,
  category: string = "Realestate",
): SelectedConfig => {
  const builderTemplate = getBuilderTemplate(templateId);
  const sections = cloneSections(selectedConfig.sections).map((section) => {
    const variant = builderTemplate.sectionVariants[section.type] ?? section.variant;

    return mergeCategoryData({ ...section, variant }, category);
  });

  return {
    templateId: builderTemplate.id,
    sections,
  };
};
