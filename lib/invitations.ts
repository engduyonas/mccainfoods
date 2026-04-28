import { randomBytes } from "crypto";
import { getDb, getMongoClient } from "@/lib/mongodb";
import type { ValidatedApplicationInput } from "@/lib/applicationValidation";
import { invalidateEmployeesCache } from "@/lib/store";

const INVITES = "apply_invitations";
const EMPLOYEES = "employees";

export async function createApplyInvitation(): Promise<{ token: string; createdAt: string }> {
  const db = await getDb();
  const token = randomBytes(24).toString("base64url");
  const createdAt = new Date().toISOString();
  await db.collection(INVITES).insertOne({ token, createdAt });
  return { token, createdAt };
}

export async function findApplyInvitation(
  token: string
): Promise<{ token: string; createdAt: string } | null> {
  const db = await getDb();
  const doc = await db
    .collection<{ token: string; createdAt: string }>(INVITES)
    .findOne({ token });
  return doc;
}

function employeeDoc(value: ValidatedApplicationInput) {
  return {
    fullName: value.fullName,
    phoneNumber: value.phoneNumber,
    passportNumber: value.passportNumber,
    gender: value.gender,
    photograph: value.photograph,
    age: value.age,
    status: "submitted",
    createdAt: new Date().toISOString(),
  };
}

class InviteInvalidError extends Error {
  constructor() {
    super("INVITE_INVALID");
    this.name = "InviteInvalidError";
  }
}

function isInviteInvalidError(e: unknown): boolean {
  return e instanceof InviteInvalidError;
}

function isTransactionUnsupportedError(e: unknown): boolean {
  const msg = e instanceof Error ? e.message : String(e);
  return /Transaction numbers are only allowed|replica set|mongos|Multi-document transactions are not supported|storage engine does not support transactions/i.test(
    msg
  );
}

async function consumeWithTransaction(
  token: string,
  value: ValidatedApplicationInput
): Promise<void> {
  const client = await getMongoClient();
  const db = client.db();
  const session = client.startSession();
  try {
    await session.withTransaction(async () => {
      const removed = await db
        .collection(INVITES)
        .findOneAndDelete({ token }, { session });
      if (!removed) {
        throw new InviteInvalidError();
      }
      await db.collection(EMPLOYEES).insertOne(employeeDoc(value), { session });
    });
  } finally {
    await session.endSession();
  }
}

async function consumeWithoutTransaction(
  token: string,
  value: ValidatedApplicationInput
): Promise<"ok" | "invalid_invite" | "insert_failed"> {
  const client = await getMongoClient();
  const db = client.db();
  const removed = await db.collection(INVITES).findOneAndDelete({ token });
  if (!removed) return "invalid_invite";
  try {
    await db.collection(EMPLOYEES).insertOne(employeeDoc(value));
    return "ok";
  } catch {
    await db.collection(INVITES).insertOne({
      token: removed.token as string,
      createdAt: removed.createdAt as string,
    });
    return "insert_failed";
  }
}

/**
 * Consumes the invite and inserts the applicant (status `submitted`).
 */
export async function consumeInviteAndCreateApplicant(
  token: string,
  value: ValidatedApplicationInput
): Promise<
  | { ok: true }
  | { ok: false; reason: "invalid_invite" }
  | { ok: false; reason: "persist_failed" }
> {
  try {
    await consumeWithTransaction(token, value);
    invalidateEmployeesCache();
    return { ok: true };
  } catch (e: unknown) {
    if (isInviteInvalidError(e)) {
      return { ok: false, reason: "invalid_invite" };
    }
    if (isTransactionUnsupportedError(e)) {
      const fb = await consumeWithoutTransaction(token, value);
      if (fb === "ok") {
        invalidateEmployeesCache();
        return { ok: true };
      }
      if (fb === "invalid_invite") {
        return { ok: false, reason: "invalid_invite" };
      }
      return { ok: false, reason: "persist_failed" };
    }
    console.error("consumeInviteAndCreateApplicant", e);
    return { ok: false, reason: "persist_failed" };
  }
}
