import Image from "next/image";

export default function AboutTwo() {
  return (
    <section className="w-full bg-white px-4 py-10 md:px-10 lg:px-16">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_1.6fr_1fr] lg:items-end">
        {/* Left Content */}
        <div className="flex flex-col gap-10">
          <h2 className="text-7xl font-black uppercase leading-[0.85] tracking-tight text-black sm:text-8xl lg:text-9xl">
            About <br /> Us
          </h2>

          <div className="space-y-8">
            <p className="text-sm font-medium text-black">
              Luxurious Interior and Industrial Design
            </p>

            <p className="max-w-xs text-base leading-relaxed text-black">
              Modern Elegance: Designs featuring clean lines, neutral palettes,
              and high-quality materials.
            </p>
          </div>
        </div>

        {/* Center Image */}
        <div className="relative h-[260px] overflow-hidden rounded-[28px] sm:h-[360px] lg:h-[420px]">
          <Image
            src="/blackbay.png"
            alt="Modern luxury living room interior"
            fill
            className="object-cover"
          />
        </div>

        {/* Right Content */}
        <div className="flex flex-col gap-8">
          <div className="relative h-[150px] overflow-hidden rounded-[28px] sm:h-[200px]">
            <Image
              src="/shaye.png"
              alt="Luxury interior chair design"
              fill
              className="object-cover"
            />
          </div>

          <div>
            <h3 className="mb-6 text-3xl font-bold text-black lg:text-4xl">
              Our Philosophy
            </h3>

            <p className="text-base leading-relaxed text-black">
              At Britto Charette, we believe in creating luxurious, personalized
              environments that reflect our clients’ tastes and lifestyles.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
