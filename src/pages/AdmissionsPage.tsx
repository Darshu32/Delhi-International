import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { admissionsSteps } from "../siteContent";
import { useToast } from "../components/Toast";

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
  const { toast } = useToast();
  const [formData, setFormData] = useState({ studentName: "", parentName: "", phone: "", email: "", grade: "", city: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"enquiry" | "visit">("enquiry");

  const validate = (data: typeof formData) => {
    const errs: Record<string, string> = {};
    if (!data.studentName.trim() || data.studentName.trim().length < 2) errs.studentName = "Enter student's full name";
    if (!data.parentName.trim() || data.parentName.trim().length < 2) errs.parentName = "Enter parent's full name";
    if (!data.phone.trim()) errs.phone = "Phone number is required";
    else if (!/^[6-9]\d{9}$/.test(data.phone.replace(/[\s\-]/g, "").replace(/^\+?91/, ""))) errs.phone = "Enter a valid 10-digit mobile number";
    if (!data.grade) errs.grade = "Please select a grade";
    if (!data.city.trim()) errs.city = "City is required";
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errs.email = "Enter a valid email address";
    return errs;
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((c) => ({ ...c, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        const fieldErr = validate({ ...formData, [name]: value })[name];
        if (fieldErr) next[name] = fieldErr; else delete next[name];
        return next;
      });
    }
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    const fieldErr = validate(formData)[name];
    setErrors((prev) => { const next = { ...prev }; if (fieldErr) next[name] = fieldErr; else delete next[name]; return next; });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(formData);
    setErrors(errs);
    setTouched({ studentName: true, parentName: true, phone: true, email: true, grade: true, city: true, message: true });
    if (Object.keys(errs).length > 0) { toast(`Please fix ${Object.keys(errs).length} error(s) in the form`, "error"); return; }
    const type = activeTab === "visit" ? "Campus Visit Request" : "Admission Enquiry";
    const icon = activeTab === "visit" ? "🏫" : "📋";
    let msg = `${icon} *New ${type}*\n━━━━━━━━━━━━━━━━━━\n\n👨‍🎓 *Student:* ${formData.studentName.trim()}\n👤 *Parent:* ${formData.parentName.trim()}\n📞 *Phone:* ${formData.phone.trim()}\n🎓 *Grade:* ${formData.grade}\n📍 *City:* ${formData.city.trim()}`;
    if (formData.email) msg += `\n📧 *Email:* ${formData.email.trim()}`;
    if (formData.message) msg += `\n💬 *Message:* ${formData.message.trim()}`;
    msg += `\n\n_Sent from Delhi International School website_`;
    window.open(`https://wa.me/919448220170?text=${encodeURIComponent(msg)}`, "_blank");
    toast(activeTab === "visit" ? "Visit request sent! Complete on WhatsApp" : "Enquiry sent! Complete the message on WhatsApp", "success");
    setSubmitted(true);
  };

  const inputCls = (name: string) => `w-full min-h-11 px-4 rounded-xl border ${errors[name] && touched[name] ? "border-red-400 bg-red-50/50 focus:border-red-500 focus:ring-red-200/50" : "border-border bg-surface-dim focus:border-accent focus:ring-accent/20"} text-text-primary text-sm outline-none focus:ring-2 transition-all placeholder:text-text-muted/50`;

  const resetForm = () => {
    setFormData({ studentName: "", parentName: "", phone: "", email: "", grade: "", city: "", message: "" });
    setErrors({});
    setTouched({});
    setSubmitted(false);
  };

  return (
    <main>
      {/* Hero */}
      <section className="bg-surface relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-accent/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-green/8 rounded-full blur-[80px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-20">
          <motion.div className="max-w-2xl" {...fadeUp}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green/10 text-[11px] font-bold text-green uppercase tracking-wider border border-green/20 mb-4">
              <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
              Admissions Open 2026-27
            </span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary leading-tight mb-4">
              Your child's journey to excellence starts here.
            </h1>
            <p className="text-sm md:text-base text-text-secondary leading-relaxed mb-6">
              Enquire now for Playgroup to Grade 10. Our admissions team is here to guide you through every step — from your first call to the first day of school.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#enquiry-form" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-white font-extrabold text-sm shadow-glow hover:bg-accent-light active:scale-[0.97] transition-all">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                Enquire Now
              </a>
              <a href="tel:9448220170" onClick={() => toast("Opening phone dialer...", "info")} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-surface-dim text-text-primary font-bold text-sm border border-border hover:bg-surface-muted active:scale-[0.97] transition-all">
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
                      <a href="tel:9448220170" className="inline-flex items-center justify-center min-h-11 px-6 rounded-full bg-accent text-white font-bold text-sm shadow-glow">Call Now</a>
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
                    noValidate
                  >
                    <label className="flex flex-col gap-1.5">
                      <span className="text-xs font-bold text-navy">Student Name <span className="text-red-500">*</span></span>
                      <input name="studentName" value={formData.studentName} onChange={handleInput} onBlur={handleBlur} placeholder="Enter student's full name" autoComplete="name" className={inputCls("studentName")} />
                      {errors.studentName && touched.studentName && <span className="text-[11px] text-red-500 font-medium">{errors.studentName}</span>}
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="text-xs font-bold text-navy">Parent / Guardian Name <span className="text-red-500">*</span></span>
                      <input name="parentName" value={formData.parentName} onChange={handleInput} onBlur={handleBlur} placeholder="Enter parent's full name" autoComplete="name" className={inputCls("parentName")} />
                      {errors.parentName && touched.parentName && <span className="text-[11px] text-red-500 font-medium">{errors.parentName}</span>}
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="text-xs font-bold text-navy">Phone Number <span className="text-red-500">*</span></span>
                      <div className="flex">
                        <span className="flex items-center justify-center min-h-11 px-3 rounded-l-xl border border-r-0 border-border bg-surface-muted text-text-secondary text-sm font-semibold select-none">+91</span>
                        <input name="phone" value={formData.phone} onChange={handleInput} onBlur={handleBlur} placeholder="98765 43210" autoComplete="tel" inputMode="tel" maxLength={10} className={`${inputCls("phone")} rounded-l-none`} />
                      </div>
                      {errors.phone && touched.phone && <span className="text-[11px] text-red-500 font-medium">{errors.phone}</span>}
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="text-xs font-bold text-navy">Email Address</span>
                      <input name="email" type="email" value={formData.email} onChange={handleInput} onBlur={handleBlur} placeholder="parent@email.com" autoComplete="email" className={inputCls("email")} />
                      {errors.email && touched.email && <span className="text-[11px] text-red-500 font-medium">{errors.email}</span>}
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="text-xs font-bold text-navy">Grade Applying For <span className="text-red-500">*</span></span>
                      <select name="grade" value={formData.grade} onChange={handleInput} onBlur={handleBlur} className={inputCls("grade")}>
                        <option value="">Select grade</option>
                        <optgroup label="Early Years">
                          <option value="Playgroup">Playgroup</option>
                          <option value="Nursery">Nursery</option>
                          <option value="LKG">LKG</option>
                          <option value="UKG">UKG</option>
                        </optgroup>
                        <optgroup label="Primary School">
                          <option value="Grade 1">Grade 1</option>
                          <option value="Grade 2">Grade 2</option>
                          <option value="Grade 3">Grade 3</option>
                          <option value="Grade 4">Grade 4</option>
                          <option value="Grade 5">Grade 5</option>
                        </optgroup>
                        <optgroup label="Middle & High School">
                          <option value="Grade 6">Grade 6</option>
                          <option value="Grade 7">Grade 7</option>
                          <option value="Grade 8">Grade 8</option>
                          <option value="Grade 9">Grade 9</option>
                          <option value="Grade 10">Grade 10</option>
                        </optgroup>
                      </select>
                      {errors.grade && touched.grade && <span className="text-[11px] text-red-500 font-medium">{errors.grade}</span>}
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="text-xs font-bold text-navy">City <span className="text-red-500">*</span></span>
                      <input name="city" value={formData.city} onChange={handleInput} onBlur={handleBlur} placeholder="Enter your city" autoComplete="address-level2" className={inputCls("city")} />
                      {errors.city && touched.city && <span className="text-[11px] text-red-500 font-medium">{errors.city}</span>}
                    </label>
                    {activeTab === "visit" && (
                      <label className="flex flex-col gap-1.5 sm:col-span-2">
                        <span className="text-xs font-bold text-navy">Preferred Visit Date & Time</span>
                        <input name="message" value={formData.message} onChange={handleInput} onBlur={handleBlur} placeholder="e.g. Saturday 10 AM, or any weekday afternoon" className={inputCls("message")} />
                      </label>
                    )}
                    {activeTab === "enquiry" && (
                      <label className="flex flex-col gap-1.5 sm:col-span-2">
                        <span className="text-xs font-bold text-navy">Any specific questions?</span>
                        <textarea name="message" value={formData.message} onChange={handleInput} onBlur={handleBlur} placeholder="Ask about curriculum, fees, transport, or anything else..." rows={3} className={`${inputCls("message")} py-3 resize-none`} />
                      </label>
                    )}
                    <div className="sm:col-span-2">
                      <button type="submit" className="w-full min-h-12 rounded-full bg-accent text-white font-extrabold text-sm shadow-glow hover:bg-accent-light active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                        {activeTab === "enquiry" ? "Send Enquiry via WhatsApp" : "Request Visit via WhatsApp"}
                      </button>
                      <p className="text-[10px] text-text-muted text-center mt-3">Your details are sent securely via WhatsApp. We'll call you back within 24 hours.</p>
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
          <h2 className="font-display text-2xl md:text-3xl font-bold text-text-primary mb-6">Eligibility & Documents</h2>
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
          <h2 className="font-display text-2xl md:text-3xl font-bold text-text-primary mb-6">Frequently Asked Questions</h2>
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
              <a href="tel:9448220170" onClick={() => toast("Opening phone dialer...", "info")} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-navy font-extrabold text-sm shadow-glow hover:bg-accent-light active:scale-[0.97] transition-all">
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
