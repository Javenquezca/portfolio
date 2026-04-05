"use client";

import { motion } from "framer-motion";
import { Layers, Database, Shield, Server } from "lucide-react";

interface Skill { label: string; pct: number; }

const cards = [
  {
    icon: Layers,
    title: "Full-Stack",
    subtitle: "React / Node.js",
    description: "Desarrollo de aplicaciones web completas con React moderno y backends escalables en Node.js.",
    skills: [
      { label: "React", pct: 75 },
      { label: "Node.js", pct: 70 },
    ],
    col: "md:col-span-2",
  },
  {
    icon: Database,
    title: "Base de Datos",
    subtitle: "MySQL",
    description: "Modelado relacional, optimización de consultas y diseño de esquemas.",
    skills: [
      { label: "MySQL", pct: 65 },
      { label: "Postgresql", pct: 50 },
    ],
    col: "md:col-span-1",
  },
  {
    icon: Shield,
    title: "Seguridad",
    subtitle: "Parrot OS / Pentesting",
    description: "Auditorías de seguridad ofensiva, evaluación de vulnerabilidades y retos CTF.",
    skills: [
      { label: "Python", pct: 70 },
      { label: "Linux/Parrot", pct: 65 },
      { label: "Nmap", pct: 60 },
      { label: "Burp Suite", pct: 50 },
    ],
    col: "md:col-span-1",
  },
  {
    icon: Server,
    title: "Infraestructura",
    subtitle: "Vercel / Railway",
    description: "Pipelines CI/CD, despliegues en edge y servicios backend en contenedores.",
    skills: [
      { label: "Postgresql", pct: 50 },
      { label: "MySQL", pct: 65 },
    ],
    col: "md:col-span-2",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function SkillBar({ label, pct }: Skill) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
          {label}
        </span>
        <motion.span
          className="font-mono text-[10px] text-[var(--cyan)]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.3 }}
        >
          {pct}%
        </motion.span>
      </div>
      <div
        className="w-full h-[3px] rounded-full overflow-hidden"
        style={{ background: "var(--bg-elevated)" }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: "var(--cyan)" }}
          initial={{ width: "0%" }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export default function BentoGrid() {
  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-20">
      <p className="font-mono text-[var(--cyan)] text-xs tracking-widest uppercase mb-2">
        ./stack-tecnologico
      </p>
      <h2 className="font-serif text-3xl text-[var(--text-primary)] mb-10">
        Con qué trabajo
      </h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
      >
        {cards.map(({ icon: Icon, title, subtitle, description, skills, col }) => (
          <motion.div
            key={title}
            variants={item}
            className={`${col} group relative rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-6 overflow-hidden transition-colors duration-300 hover:border-[var(--cyan)] hover:bg-[var(--bg-elevated)]`}
          >
            <div className="pointer-events-none absolute -top-10 -left-10 h-32 w-32 rounded-full bg-[var(--cyan-dim)] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 flex flex-col gap-4 h-full">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-9 h-9 rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--cyan)]">
                  <Icon size={18} strokeWidth={1.5} />
                </span>
                <div>
                  <p className="font-mono text-[var(--text-primary)] text-sm font-medium leading-none">
                    {title}
                  </p>
                  <p className="font-mono text-[var(--text-muted)] text-xs mt-0.5">
                    {subtitle}
                  </p>
                </div>
              </div>

              <p className="font-mono text-[var(--text-muted)] text-sm leading-relaxed flex-1">
                {description}
              </p>

              <div className="flex flex-col gap-3">
                {skills.map((s) => (
                  <SkillBar key={s.label} {...s} />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
