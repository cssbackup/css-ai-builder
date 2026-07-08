import type { SectionProps } from "../../../types/section";
import FormFieldControl from "./FormFieldControl";

const fallbackFields = [
  { label: "Name", type: "text" as const, placeholder: "Your name" },
  { label: "Email", type: "email" as const, placeholder: "you@example.com" },
  { label: "Message", type: "textarea" as const, placeholder: "Tell us what you need" },
];

export default function FormDetailTwo({ data = {} }: SectionProps) {
  const fields = data.formFields?.length ? data.formFields : fallbackFields;

  return (
    <section className="bg-slate-950 px-5 py-12 text-white sm:px-6 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">{data.title ?? "Start the conversation."}</h2>
        </div>
        <div className="mt-8 space-y-4 bg-white p-5 text-slate-950 sm:mt-10 sm:p-6">
          {fields.map((field) => (
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
