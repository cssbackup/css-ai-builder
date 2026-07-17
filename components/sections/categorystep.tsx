"use client";

import { useState, type ChangeEvent } from "react";
import { Briefcase, Check, ImagePlus, User, Users } from "lucide-react";

type Category = "clients" | "myself" | "company";

type BusinessInfo = {
  audience: "" | Category;
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

type CategoryStepProps = {
  value: BusinessInfo;
  showErrors: boolean;
  onChange: (value: BusinessInfo) => void;
};

const categories = [
  {
    id: "clients",
    title: "Clients",
    subtitle: "Agency",
    icon: Users,
    labels: {
      name: "Website Name",
      desc: "Description",
      namePlaceholder: "Enter client name",
      descPlaceholder: "Tell us about agency...",
    },
  },
  {
    id: "myself",
    title: "Myself",
    subtitle: "Individual",
    icon: User,
    labels: {
      name: "Website Name",
      desc: "Description",
      namePlaceholder: "Enter your website name",
      descPlaceholder: "Tell us about your brand...",
    },
  },
  {
    id: "company",
    title: "My Company",
    subtitle: "Business",
    icon: Briefcase,
    labels: {
      name: "Business Name",
      desc: "Business Description",
      namePlaceholder: "Enter your business name",
      descPlaceholder: "Tell us what your business does...",
    },
  },
] as const;

const defaultLabels = {
  name: "Name",
  desc: "Description",
  namePlaceholder: "Enter name",
  descPlaceholder: "Tell us about your project...",
};

const websiteOptions = [
  { value: "service-provider", label: "Service Provider" },
  { value: "products", label: "Products" },
  { value: "blog", label: "Blog" },
  { value: "ngo", label: "NGO" },
  { value: "campaign-page", label: "Campaign Page" },
] as const;

const pageOptions = [
  { value: "multi-page", label: "Multi-page Site" },
  { value: "single-page", label: "Single-page Site" },
] as const;

export default function CategoryStep({
  value,
  showErrors,
  onChange,
}: CategoryStepProps) {
  const [selected, setSelected] = useState<"" | Category>(value.audience);
  const [logoPreview, setLogoPreview] = useState("");

  const active = categories.find((item) => item.id === selected);
  const labels = active?.labels ?? defaultLabels;
  const hasAudienceError = showErrors && !value.audience;
  const hasNameError = showErrors && !value.name.trim();
  const hasDescriptionError = showErrors && !value.description.trim();
  const hasWebsiteError = showErrors && !value.websiteRelated;
  const hasPageTypeError = showErrors && !value.pageType;
  const hasEmailError =
    showErrors && value.includeDetails && !value.email.trim();
  const hasMobileError =
    showErrors && value.includeDetails && !value.mobile.trim();
  const hasAddressError =
    showErrors && value.includeDetails && !value.address.trim();
  const hasLogoError = showErrors && !value.hasLogo;
  const hasLogoUploadError =
    showErrors && value.hasLogo === "yes" && !value.logoName;

  const updateBusinessInfo = (nextValue: Partial<BusinessInfo>) => {
    onChange({ ...value, ...nextValue });
  };

  const handleLogoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    updateBusinessInfo({ logoName: file.name });
    const reader = new FileReader();
    reader.onload = () => setLogoPreview(String(reader.result || ""));
    reader.readAsDataURL(file);
  };

  return (
    <section className="relative mx-auto w-full origin-center overflow-hidden border border-white/80 bg-white/95 shadow-[0_34px_90px_rgba(9,35,120,.24)] backdrop-blur-xl [@media(max-height:650px)]:scale-[.9] [@media(max-height:580px)]:scale-[.8]">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#315ff4] via-[#6d8cff] to-[#9fc6ff]" />

      <div className="px-4 py-4 sm:px-6 lg:px-8 lg:py-5">
        <div className="flex justify-center items-center gap-3 border-b border-blue-100 pb-4">
          <div className="text-center">
            <h1 className="mt-0.5 text-xl font-medium tracking-[-.04em] text-[#08132f] sm:text-2xl">
              Shape your website blueprint
            </h1>
            <p className="mt-0.5 text-[14px] text-slate-500">
              Give our AI the right signals and it will compose your first
              direction.
            </p>
          </div>
        </div>

        <div className="mt-3">
          <div className="min-w-0">
            <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
              {categories.map((item) => {
                const Icon = item.icon;
                const isActive = selected === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setSelected(item.id);
                      updateBusinessInfo({ audience: item.id });
                    }}
                    className={`group relative flex min-h-[50px] items-center justify-center gap-2 rounded-2xl border px-2 text-left transition-all duration-300 ease-out active:scale-[.985] sm:min-h-[58px] sm:justify-start sm:px-3.5 ${
                      isActive
                        ? "border-[#315ff4] bg-[#315ff4] text-white shadow-[0_14px_30px_rgba(49,95,244,.25)]"
                        : hasAudienceError
                          ? "border-blue-400 bg-white text-[#08132f]"
                          : "border-slate-200 bg-white text-[#08132f] hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-lg"
                    }`}
                  >
                    <span
                      className={`hidden size-8 shrink-0 place-items-center rounded-xl min-[440px]:grid ${isActive ? "bg-white/16" : "bg-blue-50 text-[#315ff4]"}`}
                    >
                      <Icon size={17} />
                    </span>
                    <span className="min-w-0">
                      <strong className="block truncate text-[10px] min-[380px]:text-xs sm:text-[16px] font-medium">
                        {item.title}
                      </strong>
                      <small
                        className={`hidden text-[12px] sm:block ${isActive ? "text-blue-100" : "text-slate-400"}`}
                      >
                        {item.subtitle}
                      </small>
                    </span>
                    {isActive && (
                      <span className="absolute right-2 top-2 grid size-5 place-items-center rounded-full bg-white text-[#315ff4]">
                        <Check size={11} strokeWidth={3} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            {hasAudienceError && (
              <ErrorLine message="Please choose who this website is for." />
            )}

            <form
              className="mt-4 grid items-start gap-y-7"
              onSubmit={(event) => event.preventDefault()}
            >
              <div className="grid grid-cols-[.8fr_1.2fr] content-start gap-2.5">
                <FieldLabel
                  label={labels.name}
                  error={hasNameError ? "This field is required." : undefined}
                >
                  <input
                    value={value.name}
                    onChange={(event) =>
                      updateBusinessInfo({ name: event.target.value })
                    }
                    type="text"
                    placeholder={labels.namePlaceholder}
                    className={fieldClass(hasNameError)}
                  />
                </FieldLabel>

                <FieldLabel
                  label={labels.desc}
                  error={
                    hasDescriptionError
                      ? "Please add a short description."
                      : undefined
                  }
                >
                  <div className="relative">
                    <textarea
                      value={value.description}
                      onChange={(event) =>
                        updateBusinessInfo({
                          description: event.target.value,
                        })
                      }
                      maxLength={300}
                      placeholder={labels.descPlaceholder}
                      className={`${fieldClass(hasDescriptionError)} resize-none py-2.5 pr-14`}
                    />
                    <span className="absolute bottom-3 right-3 text-[10px] font-medium text-slate-400">
                      {value.description.length}/300
                    </span>
                  </div>
                </FieldLabel>
              </div>

              <div className="grid grid-cols-2 content-start items-start gap-x-4 gap-y-7 px-1 xl:grid-cols-[1.4fr_.82fr_.78fr]">
                <div className="order-1 col-span-2 xl:col-span-1">
                  <RadioGroup
                    legend="What is your website related to?"
                    name="website-related"
                    value={value.websiteRelated}
                    options={websiteOptions}
                    hasError={hasWebsiteError}
                    onChange={(websiteRelated) =>
                      updateBusinessInfo({ websiteRelated })
                    }
                  />
                </div>
                <div className="order-2 grid content-start gap-2">
                  <RadioGroup
                    legend="What kind of site do you need?"
                    name="page-type"
                    value={value.pageType}
                    options={pageOptions}
                    hasError={hasPageTypeError}
                    onChange={(pageType) => updateBusinessInfo({ pageType })}
                  />
                </div>

                {value.includeDetails && (
                  <div className="order-5 relative col-span-2 grid animate-onboarding-swap gap-2 pt-1 xl:col-span-3 xl:grid-cols-[1fr_1fr_1.2fr]">
                    <button
                      type="button"
                      aria-label="Close additional details"
                      title="Close additional details"
                      onClick={() =>
                        updateBusinessInfo({ includeDetails: false })
                      }
                      className="absolute right-0 top-0 z-10 grid size-6 place-items-center rounded-full bg-[#315ff4] text-base font-semibold leading-none text-white shadow-[0_6px_16px_rgba(49,95,244,.3)] transition-all duration-200 hover:rotate-90 hover:bg-[#244bd5] hover:shadow-[0_8px_20px_rgba(49,95,244,.4)]"
                    >
                      ×
                    </button>
                    <div className="grid grid-cols-2 gap-2 xl:contents">
                      <FieldLabel
                        label="Email ID"
                        compact
                        error={hasEmailError ? "Email is required." : undefined}
                      >
                        <input
                          type="email"
                          value={value.email}
                          onChange={(event) =>
                            updateBusinessInfo({ email: event.target.value })
                          }
                          placeholder="you@example.com"
                          className={fieldClass(hasEmailError, true)}
                        />
                      </FieldLabel>
                      <FieldLabel
                        label="Mobile number"
                        compact
                        error={
                          hasMobileError
                            ? "Mobile number is required."
                            : undefined
                        }
                      >
                        <input
                          type="tel"
                          value={value.mobile}
                          onChange={(event) =>
                            updateBusinessInfo({ mobile: event.target.value })
                          }
                          placeholder="Your number"
                          className={fieldClass(hasMobileError, true)}
                        />
                      </FieldLabel>
                    </div>
                    <FieldLabel
                      label="Business address"
                      compact
                      error={
                        hasAddressError ? "Address is required." : undefined
                      }
                    >
                      <input
                        type="text"
                        value={value.address}
                        onChange={(event) =>
                          updateBusinessInfo({ address: event.target.value })
                        }
                        placeholder="Street, city, country"
                        className={fieldClass(hasAddressError, true)}
                      />
                    </FieldLabel>
                  </div>
                )}

                <div
                  className={`order-3 col-span-1 grid gap-2 xl:col-start-3 xl:row-start-1 ${
                    value.hasLogo === "yes"
                      ? "min-[1180px]:grid-cols-[minmax(150px,.75fr)_minmax(220px,1.25fr)] min-[1180px]:items-end"
                      : ""
                  }`}
                >
                  <RadioGroup
                    legend="Do you already have a logo?"
                    name="has-logo"
                    value={value.hasLogo}
                    options={[
                      { value: "yes", label: "Yes, I do" },
                      { value: "no", label: "Not yet" },
                    ]}
                    hasError={hasLogoError}
                    onChange={(hasLogo) => updateBusinessInfo({ hasLogo })}
                  />

                  {value.hasLogo === "yes" && (
                    <div className="animate-onboarding-swap">
                      <LogoUpload
                        fileName={value.logoName}
                        preview={logoPreview}
                        hasError={hasLogoUploadError}
                        onChange={handleLogoChange}
                      />
                    </div>
                  )}
                </div>

                {!value.includeDetails && (
                  <button
                    type="button"
                    onClick={() => updateBusinessInfo({ includeDetails: true })}
                    className="order-4 col-span-2 inline-flex h-9 w-fit items-center gap-2 justify-self-start rounded-lg border border-blue-200 bg-white px-3.5 text-[13px] font-semibold text-[#315ff4] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#315ff4] hover:shadow-md xl:col-span-3"
                  >
                    <span className="text-md leading-none">+</span>
                    Add more details
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
const fieldClass = (hasError: boolean, compact = false) =>
  `${compact ? "h-11" : "h-12 sm:h-[52px]"} w-full rounded-xl border bg-white px-3.5 text-sm text-[#08132f] shadow-[0_5px_18px_rgba(31,64,142,.06)] outline-none transition-all duration-300 ease-out placeholder:text-sm placeholder:text-slate-300 focus:border-[#315ff4] focus:ring-4 focus:ring-blue-100 ${hasError ? "border-red-400" : "border-slate-200"}`;

function FieldLabel({
  label,
  children,
  compact = false,
  error,
}: {
  label: string;
  children: React.ReactNode;
  compact?: boolean;
  error?: string;
}) {
  return (
    <label
      className={`grid ${compact ? "gap-1.5" : "gap-2"} text-[17px] font-medium text-[#08132f]`}
    >
      {label}
      {children}
      {error && <ErrorLine message={error} />}
    </label>
  );
}

function LogoUpload({
  fileName,
  preview,
  hasError,
  onChange,
}: {
  fileName: string;
  preview: string;
  hasError: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label
      className={`block cursor-pointer rounded-xl border bg-white/85 p-2 transition-all duration-300 ease-out hover:border-blue-300 hover:bg-white focus-within:border-[#315ff4] focus-within:ring-2 focus-within:ring-blue-100 ${
        hasError ? "border-blue-700" : "border-blue-100"
      }`}
    >
      <div className="flex items-center gap-2">
        {preview ? (
          <div
            className="size-9 shrink-0 rounded-lg border border-blue-100 bg-white bg-contain bg-center bg-no-repeat shadow-sm max-[500px]:hidden"
            style={{ backgroundImage: `url(${preview})` }}
            role="img"
            aria-label="Uploaded logo preview"
          />
        ) : (
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-blue-50 text-[#315ff4] max-[500px]:hidden">
            <ImagePlus size={16} />
          </span>
        )}

        <div className="min-w-0 flex-1">
          <strong className="block truncate text-xs text-[#08132f]">
            {fileName || "Upload your logo"}
          </strong>
          <p className="mt-0.5 text-[9px] text-slate-400 max-[500px]:hidden">
            PNG, JPG, WebP or SVG
          </p>
        </div>

        <span className="pointer-events-none inline-flex h-7 w-auto shrink-0 items-center justify-center whitespace-nowrap rounded-lg bg-[#315ff4] px-2.5 text-[9px] font-semibold text-white shadow-[0_6px_14px_rgba(49,95,244,.22)]">
          {fileName ? "Change" : "Upload"}
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml"
            onChange={onChange}
            className="sr-only"
          />
        </span>
      </div>
      {hasError && <ErrorLine message="Please choose your logo image." />}
    </label>
  );
}

function RadioGroup<T extends string>({
  legend,
  name,
  value,
  options,
  hasError,
  onChange,
}: {
  legend: string;
  name: string;
  value: T | "";
  options: readonly { value: T; label: string }[];
  hasError: boolean;
  onChange: (value: T) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-[17px] font-medium text-[#08132f]">
        {legend}
      </legend>
      <div className="flex flex-wrap gap-1.5 xl:flex-nowrap xl:gap-2">
        {options.map((option) => {
          const isSelected = value === option.value;

          return (
            <label
              key={option.value}
              className={`cursor-pointer whitespace-nowrap rounded-full border px-4 py-1.5 text-[14px] font-medium transition-all duration-300 ease-out active:scale-[.97] ${
                isSelected
                  ? "border-gray-500 bg-gray-500 text-white shadow-[0_6px_14px_rgba(49,95,244,.2)]"
                  : hasError
                    ? "border-red-400 bg-white text-slate-700"
                    : "border-blue-100 bg-white text-slate-600 hover:border-[#315ff4] hover:text-[#315ff4]"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={isSelected}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />
              {option.label}
            </label>
          );
        })}
      </div>
      {hasError && <ErrorLine message="Please select an option." />}
    </fieldset>
  );
}

function ErrorLine({ message }: { message: string }) {
  return (
    <span
      role="alert"
      className="mt-1 flex items-center gap-1.5 text-[10px] font-medium leading-none text-red-500 animate-onboarding-swap"
    >
      <span className="h-px w-3 shrink-0 bg-red-500" aria-hidden="true" />
      {message}
    </span>
  );
}
