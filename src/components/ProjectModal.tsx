"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { submitProject } from "@/app/actions/contact";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ isOpen, onClose }: ProjectModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ projectType: "", name: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleTypeSelect = (type: string) => {
    setFormData({ ...formData, projectType: type });
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = new FormData();
    data.append("projectType", formData.projectType);
    data.append("name", formData.name);
    data.append("email", formData.email);

    const response = await submitProject(data);

    setIsSubmitting(false);
    if (response.success) {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setStep(1);
        setFormData({ projectType: "", name: "", email: "" });
        onClose();
      }, 3000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-6">
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
            className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]"
          >
            <div className="flex justify-between items-center p-6 md:p-8 border-b border-white/5">
              <div>
                <h3 className="text-2xl font-extrabold text-white">Initiate Project</h3>
                <p className="text-gray-400 text-sm mt-1">Let's architect your digital solution.</p>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors border border-white/5"
              >
                ✕
              </button>
            </div>

            <div className="p-6 md:p-8 min-h-75 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center py-10"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                      <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-2">Request Received.</h4>
                    <p className="text-gray-400">Our engineering team will review your requirements and contact you shortly.</p>
                  </motion.div>
                ) : step === 1 ? (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <label className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
                      What are you looking to build?
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {["Web Application", "Corporate Platform", "E-Commerce", "Custom Architecture"].map((type) => (
                        <button
                          key={type}
                          onClick={() => handleTypeSelect(type)}
                          className="group relative w-full text-left p-4 rounded-2xl border border-white/10 bg-[#050505] transition-all duration-300 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-linear-to-r from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:to-transparent transition-all duration-500" />
                          <span className="relative z-10 text-gray-300 group-hover:text-white font-medium">
                            {type}
                          </span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="step2"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-semibold text-gray-300 uppercase tracking-wider block mb-2">
                          Your Name
                        </label>
                        <input 
                          type="text" 
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 focus:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-gray-300 uppercase tracking-wider block mb-2">
                          Email Address
                        </label>
                        <input 
                          type="email" 
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 focus:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all"
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>
                    
                    <div className="flex gap-4 pt-4">
                      <button 
                        type="button"
                        onClick={() => setStep(1)}
                        disabled={isSubmitting}
                        className="px-6 py-3 rounded-full border border-white/10 text-white font-medium hover:bg-white/5 transition-colors disabled:opacity-50"
                      >
                        Back
                      </button>
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="relative flex-1 px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] disabled:opacity-80 overflow-hidden flex items-center justify-center"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                            Processing...
                          </span>
                        ) : (
                          "Submit Request"
                        )}
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