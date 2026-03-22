import { ThemeToggle } from "../component/ThemeToggle";
import { StarBackground } from "../component/StarBackground";
import { Navbar } from "../component/Navbar";
import { HeroSection } from "../component/HeroSection";
import { AboutSection } from "../component/AboutSection";
import { SkillsSection } from "../component/SkillsSection";
import  Certifications  from "../component/Certifications";
import { ProjectSection } from "../component/ProjectSection";
import { ContactSection } from "../component/ContactSection";
import { Footer } from "../component/Footer";
export const Home =() =>{
    return( 
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <ThemeToggle/>

        <StarBackground/>

        <Navbar/>

        <main>
            <HeroSection/>
            <AboutSection/>
            <SkillsSection/>
            <Certifications/>
            <ProjectSection/>
            <ContactSection/>
        </main>

        <Footer/>
        
    </div>
    );
}