import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock Resend before importing the module under test
vi.mock("resend", () => {
  const mockSend = vi.fn().mockResolvedValue({
    data: { id: "test-email-id-123" },
    error: null,
  });
  return {
    Resend: vi.fn().mockImplementation(() => ({
      emails: { send: mockSend },
    })),
  };
});

import { sendLeadConfirmationEmail } from "./email";
import { Resend } from "resend";

describe("sendLeadConfirmationEmail", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.RESEND_API_KEY = "re_test_key";
  });

  it("sends an email to the lead's address", async () => {
    const result = await sendLeadConfirmationEmail({
      name: "Maria L Castronovo",
      email: "alliedbestsellers@gmail.com",
      company: "Alliedbestsellers",
      callPreference: "afternoon",
    });

    expect(result).toBe(true);
    const resendInstance = vi.mocked(Resend).mock.results[0].value;
    expect(resendInstance.emails.send).toHaveBeenCalledOnce();
    const callArgs = resendInstance.emails.send.mock.calls[0][0];
    expect(callArgs.to).toContain("alliedbestsellers@gmail.com");
  });

  it("uses the lead's first name in the subject line", async () => {
    await sendLeadConfirmationEmail({
      name: "Maria L Castronovo",
      email: "alliedbestsellers@gmail.com",
      callPreference: "afternoon",
    });
    const resendInstance = vi.mocked(Resend).mock.results[0].value;
    const callArgs = resendInstance.emails.send.mock.calls[0][0];
    expect(callArgs.subject).toContain("Maria");
  });

  it("includes the human-readable call preference label in the email body", async () => {
    await sendLeadConfirmationEmail({
      name: "Maria L Castronovo",
      email: "alliedbestsellers@gmail.com",
      callPreference: "afternoon",
    });
    const resendInstance = vi.mocked(Resend).mock.results[0].value;
    const callArgs = resendInstance.emails.send.mock.calls[0][0];
    expect(callArgs.html).toContain("Afternoon — Weekdays 12pm to 5pm");
    expect(callArgs.text).toContain("Afternoon — Weekdays 12pm to 5pm");
  });

  it("does NOT include any diagnostic content in the email", async () => {
    await sendLeadConfirmationEmail({
      name: "Maria L Castronovo",
      email: "alliedbestsellers@gmail.com",
      callPreference: "afternoon",
    });
    const resendInstance = vi.mocked(Resend).mock.results[0].value;
    const callArgs = resendInstance.emails.send.mock.calls[0][0];
    // Ensure no diagnostic keywords appear in the lead email
    expect(callArgs.html).not.toContain("CORE OPERATIONAL PROBLEM");
    expect(callArgs.html).not.toContain("MAPPED AIIACO PILLAR");
    expect(callArgs.html).not.toContain("NEXT STEPS FOR SALES CALL");
    expect(callArgs.text).not.toContain("CORE OPERATIONAL PROBLEM");
  });

  it("returns false and does not throw when Resend returns an error", async () => {
    const resendInstance = vi.mocked(Resend).mock.results[0]?.value;
    // Re-mock for this test
    const { Resend: ResendMock } = await import("resend");
    vi.mocked(ResendMock).mockImplementationOnce(() => ({
      emails: {
        send: vi.fn().mockResolvedValue({ data: null, error: { message: "Invalid API key" } }),
      },
    }));

    const result = await sendLeadConfirmationEmail({
      name: "Test User",
      email: "test@example.com",
      callPreference: "morning",
    });
    expect(result).toBe(false);
  });

  it("returns false gracefully when RESEND_API_KEY is missing", async () => {
    delete process.env.RESEND_API_KEY;
    const result = await sendLeadConfirmationEmail({
      name: "Test User",
      email: "test@example.com",
    });
    expect(result).toBe(false);
  });
});
