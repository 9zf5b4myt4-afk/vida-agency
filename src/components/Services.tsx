"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function Services() {
  const t = useTranslations("Services");

  const services = [
    {
      id: "01",
      title: t("srv1Title"),
      description: t("srv1Desc"),
      tech: ["Next.js", "Headless CMS", "Conversion UI"],
    },
    {
      id: "02",
      title: t("srv2Title"),
      description: t("srv2Desc"),
      tech: ["Custom Stores", "Payment Routing", "Automation"],
    },
    {
      id: "03",
      title: t("srv3Title"),
      description: t("srv3Desc"),
      tech: ["Fintech APIs", "Cross-Border", "Bank-Grade Security"],
    },
  ];

  return (
    <section id="services" className="w-full max-w-7xl mx-auto px-6 py-24 relative z-10 border-t border-white/5">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
        <div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            {t("titlePrefix")} <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-blue-200">{t("titleHighlight")}</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl">
            {t("subtitle")}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative flex flex-col p-8 rounded-3xl border border-white/10 bg-[#0a0a0a] cursor-default transition-all duration-500 hover:border-blue-500/50 hover:bg-[#0d0d0d] hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]"
          >
            <div className="flex justify-between items-start mb-8">
              <span className="text-4xl font-extrabold text-white/5 transition-colors duration-500 group-hover:text-blue-500/20">
                {service.id}
              </span>
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:border-blue-500/50 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]">
                <div className="w-2 h-2 rounded-full bg-white/20 transition-colors duration-500 group-hover:bg-blue-400" />
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
            <p className="text-gray-400 leading-relaxed mb-8 grow">
              {service.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-auto">
              {service.tech.map((item) => (
                <span 
                  key={item} 
                  className="px-3 py-1 text-[11px] uppercase tracking-wider font-semibold text-gray-500 border border-white/5 rounded-full transition-colors duration-500 group-hover:border-blue-500/30 group-hover:text-blue-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}