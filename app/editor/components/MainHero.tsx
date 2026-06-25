import Layout from "../layout/page";
type MainHeroProps = {
  collapsed: boolean;
};

export default function MainHero({ collapsed }: MainHeroProps) {
  return (
    <section
      className={`h-screen overflow-hidden bg-white transition-all duration-300 ${
        collapsed ? "md:pl-16" : "md:pl-52"
      }`}
    >
      <div className="relative h-[calc(100vh-4rem)] w-full px-3 pt-2 mt-14">
        <div className="relative h-full w-full rounded-lg border overflow-hidden">
          <Layout />
        </div>
      </div>
    </section>
  );
}
