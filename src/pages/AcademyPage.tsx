import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.12 }, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } };
const academyShowcases = [
  { title: "Skill Development Programs", intro: "Communication Excellence through dedicated spoken English programs that build confidence and fluency.", bullets: ["Confidence Building Activities that encourage self-expression, public speaking, and stage presence", "Critical Thinking Skills developed through interactive and problem-solving based learning", "Leadership & Life Skills nurtured through collaborative activities and real-world exposure"], image: "./student%20.jpeg" },
  { title: "Expert & Dedicated Faculty", intro: "", bullets: ["10+ Years of Experience ensuring strong academic foundations and proven teaching excellence", "Highly Qualified Educators with advanced degrees and deep subject expertise", "Innovative Teaching Methods that make learning engaging, practical, and effective", "Personal Mentorship Approach with friendly teachers guiding every student's growth"], image: "./teacher.jpeg" },
  { title: "Personalized Learning & Mentorship", intro: "", bullets: ["Dedicated Mentorship Program where each student is personally guided by assigned faculty", "Individual Attention for Every Student ensuring no child is left behind", "Parent-Teacher Connect with open and easy communication for regular updates", "D-STS (Student Tracking System) to continuously track progress and learning outcomes", "Personalized Learning Plans based on each student's strengths, pace, and potential", "Customized Assignments & Assessments to enhance performance and build confidence"], image: "./experiment.jpeg" },
];
export default function AcademyPage() {
  const sliderImages = [{ src: "./student%20.jpeg", alt: "Students studying" }, { src: "./experiment.jpeg", alt: "Student project" }];
  const [activeImage, setActiveImage] = useState(0);
  useEffect(() => { const t = window.setInterval(() => setActiveImage((c) => (c + 1) % sliderImages.length), 2800); return () => window.clearInterval(t); }, [sliderImages.length]);
  return (
    <main>
      <section className="bg-navy relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-20">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-10 items-center">
            <motion.div className="relative rounded-3xl overflow-hidden shadow-image border border-white/10" {...fadeUp}>
              <AnimatePresence mode="wait">
                <motion.img key={sliderImages[activeImage].src} src={sliderImages[activeImage].src} alt={sliderImages[activeImage].alt} className="w-full h-60 sm:h-72 lg:h-80 object-cover" loading="eager" initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.5 }} />
              </AnimatePresence>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-sm">
                {sliderImages.map((_, i) => (<button key={i} type="button" onClick={() => setActiveImage(i)} className={`w-2 h-2 rounded-full transition-all ${i === activeImage ? "bg-accent w-5" : "bg-white/40"}`} />))}
              </div>
            </motion.div>
            <motion.div {...fadeUp}>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green/10 text-[11px] font-bold text-green-light uppercase tracking-wider border border-green/20 mb-4">Academics</span>
              <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-4">A dedicated academic page for curriculum, learning outcomes, and grade-wise structure.</h1>
              <p className="text-sm text-white/50 leading-relaxed mb-5">This page is ready for your upcoming academic content, including curriculum details, methodology, faculty focus, grade progression, labs, and performance philosophy.</p>
              <div className="flex flex-wrap gap-2">{["Concept clarity", "Activity-led learning", "Progress tracking"].map((c) => (<span key={c} className="px-3 py-1.5 rounded-full bg-white/8 text-xs font-semibold text-white/70 border border-white/10">{c}</span>))}</div>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-20 flex flex-col gap-8">
        {academyShowcases.map((item, i) => (
          <motion.article key={item.title} className="grid md:grid-cols-2 gap-5 lg:gap-8 items-center" {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }}>
            <div className={`rounded-2xl overflow-hidden shadow-card border border-border group ${i % 2 === 1 ? "md:order-2" : ""}`}><img src={item.image} alt={item.title} className="w-full h-56 sm:h-64 lg:h-72 object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" /></div>
            <div className={`p-5 md:p-7 rounded-2xl bg-white border border-border shadow-card ${i % 2 === 1 ? "md:order-1" : ""}`}>
              <span className="text-[11px] font-bold tracking-widest uppercase text-accent-dark mb-2 block">Academics</span>
              <h3 className="font-display text-lg md:text-xl font-bold text-text-primary mb-3">{item.title}</h3>
              {item.intro && <p className="text-sm text-text-secondary leading-relaxed mb-3">{item.intro}</p>}
              <ul className="flex flex-col gap-2">{item.bullets.map((b) => (<li key={b} className="relative pl-4 text-sm text-text-secondary leading-relaxed"><span className="absolute left-0 top-[9px] w-1.5 h-1.5 rounded-full bg-accent" />{b}</li>))}</ul>
            </div>
          </motion.article>
        ))}
      </section>
    </main>
  );
}
