"use client";

import { motion } from "framer-motion";

const processSteps = [
  {
    number: "01",
    title: "Architecture & Strategy",
    description: "We analyze your business infrastructure and design a scalable, secure technical blueprint before writing a single line of code."
  },
  {
    number: "02",
    title: "Engineering & Build",
    description: "Using modern frameworks like Next.js and secure backends, we engineer bespoke platforms designed for speed, security, and scale."
  },
  {
    number: "03",
    title: "Deployment & Scale",
    description: "We deploy on global edge networks, ensuring your application remains lightning-fast and highly available as your user base grows."
  }
];

export default function Process() {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-24 relative z-10 border-t border-white/5">
      <div className="mb-16">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
          Our <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-blue-200">Methodology.</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl">
          We don't just write code. We engineer complete digital systems designed to solve complex business challenges.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {processSteps.map((step, index) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="relative p-8 rounded-3xl border border-white/10 bg-[#0a0a0a] hover:border-blue-500/30 transition-colors duration-300"
          >
            <div className="text-blue-500/20 font-black text-6xl absolute top-6 right-6">
              {step.number}
            </div>
            <h3 className="text-xl font-bold text-white mb-4 relative z-10 mt-8">
              {step.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed relative z-10">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}