import type { SectionProps } from "../../../types/section";
import {
  BannerButtons,
  BannerMedia,
  getBannerStyle,
} from "./categoryBannerShared";

export default function EcommerceBanner2({ data = {} }: SectionProps) {
  return (
    <section
      className="grid w-full overflow-hidden bg-[#f7f4ef] lg:grid-cols-[46%_54%]"
      style={getBannerStyle(data, "#f7f4ef")}
    >
      <div className="relative order-2 flex flex-col justify-center px-6 py-16 sm:px-12 lg:order-1 lg:px-16 xl:px-24">
        <span className="absolute right-5 top-2 font-serif text-[9rem] leading-none text-[#281d18]/5">
          02
        </span>
        <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.38em] text-[#a05b43]">
          {data.pretitle}
        </p>
        <h1 className="max-w-2xl font-serif text-5xl leading-[0.98] text-[#281d18] sm:text-6xl xl:text-7xl">
          {data.title}
        </h1>
        <p className="mt-7 max-w-lg text-base leading-7 text-[#74645d]">
          {data.desc}
        </p>
        <div className="mt-9">
          <BannerButtons
            data={data}
            primaryClassName="inline-flex rounded-full bg-[#a05b43] px-7 py-3 text-xs font-bold uppercase tracking-[0.15em] text-white"
            secondaryClassName="inline-flex rounded-full border border-[#281d18] px-7 py-3 text-xs font-bold uppercase tracking-[0.15em] text-[#281d18]"
          />
        </div>
      </div>

      <div className="relative order-1 min-h-[430px] lg:order-2 lg:m-6 lg:ml-0">
        <BannerMedia data={data} className="object-cover" />
        <div className="absolute inset-0 ring-1 ring-inset ring-black/10" />
        <div className="absolute bottom-5 right-5 rounded-full bg-[#f7f4ef] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#281d18]">
          New collection
        </div>
      </div>
    </section>
  );
}
