import React from "react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-(--hero-bg) p-4 flex items-center w-full h-screen">
      <div className="w-1/2 h-full">
        <h1 className="text-7xl leading-20 font-semibold text-(--hero-title)">
          Watch your cart shrink in a single click.
        </h1>

        <Link
          href="#"
          className="bg-(--primary-link-bg) text-(--primary-link-color) py-2 px-4 inline-block mt-3"
        >
          View more
        </Link>
      </div>

      <div className="w-1/2"></div>
    </section>
  );
}
