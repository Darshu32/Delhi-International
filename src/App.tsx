import { lazy, Suspense, useEffect, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

type FadeUpConfig = {
  initial: { opacity: number; y: number };
  whileInView: { opacity: number; y: number };
  viewport: { once: boolean; amount: number };
  transition: { duration: number; ease: [number, number, number, number] };
};

type Stat = {
  value: string;
  label: string;
  tint: string;
};

type Program = {
  title: string;
  text: string;
  color: string;
  icon: string;
};

type Step = {
  id: string;
  title: string;
  text: string;
};

const fadeUp: FadeUpConfig = {
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
};

const stats: Stat[] = [
  { value: "3400+", label: "Happy student journeys inspired by curiosity", tint: "peach" },
  { value: "50+", label: "Qualified teachers guiding every stage", tint: "mint" },
  { value: "8K+", label: "Moments of parent trust and satisfaction", tint: "sky" },
  { value: "10+", label: "Years shaping disciplined future-ready learners", tint: "yellow" },
];

const programs: Program[] = [
  {
    title: "Self-development and life skills",
    text: "Personal grooming, communication, empathy, and social confidence are built into the school experience.",
    color: "orange",
    icon: "spark",
  },
  {
    title: "WoW Wednesday and Super Saturday",
    text: "Every week blends academics with activity-led exploration so learning feels exciting and memorable.",
    color: "blue",
    icon: "rocket",
  },
  {
    title: "Language development and math lab",
    text: "Children build stronger fluency and number sense through practical guided programs and lab-based sessions.",
    color: "green",
    icon: "cube",
  },
];

const admissionsSteps: Step[] = [
  {
    id: "01",
    title: "Connect with the school",
    text: "Speak with the admissions team for counselling and current seat availability.",
  },
  {
    id: "02",
    title: "Visit the campus",
    text: "Experience the environment, meet the faculty, and understand the learning culture.",
  },
  {
    id: "03",
    title: "Complete registration",
    text: "Secure admission for playgroup to grade 10 for the 2026-2027 academic year.",
  },
];

const galleryImages = [
  "https://delhiinternationalshimoga.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-11-at-11.20.16-AM-1022x458.jpeg",
  "https://delhiinternationalshimoga.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-11-at-11.20.16-AM-1.jpeg",
  "https://delhiinternationalshimoga.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-11-at-11.20.16-AM-1022x458.jpeg",
  "https://delhiinternationalshimoga.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-11-at-11.20.16-AM-1.jpeg",
];
const HeroScene = lazy(() => import("./HeroScene"));

function InteractiveHeroCard() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [9, -9]), { stiffness: 140, damping: 18 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 140, damping: 18 });

  const handleMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) {
      return;
    }

    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      className="hero-visual-card"
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      initial={{ opacity: 0, scale: 0.9, y: 34 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="hero-visual-top">
        <span className="tiny-pill">Best quality</span>
        <span className="tiny-pill secondary">CBSE Affiliation No. 831022</span>
      </div>
      <div className="hero-visual-grid">
        <div className="hero-canvas-panel">
          <Suspense fallback={<div className="hero-canvas-fallback">Loading 3D scene...</div>}>
            <HeroScene />
          </Suspense>
        </div>
        <motion.div className="hero-campus-card" whileHover={{ y: -6, rotate: -1.4 }}>
          <img
            src="https://delhiinternationalshimoga.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-11-at-11.20.16-AM-1022x458.jpeg"
            alt="Delhi International School campus"
          />
          <div className="hero-campus-copy">
            <strong>Where wonder awakens, curiosity grows every day.</strong>
            <span>Holehonnur Road, Gurupura, Shimoga</span>
          </div>
        </motion.div>
      </div>
      <motion.div className="hero-floating-note hero-floating-note-one" whileHover={{ scale: 1.04, rotate: -4 }}>
        <span>Admissions open</span>
        <strong>Playgroup to Grade 10</strong>
      </motion.div>
      <motion.div className="hero-floating-note hero-floating-note-two" whileHover={{ scale: 1.04, rotate: 4 }}>
        <span>Ranked No. 1</span>
        <strong>Shimoga 2022 city-wise CBSE schools</strong>
      </motion.div>
    </motion.div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  return (
    <div className="app-shell">
      <div className="top-ribbon">
        <div className="top-ribbon-inner">
          <span>Summer admission season is on</span>
          <span>Enroll now for a future-ready CBSE experience</span>
          <span>Call 9448220170</span>
        </div>
      </div>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Delhi International School home">
          <span className="brand-logo-wrap">
            <img className="brand-logo" src="./delhi%20logo.png" alt="Delhi International School logo" />
          </span>
          <span className="brand-copy">
            <strong>Delhi International School</strong>
            <span>Shimoga, Karnataka</span>
          </span>
        </a>
        <button className="menu-toggle" aria-label="Open menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
          <span />
          <span />
        </button>
        <nav className={`site-nav ${menuOpen ? "is-open" : ""}`}>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#programs" onClick={() => setMenuOpen(false)}>Programs</a>
          <a href="#campus" onClick={() => setMenuOpen(false)}>Campus</a>
          <a href="#gallery" onClick={() => setMenuOpen(false)}>Gallery</a>
          <a href="#admissions" onClick={() => setMenuOpen(false)}>Admissions</a>
          <a className="nav-cta" href="tel:9448220170" onClick={() => setMenuOpen(false)}>Contact Us</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero-section page-width">
          <motion.div className="hero-copy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="eyebrow">Best quality</p>
            <h1>
              Where <span>wonder</span> awakens and <span>curiosity</span> grows every day.
            </h1>
            <p className="hero-description">
              Delhi International School brings together quality CBSE academics, modern facilities,
              life-skill development, and a nurturing learning environment for children from playgroup
              to grade 10.
            </p>
            <div className="hero-actions">
              <motion.a className="button button-primary" href="#admissions" whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                Our Admissions
              </motion.a>
              <motion.a className="button button-secondary" href="#campus" whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                Explore Campus
              </motion.a>
            </div>
            <motion.div className="hero-review-card" whileHover={{ y: -4 }}>
              <div className="review-avatars">
                <span />
                <span />
                <span />
              </div>
              <div>
                <strong>Family-first learning experience</strong>
                <p>Parents choose DIS for academics, values, and all-round confidence building.</p>
              </div>
            </motion.div>
          </motion.div>

          <InteractiveHeroCard />
        </section>

        <section className="stats-strip page-width" id="about">
          {stats.map((stat, index) => (
            <motion.article
              key={stat.label}
              className={`stat-card ${stat.tint}`}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: index * 0.06 }}
              whileHover={{ y: -8, rotate: index % 2 === 0 ? -1.5 : 1.5 }}
            >
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </motion.article>
          ))}
        </section>

        <section className="logo-row page-width" aria-label="School highlights">
          <span>CBSE School</span>
          <span>Life Skills</span>
          <span>WoW Wednesday</span>
          <span>Math Lab</span>
          <span>Language Lab</span>
          <span>Super Saturday</span>
        </section>

        <section className="story-section page-width" id="programs">
          <motion.div className="section-heading centered" {...fadeUp}>
            <p className="eyebrow">Nurturing young minds</p>
            <h2>One lesson at a time, one confident child at a time.</h2>
          </motion.div>
          <div className="program-grid">
            {programs.map((program, index) => (
              <motion.article
                key={program.title}
                className={`program-card ${program.color}`}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: index * 0.08 }}
                whileHover={{ y: -10, rotateX: -5, rotateY: index % 2 === 0 ? 6 : -6 }}
              >
                <div className={`program-icon ${program.icon}`} />
                <h3>{program.title}</h3>
                <p>{program.text}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="timing-section page-width" id="campus">
          <motion.div className="timing-visual" {...fadeUp} whileHover={{ y: -6 }}>
            <div className="timing-circle">
              <img
                src="https://delhiinternationalshimoga.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-11-at-11.20.16-AM-1.jpeg"
                alt="Students at Delhi International School"
              />
            </div>
            <div className="timing-doodle" />
          </motion.div>

          <motion.div className="timing-copy" {...fadeUp}>
            <p className="eyebrow">School timing and atmosphere</p>
            <h2>Modern facilities, caring teachers, and an energetic school day.</h2>
            <p>
              Delhi International School offers a safe, nurturing environment with experienced faculty,
              educational exploration, personal development programs, and structured academic growth.
            </p>
            <div className="timing-panel-list">
              <article>
                <strong>We are open</strong>
                <span>Mon to Fri: 08:30 AM - 04:00 PM</span>
              </article>
              <article>
                <strong>Activity-rich learning</strong>
                <span>Abacus, life skills, talent discovery, and confidence building</span>
              </article>
              <article>
                <strong>Contact us</strong>
                <span>9448220170</span>
              </article>
            </div>
          </motion.div>
        </section>

        <section className="gallery-section" id="gallery">
          <div className="page-width">
            <motion.div className="section-heading centered" {...fadeUp}>
              <p className="eyebrow">Student gallery</p>
              <h2>Spaces that feel bright, active, and full of possibility.</h2>
            </motion.div>
            <div className="gallery-strip">
              {galleryImages.map((image, index) => (
                <motion.article
                  key={`${image}-${index}`}
                  className="gallery-card"
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: index * 0.06 }}
                  whileHover={{ y: -10, rotate: index % 2 === 0 ? -1.5 : 1.5 }}
                >
                  <img src={image} alt="Delhi International School gallery" />
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="admissions-section page-width" id="admissions">
          <motion.div className="admissions-banner" {...fadeUp} whileHover={{ y: -6 }}>
            <div>
              <p className="eyebrow">Admission registration</p>
              <h2>Admissions are open for playgroup to grade 10 for 2026-2027.</h2>
              <p>
                Families can schedule a visit, meet the team, and complete registration with guidance
                from the school admissions office.
              </p>
            </div>
            <div className="hero-actions compact">
              <motion.a className="button button-primary" href="tel:9448220170" whileHover={{ y: -4 }}>
                Call 9448220170
              </motion.a>
              <motion.a className="button button-secondary" href="mailto:admissions@delhiinternationalschool.edu" whileHover={{ y: -4 }}>
                Request Information
              </motion.a>
            </div>
          </motion.div>
          <div className="admissions-steps">
            {admissionsSteps.map((step, index) => (
              <motion.article
                key={step.id}
                className="admission-step-card"
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: index * 0.08 }}
                whileHover={{ y: -8, rotateX: -4 }}
              >
                <span>{step.id}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </motion.article>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer page-width">
        <div>
          <p className="eyebrow">Delhi International School</p>
          <h2>Quality CBSE learning with character, confidence, and joy.</h2>
        </div>
        <div className="footer-meta">
          <p>Holehonnur Road, Gurupura, Shimoga</p>
          <a href="tel:9448220170">+91 9448220170</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
