"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Send } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Status = "idle" | "loading" | "success" | "error";

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [form, setForm] = useState({ nombre: "", email: "", asunto: "", mensaje: "" });
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.nombre || !form.email || !form.mensaje) return;
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ nombre: "", email: "", asunto: "", mensaje: "" });
        setTimeout(onClose, 2000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputStyle = {
    width: "100%",
    background: "var(--bg-elevated)",
    border: "0.5px solid var(--border)",
    borderRadius: 6,
    padding: "8px 12px",
    fontFamily: "var(--font-mono)",
    fontSize: 12,
    color: "var(--text-primary)",
    outline: "none",
    boxSizing: "border-box" as const,
  };

  const labelStyle = {
    fontFamily: "var(--font-mono)",
    fontSize: 10,
    color: "var(--text-muted)",
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    marginBottom: 4,
    display: "block",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: 420,
              background: "var(--bg-surface)",
              border: "0.5px solid var(--border)",
              borderRadius: 12,
              overflow: "hidden",
              margin: "0 16px",
            }}
          >
            {/* Header */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 16px",
              borderBottom: "0.5px solid var(--border)",
              background: "var(--bg-elevated)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57", display: "inline-block" }} />
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e", display: "inline-block" }} />
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840", display: "inline-block" }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)", marginLeft: 8, letterSpacing: "0.1em" }}>
                  contacto.sh
                </span>
              </div>
              <button
                onClick={onClose}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", display: "flex" }}
              >
                <X size={14} strokeWidth={1.5} />
              </button>
            </div>

            {/* Form */}
            <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={labelStyle}>Nombre *</label>
                <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Tu nombre" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Email *</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="tu@email.com" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Asunto</label>
                <input name="asunto" value={form.asunto} onChange={handleChange} placeholder="¿En qué te puedo ayudar?" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Mensaje *</label>
                <textarea
                  name="mensaje"
                  value={form.mensaje}
                  onChange={handleChange}
                  placeholder="Cuéntame más..."
                  rows={4}
                  style={{ ...inputStyle, resize: "none" }}
                />
              </div>

              {status === "success" && (
                <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#28c840", textAlign: "center" }}>
                  ✓ Mensaje enviado correctamente
                </p>
              )}
              {status === "error" && (
                <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#ff5f57", textAlign: "center" }}>
                  ✗ Error al enviar. Intenta de nuevo.
                </p>
              )}

              <button
                onClick={handleSubmit}
                disabled={status === "loading"}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  color: status === "loading" ? "var(--text-muted)" : "var(--cyan)",
                  background: "transparent",
                  border: `0.5px solid ${status === "loading" ? "var(--border)" : "var(--cyan)"}`,
                  borderRadius: 6,
                  padding: "8px 16px",
                  cursor: status === "loading" ? "not-allowed" : "pointer",
                  transition: "background 0.2s ease",
                  width: "100%",
                }}
                onMouseEnter={(e) => { if (status !== "loading") e.currentTarget.style.background = "var(--cyan-dim)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
              >
                <Send size={12} strokeWidth={1.5} />
                {status === "loading" ? "Enviando..." : "Enviar mensaje"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}