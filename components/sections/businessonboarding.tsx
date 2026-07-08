"use client";

import { useState, useEffect } from "react";
import { useFooter } from "../layout/footercontext";
import Categorystep from "./categorystep";
import CategoryType from "./categorytype";
import TemplatePreview from "./templatepreview";
import Button from "@/components/ui/Button";

type BusinessInfo = {
  audience: "" | "clients" | "myself" | "company";
  name: string;
  description: string;
};

const steps: { title: string; subtitle: string }[] = [
  { title: "Category", subtitle: "" },
  { title: "Category Data", subtitle: "" },
  { title: "Design", subtitle: "" },
];

export default function BusinessOnboarding({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(0);
  const { setHideFooter } = useFooter();
  const [loadspinner, setLoadspinner] = useState(false);
  const [businessInfoSubmitted, setBusinessInfoSubmitted] = useState(false);
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({
    audience: "clients",
    name: "",
    description: "",
  });
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    setHideFooter(true);

    return () => {
      setHideFooter(false);
    };
  }, [setHideFooter]);

  const isBusinessInfoValid =
    Boolean(businessInfo.audience) &&
    Boolean(businessInfo.name.trim()) &&
    Boolean(businessInfo.description.trim());

  const handleContinue = async () => {
    if (step === 0 && !isBusinessInfoValid) {
      setBusinessInfoSubmitted(true);
      return;
    }

    if (step === 1 && !selectedCategory) {
      return;
    }

    setLoadspinner(true);

    await new Promise((resolve) => setTimeout(resolve, 200));
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
          {step === 0 && (
            <Categorystep
              value={businessInfo}
              showErrors={businessInfoSubmitted}
              onChange={(nextValue) => {
                setBusinessInfo(nextValue);
                if (
                  nextValue.audience &&
                  nextValue.name.trim() &&
                  nextValue.description.trim()
                ) {
                  setBusinessInfoSubmitted(false);
                }
              }}
            />
          )}
          {step === 1 && (
            <CategoryType
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          )}
          {step === 2 && (
            <TemplatePreview selectedCategory={selectedCategory} />
          )}
        </div>
      </div>

      <div className="w-full bg-white flex justify-between py-1 px-5 lg:px-17 fixed bottom-0 border-t border-gray-200">
        <Button
          type="button"
          onClick={step === 0 ? onBack : () => setStep((prev) => prev - 1)}
          variant="secondary"
          className="font-medium"
        >
          Back
        </Button>

        <Button
          type="button"
          onClick={handleContinue}
          disabled={loadspinner || (step === 1 && !selectedCategory)}
          variant="danger"
          className="font-medium"
        >
          {loadspinner && (
            <span className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
          )}
          {loadspinner ? "Loading..." : "Continue"}
        </Button>
      </div>
    </div>
  );
}
