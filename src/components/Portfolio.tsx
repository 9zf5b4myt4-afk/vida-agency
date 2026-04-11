"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface Project {
  id: string;
  title: string;
  client: string;
  category?: string;
  link?: string; 
  businessResult?: string;
  image: { url: string; alt: string; };
}

// Receive the projects instantly as a prop
export default function Portfolio({ projects }: { projects: Project[] }) {
  const t = useTranslations("Portfolio");

  const getSizeClass = (index: number) => index === 0 ? "md:col-span-2 md:row-span-2" : "md:col-span-1 md:row-span-1"; 
  const getImageUrl = (url: string) => url.startsWith("http") ? url : `${process.env.NEXT_PUBLIC_SERVER_URL}${url}`;
  const handleProjectClick = (link?: string) => { if (link) window.open(link, "_blank", "noopener,noreferrer"); };

  return (
    <section id="work" className="w-full max-w-7xl mx-auto px-6 py-24 relative z-10">
      <div className="mb-12 flex justify-between items-end">
        <div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            {t("titlePrefix")} <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-blue-200">{t("titleHighlight")}</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl">{t("subtitle")}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onClick={() => handleProjectClick(project.link)}
            className={`group relative rounded-3xl border border-white/10 bg-[#0a0a0a] overflow-hidden cursor-pointer transition-all duration-500 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] ${getSizeClass(index)}`}
          >
            {project.image?.url && (
              <Image 
                src={getImageUrl(project.image.url)} alt={project.image.alt || project.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 33vw"
                className="object-cover opacity-40 group-hover:opacity-70 transition-opacity duration-700 group-hover:scale-105"
              />            
            )}
            <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-[#050505]/40 to-transparent transition-opacity duration-500 group-hover:opacity-80" />
            
            {project.businessResult && (
              <div className="absolute top-6 left-6 px-4 py-1.5 bg-blue-900/40 border border-blue-500/30 backdrop-blur-md rounded-full text-blue-300 text-[10px] font-bold uppercase tracking-widest z-20 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                {project.businessResult}
              </div>
            )}

            {project.link && (
              <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 transform translate-x-4 -translate-y-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500 z-20">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </div>
            )}
            <div className="absolute bottom-0 left-0 p-8 flex flex-col justify-end h-full w-full z-10">
              <span className="text-blue-400 text-xs font-bold tracking-widest uppercase mb-2">{project.client}</span>
              <h3 className="text-2xl font-bold text-white transition-transform duration-300 group-hover:translate-x-2">{project.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}