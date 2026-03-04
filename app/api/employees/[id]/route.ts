import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, AUTH_TOKEN_VALUE } from "@/lib/auth";
import { isMongoConfigured } from "@/lib/mongodb";
import { updateEmployeeStatus, deleteEmployee } from "@/lib/store";

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
    const body = await request.json();
    const { status } = body;

    if (!status || !["pending", "approved", "rejected"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status. Must be pending, approved, or rejected" },
        { status: 400 }
      );
    }

    const employee = await updateEmployeeStatus(id, status);
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
