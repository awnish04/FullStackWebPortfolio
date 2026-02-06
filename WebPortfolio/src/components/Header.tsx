"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Socials from "./Socials";
import FramerMenu from "./FramerMenu";

const Header = () => {
  const pathname = usePathname(); // replaces useLocation()

  const navLinkStyles = (isActive: boolean) => ({
    fontWeight: isActive ? "bold" : "normal",
    color: isActive ? "var(--hover-color)" : "#fff",
  });

  const navPaths = ["/", "/about", "/portfolio", "/contact"];

  return (
    <header className="container mx-auto px-4 z-30 h-[100px] lg:h-[120px] flex items-center">
      <div className="flex flex-col lg:flex-row lg:items-center w-full justify-between">
        {/* Logo */}
        <Link href={"/"} className="max-w-[200px]">
          <h2 className="font-secondary underline text-white hover:text-(--hover-color) hover:scale-105 transition cursor-pointer">
            created by Awnish
          </h2>
        </Link>

        {/* Navigation */}
        <nav className="hidden lg:flex gap-x-10 font-semibold">
          {navPaths.map((path) => (
            <Link
              key={path}
              href={path}
              className="font-semibold font-secondary text-base text-white hover:scale-105 transition cursor-pointer"
              style={navLinkStyles(pathname === path)}
            >
              {path === "/"
                ? ""
                : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
            </Link>
          ))}
        </nav>

        {/* Socials */}
        <Socials />
      </div>

      {/* Hamburger / Framer Menu */}
      <FramerMenu />
    </header>
  );
};

export default Header;
