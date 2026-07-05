import { useEffect, useState } from "react";
import { ThemeToggle } from "../component/ThemeToggle";
import { StarBackground } from "../component/StarBackground";
import { Navbar } from "../component/Navbar";
import { ScrollProgressBar } from "../component/ScrollProgressBar";
import { HeroSection } from "../component/HeroSection";
import { AboutSection } from "../component/AboutSection";
import { SkillsSection } from "../component/SkillsSection";
import Certifications from "../component/Certifications";
import { ProjectSection } from "../component/ProjectSection";
import { TimelineSection } from "../component/TimelineSection";
import { AchievementsSection } from "../component/AchievementsSection";
import { ContactSection } from "../component/ContactSection";
import { Footer } from "../component/Footer";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const onMouseEnter = () => setHidden(false);
    const onMouseLeave = () => setHidden(true);
    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);

    const handleLinkHoverEvents = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select'
      );
      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => setLinkHovered(true));
        el.addEventListener("mouseleave", () => setLinkHovered(false));
      });
    };

    const observer = new MutationObserver(handleLinkHoverEvents);
    observer.observe(document.body, { childList: true, subtree: true });
    handleLinkHoverEvents();

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      observer.disconnect();
    };
  }, []);

  if (hidden) return null;

  return (
    <>
      <div
        className="custom-cursor-dot max-lg:hidden"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          backgroundColor: linkHovered ? "#00d2ff" : "#a78bfa",
          transform: `translate(-50%, -50%) scale(${clicked ? 0.8 : 1})`,
        }}
      />
      <div
        className="custom-cursor-ring max-lg:hidden"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          borderColor: linkHovered ? "#00d2ff" : "rgba(167, 139, 250, 0.4)",
          backgroundColor: linkHovered ? "rgba(0, 210, 255, 0.08)" : "transparent",
          transform: `translate(-50%, -50%) scale(${linkHovered ? 1.4 : clicked ? 0.9 : 1})`,
        }}
      />
    </>
  );
};

export const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative selection:bg-primary/20">
      <CustomCursor />
      
      <ThemeToggle />
      <ScrollProgressBar />

      <StarBackground />

      <Navbar />

      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <Certifications />
        <ProjectSection />
        <TimelineSection />
        <AchievementsSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
};