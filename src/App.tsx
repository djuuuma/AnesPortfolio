import { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { Code2, FileText, Moon, Sun, Menu, X, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence, MotionConfig } from "motion/react";

import { HackathonProvider, useHackathonMode } from "./context/HackathonContext";
import GlitchTransition from "./components/GlitchTransition";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Experience from "./pages/Experience";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={location.pathname}
        className="pt-16"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.main>
    </AnimatePresence>
  );
}

const navLinks = [
  { label: "Projects", to: "/projects" },
  { label: "Experience", to: "/experience" },
  { label: "Contact", to: "/contact" },
];

function Navbar({ dark, setDark }: { dark: boolean; setDark: (v: boolean) => void }) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isHackathonMode, toggle: toggleHackathon } = useHackathonMode();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="relative container mx-auto px-4 h-16 flex items-center">
        {/* Logo — flex-1 so it mirrors the right side and keeps links centred */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-1">
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-xl tracking-tighter"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
              <Code2 size={20} />
            </div>
            <span>Portfolio.exe</span>
          </Link>
        </motion.div>

        {/* Desktop nav links — pinned to horizontal centre of the bar */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`transition-colors hover:text-primary ${
                location.pathname === link.to
                  ? "text-primary font-semibold"
                  : "opacity-70"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right controls — flex-1 + justify-end mirrors the logo side */}
        <div className="flex flex-1 justify-end items-center gap-2">
          {/* Hackathon mode toggle */}
          <Button
            variant={isHackathonMode ? "default" : "outline"}
            size="sm"
            onClick={toggleHackathon}
            aria-label="Toggle hackathon mode"
            className={`hidden sm:flex gap-2 text-xs font-mono transition-all ${
              isHackathonMode
                ? "shadow-[0_0_12px_2px_#00ff41] border-[#00ff41]"
                : ""
            }`}
            title={isHackathonMode ? "Exit Hackathon Mode" : "Enter Hackathon Mode"}
          >
            <Terminal size={14} />
            {isHackathonMode ? "EXIT_HACK" : "HACK_MODE"}
          </Button>

          {/* Dark mode toggle — hidden in hackathon mode (always dark) */}
          {!isHackathonMode && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDark(!dark)}
              aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
          )}

          {/* Download CV — shown but links to LinkedIn until CV is ready */}
          <Button
            variant="outline"
            size="sm"
            nativeButton={false}
            className="hidden sm:inline-flex gap-1.5"
            render={
              <a
                href="https://www.linkedin.com/in/anes-djumisic/"
                target="_blank"
                rel="noopener noreferrer"
                title="View LinkedIn profile"
              />
            }
          >
            <FileText size={15} />
            CV
          </Button>

          {/* Mobile hamburger */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="md:hidden bg-background border-b px-4 pb-4 flex flex-col gap-1"
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors hover:bg-muted ${
                  location.pathname === link.to
                    ? "text-primary font-semibold bg-primary/10"
                    : "opacity-70"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {/* Hackathon toggle in mobile menu */}
            <button
              onClick={toggleHackathon}
              className="mt-1 py-2 px-3 text-left text-sm font-mono font-medium text-primary opacity-80 hover:opacity-100 transition-opacity"
            >
              <Terminal size={13} className="inline mr-2" />
              {isHackathonMode ? "Exit Hackathon Mode" : "Enter Hackathon Mode"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function Layout() {
  const [dark, setDark] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem("theme");
      if (stored) return stored === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch {
      return false;
    }
  });

  const updateDark = (value: boolean) => {
    setDark(value);
    try {
      localStorage.setItem("theme", value ? "dark" : "light");
    } catch {}
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
        <ScrollToTop />
        <GlitchTransition />
        <Navbar dark={dark} setDark={updateDark} />
        <AnimatedRoutes />
        <footer className="py-12 border-t">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-muted-foreground">
              © 2026 Anes Đumišić. Built for excellence.
            </p>
            <div className="flex gap-4 text-xs font-mono uppercase tracking-widest font-bold">
              <a
                href="https://github.com/djuuuma"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/anes-djumisic/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </footer>
      </div>
    </MotionConfig>
  );
}

export default function App() {
  return (
    <HackathonProvider>
      <Layout />
    </HackathonProvider>
  );
}
