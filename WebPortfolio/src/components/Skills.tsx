"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import GlobalApi from "@/lib/GlobalApi";
import { transition1 } from "@/lib/transitions";
import Image from "next/image";

import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/ui/scroll-based-velocity";

type Skill = {
  id: string;
  name: string;
  imageUrl: string;
};

export default function Skills() {
  const [loading, setLoading] = useState(true);
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    getSkills();
  }, []);

  const getSkills = async () => {
    try {
      setLoading(true);
      const response = await GlobalApi.getSkill();
      const skillList: Skill[] = response?.getSkills ?? [];
      setSkills(skillList);
    } catch (error) {
      console.error("Error fetching skills:", error);
    } finally {
      setLoading(false);
    }
  };

  // For infinite scrolling, duplicate the skills array multiple times
  const createInfiniteSkills = (skillsArray: Skill[]) => {
    return [...skillsArray, ...skillsArray, ...skillsArray];
  };

  // Create infinite versions where BOTH rows get ALL skills
  const infiniteSkillsRowA = createInfiniteSkills(skills);
  const infiniteSkillsRowB = createInfiniteSkills(skills);

  return (
    <div className="max-w-full mx-auto py-10">
      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: "-80%" }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: "-80%" }}
        transition={{ ...transition1 }}
        className="w-full flex flex-col justify-center items-center py-6"
      >
        <h1 className="text-[54px] lg:text-[64px] font-primary font-bold text-white">
          Skills
        </h1>
        <p className=" text-white text-3xl">What I Can Do</p>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center h-[300px]">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
        </div>
      ) : skills.length === 0 ? (
        <div className="flex justify-center items-center h-[300px]">
          <p className="text-white text-lg">No skills found.</p>
        </div>
      ) : (
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <ScrollVelocityContainer className="w-full">
            {/* ===== ROW A - ALL SKILLS ===== */}
            <ScrollVelocityRow baseVelocity={2} direction={1} className="py-6">
              {infiniteSkillsRowA.map((skill, index) => (
                <div
                  key={`row-a-${skill.id}-${index}`}
                  className="lg:mx-8 mx-4 inline-flex flex-col items-center"
                >
                  {skill.imageUrl ? (
                    <Image
                      src={skill.imageUrl}
                      alt={skill.name}
                      width={200}
                      height={200}
                      className="lg:w-20 w-14 rounded-xl object-contain hover:scale-110 transition-all"
                      loading="lazy"
                      unoptimized
                    />
                  ) : (
                    <div className="lg:w-20 w-14 bg-gray-800 rounded-xl" />
                  )}
                  <p className="text-white text-xs uppercase mt-2 font-secondary">
                    {skill.name}
                  </p>
                </div>
              ))}
            </ScrollVelocityRow>
            <div className="py-6" />

            {/* ===== ROW B - ALL SKILLS ===== */}
            <ScrollVelocityRow baseVelocity={2} direction={-1} className="py-6">
              {infiniteSkillsRowB.map((skill, index) => (
                <div
                  key={`row-b-${skill.id}-${index}`}
                  className="lg:mx-8 mx-4 inline-flex flex-col items-center"
                >
                  {skill.imageUrl ? (
                    <Image
                      src={skill.imageUrl}
                      alt={skill.name}
                      width={200}
                      height={200}
                      className="lg:w-20 w-14 rounded-xl object-contain hover:scale-110 transition-all"
                      loading="lazy"
                      unoptimized
                    />
                  ) : (
                    <div className="lg:w-20 w-14 bg-gray-800 rounded-xl" />
                  )}
                  <p className="text-white text-xs uppercase mt-2 font-secondary">
                    {skill.name}
                  </p>
                </div>
              ))}
            </ScrollVelocityRow>
          </ScrollVelocityContainer>
        </div>
      )}
    </div>
  );
}
