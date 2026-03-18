import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

export default function AboutPage() {
  return (
    <main className="inner-page">
      <section className="page-hero page-width about-page">
        <motion.div className="page-hero-copy" {...fadeUp}>
          <p className="eyebrow">About Delhi International School</p>
          <h1>A values-first school story designed to grow stronger with your final content.</h1>
          <p>
            This page is now structured for the client-ready About section. When you send the final
            copy, we can drop in the school vision, management story, milestones, philosophy, and
            trust-building content without redesigning the page again.
          </p>
        </motion.div>
      </section>
      <section className="page-width page-grid three-up">
        {["Vision and mission", "Leadership and trust", "Why parents choose DIS"].map((item, index) => (
          <motion.article key={item} className="inner-card" {...fadeUp} transition={{ ...fadeUp.transition, delay: index * 0.08 }}>
            <h3>{item}</h3>
            <p>Reserved for your final approved content, with strong visual hierarchy and hover-ready card styling.</p>
          </motion.article>
        ))}
      </section>
    </main>
  );
}
