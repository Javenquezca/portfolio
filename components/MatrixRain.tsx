"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const CHARS =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン" +
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

const FONT_SIZE  = 14;
const CYAN_R     = 0;
const CYAN_G     = 229;
const CYAN_B     = 255;
const ACTIVE_MS  = 4000;
const FADE_MS    = 800;

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

function MatrixCanvas({ opacity }: { opacity: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const cols = Math.floor(canvas.width / FONT_SIZE);
    // y position (in rows) for each column's leading drop
    const drops = Array.from({ length: cols }, () =>
      Math.floor(Math.random() * -(canvas.height / FONT_SIZE))
    );

    const draw = () => {
      // translucent black trail
      ctx.fillStyle = "rgba(5,5,5,0.18)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${FONT_SIZE}px 'DM Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const y = drops[i];
        if (y < 0) { drops[i]++; continue; }

        const posY = y * FONT_SIZE;

        // leading char — bright white-cyan
        ctx.fillStyle = `rgba(220, 255, 255, 0.95)`;
        ctx.fillText(randomChar(), i * FONT_SIZE, posY);

        // body chars — cyan with gradient fade
        for (let t = 1; t <= 20; t++) {
          const by = posY - t * FONT_SIZE;
          if (by < 0) break;
          const alpha = Math.max(0, 0.85 - t * 0.04);
          ctx.fillStyle = `rgba(${CYAN_R},${CYAN_G},${CYAN_B},${alpha})`;
          ctx.fillText(randomChar(), i * FONT_SIZE, by);
        }

        // advance or reset column
        if (posY > canvas.height && Math.random() > 0.975) {
          drops[i] = Math.floor(Math.random() * -20);
        } else {
          drops[i]++;
        }
      }

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "none",
        opacity,
        transition: `opacity ${FADE_MS}ms ease-out`,
      }}
    />
  );
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useMatrixRain() {
  const [phase, setPhase] = useState<"off" | "on" | "fading">("off");

  const trigger = useCallback(() => {
    if (phase !== "off") return;
    setPhase("on");

    setTimeout(() => setPhase("fading"), ACTIVE_MS);
    setTimeout(() => setPhase("off"),    ACTIVE_MS + FADE_MS);
  }, [phase]);

  const opacity = phase === "on" ? 1 : 0;

  const node =
    phase !== "off" ? <MatrixCanvas opacity={opacity} /> : null;

  return { trigger, node };
}

// ─── Konami listener ─────────────────────────────────────────────────────────

const KONAMI = [
  "ArrowUp","ArrowUp",
  "ArrowDown","ArrowDown",
  "ArrowLeft","ArrowRight",
  "ArrowLeft","ArrowRight",
  "j","v",
];

export function useKonamiCode(onMatch: () => void) {
  const buf = useRef<string[]>([]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      buf.current = [...buf.current, e.key].slice(-KONAMI.length);
      if (buf.current.join(",") === KONAMI.join(",")) {
        onMatch();
        buf.current = [];
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onMatch]);
}
