import type { SectionProps } from "../../../types/section";
import {
  BannerButtons,
  BannerMedia,
  getBannerStyle,
} from "./categoryBannerShared";

export default function SchoolBanner1({ data = {} }: SectionProps) {
  return (
    <section
      className="relative flex w-full items-center overflow-hidden bg-[#143b65] px-5 py-16 sm:px-10"
      style={getBannerStyle(data, "#143b65")}
    >
      <BannerMedia data={data} className="object-cover" />
      <div className="absolute inset-0 bg-[#0e3157]/55" />
      <div className="absolute -left-16 -top-20 h-52 w-52 rounded-full bg-[#ffd45c]/90" />
      <div className="absolute -bottom-16 right-[8%] h-40 w-40 rounded-full bg-[#ef6b5b]/90" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="max-w-2xl rounded-[2rem] bg-white p-7 shadow-2xl sm:p-10 lg:p-14">
          <p className="mb-5 inline-flex rounded-full bg-[#fff1bd] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#8b6010]">
            {data.pretitle}
          </p>
          <h1 className="text-4xl font-extrabold leading-[1.04] tracking-[-0.03em] text-[#143b65] sm:text-5xl lg:text-6xl">
            {data.title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-slate-600">
            {data.desc}
          </p>
          <div className="mt-8">
            <BannerButtons
              data={data}
              primaryClassName="inline-flex rounded-full bg-[#ef6b5b] px-6 py-3 text-sm font-bold text-white"
              secondaryClassName="inline-flex rounded-full border-2 border-[#143b65] px-6 py-3 text-sm font-bold text-[#143b65]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
