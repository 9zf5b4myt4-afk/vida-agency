"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import VidaTracker from "./VidaTracker";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname() || '/';
  
  const t = useTranslations("Navbar");

  const currentLocale = pathname.startsWith("/fr") ? "fr" : "en";
  const targetLocale = currentLocale === "fr" ? "en" : "fr";
  
  const switchUrl = pathname === '/' 
    ? `/${targetLocale}` 
    : pathname.replace(`/${currentLocale}`, `/${targetLocale}`);

  // Dynamically set the message based on the active language
  const whatsappText = currentLocale === "fr" 
    ? "Bonjour Vida Systems, j'aimerais discuter d'un nouveau projet." 
    : "Hello Vida Systems, I'd like to discuss a new project.";

  // encodeURIComponent safely turns spaces and punctuation into URL-friendly characters
  const whatsappUrl = `https://wa.me/221760114985?text=${encodeURIComponent(whatsappText)}`;
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled || isMobileMenuOpen ? "bg-[#050505]/90 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent py-6"}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* BRAND IDENTITY */}
        <Link href={`/${currentLocale}`} className="group flex items-center gap-3 cursor-pointer z-50">
          <VidaTracker /> 
          <span className="text-white font-extrabold text-xl tracking-tighter transition-colors group-hover:text-blue-100 hidden sm:block">
            VIDA <span className="text-blue-500">SYSTEMS</span>
          </span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300 absolute left-1/2 transform -translate-x-1/2">
          <Link href={`/${currentLocale}#work`} className="hover:text-white transition-colors">{t("work")}</Link>
          <Link href={`/${currentLocale}#services`} className="hover:text-white transition-colors">{t("capabilities")}</Link>
          <Link href={`/${currentLocale}#agency`} className="hover:text-white transition-colors">{t("agency")}</Link>
        </div>

        {/* --- DESKTOP RIGHT CONTROLS --- */}
        <div className="hidden md:flex items-center gap-6 z-50">
          {/* Explicit Language Pill */}
          <Link href={switchUrl} className="flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all cursor-pointer">
            <span className={`text-xs font-bold tracking-widest ${currentLocale === 'en' ? 'text-white' : 'text-gray-500'}`}>EN</span>
            <span className="w-px h-3 bg-white/20"></span>
            <span className={`text-xs font-bold tracking-widest ${currentLocale === 'fr' ? 'text-white' : 'text-gray-500'}`}>FR</span>
          </Link>

          <button onClick={() => window.open(whatsappUrl, "_blank")} className="px-5 py-2.5 rounded-full border border-white/10 text-sm font-medium hover:bg-white text-white hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            {t("letsTalk")}
          </button>
        </div>

        {/* --- MOBILE RIGHT CONTROLS --- */}
        <div className="md:hidden flex items-center gap-3 z-50">
          {/* Mobile Language Pill */}
          <Link href={switchUrl} className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
            <span className={`text-[10px] font-bold tracking-wider ${currentLocale === 'en' ? 'text-white' : 'text-gray-500'}`}>EN</span>
            <span className="w-px h-2.5 bg-white/20"></span>
            <span className={`text-[10px] font-bold tracking-wider ${currentLocale === 'fr' ? 'text-white' : 'text-gray-500'}`}>FR</span>
          </Link>

          {/* Mobile WhatsApp Chat Bubble */}
          <button onClick={() => window.open(whatsappUrl, "_blank")} className="p-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-gray-300 hover:text-white hover:bg-white/10 transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>

          {/* Hamburger Menu Toggle */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white p-1 ml-1">
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>
      </div>

      {/* --- MOBILE DROPDOWN MENU (Simplified) --- */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#050505]/95 backdrop-blur-2xl border-b border-white/10 flex flex-col px-6 py-8 gap-6 md:hidden shadow-2xl animate-in slide-in-from-top-2">
          <Link href={`/${currentLocale}#work`} onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-gray-300 hover:text-white">{t("work")}</Link>
          <Link href={`/${currentLocale}#services`} onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-gray-300 hover:text-white">{t("capabilities")}</Link>
          <Link href={`/${currentLocale}#agency`} onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-gray-300 hover:text-white">{t("agency")}</Link>
        </div>
      )}
    </nav>
  );
}