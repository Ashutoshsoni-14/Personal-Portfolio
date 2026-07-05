import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Code2, Globe, Cpu } from "lucide-react";

const timelineData = [
  {
    year: "2023",
    title: "Foundations of Computer Science",
    subtitle: "B.Tech in CSE Entry",
    description: "Started B.Tech in Computer Science & Engineering. Learned programming fundamentals (C/C++), Object-Oriented Programming, and laid down strong academic foundations.",
    icon: GraduationCap,
    nodeStyles: "text-primary border-primary/30"
  },
  {
    year: "2024",
    title: "Frontend Engineering & Systems",
    subtitle: "Web Technologies & Layouts",
    description: "Mastered responsive layouts, HTML5, CSS3, ES6 JavaScript, and Tailwind CSS. Built mini-projects like YouTube clone to perfect responsive visual design and interactivity.",
    icon: Globe,
    nodeStyles: "text-blue-600 dark:text-accent-blue border-blue-600/20 dark:border-accent-blue/30"
  },
  {
    year: "2025",
    title: "Full-Stack Web & DSA Mastery",
    subtitle: "MERN Stack & Problem Solving",
    description: "Acquired MERN stack development skills (React, Express, Node.js, MongoDB). Deeply practiced Data Structures and Algorithms, solving 500+ problems on Leetcode and other platforms.",
    icon: Code2,
    nodeStyles: "text-purple-600 dark:text-accent-purple border-purple-600/20 dark:border-accent-purple/30"
  },
  {
    year: "2026",
    title: "AI Integration & Advanced Products",
    subtitle: "Modern Engineering & Optimization",
    description: "Developed AI-integrated tools like Leetcode-Ai-Mentor. Explored Microsoft Azure AI Essentials and forged robust API architectures, preparing for professional engineering placements.",
    icon: Cpu,
    nodeStyles: "text-rose-600 dark:text-pink-500 border-rose-600/20 dark:border-pink-500/30"
  }
];

export const TimelineSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="timeline" className="py-32 px-4 relative overflow-hidden" ref={containerRef}>
      {/* Glow Effect */}
      <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />

      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-center">
            Learning <span className="bg-gradient-to-r from-primary to-[#a78bfa] bg-clip-text text-transparent">Journey</span>
          </h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-foreground/60 max-w-xl mx-auto text-lg text-center">
            A chronological timeline of my academic milestones, development learning path, and projects.
          </p>
        </motion.div>

        {/* Vertical Timeline container */}
        <div className="relative border-l border-black/10 dark:border-white/10 ml-4 md:ml-8 pl-8 md:pl-12 space-y-12 py-4 text-left">
          {/* Animated Line overlay */}
          <motion.div 
            className="absolute left-0 top-0 w-[1px] bg-gradient-to-b from-primary via-accent-purple to-accent-blue origin-top"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{ height: "100%" }}
          />

          {timelineData.map((item, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative group"
              >
                {/* Timeline Node Circle */}
                <div className={`absolute left-[-41px] md:left-[-57px] top-1.5 p-2 rounded-full border bg-background border-black/10 dark:border-white/10 z-10 transition-all duration-300 group-hover:scale-115 group-hover:border-primary/60 shadow-[0_0_15px_rgba(0,0,0,0.5)] ${item.nodeStyles}`}>
                  <item.icon size={16} />
                </div>

                {/* Card Container */}
                <div className="p-6 md:p-8 rounded-2xl bg-black/[0.01] dark:bg-white/[0.01] border border-black/5 dark:border-white/5 backdrop-blur-md hover:border-black/15 dark:hover:border-white/15 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-all duration-300 shadow-xl relative overflow-hidden">
                  {/* Decorative faint glow */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                    <div>
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20 mb-2 md:mb-0">
                        {item.year}
                      </span>
                      <h3 className="text-xl font-bold text-foreground tracking-tight mt-1 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                    </div>
                    <span className="text-sm font-semibold text-foreground/50 tracking-wider">
                      {item.subtitle}
                    </span>
                  </div>
                  
                  <p className="text-foreground/75 leading-relaxed text-sm md:text-base mt-2">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
