"use client";

import { useCallback, useEffect, useState } from "react";
import EmployeeCard from "@/app/components/EmployeeCard";
import PaginationControls from "@/app/components/PaginationControls";
import {
  DEFAULT_PAGE_SIZE,
  employeesApiUrl,
  type EmployeeListItem,
  type EmployeeListResponse,
  type EmployeeStatusCounts,
} from "@/lib/employeesApi";

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
      </div>
      <div className="h-1 w-full bg-gray-200" />
    </div>
  );
}

const EMPTY_COUNTS: EmployeeStatusCounts = {
  all: 0,
  pending: 0,
  approved: 0,
  rejected: 0,
  submitted: 0,
};

export default function EmployeeSection() {
  const [employees, setEmployees] = useState<EmployeeListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [counts, setCounts] = useState<EmployeeStatusCounts>(EMPTY_COUNTS);

  const loadPage = useCallback(async (nextPage: number, status: string) => {
    setLoading(true);
    setLoadError("");
    try {
      const res = await fetch(
        employeesApiUrl({ page: nextPage, pageSize: DEFAULT_PAGE_SIZE, status, publicOnly: true }),
        { cache: "no-store" }
      );
      const data = (await res.json()) as EmployeeListResponse | { error?: string };
      if (!res.ok || !("items" in data)) {
        setLoadError(("error" in data && data.error) || "Could not load applicants");
        setEmployees([]);
        return;
      }
      setEmployees(data.items);
      setPage(data.page);
      setTotalPages(data.totalPages);
      setTotal(data.total);
      setCounts(data.counts);
    } catch {
      setLoadError("Could not load applicants. Please try again.");
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPage(page, activeFilter);
  }, [page, activeFilter, loadPage]);

  const dotColors: Record<string, string> = {
    all: "bg-mccain-green",
    pending: "bg-amber-400",
    approved: "bg-emerald-500",
    rejected: "bg-red-500",
  };

  return (
    <section className="bg-mccain-gray/50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-10 sm:py-16">
        <div className="flex flex-col gap-4 mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-mccain-green/10 rounded-full px-4 py-1.5 mb-3">
              <span className="text-xs font-bold text-mccain-green uppercase tracking-widest">Applicants</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-mccain-dark">
              Application Status<span className="text-mccain-yellow">.</span>
            </h2>
            <p className="text-sm text-mccain-gray-dark mt-1">Applicants and their current status</p>
          </div>

          <div className="flex gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar -mx-3 px-3 sm:mx-0 sm:px-0 pb-0.5">
            {(["all", "pending", "approved", "rejected"] as const).map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => {
                    setPage(1);
                    setActiveFilter(filter);
                  }}
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
                      {counts[filter]}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : loadError ? (
          <div className="text-center py-14 sm:py-20">
            <p className="text-sm font-medium text-red-600 mb-2">{loadError}</p>
            <button
              type="button"
              onClick={() => loadPage(page, activeFilter)}
              className="text-sm font-semibold text-mccain-green hover:underline"
            >
              Retry
            </button>
          </div>
        ) : employees.length === 0 ? (
          <div className="text-center py-14 sm:py-20">
            <p className="text-sm font-medium text-gray-400">
              {counts.all === 0 ? "No applicants yet" : "No applicants match this filter"}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {employees.map((employee) => (
                <EmployeeCard
                  key={employee.id}
                  id={employee.id}
                  fullName={employee.fullName}
                  phoneNumber={employee.phoneNumber}
                  passportNumber={employee.passportNumber}
                  gender={employee.gender}
                  age={employee.age}
                  status={employee.status}
                />
              ))}
            </div>
            <PaginationControls
              page={page}
              totalPages={totalPages}
              total={total}
              pageSize={DEFAULT_PAGE_SIZE}
              loading={loading}
              onPageChange={setPage}
            />
          </>
        )}
      </div>
    </section>
  );
}
