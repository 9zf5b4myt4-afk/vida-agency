"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { submitProject } from "@/app/actions/contact";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const projectCategories = [
  { id: "SaaS / Fintech", desc: "Complex platforms, payment systems, or software products (e.g., cross-border finance apps, custom dashboards)." },
  { id: "E-Commerce", desc: "Online stores and digital sales systems designed to handle transactions seamlessly." },
  { id: "Web Architecture", desc: "Corporate websites, NGO platforms, and digital portfolios establishing brand authority." },
  { id: "Custom / Local App", desc: "Management tools or custom ideas (e.g., an application to power a salon, a restaurant POS, etc.)." }
];

// SMART CURRENCIES: Tiers adjust based on the selected market
const currencies = [
  { 
    code: "USD", 
    symbol: "$", 
    tiers: ["< 5k", "5k - 10k", "10k - 25k", "25k+"] 
  },
  { 
    code: "EUR", 
    symbol: "€", 
    tiers: ["< 5k", "5k - 10k", "10k - 25k", "25k+"] 
  },
  { 
    code: "XOF", 
    symbol: "FCFA ", 
    tiers: ["< 3M", "3M - 6M", "6M - 15M", "15M+"] 
  },
  { 
    code: "NGN", 
    symbol: "₦", 
    tiers: ["< 5M", "5M - 15M", "15M - 35M", "35M+"] 
  }
];

const clientTypes = ["Corporate Enterprise", "Established SME", "Startup / Founder", "Exploring Ideas"];
const businessStatuses = ["Registered Entity", "In Registration Process", "Not Yet Registered"];

export default function ProjectModal({ isOpen, onClose }: ProjectModalProps) {
  const [step, setStep] = useState(1);
  const [activeDesc, setActiveDesc] = useState("Hover or tap an objective above to see details.");
  
  const [formData, setFormData] = useState({ 
    projectType: "", 
    currency: "USD",
    currencySymbol: "$",
    budget: "",
    clientType: "",
    businessStatus: "",
    name: "", 
    email: "",
    phone: "",
    details: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Clears the budget selection if they change currencies
  const handleCurrencyChange = (code: string) => {
    const curr = currencies.find(c => c.code === code);
    if (curr) {
      setFormData({ 
        ...formData, 
        currency: curr.code, 
        currencySymbol: curr.symbol,
        budget: "" 
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    const response = await submitProject(data);

    setIsSubmitting(false);
    if (response.success) {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setStep(1);
        setFormData({ projectType: "", currency: "USD", currencySymbol: "$", budget: "", clientType: "", businessStatus: "", name: "", email: "", phone: "", details: "" });
        onClose();
      }, 3000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#050505]/80 backdrop-blur-xl cursor-pointer"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] my-8"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 md:p-8 border-b border-white/5">
              <div>
                <h3 className="text-2xl font-extrabold text-white">Project Intake</h3>
                <p className="text-gray-400 text-sm mt-1">
                  {step === 1 ? "Step 1: The Vision" : step === 2 ? "Step 2: The Business" : "Step 3: Contact Details"}
                </p>
              </div>
              <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors border border-white/5">✕</button>
            </div>

            <div className="p-6 md:p-8 min-h-100 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                
                {/* SUCCESS STATE */}
                {isSuccess ? (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center py-10">
                    <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-6">
                      <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-2">Requirements Received.</h4>
                    <p className="text-gray-400">Our engineering team will review your brief and contact you shortly.</p>
                  </motion.div>
                
                /* STEP 1: THE VISION */
                ) : step === 1 ? (
                  <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                    
                    {/* Project Type */}
                    <div className="space-y-4">
                      <label className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Primary Objective</label>
                      <div className="flex flex-wrap gap-3">
                        {projectCategories.map((type) => (
                          <button
                            key={type.id}
                            type="button"
                            onMouseEnter={() => setActiveDesc(type.desc)}
                            onClick={() => setFormData({ ...formData, projectType: type.id })}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                              formData.projectType === type.id ? "bg-blue-500/20 text-blue-400 border border-blue-500/50" : "bg-[#050505] text-gray-400 border border-white/10 hover:border-white/30"
                            }`}
                          >
                            {type.id}
                          </button>
                        ))}
                      </div>
                      {/* Dynamic Description Bubble */}
                      <div className="bg-white/5 border border-white/10 rounded-xl p-4 mt-2 min-h-17.5 flex items-center transition-all duration-300">
                        <p className="text-sm text-gray-400 italic">{activeDesc}</p>
                      </div>
                    </div>

                    {/* Currency & Budget */}
                    <div className="space-y-4 pt-2">
                      <div className="flex justify-between items-end">
                        <label className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Estimated Budget</label>
                        <select 
                          value={formData.currency}
                          onChange={(e) => handleCurrencyChange(e.target.value)}
                          className="bg-[#050505] text-gray-300 text-sm border border-white/10 rounded-lg px-2 py-1 focus:outline-none focus:border-blue-500/50"
                        >
                          {currencies.map(c => <option key={c.code} value={c.code}>{c.code}</option>)}
                        </select>
                      </div>
                      
                      <div className="flex flex-wrap gap-3">
                        {currencies.find(c => c.code === formData.currency)?.tiers.map((tier) => (
                          <button
                            key={tier}
                            type="button"
                            onClick={() => setFormData({ ...formData, budget: tier })}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                              formData.budget === tier ? "bg-white/10 text-white border border-white/30" : "bg-[#050505] text-gray-400 border border-white/10 hover:border-white/30"
                            }`}
                          >
                            {formData.currencySymbol}{tier}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button onClick={() => setStep(2)} disabled={!formData.projectType || !formData.budget} className="w-full mt-4 px-6 py-4 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                      Continue to Details
                    </button>
                  </motion.div>

                /* STEP 2: THE BUSINESS */
                ) : step === 2 ? (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                    
                    <div className="space-y-4">
                      <label className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Client Profile</label>
                      <div className="flex flex-wrap gap-3">
                        {clientTypes.map((type) => (
                          <button key={type} type="button" onClick={() => setFormData({ ...formData, clientType: type })} className={`px-4 py-2 rounded-full text-sm transition-all ${formData.clientType === type ? "bg-white/10 text-white border border-white/30" : "bg-[#050505] text-gray-400 border border-white/10"}`}>{type}</button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Registration Status</label>
                      <div className="flex flex-wrap gap-3">
                        {businessStatuses.map((status) => (
                          <button key={status} type="button" onClick={() => setFormData({ ...formData, businessStatus: status })} className={`px-4 py-2 rounded-full text-sm transition-all ${formData.businessStatus === status ? "bg-white/10 text-white border border-white/30" : "bg-[#050505] text-gray-400 border border-white/10"}`}>{status}</button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-300 uppercase tracking-wider block mb-2">Project Brief</label>
                      <textarea
                        required rows={3}
                        className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-all resize-none"
                        placeholder="e.g., I want to build a cross-border payment app, or an application to power my salon business..."
                        value={formData.details}
                        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      ></textarea>
                    </div>

                    <div className="flex gap-4">
                      <button type="button" onClick={() => setStep(1)} className="px-6 py-4 rounded-xl border border-white/10 text-white hover:bg-white/5">Back</button>
                      <button type="button" onClick={() => setStep(3)} disabled={!formData.clientType || !formData.businessStatus || !formData.details} className="flex-1 px-6 py-4 bg-white text-black font-semibold rounded-xl disabled:opacity-50 hover:bg-gray-200">Continue to Contact</button>
                    </div>
                  </motion.div>

                /* STEP 3: CONTACT DETAILS */
                ) : (
                  <motion.form key="step3" onSubmit={handleSubmit} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-semibold text-gray-300 uppercase tracking-wider block mb-2">Your Name</label>
                        <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500/50 outline-none" placeholder="Jane Doe" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-semibold text-gray-300 uppercase tracking-wider block mb-2">Email</label>
                          <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500/50 outline-none" placeholder="jane@company.com" />
                        </div>
                        <div>
                          <label className="text-sm font-semibold text-gray-300 uppercase tracking-wider block mb-2">Phone / WhatsApp</label>
                          <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500/50 outline-none" placeholder="+221 77 123 4567" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 pt-4">
                      <button type="button" onClick={() => setStep(2)} disabled={isSubmitting} className="px-6 py-4 rounded-xl border border-white/10 text-white hover:bg-white/5 disabled:opacity-50">Back</button>
                      <button type="submit" disabled={isSubmitting} className="flex-1 px-6 py-4 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 disabled:opacity-80 flex items-center justify-center">
                        {isSubmitting ? "Processing..." : "Submit Request"}
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}