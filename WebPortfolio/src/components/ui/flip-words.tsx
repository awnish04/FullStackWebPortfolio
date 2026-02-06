"use client";
import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { AuroraText } from "@/components/ui/aurora-text";

export const FlipWords = ({
  words,
  duration = 3000,
  className,
}: {
  words: string[];
  duration?: number;
  className?: string;
}) => {
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const startAnimation = useCallback(() => {
    const next = words[words.indexOf(currentWord) + 1] || words[0];
    setCurrentWord(next);
    setIsAnimating(true);
  }, [currentWord, words]);

  // Loop the animation
  useEffect(() => {
    if (!isAnimating) {
      const timer = setTimeout(() => startAnimation(), duration);
      return () => clearTimeout(timer);
    }
  }, [isAnimating, duration, startAnimation]);

  return (
    <AnimatePresence onExitComplete={() => setIsAnimating(false)}>
      <motion.div
        key={currentWord}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{
          opacity: 0,
          position: "absolute",
          transition: { duration: 0.01 }, // ← instantly disappear
        }}
        transition={{
          type: "spring",
          stiffness: 50,
          damping: 12,
        }}
        className={cn(
          "relative inline-block text-left dark:text-neutral-100",
          className
        )}
      >
        {currentWord.split(" ").map((word, wordIndex) => (
          <motion.span
            key={word + wordIndex}
            initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              delay: wordIndex * 0.2,
              duration: 0.35,
            }}
            className="inline-block whitespace-nowrap"
          >
            {word.split("").map((letter, letterIndex) => (
              <motion.span
                key={letter + letterIndex}
                initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
                transition={{
                  delay: wordIndex * 0.2 + letterIndex * 0.03,
                  duration: 0.25,
                }}
                className="inline-block"
              >
                <AuroraText>{letter}</AuroraText>
                {/* {letter} */}
              </motion.span>
            ))}
            {/* <span>&nbsp;</span> */}
          </motion.span>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};
