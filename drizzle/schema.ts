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
  /** Full call transcript from ElevenLabs post-call webhook */
  callTranscript: text("callTranscript"),
  /** Structured transcript JSON: Array<{role: 'agent'|'user', message: string, time_in_call_secs?: number}> */
  structuredTranscript: text("structuredTranscript"),
  /** Detected call track: operator | agent | corporate */
  callTrack: varchar("callTrack", { length: 32 }),
  /** AI-extracted pain points from voice conversation */
  painPoints: text("painPoints"),
  /** AI-extracted wants/wishes from voice conversation */
  wants: text("wants"),
  /** AI-extracted current solutions/attempts from voice conversation */
  currentSolutions: text("currentSolutions"),
  /** AI-generated conversation summary */
  conversationSummary: text("conversationSummary"),
  /** Duration of the voice call in seconds */
  callDurationSeconds: int("callDurationSeconds"),
  /** ElevenLabs conversation ID */
  conversationId: varchar("conversationId", { length: 128 }),
  /** Email delivery status: pending (not sent yet), sent, failed, not_applicable (no email on file) */
  emailStatus: mysqlEnum("emailStatus", ["pending", "sent", "failed", "not_applicable"]).default("pending").notNull(),
  /** Timestamp of last email send attempt */
  emailSentAt: timestamp("emailSentAt"),
  status: mysqlEnum("status", ["new", "diagnostic_ready", "reviewed", "contacted", "closed", "incomplete", "abandoned"]).default("new").notNull(),
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

/**
 * Knowledge base entries — AiiA's knowledge that gets pushed to the ElevenLabs agent prompt.
 * Each entry is a named piece of knowledge (e.g., "Agent Package Details", "Company Overview").
 * source: where the knowledge came from (document, website, conversation, manual)
 * category: organizational grouping (packages, company, processes, faq)
 */
export const knowledgeBase = mysqlTable("knowledge_base", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  category: mysqlEnum("category", ["packages", "company", "processes", "faq", "other"]).default("other").notNull(),
  source: mysqlEnum("source", ["document", "website", "conversation", "manual"]).default("manual").notNull(),
  sourceFile: varchar("sourceFile", { length: 512 }),
  isActive: int("isActive").default(1).notNull(),
  lastPushedAt: timestamp("lastPushedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type KnowledgeEntry = typeof knowledgeBase.$inferSelect;
export type InsertKnowledgeEntry = typeof knowledgeBase.$inferInsert;

/**
 * Email events table — tracks Resend webhook events (delivered, opened, clicked, bounced).
 * Each row is a single event. A single email can generate multiple events
 * (e.g. delivered → opened → clicked → clicked again).
 * leadId links back to the leads table for per-lead email engagement tracking.
 */
export const emailEvents = mysqlTable("email_events", {
  id: int("id").autoincrement().primaryKey(),
  /** Resend email ID — links all events for one email send */
  emailId: varchar("emailId", { length: 128 }).notNull(),
  /** Event type from Resend: email.sent, email.delivered, email.opened, email.clicked, email.bounced, email.complained */
  eventType: varchar("eventType", { length: 64 }).notNull(),
  /** Recipient email address */
  recipientEmail: varchar("recipientEmail", { length: 320 }).notNull(),
  /** FK to leads table (resolved via tags or recipient email lookup) */
  leadId: int("leadId"),
  /** Email subject line */
  subject: varchar("subject", { length: 512 }),
  /** For click events: the URL that was clicked */
  clickedLink: text("clickedLink"),
  /** For click events: user agent string */
  clickUserAgent: text("clickUserAgent"),
  /** For click events: IP address */
  clickIpAddress: varchar("clickIpAddress", { length: 64 }),
  /** Timestamp from Resend when the event occurred */
  eventTimestamp: timestamp("eventTimestamp"),
  /** Raw JSON payload from Resend (for debugging) */
  rawPayload: text("rawPayload"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type EmailEvent = typeof emailEvents.$inferSelect;
export type InsertEmailEvent = typeof emailEvents.$inferInsert;
