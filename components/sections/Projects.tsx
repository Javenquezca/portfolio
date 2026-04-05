"use client";

import { ExternalLink, Code2, GitBranch as Github, Zap, FlaskConical, ChevronLeft, ChevronRight  } from "lucide-react";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";


const projects = [
  {
    icon: Zap,
    name: "GoZipp",
    tagline: "Plataforma de servicio moto-taxi",
    description:
      "Aplicación móvil full-stack que conecta pasajeros con conductores de moto-taxi en tiempo real. Gestiona reservas, rastreo en vivo, cálculo de tarifas y perfiles de conductor/pasajero.",
    tags: ["React Native", "Node.js", "MySQL", "REST API", "JWT"],
    status: "En Desarrollo",
    statusColor: "text-[var(--cyan)]",
    links: {
      github: "#",
      live: null,
    },
  },
  {
    icon: FlaskConical,
    name: "AI Waste Classifier",
    tagline: "Investigación y Documentación",
    description:
      "Investigación académica y documentación técnica sobre enfoques de machine learning para clasificación automatizada de residuos, cubriendo curación de datasets, selección de modelos y métricas de evaluación.",
    tags: ["Python", "TensorFlow", "Computer Vision", "Investigación", "Docs"],
    status: "Fase de Investigación",
    statusColor: "text-[var(--text-muted)]",
    links: {
      github: "#",
      live: null,
    },
  },
  {
    icon: Code2,
    name: "Iglesia App",
    tagline: "Sistema de gestión para iglesias",
    description:
      "Sistema fullstack para gestión de personal, tareas y solicitudes de servicio. SPA en React con API REST en Express.js y PostgreSQL. Incluye sistema de roles (pastor/supervisor/servidor), autenticación JWT y soporte i18n ES/EN.",
    tags: ["React", "Node.js", "Express", "PostgreSQL", "JWT", "Tailwind"],
    status: "En Producción",
    statusColor: "text-[#28c840]",
    links: {
      github: "#",
      live: null,
    },
  },
];

export default function Projects() {
  
  const { scrollRef, scroll } = useInfiniteScroll();
  
  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-20">
      <p className="font-mono text-[var(--cyan)] text-xs tracking-widest uppercase mb-2">
        ./projects
      </p>
      <h2 className="font-serif text-3xl text-[var(--text-primary)] mb-10">
        Trabajo Seleccionado
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
        className="flex gap-6 overflow-x-hidden pb-4"
        style={{ scrollbarWidth: "none" as const }}
      >
        {projects.map(({ icon: Icon, name, tagline, description, tags, status, statusColor, links }) => (
          <div
            key={name}
            className="group relative flex flex-col rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-6 overflow-hidden transition-all duration-300 hover:border-[var(--cyan)] hover:bg-[var(--bg-elevated)] shrink-0 w-[380px]"
            style={{
              transition: "box-shadow 0.3s ease, border-color 0.3s ease, background-color 0.3s ease",
            }}
          >
            {/* ambient glow blob */}
            <div className="pointer-events-none absolute -bottom-8 -right-8 h-40 w-40 rounded-full bg-[var(--cyan-dim)] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 flex flex-col gap-5 h-full">
              {/* header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--cyan)] shrink-0">
                    <Icon size={20} strokeWidth={1.5} />
                  </span>
                  <div>
                    <h3 className="font-serif text-xl text-[var(--text-primary)] leading-tight">
                      {name}
                    </h3>
                    <p className="font-mono text-[var(--text-muted)] text-xs mt-0.5">
                      {tagline}
                    </p>
                  </div>
                </div>

                <span className={`font-mono text-[10px] uppercase tracking-widest ${statusColor} border border-[var(--border)] px-2 py-1 rounded shrink-0`}>
                  {status}
                </span>
              </div>

              {/* description */}
              <p className="font-mono text-[var(--text-muted)] text-sm leading-relaxed flex-1">
                {description}
              </p>

              {/* tags */}
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] tracking-wide uppercase px-2 py-0.5 rounded border border-[var(--border)] text-[var(--cyan)] bg-[var(--cyan-dim)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* links */}
              <div className="flex items-center gap-4 pt-1 border-t border-[var(--border)]">
                {links.github && (
                  <a
                    href={links.github}
                    aria-label={`${name} GitHub`}
                    className="flex items-center gap-1.5 font-mono text-xs text-[var(--text-muted)] hover:text-[var(--cyan)] transition-colors duration-200"
                  >
                    <Github size={14} strokeWidth={1.5} />
                    Código
                  </a>
                )}
                {links.live && (
                  <a
                    href={links.live}
                    aria-label={`${name} live`}
                    className="flex items-center gap-1.5 font-mono text-xs text-[var(--text-muted)] hover:text-[var(--cyan)] transition-colors duration-200"
                  >
                    <ExternalLink size={14} strokeWidth={1.5} />
                    Live
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
