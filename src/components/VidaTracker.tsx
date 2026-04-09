"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function VidaTracker() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      // Get the exact center of our tracker element on the screen
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate the distance from the tracker to the mouse
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      // Use trigonometry to find the angle
      const angle = Math.atan2(deltaY, deltaX);
      
      // Limit how far the "pupil" can move so it stays inside the ring (max 6 pixels)
      const maxDistance = 6; 
      // Dampen the movement so it feels smooth, not frantic
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
      {/* The glowing "Core" that tracks the mouse */}
      <motion.div
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.5 }}
        className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,1)]"
      />
    </div>
  );
}