import { motion } from "framer-motion";
const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.12 }, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } };

export default function AboutPage() {
  return (
    <main>
      <section className="bg-navy relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-20">
          <motion.div className="max-w-2xl" {...fadeUp}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-[11px] font-bold text-accent uppercase tracking-wider border border-accent/20 mb-4">About Delhi International School</span>
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-4">A values-first school story designed to grow stronger with your final content.</h1>
            <p className="text-sm md:text-base text-white/50 leading-relaxed">This page is now structured for the client-ready About section. When you send the final copy, we can drop in the school vision, management story, milestones, philosophy, and trust-building content without redesigning the page again.</p>
          </motion.div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 md:px-6 -mt-6 relative z-10 pb-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {["Vision and mission", "Leadership and trust", "Why parents choose DIS"].map((item, i) => (
            <motion.article key={item} className="group p-5 md:p-7 rounded-2xl bg-white border border-border shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300" {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }}>
              <div className="w-10 h-10 mb-4 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 grid place-items-center">
                <svg className="w-5 h-5 text-accent-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="font-display text-lg md:text-xl font-bold text-text-primary mb-2">{item}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Reserved for your final approved content, with strong visual hierarchy and hover-ready card styling.</p>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
}
