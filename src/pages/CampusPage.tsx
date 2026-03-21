import { motion } from "framer-motion";
const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.12 }, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } };
export default function CampusPage() {
  return (
    <main>
      <section className="bg-surface relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-20">
          <motion.div className="max-w-2xl" {...fadeUp}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green/10 text-[11px] font-bold text-green uppercase tracking-wider border border-green/20 mb-4">Campus</span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary leading-tight mb-4">Show the school environment, facilities, and everyday experience with more depth.</h1>
            <p className="text-sm md:text-base text-text-secondary leading-relaxed">This page is prepared for future sections like smart classrooms, labs, safety, transport, sports, and campus imagery.</p>
          </motion.div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 md:px-6 -mt-6 relative z-10 pb-12">
        <div className="grid md:grid-cols-2 gap-4">
          <motion.div className="rounded-2xl overflow-hidden shadow-card border border-border group" {...fadeUp}><img src="./school.jpeg" alt="Campus life at DIS" className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" /></motion.div>
          <motion.article className="p-5 md:p-7 rounded-2xl bg-white border border-border shadow-card hover:shadow-card-hover transition-shadow" {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 }}>
            <div className="w-10 h-10 mb-4 rounded-xl bg-gradient-to-br from-green/20 to-green/5 grid place-items-center"><svg className="w-5 h-5 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg></div>
            <h3 className="font-display text-lg md:text-xl font-bold text-text-primary mb-2">Campus highlights placeholder</h3>
            <p className="text-sm text-text-secondary leading-relaxed">Ready for the final facilities copy, differentiators, infrastructure details, and parent-facing reassurance content.</p>
          </motion.article>
        </div>
      </section>
    </main>
  );
}
