"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg shadow-black/5"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="relative z-50 flex-shrink-0">
          <Image
            src="/images/logo-scbt.png"
            alt="SCBT - Sporting Club Bron Terraillon"
            width={50}
            height={50}
            priority
          />
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`font-[family-name:var(--font-verbatim)] text-sm uppercase tracking-wider transition-colors duration-200 ${
                    isActive
                      ? "text-blue-accent"
                      : scrolled
                        ? "text-text-secondary hover:text-blue-accent"
                        : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Link
            href="#contact"
            className="inline-flex items-center justify-center rounded-sm bg-gold px-5 py-2.5 font-[family-name:var(--font-verbatim)] text-sm uppercase tracking-wider text-navy-deep transition-all duration-300 hover:bg-gold/90 shadow-lg hover:shadow-gold/25"
          >
            Rejoindre le club
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="relative z-50 flex h-10 w-10 items-center justify-center lg:hidden"
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {mobileOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <Menu className={`h-6 w-6 ${scrolled ? "text-navy-deep" : "text-white"}`} />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 lg:hidden"
              onClick={closeMobile}
            />

            {/* Slide-in panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
              className="fixed right-0 top-0 z-40 flex h-full w-[280px] flex-col bg-navy-deep pt-24 px-8 shadow-2xl lg:hidden"
            >
              <ul className="flex flex-col gap-6">
                {NAV_LINKS.map((link, index) => {
                  const isActive = pathname === link.href;

                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={closeMobile}
                        className={`font-[family-name:var(--font-verbatim)] text-lg uppercase tracking-wider transition-colors duration-200 ${
                          isActive
                            ? "text-blue-accent"
                            : "text-white hover:text-blue-accent"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-10"
              >
                <Link
                  href="#contact"
                  onClick={closeMobile}
                  className="inline-flex w-full items-center justify-center rounded-sm bg-gold px-6 py-3 font-[family-name:var(--font-verbatim)] text-sm uppercase tracking-wider text-navy-deep transition-all duration-300 hover:bg-gold/90 shadow-lg"
                >
                  Rejoindre le club
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
