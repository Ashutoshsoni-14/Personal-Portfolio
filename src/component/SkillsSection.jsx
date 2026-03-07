import { useState } from "react";
import { cn } from "../lib/utils";
const skills = [
  //frontend
  { name: "HTML/CSS", level: 90, category: "frontend" },
  { name: "Javascript", level: 70, category: "frontend" },
  { name: "React", level: 80, category: "frontend" },
  { name: "TailwindCss", level: 85, category: "frontend" },
  //Backend
  { name: "Node.js", level: 75, category: "Backend" },
  { name: "Sql", level: 85, category: "Backend" },
  {name: "MongoDb" , level:80,category:"Backend"},
  {name: "Express.js" ,level:70,category:"Backend"},
  //Tools
  { name: "Git/GitHub", level: 80, category: "Tools" },
  { name: "VsCode", level: 85, category: "Tools" },
  //problem-solving
  { name: "DataStructure", level: 85, category: "Problem-solving" },
  { name: "Algorithms", level: 75, category: "Problem-solving" },
];

const categories = ["all", "frontend", "Backend", "Tools","Problem-solving"];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );
  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary"> Skills</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, key) => (
            <button
              key={key}
              className={cn(
                "px-5 py-2 rounded-full transition-colors duration-300 capitalize",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-foreground hover:bg-secondary"
              )}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
          {filteredSkills.map((skill, key) => (
            <div
              key={key}
              className="bg-card p-6 rounded-lg shadow-xs card-hover"
            >
              <div className="text-left mb-2">
                <h3 className="font-semibold text-lg">{skill.name}</h3>
              </div>
              <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-2 rounded-full origin-left animate-[grow_1.5s_ease-out]"
                  style={{ width: skill.level + "%" }}
                />
              </div>
              <div className="text-right mt-1">
                <span className="text-sm text-muted-foreground">
                  {skill.level}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
