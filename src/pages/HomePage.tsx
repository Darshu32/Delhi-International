import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { admissionsSteps, galleryImages, programs, stats } from "../siteContent";

const HeroScene = lazy(() => import("../HeroScene"));

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.12 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};
const stagger = (i: number) => ({ ...fadeUp.transition, delay: i * 0.08 });
const statColors = ["from-amber-500 to-orange-500", "from-emerald-500 to-green-500", "from-blue-500 to-cyan-500", "from-violet-500 to-purple-500"];
const programIconBg: Record<string, string> = { award: "from-amber-400 to-orange-500", play: "from-blue-400 to-indigo-600", campus: "from-emerald-400 to-green-600" };

export default function HomePage() {
  return (
    <main>
      {/* HERO */}
      <section className="relative bg-navy overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-green/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 md:px-6 pt-10 pb-12 md:pt-16 md:pb-20 lg:pt-20 lg:pb-24">
          <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-14">
            {/* Text */}
            <motion.div className="flex flex-col gap-5 lg:flex-1 lg:max-w-xl" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <motion.div className="inline-flex items-center self-start gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
                <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
                <span className="text-[11px] font-bold text-accent tracking-wide uppercase">Admissions Open 2026-27</span>
              </motion.div>

              <h1 className="font-display text-[2rem] sm:text-4xl lg:text-5xl xl:text-[3.5rem] font-extrabold leading-[1.05] tracking-tight text-white">
                Where <span className="text-accent">wonder</span> awakens and <span className="text-green-light">curiosity</span> grows every day.
              </h1>
              <p className="text-sm sm:text-base text-white/55 leading-relaxed max-w-md">
                Delhi International School brings together quality CBSE academics, modern facilities, life-skill development, and a nurturing learning environment for children from playgroup to grade 10.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mt-1">
                <motion.a href="/admissions" className="flex items-center justify-center w-full sm:w-auto min-h-12 px-7 rounded-full bg-accent text-navy font-extrabold text-sm shadow-glow hover:bg-accent-light active:scale-[0.97] transition-all" whileTap={{ scale: 0.97 }}>
                  Our Admissions
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </motion.a>
                <motion.a href="/campus" className="flex items-center justify-center w-full sm:w-auto min-h-12 px-7 rounded-full bg-white/8 text-white font-bold text-sm border border-white/12 hover:bg-white/12 active:scale-[0.97] transition-all" whileTap={{ scale: 0.97 }}>Explore Campus</motion.a>
              </div>

              <div className="flex items-center gap-4 mt-3">
                <div className="flex -space-x-2">
                  {["from-teal-400 to-emerald-500","from-amber-400 to-orange-500","from-blue-400 to-indigo-500","from-pink-400 to-rose-500"].map((g, i) => (
                    <span key={i} className={`w-8 h-8 rounded-full bg-gradient-to-br ${g} border-2 border-navy shadow-sm`} />
                  ))}
                </div>
                <div>
                  <strong className="block text-white text-sm font-bold">3,400+ happy students</strong>
                  <p className="text-[11px] text-white/40">Parents trust DIS for academics & values</p>
                </div>
              </div>
            </motion.div>

            {/* Image Collage */}
            <motion.div className="relative lg:flex-1 flex justify-center" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.2 }}>
              <div className="relative w-full max-w-md lg:max-w-lg">
                <motion.div className="relative rounded-3xl overflow-hidden shadow-image border border-white/10 z-10" whileHover={{ y: -4 }} transition={{ duration: 0.3 }}>
                  <img src="./student%20.jpeg" alt="Students at Delhi International School" className="w-full h-64 sm:h-80 lg:h-96 object-cover" loading="eager" />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy/80 to-transparent" />
                  <button className="play-btn absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-accent grid place-items-center shadow-glow z-20 hover:scale-110 active:scale-95 transition-transform">
                    <svg className="w-6 h-6 text-navy ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  </button>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 z-10">
                    <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-bold text-white border border-white/15">CBSE Affiliated</span>
                    <span className="px-3 py-1 rounded-full bg-accent/20 backdrop-blur-md text-[11px] font-bold text-accent border border-accent/20">Ranked #1 Shimoga</span>
                  </div>
                </motion.div>
                <motion.div className="absolute -top-4 -right-3 sm:-top-6 sm:-right-6 w-28 sm:w-36 rounded-2xl overflow-hidden shadow-image border-2 border-navy z-20 animate-float">
                  <img src="./experiment.jpeg" alt="Student project" className="w-full h-20 sm:h-28 object-cover" loading="eager" />
                </motion.div>
                <motion.div className="absolute -bottom-3 -left-3 sm:-bottom-5 sm:-left-6 w-32 sm:w-40 rounded-2xl overflow-hidden shadow-image border-2 border-navy z-20 animate-float-delayed">
                  <img src="./teacher.jpeg" alt="Teacher with students" className="w-full h-24 sm:h-32 object-cover" loading="eager" />
                </motion.div>
                <motion.div className="absolute top-4 -left-2 sm:-left-8 z-30 px-3.5 py-2.5 rounded-2xl bg-navy-card/90 backdrop-blur-xl border border-white/10 shadow-elevated animate-float-slow">
                  <span className="block text-[10px] text-white/50 font-medium uppercase tracking-wider">Students</span>
                  <strong className="block text-xl font-extrabold text-white">3,400+</strong>
                  <span className="flex items-center gap-1 text-[10px] text-green font-semibold">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" /></svg>
                    Growing yearly
                  </span>
                </motion.div>
                <motion.div className="absolute -bottom-2 right-2 sm:-bottom-3 sm:right-4 z-30 px-3.5 py-2.5 rounded-2xl bg-navy-card/90 backdrop-blur-xl border border-white/10 shadow-elevated animate-float">
                  <span className="block text-[10px] text-white/50 font-medium uppercase tracking-wider">Experience</span>
                  <strong className="block text-xl font-extrabold text-accent">10+ yrs</strong>
                </motion.div>
                <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-2xl overflow-hidden opacity-40 z-0 hidden lg:block">
                  <Suspense fallback={null}><HeroScene /></Suspense>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Marquee */}
        <div className="border-t border-white/6 bg-white/[0.02] py-4 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...Array(2)].map((_, s) => (
              <div key={s} className="flex gap-8 px-4">
                {["CBSE School","Life Skills","WoW Wednesday","Math Lab","Language Lab","Super Saturday","Smart Classrooms","Award Winning"].map((item) => (
                  <span key={`${s}-${item}`} className="flex items-center gap-2 text-sm text-white/30 font-semibold"><span className="w-1.5 h-1.5 rounded-full bg-accent/50" />{item}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 -mt-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {stats.map((stat, i) => (
            <motion.article key={stat.label} className="relative overflow-hidden p-4 md:p-5 rounded-2xl bg-white border border-border shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group" {...fadeUp} transition={stagger(i)}>
              <div className={`absolute -top-6 -right-6 w-16 h-16 rounded-full bg-gradient-to-br ${statColors[i]} opacity-10 group-hover:opacity-20 transition-opacity`} />
              <strong className={`block text-2xl md:text-3xl font-extrabold tracking-tight mb-1 bg-gradient-to-r ${statColors[i]} bg-clip-text text-transparent`}>{stat.value}</strong>
              <span className="text-xs md:text-sm text-text-muted leading-snug">{stat.label}</span>
            </motion.article>
          ))}
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
        <motion.div className="text-center mb-10 md:mb-12" {...fadeUp}>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-[11px] font-bold text-accent-dark uppercase tracking-wider mb-4"><span className="w-1.5 h-1.5 rounded-full bg-accent" />Nurturing young minds</span>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary">One lesson at a time, one confident child at a time.</h2>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {programs.map((program, i) => (
            <motion.article key={program.title} className="group relative overflow-hidden p-5 md:p-6 rounded-2xl bg-white border border-border shadow-card hover:shadow-card-hover hover:-translate-y-2 transition-all duration-300" {...fadeUp} transition={stagger(i)}>
              <div className={`w-12 h-12 mb-4 rounded-xl bg-gradient-to-br ${programIconBg[program.icon] || "from-gray-400 to-gray-500"} grid place-items-center shadow-sm`}>
                {program.icon === "award" && <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l2.4 7.2H22l-6 4.5 2.3 7.3L12 16.5 5.7 21l2.3-7.3-6-4.5h7.6z" /></svg>}
                {program.icon === "play" && <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>}
                {program.icon === "campus" && <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
              </div>
              {program.image && (<div className="mb-4 -mx-1 rounded-xl overflow-hidden"><img src={program.image} alt="DIS campus" className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" /></div>)}
              <h3 className="font-display text-lg md:text-xl font-bold text-text-primary mb-2">{program.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{program.text}</p>
              <div className="mt-4 flex items-center text-accent-dark text-sm font-semibold opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">Learn more <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* TIMING */}
      <section className="bg-surface-dim py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-5 lg:gap-8">
            <motion.div className="lg:flex-1 relative group" {...fadeUp}>
              <div className="rounded-3xl overflow-hidden shadow-card border border-border">
                <img src="https://delhiinternationalshimoga.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-11-at-11.20.16-AM-1.jpeg" alt="Students at DIS" className="w-full h-64 sm:h-80 lg:h-full lg:min-h-96 object-cover group-hover:scale-[1.02] transition-transform duration-700" loading="lazy" />
              </div>
              <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:bottom-4 sm:w-56 p-3.5 rounded-2xl bg-white/90 backdrop-blur-xl shadow-elevated border border-white/50">
                <strong className="block text-sm font-bold text-text-primary">Family-first learning</strong>
                <p className="text-[11px] text-text-muted mt-0.5">Parents choose DIS for academics, values, and all-round confidence building.</p>
              </div>
            </motion.div>
            <motion.div className="lg:flex-1 flex flex-col gap-4" {...fadeUp}>
              <span className="inline-flex items-center self-start gap-2 px-3 py-1 rounded-full bg-accent/10 text-[11px] font-bold text-accent-dark uppercase tracking-wider"><span className="w-1.5 h-1.5 rounded-full bg-accent" />School timing and atmosphere</span>
              <h2 className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-text-primary leading-tight">Modern facilities, caring teachers, and an energetic school day.</h2>
              <p className="text-sm text-text-secondary leading-relaxed">Delhi International School offers a safe, nurturing environment with experienced faculty, educational exploration, personal development programs, and structured academic growth.</p>
              <div className="flex flex-col gap-2.5 mt-2">
                {[{icon:"🕐",t:"We are open",d:"Mon to Fri: 08:30 AM - 04:00 PM"},{icon:"🎯",t:"Activity-rich learning",d:"Abacus, life skills, talent discovery, and confidence building"},{icon:"📞",t:"Contact us",d:"9448220170"}].map((item) => (
                  <div key={item.t} className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-border shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200">
                    <span className="text-xl leading-none mt-0.5">{item.icon}</span>
                    <div><strong className="block text-sm font-bold text-text-primary">{item.t}</strong><span className="text-xs text-text-muted">{item.d}</span></div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div className="text-center mb-10" {...fadeUp}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green/10 text-[11px] font-bold text-green uppercase tracking-wider mb-4"><span className="w-1.5 h-1.5 rounded-full bg-green" />Student gallery</span>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary">Spaces that feel bright, active, and full of possibility.</h2>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {galleryImages.map((image, i) => (
              <motion.article key={`${image}-${i}`} className="group relative rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300" {...fadeUp} transition={stagger(i)}>
                <img src={image} alt="DIS gallery" className="w-full h-44 sm:h-52 object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ADMISSIONS */}
      <section className="bg-navy relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
          <motion.div className="text-center mb-10" {...fadeUp}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-[11px] font-bold text-accent uppercase tracking-wider mb-4 border border-accent/20">Admission registration</span>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">Admissions are open for playgroup to grade 10 for 2026-2027.</h2>
            <p className="text-sm md:text-base text-white/50 max-w-2xl mx-auto leading-relaxed">Families can schedule a visit, meet the team, and complete registration with guidance from the school admissions office.</p>
          </motion.div>
          <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12" {...fadeUp}>
            <a href="tel:9448220170" className="w-full sm:w-auto flex items-center justify-center min-h-12 px-8 rounded-full bg-accent text-navy font-extrabold text-sm shadow-glow hover:bg-accent-light transition-all">Call 9448220170</a>
            <a href="mailto:admissions@delhiinternationalschool.edu" className="w-full sm:w-auto flex items-center justify-center min-h-12 px-8 rounded-full bg-white/8 text-white font-bold text-sm border border-white/15 hover:bg-white/12 transition-all">Request Information</a>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-4">
            {admissionsSteps.map((step, i) => (
              <motion.article key={step.id} className="group p-5 md:p-6 rounded-2xl bg-navy-card border border-navy-border hover:border-accent/30 hover:-translate-y-1 transition-all duration-300" {...fadeUp} transition={stagger(i)}>
                <span className="inline-grid place-items-center w-10 h-10 mb-3 rounded-full bg-accent/10 text-accent font-extrabold text-sm border border-accent/20 group-hover:bg-accent group-hover:text-navy transition-all duration-300">{step.id}</span>
                <h3 className="font-display text-lg font-bold text-white mb-1.5">{step.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{step.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CAMPUS */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
          <motion.div className="relative rounded-3xl overflow-hidden shadow-elevated group" {...fadeUp}>
            <img src="./school.jpeg" alt="DIS campus" className="w-full h-56 sm:h-72 lg:h-96 object-cover group-hover:scale-[1.02] transition-transform duration-700" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8">
              <h3 className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1">Our Campus</h3>
              <p className="text-sm text-white/60 max-w-md">Smart classrooms, open spaces, and modern facilities built to inspire learning and all-round development.</p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
