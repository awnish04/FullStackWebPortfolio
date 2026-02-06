"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import Link from "next/link";

import animationData from "@/images/AboutAnimation.json";
import { transition1 } from "@/lib/transitions";
import GlobalApi from "@/lib/GlobalApi";
import Skills from "@/components/Skills";

// ✅ Updated TypeScript interface - paragraph is now a direct string
interface AboutItem {
  id: string;
  paragraph: string; // ✅ Direct string, not nested markdown
}

const About: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [about, setAbout] = useState<AboutItem[]>([]);

  useEffect(() => {
    const fetchAbouts = async () => {
      try {
        setLoading(true);
        const resp = await GlobalApi.getAbout();
        // ✅ Response structure: { getAbout: [...] }
        setAbout(resp?.getAbout || []);
      } catch (error) {
        console.error("Error fetching About data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAbouts();
  }, []);

  return (
    <section className="min-h-screen w-full overflow-hidden py-12 lg:pt-0 pb-20">
      <div className="container mx-auto">
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
          </div>
        ) : (
          <div>
            <div className="relative h-full w-full flex flex-col lg:flex-row text-center lg:text-left items-center justify-between gap-20">
              {/* Lottie Animation - MOVED OUTSIDE MAP */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ ...transition1, duration: 0.7 }}
                className="absolute lg:relative lg:flex hidden justify-center items-center lg:mx-0 mx-auto lg:mb-0 mb-10 bottom-20 left-28 right-0"
              >
                <Lottie
                  animationData={animationData}
                  loop
                  autoplay
                  className="lg:w-100 opacity-35 lg:opacity-100"
                />
              </motion.div>

              {/* About Text - MAP ONLY THE PARAGRAPHS */}
              <motion.div
                initial={{ opacity: 0, y: "70%" }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: "40%" }}
                transition={{ ...transition1, duration: 0.5 }}
                className="flex flex-col justify-center items-center text-justify col-span-2 z-10 lg:py-8 px-4"
              >
                <div className="flex flex-col justify-center items-center">
                  <div className="mb-6">
                    {/* ✅ Map through all about entries and display their paragraphs */}
                    {about.map((item) => (
                      <div key={item.id}>
                        {/* ✅ Use direct paragraph string, split by newlines */}
                        {item.paragraph
                          ?.split("\n")
                          .filter((p) => p.trim() !== "")
                          .map((p, i) => (
                            <p
                              key={`${item.id}-${i}`}
                              className="font-secondary mb-4 max-w-2xl text-white text-lg"
                            >
                              {p.trim()}
                            </p>
                          ))}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* View Projects Button - KEPT OUTSIDE MAP */}
            <div className="text-center mt-12">
              <motion.div
                initial={{ opacity: 0, y: "70%" }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: "40%" }}
                transition={{ ...transition1 }}
              >
                <Link
                  href="/portfolio"
                  className="relative inline-flex h-18 overflow-hidden rounded-full p-[3px]"
                >
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#4F2FB3_0%,#BC53C9_50%,#4F2FB3_100%)]" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-12 py-3 text-lg font-secondary font-semibold text-white backdrop-blur-3xl">
                    View Projects
                  </span>
                </Link>
              </motion.div>
            </div>
          </div>
        )}
      </div>
      {/* Skills Section */}
      <Skills />
    </section>
  );
};

export default About;
