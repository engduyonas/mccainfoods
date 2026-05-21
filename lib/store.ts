import { ObjectId, type Collection } from "mongodb";
import { withDb } from "@/lib/mongodb";

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

  if (options.status && options.status !== "all") {
    filter.status = options.status;
  } else if (options.excludeSubmitted) {
    filter.status = { $in: ["pending", "approved", "rejected"] };
  }
  if (options.search?.trim()) {
    filter.fullName = { $regex: options.search.trim(), $options: "i" };
  }

  return filter;
}

async function countByStatus(
  col: Collection<EmployeeDoc>,
  excludeSubmitted: boolean
): Promise<EmployeeStatusCounts> {
  if (excludeSubmitted) {
    const [pending, approved, rejected] = await Promise.all([
      col.countDocuments({ status: "pending" }),
      col.countDocuments({ status: "approved" }),
      col.countDocuments({ status: "rejected" }),
    ]);
    return { all: pending + approved + rejected, pending, approved, rejected, submitted: 0 };
  }

  const [pending, approved, rejected, submitted] = await Promise.all([
    col.countDocuments({ status: "pending" }),
    col.countDocuments({ status: "approved" }),
    col.countDocuments({ status: "rejected" }),
    col.countDocuments({ status: "submitted" }),
  ]);

  return {
    all: pending + approved + rejected + submitted,
    pending,
    approved,
    rejected,
    submitted,
  };
}

export interface EmployeeListWithCounts extends EmployeeListResult {
  counts: EmployeeStatusCounts;
}

export async function listEmployeesWithCounts(
  options: EmployeeListOptions = {},
  excludeSubmittedCounts = false,
  includeCounts = true
): Promise<EmployeeListWithCounts> {
  return withDb(async (db) => {
    const page = Math.max(1, options.page ?? 1);
    const pageSize = Math.min(50, Math.max(1, options.pageSize ?? 12));
    const filter = buildEmployeeFilter(options);
    const col = db.collection<EmployeeDoc>("employees");

    const listPromise = col
      .find(filter, { projection: { photograph: 0 } })
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .toArray();

    const [total, docs, counts] = await Promise.all([
      col.countDocuments(filter),
      listPromise,
      includeCounts ? countByStatus(col, excludeSubmittedCounts) : Promise.resolve(null),
    ]);

    return {
      items: docs.map(docToEmployeeSummary),
      total,
      page,
      pageSize,
      totalPages: Math.max(1, Math.ceil(total / pageSize) || 1),
      counts: counts ?? { all: 0, pending: 0, approved: 0, rejected: 0, submitted: 0 },
    };
  });
}

export async function listEmployees(options: EmployeeListOptions = {}): Promise<EmployeeListResult> {
  return withDb(async (db) => {
    const page = Math.max(1, options.page ?? 1);
    const pageSize = Math.min(50, Math.max(1, options.pageSize ?? 12));
    const filter = buildEmployeeFilter(options);
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
  });
}

export async function getEmployeeStatusCounts(excludeSubmitted = false): Promise<EmployeeStatusCounts> {
  return withDb(async (db) => countByStatus(db.collection<EmployeeDoc>("employees"), excludeSubmitted));
}

/** @deprecated Use listEmployees instead */
export async function getAllEmployees(): Promise<Employee[]> {
  const result = await listEmployees({ page: 1, pageSize: 50 });
  return result.items;
}

export async function getEmployeeById(id: string): Promise<Employee | null> {
  return withDb(async (db) => {
    const doc = await db.collection<EmployeeDoc>("employees").findOne({ _id: new ObjectId(id) });
    return doc ? toEmployee(doc) : null;
  });
}

export async function getEmployeePhotograph(id: string): Promise<string | null> {
  return withDb(async (db) => {
    const doc = await db
      .collection<Pick<EmployeeDoc, "photograph">>("employees")
      .findOne({ _id: new ObjectId(id) }, { projection: { photograph: 1 } });
    return doc?.photograph ?? null;
  });
}

export async function createEmployee(data: Omit<Employee, "id" | "createdAt">): Promise<Employee> {
  return withDb(async (db) => {
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
  });
}

export async function updateEmployeeStatus(id: string, status: string): Promise<Employee | null> {
  return withDb(async (db) => {
    const result = await db.collection<EmployeeDoc>("employees").findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { status } },
      { returnDocument: "after" }
    );
    return result ? toEmployee(result) : null;
  });
}

export async function updateEmployeeFull(
  id: string,
  data: Omit<Employee, "id" | "createdAt">
): Promise<Employee | null> {
  return withDb(async (db) => {
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
  });
}

export async function deleteEmployee(id: string): Promise<boolean> {
  return withDb(async (db) => {
    const result = await db.collection("employees").deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount === 1;
  });
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
  return withDb(async (db) => {
    const col = db.collection("admin_settings");
    const doc = await col.findOne({ key: "admin" });
    if (doc) return { username: doc.username as string, password: doc.password as string };
    await col.deleteMany({});
    return DEFAULT_ADMIN;
  });
}

export async function updateAdminPassword(newPassword: string): Promise<void> {
  return withDb(async (db) => {
    await db.collection("admin_settings").updateOne(
      { key: "admin" },
      { $set: { password: newPassword, username: "admin" } },
      { upsert: true }
    );
  });
}
