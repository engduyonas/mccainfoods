import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, AUTH_TOKEN_VALUE } from "@/lib/auth";
import { isMongoConfigured } from "@/lib/mongodb";
import { updateEmployeeFull, updateEmployeeStatus, deleteEmployee } from "@/lib/store";

function isAuthed(request: NextRequest): boolean {
  const token = request.cookies.get(AUTH_COOKIE_NAME);
  return token?.value === AUTH_TOKEN_VALUE;
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthed(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isMongoConfigured()) {
    return NextResponse.json(
      { error: "Database not configured" },
      { status: 503 }
    );
  }

  try {
    const { id } = await params;
    const body = (await request.json()) as Record<string, unknown>;
    const validStatuses = ["pending", "approved", "rejected", "submitted"] as const;

    // Full-record update from admin edit form
    if (typeof body.fullName === "string") {
      const {
        fullName,
        phoneNumber,
        passportNumber,
        gender,
        photograph,
        age,
        status,
      } = body;

      if (
        typeof phoneNumber !== "string" ||
        typeof passportNumber !== "string" ||
        typeof gender !== "string" ||
        typeof photograph !== "string" ||
        typeof status !== "string" ||
        !validStatuses.includes(status as (typeof validStatuses)[number])
      ) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
      }

      let ageNum: number;
      if (typeof age === "number" && !Number.isNaN(age)) ageNum = age;
      else if (typeof age === "string" && age.trim() !== "") {
        ageNum = parseInt(age, 10);
      } else {
        return NextResponse.json({ error: "Invalid age" }, { status: 400 });
      }
      if (Number.isNaN(ageNum)) {
        return NextResponse.json({ error: "Invalid age" }, { status: 400 });
      }

      const employee = await updateEmployeeFull(id, {
        fullName: fullName.trim(),
        phoneNumber: phoneNumber.trim(),
        passportNumber: String(passportNumber).trim().toUpperCase(),
        gender,
        photograph,
        age: ageNum,
        status,
      });
      if (!employee) {
        return NextResponse.json({ error: "Applicant not found" }, { status: 404 });
      }
      return NextResponse.json(employee);
    }

    const statusOnly = typeof body.status === "string" ? body.status : "";
    if (!statusOnly || !validStatuses.includes(statusOnly as (typeof validStatuses)[number])) {
      return NextResponse.json(
        { error: "Invalid status. Must be pending, approved, rejected, or submitted" },
        { status: 400 }
      );
    }

    const employee = await updateEmployeeStatus(id, statusOnly);
    if (!employee) {
      return NextResponse.json({ error: "Applicant not found" }, { status: 404 });
    }

    return NextResponse.json(employee);
  } catch {
    return NextResponse.json(
      { error: "Failed to update applicant" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthed(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isMongoConfigured()) {
    return NextResponse.json(
      { error: "Database not configured" },
      { status: 503 }
    );
  }

  try {
    const { id } = await params;
    const deleted = await deleteEmployee(id);
    if (!deleted) {
      return NextResponse.json({ error: "Applicant not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete applicant" },
      { status: 500 }
    );
  }
}
