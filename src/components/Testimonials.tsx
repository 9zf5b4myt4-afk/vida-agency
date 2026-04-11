"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface Testimonial {
  id: string;
  clientName: string;
  company?: string;
  role?: string;
  quote: string;
  featured?: boolean;
}

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const t = useTranslations("Testimonials");

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-24 relative z-10">
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            {t("titlePrefix")} <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-blue-200">{t("titleHighlight")}</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl">{t("subtitle")}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="p-8 rounded-3xl border border-white/10 bg-white/2 flex flex-col justify-between hover:bg-white/4 transition-colors duration-300"
          >
            <svg className="w-8 h-8 text-blue-500/30 mb-6" fill="currentColor" viewBox="0 0 32 32">
              <path d="M10 8c-4.418 0-8 3.582-8 8s3.582 8 8 8c1.554 0 3.003-.442 4.232-1.203L12.5 26h4.865l-2.008-5.355C17.02 18.665 18 16.442 18 14c0-4.418-3.582-8-8-8zm14 0c-4.418 0-8 3.582-8 8s3.582 8 8 8c1.554 0 3.003-.442 4.232-1.203L26.5 26h4.865l-2.008-5.355C31.02 18.665 32 16.442 32 14c0-4.418-3.582-8-8-8z" />
            </svg>
            <p className="text-gray-300 text-lg leading-relaxed mb-8 font-light">"{item.quote}"</p>
            <div>
              <h4 className="text-white font-bold">{item.clientName}</h4>
              <p className="text-blue-400 text-sm mt-1">
                {item.role} {item.company && `at ${item.company}`}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}