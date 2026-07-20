"use client";

import { useState, useEffect } from "react";
import { useFooter } from "../layout/footercontext";
import Categorystep from "./categorystep";
import CategoryType from "./categorytype";
import TemplatePreview from "./templatepreview";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
    <main className="relative flex min-h-dvh w-full items-center justify-center overflow-hidden bg-[#f7f8fb] pb-[72px] pt-[84px] text-[#08132f]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_13%_72%,rgba(226,231,255,.72),transparent_25%),radial-gradient(circle_at_88%_12%,rgba(236,240,255,.7),transparent_23%)]" />

      <OnboardingHeader step={step} />

      <div className="relative z-10 w-full max-w-[1320px] overflow-visible px-4 sm:px-7 lg:px-8">
        <div
          className={
            step === 0
              ? "grid w-full items-center gap-8 lg:grid-cols-[330px_minmax(0,1fr)] xl:grid-cols-[350px_minmax(0,1fr)] xl:gap-12"
              : "w-full"
          }
        >
          {step === 0 && (
            <>
              <aside className="hidden self-stretch lg:flex lg:flex-col lg:justify-center">
                <p className="text-[11px] font-semibold uppercase tracking-[.14em] text-[#315ff4]">
                  Let&apos;s build your site
                </p>
                <h1 className="mt-3 max-w-[260px] text-[34px] font-semibold leading-[1.06] tracking-[-.045em] text-[#10182d]">
                  Tell us what you&apos;re building.
                </h1>
                <p className="mt-4 max-w-[235px] text-[13px] leading-5 text-slate-500">
                  A few quick details help AI create a better first draft.
                </p>
                <div className="relative mt-7 h-[210px] w-[280px]">
                  <Image
                    src="/onboarding-illustration.png"
                    alt="Website design illustration"
                    fill
                    priority
                    className="object-contain"
                  />
                </div>
              </aside>

              <div className="min-w-0">
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
              </div>
            </>
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
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200/80 bg-white/95 py-2.5 backdrop-blur-xl">
          <div className="mx-auto flex max-w-[1320px] items-center justify-between px-4 sm:px-7 lg:px-8">
            <button
              type="button"
              onClick={step === 0 ? onBack : () => setStep((prev) => prev - 1)}
              className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-blue-700 px-4 text-xs font-medium text-white shadow-sm transition hover:border-blue-300 hover:text-[#315ff4]"
            >
              <ArrowLeft size={14} /> Back
            </button>

            <div className="hidden items-center gap-2 text-[11px] font-medium text-slate-400 sm:flex">
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
              className="group inline-flex h-9 min-w-[122px] items-center justify-center gap-2 rounded-lg bg-[#08132f] px-5 text-xs font-medium text-white shadow-[0_8px_20px_rgba(8,19,47,.16)] transition hover:bg-[#315ff4] disabled:cursor-not-allowed disabled:opacity-50"
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

function OnboardingHeader({ step }: { step: number }) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 h-16 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto grid h-full max-w-[1320px] grid-cols-[1fr_auto] items-center gap-4 px-4 sm:px-7 lg:grid-cols-[1fr_auto_1fr] lg:px-8">
        <Link
          href="/"
          aria-label="Lestow home"
          className="relative block h-8 w-[108px] shrink-0"
        >
          <Image
            src="/lestow-logo.svg"
            alt="Lestow AI Website Builder"
            fill
            priority
            className="object-contain object-left"
          />
        </Link>

        <div className="hidden items-center gap-3 lg:flex">
          <span className="text-[10px] font-medium text-slate-600">
            Step {step + 1} of {steps.length}
          </span>
          <div className="flex gap-1.5" aria-hidden="true">
            {steps.map((item, index) => (
              <span
                key={item.title}
                className={`h-0.5 w-12 rounded-full ${index <= step ? "bg-[#315ff4]" : "bg-slate-200"}`}
              />
            ))}
          </div>
        </div>

        <nav className="flex items-center justify-end gap-2 sm:gap-3">
          <Link
            href="/auth"
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-[11px] font-semibold text-[#315ff4] transition hover:border-blue-300 hover:bg-blue-50 sm:px-5"
          >
            Sign up
          </Link>
          <Link
            href="/auth"
            className="rounded-lg bg-black px-4 py-2 text-[11px] font-semibold text-white transition hover:bg-black/75 sm:px-5"
          >
            Get Quote
          </Link>
        </nav>
      </div>
    </header>
  );
}
