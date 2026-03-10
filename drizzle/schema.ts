import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Leads table — captures both Executive Call Requests and Structured Intake submissions.
 * type: "call" = fast path (name + email only)
 * type: "intake" = structured intake (full form)
 */
export const leads = mysqlTable("leads", {
  id: int("id").autoincrement().primaryKey(),
  type: mysqlEnum("type", ["call", "intake"]).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  company: varchar("company", { length: 255 }),
  phone: varchar("phone", { length: 64 }),
  industry: varchar("industry", { length: 128 }),
  engagementModel: varchar("engagementModel", { length: 128 }),
  annualRevenue: varchar("annualRevenue", { length: 64 }),
  message: text("message"),
  investmentType: varchar("investmentType", { length: 64 }),
  budgetRange: varchar("budgetRange", { length: 64 }),
  problemCategory: varchar("problemCategory", { length: 255 }),
  problemDetail: text("problemDetail"),
  callPreference: varchar("callPreference", { length: 128 }),
  leadSource: varchar("leadSource", { length: 128 }),
  /** AI-generated full diagnostic (owner-only, stored for admin panel display) */
  diagnosticSnapshot: text("diagnosticSnapshot"),
  /** AI-generated lead-facing brief (stored for reference) */
  leadBrief: text("leadBrief"),
  /** Admin-only internal notes (call outcomes, follow-up dates, context) */
  adminNotes: text("adminNotes"),
  status: mysqlEnum("status", ["new", "diagnostic_ready", "reviewed", "contacted", "closed"]).default("new").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Lead = typeof leads.$inferSelect;
export type InsertLead = typeof leads.$inferInsert;

/**
 * Admin users table — dedicated username/password auth for the admin console.
 * Separate from Manus OAuth users. Passwords stored as bcrypt hashes.
 * role "owner" = can create/delete other admins; role "admin" = leads access only.
 */
export const adminUsers = mysqlTable("admin_users", {
  id: int("id").autoincrement().primaryKey(),
  username: varchar("username", { length: 64 }).notNull().unique(),
  passwordHash: varchar("passwordHash", { length: 255 }).notNull(),
  displayName: varchar("displayName", { length: 128 }),
  role: mysqlEnum("adminRole", ["owner", "admin"]).default("admin").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AdminUser = typeof adminUsers.$inferSelect;
export type InsertAdminUser = typeof adminUsers.$inferInsert;
