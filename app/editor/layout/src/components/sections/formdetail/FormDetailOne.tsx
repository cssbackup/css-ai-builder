import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import type { SectionProps } from "../../../types/section";
import FormFieldControl from "./FormFieldControl";

const fallbackFields = [
  { label: "Your Name", type: "text" as const, placeholder: "John Doe" },
  { label: "Your Email", type: "email" as const, placeholder: "johndoe@gmail.com" },
  { label: "Your Password", type: "text" as const, placeholder: "•••••••" },
];
const getFields = (data: SectionProps["data"]) =>
  data?.formFields?.length ? data.formFields : fallbackFields;

export default function FormDetailOne({ data = {} }: SectionProps) {
  const image = data.backgroundImage ?? data.sideImage ?? data.galleryItems?.[0]?.image ?? "/categories/school/bg33.png";

  return (
    <section className="bg-[#dfecea] px-4 py-10 sm:px-5 sm:py-12">
      <div className="mx-auto grid max-w-7xl gap-0 overflow-hidden rounded-[28px] bg-white shadow-2xl sm:rounded-[46px] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative min-h-[420px] overflow-hidden bg-[#061815] p-5 sm:min-h-[560px] sm:p-10">
          <Image src={image} alt={data.backgroundImageTitle ?? "Form visual"} data-editor-media data-editor-media-type="image" data-editor-media-src={image} fill className="object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-transparent to-black/50" />
          <div className="relative z-10 flex h-full items-center justify-center">
            <div className="w-full max-w-md rounded-[24px] bg-[#eef0cf]/45 p-6 text-white backdrop-blur-sm sm:rounded-[28px] sm:p-10">
              <button className="mb-10 flex h-10 w-20 items-center justify-center rounded-full bg-white/25 sm:mb-16">
                <ArrowRight />
              </button>
              <p className="text-sm">Hi Welcome!!</p>
              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{data.title ?? "Let's Get Started"}</h2>
              <p className="mt-5 text-sm leading-6 text-white/90">
                {data.desc ?? "Create an account and get access to the full feature set."}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center px-5 py-10 sm:px-10 sm:py-14">
          <div className="mx-auto w-full max-w-md">
            <h3 className="text-3xl font-bold text-slate-950 sm:text-4xl">Sign Up</h3>
            <div className="mt-8 space-y-4">
              {getFields(data).map((field) => (
                <label key={field.label} className="block">
                  <span className="text-sm font-medium text-slate-400">{field.label}</span>
                  <div className="relative mt-2">
                    <FormFieldControl
                      field={field}
                      className="h-12 w-full rounded-full border-0 bg-[#eef7f4] px-5 pr-12 text-sm font-semibold outline-none"
                    />
                    <span className="absolute right-4 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-emerald-400 text-white">
                      <Check size={14} />
                    </span>
                  </div>
                </label>
              ))}
              <button className="mt-5 w-full rounded-full bg-[#00645d] px-5 py-4 text-sm font-bold text-white shadow-lg">
                {data.formSubmitLabel ?? "CREATE ACCOUNT"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
