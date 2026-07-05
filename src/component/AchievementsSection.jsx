import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Trophy, Award, Sparkles, ShieldCheck } from "lucide-react";

const achievementsData = [
  {
    title: "LeetCode Milestone",
    value: "500+ Solved",
    description: "Solved over 500 algorithmic and data structure problems on LeetCode. Focused on optimization, dynamic programming, and systems design.",
    icon: Trophy,
    color: "from-amber-400 to-yellow-500",
    glow: "shadow-amber-500/10 border-amber-500/30"
  },
  {
    title: "Microsoft Azure AI Essentials",
    value: "Microsoft Certified",
    description: "Successfully certified in Microsoft Azure AI concepts, demonstrating proficiency in cloud machine learning, computer vision, and NLP implementations.",
    icon: Award,
    color: "from-blue-400 to-indigo-500",
    glow: "shadow-blue-500/10 border-blue-500/30"
  },
  {
    title: "GitHub Career Essentials",
    value: "GitHub Certified",
    description: "Certified in professional Git practices, repository architecture, collaborative workflows, and GitHub environment tools.",
    icon: ShieldCheck,
    color: "from-purple-400 to-pink-500",
    glow: "shadow-purple-500/10 border-purple-500/30"
  },
  {
    title: "SWE Job Simulation",
    value: "Forage Verified",
    description: "Completed the Forage Software Engineering simulation, implementing software design patterns and reproducing real-world engineering team environments.",
    icon: Sparkles,
    color: "from-emerald-400 to-teal-500",
    glow: "shadow-emerald-500/10 border-emerald-500/30"
  }
];

export const AchievementsSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="achievements" className="py-32 px-4 relative overflow-hidden" ref={containerRef}>
      {/* Background radial overlay */}
      <div className="absolute top-[10%] right-[10%] w-[300px] h-[300px] rounded-full bg-accent-purple/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-center">
            Key <span className="bg-gradient-to-r from-primary to-[#a78bfa] bg-clip-text text-transparent">Achievements</span>
          </h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-foreground/60 max-w-xl mx-auto text-lg text-center">
            Recognitions, certifications, and technical accomplishments achieved throughout my learning path.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {achievementsData.map((item, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`p-6 md:p-8 rounded-2xl bg-black/[0.01] dark:bg-white/[0.01] border border-black/5 dark:border-white/5 backdrop-blur-md transition-all duration-300 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] shadow-2xl flex flex-col justify-between ${item.glow}`}
              >
                <div className="space-y-4 text-left">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${item.color} text-background shadow-lg`}>
                      <item.icon size={22} className="text-white" />
                    </div>
                    <span className="text-sm font-bold bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-3 py-1 rounded-full text-foreground/80">
                      {item.value}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-foreground tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-foreground/75 leading-relaxed text-sm md:text-base">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="border-t border-black/5 dark:border-white/5 mt-6 pt-4 flex items-center justify-between text-xs text-foreground/40 font-semibold uppercase tracking-wider">
                  <span>Status</span>
                  <span className="text-primary font-bold text-[10px] tracking-widest px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                    Verified
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
