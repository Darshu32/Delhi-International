import { motion } from "framer-motion";
import { galleryImages } from "../siteContent";
const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.12 }, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } };
export default function GalleryPage() {
  return (
    <main>
      <section className="bg-navy relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-20">
          <motion.div className="max-w-2xl" {...fadeUp}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-[11px] font-bold text-accent uppercase tracking-wider border border-accent/20 mb-4">Gallery</span>
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-4">A full visual storytelling page for school life, events, classrooms, and student moments.</h1>
            <p className="text-sm md:text-base text-white/50 leading-relaxed">When you send final photo groups and captions, this page can become a premium gallery experience without more structural work.</p>
          </motion.div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 md:px-6 -mt-6 relative z-10 pb-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {galleryImages.concat(galleryImages).map((image, i) => (
            <motion.article key={`${image}-${i}`} className="group relative rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300" {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.04 }}>
              <img src={image} alt="DIS gallery" className="w-full h-44 sm:h-52 object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
}
