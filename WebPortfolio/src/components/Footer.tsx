"use client";

import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer: React.FC = () => {
  const openEmailClient = () => {
    const email = "awnishmehta99@gmail.com";
    window.location.href = `mailto:${email}?subject=Subject&body=Hello%20there`;
  };

  const socialLinks = [
    { href: process.env.NEXT_PUBLIC_GITHUB_URL, icon: <Github /> },
    { href: process.env.NEXT_PUBLIC_LINKEDIN_URL, icon: <Linkedin /> },
  ];

  return (
    <footer className="border-t-2 text-white">
      <div className="container flex flex-col items-center px-4 mx-auto justify-center">
        <h2 className="font-secondary text-2xl lg:text-5xl font-bold py-6">
          Follow Me On
        </h2>
        <div className="flex justify-center space-x-4 text-2xl lg:text-4xl">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1c2342] p-2 lg:p-4 rounded-md hover:text-(--hover-color) hover:scale-105 transition cursor-pointer"
            >
              {link.icon}
            </a>
          ))}

          {/* Email Button */}
          <button
            onClick={openEmailClient}
            className="bg-[#1c2342] p-2 lg:p-4 rounded-md hover:text-(--hover-color) hover:scale-105 transition cursor-pointer"
            aria-label="Send Email"
          >
            <Mail />
          </button>
        </div>
      </div>
      <div className="py-8">
        <p className="font-secondary text-center text-sm text-gray-400">
          © {new Date().getFullYear()} All rights reserved by your website.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
