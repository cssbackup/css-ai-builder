import type { SectionProps } from "../../../types/section";
import {
  BannerButtons,
  BannerMedia,
  getBannerStyle,
} from "./categoryBannerShared";

export default function RealEstateBanner2({ data = {} }: SectionProps) {
  return (
    <section
      className="relative flex w-full items-end overflow-hidden"
      style={getBannerStyle(data, "#142019")}
    >
      <BannerMedia data={data} className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#09110b]/10 via-[#09110b]/35 to-[#09110b]/90" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-end gap-8 px-6 pb-10 pt-36 sm:px-10 lg:grid-cols-[1fr_360px] lg:px-14 lg:pb-14">
        <div>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.32em] text-[#e7d5ae]">
            {data.pretitle}
          </p>
          <h1 className="max-w-4xl font-serif text-5xl leading-none text-white sm:text-6xl lg:text-8xl">
            {data.title}
          </h1>
        </div>

        <aside className="border-l border-white/40 bg-white/10 p-6 text-white backdrop-blur-md">
          <p className="mb-6 text-sm leading-6 text-white/75">{data.desc}</p>
          <BannerButtons
            data={data}
            primaryClassName="inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#142019]"
            secondaryClassName="inline-flex rounded-full border border-white/60 px-6 py-3 text-sm font-semibold text-white"
          />
          <div className="mt-7 flex gap-6 border-t border-white/20 pt-5 text-xs uppercase tracking-[0.18em] text-white/65">
            <span>Homes</span>
            <span>Land</span>
            <span>Investments</span>
          </div>
        </aside>
      </div>
    </section>
  );
}
