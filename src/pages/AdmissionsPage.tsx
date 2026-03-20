import { motion } from "framer-motion";
import { admissionsSteps } from "../siteContent";
const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.12 }, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } };
export default function AdmissionsPage() {
  return (
    <main>
      <section className="bg-navy relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-accent/6 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-20">
          <motion.div className="max-w-2xl" {...fadeUp}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-[11px] font-bold text-accent uppercase tracking-wider border border-accent/20 mb-4">Admissions</span>
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-4">A dedicated admissions page ready for forms, process, eligibility, and parent FAQs.</h1>
            <p className="text-sm md:text-base text-white/50 leading-relaxed">This page now gives admissions its own premium destination instead of keeping it only as a landing-page block.</p>
          </motion.div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 md:px-6 -mt-6 relative z-10 pb-6">
        <div className="grid md:grid-cols-3 gap-4">
          {admissionsSteps.map((step, i) => (
            <motion.article key={step.id} className="group p-5 md:p-6 rounded-2xl bg-white border border-border shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300" {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }}>
              <span className="inline-grid place-items-center w-10 h-10 mb-3 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 text-accent-dark font-extrabold text-sm border border-accent/20 group-hover:bg-accent group-hover:text-navy transition-all duration-300">{step.id}</span>
              <h3 className="font-display text-lg font-bold text-text-primary mb-1.5">{step.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{step.text}</p>
            </motion.article>
          ))}
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-12">
        <div className="p-5 md:p-8 rounded-2xl bg-white border border-border shadow-card">
          <h3 className="font-display text-lg md:text-xl font-bold text-text-primary mb-2">Admissions contact block</h3>
          <p className="text-sm text-text-secondary leading-relaxed">Ready for campus visit scheduling, enquiry form content, and any grade-specific admission instructions you share later.</p>
        </div>
      </section>
    </main>
  );
}
