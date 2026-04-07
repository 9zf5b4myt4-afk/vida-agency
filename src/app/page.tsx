"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Portfolio from "@/components/Portfolio";
import Services from "@/components/Services";
import ProjectModal from "@/components/ProjectModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleOpenModal = () => setIsModalOpen(true);
    window.addEventListener("open-contact-modal", handleOpenModal);
    
    // Cleanup the event listener when the component unmounts
    return () => window.removeEventListener("open-contact-modal", handleOpenModal);
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center relative overflow-hidden">
      {/* Abstract Glowing Orb for depth */}
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-blue-600/10 blur-[150px] rounded-full pointer-events-none z-0" />

      {/* HERO SECTION */}
      <section className="min-h-screen w-full flex flex-col items-center justify-center px-6 relative z-10 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center flex flex-col items-center"
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-medium tracking-widest uppercase text-gray-400 flex items-center gap-2"
          >
            <span className="text-white font-bold">VIDA</span> 
            <span className="w-1 h-1 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
            <span>DIGITAL</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 max-w-4xl leading-[1.1]">
            We Engineer High-End <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-200 to-gray-600">
              Digital Applications.
            </span>
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
            Bespoke web architecture and scalable solutions for modern businesses expanding across Francophone Africa and beyond.
          </p>

          <motion.button
            onClick={() => setIsModalOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-blue-50 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300"
          >
            Initiate Project
          </motion.button>
        </motion.div>
      </section>

      {/* PORTFOLIO SECTION */}
      <Portfolio />

      {/* SERVICES SECTION */}
      <Services />
      
      {/* GLOBAL MODAL */}
      <ProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}