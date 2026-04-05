"use client";

import { useEffect, useRef, useState } from "react";

const PARAGRAPHS = [
  "Soy Javier Vásquez, tecnólogo en Sistemas cursando Ingeniería en Software en Colombia. Llevo dos años programando — primero por curiosidad, luego por convicción.",
  "Mi interés en ciberseguridad nació en mis prácticas universitarias, donde un ingeniero francés me mostró que romper sistemas para protegerlos era un arte. Desde entonces no paré: CTFs, auditorías en laboratorio, y un reporte de vulnerabilidad enviado al equipo de seguridad de Meta.",
  "Me muevo cómodo en los tres equipos — red, blue y purple. Ataco para entender, defiendo para aplicar, y combino ambos para ver el panorama completo.",
  "Hoy trabajo como freelancer y busco seguir creciendo donde el código y la seguridad se cruzan.",
];

const CHAR_MS  = 28;
const PAUSE_MS = 300;

export default function About() {
  const sectionRef                  = useRef<HTMLDivElement>(null);
  const [started, setStarted]       = useState(false);
  const [texts, setTexts]           = useState<string[]>(PARAGRAPHS.map(() => ""));
  const [activePara, setActivePara] = useState(0);
  const [done, setDone]             = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started || done) return;
    if (activePara >= PARAGRAPHS.length) { setDone(true); return; }

    const full    = PARAGRAPHS[activePara];
    const current = texts[activePara];

    if (current.length < full.length) {
      const t = setTimeout(() => {
        setTexts((prev) => {
          const next = [...prev];
          next[activePara] = full.slice(0, current.length + 1);
          return next;
        });
      }, CHAR_MS);
      return () => clearTimeout(t);
    }

    if (activePara < PARAGRAPHS.length - 1) {
      const t = setTimeout(() => setActivePara((p) => p + 1), PAUSE_MS);
      return () => clearTimeout(t);
    }

    setDone(true);
  }, [started, done, activePara, texts]);

  const cursor = (
    <span
      style={{
        display: "inline-block",
        width: "2px",
        height: "1em",
        background: "var(--cyan)",
        verticalAlign: "text-bottom",
        marginLeft: "2px",
        animation: "blink-cursor 1s step-start infinite",
      }}
    />
  );

  return (
    <section ref={sectionRef} className="w-full max-w-5xl mx-auto px-4 py-20">
      <p className="font-mono text-[var(--cyan)] text-xs tracking-widest uppercase mb-2">
        ./sobre-mi
      </p>
      <h2 className="font-serif text-3xl text-[var(--text-primary)] mb-10">
        Sobre Mí
      </h2>

      <div className="flex flex-col gap-6 max-w-3xl">
        {PARAGRAPHS.map((_, i) => {
          const isActive  = i === activePara && !done;
          const isVisible = i <= activePara || done;
          if (!isVisible) return null;
          return (
            <p
              key={i}
              className="font-mono text-sm leading-relaxed"
              style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
            >
              {texts[i]}
              {isActive && cursor}
              {done && i === PARAGRAPHS.length - 1 && cursor}
            </p>
          );
        })}
      </div>

      <style>{`
        @keyframes blink-cursor {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </section>
  );
}