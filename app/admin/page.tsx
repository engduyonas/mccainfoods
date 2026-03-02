"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/app/components/AuthProvider";

// Module-level cache so the admin table doesn't re-fetch on every visit
let cachedAdminEmployees: Employee[] | null = null;
let adminCacheTimestamp = 0;
const ADMIN_CACHE_TTL = 30_000; // 30 seconds

interface Employee {
  id: string;
  fullName: string;
  phoneNumber: string;
  passportNumber: string;
  gender: string;
  photograph: string;
  age: number;
  status: string;
  createdAt: string;
}

const STATUS_CONFIG: Record<string, { row: string; badge: string; dot: string; icon: string; cardBg: string; cardIcon: string; mobileBg: string }> = {
  pending: {
    row: "hover:bg-amber-50/60",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    dot: "bg-amber-400 animate-pulse",
    icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z",
    cardBg: "from-amber-500 to-orange-500",
    cardIcon: "bg-amber-100 text-amber-600",
    mobileBg: "bg-amber-50 border-amber-100",
  },
  approved: {
    row: "hover:bg-emerald-50/60",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-500",
    icon: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    cardBg: "from-emerald-500 to-teal-500",
    cardIcon: "bg-emerald-100 text-emerald-600",
    mobileBg: "bg-emerald-50 border-emerald-100",
  },
  rejected: {
    row: "hover:bg-red-50/60",
    badge: "bg-red-50 text-red-700 border-red-200",
    dot: "bg-red-500",
    icon: "M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    cardBg: "from-red-500 to-rose-500",
    cardIcon: "bg-red-100 text-red-600",
    mobileBg: "bg-red-50 border-red-100",
  },
};

const COUNTRY_CODES = [
  { code: "+1", country: "US", flag: "\u{1F1FA}\u{1F1F8}", label: "United States" },
  { code: "+1", country: "CA", flag: "\u{1F1E8}\u{1F1E6}", label: "Canada" },
  { code: "+44", country: "GB", flag: "\u{1F1EC}\u{1F1E7}", label: "United Kingdom" },
  { code: "+61", country: "AU", flag: "\u{1F1E6}\u{1F1FA}", label: "Australia" },
  { code: "+64", country: "NZ", flag: "\u{1F1F3}\u{1F1FF}", label: "New Zealand" },
  { code: "+33", country: "FR", flag: "\u{1F1EB}\u{1F1F7}", label: "France" },
  { code: "+49", country: "DE", flag: "\u{1F1E9}\u{1F1EA}", label: "Germany" },
  { code: "+31", country: "NL", flag: "\u{1F1F3}\u{1F1F1}", label: "Netherlands" },
  { code: "+32", country: "BE", flag: "\u{1F1E7}\u{1F1EA}", label: "Belgium" },
  { code: "+48", country: "PL", flag: "\u{1F1F5}\u{1F1F1}", label: "Poland" },
  { code: "+39", country: "IT", flag: "\u{1F1EE}\u{1F1F9}", label: "Italy" },
  { code: "+34", country: "ES", flag: "\u{1F1EA}\u{1F1F8}", label: "Spain" },
  { code: "+351", country: "PT", flag: "\u{1F1F5}\u{1F1F9}", label: "Portugal" },
  { code: "+43", country: "AT", flag: "\u{1F1E6}\u{1F1F9}", label: "Austria" },
  { code: "+41", country: "CH", flag: "\u{1F1E8}\u{1F1ED}", label: "Switzerland" },
  { code: "+420", country: "CZ", flag: "\u{1F1E8}\u{1F1FF}", label: "Czech Republic" },
  { code: "+421", country: "SK", flag: "\u{1F1F8}\u{1F1F0}", label: "Slovakia" },
  { code: "+30", country: "GR", flag: "\u{1F1EC}\u{1F1F7}", label: "Greece" },
  { code: "+46", country: "SE", flag: "\u{1F1F8}\u{1F1EA}", label: "Sweden" },
  { code: "+358", country: "FI", flag: "\u{1F1EB}\u{1F1EE}", label: "Finland" },
  { code: "+36", country: "HU", flag: "\u{1F1ED}\u{1F1FA}", label: "Hungary" },
  { code: "+91", country: "IN", flag: "\u{1F1EE}\u{1F1F3}", label: "India" },
  { code: "+81", country: "JP", flag: "\u{1F1EF}\u{1F1F5}", label: "Japan" },
  { code: "+886", country: "TW", flag: "\u{1F1F9}\u{1F1FC}", label: "Taiwan" },
  { code: "+60", country: "MY", flag: "\u{1F1F2}\u{1F1FE}", label: "Malaysia" },
  { code: "+86", country: "CN", flag: "\u{1F1E8}\u{1F1F3}", label: "China" },
  { code: "+27", country: "ZA", flag: "\u{1F1FF}\u{1F1E6}", label: "South Africa" },
  { code: "+55", country: "BR", flag: "\u{1F1E7}\u{1F1F7}", label: "Brazil" },
  { code: "+54", country: "AR", flag: "\u{1F1E6}\u{1F1F7}", label: "Argentina" },
  { code: "+57", country: "CO", flag: "\u{1F1E8}\u{1F1F4}", label: "Colombia" },
  { code: "+52", country: "MX", flag: "\u{1F1F2}\u{1F1FD}", label: "Mexico" },
  { code: "+251", country: "ET", flag: "\u{1F1EA}\u{1F1F9}", label: "Ethiopia" },
  { code: "+971", country: "AE", flag: "\u{1F1E6}\u{1F1EA}", label: "UAE" },
  { code: "+966", country: "SA", flag: "\u{1F1F8}\u{1F1E6}", label: "Saudi Arabia" },
  { code: "+90", country: "TR", flag: "\u{1F1F9}\u{1F1F7}", label: "Turkey" },
  { code: "+234", country: "NG", flag: "\u{1F1F3}\u{1F1EC}", label: "Nigeria" },
  { code: "+254", country: "KE", flag: "\u{1F1F0}\u{1F1EA}", label: "Kenya" },
  { code: "+20", country: "EG", flag: "\u{1F1EA}\u{1F1EC}", label: "Egypt" },
];

interface FieldErrors {
  fullName?: string;
  phoneNumber?: string;
  passportNumber?: string;
  gender?: string;
  age?: string;
  photograph?: string;
  status?: string;
}

function Icon({ d, className = "w-5 h-5" }: { d: string; className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  );
}

function ErrorText({ msg }: { msg: string }) {
  return (
    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
      <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
      {msg}
    </p>
  );
}

export default function AdminPage() {
  const [employees, setEmployeesRaw] = useState<Employee[]>(cachedAdminEmployees ?? []);
  const [loading, setLoading] = useState(cachedAdminEmployees === null);
  const fetchedRef = useRef(false);

  // Wrap setEmployees to also update the module-level cache
  const setEmployees = useCallback((updater: Employee[] | ((prev: Employee[]) => Employee[])) => {
    setEmployeesRaw((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      cachedAdminEmployees = next;
      adminCacheTimestamp = Date.now();
      return next;
    });
  }, []);
  const [formOpen, setFormOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const router = useRouter();
  const { logout } = useAuth();

  const [fullName, setFullName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [phoneLocal, setPhoneLocal] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [gender, setGender] = useState("");
  const [photograph, setPhotograph] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");
  const [age, setAge] = useState("");
  const [formStatus, setFormStatus] = useState("pending");

  const fetchEmployees = useCallback(async (force = false) => {
    if (!force && cachedAdminEmployees && Date.now() - adminCacheTimestamp < ADMIN_CACHE_TTL) {
      setEmployeesRaw(cachedAdminEmployees);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/employees");
      const data = await res.json();
      if (Array.isArray(data)) {
        cachedAdminEmployees = data;
        adminCacheTimestamp = Date.now();
        setEmployeesRaw(data);
      }
    } catch { /* silently handled */ } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    fetchEmployees();
  }, [fetchEmployees]);

  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const matchesSearch = emp.fullName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "all" || emp.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [employees, searchQuery, statusFilter]);

  const statusCounts = useMemo(() => {
    const counts = { all: employees.length, pending: 0, approved: 0, rejected: 0 };
    employees.forEach((emp) => {
      if (emp.status in counts) counts[emp.status as keyof typeof counts]++;
    });
    return counts;
  }, [employees]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { setFieldErrors((p) => ({ ...p, photograph: "Photo must be less than 5MB" })); return; }
    if (!file.type.startsWith("image/")) { setFieldErrors((p) => ({ ...p, photograph: "File must be an image" })); return; }
    setFieldErrors((p) => ({ ...p, photograph: undefined }));
    const reader = new FileReader();
    reader.onloadend = () => { const b = reader.result as string; setPhotograph(b); setPhotoPreview(b); };
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setFullName(""); setCountryCode(""); setPhoneLocal(""); setPassportNumber("");
    setGender(""); setPhotograph(""); setPhotoPreview(""); setAge("");
    setFormStatus("pending"); setError(""); setFieldErrors({});
  };

  const validateForm = (): boolean => {
    const errors: FieldErrors = {};
    const tn = fullName.trim();
    if (!tn) errors.fullName = "Full name is required";
    else if (tn.length < 3) errors.fullName = "Name must be at least 3 characters";
    else if (!/^[a-zA-Z\s\-'.]+$/.test(tn)) errors.fullName = "Letters, spaces, hyphens, and apostrophes only";

    const pn = phoneLocal.trim();
    if (!pn) errors.phoneNumber = "Phone number is required";


    const tp = passportNumber.trim();
    if (!tp) errors.passportNumber = "Passport number is required";
    else if (!/^[a-zA-Z0-9\-]+$/.test(tp)) errors.passportNumber = "Letters, digits, and hyphens only";
    else if (tp.length < 5) errors.passportNumber = "Too short (min 5)";
    else if (tp.length > 20) errors.passportNumber = "Too long (max 20)";

    if (!gender) errors.gender = "Select a gender";
    const an = parseInt(age, 10);
    if (!age) errors.age = "Age is required";
    else if (isNaN(an)) errors.age = "Must be a number";
    else if (an < 18) errors.age = "Must be 18+";
    else if (an > 100) errors.age = "Max 100";
    if (!photograph) errors.photograph = "Photo is required";
    if (!formStatus || !["pending", "approved", "rejected"].includes(formStatus)) errors.status = "Select a valid status";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError(""); setSuccess("");
    if (!validateForm()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName: fullName.trim(), phoneNumber: countryCode ? `${countryCode} ${phoneLocal.trim()}` : phoneLocal.trim(), passportNumber: passportNumber.trim().toUpperCase(), gender, photograph, age, status: formStatus }),
      });
      if (res.ok) { const newApplicant = await res.json(); setEmployees(prev => [newApplicant, ...prev]); setSuccess("Applicant added!"); resetForm(); setFormOpen(false); setTimeout(() => setSuccess(""), 4000); }
      else { const data = await res.json(); setError(data.error || "Failed to add"); }
    } catch { setError("Something went wrong"); } finally { setSubmitting(false); }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try { const res = await fetch(`/api/employees/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) }); if (res.ok) setEmployees(prev => prev.map(e => e.id === id ? { ...e, status } : e)); } catch { /* silently handled */ }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this applicant?")) return;
    try { const res = await fetch(`/api/employees/${id}`, { method: "DELETE" }); if (res.ok) setEmployees(prev => prev.filter(e => e.id !== id)); } catch { /* silently handled */ }
  };

  // Change password state
  const [pwOpen, setPwOpen] = useState(false);
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [pwError, setPwError] = useState("");
  const [pwSuccess, setPwSuccess] = useState("");
  const [pwSubmitting, setPwSubmitting] = useState(false);
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwError(""); setPwSuccess("");
    if (!currentPw) { setPwError("Enter your current password"); return; }
    if (newPw.length < 6) { setPwError("New password must be at least 6 characters"); return; }
    if (newPw !== confirmPw) { setPwError("Passwords do not match"); return; }
    if (currentPw === newPw) { setPwError("New password must be different"); return; }
    setPwSubmitting(true);
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: currentPw, newPassword: newPw }),
      });
      const data = await res.json();
      if (res.ok) {
        setPwSuccess("Password changed!");
        setCurrentPw(""); setNewPw(""); setConfirmPw("");
        setTimeout(() => { setPwSuccess(""); setPwOpen(false); }, 2000);
      } else {
        setPwError(data.error || "Failed to change password");
      }
    } catch { setPwError("Something went wrong"); } finally { setPwSubmitting(false); }
  };

  const handleLogout = async () => { await logout(); router.push("/login"); };
  const getConfig = (status: string) => STATUS_CONFIG[status] || STATUS_CONFIG.pending;

  const inputBase = "w-full px-3.5 py-3 border rounded-xl text-[15px] sm:text-sm bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:border-transparent placeholder:text-gray-400";
  const inputClass = (hasError: boolean) => `${inputBase} ${hasError ? "border-red-300 focus:ring-red-400 bg-red-50/30" : "border-gray-200 focus:ring-mccain-green/50 hover:border-gray-300"}`;
  const selectChevron = "appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMS41TDYgNi41TDExIDEuNSIgc3Ryb2tlPSIjNjY2IiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+')] bg-[length:12px] bg-[right_14px_center] bg-no-repeat pr-9";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-stone-100 pb-24 sm:pb-8">

      {/* ─── Nav ─── */}
      <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200/60 safe-area-top">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-mccain-green to-mccain-green-dark flex items-center justify-center shadow-lg shadow-mccain-green/20">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight leading-tight">Dashboard</h1>
                <p className="text-[10px] sm:text-[11px] text-gray-500 -mt-0.5 leading-tight">Applicant Management</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-mccain-green/10 rounded-lg">
                <span className="w-2 h-2 rounded-full bg-mccain-green animate-pulse" />
                <span className="text-xs font-medium text-mccain-green">Admin</span>
              </div>
              <button
                onClick={() => { setPwOpen(!pwOpen); setPwError(""); setPwSuccess(""); }}
                className={`flex items-center justify-center w-10 h-10 sm:w-auto sm:h-auto sm:gap-2 sm:px-4 sm:py-2 rounded-xl text-sm font-medium transition-all ${pwOpen ? "text-mccain-green bg-mccain-green/10" : "text-gray-500 hover:text-mccain-green hover:bg-mccain-green/5"}`}
                title="Change Password"
              >
                <Icon d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" className="w-5 h-5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Password</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center w-10 h-10 sm:w-auto sm:h-auto sm:gap-2 sm:px-4 sm:py-2 rounded-xl text-sm font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 active:bg-red-100 transition-all"
              >
                <Icon d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" className="w-5 h-5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ─── Change Password Panel ─── */}
      {pwOpen && (
        <div className="border-b border-gray-200/60 bg-white/60 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
            <form onSubmit={handleChangePassword} className="max-w-md mx-auto sm:mx-0">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-mccain-green/10 flex items-center justify-center">
                  <Icon d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" className="w-4 h-4 text-mccain-green" />
                </div>
                <h3 className="text-sm font-bold text-gray-900">Change Password</h3>
              </div>

              <div className="space-y-3">
                <div className="relative">
                  <input
                    type={showCurrentPw ? "text" : "password"}
                    placeholder="Current password"
                    value={currentPw}
                    onChange={(e) => setCurrentPw(e.target.value)}
                    className="w-full px-3.5 py-2.5 pr-10 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-mccain-green/50 focus:border-transparent placeholder:text-gray-400 hover:border-gray-300 transition-all"
                  />
                  <button type="button" onClick={() => setShowCurrentPw(!showCurrentPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors" tabIndex={-1}>
                    {showCurrentPw ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    )}
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showNewPw ? "text" : "password"}
                    placeholder="New password (min 6 characters)"
                    value={newPw}
                    onChange={(e) => setNewPw(e.target.value)}
                    className="w-full px-3.5 py-2.5 pr-10 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-mccain-green/50 focus:border-transparent placeholder:text-gray-400 hover:border-gray-300 transition-all"
                  />
                  <button type="button" onClick={() => setShowNewPw(!showNewPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors" tabIndex={-1}>
                    {showNewPw ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    )}
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showConfirmPw ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirmPw}
                    onChange={(e) => setConfirmPw(e.target.value)}
                    className="w-full px-3.5 py-2.5 pr-10 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-mccain-green/50 focus:border-transparent placeholder:text-gray-400 hover:border-gray-300 transition-all"
                  />
                  <button type="button" onClick={() => setShowConfirmPw(!showConfirmPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors" tabIndex={-1}>
                    {showConfirmPw ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    )}
                  </button>
                </div>
              </div>

              {pwError && (
                <p className="mt-2.5 text-xs text-red-500 flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                  {pwError}
                </p>
              )}
              {pwSuccess && (
                <p className="mt-2.5 text-xs text-emerald-600 flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  {pwSuccess}
                </p>
              )}

              <div className="flex items-center gap-2 mt-4">
                <button
                  type="submit"
                  disabled={pwSubmitting}
                  className="px-5 py-2.5 bg-mccain-green hover:bg-mccain-green-dark text-white text-sm font-bold rounded-xl transition-all active:scale-95 disabled:opacity-50 shadow-sm"
                >
                  {pwSubmitting ? "Saving..." : "Update Password"}
                </button>
                <button
                  type="button"
                  onClick={() => { setPwOpen(false); setCurrentPw(""); setNewPw(""); setConfirmPw(""); setPwError(""); setPwSuccess(""); }}
                  className="px-4 py-2.5 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">

        {/* ─── Status Cards ─── */}
        <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-5 sm:mb-8">
          {[
            { key: "all" as const, label: "Total", icon: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z", iconClass: "bg-gradient-to-br from-mccain-green to-mccain-green-dark text-white" },
            { key: "pending" as const, label: "Pending", icon: STATUS_CONFIG.pending.icon, iconClass: STATUS_CONFIG.pending.cardIcon },
            { key: "approved" as const, label: "Approved", icon: STATUS_CONFIG.approved.icon, iconClass: STATUS_CONFIG.approved.cardIcon },
            { key: "rejected" as const, label: "Rejected", icon: STATUS_CONFIG.rejected.icon, iconClass: STATUS_CONFIG.rejected.cardIcon },
          ].map((item) => {
            const isActive = statusFilter === item.key;
            const bg = item.key !== "all" ? STATUS_CONFIG[item.key].cardBg : "from-mccain-green to-mccain-green-dark";
            return (
              <button
                key={item.key}
                onClick={() => setStatusFilter(item.key)}
                className={`group relative overflow-hidden rounded-2xl p-3 sm:p-5 text-left transition-all duration-300 active:scale-95 ${
                  isActive
                    ? "bg-white ring-2 ring-mccain-green shadow-lg shadow-mccain-green/10"
                    : "bg-white border border-gray-200/60 hover:shadow-md"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-0">
                  <div>
                    <p className="text-xl sm:text-3xl font-extrabold text-gray-900 tracking-tight leading-none">
                      {statusCounts[item.key]}
                    </p>
                    <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider mt-0.5 sm:mt-1">{item.label}</p>
                  </div>
                  <div className={`hidden sm:flex w-10 h-10 rounded-xl ${item.iconClass} items-center justify-center`}>
                    <Icon d={item.icon} className="w-5 h-5" />
                  </div>
                </div>
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${bg} transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-40"}`} />
              </button>
            );
          })}
        </div>

        {/* ─── Toast ─── */}
        {success && (
          <div className="mb-4 sm:mb-6 flex items-center gap-3 p-3 sm:p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-sm text-emerald-700">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <Icon d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
            </div>
            <span className="font-medium text-sm">{success}</span>
          </div>
        )}

        {/* ─── Desktop add button ─── */}
        <div className="hidden sm:flex items-center justify-between mb-6">
          <button
            onClick={() => { setFormOpen(!formOpen); if (!formOpen) resetForm(); }}
            className={`inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 shadow-lg active:scale-95 ${
              formOpen
                ? "bg-gray-900 hover:bg-gray-800 text-white shadow-gray-900/20"
                : "bg-gradient-to-r from-mccain-green to-mccain-green-dark hover:from-mccain-green-dark hover:to-mccain-green text-white shadow-mccain-green/25"
            }`}
          >
            <svg className={`w-5 h-5 transition-transform duration-300 ${formOpen ? "rotate-45" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            {formOpen ? "Close Form" : "New Applicant"}
          </button>
          <p className="text-sm text-gray-500">
            <span className="font-semibold text-gray-900">{filteredEmployees.length}</span>
            {(statusFilter !== "all" || searchQuery) && <> of <span className="font-semibold text-gray-900">{employees.length}</span></>}
            {" "}applicants
          </p>
        </div>

        {/* ─── Form ─── */}
        <div className={`grid transition-all duration-500 ease-in-out ${formOpen ? "grid-rows-[1fr] opacity-100 mb-5 sm:mb-8" : "grid-rows-[0fr] opacity-0 mb-0"}`}>
          <div className="overflow-hidden">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-4 sm:p-8">
              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-mccain-green/10 flex items-center justify-center flex-shrink-0">
                  <Icon d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" className="w-5 h-5 text-mccain-green" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-gray-900">New Applicant</h2>
                  <p className="text-[11px] text-gray-500">All fields with * are required</p>
                </div>
              </div>

              {error && (
                <div className="mb-5 flex items-center gap-3 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-2xl text-sm text-red-700">
                  <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <Icon d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" className="w-4 h-4 text-red-600" />
                  </div>
                  <span className="font-medium">{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                {/* Personal Info */}
                <div className="mb-5 sm:mb-6">
                  <h3 className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 sm:mb-4">Personal Info</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-x-5 sm:gap-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                      <input type="text" value={fullName} onChange={(e) => { setFullName(e.target.value); if (fieldErrors.fullName) setFieldErrors((p) => ({ ...p, fullName: undefined })); }} placeholder="John Doe" className={inputClass(!!fieldErrors.fullName)} />
                      {fieldErrors.fullName && <ErrorText msg={fieldErrors.fullName} />}
                    </div>
                    <div className="grid grid-cols-2 gap-3 sm:contents">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Gender *</label>
                        <select value={gender} onChange={(e) => { setGender(e.target.value); if (fieldErrors.gender) setFieldErrors((p) => ({ ...p, gender: undefined })); }} className={`${inputClass(!!fieldErrors.gender)} ${selectChevron}`}>
                          <option value="">Select</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                        {fieldErrors.gender && <ErrorText msg={fieldErrors.gender} />}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Age *</label>
                        <input type="number" value={age} onChange={(e) => { setAge(e.target.value); if (fieldErrors.age) setFieldErrors((p) => ({ ...p, age: undefined })); }} placeholder="25" min={18} max={100} className={inputClass(!!fieldErrors.age)} />
                        {fieldErrors.age && <ErrorText msg={fieldErrors.age} />}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Status *</label>
                      <select value={formStatus} onChange={(e) => { setFormStatus(e.target.value); if (fieldErrors.status) setFieldErrors((p) => ({ ...p, status: undefined })); }} className={`${inputClass(!!fieldErrors.status)} ${selectChevron}`}>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                      {fieldErrors.status && <ErrorText msg={fieldErrors.status} />}
                    </div>
                  </div>
                </div>

                {/* Contact */}
                <div className="mb-5 sm:mb-6">
                  <h3 className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 sm:mb-4">Contact & ID</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-x-5 sm:gap-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone *</label>
                      <div className="flex gap-2">
                        <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)} className={`w-[100px] sm:w-[120px] flex-shrink-0 px-2 sm:px-3 py-3 border rounded-xl text-[15px] sm:text-sm bg-white focus:outline-none focus:ring-2 focus:border-transparent appearance-none ${fieldErrors.phoneNumber ? "border-red-300 focus:ring-red-400" : "border-gray-200 focus:ring-mccain-green/50"}`}>
                          <option value="">Country</option>
                          {COUNTRY_CODES.map((c) => (<option key={`${c.country}-${c.code}`} value={c.code}>{c.flag} {c.code}</option>))}
                        </select>
                        <input type="text" inputMode="text" value={phoneLocal} onChange={(e) => { setPhoneLocal(e.target.value); if (fieldErrors.phoneNumber) setFieldErrors((p) => ({ ...p, phoneNumber: undefined })); }} placeholder="Phone or contact" className={`flex-1 min-w-0 ${inputClass(!!fieldErrors.phoneNumber)}`} />
                      </div>
                      {fieldErrors.phoneNumber && <ErrorText msg={fieldErrors.phoneNumber} />}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Passport No. *</label>
                      <input type="text" value={passportNumber} onChange={(e) => { setPassportNumber(e.target.value.toUpperCase()); if (fieldErrors.passportNumber) setFieldErrors((p) => ({ ...p, passportNumber: undefined })); }} placeholder="AB1234567" maxLength={20} className={`${inputClass(!!fieldErrors.passportNumber)} uppercase tracking-widest font-mono`} />
                      {fieldErrors.passportNumber && <ErrorText msg={fieldErrors.passportNumber} />}
                    </div>
                  </div>
                </div>

                {/* Photo */}
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 sm:mb-4">Photo</h3>
                  {photoPreview ? (
                    <div className="flex items-center gap-4 p-3 sm:p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden ring-2 ring-mccain-green/20 flex-shrink-0">
                        <Image src={photoPreview} alt="Preview" fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">Photo uploaded</p>
                        <p className="text-[11px] text-gray-500 mt-0.5">Tap remove to change</p>
                        <button type="button" onClick={() => { setPhotograph(""); setPhotoPreview(""); }} className="mt-1.5 text-xs text-red-500 hover:text-red-700 font-semibold active:text-red-800">Remove</button>
                      </div>
                    </div>
                  ) : (
                    <label className={`group flex flex-col items-center justify-center w-full h-32 sm:h-40 border-2 border-dashed rounded-2xl cursor-pointer transition-all active:scale-[0.98] ${fieldErrors.photograph ? "border-red-300 bg-red-50/30" : "border-gray-200 hover:border-mccain-green active:border-mccain-green active:bg-mccain-green/5"}`}>
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-2 transition-colors ${fieldErrors.photograph ? "bg-red-100 text-red-500" : "bg-gray-100 text-gray-400"}`}>
                        <Icon d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                      </div>
                      <p className="text-sm font-medium text-gray-600">Tap to upload photo *</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">PNG, JPG, WebP. Max 5MB.</p>
                      <input type="file" accept="image/png,image/jpeg,image/jpg,image/webp" onChange={handlePhotoChange} className="hidden" />
                    </label>
                  )}
                  {fieldErrors.photograph && !photoPreview && <ErrorText msg={fieldErrors.photograph} />}
                </div>

                {/* Submit */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t border-gray-100">
                  <button type="submit" disabled={submitting} className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-mccain-green to-mccain-green-dark disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold px-8 py-3.5 sm:py-3 rounded-2xl transition-all text-sm shadow-lg shadow-mccain-green/20 disabled:shadow-none active:scale-95">
                    {submitting ? (
                      <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Adding...</>
                    ) : "Add Applicant"}
                  </button>
                  <button type="button" onClick={() => { setFormOpen(false); resetForm(); }} className="w-full sm:w-auto px-6 py-3 rounded-2xl text-sm font-medium text-gray-500 hover:text-gray-700 bg-gray-100 sm:bg-transparent hover:bg-gray-100 transition-all active:scale-95">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* ─── Applicant List ─── */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
          {/* Search + filter */}
          <div className="px-3 sm:px-6 lg:px-8 py-3 sm:py-5 border-b border-gray-100 space-y-3">
            {/* Search */}
            <div className="relative">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                type="text"
                placeholder="Search applicants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-2xl text-[15px] sm:text-sm bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-mccain-green/50 focus:border-transparent transition-all placeholder:text-gray-400"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 active:bg-gray-400 flex items-center justify-center transition-colors">
                  <svg className="w-3.5 h-3.5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              )}
            </div>

            {/* Scrollable filter pills */}
            <div className="flex gap-1.5 overflow-x-auto no-scrollbar -mx-1 px-1 pb-0.5">
              {(["all", "pending", "approved", "rejected"] as const).map((status) => {
                const isActive = statusFilter === status;
                const dotColor = status === "all" ? "bg-gray-600" : (STATUS_CONFIG[status]?.dot || "bg-gray-400");
                return (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap capitalize active:scale-95 flex-shrink-0 ${
                      isActive
                        ? "bg-mccain-green text-white shadow-sm"
                        : "bg-gray-100 text-gray-500 hover:text-gray-700 active:bg-gray-200"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-white" : dotColor}`} />
                    {status}
                    <span className={`text-[10px] font-bold ${isActive ? "text-white/80" : "text-gray-400"}`}>
                      {statusCounts[status]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Mobile result count */}
            <p className="text-xs text-gray-400 sm:hidden">
              {filteredEmployees.length}{(statusFilter !== "all" || searchQuery) && ` of ${employees.length}`} applicants
            </p>
          </div>

          {/* Content */}
          {loading ? (
            <div className="p-10 sm:p-12 flex flex-col items-center gap-3">
              <div className="w-9 h-9 border-[3px] border-gray-200 border-t-mccain-green rounded-full animate-spin" />
              <p className="text-sm text-gray-400">Loading...</p>
            </div>
          ) : filteredEmployees.length === 0 ? (
            <div className="p-10 sm:p-16 text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 rounded-2xl bg-gray-100 flex items-center justify-center">
                <Icon d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" className="w-6 h-6 sm:w-7 sm:h-7 text-gray-400" />
              </div>
              <p className="text-sm font-medium text-gray-900 mb-1">{employees.length === 0 ? "No applicants yet" : "No matches"}</p>
              <p className="text-xs text-gray-500">{employees.length === 0 ? "Tap + to add your first applicant." : "Try a different search or filter."}</p>
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden md:block">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/50">
                      <th className="px-6 py-3.5 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider">Applicant</th>
                      <th className="px-4 py-3.5 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider">Phone</th>
                      <th className="px-4 py-3.5 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider">Passport</th>
                      <th className="px-4 py-3.5 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider">Gender</th>
                      <th className="px-4 py-3.5 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider">Age</th>
                      <th className="px-4 py-3.5 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3.5 text-right text-[11px] font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredEmployees.map((emp) => {
                      const cfg = getConfig(emp.status);
                      return (
                        <tr key={emp.id} className={`transition-colors duration-150 ${cfg.row}`}>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-gray-100 ring-1 ring-gray-200 flex-shrink-0">
                                <Image src={emp.photograph} alt={emp.fullName} fill className="object-cover" />
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-900">{emp.fullName}</p>
                                <p className="text-[11px] text-gray-400">{new Date(emp.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-600">{emp.phoneNumber}</td>
                          <td className="px-4 py-4 text-sm text-gray-600 font-mono tracking-wide">{emp.passportNumber}</td>
                          <td className="px-4 py-4 text-sm text-gray-600">{emp.gender}</td>
                          <td className="px-4 py-4 text-sm text-gray-600">{emp.age}</td>
                          <td className="px-4 py-4">
                            <select value={emp.status} onChange={(e) => handleStatusChange(emp.id, e.target.value)} className={`text-xs font-semibold border rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-mccain-green/40 ${selectChevron} pr-7 cursor-pointer ${cfg.badge}`}>
                              <option value="pending">Pending</option>
                              <option value="approved">Approved</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          </td>
                          <td className="px-4 py-4 text-right">
                            <button onClick={() => handleDelete(emp.id)} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium text-red-500 hover:text-red-700 hover:bg-red-50 transition-all">
                              <Icon d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" className="w-3.5 h-3.5" />
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* ─── Mobile Cards (polished) ─── */}
              <div className="md:hidden">
                {filteredEmployees.map((emp, idx) => {
                  const cfg = getConfig(emp.status);
                  return (
                    <div key={emp.id} className={`${idx > 0 ? "border-t border-gray-100" : ""}`}>
                      <div className="p-3.5 active:bg-gray-50 transition-colors">
                        {/* Top row: Photo + Name + Status badge */}
                        <div className="flex items-center gap-3 mb-2.5">
                          <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-gray-100 ring-1 ring-gray-200 flex-shrink-0">
                            <Image src={emp.photograph} alt={emp.fullName} fill className="object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-[15px] text-gray-900 leading-tight truncate">{emp.fullName}</h3>
                            <p className="text-[11px] text-gray-400 mt-0.5">
                              {emp.gender} &middot; {emp.age}y &middot; {new Date(emp.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                            </p>
                          </div>
                          {/* Status badge */}
                          <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[10px] font-bold uppercase tracking-wider flex-shrink-0 ${cfg.badge}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                            {emp.status}
                          </div>
                        </div>

                        {/* Info pills */}
                        <div className="flex flex-wrap gap-1.5 mb-3 ml-0.5">
                          <span className="inline-flex items-center gap-1 text-[11px] text-gray-500 bg-gray-50 rounded-lg px-2 py-1 border border-gray-100">
                            <Icon d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" className="w-3 h-3 text-gray-400" />
                            {emp.phoneNumber}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[11px] text-gray-500 bg-gray-50 rounded-lg px-2 py-1 border border-gray-100 font-mono tracking-wide">
                            <Icon d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" className="w-3 h-3 text-gray-400" />
                            {emp.passportNumber}
                          </span>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <select
                            value={emp.status}
                            onChange={(e) => handleStatusChange(emp.id, e.target.value)}
                            className={`flex-1 text-xs font-semibold border rounded-xl px-3 py-2.5 focus:outline-none ${selectChevron} pr-8 ${cfg.badge}`}
                          >
                            <option value="pending">Set Pending</option>
                            <option value="approved">Set Approved</option>
                            <option value="rejected">Set Rejected</option>
                          </select>
                          <button
                            onClick={() => handleDelete(emp.id)}
                            className="flex items-center justify-center w-10 h-10 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 active:bg-red-100 transition-all flex-shrink-0"
                          >
                            <Icon d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ─── Mobile FAB ─── */}
      <div className="sm:hidden fixed bottom-6 right-4 z-40">
        <button
          onClick={() => { setFormOpen(!formOpen); if (!formOpen) { resetForm(); window.scrollTo({ top: 0, behavior: "smooth" }); } }}
          className={`flex items-center justify-center w-14 h-14 rounded-2xl shadow-2xl transition-all duration-300 active:scale-90 ${
            formOpen
              ? "bg-gray-900 shadow-gray-900/30 rotate-45"
              : "bg-gradient-to-br from-mccain-green to-mccain-green-dark shadow-mccain-green/40"
          }`}
        >
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </div>
  );
}
