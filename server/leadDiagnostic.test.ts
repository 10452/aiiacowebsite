import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock dependencies before importing the module under test
vi.mock("./_core/llm", () => ({
  invokeLLM: vi.fn().mockResolvedValue({
    choices: [
      {
        message: {
          content:
            "CORE OPERATIONAL PROBLEM\nTest diagnostic content.\n\nNEXT STEPS FOR SALES CALL\n1. Step one\n2. Step two\n3. Step three",
        },
      },
    ],
  }),
}));

vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

import { generateAndSendLeadDiagnostic } from "./leadDiagnostic";
import { invokeLLM } from "./_core/llm";
import { notifyOwner } from "./_core/notification";

const mockLead = {
  id: 1,
  type: "intake" as const,
  name: "Maria L Castronovo",
  email: "test@example.com",
  company: "Alliedbestsellers",
  phone: "5149099983",
  industry: null,
  engagementModel: null,
  annualRevenue: null,
  message: null,
  investmentType: null,
  budgetRange: null,
  problemCategory: "We're growing but can't scale without adding headcount",
  problemDetail: null,
  callPreference: "afternoon",
  leadSource: "Navbar — Request Upgrade",
  status: "new" as const,
  createdAt: new Date("2026-03-08T02:04:44.000Z"),
  updatedAt: new Date("2026-03-08T02:04:44.000Z"),
};

describe("generateAndSendLeadDiagnostic", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls invokeLLM with the lead's problem category and company name", async () => {
    await generateAndSendLeadDiagnostic(mockLead);
    expect(invokeLLM).toHaveBeenCalledOnce();
    const callArgs = vi.mocked(invokeLLM).mock.calls[0][0];
    const userMessage = callArgs.messages.find((m: any) => m.role === "user");
    expect(userMessage?.content).toContain("Maria L Castronovo");
    expect(userMessage?.content).toContain("We're growing but can't scale without adding headcount");
    expect(userMessage?.content).toContain("Alliedbestsellers");
  });

  it("maps the problem category to the correct AiiACo pillar", async () => {
    await generateAndSendLeadDiagnostic(mockLead);
    const callArgs = vi.mocked(invokeLLM).mock.calls[0][0];
    const userMessage = callArgs.messages.find((m: any) => m.role === "user");
    expect(userMessage?.content).toContain("AI Revenue Engine + Operational AI Systems");
    expect(userMessage?.content).toContain("Critical");
  });

  it("sends a notification with the lead name and diagnostic content", async () => {
    await generateAndSendLeadDiagnostic(mockLead);
    expect(notifyOwner).toHaveBeenCalledOnce();
    const notifArgs = vi.mocked(notifyOwner).mock.calls[0][0];
    expect(notifArgs.title).toContain("Maria L Castronovo");
    expect(notifArgs.content).toContain("AI DIAGNOSTIC");
    expect(notifArgs.content).toContain("test@example.com");
  });

  it("includes call preference label in the notification", async () => {
    await generateAndSendLeadDiagnostic(mockLead);
    const notifArgs = vi.mocked(notifyOwner).mock.calls[0][0];
    expect(notifArgs.title).toContain("Afternoon");
    expect(notifArgs.content).toContain("Afternoon (Weekdays 12pm – 5pm)");
  });

  it("handles unknown problem categories gracefully", async () => {
    const unknownLead = { ...mockLead, problemCategory: "Something completely new" };
    await expect(generateAndSendLeadDiagnostic(unknownLead)).resolves.not.toThrow();
    const callArgs = vi.mocked(invokeLLM).mock.calls[0][0];
    const userMessage = callArgs.messages.find((m: any) => m.role === "user");
    expect(userMessage?.content).toContain("Full Diagnostic Required");
  });

  it("still sends notification even if LLM fails", async () => {
    vi.mocked(invokeLLM).mockRejectedValueOnce(new Error("LLM timeout"));
    await generateAndSendLeadDiagnostic(mockLead);
    expect(notifyOwner).toHaveBeenCalledOnce();
    const notifArgs = vi.mocked(notifyOwner).mock.calls[0][0];
    expect(notifArgs.content).toContain("Diagnostic generation failed");
  });
});
