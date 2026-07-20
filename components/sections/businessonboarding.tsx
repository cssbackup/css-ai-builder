"use client";

import { useState, useEffect } from "react";
import { useFooter } from "../layout/footercontext";
import Categorystep from "./categorystep";
import CategoryType from "./categorytype";
import TemplatePreview from "./templatepreview";
import { ArrowLeft, ArrowRight } from "lucide-react";
import HomeNav from "../home/home-nav";

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
    websiteRelated: "products",
    pageType: "single-page",
    email: "",
    mobile: "",
    address: "",
    includeDetails: false,
    hasLogo: "no",
    logoName: "",
  });
  const [selectedCategory, setSelectedCategory] = useState("Business");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [showTemplatePreview, setShowTemplatePreview] = useState(false);

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

    if (step === 2 && !selectedTemplate) {
      return;
    }

    setLoadspinner(true);

    await new Promise((resolve) => setTimeout(resolve, 200));
    if (step < steps.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      setShowTemplatePreview(true);
    }

    setLoadspinner(false);
  };

  return (
    <main className="relative flex h-dvh w-full items-center justify-center overflow-hidden bg-[#315ff4] px-2.5 pb-[70px] pt-[82px] text-[#08132f] sm:px-5 sm:pb-[74px] sm:pt-[88px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_52%_46%,rgba(163,197,255,.64),transparent_30%),radial-gradient(circle_at_13%_78%,rgba(118,255,210,.53),transparent_24%),linear-gradient(120deg,#2855ed_0%,#3768ff_58%,#2d5df4_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.34)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.34)_1px,transparent_1px)] [background-size:clamp(74px,10.6vw,152px)_clamp(74px,10.6vw,152px)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(118deg,transparent_17%,rgba(255,255,255,.13)_31%,transparent_43%,rgba(255,255,255,.15)_61%,transparent_74%)]" />
      <div className="pointer-events-none absolute bottom-[-26%] left-1/2 h-[72%] w-[90%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse,rgba(177,255,210,.75),rgba(87,153,255,.3)_45%,transparent_70%)] blur-2xl" />

      <HomeNav />

      <div className="relative z-10 w-full max-w-[1280px] overflow-visible 2xl:max-w-[1500px]">
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
              onCategoryChange={(category) => {
                setSelectedCategory(category);
                setSelectedTemplate("");
              }}
            />
          )}
          {step === 2 && (
            <TemplatePreview
              selectedCategory={selectedCategory}
              selectedTemplate={selectedTemplate}
              showPreview={showTemplatePreview}
              onTemplateChange={setSelectedTemplate}
              onClosePreview={() => setShowTemplatePreview(false)}
            />
          )}
        </div>
      </div>

      {!showTemplatePreview && (
        <div className="fixed inset-x-0 bottom-0 z-30 bg-transparent px-4 py-2.5 shadow-[0_-16px_40px_rgba(31,64,142,.08)] backdrop-blur-xs sm:px-11">
          <div className="mx-auto flex max-w-[1480px] items-center justify-between">
            <button
              type="button"
              onClick={step === 0 ? onBack : () => setStep((prev) => prev - 1)}
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-blue-500 bg-white px-4 text-sm font-semibold text-slate-600 transition hover:-translate-y-0.5 hover:border-blue-300 hover:text-[#315ff4]"
            >
              <ArrowLeft size={14} /> Back
            </button>

            <div className="hidden items-center gap-2 text-[12px] font-medium text-white/80 sm:flex">
              <span className="size-1.5 rounded-full bg-[#315ff4]" />
              Your progress is saved automatically
            </div>

            <button
              type="button"
              onClick={handleContinue}
              disabled={
                loadspinner ||
                (step === 1 && !selectedCategory) ||
                (step === 2 && !selectedTemplate)
              }
              className="group inline-flex h-10 min-w-[128px] items-center justify-center gap-2 rounded-xl bg-white px-5 text-xs font-semibold shadow-[0_12px_26px_rgba(49,95,244,.3)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(49,95,244,.38)] disabled:cursor-not-allowed disabled:opacity-50"
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
      )}
    </main>
  );
}
