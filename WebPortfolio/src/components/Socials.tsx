"use client";
import React from "react";
import { Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

const Socials = () => {
  const socialLinks = [
    { href: process.env.NEXT_PUBLIC_GITHUB_URL, icon: <Github /> },
    { href: process.env.NEXT_PUBLIC_LINKEDIN_URL, icon: <Linkedin /> },
  ];

  return (
    <div className="hidden lg:flex  flex-col">
      <ul className="flex gap-x-4">
        {socialLinks.map((link, i) => (
          <motion.a
            key={i}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-2xl hover:text-(--hover-color) hover:scale-105 transition cursor-pointer"
          >
            {link.icon}
          </motion.a>
        ))}
      </ul>
    </div>
  );
};

export default Socials;
