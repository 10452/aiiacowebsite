/**
 * Health Monitor — Vitest Tests
 *
 * Tests for the health monitoring system that checks every vital
 * in the AiiA diagnostic chain.
 */
import { describe, it, expect, vi, beforeEach } from "vitest";

// ─── Mock external dependencies ──────────────────────────────────────────────

// Mock the LLM module
vi.mock("./_core/llm", () => ({
  invokeLLM: vi.fn().mockResolvedValue({
    choices: [{ message: { content: "OK" } }],
  }),
}));

// Mock the notification module
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

// Mock the db module
vi.mock("./db", () => ({
  getDb: vi.fn().mockResolvedValue({
    execute: vi.fn().mockResolvedValue([{ health_check: 1 }]),
  }),
}));

// Mock the aiAgent module
vi.mock("./aiAgent", () => ({
  getAgent: vi.fn().mockResolvedValue({
    conversation_config: {
      agent: {
        prompt: {
          prompt: "A".repeat(5000), // Simulates a healthy prompt
        },
      },
    },
  }),
}));

// Mock fetch for ElevenLabs and Resend API calls
const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

// Set env vars for tests
process.env.ELEVENLABS_AGENT_ID = "test_agent_id";
process.env.ELEVENLABS_API_KEY = "test_api_key";
process.env.RESEND_API_KEY = "test_resend_key";
process.env.BUILT_IN_FORGE_API_URL = "https://forge.test.com";
process.env.BUILT_IN_FORGE_API_KEY = "test_forge_key";

import { runHealthCheck, quickHealthCheck, type HealthReport, type VitalStatus } from "./healthMonitor";

describe("Health Monitor", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Default mock: all external APIs return healthy
    mockFetch.mockImplementation((url: string, opts?: any) => {
      // ElevenLabs workspace settings
      if (url.includes("/convai/settings")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            webhooks: { post_call_webhook_id: "webhook_123" },
          }),
        });
      }
      // ElevenLabs webhook details
      if (url.includes("/workspace/webhooks/")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            webhook_id: "webhook_123",
            most_recent_failure: null,
          }),
        });
      }
      // Resend domains
      if (url.includes("resend.com/domains")) {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve({
            data: [{ name: "aiiaco.com", status: "verified" }],
          }),
        });
      }
      // Forge API health
      if (url.includes("forge.test.com")) {
        return Promise.resolve({ ok: true });
      }
      return Promise.resolve({ ok: true });
    });
  });

  describe("runHealthCheck", () => {
    it("returns a valid HealthReport structure", async () => {
      const report = await runHealthCheck();
      expect(report).toHaveProperty("overall");
      expect(report).toHaveProperty("score");
      expect(report).toHaveProperty("vitals");
      expect(report).toHaveProperty("checkedAt");
      expect(report).toHaveProperty("alertsSent");
      expect(Array.isArray(report.vitals)).toBe(true);
    });

    it("checks all 6 vitals in the diagnostic chain", async () => {
      const report = await runHealthCheck();
      expect(report.vitals.length).toBe(6);
      const names = report.vitals.map(v => v.name);
      expect(names).toContain("ElevenLabs Agent");
      expect(names).toContain("ElevenLabs Webhook");
      expect(names).toContain("Database");
      expect(names).toContain("Email Service (Resend)");
      expect(names).toContain("LLM (Intelligence Extraction)");
      expect(names).toContain("Owner Notifications");
    });

    it("returns healthy when all vitals are up", async () => {
      const report = await runHealthCheck();
      expect(report.overall).toBe("healthy");
      expect(report.score).toBe(100);
      expect(report.alertsSent).toBe(false);
    });

    it("each vital has required fields", async () => {
      const report = await runHealthCheck();
      for (const vital of report.vitals) {
        expect(vital).toHaveProperty("name");
        expect(vital).toHaveProperty("status");
        expect(vital).toHaveProperty("latencyMs");
        expect(vital).toHaveProperty("details");
        expect(vital).toHaveProperty("checkedAt");
        expect(typeof vital.latencyMs).toBe("number");
        expect(["healthy", "degraded", "down"]).toContain(vital.status);
      }
    });

    it("detects degraded webhook with recent failure", async () => {
      mockFetch.mockImplementation((url: string) => {
        if (url.includes("/convai/settings")) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
              webhooks: { post_call_webhook_id: "webhook_123" },
            }),
          });
        }
        if (url.includes("/workspace/webhooks/")) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
              webhook_id: "webhook_123",
              most_recent_failure: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
            }),
          });
        }
        if (url.includes("resend.com/domains")) {
          return Promise.resolve({
            ok: true, status: 200,
            json: () => Promise.resolve({ data: [{ name: "aiiaco.com", status: "verified" }] }),
          });
        }
        return Promise.resolve({ ok: true });
      });

      const report = await runHealthCheck();
      const webhook = report.vitals.find(v => v.name === "ElevenLabs Webhook");
      expect(webhook?.status).toBe("degraded");
      expect(webhook?.details).toContain("failure");
    });

    it("detects down webhook when not assigned", async () => {
      mockFetch.mockImplementation((url: string) => {
        if (url.includes("/convai/settings")) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
              webhooks: { post_call_webhook_id: null },
            }),
          });
        }
        if (url.includes("resend.com/domains")) {
          return Promise.resolve({
            ok: true, status: 200,
            json: () => Promise.resolve({ data: [{ name: "aiiaco.com", status: "verified" }] }),
          });
        }
        return Promise.resolve({ ok: true });
      });

      const report = await runHealthCheck();
      const webhook = report.vitals.find(v => v.name === "ElevenLabs Webhook");
      expect(webhook?.status).toBe("down");
      expect(report.overall).not.toBe("healthy");
    });

    it("sends owner alert when vitals are down", async () => {
      const { notifyOwner } = await import("./_core/notification");

      mockFetch.mockImplementation((url: string) => {
        if (url.includes("/convai/settings")) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
              webhooks: { post_call_webhook_id: null }, // webhook down
            }),
          });
        }
        if (url.includes("resend.com/domains")) {
          return Promise.resolve({
            ok: true, status: 200,
            json: () => Promise.resolve({ data: [{ name: "aiiaco.com", status: "verified" }] }),
          });
        }
        return Promise.resolve({ ok: true });
      });

      const report = await runHealthCheck();
      expect(report.alertsSent).toBe(true);
      expect(notifyOwner).toHaveBeenCalledWith(
        expect.objectContaining({
          title: expect.stringContaining("Health Alert"),
        })
      );
    });

    it("calculates weighted score correctly", async () => {
      const report = await runHealthCheck();
      // All healthy = 100
      expect(report.score).toBe(100);
      expect(report.score).toBeGreaterThanOrEqual(0);
      expect(report.score).toBeLessThanOrEqual(100);
    });
  });

  describe("quickHealthCheck", () => {
    it("returns status and score without full report", async () => {
      const result = await quickHealthCheck();
      expect(result).toHaveProperty("status");
      expect(result).toHaveProperty("score");
      expect(["healthy", "degraded", "down"]).toContain(result.status);
      expect(typeof result.score).toBe("number");
    });
  });

  describe("Resend email check", () => {
    it("detects invalid Resend API key", async () => {
      mockFetch.mockImplementation((url: string) => {
        if (url.includes("resend.com/domains")) {
          return Promise.resolve({ ok: false, status: 401 });
        }
        if (url.includes("/convai/settings")) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ webhooks: { post_call_webhook_id: "wh_123" } }),
          });
        }
        if (url.includes("/workspace/webhooks/")) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ webhook_id: "wh_123", most_recent_failure: null }),
          });
        }
        return Promise.resolve({ ok: true });
      });

      const report = await runHealthCheck();
      const email = report.vitals.find(v => v.name === "Email Service (Resend)");
      expect(email?.status).toBe("down");
      expect(email?.details).toContain("invalid");
    });

    it("detects no verified domains as degraded", async () => {
      mockFetch.mockImplementation((url: string) => {
        if (url.includes("resend.com/domains")) {
          return Promise.resolve({
            ok: true, status: 200,
            json: () => Promise.resolve({ data: [{ name: "test.com", status: "pending" }] }),
          });
        }
        if (url.includes("/convai/settings")) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ webhooks: { post_call_webhook_id: "wh_123" } }),
          });
        }
        if (url.includes("/workspace/webhooks/")) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ webhook_id: "wh_123", most_recent_failure: null }),
          });
        }
        return Promise.resolve({ ok: true });
      });

      const report = await runHealthCheck();
      const email = report.vitals.find(v => v.name === "Email Service (Resend)");
      expect(email?.status).toBe("degraded");
      expect(email?.details).toContain("no verified domains");
    });
  });
});
