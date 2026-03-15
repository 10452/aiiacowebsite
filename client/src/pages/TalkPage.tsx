/**
 * TalkPage — Dedicated page to talk with AiA directly.
 *
 * Two-tier UX:
 *   1. New visitors: optional pre-fill form (name, email, phone) → start voice
 *   2. Returning leads: enter email → receive magic link → verify → see history + talk
 *
 * Visual features:
 *   - Holographic video watermark background (auto on first visit, optional replay button after)
 *   - Golden microphone icon with 7-second shine pulse
 *   - Speech indicator bars during active conversation
 *   - Live transcription with copy-to-clipboard
 *   - Transcript persisted to DB on conversation end
 *
 * Uses ElevenLabs React SDK `useConversation` with `onMessage`.
 */
import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { useConversation } from "@11labs/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  Check,
  Mic,
  MicOff,
  PhoneOff,
  Loader2,
  Mail,
  ArrowLeft,
  User,
  Phone,
  MessageSquare,
  Clock,
  ChevronDown,
  ChevronUp,
  Play,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/seo/SEO";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const AGENT_ID: string = import.meta.env.VITE_ELEVENLABS_AGENT_ID ?? "";
const MIC_ICON_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663031409823/jiUKWZNCEesKEKgdJkoZwj/aiia_gold_microphone_v2-cZjuNxwT4CHFwbMHWYwnRS.webp";
const VIDEO_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663031409823/jiUKWZNCEesKEKgdJkoZwj/aia-intro-silent_a0998b5e.mp4";

const FIRST_VISIT_KEY = "aiiaco_talk_visited";

const FF =
  "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";

interface TranscriptEntry {
  id: number;
  role: "user" | "ai";
  text: string;
  timestamp: Date;
}

type ConvStatus = "idle" | "connecting" | "connected" | "error";

/** Which screen the user sees */
type PageView = "landing" | "voice" | "magic-link-sent" | "verified";

interface VerifiedLead {
  id: number;
  name: string | null;
  email: string | null;
  company: string | null;
  phone: string | null;
  conversationSummary: string | null;
  painPoints: string | null;
  wants: string | null;
}

interface PreviousTranscript {
  id: number;
  transcript: string;
  transcriptText: string | null;
  durationSeconds: number | null;
  createdAt: Date;
}

export default function TalkPage() {
  // ─── Page-level state ──────────────────────────────────────────────
  const [view, setView] = useState<PageView>("landing");
  const [visitorName, setVisitorName] = useState("");
  const [visitorEmail, setVisitorEmail] = useState("");
  const [visitorPhone, setVisitorPhone] = useState("");
  const [magicLinkEmail, setMagicLinkEmail] = useState("");
  const [verifiedLead, setVerifiedLead] = useState<VerifiedLead | null>(null);
  const [previousTranscripts, setPreviousTranscripts] = useState<PreviousTranscript[]>([]);
  const [expandedTranscript, setExpandedTranscript] = useState<number | null>(null);
  const conversationStartRef = useRef<Date | null>(null);

  // ─── Video watermark state ─────────────────────────────────────────
  const [isFirstVisit] = useState(() => !localStorage.getItem(FIRST_VISIT_KEY));
  const [videoPlaying, setVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Mark first visit as done on mount
  useEffect(() => {
    if (isFirstVisit) {
      localStorage.setItem(FIRST_VISIT_KEY, "true");
      setVideoPlaying(true);
    }
  }, [isFirstVisit]);

  // Auto-play video on first visit
  useEffect(() => {
    if (videoPlaying && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [videoPlaying]);

  const handlePlayVideo = useCallback(() => {
    setVideoPlaying(true);
  }, []);

  const handleVideoEnded = useCallback(() => {
    setVideoPlaying(false);
  }, []);

  // ─── Voice state ───────────────────────────────────────────────────
  const [status, setStatus] = useState<ConvStatus>("idle");
  const [isMuted, setIsMuted] = useState(false);
  const [agentSpeaking, setAgentSpeaking] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [copied, setCopied] = useState(false);
  const transcriptEndRef = useRef<HTMLDivElement>(null);
  const entryIdRef = useRef(0);

  // ─── tRPC mutations ────────────────────────────────────────────────
  const sendMagicLink = trpc.talk.sendMagicLink.useMutation();
  const verifyMagicLink = trpc.talk.verifyMagicLink.useMutation();
  const saveTranscript = trpc.talk.saveTranscript.useMutation();

  // ─── Check for magic link token in URL on mount ────────────────────
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      window.history.replaceState({}, "", "/talk");
      verifyMagicLink.mutate(
        { token },
        {
          onSuccess: (data) => {
            setVerifiedLead(data.lead);
            setPreviousTranscripts(
              (data.previousTranscripts ?? []).map((t: any) => ({
                ...t,
                createdAt: new Date(t.createdAt),
              }))
            );
            setVisitorName(data.lead.name ?? "");
            setVisitorEmail(data.lead.email ?? "");
            setVisitorPhone(data.lead.phone ?? "");
            setView("verified");
            toast.success(`Welcome back, ${data.lead.name?.split(" ")[0] ?? "there"}!`);
          },
          onError: (err) => {
            toast.error(err.message || "Invalid or expired link");
            setView("landing");
          },
        }
      );
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ─── ElevenLabs conversation ───────────────────────────────────────
  const conversation = useConversation({
    onConnect: () => setStatus("connected"),
    onDisconnect: () => {
      setStatus("idle");
      setAgentSpeaking(false);
    },
    onError: () => setStatus("error"),
    onMessage: (payload: { message: string; source: "user" | "ai" }) => {
      setAgentSpeaking(payload.source === "ai");
      if (payload.message && payload.message.trim()) {
        entryIdRef.current += 1;
        setTranscript((prev) => [
          ...prev,
          {
            id: entryIdRef.current,
            role: payload.source,
            text: payload.message.trim(),
            timestamp: new Date(),
          },
        ]);
      }
    },
  });

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [transcript]);

  const startConversation = useCallback(async () => {
    if (!AGENT_ID) {
      console.error("VITE_ELEVENLABS_AGENT_ID not set");
      setStatus("error");
      return;
    }
    try {
      setStatus("connecting");
      setTranscript([]);
      conversationStartRef.current = new Date();
      await navigator.mediaDevices.getUserMedia({ audio: true });
      await conversation.startSession({
        agentId: AGENT_ID,
        connectionType: "webrtc",
      });
    } catch (err) {
      console.error("Failed to start conversation:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  }, [conversation]);

  const endConversation = useCallback(async () => {
    await conversation.endSession();
    setStatus("idle");
    setAgentSpeaking(false);

    // Persist transcript to DB
    if (transcript.length > 0) {
      const durationSeconds = conversationStartRef.current
        ? Math.round((Date.now() - conversationStartRef.current.getTime()) / 1000)
        : undefined;

      const transcriptJson = JSON.stringify(
        transcript.map((e) => ({
          role: e.role,
          text: e.text,
          timestamp: e.timestamp.toISOString(),
        }))
      );
      const transcriptText = transcript
        .map((e) => `${e.role === "ai" ? "AiA" : "Visitor"}: ${e.text}`)
        .join("\n\n");

      saveTranscript.mutate(
        {
          leadId: verifiedLead?.id,
          visitorName: visitorName || undefined,
          visitorEmail: visitorEmail || undefined,
          visitorPhone: visitorPhone || undefined,
          transcript: transcriptJson,
          transcriptText,
          durationSeconds,
        },
        {
          onSuccess: () => {
            toast.success("Transcript saved", {
              description: "Your conversation has been recorded.",
            });
          },
          onError: () => {
            console.error("[Talk] Failed to save transcript");
          },
        }
      );
    }
  }, [conversation, transcript, verifiedLead, visitorName, visitorEmail, visitorPhone, saveTranscript]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      conversation.setVolume({ volume: prev ? 1 : 0 });
      return !prev;
    });
  }, [conversation]);

  const copyTranscript = useCallback(() => {
    const text = transcript
      .map((e) => `${e.role === "ai" ? "AiA" : "You"}: ${e.text}`)
      .join("\n\n");
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [transcript]);

  const isActive = status === "connected" || status === "connecting";

  // ─── Magic link handlers ───────────────────────────────────────────
  const handleSendMagicLink = useCallback(() => {
    if (!magicLinkEmail.trim()) return;
    sendMagicLink.mutate(
      { email: magicLinkEmail.trim(), origin: window.location.origin },
      {
        onSuccess: (data) => {
          setView("magic-link-sent");
          toast.success(data.message);
        },
        onError: (err) => {
          toast.error(err.message || "Failed to send magic link");
        },
      }
    );
  }, [magicLinkEmail, sendMagicLink]);

  const handleStartAsNew = useCallback(() => {
    setView("voice");
  }, []);

  // ─── Shared input style ────────────────────────────────────────────
  const inputStyle: React.CSSProperties = useMemo(
    () => ({
      width: "100%",
      padding: "12px 16px",
      borderRadius: "10px",
      border: "1px solid rgba(212,168,67,0.20)",
      background: "rgba(255,255,255,0.04)",
      color: "var(--pearl)",
      fontFamily: FF,
      fontSize: "14px",
      outline: "none",
      transition: "border-color 0.2s",
    }),
    []
  );

  // ─── Render helpers ────────────────────────────────────────────────

  /** Landing view — choose new or returning */
  const renderLanding = () => (
    <div style={{ maxWidth: "560px", margin: "0 auto" }}>
      {/* New visitor card */}
      <div
        style={{
          background: "rgba(5,8,15,0.85)",
          border: "1px solid rgba(212,168,67,0.18)",
          borderRadius: "16px",
          padding: "32px",
          marginBottom: "24px",
          backdropFilter: "blur(12px)",
        }}
      >
        <h2
          style={{
            fontFamily: FF,
            fontSize: "20px",
            fontWeight: 700,
            color: "var(--pearl)",
            marginBottom: "8px",
          }}
        >
          Start a New Conversation
        </h2>
        <p
          style={{
            fontSize: "14px",
            color: "var(--pearl-dim)",
            lineHeight: 1.6,
            marginBottom: "24px",
          }}
        >
          Optionally share your details so AiA can personalize your diagnostic.
          You can also skip and just start talking.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
          <div style={{ position: "relative" }}>
            <User
              size={16}
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "rgba(212,168,67,0.4)",
              }}
            />
            <input
              type="text"
              placeholder="Your name (optional)"
              value={visitorName}
              onChange={(e) => setVisitorName(e.target.value)}
              style={{ ...inputStyle, paddingLeft: "40px" }}
              onFocus={(e) => (e.target.style.borderColor = "rgba(212,168,67,0.45)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(212,168,67,0.20)")}
            />
          </div>
          <div style={{ position: "relative" }}>
            <Mail
              size={16}
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "rgba(212,168,67,0.4)",
              }}
            />
            <input
              type="email"
              placeholder="Email (optional)"
              value={visitorEmail}
              onChange={(e) => setVisitorEmail(e.target.value)}
              style={{ ...inputStyle, paddingLeft: "40px" }}
              onFocus={(e) => (e.target.style.borderColor = "rgba(212,168,67,0.45)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(212,168,67,0.20)")}
            />
          </div>
          <div style={{ position: "relative" }}>
            <Phone
              size={16}
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "rgba(212,168,67,0.4)",
              }}
            />
            <input
              type="tel"
              placeholder="Phone (optional)"
              value={visitorPhone}
              onChange={(e) => setVisitorPhone(e.target.value)}
              style={{ ...inputStyle, paddingLeft: "40px" }}
              onFocus={(e) => (e.target.style.borderColor = "rgba(212,168,67,0.45)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(212,168,67,0.20)")}
            />
          </div>
        </div>

        <motion.button
          onClick={handleStartAsNew}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            width: "100%",
            padding: "16px",
            borderRadius: "12px",
            border: "1px solid rgba(212,168,67,0.35)",
            background:
              "linear-gradient(135deg, rgba(212,168,67,0.18) 0%, rgba(184,156,74,0.10) 100%)",
            color: "var(--gold-bright)",
            fontFamily: FF,
            fontSize: "16px",
            fontWeight: 700,
            letterSpacing: "0.04em",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            transition: "all 0.2s",
          }}
        >
          <img
            src={MIC_ICON_URL}
            alt=""
            style={{ width: "24px", height: "24px", objectFit: "contain" }}
          />
          Talk to AiA
        </motion.button>
      </div>

      {/* Divider */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          margin: "8px 0",
        }}
      >
        <div style={{ flex: 1, height: "1px", background: "rgba(212,168,67,0.12)" }} />
        <span
          style={{
            fontSize: "12px",
            fontWeight: 700,
            color: "var(--pearl-dim)",
            letterSpacing: "0.08em",
            opacity: 0.5,
          }}
        >
          OR
        </span>
        <div style={{ flex: 1, height: "1px", background: "rgba(212,168,67,0.12)" }} />
      </div>

      {/* Returning lead card */}
      <div
        style={{
          background: "rgba(5,8,15,0.85)",
          border: "1px solid rgba(100,140,200,0.15)",
          borderRadius: "16px",
          padding: "32px",
          marginTop: "24px",
          backdropFilter: "blur(12px)",
        }}
      >
        <h2
          style={{
            fontFamily: FF,
            fontSize: "20px",
            fontWeight: 700,
            color: "var(--pearl)",
            marginBottom: "8px",
          }}
        >
          Continue a Previous Conversation
        </h2>
        <p
          style={{
            fontSize: "14px",
            color: "var(--pearl-dim)",
            lineHeight: 1.6,
            marginBottom: "24px",
          }}
        >
          We'll send a secure link to your email so AiA can pick up where you
          left off. Only you can access your conversation history.
        </p>

        <div style={{ position: "relative" }}>
          <Mail
            size={16}
            style={{
              position: "absolute",
              left: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "rgba(100,140,200,0.5)",
            }}
          />
          <input
            type="email"
            placeholder="Enter the email you used before"
            value={magicLinkEmail}
            onChange={(e) => setMagicLinkEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMagicLink()}
            style={{
              ...inputStyle,
              paddingLeft: "40px",
              borderColor: "rgba(100,140,200,0.20)",
            }}
            onFocus={(e) =>
              (e.target.style.borderColor = "rgba(100,140,200,0.5)")
            }
            onBlur={(e) =>
              (e.target.style.borderColor = "rgba(100,140,200,0.20)")
            }
          />
        </div>

        <motion.button
          onClick={handleSendMagicLink}
          disabled={!magicLinkEmail.trim() || sendMagicLink.isPending}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            width: "100%",
            marginTop: "16px",
            padding: "14px",
            borderRadius: "10px",
            border: "1px solid rgba(100,140,200,0.25)",
            background: "rgba(100,140,200,0.10)",
            color: "rgba(140,170,220,0.9)",
            fontFamily: FF,
            fontSize: "15px",
            fontWeight: 600,
            letterSpacing: "0.03em",
            cursor:
              !magicLinkEmail.trim() || sendMagicLink.isPending
                ? "not-allowed"
                : "pointer",
            opacity:
              !magicLinkEmail.trim() || sendMagicLink.isPending ? 0.5 : 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            transition: "all 0.2s",
          }}
        >
          {sendMagicLink.isPending ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Mail size={16} />
          )}
          {sendMagicLink.isPending ? "Sending…" : "Send Magic Link"}
        </motion.button>
      </div>
    </div>
  );

  /** Magic link sent confirmation */
  const renderMagicLinkSent = () => (
    <div
      style={{
        maxWidth: "480px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <div
        style={{
          background: "rgba(5,8,15,0.85)",
          border: "1px solid rgba(100,140,200,0.18)",
          borderRadius: "16px",
          padding: "48px 32px",
          backdropFilter: "blur(12px)",
        }}
      >
        <div
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            background: "rgba(100,140,200,0.12)",
            border: "1px solid rgba(100,140,200,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
          }}
        >
          <Mail size={28} style={{ color: "rgba(140,170,220,0.8)" }} />
        </div>

        <h2
          style={{
            fontFamily: FF,
            fontSize: "22px",
            fontWeight: 700,
            color: "var(--pearl)",
            marginBottom: "12px",
          }}
        >
          Check Your Email
        </h2>
        <p
          style={{
            fontSize: "15px",
            color: "var(--pearl-dim)",
            lineHeight: 1.7,
            marginBottom: "8px",
          }}
        >
          If we have <strong style={{ color: "var(--pearl-muted)" }}>{magicLinkEmail}</strong> on
          file, you'll receive a magic link shortly.
        </p>
        <p
          style={{
            fontSize: "13px",
            color: "var(--pearl-dim)",
            opacity: 0.6,
            marginBottom: "32px",
          }}
        >
          The link expires in 15 minutes for your security.
        </p>

        <button
          onClick={() => setView("landing")}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            border: "1px solid rgba(212,168,67,0.20)",
            background: "transparent",
            color: "var(--pearl-dim)",
            fontFamily: FF,
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <ArrowLeft size={14} />
          Back
        </button>
      </div>
    </div>
  );

  /** Verified lead context banner */
  const renderVerifiedBanner = () => {
    if (!verifiedLead) return null;
    return (
      <div
        style={{
          background: "rgba(74,222,128,0.06)",
          border: "1px solid rgba(74,222,128,0.18)",
          borderRadius: "12px",
          padding: "16px 20px",
          marginBottom: "24px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "rgba(74,222,128,0.12)",
            border: "1px solid rgba(74,222,128,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Check size={18} style={{ color: "#4ade80" }} />
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "var(--pearl)",
            }}
          >
            Verified: {verifiedLead.name ?? verifiedLead.email}
          </div>
          <div
            style={{
              fontSize: "12px",
              color: "var(--pearl-dim)",
              marginTop: "2px",
            }}
          >
            AiA has your context and is ready to continue.
            {verifiedLead.company && ` (${verifiedLead.company})`}
          </div>
        </div>
      </div>
    );
  };

  /** Previous transcripts accordion */
  const renderPreviousTranscripts = () => {
    if (previousTranscripts.length === 0) return null;
    return (
      <div style={{ marginBottom: "24px" }}>
        <div
          style={{
            fontSize: "12px",
            fontWeight: 700,
            color: "var(--pearl-dim)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          Previous Conversations ({previousTranscripts.length})
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {previousTranscripts.map((t) => {
            const isExpanded = expandedTranscript === t.id;
            let parsedEntries: { role: string; text: string }[] = [];
            try {
              parsedEntries = JSON.parse(t.transcript);
            } catch {
              // fallback to text
            }
            return (
              <div
                key={t.id}
                style={{
                  background: "rgba(5,8,15,0.7)",
                  border: "1px solid rgba(212,168,67,0.12)",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <button
                  onClick={() =>
                    setExpandedTranscript(isExpanded ? null : t.id)
                  }
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--pearl-muted)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <MessageSquare
                      size={14}
                      style={{ color: "rgba(212,168,67,0.5)" }}
                    />
                    <span
                      style={{
                        fontSize: "13px",
                        fontFamily: FF,
                        fontWeight: 500,
                      }}
                    >
                      {new Date(t.createdAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    {t.durationSeconds != null && (
                      <span
                        style={{
                          fontSize: "11px",
                          color: "var(--pearl-dim)",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <Clock size={10} />
                        {Math.floor(t.durationSeconds / 60)}m{" "}
                        {t.durationSeconds % 60}s
                      </span>
                    )}
                  </div>
                  {isExpanded ? (
                    <ChevronUp size={14} />
                  ) : (
                    <ChevronDown size={14} />
                  )}
                </button>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ overflow: "hidden" }}
                    >
                      <div
                        style={{
                          padding: "0 16px 16px",
                          maxHeight: "300px",
                          overflowY: "auto",
                        }}
                        className="transcript-scroll"
                      >
                        {parsedEntries.length > 0
                          ? parsedEntries.map((entry, i) => (
                              <div
                                key={i}
                                style={{
                                  fontSize: "13px",
                                  lineHeight: 1.6,
                                  marginBottom: "8px",
                                  color: "var(--pearl-dim)",
                                }}
                              >
                                <span
                                  style={{
                                    fontWeight: 700,
                                    color:
                                      entry.role === "ai"
                                        ? "var(--gold-bright)"
                                        : "rgba(140,170,220,0.8)",
                                    marginRight: "6px",
                                  }}
                                >
                                  {entry.role === "ai" ? "AiA:" : "You:"}
                                </span>
                                {entry.text}
                              </div>
                            ))
                          : t.transcriptText?.split("\n\n").map((line, i) => (
                              <div
                                key={i}
                                style={{
                                  fontSize: "13px",
                                  lineHeight: 1.6,
                                  marginBottom: "8px",
                                  color: "var(--pearl-dim)",
                                }}
                              >
                                {line}
                              </div>
                            ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  /** Voice conversation UI (shared between "voice" and "verified" views) */
  const renderVoiceUI = () => (
    <>
      {/* Voice Control Area */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
          marginBottom: "40px",
        }}
      >
        {/* Main microphone button */}
        <div style={{ position: "relative" }}>
          {/* 7-second shine pulse ring — only when idle */}
          {!isActive && status === "idle" && (
            <motion.div
              style={{
                position: "absolute",
                inset: "-8px",
                borderRadius: "50%",
                border: "2px solid rgba(212,168,67,0.4)",
                pointerEvents: "none",
              }}
              animate={{
                boxShadow: [
                  "0 0 0px rgba(212,168,67,0)",
                  "0 0 0px rgba(212,168,67,0)",
                  "0 0 0px rgba(212,168,67,0)",
                  "0 0 30px rgba(212,168,67,0.5), inset 0 0 20px rgba(212,168,67,0.15)",
                  "0 0 0px rgba(212,168,67,0)",
                ],
                borderColor: [
                  "rgba(212,168,67,0.15)",
                  "rgba(212,168,67,0.15)",
                  "rgba(212,168,67,0.15)",
                  "rgba(212,168,67,0.6)",
                  "rgba(212,168,67,0.15)",
                ],
              }}
              transition={{
                repeat: Infinity,
                duration: 7,
                ease: "easeInOut",
                times: [0, 0.6, 0.7, 0.85, 1],
              }}
            />
          )}

          {/* Speech indicator bars — shown when connected */}
          {status === "connected" && (
            <div
              style={{
                position: "absolute",
                inset: "-16px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
              }}
            >
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                <motion.div
                  key={deg}
                  style={{
                    position: "absolute",
                    width: "3px",
                    borderRadius: "2px",
                    background: agentSpeaking
                      ? "#D4A843"
                      : "rgba(212,168,67,0.35)",
                    transformOrigin: "center 76px",
                    transform: `rotate(${deg}deg) translateY(-76px)`,
                  }}
                  animate={
                    agentSpeaking
                      ? {
                          height: [6, 20, 6, 24, 6],
                          opacity: [0.5, 1, 0.5, 1, 0.5],
                        }
                      : {
                          height: [4, 10, 4, 8, 4],
                          opacity: [0.3, 0.6, 0.3, 0.5, 0.3],
                        }
                  }
                  transition={{
                    repeat: Infinity,
                    duration: agentSpeaking ? 0.6 : 1.4,
                    delay: (deg / 360) * (agentSpeaking ? 0.3 : 0.7),
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          )}

          <motion.button
            onClick={isActive ? endConversation : startConversation}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            style={{
              width: "140px",
              height: "140px",
              borderRadius: "50%",
              border: "none",
              cursor: "pointer",
              position: "relative",
              background: isActive
                ? "radial-gradient(circle at 40% 35%, rgba(232,192,96,0.25), rgba(184,156,74,0.15) 60%, rgba(138,110,42,0.1))"
                : "radial-gradient(circle at 40% 35%, rgba(200,168,64,0.12), rgba(138,110,42,0.08) 60%, transparent)",
              boxShadow: isActive
                ? "0 0 0 4px rgba(212,168,67,0.35), 0 0 60px rgba(212,168,67,0.35), 0 4px 32px rgba(0,0,0,0.5)"
                : "0 0 0 2px rgba(212,168,67,0.18), 0 4px 24px rgba(0,0,0,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "box-shadow 0.3s ease",
              overflow: "visible",
              padding: 0,
              zIndex: 2,
            }}
            title={isActive ? "End conversation" : "Talk to AiA"}
          >
            {/* Active pulsing ring */}
            {isActive && (
              <motion.div
                style={{
                  position: "absolute",
                  inset: "-12px",
                  borderRadius: "50%",
                  border: "2px solid rgba(212,168,67,0.5)",
                }}
                animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeOut",
                }}
              />
            )}
            {status === "connecting" ? (
              <Loader2
                size={44}
                style={{ color: "#D4A843" }}
                className="animate-spin"
              />
            ) : isActive ? (
              <PhoneOff size={44} style={{ color: "#ff6b6b" }} />
            ) : (
              <img
                src={MIC_ICON_URL}
                alt="Talk to AiA"
                style={{
                  width: "90px",
                  height: "90px",
                  objectFit: "contain",
                  filter: "drop-shadow(0 2px 12px rgba(212,168,67,0.5))",
                  pointerEvents: "none",
                }}
              />
            )}
          </motion.button>
        </div>

        {/* Status + controls */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color:
                status === "error"
                  ? "#ff6b6b"
                  : status === "idle"
                    ? "var(--pearl-dim)"
                    : "var(--gold-bright)",
            }}
          >
            {status === "idle" && "Press to start"}
            {status === "connecting" && "Connecting…"}
            {status === "connected" &&
              (agentSpeaking ? "AiA is speaking…" : "Listening…")}
            {status === "error" && "Mic access required"}
          </div>

          {status === "connected" && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={toggleMute}
              title={isMuted ? "Unmute" : "Mute"}
              style={{
                background: isMuted
                  ? "rgba(212,168,67,0.2)"
                  : "rgba(255,255,255,0.06)",
                border: "1px solid rgba(212,168,67,0.25)",
                borderRadius: "10px",
                padding: "8px 12px",
                cursor: "pointer",
                color: isMuted
                  ? "#D4A843"
                  : "rgba(200,215,230,0.7)",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.04em",
              }}
            >
              {isMuted ? <MicOff size={14} /> : <Mic size={14} />}
              {isMuted ? "Unmute" : "Mute"}
            </motion.button>
          )}
        </div>
      </div>

      {/* ─── Transcript Box ──────────────────────────────────── */}
      <div
        style={{
          background: "rgba(5,8,15,0.85)",
          border: "1px solid rgba(212,168,67,0.18)",
          borderRadius: "16px",
          overflow: "hidden",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        {/* Transcript header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: isActive
                  ? "#4ade80"
                  : transcript.length > 0
                    ? "var(--gold-bright)"
                    : "rgba(200,215,230,0.25)",
                boxShadow: isActive
                  ? "0 0 8px rgba(74,222,128,0.5)"
                  : "none",
              }}
            />
            <span
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "var(--pearl-muted)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Live Transcript
            </span>
          </div>

          <button
            onClick={copyTranscript}
            disabled={transcript.length === 0}
            title="Copy transcript to clipboard"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 14px",
              borderRadius: "8px",
              border: "1px solid rgba(212,168,67,0.25)",
              background: copied
                ? "rgba(74,222,128,0.15)"
                : "rgba(255,255,255,0.04)",
              color: copied ? "#4ade80" : "var(--pearl-dim)",
              fontSize: "12px",
              fontWeight: 600,
              cursor: transcript.length === 0 ? "not-allowed" : "pointer",
              opacity: transcript.length === 0 ? 0.4 : 1,
              transition: "all 0.2s ease",
              letterSpacing: "0.03em",
            }}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>

        {/* Transcript content */}
        <div
          style={{
            minHeight: "200px",
            maxHeight: "420px",
            overflowY: "auto",
            padding: "20px",
            scrollBehavior: "smooth",
          }}
          className="transcript-scroll"
        >
          {transcript.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "160px",
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: "rgba(212,168,67,0.08)",
                  border: "1px solid rgba(212,168,67,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Mic
                  size={20}
                  style={{ color: "rgba(212,168,67,0.4)" }}
                />
              </div>
              <p
                style={{
                  fontSize: "13px",
                  color: "var(--pearl-dim)",
                  textAlign: "center",
                  lineHeight: 1.5,
                }}
              >
                {isActive
                  ? "Waiting for conversation to begin…"
                  : "Start a conversation to see the live transcript here."}
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              {transcript.map((entry) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      flexShrink: 0,
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background:
                        entry.role === "ai"
                          ? "rgba(212,168,67,0.15)"
                          : "rgba(100,140,200,0.12)",
                      border: `1px solid ${
                        entry.role === "ai"
                          ? "rgba(212,168,67,0.3)"
                          : "rgba(100,140,200,0.2)"
                      }`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "11px",
                      fontWeight: 700,
                      color:
                        entry.role === "ai"
                          ? "var(--gold-bright)"
                          : "rgba(140,170,220,0.8)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {entry.role === "ai" ? "AiA" : "You"}
                  </div>

                  <div
                    style={{
                      flex: 1,
                      background:
                        entry.role === "ai"
                          ? "rgba(212,168,67,0.06)"
                          : "rgba(100,140,200,0.05)",
                      border: `1px solid ${
                        entry.role === "ai"
                          ? "rgba(212,168,67,0.12)"
                          : "rgba(100,140,200,0.08)"
                      }`,
                      borderRadius: "12px",
                      padding: "12px 16px",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "14px",
                        lineHeight: 1.6,
                        color: "var(--pearl-muted)",
                        margin: 0,
                      }}
                    >
                      {entry.text}
                    </p>
                    <span
                      style={{
                        fontSize: "10px",
                        color: "var(--pearl-dim)",
                        marginTop: "6px",
                        display: "block",
                        opacity: 0.6,
                      }}
                    >
                      {entry.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </span>
                  </div>
                </motion.div>
              ))}
              <div ref={transcriptEndRef} />
            </div>
          )}
        </div>
      </div>
    </>
  );

  // ─── Main render ───────────────────────────────────────────────────
  return (
    <>
      <SEO
        title="Talk to AiA | AiiAco"
        description="Speak directly with AiA, AiiAco's AI diagnostic agent. Get instant answers about AI integration, operational intelligence, and managed automation for your business."
        path="/talk"
        keywords="talk to AiA, AI voice agent, AiiAco diagnostic, AI consultation, voice AI"
      />
      <div
        className="min-h-screen flex flex-col"
        style={{ background: "#03050A", position: "relative", overflow: "hidden" }}
      >
        {/* ─── Holographic Video Watermark Background ─── */}
        <video
          ref={videoRef}
          src={VIDEO_URL}
          muted
          playsInline
          onEnded={handleVideoEnded}
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            minWidth: "100vw",
            minHeight: "100vh",
            width: "auto",
            height: "auto",
            objectFit: "cover",
            zIndex: 0,
            opacity: videoPlaying ? 0.12 : 0,
            transition: "opacity 1.5s ease-in-out",
            pointerEvents: "none",
            mixBlendMode: "screen",
            filter: "saturate(0.6) brightness(1.2)",
          }}
        />
        {/* Gradient overlay to keep content readable */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 0,
            background:
              "radial-gradient(ellipse at center, rgba(3,5,10,0.3) 0%, rgba(3,5,10,0.75) 70%, rgba(3,5,10,0.92) 100%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          <Navbar />

          <main
            className="flex-1"
            style={{
              paddingTop: "140px",
              paddingBottom: "80px",
              fontFamily: FF,
            }}
          >
            <div
              style={{
                maxWidth: "800px",
                margin: "0 auto",
                padding: "0 24px",
              }}
            >
              {/* Header */}
              <div style={{ textAlign: "center", marginBottom: "48px" }}>
                <div className="section-pill" style={{ marginBottom: "20px" }}>
                  <span className="dot" />
                  <span>VOICE DIAGNOSTIC</span>
                </div>
                <h1
                  style={{
                    fontFamily: FF,
                    fontSize: "clamp(32px, 5vw, 48px)",
                    fontWeight: 700,
                    color: "var(--pearl)",
                    lineHeight: 1.15,
                    marginBottom: "16px",
                  }}
                >
                  Talk to{" "}
                  <span style={{ color: "var(--gold-bright)" }}>AiA</span>
                </h1>
                <p
                  style={{
                    fontFamily: FF,
                    fontSize: "16px",
                    color: "var(--pearl-dim)",
                    maxWidth: "520px",
                    margin: "0 auto",
                    lineHeight: 1.6,
                  }}
                >
                  {view === "verified"
                    ? "Welcome back. AiA has your context and is ready to continue where you left off."
                    : "AiA is our AI diagnostic agent. Start a new conversation or continue a previous one."}
                </p>
              </div>

              {/* View-specific content */}
              {view === "landing" && renderLanding()}
              {view === "magic-link-sent" && renderMagicLinkSent()}
              {view === "voice" && renderVoiceUI()}
              {view === "verified" && (
                <>
                  {renderVerifiedBanner()}
                  {renderPreviousTranscripts()}
                  {renderVoiceUI()}
                </>
              )}

              {/* Phone fallback — show on voice/verified views */}
              {(view === "voice" || view === "verified") && (
                <p
                  style={{
                    textAlign: "center",
                    fontSize: "12px",
                    color: "var(--pearl-dim)",
                    marginTop: "20px",
                    opacity: 0.6,
                    lineHeight: 1.5,
                  }}
                >
                  You can also call AiA directly at{" "}
                  <a
                    href="tel:+18888080001"
                    style={{
                      color: "var(--gold-bright)",
                      textDecoration: "none",
                    }}
                  >
                    +1 (888) 808-0001
                  </a>
                </p>
              )}

              {/* Back to landing from voice view */}
              {view === "voice" && (
                <div style={{ textAlign: "center", marginTop: "16px" }}>
                  <button
                    onClick={() => setView("landing")}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "8px",
                      border: "1px solid rgba(212,168,67,0.15)",
                      background: "transparent",
                      color: "var(--pearl-dim)",
                      fontFamily: FF,
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      opacity: 0.7,
                    }}
                  >
                    <ArrowLeft size={12} />
                    Back to options
                  </button>
                </div>
              )}
            </div>
          </main>

          <Footer />
        </div>

        {/* ─── Play Video button for return visitors ─── */}
        {!isFirstVisit && !videoPlaying && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            onClick={handlePlayVideo}
            title="Play AiA intro video"
            style={{
              position: "fixed",
              bottom: "24px",
              right: "24px",
              zIndex: 50,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 16px",
              borderRadius: "12px",
              border: "1px solid rgba(212,168,67,0.18)",
              background: "rgba(3,5,10,0.6)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              color: "rgba(200,215,230,0.5)",
              fontFamily: FF,
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.04em",
              cursor: "pointer",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "rgba(212,168,67,0.8)";
              e.currentTarget.style.borderColor = "rgba(212,168,67,0.35)";
              e.currentTarget.style.background = "rgba(3,5,10,0.8)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(200,215,230,0.5)";
              e.currentTarget.style.borderColor = "rgba(212,168,67,0.18)";
              e.currentTarget.style.background = "rgba(3,5,10,0.6)";
            }}
          >
            <Play size={14} />
            Play Intro
          </motion.button>
        )}
      </div>

      {/* Custom scrollbar + shine keyframes */}
      <style>{`
        .transcript-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .transcript-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .transcript-scroll::-webkit-scrollbar-thumb {
          background: rgba(212,168,67,0.2);
          border-radius: 3px;
        }
        .transcript-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(212,168,67,0.35);
        }
      `}</style>
    </>
  );
}
