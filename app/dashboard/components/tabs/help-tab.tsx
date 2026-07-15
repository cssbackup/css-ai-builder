import { BookOpen, ExternalLink, Mail, MessageCircleQuestion } from "lucide-react";

const helpItems = [
  { title: "Getting started", description: "Learn how to choose a template and create your first website.", icon: BookOpen },
  { title: "Using the editor", description: "Understand sections, pages, themes, preview, and publishing.", icon: MessageCircleQuestion },
  { title: "Contact support", description: "Send us a message when you need help with your account.", icon: Mail },
];

export default function HelpTab() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-8 lg:px-9">
      <div><h2 className="text-2xl font-semibold tracking-tight">Help</h2><p className="mt-1 text-xs text-zinc-500">Find answers for the website builder.</p></div>
      <div className="mt-7 grid gap-4 md:grid-cols-3">
        {helpItems.map(({ title, description, icon: Icon }) => <button type="button" key={title} className="group rounded-2xl border border-zinc-200 bg-white p-5 text-left transition hover:border-blue-200 hover:shadow-md"><span className="grid size-10 place-items-center rounded-xl bg-blue-50 text-blue-700"><Icon size={19} /></span><span className="mt-5 flex items-center justify-between text-sm font-medium">{title}<ExternalLink size={15} className="text-zinc-400 group-hover:text-blue-700" /></span><span className="mt-2 block text-xs leading-5 text-zinc-500">{description}</span></button>)}
      </div>
    </section>
  );
}
