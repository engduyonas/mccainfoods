"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import EmployeeCard from "@/app/components/EmployeeCard";

interface Employee {
  id: string;
  fullName: string;
  phoneNumber: string;
  passportNumber: string;
  gender: string;
  photograph: string;
  age: number;
  status: string;
}

// Module-level cache so data survives re-mounts (navigations)
let cachedEmployees: Employee[] | null = null;
let cacheTimestamp = 0;
const CACHE_TTL = 60_000; // re-fetch at most once per minute

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
      <div className="h-40 sm:h-52 bg-gray-200" />
      <div className="p-3 sm:p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded-full w-3/4" />
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gray-200" />
          <div className="space-y-1.5 flex-1">
            <div className="h-2 bg-gray-200 rounded-full w-12" />
            <div className="h-3 bg-gray-200 rounded-full w-16" />
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gray-200" />
          <div className="space-y-1.5 flex-1">
            <div className="h-2 bg-gray-200 rounded-full w-16" />
            <div className="h-3 bg-gray-200 rounded-full w-24" />
          </div>
        </div>
      </div>
      <div className="h-1 w-full bg-gray-200" />
    </div>
  );
}

export default function EmployeeSection() {
  const [employees, setEmployees] = useState<Employee[]>(cachedEmployees ?? []);
  const [loading, setLoading] = useState(cachedEmployees === null);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const fetchedRef = useRef(false);

  useEffect(() => {
    // Skip if we already fetched in this mount or cache is still fresh
    if (fetchedRef.current) return;
    if (cachedEmployees && Date.now() - cacheTimestamp < CACHE_TTL) {
      setEmployees(cachedEmployees);
      setLoading(false);
      fetchedRef.current = true;
      return;
    }
    fetchedRef.current = true;

    async function fetchEmployees() {
      try {
        const res = await fetch("/api/employees");
        const data = await res.json();
        if (Array.isArray(data)) {
          cachedEmployees = data;
          cacheTimestamp = Date.now();
          setEmployees(data);
        }
      } catch { /* silently handled */ } finally {
        setLoading(false);
      }
    }
    fetchEmployees();
  }, []);

  /** Invite-only applications stay in admin; never list `submitted` on the public home page. */
  const publicEmployees = useMemo(
    () => employees.filter((e) => e.status !== "submitted"),
    [employees]
  );

  const visibleEmployees = useMemo(() => {
    const filtered =
      activeFilter === "all" ? publicEmployees : publicEmployees.filter((e) => e.status === activeFilter);
    return filtered.slice().sort((a, b) => a.fullName.localeCompare(b.fullName));
  }, [publicEmployees, activeFilter]);

  const counts = useMemo(() => {
    const c = { all: publicEmployees.length, pending: 0, approved: 0, rejected: 0 };
    publicEmployees.forEach((e) => {
      if (e.status in c) c[e.status as keyof typeof c]++;
    });
    return c;
  }, [publicEmployees]);

  const dotColors: Record<string, string> = {
    all: "bg-mccain-green",
    pending: "bg-amber-400",
    approved: "bg-emerald-500",
    rejected: "bg-red-500",
  };

  return (
    <section className="bg-mccain-gray/50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-10 sm:py-16">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-mccain-green/10 rounded-full px-4 py-1.5 mb-3">
              <svg className="w-4 h-4 text-mccain-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128H5.228A2 2 0 013 17.208V17.128m12 0a5.971 5.971 0 00-.786-3.07M3 17.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952M3 17.128V17.05c0-.487.083-.953.216-1.392M3 17.128h4.5M10.5 7.5a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
              <span className="text-xs font-bold text-mccain-green uppercase tracking-widest">Applicants</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-mccain-dark">
              Application Status<span className="text-mccain-yellow">.</span>
            </h2>
            <p className="text-sm text-mccain-gray-dark mt-1">Applicants and their current status</p>
          </div>

          {/* Scrollable filter pills */}
          <div className="flex gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar -mx-3 px-3 sm:mx-0 sm:px-0 pb-0.5">
            {(["all", "pending", "approved", "rejected"] as const).map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  disabled={loading}
                  className={`inline-flex items-center gap-1 sm:gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap flex-shrink-0 active:scale-95 ${
                    isActive
                      ? "bg-mccain-green text-white shadow-md"
                      : "bg-white text-mccain-gray-dark border border-gray-200 hover:border-mccain-green active:bg-gray-100"
                  } ${loading ? "opacity-60 cursor-wait" : ""}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-white" : dotColors[filter]}`} />
                  {filter}
                  {!loading && (
                    <span className={`text-[9px] sm:text-[10px] font-bold ${isActive ? "text-white/80" : "text-gray-400"}`}>
                      {counts[filter as keyof typeof counts]}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        {loading ? (
          /* Skeleton loading state */
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : publicEmployees.length === 0 ? (
          /* Empty state */
          <div className="text-center py-14 sm:py-20">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-400">No applicants yet</p>
            <p className="text-xs text-gray-300 mt-1">Applicants will appear here once added</p>
          </div>
        ) : visibleEmployees.length === 0 ? (
          /* Filter empty state */
          <div className="text-center py-10 sm:py-12">
            <p className="text-sm text-mccain-gray-dark">No applicants match this filter.</p>
          </div>
        ) : (
          /* Applicant cards */
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {visibleEmployees.map((employee) => (
              <EmployeeCard
                key={employee.id}
                fullName={employee.fullName}
                phoneNumber={employee.phoneNumber}
                passportNumber={employee.passportNumber}
                gender={employee.gender}
                photograph={employee.photograph}
                age={employee.age}
                status={employee.status}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
