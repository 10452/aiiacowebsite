/**
 * TalkPage — Dedicated page to talk with AiA directly.
 * Features a prominent voice widget (not the floating one) and a live
 * transcription box with a copy-to-clipboard button.
 *
 * Uses the ElevenLabs React SDK `useConversation` hook with `onMessage`
 * to capture real-time transcript messages from both user and agent.
 *
 * MessagePayload shape (from @elevenlabs/types):
 *   { message: string; source: "user" | "ai"; role: "user" | "agent"; event_id?: number }
 */
import { useState, useCallback, useRef, useEffect } from "react";
import { useConversation } from "@11labs/react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Mic, MicOff, PhoneOff, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/seo/SEO";

const AGENT_ID: string = import.meta.env.VITE_ELEVENLABS_AGENT_ID ?? "";
const MIC_ICON_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663031409823/jiUKWZNCEesKEKgdJkoZwj/aiia_gold_microphone_v2-cZjuNxwT4CHFwbMHWYwnRS.webp";

const FF =
  "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";

interface TranscriptEntry {
  id: number;
  role: "user" | "ai";
  text: string;
  timestamp: Date;
}

type ConvStatus = "idle" | "connecting" | "connected" | "error";

export default function TalkPage() {
  const [status, setStatus] = useState<ConvStatus>("idle");
  const [isMuted, setIsMuted] = useState(false);
  const [agentSpeaking, setAgentSpeaking] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [copied, setCopied] = useState(false);
  const transcriptEndRef = useRef<HTMLDivElement>(null);
  const entryIdRef = useRef(0);

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

  // Auto-scroll transcript box to bottom on new messages
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
  }, [conversation]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      conversation.setVolume({ volume: prev ? 1 : 0 });
      return !prev;
    });
  }, [conversation]);

  const copyTranscript = useCallback(() => {
    const text = transcript
      .map(
        (e) =>
          `${e.role === "ai" ? "AiA" : "You"}: ${e.text}`
      )
      .join("\n\n");
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [transcript]);

  const isActive = status === "connected" || status === "connecting";

  return (
    <>
      <SEO
        title="Talk to AiA | AiiAco"
        description="Speak directly with AiA, AiiAco's AI diagnostic agent. Get instant answers about AI integration, operational intelligence, and managed automation for your business."
        path="/talk"
        keywords="talk to AiA, AI voice agent, AiiAco diagnostic, AI consultation, voice AI"
      />
      <div className="min-h-screen flex flex-col" style={{ background: "#03050A" }}>
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
                AiA is our AI diagnostic agent. Press the microphone to start a
                live voice conversation. Your transcript appears below in real
                time.
              </p>
            </div>

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
              <motion.button
                onClick={isActive ? endConversation : startConversation}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                style={{
                  width: "120px",
                  height: "120px",
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
                  overflow: "hidden",
                  padding: 0,
                }}
                title={isActive ? "End conversation" : "Talk to AiA"}
              >
                {/* Pulse ring when active */}
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
                    size={40}
                    style={{ color: "#D4A843" }}
                    className="animate-spin"
                  />
                ) : isActive ? (
                  <PhoneOff size={40} style={{ color: "#ff6b6b" }} />
                ) : (
                  <img
                    src={MIC_ICON_URL}
                    alt="Talk to AiA"
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "contain",
                      filter:
                        "drop-shadow(0 2px 8px rgba(212,168,67,0.4))",
                      pointerEvents: "none",
                    }}
                  />
                )}
              </motion.button>

              {/* Status + controls */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                {/* Status text */}
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

                {/* Mute button when connected */}
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
                    {isMuted ? (
                      <MicOff size={14} />
                    ) : (
                      <Mic size={14} />
                    )}
                    {isMuted ? "Unmute" : "Mute"}
                  </motion.button>
                )}
              </div>

              {/* Waveform indicator when active */}
              <AnimatePresence>
                {isActive && status === "connected" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      height: "24px",
                    }}
                  >
                    {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                      <motion.div
                        key={i}
                        style={{
                          width: "3px",
                          borderRadius: "2px",
                          background: agentSpeaking
                            ? "#D4A843"
                            : "rgba(212,168,67,0.35)",
                        }}
                        animate={
                          agentSpeaking
                            ? {
                                height: [4, 18, 4, 22, 4],
                                transition: {
                                  repeat: Infinity,
                                  duration: 0.7,
                                  delay: i * 0.08,
                                },
                              }
                            : {
                                height: [4, 10, 4, 8, 4],
                                transition: {
                                  repeat: Infinity,
                                  duration: 1.2,
                                  delay: i * 0.1,
                                },
                              }
                        }
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
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
                      background:
                        isActive
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

                {/* Copy button */}
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
                    cursor:
                      transcript.length === 0 ? "not-allowed" : "pointer",
                    opacity: transcript.length === 0 ? 0.4 : 1,
                    transition: "all 0.2s ease",
                    letterSpacing: "0.03em",
                  }}
                >
                  {copied ? (
                    <Check size={14} />
                  ) : (
                    <Copy size={14} />
                  )}
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
                        {/* Role indicator */}
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

                        {/* Message bubble */}
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

            {/* Hint text below transcript */}
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
          </div>
        </main>

        <Footer />
      </div>

      {/* Custom scrollbar for transcript */}
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
