import { ArrowRight, ExternalLink, Github, Code2, Sparkles } from "lucide-react";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "Leetcode-Ai-Mentor",
    image: "/Projects/pro4.png",
    description: "AI mentor for solving and improving LeetCode problems.",
    tags: ["react", "mongodb", "node.js"],
    demoUrl: "https://leetcode-ai-mentor.vercel.app/",
    gitHuburl: "https://github.com/Ashutoshsoni-14/leetcode-ai-mentor",
    color: "from-purple-500 to-indigo-500",
  },
  {
    id: 2,
    title: "Expense Tracker",
    image: "/Projects/pro2.png",
    description: "A Website for tracking and maintain a record of expenses",
    tags: ["React"],
    demoUrl: "https://expense-tracker-beta-five-97.vercel.app/",
    gitHuburl: "https://github.com/Ashutoshsoni-14/Expense-tracker",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 3,
    title: "Algo-Sync",
    image: "/Projects/image.png",
    description: "competitive and collaborative coding platform",
    tags: ["React", "TailwindCss", "Socket.io", "Node.js", "Judge0 API", "Monaco Editor"],
    demoUrl: "https://algo-sync-beta.vercel.app/",
    gitHuburl: "https://github.com/Ashutoshsoni-14/AlgoSync",
    color: "from-pink-500 to-rose-500",
  },
];

const ProjectCard = ({ project, index, isInView }) => {
  const cardRef = useRef(null);
  const [imgError, setImgError] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    const rX = (mouseY / (height / 2)) * -10;
    const rY = (mouseX / (width / 2)) * 10;

    card.style.setProperty("--r-x", `${rX}deg`);
    card.style.setProperty("--r-y", `${rY}deg`);
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    card.style.setProperty("--r-x", "0deg");
    card.style.setProperty("--r-y", "0deg");
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative bg-black/[0.01] dark:bg-white/[0.01] border border-black/5 dark:border-white/5 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-full transition-all duration-300 hover:border-primary/40 hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
      style={{
        transform: "perspective(1000px) rotateX(var(--r-x, 0deg)) rotateY(var(--r-y, 0deg))",
        transformStyle: "preserve-3d",
        transition: "transform 0.15s ease-out, border-color 0.3s, background-color 0.3s"
      }}
    >
      {/* Visual background glow inside card */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/[0.02] dark:from-white/[0.02] to-transparent pointer-events-none" />

      {/* Project Image / Placeholder */}
      <div className="h-52 overflow-hidden bg-neutral-900 flex items-center justify-center relative border-b border-black/5 dark:border-b-white/5">
        {!imgError && project.image ? (
          <img
            src={project.image}
            alt={project.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/10 via-accent-purple/10 to-accent-blue/10 flex flex-col items-center justify-center p-6 relative">
            <div className="absolute inset-0 bg-grid-pattern opacity-10" />
            <Code2 size={44} className="text-primary mb-2 animate-float" />
            <span className="text-sm font-semibold text-foreground/80 tracking-wide">{project.title}</span>
            <span className="text-[10px] text-foreground/40 mt-1 uppercase tracking-widest">Interactive Sandbox</span>
          </div>
        )}

        {/* Top-Right Sparkle Decor */}
        <div className="absolute top-4 right-4 p-1.5 rounded-full bg-black/60 border border-black/10 dark:border-white/10 backdrop-blur-md text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Sparkles size={14} className="text-primary animate-pulse" />
        </div>
      </div>

      {/* Project Details */}
      <div className="p-6 flex-grow flex flex-col justify-between text-left">
        <div>
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="px-3 py-1 text-[10px] font-bold rounded-full bg-primary/10 text-primary border border-primary/20 uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors tracking-tight">
            {project.title}
          </h3>

          <p className="text-foreground/75 text-sm md:text-base leading-relaxed mb-6">
            {project.description}
          </p>
        </div>

        {/* Buttons / Actions */}
        <div className="flex items-center justify-between border-t border-black/5 dark:border-white/5 pt-4 mt-auto">
          <div className="flex gap-4">
            {project.demoUrl !== "#" && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                <ExternalLink size={16} />
                <span>Demo</span>
              </a>
            )}
            <a
              href={project.gitHuburl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-semibold text-foreground/70 hover:text-foreground dark:hover:text-white transition-colors"
            >
              <Github size={16} />
              <span>Source</span>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const ProjectSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-32 px-4 relative overflow-hidden" ref={containerRef}>
      {/* Glow Effects */}
      <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-primary/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-accent-blue/5 blur-[130px] pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Featured <span className="bg-gradient-to-r from-primary to-[#a78bfa] bg-clip-text text-transparent">Projects</span>
          </h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-foreground/60 max-w-2xl mx-auto text-lg">
            Here are some of my recent projects. Each project was carefully crafted with attention to detail, performance and user experience.
          </p>
        </motion.div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* More on GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <a
            href="https://github.com/Ashutoshsoni-14"
            target="_blank"
            rel="noopener noreferrer"
            className="cosmic-button w-fit flex items-center mx-auto gap-2 text-sm font-bold uppercase tracking-wider"
          >
            <span>Check My GitHub</span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
