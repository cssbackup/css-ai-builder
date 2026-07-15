"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import Image from "next/image";
import {
  Camera,
  Check,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Sparkles,
  X,
} from "lucide-react";

type UserProfile = { name: string; email: string; avatar?: string };

export default function ProfileTab({
  user,
  onSave,
}: {
  user: UserProfile;
  onSave: (user: UserProfile) => void;
}) {
  const [form, setForm] = useState({
    ...user,
    avatar: user.avatar || "/muneeb.png",
    gender: "Male",
    birthday: "1996-03-05",
    phone: "+91 98765 43210",
    nationality: "Indian",
    language: "English",
    location: "New Delhi, India",
    address: "24 Green Park Road, New Delhi",
  });
  const [editing, setEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!showSuccess) return;
    const timer = window.setTimeout(() => setShowSuccess(false), 4000);
    return () => window.clearTimeout(timer);
  }, [showSuccess]);

  const handlePhoto = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () =>
      setForm((current) => ({ ...current, avatar: String(reader.result) }));
    reader.readAsDataURL(file);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = {
      name: form.name.trim(),
      email: form.email.trim(),
      avatar: form.avatar,
    };
    if (!next.name || !next.email) return;
    onSave(next);
    setEditing(false);
    setShowSuccess(true);
  };

  const fields = [
    { key: "name", label: "Full name", type: "text" },
    { key: "email", label: "Email address", type: "email" },
    { key: "gender", label: "Gender", type: "text" },
    { key: "birthday", label: "Date of birth", type: "date" },
    { key: "phone", label: "Phone number", type: "tel" },
    { key: "nationality", label: "Nationality", type: "text" },
    { key: "language", label: "Language", type: "text" },
    { key: "location", label: "Location", type: "text" },
    { key: "address", label: "Address", type: "text" },
  ] as const;

  return (
    <>
      <form
        onSubmit={submit}
        className="mx-auto w-full max-w-[1320px] px-4 py-6 sm:px-6 sm:py-8 lg:px-9"
      >
        <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
          <div className="relative h-36 overflow-hidden bg-[#d9efff] sm:h-44">
            <svg
              aria-label="Animated blue profile banner"
              viewBox="0 0 1200 300"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
            >
              <defs>
                <linearGradient id="profileBanner" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#dff5ff" />
                  <stop offset=".48" stopColor="#9fd5ff" />
                  <stop offset="1" stopColor="#d9e4ff" />
                </linearGradient>
                <linearGradient id="profileBeam" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#ffffff" stopOpacity=".08" />
                  <stop offset=".5" stopColor="#ffffff" stopOpacity=".7" />
                  <stop offset="1" stopColor="#4b8cff" stopOpacity=".12" />
                </linearGradient>
              </defs>
              <rect width="1200" height="300" fill="url(#profileBanner)" />
              <g opacity=".48">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="-120 0;120 0;-120 0"
                  dur="9s"
                  repeatCount="indefinite"
                />
                <path d="M80 0h155L85 300H-70z" fill="url(#profileBeam)" />
                <path d="M360 0h170L380 300H210z" fill="url(#profileBeam)" />
                <path d="M690 0h190L730 300H540z" fill="url(#profileBeam)" />
                <path d="M1010 0h180l-150 300H860z" fill="url(#profileBeam)" />
              </g>
              <circle cx="1060" cy="68" r="9" fill="#fff" opacity=".65">
                <animate
                  attributeName="opacity"
                  values=".2;.9;.2"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="160" cy="55" r="6" fill="#fff" opacity=".7">
                <animate
                  attributeName="opacity"
                  values=".8;.25;.8"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-white/15 via-transparent to-blue-200/20" />
          </div>
          <div className="flex flex-col gap-4 px-5 pb-5 sm:flex-row sm:items-end sm:px-8">
            <div className="relative -mt-14 size-28 shrink-0">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="group relative size-28 cursor-pointer overflow-hidden rounded-full border-4 border-white bg-zinc-100 shadow-xl"
                aria-label="Change profile photo"
              >
                <Image
                  src={form.avatar}
                  alt={form.name}
                  fill
                  unoptimized
                  className="object-cover object-[55%_42%] transition duration-300 group-hover:scale-105"
                />
                <span className="absolute inset-0 grid place-items-center bg-zinc-950/0 text-white transition group-hover:bg-zinc-950/35">
                  <Camera
                    className="translate-y-2 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100"
                    size={24}
                  />
                </span>
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                aria-label="Upload profile photo"
                className="absolute -bottom-1 -right-1 z-10 grid size-9 cursor-pointer place-items-center rounded-full border-[3px] border-white bg-blue-700 text-white shadow-lg transition hover:scale-110 hover:bg-blue-800"
              >
                <Camera size={16} strokeWidth={2.4} />
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhoto}
              className="hidden"
            />
            <div className="min-w-0 flex-1 sm:pb-1">
              <h2 className="text-xl font-semibold">Profile</h2>
              <p className="mt-1 text-xs text-zinc-500">
                Click your photo to choose a new image from your device.
              </p>
            </div>
            <button
              type="submit"
              className="h-10 rounded-xl bg-zinc-900 px-5 text-xs font-medium text-white transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg active:translate-y-0"
            >
              Save profile
            </button>
          </div>
        </section>

        <section className="mt-5 w-full rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex items-center">
            <div>
              <h3 className="text-sm font-semibold">Personal information</h3>
              <p className="mt-1 text-[11px] text-zinc-500">
                {editing
                  ? "You can now update your personal details."
                  : "This information is read-only until you click edit."}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setEditing((value) => !value)}
              aria-label={
                editing ? "Stop editing profile" : "Edit profile details"
              }
              className={`ml-auto grid size-9 cursor-pointer place-items-center rounded-xl transition ${editing ? "rotate-[-8deg] bg-blue-700 text-white shadow-lg shadow-blue-200" : "bg-blue-50 text-blue-700 hover:scale-105 hover:bg-blue-100"}`}
            >
              <Pencil size={16} />
            </button>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {fields.map((field) => (
              <label
                key={field.key}
                className={`${field.key === "address" ? "md:col-span-2 xl:col-span-3" : ""} grid gap-1.5 text-[10px] font-medium text-zinc-500`}
              >
                {field.label}
                <input
                  disabled={!editing}
                  type={field.type}
                  value={form[field.key]}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      [field.key]: event.target.value,
                    }))
                  }
                  className={`h-11 min-w-0 rounded-xl border px-3 text-xs font-medium outline-none transition ${editing ? "border-blue-200 bg-white text-zinc-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-100" : "cursor-default border-zinc-200 bg-zinc-50/70 text-zinc-700 disabled:opacity-100"}`}
                />
              </label>
            ))}
          </div>
        </section>
      </form>

      {showSuccess && (
        <div className="fixed inset-0 z-[120] overflow-y-auto bg-[#010208] animate-[editorFadeIn_300ms_ease-out]">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -inset-x-[20%] -top-[45%] h-[145%] opacity-95 [background:repeating-linear-gradient(118deg,transparent_0%,transparent_8%,rgba(0,24,115,.25)_10%,rgba(0,54,220,.85)_14%,rgba(0,113,255,.95)_17%,rgba(0,35,170,.4)_20%,transparent_23%,transparent_31%)] [filter:drop-shadow(0_0_28px_rgba(0,80,255,.55))]" />
            <div className="absolute -bottom-[62%] left-[38%] h-[95%] w-[75%] opacity-45 [background:repeating-linear-gradient(110deg,transparent_0%,transparent_9%,rgba(0,35,160,.35)_12%,rgba(0,91,255,.75)_15%,transparent_19%,transparent_25%)] blur-[2px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,rgba(5,32,155,.18),transparent_28%),linear-gradient(180deg,rgba(0,0,0,.04)_0%,rgba(0,0,0,.16)_55%,rgba(0,0,0,.78)_100%)]" />
            <div className="absolute inset-y-0 left-0 w-[35%] bg-gradient-to-r from-black/70 to-transparent" />
          </div>
          <button
            type="button"
            onClick={() => setShowSuccess(false)}
            aria-label="Close profile confirmation"
            className="fixed right-4 top-4 z-20 grid size-11 cursor-pointer place-items-center rounded-full border border-white/50 bg-white/20 text-white shadow-lg backdrop-blur-xl transition hover:rotate-90 hover:scale-105 hover:bg-white hover:text-sky-700 sm:right-6 sm:top-6"
          >
            <X size={21} />
          </button>
          <span className="absolute left-[8%] top-[12%] size-24 animate-pulse rounded-full border border-blue-300/15" />
          <span className="absolute bottom-[8%] right-[8%] size-36 animate-pulse rounded-full border border-blue-400/10 [animation-delay:500ms]" />
          <span className="absolute left-[45%] top-[14%] size-3 animate-ping rounded-full bg-blue-300/80" />
          <span className="absolute bottom-[18%] left-[14%] size-2 animate-ping rounded-full bg-cyan-300 [animation-delay:350ms]" />
          <div className="relative mx-auto grid min-h-dvh w-full max-w-6xl items-center gap-5 px-5 py-5 md:grid-cols-[minmax(0,1fr)_auto] md:gap-12 md:px-10 lg:gap-20">
            <div className="animate-[editorPopIn_500ms_cubic-bezier(.2,.8,.2,1)] text-center text-white md:text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/15 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.14em] backdrop-blur">
                <Sparkles size={13} /> Profile complete
              </span>
              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Your profile is updated
                <br className="hidden md:block" /> successfully!
              </h2>
              <p className="mx-auto mt-3 max-w-md text-xs leading-5 text-white/80 md:mx-0 sm:text-sm">
                Your new photo and personal information are now available
                throughout your dashboard.
              </p>
            </div>

            <div className="relative mx-auto w-[min(64vw,220px)] origin-center animate-[editorPopIn_650ms_cubic-bezier(.2,.8,.2,1)] sm:w-[min(56vw,270px)] md:w-[min(40dvh,292px)]">
              <span className="absolute -inset-6 animate-pulse rounded-[70px] bg-white/25 blur-2xl" />
              <span className="absolute -left-[3px] top-[18%] h-6 w-[4px] rounded-l-md bg-zinc-700 shadow-sm" />
              <span className="absolute -left-[3px] top-[25%] h-12 w-[4px] rounded-l-md bg-zinc-700 shadow-sm" />
              <span className="absolute -left-[3px] top-[34%] h-12 w-[4px] rounded-l-md bg-zinc-700 shadow-sm" />
              <span className="absolute -right-[3px] top-[27%] h-20 w-[4px] rounded-r-md bg-zinc-700 shadow-sm" />
              <article className="relative aspect-[9/19.5] w-full rounded-[54px] bg-[linear-gradient(145deg,#77777c_0%,#17171a_18%,#050506_55%,#606065_100%)] p-[5px] shadow-[0_40px_90px_rgba(24,70,110,.42),inset_0_0_0_1px_rgba(255,255,255,.35)]">
                <div className="h-full w-full rounded-[49px] bg-black p-[5px] shadow-inner">
                  <div className="relative h-full overflow-hidden rounded-[44px] bg-[linear-gradient(165deg,#f1eaff_0%,#ffffff_45%,#e8f5ff_100%)] px-5 pb-5 pt-12">
                    <span className="absolute left-1/2 top-[10px] z-10 h-[25px] w-[86px] -translate-x-1/2 rounded-full bg-[#090a0d] shadow-sm">
                      <i className="absolute right-[7px] top-[8px] size-[8px] rounded-full bg-[#111b36] ring-1 ring-blue-900">
                        <b className="absolute left-[2px] top-[2px] size-[2px] rounded-full bg-blue-400/60" />
                      </i>
                    </span>
                    <div className="absolute left-5 right-5 top-[15px] flex items-center justify-between text-[7px] font-bold text-zinc-700">
                      <span>9:41</span>
                      <span className="flex items-end gap-[2px]">
                        <i className="h-1 w-[2px] rounded-sm bg-zinc-700" />
                        <i className="h-1.5 w-[2px] rounded-sm bg-zinc-700" />
                        <i className="h-2 w-[2px] rounded-sm bg-zinc-700" />
                        <i className="ml-1 h-[6px] w-3 rounded-[2px] border border-zinc-700 after:block after:h-full after:w-2 after:rounded-[1px] after:bg-zinc-700" />
                      </span>
                    </div>
                    <div className="relative mx-auto size-24">
                      <span className="absolute inset-0 animate-ping rounded-full bg-blue-300/25 [animation-duration:1.8s]" />
                      <span className="relative block size-24 overflow-hidden rounded-full border-4 border-white shadow-xl">
                        <Image
                          src={form.avatar}
                          alt={form.name}
                          fill
                          unoptimized
                          className="object-cover object-[55%_42%]"
                        />
                      </span>
                      <span className="absolute -bottom-1 -right-1 grid size-8 animate-bounce place-items-center rounded-full border-[3px] border-white bg-emerald-500 text-white">
                        <Check size={15} strokeWidth={3} />
                      </span>
                    </div>
                    <div className="mt-4 text-center">
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-[8px] font-bold uppercase tracking-wider text-blue-700">
                        <Sparkles size={10} /> Profile updated
                      </span>
                      <h3 className="mt-3 truncate text-xl font-semibold">
                        {form.name}
                      </h3>
                      <p className="mt-1 text-[10px] text-zinc-500">
                        Your changes are saved.
                      </p>
                    </div>
                    <div className="mt-5 grid gap-2.5 rounded-2xl border border-white bg-white/75 p-3 text-[10px] text-zinc-600 shadow-sm backdrop-blur">
                      <span className="flex min-w-0 items-center gap-2">
                        <i className="grid size-6 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-600">
                          <Mail size={12} />
                        </i>
                        <b className="truncate font-medium">{form.email}</b>
                      </span>
                      <span className="flex items-center gap-2">
                        <i className="grid size-6 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-600">
                          <Phone size={12} />
                        </i>
                        <b className="font-medium">{form.phone}</b>
                      </span>
                      <span className="flex min-w-0 items-center gap-2">
                        <i className="grid size-6 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-600">
                          <MapPin size={12} />
                        </i>
                        <b className="truncate font-medium">{form.location}</b>
                      </span>
                    </div>
                    <div className="mt-5 h-1 overflow-hidden rounded-full bg-blue-100">
                      <span className="block h-full w-full animate-pulse rounded-full bg-blue-600" />
                    </div>
                    <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-zinc-300" />
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
