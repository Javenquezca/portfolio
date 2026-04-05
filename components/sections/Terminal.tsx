"use client";

import { useEffect, useRef, useState, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

type LineType = "command" | "output" | "error" | "accent";

interface Line {
  id: number;
  type: LineType;
  text: string;
}

let idCounter = 0;
const uid = () => ++idCounter;

const COMMANDS: Record<string, Line[]> = {
  help: [
    { id: 0, type: "accent", text: "Comandos disponibles:" },
    { id: 0, type: "output", text: "  whoami              → bio y trasfondo" },
    { id: 0, type: "output", text: "  skills --list       → habilidades técnicas" },
    { id: 0, type: "output", text: "  projects --show     → proyectos activos" },
    { id: 0, type: "output", text: "  audits --show       → auditorías de seguridad" },
    { id: 0, type: "output", text: "  contact --info      → cómo contactarme" },
    { id: 0, type: "output", text: "  card --show         → tarjeta de presentación" },
    { id: 0, type: "output", text: "  clear               → limpiar terminal" },
    { id: 0, type: "output", text: "  help                → mostrar este menú" },
  ],
  whoami: [
    { id: 0, type: "accent", text: "javier@portafolio ~ whoami" },
    { id: 0, type: "output", text: "" },
    { id: 0, type: "output", text: "  Hola! Soy Javier Vásquez — Desarrollador Full-Stack & Investigador en Seguridad." },
    { id: 0, type: "output", text: "  Apasionado por construir productos web/móviles robustos y" },
    { id: 0, type: "output", text: "  encontrar lo que los rompe. Cómodo en todo el stack:" },
    { id: 0, type: "output", text: "  desde UIs en React Native hasta esquemas MySQL y cajas Linux." },
    { id: 0, type: "output", text: "" },
    { id: 0, type: "output", text: "  Actualmente trabajando en GoZipp e investigación en seguridad." },
  ],
  "skills --list": [
    { id: 0, type: "accent", text: "─── Lenguajes ───────────────────────────────" },
    { id: 0, type: "output", text: "  [█████████░] Python       ████ avanzado" },
    { id: 0, type: "output", text: "  [████████░░] JavaScript   ████ avanzado" },
    { id: 0, type: "output", text: "  [███████░░░] TypeScript   ███  competente" },
    { id: 0, type: "output", text: "  [██████░░░░] SQL          ███  competente" },
    { id: 0, type: "accent", text: "─── Frameworks ──────────────────────────────" },
    { id: 0, type: "output", text: "  [█████████░] React / Next.js" },
    { id: 0, type: "output", text: "  [████████░░] Node.js / Express" },
    { id: 0, type: "output", text: "  [███████░░░] React Native" },
    { id: 0, type: "accent", text: "─── Seguridad ───────────────────────────────" },
    { id: 0, type: "output", text: "  [█████████░] Nmap / reconocimiento de redes" },
    { id: 0, type: "output", text: "  [███████░░░] Burp Suite / pentesting web" },
    { id: 0, type: "output", text: "  [████████░░] Parrot OS / Kali Linux" },
    { id: 0, type: "output", text: "  [██████░░░░] OWASP Top 10" },
    { id: 0, type: "output", text: "  [██████░░░░] Metasploit básico" },
  ],
  "projects --show": [
    { id: 0, type: "accent", text: "─── GoZipp ──────────────────────────────────" },
    { id: 0, type: "output", text: "  Estado  : En Desarrollo" },
    { id: 0, type: "output", text: "  Stack   : React Native · Node.js · MySQL" },
    { id: 0, type: "output", text: "  Desc    : Plataforma moto-taxi con reservas," },
    { id: 0, type: "output", text: "            rastreo en tiempo real y perfiles." },
    { id: 0, type: "accent", text: "─── AI Waste Classifier ─────────────────────" },
    { id: 0, type: "output", text: "  Estado  : Fase de Investigación" },
    { id: 0, type: "output", text: "  Stack   : Python · TensorFlow · Computer Vision" },
    { id: 0, type: "output", text: "  Desc    : Investigación ML para clasificación" },
    { id: 0, type: "output", text: "            automatizada de residuos." },
    { id: 0, type: "accent", text: "─── Iglesia App ─────────────────────────────" },
    { id: 0, type: "output", text: "  Estado  : En Producción" },
    { id: 0, type: "output", text: "  Stack   : React · Express · PostgreSQL · JWT" },
    { id: 0, type: "output", text: "  Desc    : Sistema de gestión para iglesias con" },
    { id: 0, type: "output", text: "            roles, tareas y solicitudes de servicio." },
  ],
  "audits --show": [
    { id: 0, type: "accent", text: "─── Reconocimiento Web ──────────────────────" },
    { id: 0, type: "output", text: "  Estado  : Completado" },
    { id: 0, type: "output", text: "  Tools   : Nmap · Gobuster · Burp Suite" },
    { id: 0, type: "accent", text: "─── CTF — TryHackMe ─────────────────────────" },
    { id: 0, type: "output", text: "  Estado  : Completado" },
    { id: 0, type: "output", text: "  Tools   : Metasploit · John the Ripper" },
    { id: 0, type: "accent", text: "─── Lab de Escaneo de Red ───────────────────" },
    { id: 0, type: "output", text: "  Estado  : En Progreso" },
    { id: 0, type: "output", text: "  Tools   : Wireshark · Nmap" },
    { id: 0, type: "accent", text: "─── Meta Bug Bounty — WhatsApp ──────────────" },
    { id: 0, type: "output", text: "  Estado  : Completado  [acknowledged by Meta]" },
    { id: 0, type: "output", text: "  Tools   : Android 15 · Burp Suite · ADB" },
    { id: 0, type: "output", text: "  CVE     : FLAG_SECURE bypass en View Once" },
    { id: 0, type: "output", text: "            media durante screen mirroring." },
  ],
  "contact --info": [
    { id: 0, type: "accent", text: "─── Contacto ────────────────────────────────" },
    { id: 0, type: "output", text: "  Email   : hello@javiervasquez.dev" },
    { id: 0, type: "output", text: "  GitHub  : github.com/Javenquezca" },
    { id: 0, type: "output", text: "  LinkedIn: linkedin.com/in/javiervasquez" },
    { id: 0, type: "output", text: "" },
    { id: 0, type: "output", text: "  Abierto a freelance y oportunidades full-time." },
  ],
  "card --show": [
    { id: 0, type: "accent", text: "Abriendo tarjeta de presentación..." },
    { id: 0, type: "output", text: "[ usa el comando para ver la tarjeta en pantalla ]" },
  ],
};

const lineVariant = {
  hidden: { opacity: 0, x: -6 },
  show: { opacity: 1, x: 0, transition: { duration: 0.18 } },
};

const WELCOME: Line[] = [
  { id: uid(), type: "accent", text: "┌─────────────────────────────────────────────┐" },
  { id: uid(), type: "accent", text: "│  javier@portafolio — terminal interactiva   │" },
  { id: uid(), type: "accent", text: "└─────────────────────────────────────────────┘" },
  { id: uid(), type: "output", text: 'Ingresa "help" para ver los comandos disponibles.' },
  { id: uid(), type: "output", text: "" },
];

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>(WELCOME);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (lines.length > WELCOME.length) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [lines]);

  const append = (newLines: Line[]) => {
    setLines((prev) => [
      ...prev,
      ...newLines.map((l) => ({ ...l, id: uid() })),
      { id: uid(), type: "output", text: "" },
    ]);
  };

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();

    const echoLine: Line = { id: uid(), type: "command", text: `$ ${raw.trim()}` };

    if (!cmd) return;

    if (cmd === "clear") {
      setLines(WELCOME);
      return;
    }

    if (COMMANDS[cmd]) {
      append([echoLine, ...COMMANDS[cmd]]);
      if (cmd === "card --show") {
        window.dispatchEvent(new CustomEvent("open-card"));
      }
    } else {
      append([
        echoLine,
        { id: 0, type: "error", text: `comando no encontrado: ${cmd}. Escribe "help" para las opciones.` },
      ]);
    }
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const val = input.trim();
      if (val) setHistory((h) => [val, ...h]);
      setHistIdx(-1);
      run(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHistIdx((i) => {
        const next = Math.min(i + 1, history.length - 1);
        setInput(history[next] ?? "");
        return next;
      });
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setHistIdx((i) => {
        const next = Math.max(i - 1, -1);
        setInput(next === -1 ? "" : history[next] ?? "");
        return next;
      });
    }
  };

  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-20">
      <p className="font-mono text-[var(--cyan)] text-xs tracking-widest uppercase mb-2">
        ./terminal
      </p>
      <h2 className="font-serif text-3xl text-[var(--text-primary)] mb-6">
        Consola Interactiva
      </h2>

      {/* Terminal window */}
      <div
        className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] overflow-hidden"
        style={{ fontFamily: "var(--font-mono)" }}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)] bg-[var(--bg-elevated)]">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          <span className="ml-4 text-xs text-[var(--text-muted)] tracking-widest">
            javier@portafolio:~
          </span>
        </div>

        {/* Output area */}
        <div className="h-80 overflow-y-auto px-4 py-4 space-y-0.5 cursor-text scroll-smooth">
          <AnimatePresence initial={false}>
            {lines.map((line) => (
              <motion.p
                key={line.id}
                variants={lineVariant}
                initial="hidden"
                animate="show"
                className={[
                  "text-sm leading-relaxed whitespace-pre",
                  line.type === "command" ? "text-[var(--text-primary)]" : "",
                  line.type === "output" ? "text-[var(--text-muted)]" : "",
                  line.type === "accent" ? "text-[var(--cyan)]" : "",
                  line.type === "error" ? "text-red-400" : "",
                ].join(" ")}
              >
                {line.text}
              </motion.p>
            ))}
          </AnimatePresence>
          <div ref={bottomRef} />
        </div>

        {/* Input row */}
        <div className="flex items-center gap-2 px-4 py-3 border-t border-[var(--border)] bg-[var(--bg-elevated)]">
          <span className="text-[var(--cyan)] text-sm select-none">$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            className="flex-1 bg-transparent text-sm text-[var(--text-primary)] outline-none caret-[var(--cyan)] placeholder:text-[var(--text-muted)]"
            placeholder='escribe un comando...'
            style={{ fontFamily: "var(--font-mono)" }}
          />
          {/* blinking cursor overlay when empty */}
          {input === "" && (
            <span
              className="w-[7px] h-[14px] bg-[var(--cyan)] opacity-80"
              style={{ animation: "blink 1s step-start infinite" }}
            />
          )}
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
