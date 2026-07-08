import type { SectionProps } from "../../../types/section";
import FormFieldControl from "./FormFieldControl";

export default function FormDetailFour({ data = {} }: SectionProps) {
  return (
    <section className="bg-white px-5 py-12 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-5xl border-y border-slate-200 py-10 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
          <div>
            <h2 className="text-3xl font-semibold text-slate-950 sm:text-4xl">{data.title ?? "Need help choosing?"}</h2>
            <p className="mt-4 max-w-xl text-slate-600">{data.desc ?? "Use this compact form when the page needs a quick lead capture block."}</p>
          </div>
          <div className="space-y-4">
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
      </div>
    </section>
  );
}
