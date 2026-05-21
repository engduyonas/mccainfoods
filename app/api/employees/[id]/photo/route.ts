import { NextResponse } from "next/server";
import { isMongoConfigured } from "@/lib/mongodb";
import { photographDataUrlToResponse } from "@/lib/employeePhoto";
import { getEmployeePhotograph } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isMongoConfigured()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  try {
    const { id } = await params;
    const photograph = await getEmployeePhotograph(id);
    if (!photograph) {
      return NextResponse.json({ error: "Photo not found" }, { status: 404 });
    }

    const response = photographDataUrlToResponse(photograph);
    if (!response) {
      return NextResponse.json({ error: "Invalid photo data" }, { status: 500 });
    }

    return response;
  } catch {
    return NextResponse.json({ error: "Failed to load photo" }, { status: 500 });
  }
}
