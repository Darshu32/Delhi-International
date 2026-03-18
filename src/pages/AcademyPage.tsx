import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

export default function AcademyPage() {
  const sliderImages = [
    { src: "./student%20.jpeg", alt: "Students studying in the school library" },
    { src: "./experiment.jpeg", alt: "Student presenting an academic project display" },
  ];
  const academyShowcases = [
    {
      title: "Skill Development Programs",
      intro:
        "Communication Excellence through dedicated spoken English programs that build confidence and fluency.",
      bullets: [
        "Confidence Building Activities that encourage self-expression, public speaking, and stage presence",
        "Critical Thinking Skills developed through interactive and problem-solving based learning",
        "Leadership & Life Skills nurtured through collaborative activities and real-world exposure",
      ],
      image: { src: "./student%20.jpeg", alt: "Students studying in the school library" },
    },
    {
      title: "Expert & Dedicated Faculty",
      bullets: [
        "10+ Years of Experience ensuring strong academic foundations and proven teaching excellence",
        "Highly Qualified Educators with advanced degrees and deep subject expertise",
        "Innovative Teaching Methods that make learning engaging, practical, and effective",
        "Personal Mentorship Approach with friendly teachers guiding every student's growth",
      ],
      image: { src: "./teacher.jpeg", alt: "Teacher guiding students in an interactive academic session" },
    },
    {
      title: "Personalized Learning & Mentorship",
      bullets: [
        "Dedicated Mentorship Program where each student is personally guided by assigned faculty",
        "Individual Attention for Every Student ensuring no child is left behind",
        "Parent-Teacher Connect with open and easy communication for regular updates",
        "D-STS (Student Tracking System) to continuously track progress and learning outcomes",
        "Personalized Learning Plans based on each student's strengths, pace, and potential",
        "Customized Assignments & Assessments to enhance performance and build confidence",
      ],
      image: { src: "./experiment.jpeg", alt: "Student presenting an academic project display" },
    },
  ];
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % sliderImages.length);
    }, 2800);

    return () => window.clearInterval(timer);
  }, [sliderImages.length]);

  return (
    <main className="inner-page">
      <section className="page-hero page-width academy-page">
        <motion.div className="page-hero-layout academy-hero-layout" {...fadeUp}>
          <motion.div
            className="academy-photo-card"
            initial={{ opacity: 0, y: 28, rotate: 4, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, rotate: -3, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            whileHover={{ y: -10, rotate: -5, scale: 1.02 }}
          >
            <span className="academy-photo-shape" />
            <span className="academy-photo-orb academy-photo-orb-one" />
            <span className="academy-photo-orb academy-photo-orb-two" />
            <AnimatePresence mode="wait">
              <motion.img
                key={sliderImages[activeImage].src}
                src={sliderImages[activeImage].src}
                alt={sliderImages[activeImage].alt}
                initial={{ opacity: 0, x: 20, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.98 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              />
            </AnimatePresence>
            <div className="academy-slider-dots">
              {sliderImages.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  className={index === activeImage ? "is-active" : ""}
                  aria-label={`Show academic image ${index + 1}`}
                  onClick={() => setActiveImage(index)}
                />
              ))}
            </div>
          </motion.div>

          <div className="page-hero-copy academy-copy">
            <p className="eyebrow">Academics</p>
            <h1>A dedicated academic page for curriculum, learning outcomes, and grade-wise structure.</h1>
            <p>
              This page is ready for your upcoming academic content, including curriculum details,
              methodology, faculty focus, grade progression, labs, and performance philosophy.
            </p>
            <div className="academy-chip-row" aria-label="Academic highlights">
              <span>Concept clarity</span>
              <span>Activity-led learning</span>
              <span>Progress tracking</span>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="page-width academy-showcase-list">
        {academyShowcases.map((item, index) => (
          <motion.article
            key={item.title}
            className={`academy-showcase ${index % 2 === 1 ? "reverse" : ""}`}
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: index * 0.08 }}
          >
            <motion.div className="academy-showcase-copy inner-card" whileHover={{ y: -8, rotateX: -4 }}>
              <p className="eyebrow">Academics</p>
              <h3>{item.title}</h3>
              {"intro" in item ? (
                <>
                  <p>{item.intro}</p>
                  <ul className="academy-showcase-list-points">
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </>
              ) : "bullets" in item ? (
                <ul className="academy-showcase-list-points academy-showcase-list-points-standalone">
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : (
                <p>{item.text}</p>
              )}
            </motion.div>

            <motion.div className="academy-showcase-media" whileHover={{ y: -10, rotateX: -6, rotateY: index % 2 === 0 ? 6 : -6 }}>
              <span className="academy-showcase-glow" />
              <img src={item.image.src} alt={item.image.alt} />
            </motion.div>
          </motion.article>
        ))}
      </section>
    </main>
  );
}
