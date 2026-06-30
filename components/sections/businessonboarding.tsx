"use client";

import { useState, useEffect } from "react";
import { useFooter } from "../layout/footercontext";
import Categorystep from "./categorystep";
import CategoryType from "./categorytype";
import TemplatePreview from "./templatepreview";

const steps: { title: string; subtitle: string }[] = [
  { title: "Category", subtitle: "" },
  { title: "Category Data", subtitle: "" },
  { title: "Design", subtitle: "" },
];

export default function BusinessOnboarding({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(0);
  const { setHideFooter } = useFooter();
  const [loadspinner, setLoadspinner] = useState(false);

  useEffect(() => {
    setHideFooter(true);

    return () => {
      setHideFooter(false);
    };
  }, [setHideFooter]);

  const handleContinue = async () => {
    setLoadspinner(true);

    await new Promise((resolve) => setTimeout(resolve, 200)); // 1 second

    if (step < steps.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      console.log("Completed");
    }

    setLoadspinner(false);
  };

  return (
    <div className="w-full h-dvh z-10 flex justify-center items-center overflow-hidden ">
      <div className="w-full lg:max-w-6xl m-2 lg:mt-4 max-h-[calc(100dvh-80px)] overflow-hidden">
        <div>
          {step === 0 && <Categorystep />}
          {step === 1 && <CategoryType />}
          {step === 2 && <TemplatePreview />}
        </div>
      </div>

      <div className="w-full bg-white flex justify-between py-1 px-5 lg:px-17 fixed bottom-0 border-t border-gray-200">
        <button
          type="button"
          onClick={step === 0 ? onBack : () => setStep((prev) => prev - 1)}
          className="cursor-pointer px-8 py-2.5 border border-gray-300 rounded-xl"
        >
          Back
        </button>

        <button
          type="button"
          onClick={handleContinue}
          disabled={loadspinner}
          className="bg-[var(--red)] text-white px-8 py-2.5 rounded-xl font-bold disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
        >
          {loadspinner && (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          )}

          {loadspinner ? "Loading..." : "Continue"}
        </button>
      </div>
    </div>
  );
}
