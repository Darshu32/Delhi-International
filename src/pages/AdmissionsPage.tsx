import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { admissionsSteps } from "../siteContent";

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.12 }, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } };

const grades = ["Playgroup", "Nursery", "LKG", "UKG", "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10"];

const eligibility = [
  { grade: "Playgroup", age: "2+ years", docs: "Birth certificate, Aadhaar (child & parent), 4 photos" },
  { grade: "Nursery – UKG", age: "3 – 5 years", docs: "Birth certificate, Aadhaar, Transfer certificate (if applicable)" },
  { grade: "Grade 1 – 5", age: "6 – 10 years", docs: "TC, Report card, Aadhaar, 4 photos" },
  { grade: "Grade 6 – 10", age: "11 – 15 years", docs: "TC, Report card (last 2 years), Aadhaar, 4 photos" },
];

const faqs = [
  { q: "What curriculum does DIS follow?", a: "Delhi International School follows the CBSE (Central Board of Secondary Education) curriculum, ensuring a nationally recognized and future-ready education framework." },
  { q: "What is the admission process?", a: "The process involves three simple steps: connect with our admissions team for counselling, visit the campus to experience the environment, and complete the registration formalities." },
  { q: "Is transport facility available?", a: "Yes, we provide safe and reliable transport facilities covering major areas in and around Shimoga. Routes and timings are shared during the admission process." },
  { q: "What are the school timings?", a: "School operates from 8:30 AM to 3:30 PM for all grades. Playgroup and Nursery have flexible half-day options available." },
  { q: "Can I visit the campus before admission?", a: "Absolutely! We encourage all parents to schedule a campus visit. You can book a visit through our enquiry form or by calling us directly." },
  { q: "Are scholarships available?", a: "Yes, merit-based scholarships and fee concessions are available for deserving students. Please speak with the admissions team for details." },
];

export default function AdmissionsPage() {
  const [formData, setFormData] = useState({ studentName: "", parentName: "", phone: "", email: "", grade: "", city: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"enquiry" | "visit">("enquiry");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((c) => ({ ...c, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const type = activeTab === "visit" ? "Campus Visit Request" : "Admission Enquiry";
    let msg = `*New ${type}*%0A%0A*Student Name:* ${formData.studentName}%0A*Parent Name:* ${formData.parentName}%0A*Phone:* ${formData.phone}%0A*Grade:* ${formData.grade}%0A*City:* ${formData.city}`;
    if (formData.email) msg += `%0A*Email:* ${formData.email}`;
    if (formData.message) msg += `%0A*Message:* ${formData.message}`;
    window.open(`https://wa.me/919448220170?text=${msg}`, "_blank");
    setSubmitted(true);
  };

  const resetForm = () => {
    setFormData({ studentName: "", parentName: "", phone: "", email: "", grade: "", city: "", message: "" });
    setSubmitted(false);
  };

  return (
    <main>
      {/* Hero */}
      <section className="bg-navy relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-accent/6 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-green/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-20">
          <motion.div className="max-w-2xl" {...fadeUp}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green/10 text-[11px] font-bold text-green uppercase tracking-wider border border-green/20 mb-4">
              <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
              Admissions Open 2026-27
            </span>
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-4">
              Your child's journey to excellence starts here.
            </h1>
            <p className="text-sm md:text-base text-white/50 leading-relaxed mb-6">
              Enquire now for Playgroup to Grade 10. Our admissions team is here to guide you through every step — from your first call to the first day of school.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#enquiry-form" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-navy font-extrabold text-sm shadow-glow hover:bg-accent-light active:scale-[0.97] transition-all">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                Enquire Now
              </a>
              <a href="tel:9448220170" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 text-white font-bold text-sm border border-white/10 hover:bg-white/15 active:scale-[0.97] transition-all">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                Call 9448220170
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 -mt-6 relative z-10 pb-10">
        <div className="grid md:grid-cols-3 gap-4">
          {admissionsSteps.map((step, i) => (
            <motion.article key={step.id} className="group p-5 md:p-6 rounded-2xl bg-white border border-border shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300" {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }}>
              <span className="inline-grid place-items-center w-10 h-10 mb-3 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 text-accent-dark font-extrabold text-sm border border-accent/20 group-hover:bg-accent group-hover:text-navy transition-all duration-300">{step.id}</span>
              <h3 className="font-display text-lg font-bold text-text-primary mb-1.5">{step.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{step.text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Enquiry Form */}
      <section id="enquiry-form" className="max-w-7xl mx-auto px-4 md:px-6 pb-12 scroll-mt-24">
        <motion.div className="rounded-3xl bg-white border border-border shadow-card overflow-hidden" {...fadeUp}>
          <div className="grid lg:grid-cols-5">
            {/* Left Info Panel */}
            <div className="lg:col-span-2 p-6 md:p-8 lg:p-10 bg-navy text-white relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-accent/8 blur-3xl" />
              <div className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full bg-green/8 blur-3xl" />
              <div className="relative">
                <p className="text-[11px] font-bold tracking-widest uppercase text-accent mb-3">Admissions 2026-27</p>
                <h2 className="font-display text-xl md:text-2xl font-bold leading-tight mb-3">Begin your child's journey with DIS.</h2>
                <p className="text-sm text-white/50 leading-relaxed mb-6">Fill in the enquiry form and our admissions counsellor will get in touch within 24 hours.</p>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <span className="w-8 h-8 shrink-0 rounded-full bg-accent/15 grid place-items-center mt-0.5">
                      <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    </span>
                    <div>
                      <p className="text-xs text-white/40 font-medium">Call us</p>
                      <a href="tel:9448220170" className="text-sm font-bold text-accent hover:text-accent-light transition-colors">+91 94482 20170</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-8 h-8 shrink-0 rounded-full bg-accent/15 grid place-items-center mt-0.5">
                      <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </span>
                    <div>
                      <p className="text-xs text-white/40 font-medium">Visit us</p>
                      <p className="text-sm font-semibold text-white/80">Holehonnur Road, Gurupura, Shimoga</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-8 h-8 shrink-0 rounded-full bg-accent/15 grid place-items-center mt-0.5">
                      <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </span>
                    <div>
                      <p className="text-xs text-white/40 font-medium">Office hours</p>
                      <p className="text-sm font-semibold text-white/80">Mon – Sat, 9:00 AM – 4:00 PM</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {["CBSE Curriculum", "Playgroup to Grade 10", "Campus Visits Welcome"].map((c) => (
                    <span key={c} className="px-3 py-1.5 rounded-full bg-white/10 text-[11px] font-semibold text-white/70 border border-white/10">{c}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Form Panel */}
            <div className="lg:col-span-3 p-6 md:p-8 lg:p-10">
              {/* Tabs */}
              <div className="flex gap-1 p-1 rounded-xl bg-surface-muted mb-6">
                {(["enquiry", "visit"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => { setActiveTab(tab); setSubmitted(false); }}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 ${activeTab === tab ? "bg-white text-navy shadow-sm" : "text-text-muted hover:text-text-secondary"}`}
                  >
                    {tab === "enquiry" ? "Admission Enquiry" : "Book Campus Visit"}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center text-center gap-4 py-8"
                  >
                    <span className="w-16 h-16 rounded-full bg-green/10 grid place-items-center">
                      <svg className="w-8 h-8 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-bold text-navy mb-1">
                        {activeTab === "enquiry" ? "Thank you for your enquiry!" : "Visit request received!"}
                      </h3>
                      <p className="text-sm text-text-secondary max-w-sm">
                        {activeTab === "enquiry"
                          ? "Our admissions counsellor will call you within 24 hours to guide you through the next steps."
                          : "We'll confirm your campus visit date and time shortly. Looking forward to welcoming you!"}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 mt-2">
                      <a href="tel:9448220170" className="inline-flex items-center justify-center min-h-11 px-6 rounded-full bg-accent text-navy font-bold text-sm shadow-glow">Call Now</a>
                      <button type="button" onClick={resetForm} className="inline-flex items-center justify-center min-h-11 px-6 rounded-full bg-surface-muted text-text-primary font-bold text-sm border border-border hover:bg-surface-dim transition-colors">Submit Another</button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key={activeTab}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="grid sm:grid-cols-2 gap-4"
                    onSubmit={handleSubmit}
                  >
                    <label className="flex flex-col gap-1.5">
                      <span className="text-xs font-bold text-navy">Student Name <span className="text-red-500">*</span></span>
                      <input name="studentName" value={formData.studentName} onChange={handleInput} placeholder="Enter student's full name" autoComplete="name" required className="w-full min-h-11 px-4 rounded-xl border border-border bg-surface-dim text-text-primary text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all placeholder:text-text-muted/50" />
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="text-xs font-bold text-navy">Parent/Guardian Name <span className="text-red-500">*</span></span>
                      <input name="parentName" value={formData.parentName} onChange={handleInput} placeholder="Enter parent's full name" autoComplete="name" required className="w-full min-h-11 px-4 rounded-xl border border-border bg-surface-dim text-text-primary text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all placeholder:text-text-muted/50" />
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="text-xs font-bold text-navy">Phone Number <span className="text-red-500">*</span></span>
                      <input name="phone" value={formData.phone} onChange={handleInput} placeholder="+91 XXXXX XXXXX" autoComplete="tel" inputMode="tel" required className="w-full min-h-11 px-4 rounded-xl border border-border bg-surface-dim text-text-primary text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all placeholder:text-text-muted/50" />
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="text-xs font-bold text-navy">Email Address</span>
                      <input name="email" type="email" value={formData.email} onChange={handleInput} placeholder="parent@email.com" autoComplete="email" className="w-full min-h-11 px-4 rounded-xl border border-border bg-surface-dim text-text-primary text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all placeholder:text-text-muted/50" />
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="text-xs font-bold text-navy">Grade Applying For <span className="text-red-500">*</span></span>
                      <select name="grade" value={formData.grade} onChange={handleInput} required className="w-full min-h-11 px-4 rounded-xl border border-border bg-surface-dim text-text-primary text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all">
                        <option value="">Select grade</option>
                        {grades.map((g) => <option key={g} value={g}>{g}</option>)}
                      </select>
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="text-xs font-bold text-navy">City <span className="text-red-500">*</span></span>
                      <input name="city" value={formData.city} onChange={handleInput} placeholder="Enter your city" autoComplete="address-level2" required className="w-full min-h-11 px-4 rounded-xl border border-border bg-surface-dim text-text-primary text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all placeholder:text-text-muted/50" />
                    </label>
                    {activeTab === "visit" && (
                      <label className="flex flex-col gap-1.5 sm:col-span-2">
                        <span className="text-xs font-bold text-navy">Preferred Visit Date & Time</span>
                        <input name="message" value={formData.message} onChange={handleInput} placeholder="e.g. Saturday 10 AM, or any weekday afternoon" className="w-full min-h-11 px-4 rounded-xl border border-border bg-surface-dim text-text-primary text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all placeholder:text-text-muted/50" />
                      </label>
                    )}
                    {activeTab === "enquiry" && (
                      <label className="flex flex-col gap-1.5 sm:col-span-2">
                        <span className="text-xs font-bold text-navy">Any specific questions?</span>
                        <textarea name="message" value={formData.message} onChange={handleInput} placeholder="Ask about curriculum, fees, transport, or anything else..." rows={3} className="w-full px-4 py-3 rounded-xl border border-border bg-surface-dim text-text-primary text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all placeholder:text-text-muted/50 resize-none" />
                      </label>
                    )}
                    <div className="sm:col-span-2">
                      <button type="submit" className="w-full min-h-12 rounded-full bg-accent text-navy font-extrabold text-sm shadow-glow hover:bg-accent-light active:scale-[0.98] transition-all">
                        {activeTab === "enquiry" ? "Submit Enquiry" : "Request Campus Visit"}
                      </button>
                      <p className="text-[11px] text-text-muted text-center mt-3">We respect your privacy. Your information is safe with us.</p>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Eligibility Table */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-12">
        <motion.div {...fadeUp}>
          <h2 className="font-display text-xl md:text-2xl font-bold text-text-primary mb-6">Eligibility & Documents</h2>
          <div className="rounded-2xl border border-border overflow-hidden shadow-card">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-navy text-white text-left">
                    <th className="px-5 py-3 font-bold text-xs uppercase tracking-wider">Grade</th>
                    <th className="px-5 py-3 font-bold text-xs uppercase tracking-wider">Age Requirement</th>
                    <th className="px-5 py-3 font-bold text-xs uppercase tracking-wider">Documents Needed</th>
                  </tr>
                </thead>
                <tbody>
                  {eligibility.map((row, i) => (
                    <tr key={row.grade} className={`border-t border-border ${i % 2 === 0 ? "bg-white" : "bg-surface-dim"}`}>
                      <td className="px-5 py-3.5 font-bold text-navy whitespace-nowrap">{row.grade}</td>
                      <td className="px-5 py-3.5 text-text-secondary whitespace-nowrap">{row.age}</td>
                      <td className="px-5 py-3.5 text-text-secondary">{row.docs}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FAQs */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-16">
        <motion.div {...fadeUp}>
          <h2 className="font-display text-xl md:text-2xl font-bold text-text-primary mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-2xl border border-border bg-white shadow-sm overflow-hidden transition-all">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-surface-dim transition-colors"
                >
                  <span className="font-bold text-sm text-text-primary">{faq.q}</span>
                  <svg className={`w-5 h-5 shrink-0 text-text-muted transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-4 text-sm text-text-secondary leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-12">
        <motion.div className="p-6 md:p-10 rounded-3xl bg-navy text-white text-center relative overflow-hidden" {...fadeUp}>
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-40 bg-accent/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="relative">
            <h2 className="font-display text-xl md:text-2xl font-bold leading-tight mb-3">Still have questions? Let's talk.</h2>
            <p className="text-sm text-white/50 mb-6 max-w-lg mx-auto">Our admissions team is happy to help you with any questions about the school, curriculum, fees, or the admission process.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="tel:9448220170" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-navy font-extrabold text-sm shadow-glow hover:bg-accent-light active:scale-[0.97] transition-all">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                Call 9448220170
              </a>
              <a href="#enquiry-form" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 text-white font-bold text-sm border border-white/15 hover:bg-white/15 active:scale-[0.97] transition-all">
                Fill Enquiry Form
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
