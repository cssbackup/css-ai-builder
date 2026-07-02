import Image from "next/image";
import Link from "next/link";
import { SectionProps } from "./../../../types/section";

export default function AboutOne({ data }: SectionProps) {
  return (
    <div className="bg-(--lightcream-bg) w-full flex items-center py-14">
      <div className="px-6 w-1/2 flex flex-col gap-3">
        <h1 className="text-5xl font-semibold">{data.title}</h1>
        <p>{data.desc}</p>
        {!!data.buttons?.length && (
          <div className="mt-2 flex flex-wrap gap-2">
            {data.buttons.map((button) => (
              <Link
                key={button.label}
                href={button.href}
                className="inline-block rounded-full bg-(--blue-bg) px-5 py-2 font-medium text-(--secondary-link-color)"
              >
                {button.label}
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="relative min-h-80 w-1/2">
        {data.backgroundImage && (
          <Image
            src={data.backgroundImage}
            alt={data.backgroundImageTitle ?? data.title ?? "About image"}
            fill
            className="object-cover"
          />
        )}
      </div>
    </div>
  );
}
