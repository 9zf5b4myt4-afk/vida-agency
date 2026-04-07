"use client";

import { motion } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "Fintech Dashboard",
    category: "Web Application",
    size: "md:col-span-2 md:row-span-2", 
  },
  {
    id: 2,
    title: "VOD Streaming Platform",
    category: "Architecture & UI",
    size: "md:col-span-1 md:row-span-1", 
  },
  {
    id: 3,
    title: "E-Commerce Headless",
    category: "Performance Build",
    size: "md:col-span-1 md:row-span-1", 
  },
];

export default function Portfolio() {
  return (
    <section id="work" className="w-full max-w-7xl mx-auto px-6 py-24 relative z-10">
      <div className="mb-12">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
          Selected <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-blue-200">Works.</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl">
          A showcase of high-performance applications and digital experiences engineered for scale.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`group relative rounded-3xl border border-white/10 bg-[#0a0a0a] overflow-hidden cursor-pointer transition-all duration-500 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] ${project.size}`}
          >
            <div className="absolute inset-0 bg-linear-to-br from-white/2 to-transparent transition-transform duration-700 group-hover:scale-105" />
            
            <div className="absolute bottom-0 left-0 p-8 flex flex-col justify-end h-full w-full bg-linear-to-t from-[#050505] to-transparent">
              <span className="text-blue-400 text-xs font-bold tracking-widest uppercase mb-2">
                {project.category}
              </span>
              <h3 className="text-2xl font-bold text-white transition-transform duration-300 group-hover:translate-x-2">
                {project.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}