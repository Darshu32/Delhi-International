import { lazy, Suspense, useRef } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { admissionsSteps, galleryImages, programs, stats } from "../siteContent";

const HeroScene = lazy(() => import("../HeroScene"));

const fadeUp = {
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

function InteractiveHeroCard() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [9, -9]), { stiffness: 140, damping: 18 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 140, damping: 18 });

  const handleMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
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

export default function HomePage() {
  return (
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
            <motion.a className="button button-primary" href="/admissions" whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              Our Admissions
            </motion.a>
            <motion.a className="button button-secondary" href="/campus" whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
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

      <section className="stats-strip page-width">
        {stats.map((stat, index) => (
          <motion.article key={stat.label} className={`stat-card ${stat.tint}`} {...fadeUp} transition={{ ...fadeUp.transition, delay: index * 0.06 }}>
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

      <section className="story-section page-width">
        <motion.div className="section-heading centered" {...fadeUp}>
          <p className="eyebrow">Nurturing young minds</p>
          <h2>One lesson at a time, one confident child at a time.</h2>
        </motion.div>
        <div className="program-grid">
          {programs.map((program, index) => (
            <motion.article
              key={program.title}
              className={`program-card ${program.color} ${program.image ? "program-card-featured" : ""}`}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: index * 0.08 }}
              whileHover={{ y: -14, rotateX: -7, rotateY: index % 2 === 0 ? 8 : -8, scale: 1.015 }}
            >
              <div className={`program-icon ${program.icon}`} />
              {program.image ? (
                <motion.div
                  className="program-floating-photo"
                  initial={{ opacity: 0, y: 24, rotate: 6, scale: 0.92 }}
                  whileInView={{ opacity: 1, y: 0, rotate: -5, scale: 1 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.8, delay: 0.15 }}
                  whileHover={{ y: -14, rotate: -10, scale: 1.06 }}
                >
                  <img src={program.image} alt="Delhi International School campus building" />
                </motion.div>
              ) : null}
              <h3>{program.title}</h3>
              <p>{program.text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="timing-section page-width">
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

      <section className="gallery-section">
        <div className="page-width">
          <motion.div className="section-heading centered" {...fadeUp}>
            <p className="eyebrow">Student gallery</p>
            <h2>Spaces that feel bright, active, and full of possibility.</h2>
          </motion.div>
          <div className="gallery-strip">
            {galleryImages.map((image, index) => (
              <motion.article key={`${image}-${index}`} className="gallery-card" {...fadeUp} transition={{ ...fadeUp.transition, delay: index * 0.06 }}>
                <img src={image} alt="Delhi International School gallery" />
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="admissions-section page-width">
        <motion.div className="admissions-banner" {...fadeUp}>
          <div>
            <p className="eyebrow">Admission registration</p>
            <h2>Admissions are open for playgroup to grade 10 for 2026-2027.</h2>
            <p>
              Families can schedule a visit, meet the team, and complete registration with guidance
              from the school admissions office.
            </p>
          </div>
          <div className="hero-actions compact">
            <a className="button button-primary" href="tel:9448220170">Call 9448220170</a>
            <a className="button button-secondary" href="mailto:admissions@delhiinternationalschool.edu">Request Information</a>
          </div>
        </motion.div>
        <div className="admissions-steps">
          {admissionsSteps.map((step, index) => (
            <motion.article key={step.id} className="admission-step-card" {...fadeUp} transition={{ ...fadeUp.transition, delay: index * 0.08 }}>
              <span>{step.id}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
}
