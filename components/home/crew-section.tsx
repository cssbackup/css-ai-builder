import { Braces, Layers3, Rocket, Sparkles } from "lucide-react";

const cards = [
  {
    icon: Braces,
    eyebrow: "AI content engine",
    title: "Content That Fits Your Brand",
    text: "Generate headlines, descriptions, calls to action, and complete website copy designed around your business.",
    points: ["Brand-focused writing", "Instant content generation"],
    className: "left-[25%] top-[350px] w-[250px]",
  },
  {
    icon: Layers3,
    eyebrow: "Professional design",
    title: "Designs Made to Impress",
    text: "Explore modern layouts, responsive sections, and industry-ready templates created to look great on every screen.",
    points: ["Premium layouts", "Fully responsive"],
    className: "left-[50%] top-[145px] w-[360px]",
  },
  {
    icon: Rocket,
    eyebrow: "Creative freedom",
    title: "Customize Without Limits",
    text: "Change sections, colors, fonts, images, and content while AI helps keep your entire website visually consistent.",
    points: ["Easy customization", "Ready to publish"],
    className: "left-[50%] top-[485px] w-[320px]",
  },
];

function IntelligenceCard({ card }: { card: (typeof cards)[number] }) {
  const Icon = card.icon;
  return (
    <article
      data-intelligence-card
      className={`group bg-[#242424] p-8 text-white shadow-[0_22px_55px_rgba(18,35,28,.16)] ${card.className}`}
    >
      <div
        data-intelligence-orb
        className="-mt-14 mb-5 grid size-16 place-items-center rounded-[1.25rem] border border-white/50 bg-[linear-gradient(145deg,#efffff_4%,#89a7ff_42%,#5736df_72%,#c9ffb1)] text-white shadow-[0_18px_30px_rgba(57,73,217,.3)] transition duration-500 group-hover:rotate-6 group-hover:scale-110"
      >
        <Icon size={27} />
      </div>
      <p className="text-[9px] font-medium uppercase tracking-[.17em] text-[#b9ff66]">
        {card.eyebrow}
      </p>
      <h3 className="mt-2 text-2xl font-medium tracking-[-.045em]">
        {card.title}
      </h3>
      <p className="mt-3 text-[14px] leading-5 text-white/75">{card.text}</p>
      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-white/10 pt-4">
        {card.points.map((point) => (
          <span key={point} className="text-[9px] text-white/55">
            • &nbsp;{point}
          </span>
        ))}
      </div>
    </article>
  );
}

export default function CrewSection() {
  return (
    <section
      id="crew"
      className="relative overflow-hidden bg-[#fbfcf8] text-[#101713]"
    >
      <div
        data-ribbon
        className="pointer-events-none absolute -left-[12%] top-[52%] h-48 w-[130%] -rotate-[18deg] bg-gradient-to-r from-transparent via-[#b9ff66]/38 to-cyan-200/35 blur-2xl"
      />
      <div
        data-ribbon
        className="pointer-events-none absolute left-[34%] top-[36%] h-40 w-[80%] rotate-[68deg] bg-gradient-to-r from-transparent via-[#b9ff66]/24 to-blue-100/40 blur-xl"
      />

      <div className="relative mx-auto hidden min-h-[860px] max-w-[1320px] lg:block">
        {[25, 50, 75].map((position) => (
          <span
            key={`v-${position}`}
            className="absolute inset-y-0 border-l border-dashed border-[#17251b]/22"
            style={{ left: `${position}%` }}
          />
        ))}

        {[22, 48, 76].map((position) => (
          <span
            key={`h-${position}`}
            className="absolute inset-x-0 border-t border-dashed border-[#17251b]/22"
            style={{ top: `${position}%` }}
          />
        ))}

        <span className="absolute left-[25%] top-[22%] size-1.5 -translate-x-1/2 -translate-y-1/2 bg-[#17251b]" />
        <span className="absolute left-[50%] top-[48%] size-1.5 -translate-x-1/2 -translate-y-1/2 bg-[#17251b]" />
        <span className="absolute left-[75%] top-[76%] size-1.5 -translate-x-1/2 -translate-y-1/2 bg-[#17251b]" />

        <div data-reveal className="absolute left-[5%] top-20 w-[600px] px-5">
          <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-blue-700">
            Your AI website studio
          </p>

          <h2 className="mt-4 text-5xl font-medium leading-[.92] tracking-[-.01em]">
            Everything you need to{" "}
            <span className="font-serif text-6xl italic text-blue-700">
              build beautifully.
            </span>
          </h2>

          <p className="mt-5 text-sm leading-5 text-[#101713]/55">
            Lestow combines intelligent content, professional design, and
            effortless customization in one powerful workspace built to bring
            your ideas online.
          </p>
        </div>

        {cards.map((card) => (
          <div key={card.title} className={`absolute ${card.className}`}>
            <IntelligenceCard card={{ ...card, className: "" }} />
          </div>
        ))}

        <div
          data-reveal
          className="absolute bottom-12 left-[25%] flex items-center gap-3 px-5 text-xs font-medium"
        >
          <span className="grid size-10 place-items-center rounded-full bg-[#dfffc2] text-blue-700">
            <Sparkles size={17} />
          </span>
          One intelligent workspace for designing, editing, and launching.
        </div>
      </div>

      <div className="relative px-5 py-24 sm:px-8 lg:hidden">
        <div data-reveal>
          <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-blue-700">
            Your AI website studio
          </p>

          <h2 className="mt-4 max-w-xl text-5xl font-medium leading-[.92] tracking-[-.06em]">
            Everything you need to{" "}
            <span className="font-serif italic text-blue-700">
              build beautifully.
            </span>
          </h2>

          <p className="mt-5 max-w-xl text-sm leading-6 text-[#101713]/55">
            Create content, explore professional designs, customize every
            detail, and launch your website from one intelligent workspace.
          </p>
        </div>

        <div className="mt-20 grid gap-16 sm:grid-cols-2">
          {cards.map((card) => (
            <IntelligenceCard
              key={card.title}
              card={{ ...card, className: "" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
