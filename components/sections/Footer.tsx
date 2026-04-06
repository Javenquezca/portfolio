"use client";

import { useEffect, useState } from "react";
import { Code2 as Github, Info as Linkedin, ArrowUp, CreditCard } from "lucide-react";
import CardModal from "@/components/CardModal";
import ContactModal from "../ContactModal";

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/Javenquezca" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/javier-stiven-vasquez-claros-85547525a/?skipRedirect=true" },
];

export default function Footer() {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    const handler = () => setIsCardOpen(true);
    window.addEventListener("open-card", handler);
    return () => window.removeEventListener("open-card", handler);
  }, []);

  return (
    <>
      <CardModal isOpen={isCardOpen} onClose={() => setIsCardOpen(false)} />

      <footer className="w-full border-t border-[var(--border)] bg-[var(--bg-surface)]">
        <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[var(--text-muted)] text-xs">
            © 2026 Javier Vásquez
          </p>

          <div className="flex items-center gap-6">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-[var(--text-muted)] hover:text-[var(--cyan)] transition-colors duration-200"
              >
                <Icon size={16} strokeWidth={1.5} />
              </a>
            ))}

            <button
              onClick={() => setIsCardOpen(true)}
              className="flex items-center gap-1.5 font-mono text-xs text-[var(--text-muted)] hover:text-[var(--cyan)] transition-colors duration-200"
            >
              <CreditCard size={14} strokeWidth={1.5} />
              Tarjeta de presentación
            </button>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Volver arriba"
              className="flex items-center gap-1.5 font-mono text-xs text-[var(--text-muted)] hover:text-[var(--cyan)] transition-colors duration-200"
            >
              <ArrowUp size={14} strokeWidth={1.5} />
              Arriba
            </button>

            <button onClick={() => setContactOpen(true)} className="...">
              Contactar
            </button>

            <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
          </div>
        </div>
      </footer>
    </>
  );
}
