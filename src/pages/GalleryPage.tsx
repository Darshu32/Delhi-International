
import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { galleryImages } from "../siteContent";
import { Lightbox } from "../components/Interactive";

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.12 }, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } };

export default function GalleryPage() {
  const allImages = galleryImages;
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);
  const openLightbox = (i: number) => { setLightboxIdx(i); setLightboxOpen(true); };
  const navLightbox = useCallback((dir: -1 | 1) => setLightboxIdx((p) => (p + dir + allImages.length) % allImages.length), [allImages.length]);

  return (
    <main>
      <section className="bg-navy relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
          <motion.div className="text-center" {...fadeUp}>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.05] tracking-tight">
              Our <span className="text-accent">Gallery</span>
            </h1>
          </motion.div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 md:px-6 -mt-6 relative z-10 pb-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {allImages.map((image, i) => (
            <motion.article
              key={`${image}-${i}`}
              className="group relative rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover cursor-pointer transition-all duration-300"
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.04 }}
              onClick={() => openLightbox(i)}
              whileHover={{ y: -4 }}
            >
              <img src={image} alt="DIS gallery" className="w-full h-44 sm:h-52 object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm grid place-items-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
      <Lightbox images={allImages} open={lightboxOpen} index={lightboxIdx} onClose={() => setLightboxOpen(false)} onNav={navLightbox} />
    </main>
  );
}
