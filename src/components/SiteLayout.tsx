import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const navLinks = [
  { to: "/about", label: "About" },
  { to: "/the-dis-way", label: "The DIS Way", featured: true },
  { to: "/academics", label: "Academics" },
  { to: "/programs", label: "Programs" },
  { to: "/campus", label: "Campus" },
  { to: "/gallery", label: "Gallery" },
  { to: "/admissions", label: "Admissions" },
];

export default function SiteLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    studentName: "",
    parentName: "",
    phone: "",
    grade: "",
    city: "",
  });

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSubmitted(false);
      setPopupOpen(true);
    }, 650);

    return () => window.clearTimeout(timer);
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

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
        <NavLink className="brand" to="/" aria-label="Delhi International School home" onClick={() => setMenuOpen(false)}>
          <span className="brand-logo-wrap">
            <img className="brand-logo" src="./delhi%20logo.png" alt="Delhi International School logo" />
          </span>
          <span className="brand-copy">
            <strong>Delhi International School</strong>
            <span>Shimoga, Karnataka</span>
          </span>
        </NavLink>

        <button className="menu-toggle" aria-label="Open menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
          <span />
          <span />
        </button>

        <nav className={`site-nav ${menuOpen ? "is-open" : ""}`}>
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                [isActive ? "is-active" : "", link.featured ? "site-nav-featured" : ""]
                  .filter(Boolean)
                  .join(" ")
              }
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </header>

      {popupOpen ? (
        <div className="admission-popup-backdrop" role="presentation" onClick={() => setPopupOpen(false)}>
          <div
            className="admission-popup"
            role="dialog"
            aria-modal="true"
            aria-labelledby="admission-popup-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button className="admission-popup-close" type="button" aria-label="Close popup" onClick={() => setPopupOpen(false)}>
              x
            </button>
            <div className="admission-popup-copy">
              <p className="eyebrow">Admissions 2026-27</p>
              <h2 id="admission-popup-title">Begin your child’s journey with Delhi International School.</h2>
              <p>
                Enquire now for playgroup to grade 10 and get guidance on admissions, campus visit,
                and the learning experience at DIS.
              </p>
              <div className="academy-chip-row" aria-label="Admission highlights">
                <span>CBSE curriculum</span>
                <span>Future-ready campus</span>
                <span>Confidence-led learning</span>
              </div>
            </div>

            {submitted ? (
              <div className="admission-popup-success">
                <strong>Thank you for your enquiry.</strong>
                <p>Our team will connect with you shortly to help with admissions.</p>
                <div className="hero-actions compact">
                  <a className="button button-primary" href="tel:9448220170">
                    Call 9448220170
                  </a>
                  <button className="button button-secondary" type="button" onClick={() => setPopupOpen(false)}>
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form className="admission-popup-form" onSubmit={handleSubmit}>
                <label>
                  Student Name
                  <input name="studentName" value={formData.studentName} onChange={handleInputChange} placeholder="Enter student name" required />
                </label>
                <label>
                  Parent Name
                  <input name="parentName" value={formData.parentName} onChange={handleInputChange} placeholder="Enter parent name" required />
                </label>
                <label>
                  Phone Number
                  <input name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Enter phone number" required />
                </label>
                <label>
                  Grade Applying For
                  <select name="grade" value={formData.grade} onChange={handleInputChange} required>
                    <option value="">Select grade</option>
                    <option value="Playgroup">Playgroup</option>
                    <option value="Kindergarten">Kindergarten</option>
                    <option value="Primary">Primary</option>
                    <option value="Middle School">Middle School</option>
                    <option value="High School">High School</option>
                  </select>
                </label>
                <label>
                  City
                  <input name="city" value={formData.city} onChange={handleInputChange} placeholder="Enter city" required />
                </label>
                <button className="button button-primary" type="submit">
                  Request a Callback
                </button>
              </form>
            )}
          </div>
        </div>
      ) : null}

      <Outlet />

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
