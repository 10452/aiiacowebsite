import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the db and notification modules
vi.mock("./db", () => ({
  insertLead: vi.fn().mockResolvedValue(undefined),
  getAllLeads: vi.fn().mockResolvedValue([]),
  updateLeadStatus: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

function createPublicCtx(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

function createAuthCtx(): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "owner-id",
      email: "owner@aiiaco.com",
      name: "Owner",
      loginMethod: "manus",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

describe("leads.submitCall", () => {
  it("accepts a valid call request and returns success", async () => {
    const caller = appRouter.createCaller(createPublicCtx());
    const result = await caller.leads.submitCall({ name: "Jane Smith", email: "jane@corp.com" });
    expect(result).toEqual({ success: true });
  });

  it("rejects an invalid email", async () => {
    const caller = appRouter.createCaller(createPublicCtx());
    await expect(caller.leads.submitCall({ name: "Jane", email: "not-an-email" })).rejects.toThrow();
  });
});

describe("leads.submitIntake", () => {
  it("accepts a full intake submission and returns success", async () => {
    const caller = appRouter.createCaller(createPublicCtx());
    const result = await caller.leads.submitIntake({
      name: "John Doe",
      email: "john@enterprise.com",
      company: "Acme Corp",
      industry: "Financial Services",
      engagementModel: "Full Integration",
      annualRevenue: "$25M – $100M",
      message: "We need to automate our underwriting pipeline.",
    });
    expect(result).toEqual({ success: true });
  });
});

describe("leads.list", () => {
  it("returns leads list for authenticated users", async () => {
    const caller = appRouter.createCaller(createAuthCtx());
    const result = await caller.leads.list();
    expect(Array.isArray(result)).toBe(true);
  });
});
