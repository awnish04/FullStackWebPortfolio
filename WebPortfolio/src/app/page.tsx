"use client";
// import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import animationData from "../images/Animation.json";
// import GlobalApi from "@/lib/GlobalApi";
import { transition1 } from "@/lib/transitions";
import Link from "next/link";
import { FlipWords } from "@/components/ui/flip-words";
import { AuroraText } from "@/components/ui/aurora-text";

// interface PdfItem {
//   pdfLink: string;
// }

const HomePage = () => {
  // const [pdf, setPdf] = useState<PdfItem[]>([]);

  // useEffect(() => {
  //   GlobalApi.getPdf().then((resp) => {
  //     setPdf(resp?.pdfs || []);
  //   });
  // }, []);

  return (
    <section className="min-h-screen flex items-center">
      <div className="container mx-auto lg:p-0 px-4">
        <div className="relative w-full flex flex-col lg:flex-row text-center lg:text-left  justify-between">
          {/* LEFT TEXT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ ...transition1, duration: 0.5 }}
            className="flex flex-col space-y-6 relative z-20"
          >
            {/* 👇 UPDATED ANIMATED TITLE */}
            <h1 className="font-primary text-6xl lg:text-8xl font-bold leading-[115%] mb-4 text-white gap-3">
              <AuroraText>Web & App</AuroraText>
              <br />
              <FlipWords
                words={["Developer", "Designer", "Creator", "Engineer"]}
                className="text-[#BC53C9] font-bold"
              />
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-primary text-[26px] lg:text-[26px] mb-4 lg:mb-12 text-white"
            >
              Biratnagar, NEPAL
            </motion.p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center lg:justify-start">
              {/* Hire Me button with animated Border Magic background */}
              <Link
                href="/contact"
                className="relative inline-flex h-18 overflow-hidden rounded-full p-[3px]"
              >
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#4F2FB3_0%,#BC53C9_50%,#4F2FB3_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-12 py-3 text-lg font-secondary font-semibold text-white backdrop-blur-3xl">
                  Hire Me
                </span>
              </Link>

              {/* Download CV buttons as Border Magic */}
              {/* {pdf.map((item, idx) => ( */}
                <a
                  // key={idx}
                  // href={item.pdfLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex h-18 overflow-hidden rounded-full p-[3px]"
                >
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-secondary px-12 py-3 text-lg font-secondary font-semibold text-white backdrop-blur-3xl">
                    Download CV
                  </span>
                </a>
              {/* ))} */}
            </div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ ...transition1, duration: 0.7 }}
            className="absolute lg:relative lg:flex hidden justify-center items-center lg:mx-0 mx-auto lg:mb-0 mb-10 bottom-10 left-0 right-0"
          >
            <Lottie
              animationData={animationData}
              loop
              autoplay
              className="lg:w-150 opacity-30 lg:opacity-100"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
