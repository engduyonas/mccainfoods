export const DEFAULT_PAGE_SIZE = 12;
export const ADMIN_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 50;

export interface EmployeeListItem {
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

export interface EmployeeStatusCounts {
  all: number;
  pending: number;
  approved: number;
  rejected: number;
  submitted: number;
}

export interface EmployeeListResponse {
  items: EmployeeListItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  counts: EmployeeStatusCounts;
}

export function employeesApiUrl(params: {
  page: number;
  pageSize?: number;
  status?: string;
  publicOnly?: boolean;
  q?: string;
  includeCounts?: boolean;
}): string {
  const search = new URLSearchParams();
  search.set("page", String(params.page));
  search.set("limit", String(params.pageSize ?? DEFAULT_PAGE_SIZE));
  if (params.status && params.status !== "all") search.set("status", params.status);
  if (params.publicOnly) search.set("public", "1");
  if (params.q?.trim()) search.set("q", params.q.trim());
  if (params.includeCounts === false) search.set("counts", "0");
  return `/api/employees?${search.toString()}`;
}
