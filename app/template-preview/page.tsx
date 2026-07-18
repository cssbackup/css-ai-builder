import {
  buildSelectedConfig,
  getTemplateVariables,
} from "@/app/editor/layout/src/data/templateFlow";
import { sectionRegistry } from "@/app/editor/layout/src/lib/sectionRegistry";
import type { SectionData } from "@/app/editor/layout/src/types/section";

type TemplatePreviewPageProps = {
  searchParams: Promise<{
    templateId?: string;
    category?: string;
  }>;
};

export default async function TemplatePreviewPage({
  searchParams,
}: TemplatePreviewPageProps) {
  const params = await searchParams;
  const templateId = params.templateId ?? "template-1";
  const category = params.category ?? "Business";
  const config = buildSelectedConfig(templateId, category);
  const variables = getTemplateVariables(templateId);

  return (
    <main
      className="min-h-screen w-full overflow-x-hidden bg-white"
      style={variables}
    >
      {config.sections.map((section) => {
        const Component = sectionRegistry[section.variant];
        const defaultVariant = `${section.type}-1`;
        const variantData =
          section.data?.[section.variant] ?? section.data?.[defaultVariant];

        if (!Component) return null;

        return (
          <Component
            key={`${section.type}-${section.variant}`}
            data={variantData as SectionData}
          />
        );
      })}

      <style>{`
        html {
          scroll-behavior: smooth;
          scrollbar-color: rgba(49, 95, 244, .45) transparent;
          scrollbar-width: thin;
        }

        body {
          margin: 0;
          background: white;
        }

        body::-webkit-scrollbar {
          width: 8px;
        }

        body::-webkit-scrollbar-track {
          background: transparent;
        }

        body::-webkit-scrollbar-thumb {
          border-radius: 999px;
          background: rgba(49, 95, 244, .45);
        }
      `}</style>
    </main>
  );
}
