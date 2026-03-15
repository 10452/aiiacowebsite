import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "aiiaco_cookie_consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show after a short delay if no consent stored
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, "declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          style={{
            position: "fixed",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 9999,
            width: "calc(100% - 32px)",
            maxWidth: "520px",
            background: "rgba(12, 14, 20, 0.92)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(212, 168, 67, 0.15)",
            borderRadius: "14px",
            padding: "14px 18px",
            display: "flex",
            alignItems: "center",
            gap: "14px",
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          }}
        >
          <p
            style={{
              flex: 1,
              margin: 0,
              fontSize: "13px",
              lineHeight: 1.45,
              color: "rgba(200, 215, 230, 0.75)",
            }}
          >
            We use cookies for analytics.{" "}
            <a
              href="/privacy"
              style={{
                color: "rgba(212, 168, 67, 0.85)",
                textDecoration: "underline",
                textUnderlineOffset: "2px",
              }}
            >
              Privacy Policy
            </a>
          </p>
          <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
            <button
              onClick={decline}
              style={{
                fontSize: "12px",
                fontWeight: 500,
                color: "rgba(200, 215, 230, 0.55)",
                background: "none",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                padding: "7px 14px",
                cursor: "pointer",
                transition: "border-color 0.15s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")
              }
            >
              Decline
            </button>
            <button
              onClick={accept}
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "#03050A",
                background: "var(--gold-bright, #D4A843)",
                border: "none",
                borderRadius: "8px",
                padding: "7px 16px",
                cursor: "pointer",
                transition: "opacity 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Accept
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
