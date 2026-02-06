import React from "react";
// import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import HomePage from "@/app/page";
import About from "@/app/about/page";
import Portfolio from "@/app/portfolio/page";
import Contact from "@/app/contact/page";

const Nav = () => {
  const location = useLocation();
  return (
    <nav className="hidden lg:flex gap-x-12 font-semibold">
      {["/", "/about", "/portfolio", "/contact"].map((path) => (
        <Link
          key={path}
          to={path}
          className={`font-semibold text-white hover:text-orange-500 transition ${
            location.pathname === path ? "text-orange-500" : ""
          }`}
        >
          {path === "/"
            ? "Home"
            : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
        </Link>
      ))}
    </nav>
  );
};

const AnimRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence initial={true} mode="wait">
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
};

export { AnimRoutes as default, Nav };
