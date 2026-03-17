import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
};

const metrics = [
  { value: "10", label: "Grades from playgroup to 10" },
  { value: "8", label: "Signature skill-building programs" },
  { value: "1", label: "Recognized among top city-wise CBSE schools" },
];

const features = [
  {
    id: "01",
    title: "Strong academic foundation",
    text: "Structured CBSE learning backed by experienced faculty, classroom clarity, and supportive progress tracking.",
  },
  {
    id: "02",
    title: "Life skills in real practice",
    text: "Personal grooming, language development, social skills, and hidden talent discovery are built into the student journey.",
  },
  {
    id: "03",
    title: "Confidence through exposure",
    text: "Educational exploration, activity-led Saturdays, and creative programs help students grow beyond textbooks.",
  },
];

const journey = [
  {
    step: "Stage 01",
    title: "Playgroup to Primary",
    text: "Warm, joyful classrooms focused on foundational literacy, numeracy, rhythm, movement, and curiosity.",
  },
  {
    step: "Stage 02",
    title: "Middle school acceleration",
    text: "Students build analytical thinking through guided projects, math lab work, communication practice, and structured exploration.",
  },
  {
    step: "Stage 03",
    title: "Grade 10 preparedness",
    text: "Focused mentoring, disciplined academics, and a balanced approach to exam readiness and confidence building.",
  },
];

const highlights = [
  {
    label: "Recognition",
    title: "Ranked No. 1 in Shimoga in 2022 among India's top city-wise CBSE schools.",
    wide: true,
  },
  {
    label: "Program",
    title: "WoW Wednesday",
    text: "Weekly engagement blocks that make learning memorable and social.",
  },
  {
    label: "Program",
    title: "Super Saturday",
    text: "Hands-on sessions that blend talent, curiosity, and co-curricular exposure.",
  },
  {
    label: "Growth",
    title: "Self-development and personal grooming",
    text: "Children build discipline, presentation, and everyday confidence early.",
  },
  {
    label: "Discovery",
    title: "Hidden talent search",
    text: "An active school culture that notices and nurtures individual strengths.",
  },
];

const ambientBlobs = [
  { id: 1, size: 160, top: "12%", left: "10%", delay: 0.2 },
  { id: 2, size: 220, top: "18%", left: "78%", delay: 1.1 },
  { id: 3, size: 140, top: "54%", left: "72%", delay: 0.7 },
  { id: 4, size: 200, top: "74%", left: "18%", delay: 1.6 },
  { id: 5, size: 120, top: "82%", left: "88%", delay: 0.4 },
];

function useCountUp(target, duration = 1.4) {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) {
      return;
    }

    let frameId = 0;
    let start;

    const animate = (time) => {
      if (!start) {
        start = time;
      }

      const progress = Math.min((time - start) / (duration * 1000), 1);
      setValue(Math.floor(progress * target));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setValue(target);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [duration, started, target]);

  return [value, setStarted];
}

function MetricCard({ value, label }) {
  const [count, startCount] = useCountUp(Number(value));

  return (
    <motion.article
      className="metric-card"
      {...fadeUp}
      onViewportEnter={() => startCount(true)}
      whileHover={{ y: -10, rotateX: -6, rotateY: 6 }}
    >
      <strong>{count}</strong>
      <span>{label}</span>
    </motion.article>
  );
}

function AmbientScene() {
  return (
    <div className="cosmic-layer" aria-hidden="true">
      {ambientBlobs.map((blob) => (
        <motion.span
          key={blob.id}
          className="cosmic-blob"
          style={{ width: blob.size, height: blob.size, top: blob.top, left: blob.left }}
          animate={{ y: [0, -22, 0], x: [0, 14, 0], opacity: [0.16, 0.45, 0.16] }}
          transition={{ duration: 7 + blob.delay, repeat: Infinity, ease: "easeInOut", delay: blob.delay }}
        />
      ))}
    </div>
  );
}

function HeroTiltCard() {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { stiffness: 140, damping: 18 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-14, 14]), { stiffness: 140, damping: 18 });

  const handleMove = (event) => {
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
      className="hero-panel"
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      initial={{ opacity: 0, scale: 0.92, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="hero-panel-top">
        <span className="pill">Admissions Open</span>
        <span className="panel-note">2026-2027</span>
      </div>

      <div className="hero-image-wrap">
        <motion.img
          src="https://delhiinternationalshimoga.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-11-at-11.20.16-AM-1022x458.jpeg"
          alt="Delhi International School campus"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.8 }}
        />
      </div>

      <motion.div
        className="floating-card floating-card-primary"
        initial={{ opacity: 0, x: -32 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <span className="mini-label">School highlights</span>
        <strong>WoW Wednesday, Super Saturday, Abacus, language lab</strong>
      </motion.div>

      <motion.div
        className="floating-card floating-card-secondary"
        initial={{ opacity: 0, x: 32 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <span className="mini-label">Location</span>
        <strong>Holehonnur Road, Gurupura, Shimoga</strong>
      </motion.div>

      <motion.div
        className="scan-ring"
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />
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
    <div className="page-shell">
      <AmbientScene />

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Delhi International School home">
          <span className="brand-mark">DIS</span>
          <span className="brand-copy">
            <strong>Delhi International School</strong>
            <span>CBSE Affiliation No. 831022</span>
          </span>
        </a>

        <button
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-label="Open menu"
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span />
          <span />
        </button>

        <nav className={`site-nav ${menuOpen ? "is-open" : ""}`}>
          {["about", "journey", "campus", "admissions"].map((item) => (
            <a key={item} href={`#${item}`} onClick={() => setMenuOpen(false)}>
              {item === "journey" ? "Academics" : item.charAt(0).toUpperCase() + item.slice(1)}
            </a>
          ))}
          <a className="nav-cta" href="tel:9448220170" onClick={() => setMenuOpen(false)}>
            Call Now
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="hero section">
          <div className="orb orb-one" />
          <div className="orb orb-two" />

          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <p className="eyebrow">Shimoga's progressive CBSE campus</p>
            <h1>Designed for curious minds, confident voices, and future-ready learners.</h1>
            <p className="hero-text">
              Delhi International School brings together modern academics, life-skill development,
              and a nurturing environment on Holehonnur Road, Gurupura, Shimoga.
            </p>

            <div className="hero-actions">
              <motion.a className="button button-primary" href="#admissions" whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                Apply for 2026-2027
              </motion.a>
              <motion.a className="button button-secondary" href="#campus" whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                Explore the campus
              </motion.a>
            </div>

            <div className="hero-metrics">
              {metrics.map((metric) => (
                <MetricCard key={metric.label} value={metric.value} label={metric.label} />
              ))}
            </div>
          </motion.div>

          <div className="hero-visual">
            <HeroTiltCard />
          </div>
        </section>

        <section className="announcement-bar">
          <div className="announcement-track">
            <span>Admissions open for 2026-2027</span>
            <span>CBSE-affiliated learning ecosystem</span>
            <span>Holistic development and life skills focus</span>
            <span>Call 9448220170 for enquiries</span>
            <span>Admissions open for 2026-2027</span>
            <span>CBSE-affiliated learning ecosystem</span>
          </div>
        </section>

        <section className="section" id="about">
          <motion.div className="section-heading" {...fadeUp}>
            <p className="eyebrow">Why families choose DIS</p>
            <h2>A premium school experience with substance behind the style.</h2>
          </motion.div>

          <div className="feature-grid">
            {features.map((feature, index) => (
              <motion.article
                key={feature.id}
                className="feature-card"
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: index * 0.08 }}
                whileHover={{ y: -12, rotateX: -6, rotateY: index % 2 === 0 ? 6 : -6 }}
              >
                <span>{feature.id}</span>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="section" id="journey">
          <motion.div className="section-heading" {...fadeUp}>
            <p className="eyebrow">Learning journey</p>
            <h2>From early years to board readiness, every stage has a clear purpose.</h2>
          </motion.div>

          <div className="journey-layout">
            {journey.map((item, index) => (
              <motion.article
                key={item.step}
                className="journey-card"
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: index * 0.08 }}
                whileHover={{ scale: 1.02, y: -8 }}
              >
                <p className="journey-step">{item.step}</p>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="section campus-section" id="campus">
          <motion.div className="campus-media" {...fadeUp} whileHover={{ y: -8 }}>
            <motion.img
              src="https://delhiinternationalshimoga.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-11-at-11.20.16-AM-1.jpeg"
              alt="Students and school environment at Delhi International School"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.7 }}
            />
          </motion.div>

          <motion.div className="campus-copy" {...fadeUp}>
            <p className="eyebrow">Campus advantage</p>
            <h2>Modern facilities with a student-first learning atmosphere.</h2>
            <div className="campus-points">
              <article>
                <strong>Language Development Lab</strong>
                <p>Supports fluency, expression, and stronger classroom confidence.</p>
              </article>
              <article>
                <strong>Abacus and Math Lab</strong>
                <p>Improves number sense through tactile and activity-based learning.</p>
              </article>
              <article>
                <strong>Safe and nurturing environment</strong>
                <p>Built for focus, belonging, and values-driven growth.</p>
              </article>
            </div>
          </motion.div>
        </section>

        <section className="section">
          <motion.div className="section-heading" {...fadeUp}>
            <p className="eyebrow">Signature highlights</p>
            <h2>The strongest ideas from the old site, transformed into a modern premium story.</h2>
          </motion.div>

          <div className="highlights-board">
            {highlights.map((item, index) => (
              <motion.article
                key={item.title}
                className={`highlight-card ${item.wide ? "highlight-wide" : ""}`}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: index * 0.07 }}
                whileHover={{ y: -10, scale: 1.01 }}
              >
                <p className="mini-label">{item.label}</p>
                <h3>{item.title}</h3>
                {item.text ? <p>{item.text}</p> : null}
              </motion.article>
            ))}
          </div>
        </section>

        <section className="section admissions-section" id="admissions">
          <motion.div className="admission-panel" {...fadeUp} whileHover={{ y: -8 }}>
            <div>
              <p className="eyebrow">Admission registration</p>
              <h2>Admissions are open for playgroup to grade 10.</h2>
              <p>
                Families can connect directly with the school for campus visits, counselling,
                and registration support.
              </p>
            </div>

            <div className="admission-actions">
              <motion.a className="button button-primary" href="tel:9448220170" whileHover={{ y: -4 }}>
                Call 9448220170
              </motion.a>
              <motion.a className="button button-secondary" href="mailto:admissions@delhiinternationalschool.edu" whileHover={{ y: -4 }}>
                Request information
              </motion.a>
            </div>
          </motion.div>

          <div className="admission-steps">
            {[
              ["01", "Connect with the school", "Reach out for current admission availability and counselling support."],
              ["02", "Visit the campus", "Explore the environment, interact with the team, and understand the school culture."],
              ["03", "Complete registration", "Finish the admission process for the 2026-2027 academic session."],
            ].map(([id, title, text], index) => (
              <motion.article
                key={id}
                className="step-card"
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: index * 0.08 }}
                whileHover={{ y: -10, rotateX: -5 }}
              >
                <span>{id}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </motion.article>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <p className="eyebrow">Delhi International School</p>
          <h2>Learning with clarity, character, and ambition.</h2>
        </div>

        <div className="footer-meta">
          <p>Holehonnur Road, Gurupura, Shimoga</p>
          <a href="tel:9448220170">9448220170</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
