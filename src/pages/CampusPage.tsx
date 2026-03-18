import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

export default function CampusPage() {
  return (
    <main className="inner-page">
      <section className="page-hero page-width campus-page">
        <motion.div className="page-hero-copy" {...fadeUp}>
          <p className="eyebrow">Campus</p>
          <h1>Show the school environment, facilities, and everyday experience with more depth.</h1>
          <p>This page is prepared for future sections like smart classrooms, labs, safety, transport, sports, and campus imagery.</p>
        </motion.div>
      </section>
      <section className="page-width page-grid split">
        <motion.article className="inner-media-card" {...fadeUp}>
          <img src="https://delhiinternationalshimoga.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-11-at-11.20.16-AM-1.jpeg" alt="Campus life at Delhi International School" />
        </motion.article>
        <motion.article className="inner-card large" {...fadeUp}>
          <h3>Campus highlights placeholder</h3>
          <p>Ready for the final facilities copy, differentiators, infrastructure details, and parent-facing reassurance content.</p>
        </motion.article>
      </section>
    </main>
  );
}
