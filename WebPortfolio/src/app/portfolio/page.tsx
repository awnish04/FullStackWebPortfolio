"use client";
import React from "react";

// import motion
import { motion } from "framer-motion";

// import transition

import { transition1 } from "@/lib/transitions";
import TabsCustomAnimation from "@/components/TabsCustomAnimation";

const Portfolio = () => {
  return (
    <section className="h-full w-full lg:pt-0 pb-20 overflow-hidden px-4 py-12">
      <div className="container mx-auto flex flex-col justify-center ">
        <motion.div
          initial={{ opacity: 0, y: "-70%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-40%" }}
          transition={{ ...transition1 }}
          className="lg:w-auto z-10 flex flex-col justify-center items-center lg:items-start"
        >
          <h1 className="text-[54px] lg:text-[64px] font-primary font-bold capitalize leading-[120%] tracking-[-0.05em] mb-4 text-white">
            Projects
          </h1>
          <p className="mb-6 text-white text-3xl">What I&apos;ve Built</p>
        </motion.div>

        <TabsCustomAnimation />
      </div>
    </section>
  );
};

export default Portfolio;
