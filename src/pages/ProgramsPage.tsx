import { motion } from "framer-motion";
import { TiltCard } from "../components/Interactive";

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.12 }, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } };

const culturalEvents = [
  {
    title: "DIS Annual Fest",
    intro: "A grand celebration of talent, creativity, and school spirit.",
    bullets: [
      "Cultural performances showcasing dance, drama, and music",
      "Student-led exhibits and creative showcases",
      "Awards and recognition for outstanding achievements",
      "A day of joy, pride, and unforgettable memories",
    ],
    image: "./photo%204.jpeg",
  },
  {
    title: "Family Sports Day",
    intro: "Where families come together for fun, fitness, and friendly competition.",
    bullets: [
      "Exciting relay races and team events for all age groups",
      "Parent-child bonding through collaborative sports activities",
      "Trophies, medals, and spirited encouragement for every participant",
      "Building teamwork, sportsmanship, and school community",
    ],
    image: "./photo%205.jpeg",
  },
  {
    title: "Food Mela",
    intro: "A vibrant food carnival celebrating diverse cuisines and cultures.",
    bullets: [
      "Student-organized stalls with delicious homemade dishes",
      "Celebrating India's rich culinary diversity and traditions",
      "Fun games, music, and entertainment alongside great food",
      "Teaching entrepreneurship, teamwork, and event management",
    ],
    image: "./photo%206.jpeg",
  },
];

export default function ProgramsPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-green/8 rounded-full blur-[80px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
          <motion.div className="text-center" {...fadeUp}>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-text-primary leading-[1.05] tracking-tight">
              Cultural <span className="text-accent-dark">Connect</span>
            </h1>
            <p className="text-sm md:text-base text-text-secondary max-w-2xl mx-auto mt-4 leading-relaxed">Celebrating the vibrant spirit of Delhi International School through events that bring students, families, and the community together.</p>
          </motion.div>
        </div>
      </section>

      {/* Full-screen video */}
      <section className="relative w-full bg-surface-dim">
        <motion.div className="w-full" {...fadeUp}>
          <video
            className="w-full h-[60vh] md:h-[75vh] lg:h-[80vh] object-contain"
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

      {/* Cultural Events — photo first, then content */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-20 flex flex-col gap-10">
        {culturalEvents.map((item, i) => (
          <motion.article key={item.title} className="grid md:grid-cols-2 gap-5 lg:gap-8 items-center" {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }}>
            <TiltCard intensity={6} className={i % 2 === 1 ? "md:order-2" : ""}>
              <div className="rounded-2xl overflow-hidden shadow-card border border-border group">
                <img src={item.image} alt={item.title} className="w-full h-56 sm:h-64 lg:h-80 object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              </div>
            </TiltCard>
            <div className={`p-5 md:p-7 rounded-2xl bg-white border border-border shadow-card ${i % 2 === 1 ? "md:order-1" : ""}`}>
              <span className="text-[11px] font-bold tracking-widest uppercase text-accent-dark mb-2 block">Cultural Connect</span>
              <h3 className="font-display text-xl md:text-2xl font-bold text-text-primary mb-3">{item.title}</h3>
              {item.intro && <p className="text-sm text-text-secondary leading-relaxed mb-3">{item.intro}</p>}
              <ul className="flex flex-col gap-2">
                {item.bullets.map((b) => (
                  <li key={b} className="relative pl-4 text-sm text-text-secondary leading-relaxed">
                    <span className="absolute left-0 top-[9px] w-1.5 h-1.5 rounded-full bg-accent" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
        ))}
      </section>
    </main>
  );
}
