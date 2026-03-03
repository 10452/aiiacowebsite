/*
 * AiiACo — Read Aloud Button
 * Uses ElevenLabs Rachel voice via server-side TTS proxy.
 * Reads the page section by section with elegant play/pause/stop controls.
 */
import { useState, useRef, useCallback, useEffect } from "react";
import { trpc } from "@/lib/trpc";

type ReadState = "idle" | "loading" | "playing" | "paused";

// ── Collect readable text from the page ──────────────────────────────────────

function collectPageSections(): string[] {
  const selectors = [
    "#hero",
    "#platform",
    "#method",
    "#after-upgrade",
    "#results",
    "#industries",
    "#case-studies",
    "#models",
    "#principles",
    "#contact",
  ];

  const sections: string[] = [];

  for (const sel of selectors) {
    const el = document.querySelector(sel);
    if (!el) continue;
    const raw = el.textContent ?? "";
    // Collapse whitespace and trim
    const clean = raw.replace(/\s+/g, " ").trim();
    if (clean.length > 40) {
      // Split into ~2500-char chunks to stay under API limit
      const chunks = splitIntoChunks(clean, 2500);
      sections.push(...chunks);
    }
  }

  // Fallback: if no sections found, grab main content
  if (sections.length === 0) {
    const main = document.querySelector("main") ?? document.body;
    const raw = (main.textContent ?? "").replace(/\s+/g, " ").trim();
    sections.push(...splitIntoChunks(raw, 2500));
  }

  return sections;
}

function splitIntoChunks(text: string, maxLen: number): string[] {
  const chunks: string[] = [];
  let remaining = text;
  while (remaining.length > 0) {
    if (remaining.length <= maxLen) {
      chunks.push(remaining);
      break;
    }
    // Find a sentence boundary near maxLen
    let cut = remaining.lastIndexOf(". ", maxLen);
    if (cut < maxLen * 0.5) cut = remaining.lastIndexOf(" ", maxLen);
    if (cut < 0) cut = maxLen;
    chunks.push(remaining.slice(0, cut + 1).trim());
    remaining = remaining.slice(cut + 1).trim();
  }
  return chunks.filter(c => c.length > 0);
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function ReadAloud() {
  const [state, setState] = useState<ReadState>("idle");
  const [sectionIndex, setSectionIndex] = useState(0);
  const [sections, setSections] = useState<string[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sectionsRef = useRef<string[]>([]);
  const indexRef = useRef(0);
  const stoppedRef = useRef(false);

  const synthesize = trpc.tts.synthesize.useMutation();

  // ── Audio playback ──────────────────────────────────────────────────────────

  const playAudioBase64 = useCallback((base64: string, mimeType: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const blob = base64ToBlob(base64, mimeType);
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onended = () => {
        URL.revokeObjectURL(url);
        resolve();
      };
      audio.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error("Audio playback error"));
      };
      audio.play().catch(reject);
    });
  }, []);

  // ── Read sections sequentially ──────────────────────────────────────────────

  const readFrom = useCallback(async (startIndex: number, sectionList: string[]) => {
    stoppedRef.current = false;
    for (let i = startIndex; i < sectionList.length; i++) {
      if (stoppedRef.current) break;
      indexRef.current = i;
      setSectionIndex(i);
      setState("loading");

      try {
        const result = await synthesize.mutateAsync({ text: sectionList[i] });
        if (stoppedRef.current) break;
        setState("playing");
        await playAudioBase64(result.audio, result.mimeType);
        if (stoppedRef.current) break;
      } catch (err) {
        console.error("[ReadAloud] Error:", err);
        setState("idle");
        return;
      }
    }
    if (!stoppedRef.current) {
      setState("idle");
      setSectionIndex(0);
      indexRef.current = 0;
    }
  }, [synthesize, playAudioBase64]);

  // ── Controls ────────────────────────────────────────────────────────────────

  const handlePlay = useCallback(() => {
    const collected = collectPageSections();
    setSections(collected);
    sectionsRef.current = collected;
    indexRef.current = 0;
    setSectionIndex(0);
    readFrom(0, collected);
  }, [readFrom]);

  const handlePause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setState("paused");
    }
  }, []);

  const handleResume = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play();
      setState("playing");
    }
  }, []);

  const handleStop = useCallback(() => {
    stoppedRef.current = true;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setState("idle");
    setSectionIndex(0);
    indexRef.current = 0;
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stoppedRef.current = true;
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // ── Render ──────────────────────────────────────────────────────────────────

  const totalSections = sections.length || 1;
  const progress = state !== "idle" ? ((sectionIndex / totalSections) * 100) : 0;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
      {/* Progress bar — only visible when active */}
      {state !== "idle" && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: "2px",
            zIndex: 9999,
            background: "rgba(0,0,0,0.2)",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: "linear-gradient(90deg, #B8860B, #FFD700, #B8860B)",
              transition: "width 0.5s ease",
              boxShadow: "0 0 8px rgba(255,215,0,0.7)",
            }}
          />
        </div>
      )}

      {/* Main button */}
      {state === "idle" && (
        <button
          onClick={handlePlay}
          title="Listen to this page — AiiA voice"
          style={btnStyle}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(184,134,11,0.18)"; e.currentTarget.style.color = "#FFD700"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(184,134,11,0.10)"; e.currentTarget.style.color = "rgba(255,215,0,0.80)"; }}
        >
          <SpeakerIcon />
          <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.04em", marginLeft: "5px" }}>LISTEN</span>
        </button>
      )}

      {state === "loading" && (
        <button style={{ ...btnStyle, cursor: "default", opacity: 0.7 }} disabled>
          <PulseIcon />
          <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.04em", marginLeft: "5px" }}>LOADING…</span>
        </button>
      )}

      {(state === "playing" || state === "paused") && (
        <>
          {/* Pause / Resume */}
          <button
            onClick={state === "playing" ? handlePause : handleResume}
            title={state === "playing" ? "Pause" : "Resume"}
            style={iconBtnStyle}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(184,134,11,0.18)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(184,134,11,0.10)"; }}
          >
            {state === "playing" ? <PauseIcon /> : <PlayIcon />}
          </button>

          {/* Stop */}
          <button
            onClick={handleStop}
            title="Stop"
            style={iconBtnStyle}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(184,134,11,0.18)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(184,134,11,0.10)"; }}
          >
            <StopIcon />
          </button>

          {/* Section indicator */}
          <span style={{ fontSize: "10px", color: "rgba(255,215,0,0.55)", fontWeight: 500, letterSpacing: "0.03em", minWidth: "32px" }}>
            {sectionIndex + 1}/{totalSections}
          </span>
        </>
      )}
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const btnStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "4px",
  background: "rgba(184,134,11,0.10)",
  border: "1px solid rgba(255,215,0,0.22)",
  borderRadius: "20px",
  padding: "6px 13px 6px 10px",
  color: "rgba(255,215,0,0.80)",
  cursor: "pointer",
  transition: "background 0.15s, color 0.15s",
  fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif",
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
};

const iconBtnStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "30px",
  height: "30px",
  background: "rgba(184,134,11,0.10)",
  border: "1px solid rgba(255,215,0,0.22)",
  borderRadius: "50%",
  color: "rgba(255,215,0,0.85)",
  cursor: "pointer",
  transition: "background 0.15s",
};

// ── Icons ─────────────────────────────────────────────────────────────────────

function SpeakerIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="4" width="4" height="16" rx="1" />
      <rect x="14" y="4" width="4" height="16" rx="1" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

function StopIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <rect x="4" y="4" width="16" height="16" rx="2" />
    </svg>
  );
}

function PulseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "spin 1s linear infinite" }}>
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function base64ToBlob(base64: string, mimeType: string): Blob {
  const byteChars = atob(base64);
  const byteNumbers = new Array(byteChars.length);
  for (let i = 0; i < byteChars.length; i++) {
    byteNumbers[i] = byteChars.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray.buffer as ArrayBuffer], { type: mimeType });
}
