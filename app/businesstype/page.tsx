"use client";
import { useState } from "react";
import Image from "next/image";

export default function Page() {
  const [selectedType, setSelectedType] = useState("clients");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const getFormDetails = () => {
    switch (selectedType) {
      case "clients":
        return {
          nameLabel: "Client Name",
          namePlaceholder: "Enter client name",
          descLabel: "Client Description",
          descPlaceholder: "Tell us about your client...",
        };
      case "myself":
        return {
          nameLabel: "Your Full Name",
          namePlaceholder: "Enter your full name",
          descLabel: "Professional Bio",
          descPlaceholder: "Tell us about your skills and experience...",
        };
      case "company":
      default:
        return {
          nameLabel: "Business Name",
          namePlaceholder: "Enter your business name",
          descLabel: "Business Description",
          descPlaceholder: "Tell us what your business does...",
        };
    }
  };

  const { nameLabel, namePlaceholder, descLabel, descPlaceholder } =
    getFormDetails();

  const currentStep = 2;

  const steps = [
    { step: 1, label: "Business Info" },
    { step: 2, label: "Category" },
    { step: 3, label: "Choose Design" },
  ];

  return (
    // Outer Wrapper with relative positioning
    <div className="fixed inset-0 flex flex-col w-full font-sans overflow-hidden relative bg-[#fcfafb]">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[75%] max-h-[800px] w-[300px] md:w-[500px] pointer-events-none z-0 opacity-80">
        <Image
          src="/texture-left.png"
          alt="Background Left Texture"
          fill
          className="object-contain object-left"
          priority
        />
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[75%] max-h-[800px] w-[300px] md:w-[500px] pointer-events-none z-0 opacity-80">
        <Image
          src="/texture-right.png"
          alt="Background Right Texture"
          fill
          className="object-contain object-right"
          priority
        />
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 w-full overflow-y-auto md:overflow-hidden p-4 md:py-2 pb-24 z-10">
        <div className="mx-auto my-auto bg-white/95 backdrop-blur-sm w-full max-w-5xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-200 p-6 md:p-4 relative z-10">
          {/* Stepper Timeline */}
          <div className="w-full max-w-5xl mx-auto mb-7 px-2 sm:px-4">
            {/* Mobile Stepper */}
            <div className="sm:hidden flex items-start justify-center overflow-hidden">
              {steps.map((item, index, arr) => {
                const completed = item.step < currentStep;
                const active = item.step === currentStep;

                return (
                  <div key={item.step} className="flex items-start">
                    <div className="flex flex-col items-center min-w-[58px]">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold ${
                          active || completed
                            ? "bg-red-600 border-red-600 text-white"
                            : "bg-white border-gray-400 text-gray-700"
                        }`}
                      >
                        {completed ? "✓" : item.step}
                      </div>

                      <span
                        className={`mt-2 text-[10px] font-semibold text-center leading-tight ${
                          active || completed ? "text-red-600" : "text-gray-600"
                        }`}
                      >
                        Step {item.step}
                      </span>
                    </div>

                    {index !== arr.length - 1 && (
                      <div
                        className={`h-[2px] w-10 mt-5 ${
                          item.step < currentStep ? "bg-red-600" : "bg-gray-300"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Desktop Stepper */}
            <div className="hidden sm:flex items-center justify-center overflow-x-auto">
              <div className="flex items-center min-w-max">
                {steps.map((item, index, arr) => {
                  const completed = item.step < currentStep;
                  const active = item.step === currentStep;

                  return (
                    <div key={item.step} className="flex items-center">
                      <div
                        className={`flex items-center gap-2 rounded-full px-4 py-2 shadow-sm ${
                          active
                            ? "bg-red-50 text-red-700 border border-red-700"
                            : completed
                              ? "bg-red-700 text-white"
                              : "bg-gray-50 text-black border border-gray-300"
                        }`}
                      >
                        <span
                          className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                            active
                              ? "bg-red-700 text-white"
                              : completed
                                ? "bg-white text-red-700"
                                : "border border-gray-300 bg-white text-black"
                          }`}
                        >
                          {completed ? "✓" : item.step}
                        </span>

                        <span className="whitespace-nowrap text-xs font-bold">
                          {item.label}
                        </span>
                      </div>

                      {index !== arr.length - 1 && (
                        <div
                          className={`h-[1px] w-8 ${
                            item.step < currentStep
                              ? "bg-red-500"
                              : "bg-gray-300"
                          }`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Titles */}
          <div className="text-center  relative z-10 mb-0">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
              {"Let's"} look at your business first.
            </h2>
            <p className="text-gray-700 text-md">
              This helps us create a website that fits your needs.
            </p>
          </div>

          {/* Form Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center relative z-10 mt-5">
            {/* Left Side: Local Image (Make sure you replaced your-local-image-name.png) */}
            <div className="hidden lg:flex lg:col-span-5 justify-center items-center">
              <Image
                src="/business_type.png"
                alt="Business Illustration"
                width={150}
                height={150} // Adjust height to match your image's actual aspect ratio
                className="w-full max-w-[180px] object-cover"
              />
            </div>

            {/* Right Side: Form Content */}
            <div className="lg:col-span-7 flex flex-col space-y-6 md:space-y-4">
              {/* 3 Choice Cards */}
              <div className="grid grid-cols-3 gap-2">
                {/* Clients Card */}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedType("clients");
                    setName("");
                    setDescription("");
                  }}
                  className={`relative cursor-pointer py-2 px-2 rounded-xl border flex flex-col items-center justify-center transition-all duration-200 ${
                    selectedType === "clients"
                      ? "border-red-500 bg-red-50 text-red-600 shadow-[0_0_15px_rgba(220,38,38,0.1)]"
                      : "border-gray-300 hover:border-gray-400 bg-white"
                  }`}
                >
                  {selectedType === "clients" && (
                    <div className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center border-2 border-white shadow-sm">
                      <svg
                        className="w-2.5 h-2.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="4"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  )}

                  {selectedType === "clients" ? (
                    <div className="w-7 h-7 mb-1 bg-red-600 rounded-lg flex items-center justify-center text-white shadow-md">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                  ) : (
                    <svg
                      className="w-5 h-5 mb-1 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  )}

                  <span className="text-sm font-bold text-gray-900">
                    Clients
                  </span>
                  <span className="text-[12px] text-gray-700">(Agency)</span>
                </button>

                {/* Myself Card */}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedType("myself");
                    setName("");
                    setDescription("");
                  }}
                  className={`relative cursor-pointer py-2 px-2 rounded-xl border flex flex-col items-center justify-center transition-all duration-200 ${
                    selectedType === "myself"
                      ? "border-red-500 bg-red-50 text-red-600 shadow-[0_0_15px_rgba(220,38,38,0.1)]"
                      : "border-gray-300 hover:border-gray-400 bg-white"
                  }`}
                >
                  {selectedType === "myself" && (
                    <div className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center border-2 border-white shadow-sm">
                      <svg
                        className="w-2.5 h-2.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="4"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  )}

                  {selectedType === "myself" ? (
                    <div className="w-7 h-7 mb-1 bg-red-600 rounded-lg flex items-center justify-center text-white shadow-md">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  ) : (
                    <svg
                      className="w-5 h-5 mb-1 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  )}

                  <span className="text-sm font-bold text-gray-900">
                    Myself
                  </span>
                  <span className="text-[12px] text-gray-500">
                    (Individual)
                  </span>
                </button>

                {/* Company Card */}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedType("company");
                    setName("");
                    setDescription("");
                  }}
                  className={`relative cursor-pointer py-2 px-2 rounded-xl border flex flex-col items-center justify-center transition-all duration-200 ${
                    selectedType === "company"
                      ? "border-red-600 bg-gradient-to-b from-white to-red-50 shadow-[0_0_20px_rgba(220,38,38,0.15)]"
                      : "border-gray-300 hover:border-gray-400 bg-white"
                  }`}
                >
                  {selectedType === "company" && (
                    <div className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center border-2 border-white shadow-sm">
                      <svg
                        className="w-2.5 h-2.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="4"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  )}

                  {selectedType === "company" ? (
                    <div className="w-7 h-7 mb-1 bg-red-600 rounded-lg flex items-center justify-center text-white shadow-md">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  ) : (
                    <svg
                      className="w-5 h-5 mb-1 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  )}

                  <span className="text-sm font-bold text-gray-900">
                    My Company
                  </span>
                  <span className="text-[12px] text-gray-500">(Business)</span>
                </button>
              </div>

              {/* Dynamic Inputs Section */}
              <div className="space-y-4 md:space-y-4">
                <div className="flex flex-col gap-1.5 md:gap-2">
                  <label className="text-sm font-bold text-gray-900">
                    {nameLabel}
                  </label>
                  <input
                    type="text"
                    placeholder={namePlaceholder}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all shadow-lg text-sm"
                  />
                </div>

                <div className="flex flex-col gap-1.5 md:gap-2">
                  <label className="text-sm font-bold text-gray-900">
                    {descLabel}
                  </label>
                  <div className="relative">
                    <textarea
                      rows={3}
                      maxLength={300}
                      placeholder={descPlaceholder}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all shadow-lg resize-none text-sm"
                    />
                    <span className="absolute bottom-3 right-4 text-xs font-medium text-gray-400">
                      {description.length}/300
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FIXED BOTTOM FOOTER */}
      <footer className="fixed bottom-0 left-0 right-0 px-4 md:px-12 py-2 bg-white border-t border-gray-200 flex justify-between items-center shadow-[0_-4px_10px_rgba(0,0,0,0.02)] z-20">
        <button
          type="button"
          className="px-6 md:px-8 py-2.5 md:py-2 border border-gray-200 bg-white text-gray-700 font-bold rounded-xl hover:bg-gray-100 hover:border-gray-400 transition-all cursor-pointer shadow-sm text-sm"
        >
          Back
        </button>

        <button
          type="button"
          className="px-6 md:px-6 py-2.5 md:py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl flex items-center gap-2 transition-all shadow-lg cursor-pointer shadow-red-600/30 text-sm"
        >
          Continue
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </button>
      </footer>
    </div>
  );
}
