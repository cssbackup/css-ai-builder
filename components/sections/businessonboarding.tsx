"use client";

import { useState, useEffect } from "react";
import { useFooter } from "../layout/footercontext";
import Categorystep from "./categorystep";
import CategoryType from "./categorytype";
import TemplatePreview from "./templatepreview";
import { ArrowLeft, ArrowRight } from "lucide-react";

type BusinessInfo = {
  audience: "" | "clients" | "myself" | "company";
  name: string;
  description: string;
  websiteRelated:
    | ""
    | "service-provider"
    | "products"
    | "blog"
    | "ngo"
    | "campaign-page";
  pageType: "" | "multi-page" | "single-page";
  email: string;
  mobile: string;
  address: string;
  includeDetails: boolean;
  hasLogo: "" | "yes" | "no";
  logoName: string;
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
    websiteRelated: "",
    pageType: "",
    email: "",
    mobile: "",
    address: "",
    includeDetails: false,
    hasLogo: "",
    logoName: "",
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
    Boolean(businessInfo.description.trim()) &&
    Boolean(businessInfo.websiteRelated) &&
    Boolean(businessInfo.pageType) &&
    (!businessInfo.includeDetails ||
      (Boolean(businessInfo.email.trim()) &&
        Boolean(businessInfo.mobile.trim()) &&
        Boolean(businessInfo.address.trim()))) &&
    Boolean(businessInfo.hasLogo) &&
    (businessInfo.hasLogo !== "yes" || Boolean(businessInfo.logoName));

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
    <main className="relative flex h-dvh w-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_12%_18%,rgba(185,213,255,.55),transparent_30%),radial-gradient(circle_at_88%_82%,rgba(197,244,218,.5),transparent_28%),linear-gradient(140deg,#ffffff_0%,#f3f8ff_48%,#eaf3ff_100%)] px-2.5 pb-[70px] pt-2.5 text-[#08132f] sm:px-5 sm:pb-[74px] sm:pt-4">
      <div className="pointer-events-none absolute left-[28%] top-[-165px] h-[290px] w-[820px] -skew-x-[22deg] overflow-hidden opacity-70">
        <span className="absolute inset-y-0 left-0 w-[18%] bg-gradient-to-r from-transparent via-[#071a3d]/20 to-blue-900/15" />
        <span className="absolute inset-y-0 left-[20%] w-[19%] bg-gradient-to-r from-blue-900/8 via-blue-700/30 to-blue-500/18" />
        <span className="absolute inset-y-0 left-[41%] w-[20%] bg-gradient-to-r from-blue-500/12 via-blue-600/34 to-blue-400/14" />
        <span className="absolute inset-y-0 right-[16%] w-[20%] bg-gradient-to-r from-blue-300/8 via-blue-500/20 to-transparent" />
      </div>
      <div className="pointer-events-none absolute bottom-[-190px] left-[12%] h-[330px] w-[900px] -skew-x-[22deg] overflow-hidden opacity-65">
        <span className="absolute inset-y-0 left-0 w-[18%] bg-gradient-to-r from-transparent via-emerald-950/16 to-green-800/14" />
        <span className="absolute inset-y-0 left-[20%] w-[22%] bg-gradient-to-r from-green-800/10 via-lime-500/34 to-lime-300/14" />
        <span className="absolute inset-y-0 left-[44%] w-[24%] bg-gradient-to-r from-lime-300/12 via-green-500/28 to-emerald-700/14" />
        <span className="absolute inset-y-0 right-[5%] w-[24%] bg-gradient-to-r from-emerald-700/12 via-[#0b2a5b]/18 to-transparent" />
      </div>
      <div className="pointer-events-none absolute -left-28 -top-32 size-[430px] rounded-full bg-blue-300/25 blur-[105px]" />
      <div className="pointer-events-none absolute -right-24 bottom-[-120px] size-[460px] rounded-full bg-emerald-300/25 blur-[110px]" />
      <div className="pointer-events-none absolute right-[8%] top-[5%] size-72 rounded-full border border-blue-900/10 shadow-[0_0_90px_rgba(30,67,133,.14)]" />
      <div className="pointer-events-none absolute right-[12%] top-[9%] size-48 rounded-full border border-blue-900/10" />
      <div className="pointer-events-none absolute bottom-[7%] left-[8%] flex gap-2 opacity-60">
        <span className="size-2 rounded-full bg-[#0b1f4a]" />
        <span className="size-2 rounded-full bg-blue-500" />
        <span className="size-2 rounded-full bg-lime-500" />
      </div>

      <div className="relative z-10 w-full max-w-[1280px] overflow-hidden">
        <div className="w-full">
          {step === 0 && (
            <Categorystep
              value={businessInfo}
              showErrors={businessInfoSubmitted}
              onChange={(nextValue) => {
                setBusinessInfo(nextValue);
                if (
                  nextValue.audience &&
                  nextValue.name.trim() &&
                  nextValue.description.trim() &&
                  nextValue.websiteRelated &&
                  nextValue.pageType &&
                  (!nextValue.includeDetails ||
                    (nextValue.email.trim() &&
                      nextValue.mobile.trim() &&
                      nextValue.address.trim())) &&
                  nextValue.hasLogo &&
                  (nextValue.hasLogo !== "yes" || nextValue.logoName)
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

      <div className="fixed inset-x-0 bottom-0 z-30  bg-transparent px-4 py-2.5 shadow-[0_-16px_40px_rgba(31,64,142,.08)] backdrop-blur-xl sm:px-8">
        <div className="mx-auto flex max-w-[1480px] items-center justify-between">
          <button
            type="button"
            onClick={step === 0 ? onBack : () => setStep((prev) => prev - 1)}
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-blue-100 bg-white px-4 text-xs font-semibold text-slate-600 transition hover:border-blue-300 hover:text-[#315ff4]"
          >
            <ArrowLeft size={14} /> Back
          </button>

          <div className="hidden items-center gap-2 text-[10px] font-medium text-slate-400 sm:flex">
            <span className="size-1.5 rounded-full bg-[#315ff4]" />
            Your progress is saved automatically
          </div>

          <button
            type="button"
            onClick={handleContinue}
            disabled={loadspinner || (step === 1 && !selectedCategory)}
            className="group inline-flex h-10 min-w-[128px] items-center justify-center gap-2 rounded-xl bg-[linear-gradient(120deg,#244bd5,#315ff4_55%,#6c91ff)] px-5 text-xs font-semibold text-white shadow-[0_12px_26px_rgba(49,95,244,.3)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(49,95,244,.38)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loadspinner && (
              <span className="size-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            )}
            {loadspinner ? "Loading..." : "Continue"}
            {!loadspinner && (
              <ArrowRight
                size={14}
                className="transition group-hover:translate-x-0.5"
              />
            )}
          </button>
        </div>
      </div>
    </main>
  );
}
