import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";

// ═══════════════════════════════════════════════════
//  Employee CRUD — MongoDB
// ═══════════════════════════════════════════════════

export interface Employee {
  id: string;
  fullName: string;
  phoneNumber: string;
  passportNumber: string;
  gender: string;
  photograph: string; // base64 data URL stored directly in MongoDB
  age: number;
  status: string;
  createdAt: string;
}

interface EmployeeDoc {
  _id: ObjectId;
  fullName: string;
  phoneNumber: string;
  passportNumber: string;
  gender: string;
  photograph: string;
  age: number;
  status: string;
  createdAt: string;
}

function toEmployee(doc: EmployeeDoc): Employee {
  return {
    id: doc._id.toHexString(),
    fullName: doc.fullName,
    phoneNumber: doc.phoneNumber,
    passportNumber: doc.passportNumber,
    gender: doc.gender,
    photograph: doc.photograph,
    age: doc.age,
    status: doc.status,
    createdAt: doc.createdAt,
  };
}

export interface EmployeeListOptions {
  page?: number;
  pageSize?: number;
  status?: string;
  excludeSubmitted?: boolean;
  search?: string;
}

export interface EmployeeListResult {
  items: Employee[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface EmployeeStatusCounts {
  all: number;
  pending: number;
  approved: number;
  rejected: number;
  submitted: number;
}

function docToEmployeeSummary(doc: EmployeeDoc): Employee {
  return { ...toEmployee({ ...doc, photograph: "" }), photograph: "" };
}

function buildEmployeeFilter(options: Pick<EmployeeListOptions, "status" | "excludeSubmitted" | "search">) {
  const filter: Record<string, unknown> = {};

  if (options.excludeSubmitted) {
    filter.status = { $ne: "submitted" };
  }
  if (options.status && options.status !== "all") {
    filter.status = options.status;
  }
  if (options.search?.trim()) {
    filter.fullName = { $regex: options.search.trim(), $options: "i" };
  }

  return filter;
}

export async function listEmployees(options: EmployeeListOptions = {}): Promise<EmployeeListResult> {
  const page = Math.max(1, options.page ?? 1);
  const pageSize = Math.min(50, Math.max(1, options.pageSize ?? 12));
  const filter = buildEmployeeFilter(options);
  const db = await getDb();
  const col = db.collection<EmployeeDoc>("employees");

  const [total, docs] = await Promise.all([
    col.countDocuments(filter),
    col
      .find(filter, { projection: { photograph: 0 } })
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .toArray(),
  ]);

  return {
    items: docs.map(docToEmployeeSummary),
    total,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(total / pageSize) || 1),
  };
}

export async function getEmployeeStatusCounts(excludeSubmitted = false): Promise<EmployeeStatusCounts> {
  const db = await getDb();
  const match = excludeSubmitted ? { status: { $ne: "submitted" } } : {};
  const rows = await db
    .collection<EmployeeDoc>("employees")
    .aggregate<{ _id: string; count: number }>([
      { $match: match },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ])
    .toArray();

  const counts: EmployeeStatusCounts = {
    all: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    submitted: 0,
  };

  for (const row of rows) {
    const key = row._id as keyof Omit<EmployeeStatusCounts, "all">;
    if (key in counts) {
      counts[key] = row.count;
      if (excludeSubmitted || key !== "submitted") {
        counts.all += row.count;
      }
    }
  }

  if (!excludeSubmitted) {
    counts.all = counts.pending + counts.approved + counts.rejected + counts.submitted;
  }

  return counts;
}

/** @deprecated Use listEmployees instead */
export async function getAllEmployees(): Promise<Employee[]> {
  const result = await listEmployees({ page: 1, pageSize: 50 });
  return result.items;
}

export async function getEmployeeById(id: string): Promise<Employee | null> {
  const db = await getDb();
  const doc = await db.collection<EmployeeDoc>("employees").findOne({ _id: new ObjectId(id) });
  return doc ? toEmployee(doc) : null;
}

export async function getEmployeePhotograph(id: string): Promise<string | null> {
  const db = await getDb();
  const doc = await db
    .collection<Pick<EmployeeDoc, "photograph">>("employees")
    .findOne({ _id: new ObjectId(id) }, { projection: { photograph: 1 } });
  return doc?.photograph ?? null;
}

export async function createEmployee(data: Omit<Employee, "id" | "createdAt">): Promise<Employee> {
  const db = await getDb();
  const doc = {
    ...data,
    createdAt: new Date().toISOString(),
  };
  const result = await db.collection("employees").insertOne(doc);
  return {
    ...data,
    id: result.insertedId.toHexString(),
    createdAt: doc.createdAt,
  };
}

export async function updateEmployeeStatus(id: string, status: string): Promise<Employee | null> {
  const db = await getDb();
  const result = await db.collection<EmployeeDoc>("employees").findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { status } },
    { returnDocument: "after" }
  );
  return result ? toEmployee(result) : null;
}

export async function updateEmployeeFull(
  id: string,
  data: Omit<Employee, "id" | "createdAt">
): Promise<Employee | null> {
  const db = await getDb();
  const result = await db.collection<EmployeeDoc>("employees").findOneAndUpdate(
    { _id: new ObjectId(id) },
    {
      $set: {
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        passportNumber: data.passportNumber,
        gender: data.gender,
        photograph: data.photograph,
        age: data.age,
        status: data.status,
      },
    },
    { returnDocument: "after" }
  );
  return result ? toEmployee(result) : null;
}

export async function deleteEmployee(id: string): Promise<boolean> {
  const db = await getDb();
  const result = await db.collection("employees").deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount === 1;
}

// ═══════════════════════════════════════════════════
//  Admin settings — MongoDB
// ═══════════════════════════════════════════════════

interface AdminSettings {
  username: string;
  password: string;
}

const DEFAULT_ADMIN: AdminSettings = { username: "admin", password: "admin123" };

export async function getAdminCredentials(): Promise<AdminSettings> {
  const db = await getDb();
  const col = db.collection("admin_settings");
  // Look for the new format first
  const doc = await col.findOne({ key: "admin" });
  if (doc) return { username: doc.username as string, password: doc.password as string };
  // Clean up any old broken docs and return default
  await col.deleteMany({});
  return DEFAULT_ADMIN;
}

export async function updateAdminPassword(newPassword: string): Promise<void> {
  const db = await getDb();
  await db.collection("admin_settings").updateOne(
    { key: "admin" },
    { $set: { password: newPassword, username: "admin" } },
    { upsert: true }
  );
}
