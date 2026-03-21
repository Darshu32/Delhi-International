import { motion } from "framer-motion";
import { TiltCard, GlowCard } from "../components/Interactive";

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.12 }, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } };

const aboutCards = [
  { title: "Vision and mission", icon: <svg className="w-5 h-5 text-accent-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg> },
  { title: "Leadership and trust", icon: <svg className="w-5 h-5 text-accent-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg> },
  { title: "Why parents choose DIS", icon: <svg className="w-5 h-5 text-accent-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg> },
];

export default function AboutPage() {
  return (
    <main>
      <section className="bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-20">
          <motion.div className="max-w-2xl" {...fadeUp}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-[11px] font-bold text-accent-dark uppercase tracking-wider border border-accent/20 mb-4">About Delhi International School</span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary leading-tight mb-4">A values-first school story designed to grow stronger with your final content.</h1>
            <p className="text-sm md:text-base text-text-secondary leading-relaxed">This page is now structured for the client-ready About section. When you send the final copy, we can drop in the school vision, management story, milestones, philosophy, and trust-building content without redesigning the page again.</p>
          </motion.div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 md:px-6 -mt-6 relative z-10 pb-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {aboutCards.map((item, i) => (
            <TiltCard key={item.title} intensity={10}>
              <GlowCard>
                <motion.article className="group p-5 md:p-7 rounded-2xl bg-white border border-border shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300" {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }}>
                  <div className="w-10 h-10 mb-4 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 grid place-items-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="font-display text-lg md:text-xl font-bold text-text-primary mb-2">{item.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">Reserved for your final approved content, with strong visual hierarchy and hover-ready card styling.</p>
                </motion.article>
              </GlowCard>
            </TiltCard>
          ))}
        </div>
      </section>
    </main>
  );
}
