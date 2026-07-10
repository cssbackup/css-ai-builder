import type { SectionProps } from "../../../types/section";
import FormFieldControl from "./FormFieldControl";

export default function FormDetailThree({ data = {} }: SectionProps) {
  return (
    <section className="bg-[#f8fafc] px-5 py-12 sm:px-6 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-0 overflow-hidden bg-white shadow-sm lg:grid-cols-[0.9fr_1.1fr]">
        <div className="bg-blue-600 p-6 text-white sm:p-10">
          {data.title && <h2 className="text-3xl font-semibold sm:text-4xl">{data.title}</h2>}
          {data.desc && <p className="mt-4 text-blue-50">{data.desc}</p>}
          <div className="mt-8 space-y-2 text-sm font-semibold">
            {data.phone && <p>{data.phone}</p>}
            {data.email && <p>{data.email}</p>}
            {data.location && <p>{data.location}</p>}
          </div>
        </div>
        <div className="space-y-4 p-5 sm:p-8">
          {(data.formFields ?? []).map((field) => (
            <FormFieldControl
              key={field.label}
              field={field}
              className="h-11 w-full border border-slate-300 px-3"
            />
          ))}
          {data.formSubmitLabel && (
            <button className="w-full bg-blue-600 px-5 py-3 font-semibold text-white">{data.formSubmitLabel}</button>
          )}
        </div>
      </div>
    </section>
  );
}
