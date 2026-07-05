import { ArrowDown, Code2, Database, Github, Globe, Terminal, Award, FileText, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const roles = ["Frontend Developer", "MERN Stack Developer", "DSA Practitioner", "AI/ML Enthusiast"];

const floatingIcons = [
  { icon: Code2, color: "text-primary", delay: 0, x: "12%", y: "20%" },
  { icon: Terminal, color: "text-accent-blue", delay: 1, x: "85%", y: "15%" },
  { icon: Database, color: "text-accent-purple", delay: 2, x: "78%", y: "75%" },
  { icon: Globe, color: "text-emerald-400", delay: 1.5, x: "15%", y: "70%" },
];

export const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    let timer;
    const handleTyping = () => {
      const fullText = roles[roleIndex];
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        if (currentText === fullText) {
          setIsDeleting(true);
          setTypingSpeed(1500); // Pause when word is complete
        } else {
          setTypingSpeed(75);
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
          setTypingSpeed(500); // Pause before next word
        } else {
          setTypingSpeed(45);
        }
      }
    };
    timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex, typingSpeed]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden pt-20"
    >
      {/* Animated Gradient Background Overlays */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.2] pointer-events-none z-0" />

      <div className="absolute top-[20%] left-[20%] w-[350px] h-[350px] rounded-full bg-primary/20 blur-[100px] pointer-events-none animate-pulse-subtle" />
      <div className="absolute bottom-[20%] right-[20%] w-[350px] h-[350px] rounded-full bg-accent-purple/15 blur-[120px] pointer-events-none animate-pulse-subtle" style={{ animationDelay: "2s" }} />

      {/* Floating Tech Stack Icons */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          className="absolute hidden md:flex items-center justify-center p-4 rounded-2xl bg-black/[0.01] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 backdrop-blur-md shadow-2xl z-10"
          style={{ left: item.x, top: item.y }}
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut",
          }}
        >
          <item.icon className={`h-7 w-7 ${item.color}`} />
        </motion.div>
      ))}

      <div className="container max-w-4xl mx-auto text-center z-10">
        <div className="space-y-6">
          {/* 404: Free Time Not Found */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold uppercase tracking-wider mx-auto"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            404: Free Time Not Found
          </motion.div>

          <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-foreground leading-tight">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="block sm:inline"
            >
              Hi, I'm{" "}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-r from-primary to-[#a78bfa] bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]"
            >
              Ashutosh Soni
            </motion.span>
          </h1>

          {/* Typing Animation Roles */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="h-8 md:h-10 text-xl md:text-3xl font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-accent-blue dark:via-accent-purple dark:to-accent-pink bg-clip-text text-transparent flex justify-center items-center gap-1.5"
          >
            <span>I am a </span>
            <span className="border-r-2 border-primary pr-1 font-bold animate-pulse">
              {currentText}
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-foreground/75 max-w-2xl mx-auto font-medium"
          >
            I create steller web experiences with modern technologies,
            Specializing in front-end development .I build interfaces that are
            both beautiful and functional.
          </motion.p>

          {/* Premium CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-4 justify-center pt-6 z-20 relative"
          >
            <a href="#projects" className="cosmic-button flex items-center gap-2">
              <span>View My Work</span>
            </a>

            <a
              href="/AshutoshCV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-foreground transition-all duration-300 flex items-center gap-2 shadow-md"
            >
              <FileText size={18} />
              <span>Resume</span>
            </a>

            <a
              href="https://github.com/Ashutoshsoni-14"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-foreground transition-all duration-300 flex items-center gap-2 shadow-md"
            >
              <Github size={18} />
              <span>GitHub</span>
            </a>

            <a
              href="https://leetcode.com/u/Ashutosh_soni14/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-foreground transition-all duration-300 flex items-center gap-2 shadow-md"
            >
              <Award size={18} className="text-yellow-500" />
              <span>LeetCode</span>
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce z-10 pointer-events-none"
      >
        <span className="text-xs text-foreground/50 mb-2 tracking-widest uppercase">Scroll</span>
        <ArrowDown className="h-4 w-4 text-primary" />
      </motion.div>
    </section>
  );
};
