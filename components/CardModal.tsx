"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BusinessCard from "./BusinessCard";
import html2canvas from "html2canvas";

interface CardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CardModal({ isOpen, onClose }: CardModalProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleDownload = async () => {
    const temp = document.createElement("div");
    temp.style.cssText = `
    position: fixed;
    left: -9999px;
    top: 0;
    width: 340px;
    height: 190px;
    background: #0a0a0a;
    border-radius: 12px;
    overflow: hidden;
    font-family: 'DM Mono', monospace;
    box-sizing: border-box;
  `;

    temp.innerHTML = `
    <div style="height:2px;background:#00e5ff;width:100%"></div>
    <div style="padding:14px 18px;height:calc(100% - 2px);box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between">
      <div>
        <div style="font-family:'DM Serif Display',serif;font-size:22px;color:#ffffff;letter-spacing:0.02em;line-height:1.1;margin-bottom:5px">JAVIER VÁSQUEZ</div>
        <div style="font-size:9px;color:#00e5ff;text-transform:uppercase;letter-spacing:0.12em;margin-bottom:3px">Desarrollador Web & Consultor en Ciberseguridad</div>
        <div style="font-size:8px;color:#aaaaaa;letter-spacing:0.06em">Diseño Web · Full-Stack · Auditoría Web</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:5px">
        <div style="display:flex;align-items:center;gap:6px">
          <span style="font-size:8px;color:#00e5ff">✉</span>
          <span style="font-size:8px;color:#cccccc">jastivenv@gmail.com</span>
        </div>
        <div style="display:flex;align-items:center;gap:6px">
          <span style="font-size:8px;color:#00e5ff">✆</span>
          <span style="font-size:8px;color:#cccccc">+57 3207593597</span>
        </div>
        <div style="display:flex;align-items:center;gap:6px">
          <span style="font-size:8px;color:#00e5ff">⊕</span>
          <span style="font-size:8px;color:#cccccc">portfolio-pearl-six-15.vercel.app</span>
        </div>
      </div>
    </div>
    <div style="position:absolute;bottom:14px;right:18px;width:6px;height:6px;border-radius:50%;background:#00e5ff"></div>
  `;

    document.body.appendChild(temp);
    await document.fonts.ready;

    const canvas = await html2canvas(temp, {
      backgroundColor: "#0a0a0a",
      scale: 3,
      width: 340,
      height: 190,
      useCORS: true,
      logging: false,
    });

    document.body.removeChild(temp);

    const link = document.createElement("a");
    link.download = "javier-vasquez-card.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
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
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            style={{ display: "flex", flexDirection: "column", gap: 12 }}
          >
            <div ref={cardRef}>
              <BusinessCard />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={handleDownload}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  color: "var(--cyan)",
                  background: "transparent",
                  border: "0.5px solid var(--cyan)",
                  borderRadius: 6,
                  padding: "6px 14px",
                  cursor: "pointer",
                  transition: "background 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--cyan-dim)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                ↓ Descargar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}