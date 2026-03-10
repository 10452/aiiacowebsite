/**
 * Admin — AI Agent Configuration
 *
 * Lets the admin view and edit the AiiA Diagnostic Agent's system prompt
 * and first message. Also shows how to create the agent in ElevenLabs
 * if it hasn't been set up yet.
 */
import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Loader2, Bot, CheckCircle2, AlertCircle, RefreshCw, Phone } from "lucide-react";

const FF = "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";

export default function AdminAgentPage() {
  const { data: config, isLoading, refetch } = trpc.agent.getConfig.useQuery();

  const [systemPrompt, setSystemPrompt] = useState("");
  const [firstMessage, setFirstMessage] = useState("");
  const [isDirty, setIsDirty] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState(
    typeof window !== "undefined" ? `${window.location.origin}/api/webhooks/elevenlabs` : ""
  );

  useEffect(() => {
    if (config) {
      setSystemPrompt(config.systemPrompt);
      setFirstMessage(config.firstMessage);
      setIsDirty(false);
    }
  }, [config]);

  const updateMutation = trpc.agent.updateConfig.useMutation({
    onSuccess: () => {
      toast.success("Agent updated — system prompt saved to ElevenLabs.");
      setIsDirty(false);
      refetch();
    },
    onError: (err) => {
      toast.error(`Update failed: ${err.message}`);
    },
  });

  const createMutation = trpc.agent.createAgent.useMutation({
    onSuccess: (data) => {
      toast.success(`Agent created! ID: ${data.agentId} — add as ELEVENLABS_AGENT_ID in Secrets.`, { duration: 15000 });
      refetch();
    },
    onError: (err) => {
      toast.error(`Create failed: ${err.message}`);
    },
  });

  const handleSave = () => {
    if (!systemPrompt.trim() || !firstMessage.trim()) return;
    updateMutation.mutate({ systemPrompt, firstMessage });
  };

  const handleCreate = () => {
    if (!webhookUrl.trim()) return;
    createMutation.mutate({ webhookUrl });
  };

  if (isLoading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "300px" }}>
        <Loader2 className="animate-spin" size={28} style={{ color: "#B89C4A" }} />
      </div>
    );
  }

  const isLive = config?.isLive ?? false;
  const agentId = config?.agentId;

  return (
    <div style={{ fontFamily: FF, maxWidth: "900px", margin: "0 auto", padding: "32px 24px" }}>
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
          <Bot size={24} style={{ color: "#B89C4A" }} />
          <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#F0F4F8", margin: 0 }}>
            AiiA Diagnostic Agent
          </h1>
          <span style={{
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.10em",
            textTransform: "uppercase",
            color: isLive ? "#4ade80" : "#f87171",
            background: isLive ? "rgba(74,222,128,0.10)" : "rgba(248,113,113,0.10)",
            border: `1px solid ${isLive ? "rgba(74,222,128,0.25)" : "rgba(248,113,113,0.25)"}`,
            borderRadius: "20px",
            padding: "3px 10px",
          }}>
            {isLive ? "● Live" : "○ Not configured"}
          </span>
        </div>
        <p style={{ fontSize: "14px", color: "rgba(200,215,230,0.55)", margin: 0 }}>
          This agent answers calls to <strong style={{ color: "#D4A843" }}>+1 (888) 808-0001</strong>, runs a 4-question diagnostic, and routes callers to the Operator, Agent, or Corporate track.
        </p>
      </div>

      {/* Status panel */}
      <div style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${isLive ? "rgba(74,222,128,0.18)" : "rgba(248,113,113,0.18)"}`,
        borderRadius: "12px",
        padding: "20px 24px",
        marginBottom: "28px",
        display: "flex",
        alignItems: "flex-start",
        gap: "14px",
      }}>
        {isLive
          ? <CheckCircle2 size={20} style={{ color: "#4ade80", flexShrink: 0, marginTop: "1px" }} />
          : <AlertCircle size={20} style={{ color: "#f87171", flexShrink: 0, marginTop: "1px" }} />
        }
        <div>
          {isLive ? (
            <>
              <p style={{ fontSize: "14px", fontWeight: 600, color: "#F0F4F8", margin: "0 0 4px" }}>
                Agent is live in ElevenLabs
              </p>
              <p style={{ fontSize: "13px", color: "rgba(200,215,230,0.55)", margin: 0 }}>
                Agent ID: <code style={{ background: "rgba(255,255,255,0.06)", padding: "2px 6px", borderRadius: "4px", fontSize: "12px" }}>{agentId}</code>
                {" "}&middot; Post-call webhook: <code style={{ background: "rgba(255,255,255,0.06)", padding: "2px 6px", borderRadius: "4px", fontSize: "12px" }}>/api/webhooks/elevenlabs</code>
              </p>
            </>
          ) : (
            <>
              <p style={{ fontSize: "14px", fontWeight: 600, color: "#F0F4F8", margin: "0 0 4px" }}>
                Agent not yet created in ElevenLabs
              </p>
              <p style={{ fontSize: "13px", color: "rgba(200,215,230,0.55)", margin: "0 0 16px" }}>
                Click "Create Agent" below to provision the agent in your ElevenLabs workspace. After creation, add the returned Agent ID as <code style={{ background: "rgba(255,255,255,0.06)", padding: "2px 6px", borderRadius: "4px", fontSize: "12px" }}>ELEVENLABS_AGENT_ID</code> in Secrets, then wire the phone number in the ElevenLabs dashboard.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                <input
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  placeholder="Webhook URL (e.g. https://aiiaco.com/api/webhooks/elevenlabs)"
                  style={{
                    fontFamily: FF,
                    fontSize: "13px",
                    color: "#F0F4F8",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "8px",
                    padding: "9px 14px",
                    width: "360px",
                    maxWidth: "100%",
                    outline: "none",
                  }}
                />
                <button
                  onClick={handleCreate}
                  disabled={createMutation.isPending || !webhookUrl.trim()}
                  style={{
                    fontFamily: FF,
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#03050A",
                    background: createMutation.isPending ? "rgba(184,156,74,0.5)" : "#B89C4A",
                    border: "none",
                    borderRadius: "8px",
                    padding: "9px 18px",
                    cursor: createMutation.isPending ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  {createMutation.isPending && <Loader2 size={14} className="animate-spin" />}
                  Create Agent in ElevenLabs
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Phone number wiring instructions */}
      <div style={{
        background: "rgba(184,156,74,0.05)",
        border: "1px solid rgba(184,156,74,0.18)",
        borderRadius: "12px",
        padding: "20px 24px",
        marginBottom: "28px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
          <Phone size={16} style={{ color: "#B89C4A" }} />
          <span style={{ fontSize: "13px", fontWeight: 700, color: "#D4A843", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Phone Number Wiring
          </span>
        </div>
        <p style={{ fontSize: "13px", color: "rgba(200,215,230,0.70)", margin: "0 0 12px", lineHeight: 1.6 }}>
          To connect <strong style={{ color: "#D4A843" }}>888-808-0001</strong> to this agent, go to your ElevenLabs dashboard → Conversational AI → Phone Numbers → Import Number, and enter your Twilio or SIP credentials for that number. Then assign this agent to it.
        </p>
        <ol style={{ fontSize: "13px", color: "rgba(200,215,230,0.60)", margin: 0, paddingLeft: "20px", lineHeight: 1.8 }}>
          <li>In ElevenLabs: Conversational AI → <strong style={{ color: "rgba(200,215,230,0.85)" }}>Phone Numbers</strong> → Import</li>
          <li>Enter your Twilio Account SID, Auth Token, and the number <strong style={{ color: "rgba(200,215,230,0.85)" }}>+18888080001</strong></li>
          <li>Assign <strong style={{ color: "rgba(200,215,230,0.85)" }}>AiiA Diagnostic Agent</strong> to the number</li>
          <li>Set the post-call webhook URL to <code style={{ background: "rgba(255,255,255,0.06)", padding: "2px 6px", borderRadius: "4px" }}>https://aiiaco.com/api/webhooks/elevenlabs</code></li>
          <li>Add <code style={{ background: "rgba(255,255,255,0.06)", padding: "2px 6px", borderRadius: "4px" }}>ELEVENLABS_WEBHOOK_SECRET</code> in Secrets (from ElevenLabs webhook settings)</li>
        </ol>
      </div>

      {/* System prompt editor */}
      <div style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
          <label style={{ fontSize: "13px", fontWeight: 700, color: "rgba(200,215,230,0.75)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            System Prompt
          </label>
          <span style={{ fontSize: "12px", color: "rgba(200,215,230,0.35)" }}>
            {systemPrompt.length.toLocaleString()} chars
          </span>
        </div>
        <textarea
          value={systemPrompt}
          onChange={(e) => { setSystemPrompt(e.target.value); setIsDirty(true); }}
          rows={20}
          style={{
            fontFamily: "ui-monospace, 'SF Mono', 'Fira Code', monospace",
            fontSize: "13px",
            lineHeight: 1.6,
            color: "rgba(200,215,230,0.90)",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.10)",
            borderRadius: "10px",
            padding: "16px",
            width: "100%",
            resize: "vertical",
            outline: "none",
            boxSizing: "border-box",
          }}
          onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(184,156,74,0.35)"; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)"; }}
        />
      </div>

      {/* First message editor */}
      <div style={{ marginBottom: "28px" }}>
        <label style={{ fontSize: "13px", fontWeight: 700, color: "rgba(200,215,230,0.75)", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: "10px" }}>
          First Message (what the agent says when the call connects)
        </label>
        <textarea
          value={firstMessage}
          onChange={(e) => { setFirstMessage(e.target.value); setIsDirty(true); }}
          rows={3}
          style={{
            fontFamily: FF,
            fontSize: "14px",
            lineHeight: 1.6,
            color: "rgba(200,215,230,0.90)",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.10)",
            borderRadius: "10px",
            padding: "14px 16px",
            width: "100%",
            resize: "vertical",
            outline: "none",
            boxSizing: "border-box",
          }}
          onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(184,156,74,0.35)"; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)"; }}
        />
      </div>

      {/* Save button */}
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <button
          onClick={handleSave}
          disabled={!isDirty || updateMutation.isPending || !isLive}
          style={{
            fontFamily: FF,
            fontSize: "14px",
            fontWeight: 700,
            color: "#03050A",
            background: (!isDirty || !isLive) ? "rgba(184,156,74,0.35)" : "#B89C4A",
            border: "none",
            borderRadius: "10px",
            padding: "12px 24px",
            cursor: (!isDirty || !isLive) ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            transition: "background 0.15s",
          }}
        >
          {updateMutation.isPending
            ? <><Loader2 size={15} className="animate-spin" /> Saving…</>
            : <><RefreshCw size={15} /> Save to ElevenLabs</>
          }
        </button>
        {!isLive && (
          <span style={{ fontSize: "12px", color: "rgba(200,215,230,0.35)" }}>
            Create the agent first to enable saving
          </span>
        )}
        {isDirty && isLive && (
          <span style={{ fontSize: "12px", color: "rgba(184,156,74,0.70)" }}>
            Unsaved changes
          </span>
        )}
      </div>
    </div>
  );
}
