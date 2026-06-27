import Image from "next/image";
import Link from "next/link";
import { SectionProps } from "./../../../types/section";

export default function AboutTwo({ data }: SectionProps) {
  return (
    <section className="w-full bg-white px-4 py-10 md:px-10 lg:px-16">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_1.6fr_1fr] lg:items-end">
        {/* Left Content */}
        <div className="flex flex-col gap-10">
          <div>
            {data.pretitle && (
              <p className="mb-4 text-sm font-medium uppercase tracking-widest text-gray-500">
                {data.pretitle}
              </p>
            )}

            <h2 className="text-7xl font-black uppercase leading-[0.85] tracking-tight text-black sm:text-8xl lg:text-9xl">
              {data.title}
            </h2>
          </div>

          <div className="space-y-4">
            {data.subtitle && (
              <p className="text-sm font-medium text-black">{data.subtitle}</p>
            )}

            {data.desc && (
              <p className="max-w-xs text-base leading-relaxed text-black">
                {data.desc}
              </p>
            )}

            {data.buttons?.length ? (
              <div className="flex flex-wrap gap-4">
                {data.buttons.map((button) => (
                  <Link
                    key={button.label}
                    href={button.href}
                    className={`rounded-lg px-6 py-3 text-sm font-semibold transition ${
                      button.variant === "primary"
                        ? "bg-black text-white"
                        : "border border-black text-black"
                    }`}
                  >
                    {button.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        {/* Center Image */}
        <div className="relative h-[260px] overflow-hidden rounded-[28px] sm:h-[360px] lg:h-[420px]">
          <Image
            src={data.backgroundImage ?? ""}
            alt={data.backgroundImageTitle ?? ""}
            fill
            className="object-cover"
          />
        </div>

        {/* Right Content */}
        <div className="flex flex-col gap-8">
          <div className="relative h-[150px] overflow-hidden rounded-[28px] sm:h-[200px]">
            <Image
              src={data.sideImage ?? ""}
              alt={data.sideImageTitle ?? ""}
              fill
              className="object-cover"
            />
          </div>

          <div>
            {data.philosophyTitle && (
              <h3 className="mb-6 text-3xl font-bold text-black lg:text-4xl">
                {data.philosophyTitle}
              </h3>
            )}

            {data.philosophyDesc && (
              <p className="text-base leading-relaxed text-black">
                {data.philosophyDesc}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
