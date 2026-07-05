import { Menu, X } from "lucide-react";
import { cn } from "../lib/utils";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Certifications", href: "#certifications" },
  { name: "Projects", href: "#projects" },
  { name: "Timeline", href: "#timeline" },
  { name: "Achievements", href: "#achievements" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(window.scrollY / totalHeight);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px",
      threshold: 0.1,
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    navItems.forEach((item) => {
      const el = document.getElementById(item.href.replace("#", ""));
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary via-accent-purple to-accent-blue z-50 origin-left"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      <nav
        className={cn(
          "fixed w-full z-40 transition-all duration-300",
          isScrolled 
            ? "py-3 bg-background/60 backdrop-blur-md border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.1)]" 
            : "py-6 bg-transparent"
        )}
      >
        <div className="container mx-auto flex items-center justify-between">
          <a
            className="text-2xl font-bold tracking-tight text-glow text-foreground flex items-center gap-1.5 hover:opacity-90 transition-opacity"
            href="#hero"
          >
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Ashutosh's</span>
            <span className="bg-gradient-to-r from-primary to-[#8b5cf6] bg-clip-text text-transparent">Portfolio</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-1.5 p-1.5 bg-white/[0.03] border border-white/5 rounded-full backdrop-blur-md">
            {navItems.map((item, key) => (
              <a
                key={key}
                href={item.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 relative",
                  activeSection === item.href.replace("#", "")
                    ? "text-primary-foreground font-semibold"
                    : "text-foreground/75 hover:text-foreground hover:bg-white/5"
                )}
              >
                {activeSection === item.href.replace("#", "") && (
                  <motion.span
                    layoutId="activeNavBackground"
                    className="absolute inset-0 bg-primary rounded-full z-[-1] shadow-[0_0_15px_rgba(139,92,246,0.5)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {item.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="lg:hidden p-2 text-foreground z-50 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-colors"
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Mobile Nav Drawer */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-x-0 top-0 pt-20 pb-8 px-6 bg-background/95 border-b border-white/10 backdrop-blur-lg z-30 flex flex-col items-center shadow-2xl"
              >
                <div className="flex flex-col space-y-4 w-full text-center">
                  {navItems.map((item, key) => (
                    <a
                      key={key}
                      href={item.href}
                      className={cn(
                        "py-3 text-lg font-medium rounded-xl transition-all duration-300",
                        activeSection === item.href.replace("#", "")
                          ? "text-primary bg-primary/10 font-semibold"
                          : "text-foreground/80 hover:text-foreground hover:bg-white/5"
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </>
  );
};
