"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Flag, Wifi } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";


type Status = "Completed" | "In Progress" | "Acknowledged";

interface Audit {
  icon: React.ElementType;
  title: string;
  description: string;
  tools: string[];
  status: Status;
}

const audits: Audit[] = [
  {
    icon: ShieldCheck,
    title: "Reconocimiento Web",
    description: "Engagement completo de reconocimiento sobre una aplicación web objetivo: directory busting, mapeo de puertos y análisis de tráfico interceptado con Burp Suite.",
    tools: ["Nmap", "Gobuster", "Burp Suite"],
    status: "Completed",
  },
  {
    icon: Flag,
    title: "CTF — TryHackMe",
    description: "Sala capture-the-flag con escalada de privilegios, cracking de hashes y ejecución remota de código a través de un servicio vulnerable.",
    tools: ["Metasploit", "John the Ripper"],
    status: "Completed",
  },
  {
    icon: Wifi,
    title: "Lab de Escaneo de Red",
    description: "Entorno de laboratorio controlado para análisis pasivo y activo de redes, captura de tráfico y disección de protocolos en subredes segmentadas.",
    tools: ["Wireshark", "Nmap"],
    status: "In Progress",
  },
  {
    icon: ShieldCheck,
    title: "Meta Bug Bounty — WhatsApp",
    description: "Reporte de vulnerabilidad de privacidad en WhatsApp Android v2.26.3.79 enviado al programa de Bug Bounty de Meta.",
    tools: ["Android 15", "Burp Suite", "ADB", "Windows 11"],
    status: "Completed",
  },
];

const statusConfig: Record<Status, { dot: string; label: string }> = {
  Completed: { dot: "#28c840", label: "completado" },
  "In Progress": { dot: "#febc2e", label: "en_progreso" },
  "Acknowledged": { dot: "#a78bfa", label: "acknowledged" },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.42 } },
};

export default function SecurityAudits() {

  const { scrollRef, scroll } = useInfiniteScroll();

  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-20">
      <p className="font-mono text-[var(--cyan)] text-xs tracking-widest uppercase mb-2">
        ./security-audits
      </p>
      <h2 className="font-serif text-3xl text-[var(--text-primary)] mb-10">
        Auditorías de Seguridad
      </h2>

      <div className="flex justify-end gap-2 mb-4">
        <button
          onClick={() => scroll("left")}
          className="flex items-center justify-center w-8 h-8 rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--cyan)] hover:border-[var(--cyan)] transition-colors duration-200"
        >
          <ChevronLeft size={16} strokeWidth={1.5} />
        </button>
        <button
          onClick={() => scroll("right")}
          className="flex items-center justify-center w-8 h-8 rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--cyan)] hover:border-[var(--cyan)] transition-colors duration-200"
        >
          <ChevronRight size={16} strokeWidth={1.5} />
        </button>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-hidden pb-4"
        style={{ scrollbarWidth: "none" as const }}
      >
        {audits.map(({ icon: Icon, title, description, tools, status }) => {
          const { dot, label } = statusConfig[status];
          return (
            <motion.div
              key={title}
              variants={item}
              className="group relative flex flex-col rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] overflow-hidden transition-all duration-300 hover:border-[var(--cyan)] hover:glow-box-cyan shrink-0 w-[320px]"
              style={{ transition: "box-shadow 0.3s ease, border-color 0.3s ease" }}
              whileHover={{
                boxShadow: "0 0 0 1px var(--cyan), 0 0 20px var(--cyan-dim)",
              }}
            >

              {/* Terminal header bar */}
              <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--border)] bg-[var(--bg-elevated)]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: dot,
                      boxShadow: `0 0 6px ${dot}`,
                      animation: status === "In Progress" ? "blink-dot 1.2s step-start infinite" : "none",
                    }}
                  />
                  <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-muted)]">
                    {label}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="relative z-10 flex flex-col gap-4 p-5 flex-1">
                {/* ambient glow */}
                <div className="pointer-events-none absolute -top-6 -right-6 h-28 w-28 rounded-full bg-[var(--cyan-dim)] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-9 h-9 rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--cyan)] shrink-0">
                    <Icon size={17} strokeWidth={1.5} />
                  </span>
                  <h3 className="font-mono text-sm font-medium text-[var(--text-primary)] leading-snug">
                    {title}
                  </h3>
                </div>

                <p className="font-mono text-xs text-[var(--text-muted)] leading-relaxed flex-1">
                  {description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {tools.map((tool) => (
                    <span
                      key={tool}
                      className="font-mono text-[10px] tracking-wide uppercase px-2 py-0.5 rounded border border-[var(--border)] text-[var(--cyan)] bg-[var(--cyan-dim)]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <style>{`
        @keyframes blink-dot {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.2; }
        }
      `}</style>
    </section>
  );
}
