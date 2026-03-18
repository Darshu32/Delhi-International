import { motion } from "framer-motion";
import { programs } from "../siteContent";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

export default function ProgramsPage() {
  return (
    <main className="inner-page">
      <section className="page-hero page-width programs-page">
        <motion.div className="page-hero-copy" {...fadeUp}>
          <p className="eyebrow">Programs</p>
          <h1>Dedicated space for signature learning experiences and standout school offerings.</h1>
          <p>This page is ready for deeper program descriptions, grade-wise structure, labs, activity blocks, and signature initiatives.</p>
        </motion.div>
      </section>
      <section className="page-width program-grid">
        {programs.map((program, index) => (
          <motion.article key={program.title} className={`program-card ${program.color}`} {...fadeUp} transition={{ ...fadeUp.transition, delay: index * 0.08 }}>
            <div className={`program-icon ${program.icon}`} />
            <h3>{program.title}</h3>
            <p>{program.text}</p>
          </motion.article>
        ))}
      </section>
    </main>
  );
}
