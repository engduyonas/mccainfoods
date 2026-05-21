import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, AUTH_TOKEN_VALUE } from "@/lib/auth";
import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from "@/lib/employeesApi";
import { isMongoConfigured } from "@/lib/mongodb";
import { createEmployee, getEmployeeStatusCounts, listEmployees } from "@/lib/store";

export const dynamic = "force-dynamic";

function isAuthed(request: NextRequest): boolean {
  const token = request.cookies.get(AUTH_COOKIE_NAME);
  return token?.value === AUTH_TOKEN_VALUE;
}

function parsePositiveInt(value: string | null, fallback: number, max: number): number {
  const n = Number.parseInt(value ?? "", 10);
  if (!Number.isFinite(n) || n < 1) return fallback;
  return Math.min(n, max);
}

export async function GET(request: NextRequest) {
  if (!isMongoConfigured()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  try {
    const { searchParams } = request.nextUrl;
    const page = parsePositiveInt(searchParams.get("page"), 1, 10_000);
    const limit = parsePositiveInt(searchParams.get("limit"), DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE);
    const status = searchParams.get("status") ?? "all";
    const publicOnly = searchParams.get("public") === "1";
    const q = searchParams.get("q") ?? "";

    const [list, counts] = await Promise.all([
      listEmployees({
        page,
        pageSize: limit,
        status: status === "all" ? undefined : status,
        excludeSubmitted: publicOnly,
        search: q,
      }),
      getEmployeeStatusCounts(publicOnly),
    ]);

    return NextResponse.json(
      { ...list, counts },
      { headers: { "Cache-Control": "private, no-store, must-revalidate" } }
    );
  } catch {
    return NextResponse.json({ error: "Failed to fetch applicants" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!isAuthed(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isMongoConfigured()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  try {
    const body = await request.json();
    const { fullName, phoneNumber, passportNumber, gender, photograph, age, status } = body;

    if (!fullName || !phoneNumber || !passportNumber || !gender || !photograph || !age) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const validStatuses = ["pending", "approved", "rejected", "submitted"];
    const applicantStatus = status && validStatuses.includes(status) ? status : "pending";

    const applicant = await createEmployee({
      fullName,
      phoneNumber,
      passportNumber,
      gender,
      photograph,
      age: parseInt(age, 10),
      status: applicantStatus,
    });

    return NextResponse.json(applicant, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create applicant" }, { status: 500 });
  }
}
