"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import VidaTracker from "./VidaTracker"; // Import our new tracker!

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent py-6"}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* BRAND IDENTITY + INTERACTIVE CORE */}
        <Link href="/" className="group flex items-center gap-3 cursor-pointer">
          <VidaTracker /> {/* The tracking eye! */}
          <span className="text-white font-extrabold text-xl tracking-tighter transition-colors group-hover:text-blue-100">
            VIDA <span className="text-blue-500">SYSTEMS</span>
          </span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <Link href="#work" className="hover:text-white transition-colors">Work</Link>
          <Link href="#services" className="hover:text-white transition-colors">Capabilities</Link>
          <Link href="#process" className="hover:text-white transition-colors">Process</Link>
        </div>

        {/* CTA BUTTON */}
        <button 
          onClick={() => window.dispatchEvent(new Event("open-contact-modal"))}
          className="hidden md:block px-5 py-2.5 rounded-full border border-white/10 text-sm font-medium hover:bg-white text-white hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
        >
          Let's Talk
        </button>

        {/* MOBILE MENU TOGGLE (Placeholder) */}
        <button className="md:hidden text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
}