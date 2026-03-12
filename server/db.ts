import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertLead, InsertUser, leads, users, adminUsers, InsertAdminUser, knowledgeBase, InsertKnowledgeEntry } from "../drizzle/schema";
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

export async function getLeadById(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.select().from(leads).where(eq(leads.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

/**
 * Find the most recent lead by email address.
 * Used by the Calendly webhook to match an invitee to a lead.
 */
export async function getLeadByEmail(email: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.select().from(leads).where(eq(leads.email, email)).orderBy(desc(leads.createdAt)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateLeadStatus(id: number, status: "new" | "diagnostic_ready" | "reviewed" | "contacted" | "closed") {
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

// ─── Knowledge Base helpers ─────────────────────────────────────────────────

export async function getAllKnowledgeEntries() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.select().from(knowledgeBase).orderBy(desc(knowledgeBase.updatedAt));
}

export async function getActiveKnowledgeEntries() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.select().from(knowledgeBase).where(eq(knowledgeBase.isActive, 1)).orderBy(desc(knowledgeBase.updatedAt));
}

export async function getKnowledgeEntryById(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.select().from(knowledgeBase).where(eq(knowledgeBase.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function insertKnowledgeEntry(entry: InsertKnowledgeEntry): Promise<{ insertId: number }> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const [result] = await db.insert(knowledgeBase).values(entry);
  return { insertId: (result as any).insertId ?? 0 };
}

export async function updateKnowledgeEntry(id: number, patch: Partial<InsertKnowledgeEntry>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(knowledgeBase).set({ ...patch }).where(eq(knowledgeBase.id, id));
}

export async function deleteKnowledgeEntry(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(knowledgeBase).where(eq(knowledgeBase.id, id));
}

export async function markKnowledgePushed(ids: number[]) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  for (const id of ids) {
    await db.update(knowledgeBase).set({ lastPushedAt: new Date() }).where(eq(knowledgeBase.id, id));
  }
}

// ─── Analytics helpers ──────────────────────────────────────────────────────

export interface AnalyticsOverview {
  totalLeads: number;
  totalVoiceCalls: number;
  avgCallDurationSeconds: number;
  callsToday: number;
  callsThisWeek: number;
  callsThisMonth: number;
  conversionRate: number; // % of leads that reached contacted/closed
  byStatus: Record<string, number>;
  byTrack: Record<string, number>;
  byType: Record<string, number>;
}

export interface DailyCallVolume {
  date: string; // YYYY-MM-DD
  count: number;
  avgDuration: number;
}

export async function getAnalyticsOverview(): Promise<AnalyticsOverview> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const allLeads = await db.select().from(leads).orderBy(desc(leads.createdAt));

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekStart = new Date(todayStart);
  weekStart.setDate(weekStart.getDate() - weekStart.getDay());
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const voiceCalls = allLeads.filter(l => l.callTranscript || l.conversationId);
  const durations = voiceCalls.map(l => l.callDurationSeconds ?? 0).filter(d => d > 0);
  const avgDuration = durations.length > 0 ? durations.reduce((a, b) => a + b, 0) / durations.length : 0;

  const callsToday = voiceCalls.filter(l => l.createdAt >= todayStart).length;
  const callsThisWeek = voiceCalls.filter(l => l.createdAt >= weekStart).length;
  const callsThisMonth = voiceCalls.filter(l => l.createdAt >= monthStart).length;

  const contacted = allLeads.filter(l => l.status === "contacted" || l.status === "closed").length;
  const conversionRate = allLeads.length > 0 ? (contacted / allLeads.length) * 100 : 0;

  const byStatus: Record<string, number> = {};
  const byTrack: Record<string, number> = {};
  const byType: Record<string, number> = {};

  for (const lead of allLeads) {
    byStatus[lead.status] = (byStatus[lead.status] ?? 0) + 1;
    const track = lead.callTrack ?? "untracked";
    byTrack[track] = (byTrack[track] ?? 0) + 1;
    byType[lead.type] = (byType[lead.type] ?? 0) + 1;
  }

  return {
    totalLeads: allLeads.length,
    totalVoiceCalls: voiceCalls.length,
    avgCallDurationSeconds: Math.round(avgDuration),
    callsToday,
    callsThisWeek,
    callsThisMonth,
    conversionRate: Math.round(conversionRate * 10) / 10,
    byStatus,
    byTrack,
    byType,
  };
}

export async function getDailyCallVolume(days: number = 30): Promise<DailyCallVolume[]> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const allLeads = await db.select().from(leads).orderBy(desc(leads.createdAt));
  const voiceCalls = allLeads.filter(l => l.callTranscript || l.conversationId);

  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);

  // Group by date
  const byDate: Record<string, { count: number; totalDuration: number }> = {};

  // Pre-fill all dates in range
  for (let i = 0; i < days; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    byDate[key] = { count: 0, totalDuration: 0 };
  }

  for (const call of voiceCalls) {
    if (call.createdAt < cutoff) continue;
    const key = call.createdAt.toISOString().slice(0, 10);
    if (!byDate[key]) byDate[key] = { count: 0, totalDuration: 0 };
    byDate[key].count++;
    byDate[key].totalDuration += call.callDurationSeconds ?? 0;
  }

  return Object.entries(byDate)
    .map(([date, data]) => ({
      date,
      count: data.count,
      avgDuration: data.count > 0 ? Math.round(data.totalDuration / data.count) : 0,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

export async function getRecentCalls(limit: number = 10) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const allLeads = await db.select({
    id: leads.id,
    name: leads.name,
    email: leads.email,
    company: leads.company,
    callTrack: leads.callTrack,
    callDurationSeconds: leads.callDurationSeconds,
    status: leads.status,
    conversationSummary: leads.conversationSummary,
    createdAt: leads.createdAt,
  }).from(leads).orderBy(desc(leads.createdAt));

  // Filter to voice calls and limit
  return allLeads
    .filter(l => l.callDurationSeconds != null && l.callDurationSeconds > 0)
    .slice(0, limit);
}
