import Image from "next/image";
import { ProductCardData, SectionProps } from "./../../../types/section";
import {
  getBlocksByType,
  getTextBlockByRole,
  resolveSectionBlocks,
} from "../types/section";
import BlockRenderer from "../blocks/BlockRenderer";

const fallbackCards: ProductCardData[] = [
  {
    title: "Virtual walkthrough first",
    category: "Walkthrough",
    desc: "A guided tour of your site before the AI writes a single line of code.",
    image: "/bg1.jpg",
    imageTitle: "Website builder laptop",
  },
  {
    title: "AI-powered page builder",
    category: "AI Builder",
    desc: "Describe what you need. The AI generates it in seconds, not weeks.",
    image: "/bg2.jpg",
    imageTitle: "AI page builder desk setup",
  },
  {
    title: "Fast-loading pages",
    category: "Performance",
    desc: "Clean code means your site loads fast on any device, anywhere.",
    image: "/blackbay.png",
    imageTitle: "Fast loading mobile website",
  },
  {
    title: "Built for New Delhi",
    category: "Local SEO",
    desc: "Local SEO and regional optimization built in. Your site shows up where it matters.",
    image: "/shaye.png",
    imageTitle: "New Delhi street",
  },
  {
    title: "One person, full focus",
    category: "Custom Build",
    desc: "No account managers, no committees. Just Muneeb building your site from scratch.",
    image: "/stylam.png",
    imageTitle: "Developer working at desk",
  },
  {
    title: "Simple pricing, no surprises",
    category: "Pricing",
    desc: "What you see is what you pay. No hidden fees or upsells for basic features.",
    image: "/prod2.jpg",
    imageTitle: "Simple pricing card",
  },
];

export default function ProductThree({ data = {}, blocks }: SectionProps) {
  const resolvedBlocks = resolveSectionBlocks({ blocks, data });
  const cardBlocks = getBlocksByType(resolvedBlocks, "card");
  const productCards = cardBlocks.length ? cardBlocks : fallbackCards;
  const buttonBlocks = getBlocksByType(resolvedBlocks, "button");

  return (
    <section className="w-full bg-[#0d1f2a] px-4 py-12 text-white md:px-8 lg:px-14">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="mb-8 text-sm font-bold uppercase tracking-wide">
              {getTextBlockByRole(resolvedBlocks, "pretitle")?.content ??
                "How we build"}
            </p>

            <BlockRenderer
              block={getTextBlockByRole(resolvedBlocks, "heading")}
              className="max-w-xl text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl"
            />
          </div>

          <div className="lg:pt-12">
            <BlockRenderer
              block={getTextBlockByRole(resolvedBlocks, "paragraph")}
              className="max-w-2xl text-xl font-medium leading-relaxed md:text-2xl"
            />

            <div className="mt-10 flex flex-wrap gap-5">
              {buttonBlocks.map((button, index) => (
                <BlockRenderer
                  key={button.id}
                  block={button}
                  className={`rounded-2xl px-8 py-5 text-base font-bold transition ${
                    index === 0
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-blue-200 text-black hover:bg-blue-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-24 grid gap-x-9 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {productCards.map((card) => (
            <article key={"id" in card ? card.id : card.title}>
              <div className="relative h-[280px] overflow-hidden rounded-2xl md:h-[320px]">
                <Image
                  src={card.image ?? "/bg1.jpg"}
                  alt={card.alt ?? card.title ?? "Product"}
                  fill
                  className="object-cover"
                />
              </div>

              <h3 className="mt-7 text-3xl font-bold tracking-tight text-white">
                {card.title}
              </h3>

              <p className="mt-4 text-base font-medium leading-relaxed text-white">
                {card.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
