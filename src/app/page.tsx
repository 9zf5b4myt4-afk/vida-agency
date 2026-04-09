"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Portfolio from "@/components/Portfolio";
import Services from "@/components/Services";
import Process from "@/components/Process"; 
import ProjectModal from "@/components/ProjectModal";

const heroWords = [
  "Digital Architecture.",
  "Fintech Infrastructure.",
  "Scalable Platforms.",
  "Cross-Border Systems."
];

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  // Rotate the hero words every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % heroWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleOpenModal = () => setIsModalOpen(true);
    window.addEventListener("open-contact-modal", handleOpenModal);
    
    return () => window.removeEventListener("open-contact-modal", handleOpenModal);
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center relative overflow-hidden bg-[#050505]">
      
      {/* --- DYNAMIC AURORA BACKGROUND --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.25, 0.1],
            x: [0, 50, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-600/20 blur-[120px] rounded-full mix-blend-screen"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.05, 0.15, 0.05],
            x: [0, -50, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-indigo-600/10 blur-[150px] rounded-full mix-blend-screen"
        />
      </div>

      {/* --- HERO SECTION --- */}
      <section className="min-h-screen w-full flex flex-col items-center justify-center px-6 relative z-10 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center flex flex-col items-center"
        >
          {/* Top Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
            className="mb-8 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-medium tracking-widest uppercase text-gray-300 flex items-center gap-3 shadow-[0_0_30px_rgba(59,130,246,0.1)]"
          >
            <span className="text-white font-bold tracking-widest">VIDA <span className="text-blue-500">SYSTEMS</span></span> 
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,1)]"></span>
            <span>Deploying Globally</span>
          </motion.div>

          {/* Main Headline with Animated Text */}
   {/* Main Headline with Animated Text */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter mb-6 max-w-4xl leading-[1.1] text-white">
            Engineering High-Performance <br className="hidden md:block" />
            <div className="h-[1.2em] relative overflow-hidden flex justify-center mt-2">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={wordIndex}
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -80, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="absolute text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-300 drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]"
                >
                  {heroWords[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed font-light">
            We build bespoke web platforms, scalable fintech infrastructure, and custom applications for ambitious businesses expanding across Senegal and Francophone Africa.
          </p>

          <div className="flex flex-col sm:flex-row gap-5">
            <motion.button
              onClick={() => setIsModalOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-100 shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] transition-all duration-300"
            >
              Initiate Project
            </motion.button>
            <motion.a
              href="#work"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-transparent text-white border border-white/20 font-bold rounded-full hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
            >
              View Our Work
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* NEW PROCESS SECTION */}
      <Process />

      {/* PORTFOLIO SECTION */}
      <Portfolio />

      {/* SERVICES SECTION */}
      <Services />
      
      {/* GLOBAL MODAL */}
      <ProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}