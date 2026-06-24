type MainHeroProps = {
  collapsed: boolean;
};

export default function MainHero({ collapsed }: MainHeroProps) {
  return (
    <section
      className={`h-screen overflow-hidden bg-white transition-all duration-300 ${
        collapsed ? "md:pl-12" : "md:pl-52"
      }`}
    >
      <div className="relative h-[calc(100vh-4rem)] w-full px-3 pt-2 mt-14">
        <div className="relative h-full w-full rounded-lg border overflow-hidden bg-white">
          <iframe
            src="https://gonoise.com/"
            title="Website Preview"
            className="h-full w-full"
            allowFullScreen
          />

          {/* Header hover edit layer */}
          <div className="absolute top-0 left-0 w-full h-24 group z-10">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-200 backdrop-blur-sm bg-white/30 border-2 border-blue-500" />

            <button
              onClick={() => console.log("Edit Header")}
              className="absolute top-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all cursor-pointer duration-200 bg-blue-600 text-white text-sm px-4 py-1.5 rounded-md shadow"
            >
              Edit Header
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
