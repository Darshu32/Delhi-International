import { motion } from "framer-motion";
import { TiltCard, GlowCard } from "../components/Interactive";

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.12 }, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } };
const disWayPrograms = [
  { title: "WoW Wednesday", text: "A specially curated mid-week experience designed to break routine learning, where students engage in creative, hands-on activities that enhance curiosity, collaboration, and practical understanding.", accent: "orange", icon: "\u2728" },
  { title: "Super Saturday", text: "A unique no-bag day dedicated to sports, creativity, and passion-driven activities, giving students the freedom to explore their interests beyond academics in a stress-free environment.", accent: "blue", icon: "\uD83C\uDFAF" },
  { title: "Student-Led Learning", subtitle: "Reverse Teaching Approach", text: "An interactive learning model where students take the lead in presenting concepts while teachers guide as facilitators, encouraging deeper understanding, confidence, and active participation.", accent: "green", icon: "\uD83C\uDF93" },
  { title: "Confidence & Stage Development", text: "Focused initiatives to eliminate stage fear through regular presentations, activities, and public speaking opportunities, helping students build confidence, a key skill in today's world.", accent: "peach", icon: "\uD83C\uDFA4" },
  { title: "Clubs & Interest-Based Learning", text: "A variety of student clubs designed to nurture talents and interests, providing platforms for creativity, leadership, teamwork, and overall personality development.", accent: "yellow", icon: "\uD83C\uDFC6" },
  { title: "Education Exploration", text: "Immersive field trips, science exhibitions, and real-world learning journeys that take education beyond the classroom walls. Students visit museums, nature reserves, and innovation hubs to connect textbook concepts with hands-on experiences, sparking curiosity and broadening their understanding of the world.", accent: "sky", icon: "\uD83C\uDF0D" },
];
const accentBg: Record<string, string> = { orange: "from-orange-50 to-amber-50/70", blue: "from-blue-50 to-indigo-50/60", green: "from-emerald-50 to-green-50/60", peach: "from-orange-50/80 to-rose-50/60", yellow: "from-yellow-50 to-amber-50/60", sky: "from-sky-50 to-blue-50/60" };
const accentBorder: Record<string, string> = { orange: "hover:border-amber-300", blue: "hover:border-blue-300", green: "hover:border-emerald-300", peach: "hover:border-orange-300", yellow: "hover:border-yellow-300", sky: "hover:border-sky-300" };

export default function TheDisWayPage() {
  return (
    <main>
      <section className="bg-navy relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-green/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-20">
          <motion.div className="max-w-2xl" {...fadeUp}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green/10 text-[11px] font-bold text-green-light uppercase tracking-wider border border-green/20 mb-4">The DIS Way</span>
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-4">Signature experiences that make school life creative, confident, and deeply engaging.</h1>
            <p className="text-sm md:text-base text-white/50 leading-relaxed mb-5">The DIS Way brings together joyful learning, student leadership, expression, confidence, and interest-based exploration so children grow beyond textbooks into capable, future-ready individuals.</p>
            <div className="flex flex-wrap gap-2">{["Hands-on exploration", "Confidence-building culture", "Interest-led growth"].map((c) => (<span key={c} className="px-3 py-1.5 rounded-full bg-white/8 text-xs font-semibold text-white/70 border border-white/10">{c}</span>))}</div>
          </motion.div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 md:px-6 -mt-6 relative z-10 pb-12">
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {disWayPrograms.slice(0, 2).map((item, i) => (
            <TiltCard key={item.title} intensity={8}>
              <GlowCard>
                <motion.article className={`group p-6 md:p-8 rounded-2xl bg-gradient-to-br ${accentBg[item.accent]} border border-border ${accentBorder[item.accent]} shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300`} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }}>
                  <span className="text-3xl mb-3 inline-block group-hover:scale-125 group-hover:-rotate-12 transition-transform duration-300">{item.icon}</span>
                  <span className="text-[11px] font-bold tracking-widest uppercase text-accent-dark mb-2 block">The DIS Way</span>
                  <h2 className="font-display text-xl md:text-2xl font-bold text-text-primary mb-3">{item.title}</h2>
                  <p className="text-sm text-text-secondary leading-relaxed">{item.text}</p>
                </motion.article>
              </GlowCard>
            </TiltCard>
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {disWayPrograms.slice(2).map((item, i) => (
            <TiltCard key={item.title} intensity={10}>
              <GlowCard>
                <motion.article className={`group p-5 md:p-6 rounded-2xl bg-gradient-to-br ${accentBg[item.accent]} border border-border ${accentBorder[item.accent]} shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300`} {...fadeUp} transition={{ ...fadeUp.transition, delay: (i+2) * 0.08 }}>
                  <span className="text-2xl mb-3 inline-block group-hover:scale-125 group-hover:-rotate-12 transition-transform duration-300">{item.icon}</span>
                  <span className="text-[11px] font-bold tracking-widest uppercase text-accent-dark mb-1 block">The DIS Way</span>
                  <h3 className="font-display text-lg font-bold text-text-primary mb-2">{item.title}</h3>
                  {item.subtitle && <strong className="block text-sm font-bold text-text-secondary mb-2">{item.subtitle}</strong>}
                  <p className="text-sm text-text-secondary leading-relaxed">{item.text}</p>
                </motion.article>
              </GlowCard>
            </TiltCard>
          ))}
        </div>
      </section>
    </main>
  );
}
