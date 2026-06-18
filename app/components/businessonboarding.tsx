"use client";

import { useState, useEffect } from "react";
import { useFooter } from "./footercontext";
import Categorystep from "./categorystep";

const steps: { title: string; subtitle: string }[] = [];

export default function BusinessOnboarding({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(0);
  const { setHideFooter } = useFooter();

  useEffect(() => {
    setHideFooter(true);

    return () => {
      setHideFooter(false);
    };
  }, [setHideFooter]);

  const handleContinue = () => {
    if (step < steps.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      console.log("Completed");
    }
  };

  return (
    <div className="w-full h-dvh z-10 bg-red-400 flex justify-center items-center">
      <div className="bg-purple-400 min-w-6xl max-w-8xl h-[76dvh]">
        <div className="">
          {step === 0 && (
            <>
              <Categorystep />
            </>
          )}
          {step === 1 && <div>Category data here</div>}
          {step === 2 && <div>Design data here</div>}
        </div>
      </div>

      <div className="w-full flex justify-between bg-green-400 py-1 px-17 fixed bottom-0">
        <button
          type="button"
          onClick={step === 0 ? onBack : () => setStep((prev) => prev - 1)}
        >
          Back
        </button>

        <button
          type="button"
          onClick={handleContinue}
          className="bg-[var(--red)] text-white px-8 py-2.5 rounded-xl font-bold"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
