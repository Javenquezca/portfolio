import Hero from '@/components/sections/Hero';
import BentoGrid from '@/components/sections/BentoGrid';
import About from '@/components/sections/About';
import Terminal from '@/components/sections/Terminal';
import Projects from '@/components/sections/Projects';
import SecurityAudits from '@/components/sections/SecurityAudits';
import Footer from '@/components/sections/Footer';
import KonamiMatrix from '@/components/KonamiMatrix';

export default function Home() {
  return (
    <main className="bg-[#050505] min-h-screen">
      <KonamiMatrix />

      <Hero />
      
      <div className="max-w-6xl mx-auto px-6 space-y-32 pb-16">
        
        <About />

        <Terminal />
        
        <section>
          <h2 className="font-mono text-xs tracking-[0.3em] text-[var(--text-muted)] mb-8 uppercase">
            // tech_stack
          </h2>
          <BentoGrid />
        </section>

        <section>
          <h2 className="font-mono text-xs tracking-[0.3em] text-[var(--text-muted)] mb-8 uppercase">
            // active_projects
          </h2>
          <Projects />
        </section>

        <SecurityAudits />
      </div>

      <Footer /> {/* <-- Añadido al final */}
    </main>
  );
}