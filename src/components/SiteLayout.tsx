import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

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
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ studentName: "", parentName: "", phone: "", grade: "", city: "" });
  const location = useLocation();

  useEffect(() => { document.body.classList.toggle("menu-open", menuOpen); return () => document.body.classList.remove("menu-open"); }, [menuOpen]);
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [location.pathname]);
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 20); window.addEventListener("scroll", fn, { passive: true }); return () => window.removeEventListener("scroll", fn); }, []);
  useEffect(() => { const t = window.setTimeout(() => { setSubmitted(false); setPopupOpen(true); }, 800); return () => window.clearTimeout(t); }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => { setFormData((c) => ({ ...c, [e.target.name]: e.target.value })); };
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  return (
    <div className="min-h-dvh flex flex-col bg-white font-sans text-text-primary">
      {/* Top Ribbon */}
      <div className="hidden md:block bg-navy text-white/70">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-4 h-9 text-[11px] font-medium tracking-wider uppercase">
          <span>Summer admission season is on</span>
          <span className="hidden lg:inline">Enroll now for a future-ready CBSE experience</span>
          <span className="text-accent font-bold">Call 9448220170</span>
        </div>
      </div>

      {/* Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-navy/95 backdrop-blur-xl shadow-lg shadow-black/10" : "bg-navy"}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between gap-3 h-16 md:h-18">
          <NavLink className="flex items-center gap-2.5 min-w-0" to="/" onClick={() => setMenuOpen(false)}>
            <span className="w-10 h-10 md:w-11 md:h-11 shrink-0 rounded-xl bg-white/10 border border-white/10 grid place-items-center p-1">
              <img className="w-full h-full object-contain" src="./delhi%20logo.png" alt="DIS logo" loading="eager" />
            </span>
            <span className="min-w-0 hidden sm:block">
              <strong className="block text-sm md:text-[15px] font-display font-bold leading-tight text-white truncate">Delhi International School</strong>
              <span className="block text-[11px] text-white/50 leading-tight">Shimoga, Karnataka</span>
            </span>
          </NavLink>

          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} className={({ isActive }) => `px-3.5 py-2 rounded-lg text-[13px] font-semibold whitespace-nowrap transition-all duration-200 ${isActive ? "bg-accent text-navy" : link.featured ? "text-accent hover:text-accent-light" : "text-white/70 hover:text-white hover:bg-white/8"}`}>
                {link.label}
              </NavLink>
            ))}
            <a href="tel:9448220170" className="ml-2 px-5 py-2.5 rounded-full bg-accent text-navy text-[13px] font-extrabold hover:bg-accent-light active:scale-95 transition-all shadow-glow">Call Now</a>
          </nav>

          <button className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px] rounded-lg border border-white/10 bg-white/5 active:bg-white/10 transition-colors" aria-expanded={menuOpen} onClick={() => setMenuOpen((o) => !o)}>
            <span className={`w-4 h-[1.5px] bg-white rounded-full hamburger-line ${menuOpen ? "translate-y-[6.5px] rotate-45" : ""}`} />
            <span className={`w-4 h-[1.5px] bg-white rounded-full hamburger-line ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`w-4 h-[1.5px] bg-white rounded-full hamburger-line ${menuOpen ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </header>

      {/* Mobile Nav */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 top-16 z-40 bg-navy/98 backdrop-blur-2xl overflow-y-auto lg:hidden">
            <div className="flex flex-col gap-2 px-4 py-6">
              {navLinks.map((link, i) => (
                <motion.div key={link.to} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                  <NavLink to={link.to} className={({ isActive }) => `flex items-center justify-center w-full min-h-12 px-5 py-3 rounded-2xl text-base font-bold transition-all ${isActive ? "bg-accent text-navy" : link.featured ? "bg-accent/10 text-accent border border-accent/20" : "bg-white/5 text-white border border-white/8"}`} onClick={() => setMenuOpen(false)}>
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.a initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: navLinks.length * 0.04 }} href="tel:9448220170" className="flex items-center justify-center w-full min-h-12 px-5 py-3 rounded-full bg-accent text-navy text-base font-extrabold shadow-glow" onClick={() => setMenuOpen(false)}>Call 9448220170</motion.a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Popup */}
      <AnimatePresence>
        {popupOpen && (
          <div className="fixed inset-0 z-60 flex items-end md:items-center justify-center p-0 md:p-6 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={() => setPopupOpen(false)}>
            <div className="relative w-full md:max-w-3xl max-h-[92dvh] overflow-y-auto bg-white rounded-t-3xl md:rounded-3xl shadow-elevated animate-slide-up md:animate-slide-up-center" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
              <button className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/5 grid place-items-center text-text-secondary font-bold text-sm hover:bg-black/10 active:scale-90 transition-all" onClick={() => setPopupOpen(false)}>&times;</button>
              <div className="grid md:grid-cols-2">
                <div className="p-6 md:p-8 bg-navy text-white rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none relative overflow-hidden">
                  <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-accent/10 blur-3xl" />
                  <p className="text-[11px] font-bold tracking-widest uppercase text-accent mb-3">Admissions 2026-27</p>
                  <h2 className="font-display text-xl md:text-2xl font-bold leading-tight mb-3">Begin your child's journey with Delhi International School.</h2>
                  <p className="text-sm text-white/60 leading-relaxed mb-5">Enquire now for playgroup to grade 10 and get guidance on admissions, campus visit, and the learning experience at DIS.</p>
                  <div className="flex flex-wrap gap-2">
                    {["CBSE curriculum", "Future-ready campus", "Confidence-led learning"].map((c) => (
                      <span key={c} className="px-3 py-1.5 rounded-full bg-white/10 text-[11px] font-semibold text-white/80 border border-white/10">{c}</span>
                    ))}
                  </div>
                  <div className="mt-6 rounded-2xl overflow-hidden border border-white/10 opacity-60">
                    <img src="./student%20.jpeg" alt="" className="w-full h-32 object-cover" loading="lazy" />
                  </div>
                </div>
                <div className="p-6 md:p-8">
                  {submitted ? (
                    <div className="flex flex-col gap-3">
                      <strong className="font-display text-lg text-navy">Thank you for your enquiry.</strong>
                      <p className="text-sm text-text-muted">Our team will connect with you shortly to help with admissions.</p>
                      <div className="flex flex-col sm:flex-row gap-2 mt-2">
                        <a href="tel:9448220170" className="flex-1 flex items-center justify-center min-h-11 px-5 rounded-full bg-accent text-navy font-bold text-sm shadow-glow">Call 9448220170</a>
                        <button type="button" onClick={() => setPopupOpen(false)} className="flex-1 flex items-center justify-center min-h-11 px-5 rounded-full bg-surface-muted text-text-primary font-bold text-sm border border-border">Close</button>
                      </div>
                    </div>
                  ) : (
                    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                      {[
                        { label: "Student Name", name: "studentName", ph: "Enter student name", ac: "name" },
                        { label: "Parent Name", name: "parentName", ph: "Enter parent name", ac: "name" },
                        { label: "Phone Number", name: "phone", ph: "Enter phone number", ac: "tel", im: "tel" as const },
                      ].map((f) => (
                        <label key={f.name} className="flex flex-col gap-1">
                          <span className="text-xs font-bold text-navy">{f.label}</span>
                          <input name={f.name} value={formData[f.name as keyof typeof formData]} onChange={handleInput} placeholder={f.ph} autoComplete={f.ac} inputMode={f.im} required className="w-full min-h-11 px-3.5 rounded-xl border border-border bg-surface-dim text-text-primary text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all placeholder:text-text-muted/50" />
                        </label>
                      ))}
                      <label className="flex flex-col gap-1">
                        <span className="text-xs font-bold text-navy">Grade Applying For</span>
                        <select name="grade" value={formData.grade} onChange={handleInput} required className="w-full min-h-11 px-3.5 rounded-xl border border-border bg-surface-dim text-text-primary text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all">
                          <option value="">Select grade</option><option value="Playgroup">Playgroup</option><option value="Kindergarten">Kindergarten</option><option value="Primary">Primary</option><option value="Middle School">Middle School</option><option value="High School">High School</option>
                        </select>
                      </label>
                      <label className="flex flex-col gap-1">
                        <span className="text-xs font-bold text-navy">City</span>
                        <input name="city" value={formData.city} onChange={handleInput} placeholder="Enter city" autoComplete="address-level2" required className="w-full min-h-11 px-3.5 rounded-xl border border-border bg-surface-dim text-text-primary text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all placeholder:text-text-muted/50" />
                      </label>
                      <button type="submit" className="w-full min-h-12 mt-1 rounded-full bg-accent text-navy font-extrabold text-sm shadow-glow hover:bg-accent-light active:scale-[0.98] transition-all">Request a Callback</button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      <Outlet />

      {/* Footer */}
      <footer className="mt-auto bg-navy">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14 pb-28 md:pb-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <p className="text-[11px] font-bold tracking-widest uppercase text-accent mb-2">Delhi International School</p>
              <h2 className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight max-w-lg">Quality CBSE learning with character, confidence, and joy.</h2>
            </div>
            <div className="lg:text-right flex flex-col gap-1.5 text-sm text-white/40">
              <p>Holehonnur Road, Gurupura, Shimoga</p>
              <a href="tel:9448220170" className="text-accent hover:text-accent-light transition-colors font-semibold">+91 9448220170</a>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-white/8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-white/30">
            <span>&copy; {new Date().getFullYear()} Delhi International School. All rights reserved.</span>
            <span>CBSE Affiliation No. 831022</span>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-navy/95 backdrop-blur-xl border-t border-white/8 px-4 py-3">
        <button type="button" onClick={() => setPopupOpen(true)} className="w-full min-h-12 flex items-center justify-center gap-2 rounded-full bg-accent text-navy font-extrabold text-[15px] shadow-glow active:scale-[0.97] transition-transform">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
          Enquire Now
        </button>
      </div>
    </div>
  );
}
