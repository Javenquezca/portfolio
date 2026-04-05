"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Variants } from "framer-motion";

const ROLES = ["Desarrollador Full-Stack", "Investigador en Seguridad", "Ingeniero de Software"];
const TYPING_SPEED = 60;
const DELETING_SPEED = 35;
const PAUSE_MS = 1800;


const glitchVariants: Variants = {
  idle: {
    x: 0,
    skewX: 0,
    opacity: 1,
    textShadow: "none",
  },
  glitch: {
    x: [0, -3, 3, -2, 2, 0],
    skewX: [0, -2, 2, -1, 1, 0],
    opacity: [1, 0.8, 1, 0.85, 1, 1],
    textShadow: [
      "none",
      "3px 0 var(--cyan), -3px 0 rgba(255,0,80,0.6)",
      "-3px 0 var(--cyan), 3px 0 rgba(255,0,80,0.6)",
      "2px 0 var(--cyan), -2px 0 rgba(255,0,80,0.6)",
      "none",
      "none",
    ],
  },
};

const PARTICLE_COUNT = 60;
const CONNECT_DIST   = 120;
const CYAN           = "0, 229, 255";

function ParticleCanvas() {
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

    type Dot = { x: number; y: number; vx: number; vy: number };

    const dots: Dot[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // move & wrap
      for (const d of dots) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0)             d.x = canvas.width;
        if (d.x > canvas.width)  d.x = 0;
        if (d.y < 0)             d.y = canvas.height;
        if (d.y > canvas.height) d.y = 0;
      }

      // connections
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx   = dots[i].x - dots[j].x;
          const dy   = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${CYAN}, ${0.08 * (1 - dist / CONNECT_DIST)})`;
            ctx.lineWidth   = 0.6;
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();
          }
        }
      }

      // dots
      for (const d of dots) {
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${CYAN}, 0.15)`;
        ctx.fill();
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
      className="pointer-events-none absolute inset-0"
      style={{ zIndex: 0 }}
    />
  );
}

export default function Hero() {
  const [displayed, setDisplayed] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const glitchControls = useAnimation();

  useEffect(() => {
    const loop = setInterval(async () => {
      await glitchControls.start("glitch");
      glitchControls.start("idle");
    }, 5000);
    return () => clearInterval(loop);
  }, [glitchControls]);

  useEffect(() => {
    const current = ROLES[roleIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayed(current.slice(0, displayed.length + 1));
        if (displayed.length + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), PAUSE_MS);
        }
      } else {
        setDisplayed(current.slice(0, displayed.length - 1));
        if (displayed.length - 1 === 0) {
          setIsDeleting(false);
          setRoleIndex((i) => (i + 1) % ROLES.length);
        }
      }
    }, isDeleting ? DELETING_SPEED : TYPING_SPEED);

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex]);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center overflow-hidden">
      <ParticleCanvas />

      {/* Subtle grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--cyan) 1px, transparent 1px), linear-gradient(90deg, var(--cyan) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Scanline overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(transparent 50%, rgba(0,0,0,0.25) 50%)",
          backgroundSize: "100% 4px",
          zIndex: 1,
        }}
      />

      {/* Content sits above scanlines */}
      <div className="relative z-10 flex flex-col items-center text-center">

      {/* Prompt line */}
      <motion.p
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-4 font-mono text-xs tracking-[0.3em] text-[var(--text-muted)]"
      >
        {/* 
       <span className="text-[var(--cyan)]">~/</span>portafolio
        <span className="ml-1 animate-pulse text-[var(--cyan)]">▮</span>
        */}
      </motion.p>

      {/* Name */}
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={glitchControls}
        variants={glitchVariants}
        onAnimationComplete={() => {}}
        style={{ fontFamily: "var(--font-serif)" }}
        className="font-serif text-7xl font-normal leading-none tracking-tight text-[var(--text-primary)] sm:text-8xl"
      >
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          style={{ display: "inline-block" }}
        >
          JAVIER VÁSQUEZ
        </motion.span>
      </motion.h1>

      {/* Typewriter subtitle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mt-6 h-8 font-mono text-lg tracking-widest sm:text-xl"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        <span style={{ color: "#00e5ff" }} className="glow-cyan">
          {displayed}
        </span>
        <span
          className="ml-[2px] inline-block w-[2px] animate-pulse bg-[#00e5ff]"
          style={{ height: "1.1em", verticalAlign: "text-bottom" }}
        />
      </motion.div>

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
        className="mt-10 h-px w-32 origin-left bg-[var(--cyan)] opacity-40"
      />

      {/* Scroll hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.4 }}
        className="mt-8 font-mono text-xs tracking-[0.2em] text-[var(--text-muted)]"
      >
        SCROLL_ABAJO<span className="ml-1 text-[var(--cyan)]">↓</span>
      </motion.p>

      </div>
    </section>
  );
}
