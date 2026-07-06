import { selectedConfig } from "./selectedConfig";
import { templates } from "./templates";
import categoryContentJson from "./categoryContent.json";
import type { SectionItem, SelectedConfig } from "../types/section";

export type CategoryKey =
  | "Business"
  | "School"
  | "Portfolio"
  | "Ecommerce"
  | "Realestate"
  | "Education"
  | "Hospitals"
  | "Fashion"
  | "Games"
  | "Financial";

export type BuilderTemplate = {
  id: string;
  numericId: number;
  title: string;
  category: CategoryKey | "All";
  type: "Single Page Website" | "Multiple Pages Website";
  image: string;
  previewimage?: string;
  preview_description: string;
  prebuilt_pages: number;
  sectionVariants: Record<string, string>;
};

export const builderTemplates: BuilderTemplate[] = [
  {
    id: "template-1",
    numericId: 1,
    title: "Classic",
    category: "All",
    type: "Single Page Website",
    image: "/haelli.png",
    previewimage: "/haellipreview.png",
    preview_description:
      "A polished website layout with a compact topbar, strong navigation, image-led hero, highlights, and conversion-focused footer.",
    prebuilt_pages: 6,
    sectionVariants: {
      Topbar: "Topbar-1",
      Header: "Header-1",
      Banner: "Banner-1",
      About: "About-1",
      Product: "Product-1",
      Footer: "Footer-1",
    },
  },
  {
    id: "template-2",
    numericId: 2,
    title: "Modern",
    category: "All",
    type: "Multiple Pages Website",
    image: "/shaye.png",
    previewimage: "/shayepreview.png",
    preview_description:
      "Uses the same category content with alternate components: Header 2, Banner 2, About 2, and Product 2 for a different visual structure.",
    prebuilt_pages: 8,
    sectionVariants: {
      Topbar: "Topbar-2",
      Header: "Header-2",
      Banner: "Banner-2",
      About: "About-2",
      Product: "Product-2",
      Footer: "Footer-1",
    },
  },
  {
    id: "template-3",
    numericId: 3,
    title: "Showcase",
    category: "All",
    type: "Single Page Website",
    image: "/stylam.png",
    previewimage: "/stylampreview.png",
    preview_description:
      "The same category content presented through a slider hero and editorial blocks for a richer browsing experience.",
    prebuilt_pages: 5,
    sectionVariants: {
      Topbar: "Topbar-1",
      Header: "Header-2",
      Banner: "Banner-3",
      About: "About-2",
      Product: "Product-3",
      Footer: "Footer-1",
    },
  },
];

type SectionContentMap = Partial<Record<string, Record<string, unknown>>>;

type CategoryContentRecord = {
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

export const getCategoryNamesWithContent = () =>
  Object.keys(categoryContent.categories);

export const hasCategoryContent = (category: string) =>
  Boolean(categoryContent.categories[category]);

export const getTemplateIdsForCategory = (category: string) =>
  categoryContent.categories[category]?.templates ?? [];

export const getTemplatesForCategory = (category: string) => {
  const templateIds = getTemplateIdsForCategory(category);

  return builderTemplates.filter((template) => templateIds.includes(template.id));
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
  const template = templates.find((item) => item.id === templateId);
  const variables = template?.variables ?? templates[0]?.variables ?? {};

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
