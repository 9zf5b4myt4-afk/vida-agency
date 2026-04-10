"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl"; // The translation hook
import VidaTracker from "./VidaTracker"; // Import our new tracker!

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname() || '/';
  
  // Connect to the "Navbar" section of our JSON dictionaries
  const t = useTranslations("Navbar");

  // Determine current language and target language for the toggle switch
  const currentLocale = pathname.startsWith("/fr") ? "fr" : "en";
  const targetLocale = currentLocale === "fr" ? "en" : "fr";
  
  // Handle the routing for the language toggle
  const switchUrl = pathname === '/' 
    ? `/${targetLocale}` 
    : pathname.replace(`/${currentLocale}`, `/${targetLocale}`);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent py-6"}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* BRAND IDENTITY + INTERACTIVE CORE */}
        <Link href={`/${currentLocale}`} className="group flex items-center gap-3 cursor-pointer">
          <VidaTracker /> {/* The tracking eye! */}
          <span className="text-white font-extrabold text-xl tracking-tighter transition-colors group-hover:text-blue-100">
            VIDA <span className="text-blue-500">SYSTEMS</span>
          </span>
        </Link>

        {/* DESKTOP LINKS (Now powered by JSON files) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <Link href={`/${currentLocale}#work`} className="hover:text-white transition-colors">{t("work")}</Link>
          <Link href={`/${currentLocale}#services`} className="hover:text-white transition-colors">{t("capabilities")}</Link>
          <Link href={`/${currentLocale}#agency`} className="hover:text-white transition-colors">{t("agency")}</Link>
        </div>

        {/* RIGHT CONTROLS: Language Toggle + CTA */}
        <div className="hidden md:flex items-center gap-6">
          
          {/* LANGUAGE TOGGLE BUTTON */}
          <Link 
            href={switchUrl}
            className="text-xs font-bold text-gray-400 hover:text-white transition-colors tracking-widest border border-white/10 px-3 py-1.5 rounded-full hover:border-white/30"
          >
            {targetLocale.toUpperCase()}
          </Link>

          {/* CTA BUTTON - The WhatsApp Sniper Play */}
          <button 
            onClick={() => window.open("https://wa.me/221760114985?text=Hello%20Vida%20Systems,%20I'd%20like%20to%20discuss%20a%20new%20project.", "_blank")}
            className="px-5 py-2.5 rounded-full border border-white/10 text-sm font-medium hover:bg-white text-white hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            {t("letsTalk")}
          </button>
        </div>

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