import Layout from "../layout/page";
type MainHeroProps = {
  collapsed: boolean;
};

export default function MainHero({ collapsed }: MainHeroProps) {
  return (
    <section
      className={`min-h-screen bg-white transition-all overflow-hidden duration-300 ${
        collapsed ? "md:pl-14" : "md:pl-42"
      }`}
    >
      <div className="relative h-[calc(100vh-4rem)] w-full px-3 pt-2 mt-14">
        <div className="relative h-full w-full overflow-y-auto rounded-lg border">
          <Layout />
        </div>
      </div>
    </section>
  );
}
