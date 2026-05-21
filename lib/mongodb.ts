import { MongoClient, Db } from "mongodb";

const CLIENT_OPTIONS = {
  maxPoolSize: 1,
  minPoolSize: 0,
  serverSelectionTimeoutMS: 10_000,
  connectTimeoutMS: 10_000,
  socketTimeoutMS: 20_000,
};

let indexesEnsured = false;

async function ensureIndexes(db: Db): Promise<void> {
  if (indexesEnsured) return;
  try {
    const col = db.collection("employees");
    await Promise.all([
      col.createIndex({ status: 1 }),
      col.createIndex({ createdAt: -1 }),
      col.createIndex({ status: 1, createdAt: -1 }),
    ]);
  } catch {
    // Indexes may already exist.
  }
  indexesEnsured = true;
}

export function isMongoConfigured(): boolean {
  return Boolean(process.env.MONGODB_URI);
}

function requireUri(): string {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI environment variable is not set");
  }
  return uri;
}

/** Open a Mongo client for one request, then close it (required on Cloudflare Workers). */
export async function withClient<T>(operation: (client: MongoClient) => Promise<T>): Promise<T> {
  const client = new MongoClient(requireUri(), CLIENT_OPTIONS);
  try {
    await client.connect();
    return await operation(client);
  } finally {
    await client.close().catch(() => {});
  }
}

export async function withDb<T>(operation: (db: Db) => Promise<T>): Promise<T> {
  return withClient(async (client) => {
    const db = client.db();
    await ensureIndexes(db);
    return operation(db);
  });
}
