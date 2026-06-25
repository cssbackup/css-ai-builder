import Link from "next/link";
import { SectionProps } from "./../../../types/section";

export default function BannerOne({ data }: SectionProps) {
  return (
    <section className="flex h-screen w-full items-center bg-(--hero-bg) p-4">
      <div className="w-full lg:w-1/2">
        <h1 className="text-5xl font-semibold leading-tight text-(--hero-title) lg:text-7xl">
          {data.title}
        </h1>

        {data.subtitle && (
          <p className="mt-4 text-lg text-(--hero-title) lg:text-xl">
            {data.subtitle}
          </p>
        )}


        {!!data.buttons?.length && (
          <div className="hidden items-center gap-2 md:flex">
            {data.buttons.map((button) => (
               <Link
                key={button.label}

            href={button.href}
            className="mt-6 inline-block bg-(--primary-link-bg) px-4 py-2 text-(--primary-link-color)"
          >
            {button.label}
          </Link>
            ))}
          </div>
        )}

      </div>

      <div className="hidden lg:block lg:w-1/2" />
    </section>
  );
}
