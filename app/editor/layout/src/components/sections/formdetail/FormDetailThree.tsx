import type { SectionProps } from "../../../types/section";
import FormFieldControl from "./FormFieldControl";

export default function FormDetailThree({ data = {} }: SectionProps) {
  return (
    <section className="bg-[#f8fafc] px-5 py-12 sm:px-6 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-0 overflow-hidden bg-white shadow-sm lg:grid-cols-[0.9fr_1.1fr]">
        <div className="bg-blue-600 p-6 text-white sm:p-10">
          <h2 className="text-3xl font-semibold sm:text-4xl">{data.title ?? "Request details"}</h2>
          <p className="mt-4 text-blue-50">{data.desc ?? "Share your details and our team will respond soon."}</p>
          <div className="mt-8 space-y-2 text-sm font-semibold">
            <p>{data.phone ?? "+91 98765 43210"}</p>
            <p>{data.email ?? "hello@example.com"}</p>
            <p>{data.location ?? "India"}</p>
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
          <button className="w-full bg-blue-600 px-5 py-3 font-semibold text-white">{data.formSubmitLabel ?? "Submit"}</button>
        </div>
      </div>
    </section>
  );
}
