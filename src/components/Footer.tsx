"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import VidaTracker from "./VidaTracker";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const t = useTranslations("Footer");

  return (
    <footer className="w-full relative bg-[#050505] border-t border-white/5 pt-24 pb-8 overflow-hidden z-10">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-blue-600/5 blur-[120px] rounded-t-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <div>
            <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-4 text-white leading-[1.1]">
              {t("title1")} <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-500 to-gray-700">
                {t("title2")}
              </span>
            </h2>
            <p className="text-gray-400 max-w-sm text-lg">
              {t("subtitle")}
            </p>
          </div>
          <button
            onClick={() => window.dispatchEvent(new Event("open-contact-modal"))}
            className="group relative px-8 py-4 bg-white text-black font-semibold rounded-full overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-transform hover:scale-105 active:scale-95"
          >
            <div className="absolute inset-0 bg-linear-to-r from-blue-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center gap-2">
              {t("initiateProject")}
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </span>
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16 border-t border-white/5 pt-16">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="group flex items-center gap-3 cursor-pointer mb-6">
              <VidaTracker />
              <span className="text-white font-extrabold text-xl tracking-tighter transition-colors group-hover:text-blue-100">
                VIDA <span className="text-blue-500">SYSTEMS</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">
              {t("hq")} <br />
              {t("deploying")}
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">{t("navigation")}</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="#work" className="hover:text-blue-400 transition-colors">{t("navWork")}</Link></li>
              <li><Link href="#services" className="hover:text-blue-400 transition-colors">{t("navServices")}</Link></li>
              <li><Link href="#agency" className="hover:text-blue-400 transition-colors">{t("navAgency")}</Link></li> 
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">{t("connect")}</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-blue-400 transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Twitter / X</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">GitHub</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">{t("legal")}</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-blue-400 transition-colors">{t("privacyPolicy")}</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">{t("termsOfService")}</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-xs text-gray-600">
          <p>© {currentYear} Vida Systems. All rights reserved.</p>
          <p className="mt-4 md:mt-0 flex items-center gap-2 tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
            {t("systemsOperational")}
          </p>
        </div>
      </div>
    </footer>
  );
}