import Link from "next/link";
import Image from "next/image";
import { SectionProps } from "./../../../types/section";

export default function BannerTwo({ data }: SectionProps) {
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
        <div
          className="absolute inset-0 bg-black/40"
          style={{
            backgroundColor: data.overlayColor,
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center gap-3 px-4 text-center">
          {data.pretitle && (
            <p className="text-lg font-medium lg:text-xl text-(--secondary-pretitle-text)">
              {data.pretitle}
            </p>
          )}

          <h1
            className="max-w-4xl text-3xl font-semibold leading-tight text-white lg:text-5xl"
            style={{
              color: data.titleColor,
            }}
          >
            {data.title}
          </h1>

          {data.desc && (
            <p className="max-w-3xl text-md text-(--secondary-subtitle-text) lg:text-md">
              {data.desc}
            </p>
          )}

          {!!data.buttons?.length && (
            <div className="flex items-center gap-2">
              {data.buttons.map((button) => (
                <Link
                  key={button.label}
                  href={button.href}
                  className="mt-2 inline-block rounded-full bg-(--secondary-link-bg) px-5 py-2 font-medium text-(--secondary-link-color)"
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
