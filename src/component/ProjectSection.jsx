import { ArrowRight, ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Leetcode-Ai-Mentor",
    image: "/Projects/pro4.png",
    description: "AI mentor for solving and improving LeetCode problems.",
    tags: ["react", "mongodb", "node.js"],
    demoUrl: "https://leetcode-ai-mentor.vercel.app/",
    gitHuburl: "https://github.com/Ashutoshsoni-14/leetcode-ai-mentor",
  },
  {
    id: 2,
    title: "Expense Tracker",
    image: "/Projects/pro2.png",
    description: "A Website for tracking and maintain a record of expenses",
    tags: ["React"],
    demoUrl: "https://expense-tracker-beta-five-97.vercel.app/",
    gitHuburl: "https://github.com/Ashutoshsoni-14/Expense-tracker",
  },
  {
    id: 3,
    title: "Youtube clone",
    image: "/Projects/pro3.png",
    description: "A Youtube clone website ",
    tags: ["React", "TailwindCss"],
    demoUrl: "#",
    gitHuburl: "https://github.com/Ashutoshsoni-14/YouTube-Clone",
  },
];
export const ProjectSection = () => {
  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Featured<span className="text-primary"> Projects</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are some of my recent projects .Each project was carefully
          crafted with attention to detail,performance and user experience.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, key) => (
            <div
              key={key}
              className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary/20 text-secondary-foreground border">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <ExternalLink size={20} />
                    </a>
                    <a
                      href={project.gitHuburl}
                      target="_blank"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <Github size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <a
            href="https://github.com/Ashutoshsoni-14"
            target="_blank"
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
          >
            Check My GitHub <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};
