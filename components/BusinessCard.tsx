"use client";
import { useState } from "react";

export default function BusinessCard() {

  const [flipped, setFlipped] = useState(false);

  return (
    <div style={{ perspective: "1000px", width: 340, height: 190 }}
    onClick={() => setFlipped((f) => !f)}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          transition: "transform 0.6s ease",
          cursor: "pointer",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
        className="business-card-inner"
      >
        {/* Front */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            background: "#0a0a0a",
            border: "0.5px solid #2a2a2a",
            borderRadius: 12,
            overflow: "hidden",
            fontFamily: "var(--font-mono)",
            boxSizing: "border-box",
          }}
        >
          {/* Cyan accent line */}
          <div style={{ height: 2, background: "#00e5ff", width: "100%" }} />

          <div style={{ padding: "14px 18px 14px 18px", height: "calc(100% - 2px)", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            {/* Top: name + title + services */}
            <div>
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 22,
                  color: "#ffffff",
                  letterSpacing: "0.02em",
                  lineHeight: 1.1,
                  marginBottom: 5,
                }}
              >
                JAVIER VÁSQUEZ
              </div>
              <div
                style={{
                  fontSize: 9,
                  color: "#00e5ff",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  marginBottom: 3,
                }}
              >
                Desarrollador Web &amp; Consultor en Ciberseguridad
              </div>
              <div
                style={{
                  fontSize: 8,
                  color: "#aaaaaa",
                  letterSpacing: "0.06em",
                }}
              >
                Diseño Web · Full-Stack · Auditoría Web
              </div>
            </div>

            {/* Contact rows */}
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <ContactRow icon="email" text="jastivenv@gmail.com" />
              <ContactRow icon="phone" text="+57 3207593597" />
              <ContactRow icon="globe" text="portfolio-pearl-six-15.vercel.app" />
            </div>

            {/* Bottom-right cyan dot */}
            <div style={{ position: "absolute", bottom: 14, right: 18, width: 6, height: 6, borderRadius: "50%", background: "#00e5ff" }} />
          </div>
        </div>

        {/* Back */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "#0a0a0a",
            border: "0.5px solid #2a2a2a",
            borderRadius: 12,
            overflow: "hidden",
            fontFamily: "var(--font-mono)",
            boxSizing: "border-box",
          }}
        >
          {/* Decorative rings bottom-right */}
          <div
            style={{
              position: "absolute",
              bottom: -40,
              right: -40,
              width: 160,
              height: 160,
              borderRadius: "50%",
              border: "1px solid #1e1e1e",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -15,
              right: -15,
              width: 100,
              height: 100,
              borderRadius: "50%",
              border: "1px solid #252525",
              pointerEvents: "none",
            }}
          />

          {/* Top-right cyan dot */}
          <div style={{ position: "absolute", top: 14, right: 18, width: 6, height: 6, borderRadius: "50%", background: "#00e5ff" }} />

          {/* JV Monogram centered */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="0" height="0" style={{ position: "absolute" }}>
              <defs>
                <linearGradient id="jGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#00e5ff" />
                </linearGradient>
                <linearGradient id="vGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00e5ff" />
                  <stop offset="100%" stopColor="#ffffff" />
                </linearGradient>
              </defs>
            </svg>
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 90,
                letterSpacing: "-5px",
                lineHeight: 1,
                userSelect: "none",
              }}
            >
              <span style={{ background: "linear-gradient(90deg, #ffffff, #00e5ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>J</span>
              <span style={{ background: "linear-gradient(90deg, #00e5ff, #ffffff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>V</span>
            </span>
          </div>

          {/* Tagline bottom-left */}
          <div
            style={{
              position: "absolute",
              bottom: 14,
              left: 18,
              fontSize: 8,
              color: "#666666",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              fontFamily: "var(--font-mono)",
            }}
          >
            Construyendo tu presencia digital
          </div>
        </div>
      </div>

    </div>
  );
}

function ContactRow({ icon, text }: { icon: "email" | "phone" | "globe"; text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <span style={{ flexShrink: 0, color: "#00e5ff", display: "flex", alignItems: "center" }}>
        {icon === "email" && (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        )}
        {icon === "phone" && (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" />
          </svg>
        )}
        {icon === "globe" && (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        )}
      </span>
      <span style={{ fontSize: 8, color: "#cccccc", letterSpacing: "0.04em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {text}
      </span>
    </div>
  );
}
