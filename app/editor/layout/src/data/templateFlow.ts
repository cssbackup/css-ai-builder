import { selectedConfig } from "./selectedConfig";
import categoryContentJson from "./categoryContent.json";
import type { SectionData, SectionItem, SelectedConfig } from "../types/section";

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

export const addableSectionCards = [
  {
    type: "Banner",
    variant: "Banner-1",
    title: "Banner",
    description: "Image hero section",
  },
  {
    type: "About",
    variant: "About-1",
    title: "About",
    description: "Company intro section",
  },
  {
    type: "Product",
    variant: "Product-2",
    title: "Services",
    description: "Service cards section",
  },
  {
    type: "WhyChooseUs",
    variant: "WhyChooseUs-1",
    title: "Why choose us",
    description: "Trust points section",
  },
  {
    type: "Gallery",
    variant: "Gallery-1",
    title: "Gallery",
    description: "Image showcase section",
  },
  {
    type: "FormDetail",
    variant: "FormDetail-1",
    title: "Form",
    description: "Lead detail section",
  },
  {
    type: "FAQ",
    variant: "FAQ-1",
    title: "FAQ",
    description: "Question answer section",
  },
  {
    type: "Testimonial",
    variant: "Testimonial-1",
    title: "Our Clients",
    description: "Client reviews section",
  },
] as const;

const cloneSections = (sections: SectionItem[]) =>
  structuredClone(sections) as SectionItem[];

const applyBannerVariantDefaults = (
  variant: string,
  data: Record<string, unknown>,
) => {
  const sourceImage =
    typeof data.backgroundImage === "string" ? data.backgroundImage : "/bg1.jpg";
  const sourceVideo =
    typeof data.backgroundVideo === "string"
      ? data.backgroundVideo
      : "/video.mp4";
  const sourceSlides = Array.isArray(data.bannerSlides)
    ? data.bannerSlides
    : [];

  if (variant === "Banner-1") {
    return {
      ...data,
      bannerBackgroundMode: "image",
      backgroundImage: sourceImage,
    };
  }

  if (variant === "Banner-2") {
    return {
      ...data,
      bannerBackgroundMode: "video",
      backgroundVideo: sourceVideo,
      backgroundImage: sourceImage,
    };
  }

  if (variant === "Banner-3") {
    return {
      ...data,
      bannerSlides: sourceSlides,
    };
  }

  if (variant === "Banner-4") {
    return {
      ...data,
      bannerSlides: sourceSlides.length
        ? sourceSlides.map((slide) =>
            typeof slide === "object" && slide !== null && !Array.isArray(slide)
              ? {
                  ...slide,
                  image:
                    typeof (slide as { image?: unknown }).image === "string"
                      ? (slide as { image: string }).image
                      : sourceImage,
                  video:
                    typeof (slide as { video?: unknown }).video === "string"
                      ? (slide as { video: string }).video
                      : sourceVideo,
                }
              : slide,
          )
        : [],
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

  if (!Object.keys(sectionContent).length) {
    const emptyData = Object.fromEntries(
      Object.keys(section.data).map((variant) => [variant, {} as SectionData]),
    );

    return { ...section, data: emptyData };
  }

  const nextData = Object.fromEntries(
    Object.keys(section.data).map((variant) => [
      variant,
      section.type === "Banner"
        ? applyBannerVariantDefaults(variant, { ...sectionContent })
        : { ...sectionContent },
    ]),
  );

  return { ...section, data: nextData };
};

const createDefaultSectionData = (sectionType: string): Record<string, SectionData> => {
  if (sectionType === "WhyChooseUs") {
    const data: SectionData = {
      pretitle: "Why choose us",
      title: "A better experience from first click.",
      desc: "Use category-specific proof points to help visitors trust your business faster.",
      whyChooseUsItems: [
        {
          title: "Clear guidance",
          desc: "Helpful details and simple next steps for every visitor.",
          stat: "01",
        },
        {
          title: "Trusted process",
          desc: "A focused flow designed around the user decision journey.",
          stat: "02",
        },
        {
          title: "Fast response",
          desc: "Make it easy for people to enquire, compare, and act.",
          stat: "03",
        },
      ],
    };

    return {
      "WhyChooseUs-1": data,
      "WhyChooseUs-2": data,
      "WhyChooseUs-3": data,
      "WhyChooseUs-4": data,
    };
  }

  if (sectionType === "Gallery") {
    const data: SectionData = {
      pretitle: "Gallery",
      title: "Explore the experience",
      desc: "A visual section powered by the selected category media.",
      galleryItems: [
        { image: "/bg1.jpg", alt: "Gallery image one", title: "View one" },
        { image: "/bg2.jpg", alt: "Gallery image two", title: "View two" },
        { image: "/blackbay.png", alt: "Gallery image three", title: "View three" },
        { image: "/shaye.png", alt: "Gallery image four", title: "View four" },
      ],
    };

    return {
      "Gallery-1": data,
      "Gallery-2": data,
      "Gallery-3": data,
      "Gallery-4": data,
      "Gallery-5": data,
      "Gallery-6": data,
    };
  }

  if (sectionType === "FormDetail") {
    const data: SectionData = {
      pretitle: "Contact",
      title: "Tell us what you need.",
      desc: "Capture enquiries with a simple editable form section.",
      formSubmitLabel: "Send enquiry",
      formFields: [
        { label: "Name", type: "text", placeholder: "Your name" },
        { label: "Email", type: "email", placeholder: "you@example.com" },
        { label: "Message", type: "textarea", placeholder: "Tell us what you need" },
      ],
    };

    return {
      "FormDetail-1": data,
      "FormDetail-2": data,
      "FormDetail-3": data,
      "FormDetail-4": data,
    };
  }

  if (sectionType === "FAQ") {
    const data: SectionData = {
      pretitle: "FAQ",
      title: "Frequently asked questions",
      faqItems: [
        {
          question: "How quickly can we start?",
          answer: "You can start as soon as the basic details are ready.",
        },
        {
          question: "Can this content be changed?",
          answer: "Yes, text and media can be customized from the editor data.",
        },
        {
          question: "Does this match the selected category?",
          answer: "Yes, inserted sections merge with the active category JSON.",
        },
      ],
    };

    return {
      "FAQ-1": data,
      "FAQ-2": data,
      "FAQ-3": data,
      "FAQ-4": data,
    };
  }

  if (sectionType === "Testimonial") {
    const data: SectionData = {
      pretitle: "Our clients",
      title: "Trusted by people who care about results.",
      desc: "Use real customer feedback to build trust with new visitors.",
      testimonialItems: [
        {
          name: "Aarav Mehta",
          role: "Founder, Studio North",
          quote:
            "The site made our work easier to understand and brought in better leads within the first week.",
          image: "/bg1.jpg",
          rating: "5.0",
        },
        {
          name: "Neha Kapoor",
          role: "Marketing Lead",
          quote:
            "Clean sections, fast pages, and the editor keeps the content simple for our whole team.",
          image: "/bg2.jpg",
          rating: "4.9",
        },
        {
          name: "Rahul Verma",
          role: "Operations Head",
          quote:
            "We finally have a website that looks premium and still feels practical to update.",
          image: "/blackbay.png",
          rating: "5.0",
        },
        {
          name: "Isha Malhotra",
          role: "Creative Director",
          quote:
            "The layouts gave our brand a sharper story and made every service easier to browse.",
          image: "/shaye.png",
          rating: "4.8",
        },
        {
          name: "Kabir Anand",
          role: "Product Manager",
          quote:
            "We could test different sections quickly without losing the polished look of the page.",
          image: "/stylam.png",
          rating: "4.7",
        },
        {
          name: "Sara Khan",
          role: "Business Owner",
          quote:
            "Visitors understand what we offer faster, and enquiries feel more relevant now.",
          image: "/prod2.jpg",
          rating: "5.0",
        },
      ],
    };

    return {
      "Testimonial-1": data,
      "Testimonial-2": data,
      "Testimonial-3": data,
    };
  }

  return {};
};

export const createAddableSection = (
  sectionType: string,
  category: string,
): SectionItem | null => {
  const libraryCard = addableSectionCards.find(
    (item) => item.type === sectionType,
  );
  const baseSection =
    cloneSections(selectedConfig.sections).find(
      (section) => section.type === sectionType,
    ) ??
    (libraryCard
      ? {
          type: libraryCard.type,
          variant: libraryCard.variant,
          data: createDefaultSectionData(libraryCard.type),
        }
      : null);

  if (!baseSection || !libraryCard) return null;

  return mergeCategoryData(
    {
      ...baseSection,
      id: `${libraryCard.type}-${Date.now()}`,
      variant: libraryCard.variant,
    },
    category,
  );
};

export const createAboutPageSection = (category: string): SectionItem => {
  const aboutPageData = {
    ...categoryContent.common.AboutPage,
    ...categoryContent.categories[category]?.sections?.AboutPage,
  } as SectionData;

  return {
    id: "AboutPage",
    page: "about",
    type: "About",
    variant: "AboutPage-1",
    data: {
      "AboutPage-1": aboutPageData,
      "AboutPage-2": aboutPageData,
      "AboutPage-3": aboutPageData,
    },
  };
};

export const createGalleryPageSection = (category: string): SectionItem => {
  const galleryPageData = {
    ...categoryContent.common.Gallery,
    ...categoryContent.categories[category]?.sections?.Gallery,
    ...categoryContent.categories[category]?.sections?.GalleryPage,
  } as SectionData;

  return {
    id: "GalleryPage",
    page: "gallery",
    type: "Gallery",
    variant: "GalleryPage-1",
    data: {
      "GalleryPage-1": galleryPageData,
    },
  };
};

export const createServicePageSection = (category: string): SectionItem => {
  const servicePageData = {
    ...categoryContent.common.ServicePage,
    ...categoryContent.categories[category]?.sections?.ServicePage,
  } as SectionData;

  return {
    id: "ServicePage",
    page: "service",
    type: "Service",
    variant: "ServicePage-1",
    data: {
      "ServicePage-1": servicePageData,
    },
  };
};

export const createContactPageSection = (category: string): SectionItem => {
  const contactPageData = {
    ...categoryContent.common.ContactPage,
    ...categoryContent.categories[category]?.sections?.ContactPage,
  } as SectionData;

  return {
    id: "ContactPage",
    page: "contact",
    type: "Contact",
    variant: "ContactPage-1",
    data: {
      "ContactPage-1": contactPageData,
      "ContactPage-2": contactPageData,
    },
  };
};

export const createCustomPageSection = (
  category: string,
  pageLabel: string,
): SectionItem => {
  const pageSlug = pageLabel.trim().toLowerCase().replace(/\s+/g, "-");
  const pageData = {
    ...categoryContent.common.AboutPage,
    ...categoryContent.categories[category]?.sections?.AboutPage,
    pretitle: pageLabel,
    title: pageLabel,
  } as SectionData;

  return {
    id: `CustomPage-${pageSlug}`,
    page: pageSlug,
    type: "About",
    variant: "AboutPage-1",
    data: {
      "AboutPage-1": pageData,
      "AboutPage-2": pageData,
      "AboutPage-3": pageData,
    },
  };
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
  const baseSections = cloneSections(selectedConfig.sections);
  const missingSections = Object.entries(builderTemplate.sectionVariants)
    .filter(
      ([sectionType]) =>
        !baseSections.some((section) => section.type === sectionType),
    )
    .map(([sectionType, variant]) => ({
      type: sectionType,
      variant,
      data: createDefaultSectionData(sectionType),
    }));
  const footerIndex = baseSections.findIndex(
    (section) => section.type === "Footer",
  );
  const templateSections =
    footerIndex === -1
      ? [...baseSections, ...missingSections]
      : [
          ...baseSections.slice(0, footerIndex),
          ...missingSections,
          ...baseSections.slice(footerIndex),
        ];
  const sections = templateSections.map((section) => {
    const variant = builderTemplate.sectionVariants[section.type] ?? section.variant;

    return mergeCategoryData({ ...section, variant }, category);
  });

  return {
    templateId: builderTemplate.id,
    sections,
  };
};
