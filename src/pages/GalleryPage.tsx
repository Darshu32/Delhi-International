import { motion } from "framer-motion";
import { galleryImages } from "../siteContent";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

export default function GalleryPage() {
  return (
    <main className="inner-page">
      <section className="page-hero page-width gallery-page">
        <motion.div className="page-hero-copy" {...fadeUp}>
          <p className="eyebrow">Gallery</p>
          <h1>A full visual storytelling page for school life, events, classrooms, and student moments.</h1>
          <p>When you send final photo groups and captions, this page can become a premium gallery experience without more structural work.</p>
        </motion.div>
      </section>
      <section className="page-width gallery-grid-large">
        {galleryImages.concat(galleryImages).map((image, index) => (
          <motion.article key={`${image}-${index}`} className="gallery-card" {...fadeUp} transition={{ ...fadeUp.transition, delay: index * 0.04 }}>
            <img src={image} alt="Delhi International School visual gallery" />
          </motion.article>
        ))}
      </section>
    </main>
  );
}
