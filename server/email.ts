/**
 * AiiACo Transactional Email — Resend
 *
 * Sends a professional thank-you confirmation to the lead after they complete
 * the intake form. The email confirms their request was received, tells them
 * they will receive a call to discuss their personalised diagnostic, and
 * provides the call preference they selected.
 *
 * The AI diagnostic itself is NEVER included in this email — it is sent
 * exclusively to the owner via the Manus notification system.
 */

import { Resend } from "resend";

const CALL_PREF_LABELS: Record<string, string> = {
  morning: "Morning — Weekdays 8am to 12pm",
  afternoon: "Afternoon — Weekdays 12pm to 5pm",
  weekdays: "Any weekday — morning or afternoon",
  anytime: "Anytime — flexible",
  "Calendly booking": "A specific time slot via Calendly",
};

function getResend(): Resend {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not configured");
  return new Resend(key);
}

export async function sendLeadConfirmationEmail(params: {
  name: string;
  email: string;
  company?: string | null;
  callPreference?: string | null;
}): Promise<boolean> {
  const { name, email, company, callPreference } = params;

  const firstName = name.split(" ")[0] ?? name;
  const callLabel =
    CALL_PREF_LABELS[callPreference ?? ""] ??
    callPreference ??
    "a time that works for you";

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your Request — AiiACo</title>
  <style>
    body {
      margin: 0; padding: 0;
      background-color: #03050A;
      font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif;
      color: #C8D7E6;
    }
    .wrapper {
      max-width: 600px;
      margin: 0 auto;
      padding: 48px 24px;
    }
    .logo {
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.18em;
      color: rgba(184,156,74,0.90);
      text-transform: uppercase;
      margin-bottom: 40px;
    }
    .divider-gold {
      width: 48px;
      height: 1px;
      background: linear-gradient(90deg, rgba(184,156,74,0.80), rgba(184,156,74,0.20));
      margin-bottom: 32px;
    }
    h1 {
      font-size: 26px;
      font-weight: 600;
      color: #F0F4F8;
      margin: 0 0 16px 0;
      line-height: 1.3;
    }
    p {
      font-size: 15px;
      line-height: 1.7;
      color: rgba(200,215,230,0.80);
      margin: 0 0 20px 0;
    }
    .callout {
      background: rgba(184,156,74,0.06);
      border-left: 2px solid rgba(184,156,74,0.50);
      border-radius: 4px;
      padding: 18px 20px;
      margin: 28px 0;
    }
    .callout-label {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.14em;
      color: rgba(184,156,74,0.70);
      text-transform: uppercase;
      margin-bottom: 6px;
    }
    .callout-value {
      font-size: 15px;
      color: rgba(240,192,80,0.90);
      font-weight: 500;
    }
    .footer {
      margin-top: 48px;
      padding-top: 24px;
      border-top: 1px solid rgba(255,255,255,0.06);
      font-size: 12px;
      color: rgba(200,215,230,0.35);
      line-height: 1.6;
    }
    a { color: rgba(184,156,74,0.80); text-decoration: none; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="logo">AiiACo</div>
    <div class="divider-gold"></div>

    <h1>We've received your request, ${firstName}.</h1>

    <p>
      Thank you for taking the time to walk us through your situation.
      Based on your answers, we've prepared a personalised operational diagnostic
      for your business${company ? ` at ${company}` : ""}.
    </p>

    <p>
      One of our team will be in touch to walk you through the findings and
      discuss what a targeted AI integration could look like for your specific
      situation.
    </p>

    <div class="callout">
      <div class="callout-label">Your preferred call time</div>
      <div class="callout-value">${callLabel}</div>
    </div>

    <p>
      We will do our best to reach you within that window. If you need to
      adjust your availability or have an urgent question in the meantime,
      reply directly to this email.
    </p>

    <p style="color: rgba(200,215,230,0.55); font-size: 14px;">
      — The AiiACo Team
    </p>

    <div class="footer">
      <p style="margin:0;">
        AiiACo &nbsp;·&nbsp; AI Integration Authority for the Corporate Age<br />
        <a href="https://aiiaco.com">aiiaco.com</a>
      </p>
      <p style="margin: 8px 0 0 0;">
        You received this email because you submitted a request on aiiaco.com.
      </p>
    </div>
  </div>
</body>
</html>`;

  const text = `AiiACo — We've received your request, ${firstName}.

Thank you for taking the time to walk us through your situation. Based on your answers, we've prepared a personalised operational diagnostic for your business${company ? ` at ${company}` : ""}.

One of our team will be in touch to walk you through the findings and discuss what a targeted AI integration could look like for your specific situation.

Your preferred call time: ${callLabel}

We will do our best to reach you within that window. If you need to adjust your availability or have an urgent question in the meantime, reply directly to this email.

— The AiiACo Team
aiiaco.com`;

  try {
    const resend = getResend();
    const result = await resend.emails.send({
      from: "AiiACo <onboarding@resend.dev>",
      to: [email],
      subject: `Your AiiACo diagnostic is being prepared, ${firstName}`,
      html,
      text,
    });

    if (result.error) {
      console.error("[Email] Resend error:", result.error);
      return false;
    }

    console.log("[Email] Confirmation sent to:", email, "| id:", result.data?.id);
    return true;
  } catch (err) {
    console.error("[Email] Failed to send confirmation:", err);
    return false;
  }
}
