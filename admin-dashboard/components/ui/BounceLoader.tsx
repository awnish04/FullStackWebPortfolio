// components/ui/BounceLoader.tsx
"use client";

import { motion } from "framer-motion";
import React from "react";

type BounceLoaderProps = {
  size?: number;
  color?: string;
  dotCount?: number;
  className?: string;
};

export const BounceLoader: React.FC<BounceLoaderProps> = ({
  size = 12,
  color = "#4F46E5", // Tailwind indigo-600
  dotCount = 3,
  className = "",
}) => {
  const bounceTransition = {
    y: {
      duration: 0.6,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut",
    },
  };

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      {Array.from({ length: dotCount }).map((_, i) => (
        <motion.span
          key={i}
          animate={{ y: ["0%", "-60%"] }}
          transition={{ ...bounceTransition, delay: i * 0.2 }}
          style={{
            width: size,
            height: size,
            backgroundColor: color,
            borderRadius: "50%",
          }}
        />
      ))}
    </div>
  );
};

export default BounceLoader;
