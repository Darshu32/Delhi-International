import { motion } from "framer-motion";
import { programs } from "../siteContent";
import { TiltCard, GlowCard } from "../components/Interactive";

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.12 }, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } };
const programIconBg: Record<string, string> = { award: "from-amber-400 to-orange-500", play: "from-blue-400 to-indigo-600", campus: "from-emerald-400 to-green-600" };

export default function ProgramsPage() {
  return (
    <main>
      <section className="bg-navy relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-20">
          <motion.div className="max-w-2xl" {...fadeUp}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-[11px] font-bold text-accent uppercase tracking-wider border border-accent/20 mb-4">Cultural Connect</span>
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-4">Dedicated space for signature learning experiences and standout school offerings.</h1>
            <p className="text-sm md:text-base text-white/50 leading-relaxed">This page is ready for deeper program descriptions, grade-wise structure, labs, activity blocks, and signature initiatives.</p>
          </motion.div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 md:px-6 -mt-6 relative z-10 pb-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {programs.map((program, i) => (
            <TiltCard key={program.title} intensity={10}>
              <GlowCard>
                <motion.article className="group p-5 md:p-6 rounded-2xl bg-white border border-border shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300" {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }}>
                  <div className={`w-12 h-12 mb-4 rounded-xl bg-gradient-to-br ${programIconBg[program.icon] || "from-gray-400 to-gray-500"} grid place-items-center shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                    {program.icon === "award" && <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l2.4 7.2H22l-6 4.5 2.3 7.3L12 16.5 5.7 21l2.3-7.3-6-4.5h7.6z" /></svg>}
                    {program.icon === "play" && <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>}
                    {program.icon === "campus" && <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
                  </div>
                  {program.image && (<div className="mb-4 -mx-1 rounded-xl overflow-hidden"><img src={program.image} alt="DIS campus" className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" /></div>)}
                  <h3 className="font-display text-lg md:text-xl font-bold text-text-primary mb-2">{program.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{program.text}</p>
                </motion.article>
              </GlowCard>
            </TiltCard>
          ))}
        </div>
      </section>
    </main>
  );
}
