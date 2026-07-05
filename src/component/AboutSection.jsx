import { Briefcase, Code, User, Award, CheckCircle2, ChevronRight } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const Counter = ({ value, duration = 1.5, suffix = "", isFloat = false }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const end = parseFloat(value);
    if (isNaN(end)) {
      setCount(value);
      return;
    }

    const steps = 50;
    const increment = end / steps;
    let stepCount = 0;

    const timer = setInterval(() => {
      stepCount++;
      const current = increment * stepCount;
      if (stepCount >= steps) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(isFloat ? parseFloat(current.toFixed(1)) : Math.floor(current));
      }
    }, (duration * 1000) / steps);

    return () => clearInterval(timer);
  }, [value, duration, isFloat, isInView]);

  return <span ref={ref}>{count}{suffix}</span>;
};

export const AboutSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 px-4 relative overflow-hidden" ref={containerRef}>
      {/* Decorative Glow */}
      <div className="absolute top-[30%] right-[-10%] w-[400px] h-[400px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            About <span className="bg-gradient-to-r from-primary to-[#a78bfa] bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Text & CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Passionate Web Developer & Tech Enthusiast
            </h3>
            
            <p className="text-foreground/80 text-lg leading-relaxed">
              Hello I'm a Passionate Third Year Btech student in computer
              science and Engineering.I enjoy working with Data Structures and
              Algorithms and regularly practice on LeetCode.
            </p>
            
            <p className="text-foreground/80 text-lg leading-relaxed">
              I am also passionate about building intelligent systems and
              exploring how AI can be used to solve real-world problems. I enjoy
              learning new technologies and working on projects that combine
              software development with AI concepts.
            </p>

            {/* Sub-features list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                "Innovative Problem Solving",
                "Clean & Maintainable Code",
                "Responsive UI/UX Focus",
                "Continuous Learning Mindset"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-foreground/80">
                  <CheckCircle2 size={16} className="text-primary flex-shrink-0" />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-6">
              <a href="#contact" className="cosmic-button">
                Get In Touch
              </a>
              <a
                href="/AshutoshCV.pdf"
                className="px-6 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-foreground transition-all duration-300 flex items-center gap-2"
                target="_blank"
                rel="noreferrer"
              >
                <span>Download CV</span>
                <ChevronRight size={16} />
              </a>
            </div>
          </motion.div>

          {/* Cards & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Features */}
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md hover:border-primary/30 hover:bg-white/[0.04] transition-all duration-300 group flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                  <Code size={22} />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg text-white">Web Development</h4>
                  <p className="text-foreground/75 text-sm mt-1">
                    Creating responsive websites and web applications with modern frameworks.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md hover:border-accent-purple/30 hover:bg-white/[0.04] transition-all duration-300 group flex items-start gap-4">
                <div className="p-3 rounded-xl bg-accent-purple/10 text-accent-purple group-hover:scale-110 transition-transform">
                  <User size={22} />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg text-white">UI/UX Design</h4>
                  <p className="text-foreground/75 text-sm mt-1">
                    Design intuitive user interfaces and seamless user experience.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md hover:border-accent-blue/30 hover:bg-white/[0.04] transition-all duration-300 group flex items-start gap-4">
                <div className="p-3 rounded-xl bg-accent-blue/10 text-accent-blue group-hover:scale-110 transition-transform">
                  <Briefcase size={22} />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg text-white">DSA</h4>
                  <p className="text-foreground/75 text-sm mt-1">
                    Solved 500+ problems on various platforms such as LeetCode focusing on Data Structures, Algorithms, and problem-solving techniques.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Counters Grid */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 mt-20 pt-12 border-t border-white/5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center p-4 rounded-2xl bg-white/[0.01] border border-white/5 backdrop-blur-md"
          >
            <div className="text-3xl md:text-5xl font-extrabold text-primary mb-1">
              <Counter value="10" suffix="+" />
            </div>
            <div className="text-xs md:text-sm text-foreground/60 uppercase tracking-widest font-semibold mt-1">Projects</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center p-4 rounded-2xl bg-white/[0.01] border border-white/5 backdrop-blur-md"
          >
            <div className="text-3xl md:text-5xl font-extrabold text-accent-purple mb-1">
              <Counter value="500" suffix="+" />
            </div>
            <div className="text-xs md:text-sm text-foreground/60 uppercase tracking-widest font-semibold mt-1">DSA Problems</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center p-4 rounded-2xl bg-white/[0.01] border border-white/5 backdrop-blur-md"
          >
            <div className="text-3xl md:text-5xl font-extrabold text-accent-blue mb-1">
              <Counter value="7.8" isFloat={true} />
            </div>
            <div className="text-xs md:text-sm text-foreground/60 uppercase tracking-widest font-semibold mt-1">B.Tech CGPA</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
