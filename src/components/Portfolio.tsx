"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

// Updated the interface to match your Payload CMS schema ('link')
interface Project {
  id: string;
  title: string;
  client: string;
  category?: string;
  link?: string; 
  image: {
    url: string;
    alt: string;
  };
}

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/projects?depth=1`);
        if (!res.ok) throw new Error("Failed to fetch data");
        
        const data = await res.json();
        setProjects(data.docs);
      } catch (error) {
        console.error("Error loading projects:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProjects();
  }, []);

  const getSizeClass = (index: number) => {
    if (index === 0) return "md:col-span-2 md:row-span-2"; 
    return "md:col-span-1 md:row-span-1"; 
  };

  const getImageUrl = (url: string) => {
    if (url.startsWith("http")) return url;
    return `${process.env.NEXT_PUBLIC_SERVER_URL}${url}`;
  };

  // Function to handle the click and open the link
  const handleProjectClick = (link?: string) => {
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section id="work" className="w-full max-w-7xl mx-auto px-6 py-24 relative z-10">
      <div className="mb-12 flex justify-between items-end">
        <div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Selected <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-blue-200">Works.</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl">
            A showcase of high-performance applications and digital experiences engineered for scale.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="w-full py-20 flex justify-center text-gray-500">
          Syncing secure data...
        </div>
      ) : (
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
                  src={getImageUrl(project.image.url)}
                  alt={project.image.alt || project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 33vw"
                  className="object-cover opacity-40 group-hover:opacity-70 transition-opacity duration-700 group-hover:scale-105"
                />            
              )}

              <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-[#050505]/40 to-transparent transition-opacity duration-500 group-hover:opacity-80" />
              
              {/* Premium Hover Arrow indicating an external link */}
              {project.link && (
                <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 transform translate-x-4 -translate-y-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500 z-20">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              )}

              <div className="absolute bottom-0 left-0 p-8 flex flex-col justify-end h-full w-full z-10">
                <span className="text-blue-400 text-xs font-bold tracking-widest uppercase mb-2">
                  {project.client}
                </span>
                <h3 className="text-2xl font-bold text-white transition-transform duration-300 group-hover:translate-x-2">
                  {project.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}