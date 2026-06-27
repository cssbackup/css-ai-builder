import Link from "next/link";
import Image from "next/image";
import { SectionProps } from "./../../../types/section";

export default function BannerOne({ data }: SectionProps) {
  return (
    <section className="flex h-[70dvh] w-full items-center">
      <div className="relative h-full w-full overflow-hidden">
        {/* Background Image */}
        {data.backgroundImage && (
          <Image
            src={data.backgroundImage}
            alt={data.backgroundImageTitle}
            fill
            className="object-cover"
          />
        )}

        {/* Optional Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col justify-center gap-2 px-6">
          {data.pretitle && (
            <p className="text-lg text-(--primary-pretitle-text) lg:text-xl">
              {data.pretitle}
            </p>
          )}

          <h1 className="text-3xl font-semibold leading-tight text-(--primary-title-text) lg:text-5xl">
            {data.title}
          </h1>

          {data.desc && (
            <p className="text-lg text-(--primary-subtitle-text) lg:text-md w-60dvw">
              {data.desc}
            </p>
          )}

          {!!data.buttons?.length && (
            <div className="flex items-center gap-2">
              {data.buttons.map((button) => (
                <Link
                  key={button.label}
                  href={button.href}
                  className="mt-2 inline-block bg-(--primary-link-bg) px-4 py-2 text-(--primary-link-color)"
                >
                  {button.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
