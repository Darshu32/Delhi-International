import { motion } from "framer-motion";
import { admissionsSteps } from "../siteContent";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

export default function AdmissionsPage() {
  return (
    <main className="inner-page">
      <section className="page-hero page-width admissions-page">
        <motion.div className="page-hero-copy" {...fadeUp}>
          <p className="eyebrow">Admissions</p>
          <h1>A dedicated admissions page ready for forms, process, eligibility, and parent FAQs.</h1>
          <p>This page now gives admissions its own premium destination instead of keeping it only as a landing-page block.</p>
        </motion.div>
      </section>
      <section className="page-width admissions-steps">
        {admissionsSteps.map((step, index) => (
          <motion.article key={step.id} className="admission-step-card" {...fadeUp} transition={{ ...fadeUp.transition, delay: index * 0.08 }}>
            <span>{step.id}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </motion.article>
        ))}
      </section>
      <section className="page-width inner-card cta-card">
        <h3>Admissions contact block</h3>
        <p>Ready for campus visit scheduling, enquiry form content, and any grade-specific admission instructions you share later.</p>
      </section>
    </main>
  );
}
