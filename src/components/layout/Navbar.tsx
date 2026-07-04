"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { personalInfo } from "@/lib/data";

const navLinks = [
  { label: "Home",       href: "#hero" },
  { label: "About",      href: "#about" },
  { label: "Skills",     href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects",   href: "#projects" },
  { label: "Contact",    href: "#contact" },
];

export default function Navbar() {
  const [isOpen,        setIsOpen]        = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled,      setScrolled]      = useState(false);

  const { scrollY }   = useScroll();
  const navOpacity    = useTransform(scrollY, [0, 80], [0, 1]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "py-3" : "py-5"
        )}
      >
        {/* Blurred background — fades in after scroll */}
        <motion.div
          className="absolute inset-0 border-b border-white/[0.04]"
          style={{ opacity: navOpacity, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(20px)"}}
          aria-hidden
        />

        <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between h-12">
          {/* Logo */}
          <motion.button
            onClick={() => scrollTo("#hero")}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-3 flex-shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-purple-900/40">
              A
            </div>
            <span className="text-white font-bold text-xl tracking-tight leading-none">
              ASHIF<span className="text-purple-400">.</span>
            </span>
          </motion.button>

          {/* Desktop links — centred, generous spacing */}
          <ul className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const active = activeSection === link.href.replace("#", "");
              return (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className={cn(
                      "relative px-5 py-2.5 text-sm font-medium rounded-xl transition-colors duration-200 whitespace-nowrap",
                      active ? "text-white" : "text-white/50 hover:text-white/80"
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-xl bg-white/[0.08] border border-white/[0.12]"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                    {active && (
                      <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-purple-400" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Resume CTA */}
          <div className="hidden md:flex items-center flex-shrink-0">
            <motion.a
              href={personalInfo.resume}
              download="Ashif_Ahamad_Resume.pdf"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-purple-900/30 hover:shadow-purple-900/50 transition-shadow"
            >
              <Download size={14} />
              Resume
            </motion.a>
          </div>

          {/* Mobile burger — only shows hamburger icon */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2.5 rounded-xl glass text-white/70 hover:text-white transition-colors"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-0 z-40 border-b border-white/10"
            style={{ background: "rgba(0,0,0,0.97)", backdropFilter: "blur(24px)" }}
          >
            {/* Header row inside drawer — logo + close button */}
            <div className="flex items-center justify-between px-4 sm:px-6 h-[72px]">
              
              <button
                onClick={() => setIsOpen(false)}
                className="p-2.5 rounded-xl glass text-white/70 hover:text-white transition-colors"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Divider */}
            <div className="h-px bg-white/[0.06] mx-4" />

            {/* Nav links */}
            <div className="px-4 sm:px-6 pt-3 pb-6">
              <ul className="flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <button
                      onClick={() => scrollTo(link.href)}
                      className={cn(
                        "w-full text-left px-4 py-3.5 rounded-xl text-base font-medium transition-all",
                        activeSection === link.href.replace("#", "")
                          ? "bg-white/[0.08] text-white border border-white/[0.12]"
                          : "text-white/60 hover:text-white hover:bg-white/[0.04]"
                      )}
                    >
                      {link.label}
                    </button>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                  className="mt-3"
                >
                  <a
                    href={personalInfo.resume}
                    download="Ashif_Ahamad_Resume.pdf"
                    className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-center font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                  >
                    <Download size={15} />
                    Download Resume
                  </a>
                </motion.li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
