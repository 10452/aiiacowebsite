/**
 * AiiAVoiceWidget — Floating voice chat button that connects directly to the
 * AiiA Diagnostic Agent via ElevenLabs Conversational AI SDK.
 * Renders as a gold circuit-wired microphone artifact in the bottom-right corner.
 */
import { useState, useCallback } from "react";
import { useConversation } from "@11labs/react";
import { motion, AnimatePresence } from "framer-motion";

const AGENT_ID: string = import.meta.env.VITE_ELEVENLABS_AGENT_ID ?? "";
const MIC_ICON_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663031409823/jiUKWZNCEesKEKgdJkoZwj/aiia_gold_microphone_v2-cZjuNxwT4CHFwbMHWYwnRS.webp";

type ConvStatus = "idle" | "connecting" | "connected" | "error";

export default function AiiAVoiceWidget() {
  const [status, setStatus] = useState<ConvStatus>("idle");
  const [isMuted, setIsMuted] = useState(false);
  const [agentSpeaking, setAgentSpeaking] = useState(false);

  const conversation = useConversation({
    onConnect: () => setStatus("connected"),
    onDisconnect: () => { setStatus("idle"); setAgentSpeaking(false); },
    onError: () => setStatus("error"),
    onMessage: ({ source }: { source: string }) => {
      setAgentSpeaking(source === "ai");
    },
  });

  const startConversation = useCallback(async () => {
    if (!AGENT_ID) {
      console.error("VITE_ELEVENLABS_AGENT_ID not set");
      setStatus("error");
      return;
    }
    try {
      setStatus("connecting");
      await navigator.mediaDevices.getUserMedia({ audio: true });
      await conversation.startSession({ agentId: AGENT_ID, connectionType: "webrtc" });
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

  const isActive = status === "connected" || status === "connecting";

  return (
    <div
      style={{
        position: "fixed",
        bottom: "28px",
        right: "28px",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "12px",
      }}
    >
      {/* Status label */}
      <AnimatePresence>
        {status !== "idle" && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              background: "rgba(5,8,15,0.92)",
              border: "1px solid rgba(212,168,67,0.35)",
              borderRadius: "12px",
              padding: "10px 16px",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              minWidth: "200px",
            }}
          >
            {/* Waveform indicator */}
            <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  style={{
                    width: "3px",
                    borderRadius: "2px",
                    background: agentSpeaking ? "#D4A843" : "rgba(212,168,67,0.4)",
                  }}
                  animate={agentSpeaking ? {
                    height: [6, 16, 6, 20, 6],
                    transition: { repeat: Infinity, duration: 0.6, delay: i * 0.1 }
                  } : { height: 6 }}
                />
              ))}
            </div>

            <div>
              <div style={{ fontSize: "11px", fontWeight: 700, color: "#D4A843", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                {status === "connecting" ? "Connecting…" : agentSpeaking ? "AiiA Speaking" : "Listening…"}
              </div>
              <div style={{ fontSize: "10px", color: "rgba(200,215,230,0.55)", marginTop: "1px" }}>
                AiiA Diagnostic Agent
              </div>
            </div>

            {/* Mute + End buttons */}
            {status === "connected" && (
              <div style={{ display: "flex", gap: "6px", marginLeft: "auto" }}>
                <button
                  onClick={toggleMute}
                  title={isMuted ? "Unmute" : "Mute"}
                  style={{
                    background: isMuted ? "rgba(212,168,67,0.2)" : "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(212,168,67,0.25)",
                    borderRadius: "8px",
                    padding: "5px 8px",
                    cursor: "pointer",
                    color: isMuted ? "#D4A843" : "rgba(200,215,230,0.7)",
                    fontSize: "12px",
                    lineHeight: 1,
                  }}
                >
                  {isMuted ? "🔇" : "🎙️"}
                </button>
                <button
                  onClick={endConversation}
                  title="End call"
                  style={{
                    background: "rgba(220,50,50,0.15)",
                    border: "1px solid rgba(220,50,50,0.3)",
                    borderRadius: "8px",
                    padding: "5px 8px",
                    cursor: "pointer",
                    color: "#ff6b6b",
                    fontSize: "12px",
                    lineHeight: 1,
                  }}
                >
                  ✕
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error message */}
      <AnimatePresence>
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              background: "rgba(220,50,50,0.15)",
              border: "1px solid rgba(220,50,50,0.3)",
              borderRadius: "10px",
              padding: "8px 14px",
              fontSize: "11px",
              color: "#ff6b6b",
              maxWidth: "220px",
              textAlign: "center",
            }}
          >
            Mic access required. Please allow microphone and try again.
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main artifact button — gold circuit-wired microphone */}
      <motion.button
        onClick={isActive ? endConversation : startConversation}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        style={{
          width: "72px",
          height: "72px",
          borderRadius: "50%",
          border: "none",
          cursor: "pointer",
          position: "relative",
          background: isActive
            ? "radial-gradient(circle at 40% 35%, rgba(232,192,96,0.25), rgba(184,156,74,0.15) 60%, rgba(138,110,42,0.1))"
            : "radial-gradient(circle at 40% 35%, rgba(200,168,64,0.12), rgba(138,110,42,0.08) 60%, transparent)",
          boxShadow: isActive
            ? "0 0 0 3px rgba(212,168,67,0.35), 0 0 35px rgba(212,168,67,0.45), 0 4px 24px rgba(0,0,0,0.5)"
            : "0 0 0 2px rgba(212,168,67,0.15), 0 4px 20px rgba(0,0,0,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "box-shadow 0.3s ease",
          overflow: "hidden",
          padding: 0,
        }}
        title={isActive ? "End conversation" : "Talk to AiiA"}
      >
        {/* Pulse ring when active */}
        {isActive && (
          <motion.div
            style={{
              position: "absolute",
              inset: "-8px",
              borderRadius: "50%",
              border: "2px solid rgba(212,168,67,0.5)",
            }}
            animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
          />
        )}
        {/* Gold microphone artifact icon */}
        {isActive ? (
          /* End call X icon */
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4A843" strokeWidth="2.5" strokeLinecap="round">
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="18" y1="6" x2="6" y2="18" />
          </svg>
        ) : (
          <img
            src={MIC_ICON_URL}
            alt="Talk to AiiA"
            style={{
              width: "52px",
              height: "52px",
              objectFit: "contain",
              filter: "drop-shadow(0 2px 6px rgba(212,168,67,0.4))",
              pointerEvents: "none",
            }}
          />
        )}
      </motion.button>

      {/* Tooltip on idle */}
      {status === "idle" && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.4 }}
          style={{
            fontSize: "10px",
            color: "rgba(212,168,67,0.6)",
            textAlign: "center",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            fontWeight: 600,
            pointerEvents: "none",
          }}
        >
          Talk to AiiA
        </motion.div>
      )}
    </div>
  );
}
