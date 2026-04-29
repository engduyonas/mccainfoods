import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";

// ═══════════════════════════════════════════════════
//  Server-side in-memory cache
//  Avoids hitting MongoDB on every request.
//  Automatically invalidated on any write operation.
// ═══════════════════════════════════════════════════

let employeeCache: Employee[] | null = null;
let cacheTTLTimer: ReturnType<typeof setTimeout> | null = null;
const CACHE_TTL = 30_000; // 30 seconds

function getCached(): Employee[] | null {
  return employeeCache;
}

function setCache(data: Employee[]): void {
  employeeCache = data;
  if (cacheTTLTimer) clearTimeout(cacheTTLTimer);
  cacheTTLTimer = setTimeout(() => { employeeCache = null; }, CACHE_TTL);
}

function invalidateCache(): void {
  employeeCache = null;
  if (cacheTTLTimer) { clearTimeout(cacheTTLTimer); cacheTTLTimer = null; }
}

/** Exported for invite flow after direct Mongo writes. */
export function invalidateEmployeesCache(): void {
  invalidateCache();
}

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

export async function getAllEmployees(): Promise<Employee[]> {
  const cached = getCached();
  if (cached) return cached;

  const db = await getDb();
  const docs = await db
    .collection<EmployeeDoc>("employees")
    .find()
    .sort({ createdAt: -1 })
    .toArray();
  const employees = docs.map(toEmployee);
  setCache(employees);
  return employees;
}

export async function createEmployee(data: Omit<Employee, "id" | "createdAt">): Promise<Employee> {
  const db = await getDb();
  const doc = {
    ...data,
    createdAt: new Date().toISOString(),
  };
  const result = await db.collection("employees").insertOne(doc);
  invalidateCache();
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
  invalidateCache();
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
  invalidateCache();
  return result ? toEmployee(result) : null;
}

export async function deleteEmployee(id: string): Promise<boolean> {
  const db = await getDb();
  const result = await db.collection("employees").deleteOne({ _id: new ObjectId(id) });
  invalidateCache();
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
