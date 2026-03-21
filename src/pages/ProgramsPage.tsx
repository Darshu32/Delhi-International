import { motion } from "framer-motion";

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.12 }, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } };

export default function ProgramsPage() {
  return (
    <main>
      {/* Hero with bold title */}
      <section className="bg-navy relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <motion.div className="text-center" {...fadeUp}>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.05] tracking-tight">
              Cultural <span className="text-accent">Connect</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Full-screen video */}
      <section className="relative w-full">
        <motion.div className="w-full" {...fadeUp}>
          <video
            className="w-full h-[70vh] md:h-[80vh] lg:h-[85vh] object-contain bg-navy"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src="./hero-video.mp4" type="video/mp4" />
          </video>
        </motion.div>
      </section>
    </main>
  );
}
