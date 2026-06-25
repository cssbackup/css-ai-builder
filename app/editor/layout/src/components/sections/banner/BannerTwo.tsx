import Link from "next/link";
import { SectionProps } from "./../../../types/section";

export default function BannerTwo({ data }: SectionProps) {
  return (
    <section className="bg-(--hero-bg) min-h-screen flex items-center justify-center text-center px-6">
      <div className="max-w-4xl">
        <h1 className="text-6xl font-bold text-(--hero-title)">{data.title}</h1>

        {data.subtitle && (
          <p className="mt-5 text-xl text-(--hero-title)">{data.subtitle}</p>
        )}

        {data.buttons?.[0] && (
          <Link
            href={data.buttons[0].href}
            className="inline-block mt-6 px-6 py-3 bg-(--primary-link-bg) text-(--primary-link-color)"
          >
            {data.buttons[0].label}
          </Link>
        )}
      </div>
    </section>
  );
}
