import type { SectionProps } from "../../../types/section";
import {
  BannerButtons,
  BannerMedia,
  getBannerStyle,
} from "./categoryBannerShared";

export default function SchoolBanner2({ data = {} }: SectionProps) {
  return (
    <section
      className="grid w-full overflow-hidden bg-[#ffd84d] lg:grid-cols-[55%_45%]"
      style={getBannerStyle(data, "#ffd84d")}
    >
      <div className="relative z-10 flex flex-col justify-center px-6 py-20 sm:px-12 lg:px-20 xl:px-28">
        <p className="mb-5 text-xs font-extrabold uppercase tracking-[0.3em] text-[#27528a]">
          {data.pretitle}
        </p>
        <h1 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-[-0.045em] text-[#102f55] sm:text-6xl xl:text-7xl">
          {data.title}
        </h1>
        <p className="mt-7 max-w-xl text-base font-medium leading-7 text-[#324d68]">
          {data.desc}
        </p>
        <div className="mt-9">
          <BannerButtons
            data={data}
            primaryClassName="inline-flex rounded-xl bg-[#102f55] px-6 py-3 text-sm font-bold text-white shadow-[5px_5px_0_#ef6b5b]"
            secondaryClassName="inline-flex rounded-xl border-2 border-[#102f55] px-6 py-3 text-sm font-bold text-[#102f55]"
          />
        </div>
      </div>

      <div className="relative min-h-[420px] overflow-hidden bg-[#102f55] lg:my-10 lg:mr-10 lg:rounded-[48%_48%_8px_8px]">
        <BannerMedia data={data} className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#102f55]/65 to-transparent" />
        <p className="absolute bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-bold uppercase tracking-[0.22em] text-white">
          Learn · Create · Belong
        </p>
      </div>
    </section>
  );
}
