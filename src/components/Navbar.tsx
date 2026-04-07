"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  const openModal = () => {
    window.dispatchEvent(new Event("open-contact-modal"));
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#050505]/60 backdrop-blur-xl border-b border-white/5"
    >
      {/* Brand Logo with Tech Hover Effect */}
      <Link href="/" className="group flex items-center gap-2 cursor-pointer">
        <span className="text-white font-extrabold text-xl tracking-tighter">
          VIDA
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)] transition-all duration-500 group-hover:scale-[2] group-hover:shadow-[0_0_25px_rgba(59,130,246,1)] group-hover:bg-blue-400"></span>
        <span className="text-gray-400 font-semibold text-xs tracking-[0.15em] uppercase transition-all duration-500 group-hover:text-white group-hover:tracking-[0.3em]">
          DIGITAL
        </span>
      </Link>

      {/* Center Links (Hidden on mobile for now) */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
        <Link href="#work" className="hover:text-white transition-colors">Work</Link>
        <Link href="#services" className="hover:text-white transition-colors">Services</Link>
        <Link href="#agency" className="hover:text-white transition-colors">Agency</Link>
      </div>

      {/* CTA Button */}
      <button 
        onClick={openModal}
        className="px-5 py-2 text-sm font-semibold text-white bg-white/10 rounded-full hover:bg-white/20 transition-colors border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
      >
        Let's Talk
      </button>
    </motion.nav>
  );
}