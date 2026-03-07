import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertLead, InsertUser, leads, users, adminUsers, InsertAdminUser } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ─── Lead helpers ────────────────────────────────────────────────────────────

export async function insertLead(lead: InsertLead): Promise<{ insertId: number }> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const [result] = await db.insert(leads).values(lead);
  return { insertId: (result as any).insertId ?? 0 };
}

export async function getAllLeads() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.select().from(leads).orderBy(desc(leads.createdAt));
}

export async function updateLeadStatus(id: number, status: "new" | "reviewed" | "contacted" | "closed") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(leads).set({ status }).where(eq(leads.id, id));
}

/**
 * Partial update for progressive lead capture.
 * Updates any subset of lead fields by ID.
 */
export async function updateLeadById(id: number, patch: Partial<InsertLead>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(leads).set({ ...patch, updatedAt: new Date() }).where(eq(leads.id, id));
}

// ─── Admin user helpers ───────────────────────────────────────────────────────

export async function getAdminUserByUsername(username: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.select().from(adminUsers).where(eq(adminUsers.username, username)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getAdminUserById(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.select().from(adminUsers).where(eq(adminUsers.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getAllAdminUsers() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.select({
    id: adminUsers.id,
    username: adminUsers.username,
    displayName: adminUsers.displayName,
    role: adminUsers.role,
    createdAt: adminUsers.createdAt,
  }).from(adminUsers).orderBy(desc(adminUsers.createdAt));
}

export async function createAdminUser(data: InsertAdminUser) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(adminUsers).values(data);
  // Fetch the newly created user so callers have the full record (including auto-generated id)
  const created = await db.select().from(adminUsers).where(eq(adminUsers.username, data.username)).limit(1);
  if (!created.length) throw new Error("Failed to retrieve created admin user");
  return created[0];
}

export async function deleteAdminUser(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(adminUsers).where(eq(adminUsers.id, id));
}

export async function updateAdminUserPassword(id: number, passwordHash: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(adminUsers).set({ passwordHash }).where(eq(adminUsers.id, id));
}

export async function countAdminUsers() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.select().from(adminUsers);
  return result.length;
}
