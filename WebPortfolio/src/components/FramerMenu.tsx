"use client";

import React, { useState, useEffect } from "react";
import { useAnimate, stagger, type AnimationSequence } from "framer-motion";
import Link from "next/link";

function useMenuAnimation(isOpen: boolean) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const menuAnimations: AnimationSequence = isOpen
      ? [
          [
            ".menu-wrapper nav",
            { transform: "translateX(0%)" },
            {
              ease: [0.08, 0.65, 0.53, 0.96],
              duration: 0.6,
            },
          ],
          [
            ".menu-wrapper li",
            { transform: "scale(1)", opacity: 1, filter: "blur(0px)" },
            { delay: stagger(0.05), at: "-0.1" },
          ],
        ]
      : [
          [
            ".menu-wrapper li",
            { transform: "scale(0.5)", opacity: 0, filter: "blur(10px)" },
            {
              delay: stagger(0.05, { from: "last" }),
              at: "<",
            },
          ],
          [
            ".menu-wrapper nav",
            { transform: "translateX(-100%)" },
            { at: "-0.1" },
          ],
        ];

    const pathAnimations: AnimationSequence = [
      [
        ".menu-wrapper .top",
        { d: isOpen ? "M 3 16.5 L 17 2.5" : "M 2 2.5 L 20 2.5" },
        { at: "<" },
      ],
      [".menu-wrapper .middle", { opacity: isOpen ? 0 : 1 }, { at: "<" }],
      [
        ".menu-wrapper .bottom",
        { d: isOpen ? "M 3 2.5 L 17 16.346" : "M 2 16.346 L 20 16.346" },
        { at: "<" },
      ],
    ];

    animate([...pathAnimations, ...menuAnimations]);
  }, [isOpen, animate]);

  return scope;
}

interface MenuProps {
  closeMenu: () => void;
}

export function Menu({ closeMenu }: MenuProps) {
  const handleLinkClick = () => closeMenu();

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav
      style={{ transform: "translateX(-100%)" }} // ⭐ FIXED
      className="lg:hidden z-40 fixed top-0 left-0 bottom-0 md:w-[400px] w-[280px] bg-secondary py-20 transition-transform duration-300 ease-in-out"
    >
      <ul className="flex flex-col gap-2 p-2">
        {links.map(({ href, label }) => (
          <li
            key={href}
            className="text-white hover:text-(--hover-color) hover:scale-105 transition cursor-pointer block transform-origin-left font-extrabold text-5xl p-8 will-change-transform will-change-opacity will-change-filter"
          >
            <Link href={href} onClick={handleLinkClick}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

type PathProps = React.SVGProps<SVGPathElement>;

const Path: React.FC<PathProps> = (props) => (
  <path
    fill="transparent"
    strokeWidth="3"
    stroke="var(--background)"
    strokeLinecap="round"
    {...props}
  />
);

interface MenuToggleProps {
  toggle: () => void;
}

export const MenuToggle: React.FC<MenuToggleProps> = ({ toggle }) => (
  <button
    onClick={toggle}
    className="lg:hidden z-50 flex items-center justify-center bg-white shadow-md w-12 h-12 rounded-full hover:shadow-[#BC53C9] cursor-pointer"
  >
    <svg width="23" height="18" viewBox="0 0 23 18">
      <Path d="M 2 2.5 L 20 2.5" className="top" stroke="#101630" />
      <Path
        d="M 2 9.423 L 20 9.423"
        opacity="1"
        className="middle"
        stroke="#101630"
      />
      <Path d="M 2 16.346 L 20 16.346" className="bottom" stroke="#101630" />
    </svg>
  </button>
);

export default function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const scope = useMenuAnimation(isOpen);

  return (
    <div ref={scope} className="menu-wrapper">
      <Menu closeMenu={() => setIsOpen(false)} />
      <MenuToggle toggle={() => setIsOpen(!isOpen)} />
    </div>
  );
}
