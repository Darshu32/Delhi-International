import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

const disWayPrograms = [
  {
    title: "WoW Wednesday",
    text:
      "A specially curated mid-week experience designed to break routine learning, where students engage in creative, hands-on activities that enhance curiosity, collaboration, and practical understanding.",
    accent: "orange",
  },
  {
    title: "Super Saturday",
    text:
      "A unique no-bag day dedicated to sports, creativity, and passion-driven activities, giving students the freedom to explore their interests beyond academics in a stress-free environment.",
    accent: "blue",
  },
  {
    title: "Student-Led Learning",
    subtitle: "Reverse Teaching Approach",
    text:
      "An interactive learning model where students take the lead in presenting concepts while teachers guide as facilitators, encouraging deeper understanding, confidence, and active participation.",
    accent: "green",
  },
  {
    title: "Confidence & Stage Development",
    text:
      "Focused initiatives to eliminate stage fear through regular presentations, activities, and public speaking opportunities, helping students build confidence, a key skill in today's world.",
    accent: "peach",
  },
  {
    title: "Clubs & Interest-Based Learning",
    text:
      "A variety of student clubs designed to nurture talents and interests, providing platforms for creativity, leadership, teamwork, and overall personality development.",
    accent: "yellow",
  },
];

export default function TheDisWayPage() {
  return (
    <main className="inner-page">
      <section className="page-hero page-width dis-way-page">
        <motion.div className="page-hero-copy dis-way-hero" {...fadeUp}>
          <p className="eyebrow">The DIS Way</p>
          <h1>Signature experiences that make school life creative, confident, and deeply engaging.</h1>
          <p>
            The DIS Way brings together joyful learning, student leadership, expression, confidence,
            and interest-based exploration so children grow beyond textbooks into capable, future-ready
            individuals.
          </p>
          <div className="academy-chip-row" aria-label="The DIS Way highlights">
            <span>Hands-on exploration</span>
            <span>Confidence-building culture</span>
            <span>Interest-led growth</span>
          </div>
        </motion.div>
      </section>

      <section className="page-width dis-way-highlight-grid">
        {disWayPrograms.slice(0, 2).map((item, index) => (
          <motion.article
            key={item.title}
            className={`inner-card dis-way-feature dis-way-feature-${item.accent}`}
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: index * 0.08 }}
            whileHover={{ y: -12, rotateX: -5, rotateY: index % 2 === 0 ? 6 : -6 }}
          >
            <p className="eyebrow">The DIS Way</p>
            <h2>{item.title}</h2>
            <p>{item.text}</p>
          </motion.article>
        ))}
      </section>

      <section className="page-width dis-way-stack">
        {disWayPrograms.slice(2).map((item, index) => (
          <motion.article
            key={item.title}
            className={`dis-way-story dis-way-story-${item.accent} ${index % 2 === 1 ? "reverse" : ""}`}
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: index * 0.08 }}
          >
            <motion.div
              className="dis-way-story-copy inner-card"
              whileHover={{ y: -10, rotateX: -4, rotateY: index % 2 === 0 ? 4 : -4 }}
            >
              <p className="eyebrow">The DIS Way</p>
              <h3>{item.title}</h3>
              {item.subtitle ? <strong>{item.subtitle}</strong> : null}
              <p>{item.text}</p>
            </motion.div>

            <motion.div
              className="dis-way-story-visual"
              whileHover={{ y: -12, rotateX: -6, rotateY: index % 2 === 0 ? 8 : -8 }}
            >
              <span className="dis-way-story-orb" />
              <div className="dis-way-story-panel">
                <span className="dis-way-story-badge">{item.title.split(" ")[0]}</span>
                <div className="dis-way-story-lines">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </motion.div>
          </motion.article>
        ))}
      </section>
    </main>
  );
}
