import { useState, useRef } from "react";
import { cn } from "../lib/utils";
import { motion, useInView } from "framer-motion";
import { 
  Code2, 
  Terminal, 
  Layers, 
  Database as DbIcon, 
  GitBranch, 
  Flame, 
  BrainCircuit, 
  Wrench,
  Server,
  Boxes,
  Workflow,
  Laptop
} from "lucide-react";

const skills = [
  // Frontend
  { name: "HTML/CSS", level: 90, category: "Frontend", icon: Code2, color: "from-orange-500 to-yellow-500" },
  { name: "Javascript", level: 70, category: "Frontend", icon: Terminal, color: "from-yellow-400 to-orange-500" },
  { name: "React", level: 80, category: "Frontend", icon: Layers, color: "from-cyan-400 to-blue-500" },
  { name: "TailwindCss", level: 85, category: "Frontend", icon: Laptop, color: "from-teal-400 to-cyan-500" },
  // Backend
  { name: "Node.js", level: 75, category: "Backend", icon: Server, color: "from-green-400 to-emerald-600" },
  { name: "Express.js", level: 70, category: "Backend", icon: Terminal, color: "from-gray-300 to-gray-500" },
  // Database
  { name: "Sql", level: 85, category: "Database", icon: DbIcon, color: "from-blue-500 to-indigo-600" },
  { name: "MongoDb", level: 80, category: "Database", icon: DbIcon, color: "from-green-500 to-emerald-600" },
  // DSA
  { name: "DataStructure", level: 85, category: "DSA", icon: Boxes, color: "from-purple-500 to-pink-500" },
  { name: "Algorithms", level: 75, category: "DSA", icon: Workflow, color: "from-indigo-500 to-purple-500" },
  // AI/ML (Microsoft Azure AI Essentials verified in certifications)
  { name: "Azure AI Essentials", level: 75, category: "AI/ML", icon: BrainCircuit, color: "from-pink-500 to-rose-600" },
  { name: "AI Concept Integration", level: 70, category: "AI/ML", icon: BrainCircuit, color: "from-rose-400 to-purple-600" },
  // Tools
  { name: "Git/GitHub", level: 80, category: "Tools", icon: GitBranch, color: "from-orange-600 to-red-600" },
  { name: "VsCode", level: 85, category: "Tools", icon: Code2, color: "from-blue-600 to-cyan-500" },
];

const categories = ["All", "Frontend", "Backend", "Database", "DSA", "AI/ML", "Tools"];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "All" || skill.category === activeCategory
  );

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section id="skills" className="py-32 px-4 relative overflow-hidden" ref={sectionRef}>
      {/* Background decoration */}
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-accent-purple/10 blur-[100px] pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            My <span className="bg-gradient-to-r from-primary to-[#a78bfa] bg-clip-text text-transparent">Skills</span>
          </h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-foreground/60 max-w-2xl mx-auto text-lg">
            A comprehensive overview of my technical expertise, methodologies, and core competencies.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-16 max-w-3xl mx-auto">
          {categories.map((category, key) => (
            <button
              key={key}
              className={cn(
                "px-5 py-2 text-sm font-semibold rounded-full border transition-all duration-300 capitalize cursor-pointer",
                activeCategory === category
                  ? "bg-primary border-primary text-white shadow-[0_0_15px_rgba(139,92,246,0.4)]"
                  : "bg-black/5 dark:bg-white/[0.02] border-black/5 dark:border-white/5 text-foreground/80 hover:text-foreground hover:bg-black/10 dark:hover:bg-white/[0.05]"
              )}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {filteredSkills.map((skill, key) => (
            <motion.div
              layout
              key={skill.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: key * 0.05 }}
              onMouseMove={handleMouseMove}
              className="group relative bg-black/[0.01] dark:bg-white/[0.01] border border-black/5 dark:border-white/5 rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 hover:translate-y-[-2px]"
            >
              {/* Radial glow gradient on mouse move */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: "radial-gradient(150px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(167, 139, 250, 0.08), transparent 80%)"
                }}
              />

              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 text-primary group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300">
                  <skill.icon size={20} className="text-primary" />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-foreground text-base leading-tight group-hover:text-primary transition-colors">{skill.name}</h3>
                  <span className="text-xs text-foreground/50 font-medium tracking-wide uppercase">{skill.category}</span>
                </div>
              </div>

              {/* Progress Bar Container */}
              <div className="space-y-2 mt-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-foreground/55 font-medium">Proficiency</span>
                  <span className="text-foreground font-bold">{skill.level}%</span>
                </div>
                <div className="w-full bg-black/5 dark:bg-white/5 h-2 rounded-full overflow-hidden">
                  <motion.div
                    className={cn("h-full rounded-full bg-gradient-to-r", skill.color)}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : {}}
                    transition={{ duration: 1.2, delay: 0.1, ease: "easeOut" }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
