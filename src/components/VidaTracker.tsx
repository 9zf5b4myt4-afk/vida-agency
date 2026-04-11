"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function VidaTracker() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect if the user is on a mobile/touch device
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return; // Stop running the mouse tracking logic
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      const angle = Math.atan2(deltaY, deltaX);
      const maxDistance = 6; 
      const distance = Math.min(maxDistance, Math.hypot(deltaX, deltaY) / 30); 

      setPosition({
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-8 h-8 rounded-full border border-blue-500/30 bg-[#0a0a0a] flex items-center justify-center relative overflow-hidden shadow-[inset_0_0_10px_rgba(59,130,246,0.1)]"
    >
      <motion.div
        // If mobile: pulse gently. If desktop: track the mouse.
        animate={isTouchDevice ? { scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] } : { x: position.x, y: position.y }}
        transition={isTouchDevice ? { duration: 3, repeat: Infinity, ease: "easeInOut" } : { type: "spring", stiffness: 150, damping: 15, mass: 0.5 }}
        className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,1)]"
      />
    </div>
  );
}