"use client";

import { useEffect, useMemo, useState } from "react";
import Webdiffer from "./webdiffer";
import Image from "next/image";
import BusinessOnboarding from "./businessonboarding";

export default function Main() {
  const words = useMemo(() => ["Today", "in Minutes"], []);

  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex] || "";
    const isComplete = text === currentWord;
    const isEmpty = text === "";

    const speed = isDeleting ? 110 : isComplete ? 1900 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (isComplete) {
          setIsDeleting(true);
          return;
        }

        setText(currentWord.slice(0, text.length + 1));
      } else {
        if (isEmpty) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
          return;
        }

        setText(currentWord.slice(0, text.length - 1));
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words]);

  return (
    <div className="w-full h-screen flex flex-col md:justify-center items-center relative">
      <div className="absolute left-0 top-0 h-full w-full max-w-[600px] pointer-events-none">
        <Image
          src="/texture-left.png"
          alt="left-texture"
          fill
          className="object-contain object-left-top"
          priority
        />
      </div>

      <div className="absolute right-0 top-0 h-full w-full max-w-[600px] pointer-events-none">
        <Image
          src="/texture-right.png"
          alt="right-texture"
          fill
          className="object-contain object-right-top"
          priority
        />
      </div>

      {!showOnboarding ? (
        <>
          <div className="w-full text-center flex flex-col gap-3 px-4 z-10">
            <h1 className="text-4xl sm:text-4xl md:text-6xl lg:text-[60px] 2xl:text-[95px] font-bold tracking-tight mt-25 lg:mt-10">
              Build Your <br />
              <span className="relative inline-block whitespace-nowrap">
                <span className="text-[var(--red)]">Website</span>

                <span className="text-black">
                  {" "}
                  {text}
                  <span className="ml-1 animate-pulse animate-fade-cursor text-6xl">
                    |
                  </span>
                </span>
              </span>
            </h1>

            <p className="text-gray-600 text-sm font-medium">
              Create a stunning website in minutes with the power of AI, expert
              guidance, or <br /> your own custom design.
            </p>
          </div>

          <div className="w-full max-w-6xl z-10 mt-2 lg:mt-5 mb-4 lg:mb-0">
            <Webdiffer onStart={() => setShowOnboarding(true)} />
          </div>
        </>
      ) : (
        <BusinessOnboarding onBack={() => setShowOnboarding(false)} />
      )}
    </div>
  );
}
