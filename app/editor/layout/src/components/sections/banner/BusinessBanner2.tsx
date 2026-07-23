import type { SectionProps } from "../../../types/section";
import {
  BannerButtons,
  BannerMedia,
  getBannerStyle,
} from "./categoryBannerShared";

export default function BusinessBanner2({ data = {} }: SectionProps) {
  return (
    <section
      className="grid w-full overflow-hidden bg-[#f4f0e8] lg:grid-cols-2"
      style={getBannerStyle(data, "#f4f0e8")}
    >
      <div className="relative min-h-[380px] lg:order-1">
        <BannerMedia data={data} className="object-cover" />
        <div className="absolute inset-6 border border-white/55" />
        <div className="absolute right-0 top-12 bg-[#ff5d3b] px-5 py-3 text-xs font-bold uppercase tracking-[0.22em] text-white">
          Built to perform
        </div>
      </div>

      <div className="relative flex flex-col justify-center px-6 py-20 sm:px-12 lg:order-2 lg:px-16 xl:px-24">
        <span className="absolute right-8 top-8 text-8xl font-black leading-none text-[#102a43]/5">
          02
        </span>
        <p className="mb-6 text-xs font-bold uppercase tracking-[0.28em] text-[#ff5d3b]">
          {data.pretitle}
        </p>
        <h1 className="max-w-2xl text-4xl font-black leading-[1.02] tracking-[-0.035em] text-[#102a43] sm:text-5xl xl:text-6xl">
          {data.title}
        </h1>
        <p className="mt-7 max-w-xl border-l-4 border-[#ff5d3b] pl-5 text-base leading-7 text-[#536475]">
          {data.desc}
        </p>
        <div className="mt-9">
          <BannerButtons
            data={data}
            primaryClassName="inline-flex bg-[#102a43] px-6 py-3 text-sm font-bold text-white"
            secondaryClassName="inline-flex border border-[#102a43] px-6 py-3 text-sm font-bold text-[#102a43]"
          />
        </div>
      </div>
    </section>
  );
}
