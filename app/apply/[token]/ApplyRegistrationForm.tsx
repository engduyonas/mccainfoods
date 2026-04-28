"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { validateApplicationPayload, MAX_PHOTO_BYTES } from "@/lib/applicationValidation";
import { COUNTRY_CODES } from "@/lib/countryCodes";

function Icon({ d, className = "w-5 h-5" }: { d: string; className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  );
}

function ErrorText({ msg }: { msg: string }) {
  return (
    <p className="mt-1.5 flex items-start gap-1 text-xs text-red-500">
      <svg className="mt-px h-3.5 w-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        />
      </svg>
      <span>{msg}</span>
    </p>
  );
}

interface FieldErrors {
  fullName?: string;
  countryCode?: string;
  phoneLocal?: string;
  passportNumber?: string;
  gender?: string;
  age?: string;
  photograph?: string;
}

const selectChevron =
  "appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMS41TDYgNi41TDExIDEuNSIgc3Ryb2tlPSIjNjY2IiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+')] bg-[length:12px] bg-[right_14px_center] bg-no-repeat pr-9";

export default function ApplyRegistrationForm({ inviteToken }: { inviteToken: string }) {
  const [fullName, setFullName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [phoneLocal, setPhoneLocal] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [photograph, setPhotograph] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [bannerError, setBannerError] = useState("");
  const [done, setDone] = useState(false);

  const inputBase =
    "w-full rounded-xl border px-3.5 py-3 text-[15px] transition-colors sm:text-sm bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:border-transparent";
  const inputClass = (bad: boolean) =>
    `${inputBase} ${bad ? "border-red-300 bg-red-50/30 focus:ring-red-400" : "border-gray-200 hover:border-gray-300 focus:ring-mccain-green/50"}`;

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_PHOTO_BYTES) {
      setFieldErrors((p) => ({ ...p, photograph: `Photo must be less than ${MAX_PHOTO_BYTES / (1024 * 1024)}MB` }));
      return;
    }
    if (!file.type.startsWith("image/")) {
      setFieldErrors((p) => ({ ...p, photograph: "File must be an image" }));
      return;
    }
    setFieldErrors((p) => ({ ...p, photograph: undefined }));
    const reader = new FileReader();
    reader.onloadend = () => {
      const url = reader.result as string;
      setPhotograph(url);
      setPhotoPreview(url);
    };
    reader.readAsDataURL(file);
  };

  const runLocalValidation = () => {
    const v = validateApplicationPayload({
      fullName,
      countryCode,
      phoneLocal,
      passportNumber,
      gender,
      age,
      photograph,
    });
    if (!v.ok) {
      setFieldErrors(v.errors as FieldErrors);
      return false;
    }
    setFieldErrors({});
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBannerError("");
    if (!runLocalValidation()) return;

    const v = validateApplicationPayload({
      fullName,
      countryCode,
      phoneLocal,
      passportNumber,
      gender,
      age,
      photograph,
    });
    if (!v.ok) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inviteToken,
          fullName,
          countryCode,
          phoneLocal,
          passportNumber: passportNumber.trim(),
          gender,
          photograph,
          age,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as { error?: string; errors?: Record<string, string> };

      if (res.status === 400 && data.errors) {
        setFieldErrors(data.errors as FieldErrors);
        return;
      }

      if (res.status === 403 || res.status === 410) {
        setBannerError(
          data.error ||
            "This invitation link is invalid or has already been used."
        );
        return;
      }

      if (!res.ok) {
        setBannerError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setDone(true);
    } catch {
      setBannerError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="flex min-h-dvh flex-col justify-center px-4 py-12 sm:px-6">
        <div className="mx-auto w-full max-w-lg rounded-3xl border border-emerald-100 bg-white p-8 text-center shadow-xl shadow-emerald-100/60">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <Icon d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" className="h-8 w-8" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">Application submitted</h1>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            Thank you. Your details have been received. This invitation link has now been redeemed and cannot be used again.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-mccain-green px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-mccain-green/20 hover:bg-mccain-green-dark"
          >
            Back to homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-lg sm:max-w-xl xl:max-w-4xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-mccain-green">Invitation</p>
            <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              Complete your registration
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-gray-600 sm:text-[15px]">
              Please complete every field. Your photo will be stored securely with your application.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Exit to site
          </Link>
        </div>

        {bannerError && (
          <div className="mb-6 flex gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            <Icon d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" className="h-5 w-5 flex-shrink-0" />
            <span>{bannerError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="rounded-3xl border border-gray-100 bg-white/90 p-5 shadow-2xl shadow-gray-200/50 sm:p-8 lg:p-10">
          <div className="space-y-8">
            <section>
              <h2 className="mb-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Personal</h2>
              <div className="grid grid-cols-1 gap-5 gap-y-5 lg:grid-cols-2 lg:gap-x-8">
                <div className="lg:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Full name *</label>
                  <input
                    type="text"
                    autoComplete="name"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (fieldErrors.fullName) setFieldErrors((p) => ({ ...p, fullName: undefined }));
                    }}
                    placeholder="As shown on official ID"
                    className={inputClass(!!fieldErrors.fullName)}
                  />
                  {fieldErrors.fullName && <ErrorText msg={fieldErrors.fullName} />}
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Gender *</label>
                  <select
                    value={gender}
                    onChange={(e) => {
                      setGender(e.target.value);
                      if (fieldErrors.gender) setFieldErrors((p) => ({ ...p, gender: undefined }));
                    }}
                    className={`${inputClass(!!fieldErrors.gender)} ${selectChevron}`}
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {fieldErrors.gender && <ErrorText msg={fieldErrors.gender} />}
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Age *</label>
                  <input
                    type="number"
                    inputMode="numeric"
                    min={18}
                    max={100}
                    value={age}
                    onChange={(e) => {
                      setAge(e.target.value);
                      if (fieldErrors.age) setFieldErrors((p) => ({ ...p, age: undefined }));
                    }}
                    placeholder="18+"
                    className={inputClass(!!fieldErrors.age)}
                  />
                  {fieldErrors.age && <ErrorText msg={fieldErrors.age} />}
                </div>
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Contact &amp; ID</h2>
              <div className="flex flex-col gap-5 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5">
                <div className="w-full">
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Phone *</label>
                  <div className="flex w-full flex-col gap-3 sm:flex-row sm:gap-3">
                    <select
                      value={countryCode}
                      onChange={(e) => {
                        setCountryCode(e.target.value);
                        if (fieldErrors.countryCode) setFieldErrors((p) => ({ ...p, countryCode: undefined }));
                      }}
                      className={`w-full shrink-0 rounded-xl border px-3 py-3 text-[15px] sm:w-[min(100%,16rem)] sm:text-sm ${fieldErrors.countryCode ? "border-red-300 focus:ring-red-400" : "border-gray-200 focus:ring-mccain-green/50"} focus:outline-none focus:ring-2`}
                    >
                      <option value="">Country code</option>
                      {COUNTRY_CODES.map((c) => (
                        <option key={`${c.country}-${c.code}-${c.label}`} value={c.code}>
                          {c.flag} {c.code}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      inputMode="tel"
                      autoComplete="tel-national"
                      value={phoneLocal}
                      onChange={(e) => {
                        setPhoneLocal(e.target.value);
                        if (fieldErrors.phoneLocal) setFieldErrors((p) => ({ ...p, phoneLocal: undefined }));
                      }}
                      placeholder="Local number"
                      className={`min-w-0 flex-1 rounded-xl ${inputClass(!!fieldErrors.phoneLocal)}`}
                    />
                  </div>
                  {(fieldErrors.phoneLocal || fieldErrors.countryCode) && (
                    <ErrorText msg={(fieldErrors.phoneLocal || fieldErrors.countryCode)!} />
                  )}
                </div>

                <div className="w-full">
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Passport or national ID number *</label>
                  <input
                    type="text"
                    value={passportNumber}
                    onChange={(e) => {
                      setPassportNumber(e.target.value.toUpperCase());
                      if (fieldErrors.passportNumber) setFieldErrors((p) => ({ ...p, passportNumber: undefined }));
                    }}
                    placeholder="Enter your document number"
                    maxLength={20}
                    className={`${inputClass(!!fieldErrors.passportNumber)} w-full uppercase tracking-[0.2em] font-mono text-[15px] sm:text-sm`}
                  />
                  {fieldErrors.passportNumber && <ErrorText msg={fieldErrors.passportNumber} />}
                </div>
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Photo</h2>
              {photoPreview ? (
                <div className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-4 sm:flex-row sm:items-center">
                  <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl ring-2 ring-mccain-green/20">
                    <Image src={photoPreview} alt="Portrait preview" fill className="object-cover" unoptimized />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-semibold text-gray-900">Photo uploaded</p>
                    <p className="text-xs text-gray-500">
                      Square or portrait is fine. Remove and re-upload if you need a different image.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setPhotograph("");
                        setPhotoPreview("");
                      }}
                      className="text-xs font-semibold text-red-600 hover:text-red-800"
                    >
                      Remove photo
                    </button>
                  </div>
                </div>
              ) : (
                <label
                  className={`flex min-h-[10rem] w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-4 py-6 text-center transition-colors ${
                    fieldErrors.photograph ? "border-red-300 bg-red-50/40" : "border-gray-200 hover:border-mccain-green"
                  }`}
                >
                  <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-gray-500">
                    <Icon d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Upload portrait photo *</span>
                  <span className="mt-1 text-xs text-gray-400">PNG, JPG or WebP. Max {MAX_PHOTO_BYTES / (1024 * 1024)}MB.</span>
                  <input type="file" accept="image/png,image/jpeg,image/jpg,image/webp" className="hidden" onChange={handlePhotoChange} />
                </label>
              )}
              {fieldErrors.photograph && !photoPreview && <ErrorText msg={fieldErrors.photograph} />}
            </section>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-mccain-green to-mccain-green-dark px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-mccain-green/20 transition-transform active:scale-[0.98] disabled:opacity-50 sm:w-auto"
            >
              {submitting ? (
                <>
                  <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden>
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Submitting…
                </>
              ) : (
                "Submit application"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
