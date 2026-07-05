import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPinHouse,
  Phone,
  Send,
  Twitter,
  Copy,
  Check,
} from "lucide-react";
import React, { useRef } from "react";
import { cn } from "../lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { motion, useInView } from "framer-motion";

export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("ashutoshhh.14@gmail.com");
    setCopiedEmail(true);
    toast({
      title: "Copied to clipboard!",
      description: "Email address ashutoshhh.14@gmail.com was copied successfully.",
    });
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I will get back to you soon.",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.target);

    formData.append("access_key", "d6a489f9-c852-4028-a610-0f3de9fbb5d9");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      }).then((res) => res.json());

      if (res.success) {
        toast({
          title: "Message sent!",
          description: "Thank you for your message. I will get back to you soon.",
        });
        event.target.reset();
      } else {
        toast({
          variant: "destructive",
          title: "Submission failed",
          description: "Something went wrong. Please try again later.",
        });
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Network error",
        description: "Failed to send message. Please check your connection.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 px-4 relative overflow-hidden" ref={containerRef}>
      {/* Decorative Glows */}
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-primary/10 blur-[130px] pointer-events-none animate-pulse-subtle" />
      <div className="absolute bottom-[20%] right-[-10%] w-[350px] h-[350px] rounded-full bg-accent-purple/10 blur-[130px] pointer-events-none animate-pulse-subtle" style={{ animationDelay: "2s" }} />

      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-center">
            Get In <span className="bg-gradient-to-r from-primary to-[#a78bfa] bg-clip-text text-transparent">Touch</span>
          </h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-foreground/60 max-w-2xl mx-auto text-lg text-center">
            Have a project in mind or want to collaborate? Feel free to reach out. I'm always open to discuss new opportunities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 space-y-8 text-left"
          >
            <h3 className="font-bold text-2xl text-foreground tracking-tight">Contact Information</h3>
            
            <div className="space-y-6">
              {/* Email Card */}
              <div className="p-5 rounded-2xl bg-black/[0.01] dark:bg-white/[0.01] border border-black/5 dark:border-white/5 backdrop-blur-md hover:border-primary/20 transition-all duration-300 flex items-start gap-4 group">
                <div className="p-3.5 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-grow">
                  <h4 className="font-bold text-foreground text-sm">Email</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <a
                      href="mailto:ashutoshhh.14@gmail.com"
                      className="text-foreground/75 hover:text-primary transition-colors text-sm break-all font-medium"
                    >
                      ashutoshhh.14@gmail.com
                    </a>
                    <button
                      onClick={handleCopyEmail}
                      className="p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10 text-foreground/40 hover:text-foreground transition-colors cursor-pointer"
                      title="Copy Email"
                    >
                      {copiedEmail ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Phone Card */}
              <div className="p-5 rounded-2xl bg-black/[0.01] dark:bg-white/[0.01] border border-black/5 dark:border-white/5 backdrop-blur-md hover:border-accent-purple/20 transition-all duration-300 flex items-start gap-4 group">
                <div className="p-3.5 rounded-xl bg-accent-purple/10 text-accent-purple group-hover:scale-110 transition-transform duration-300">
                  <Phone className="h-5 w-5 text-accent-purple" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm">Phone</h4>
                  <a
                    href="tel:+916265758558"
                    className="text-foreground/75 hover:text-accent-purple transition-colors text-sm mt-1 block font-medium"
                  >
                    +91 (626) 5758-558
                  </a>
                </div>
              </div>

              {/* Location Card */}
              <div className="p-5 rounded-2xl bg-black/[0.01] dark:bg-white/[0.01] border border-black/5 dark:border-white/5 backdrop-blur-md hover:border-accent-blue/20 transition-all duration-300 flex items-start gap-4 group">
                <div className="p-3.5 rounded-xl bg-accent-blue/10 text-accent-blue group-hover:scale-110 transition-transform duration-300">
                  <MapPinHouse className="h-5 w-5 text-accent-blue" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm">Location</h4>
                  <span className="text-foreground/75 text-sm mt-1 block font-medium">
                    Datia (MP) India
                  </span>
                </div>
              </div>
            </div>

            {/* Socials Connection */}
            <div className="pt-4">
              <h4 className="font-bold text-foreground text-base mb-4">Connect With Me</h4>
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: Linkedin, link: "https://www.linkedin.com/in/ashutosh-soni-31964b284/", color: "hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5]" },
                  { icon: Instagram, link: "https://www.instagram.com/__ashhutoshh/", color: "hover:bg-[#e1306c] hover:text-white hover:border-[#e1306c]" },
                  { icon: Twitter, link: "https://x.com/Ashutosh_147", color: "hover:bg-[#1da1f2] hover:text-white hover:border-[#1da1f2]" },
                  { icon: Facebook, link: "#", color: "hover:bg-[#1877f2] hover:text-white hover:border-[#1877f2]" },
                ].map((social, idx) => (
                  <a
                    key={social.link + idx}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-foreground/70 transition-all duration-300 hover:scale-110 flex items-center justify-center",
                      social.color
                    )}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
                
                {/* LeetCode Special Icon */}
                <a
                  href="https://leetcode.com/u/Ashutosh_soni14/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-foreground/70 transition-all duration-300 hover:scale-110 hover:bg-[#ffa116] dark:hover:bg-[#ffa116] hover:text-black dark:hover:text-black hover:border-[#ffa116] dark:hover:border-[#ffa116] flex items-center justify-center group"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png"
                    width="20"
                    height="20"
                    alt="LeetCode logo"
                    className="dark:invert group-hover:invert-0 transition-all duration-300"
                  />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-7 bg-black/[0.01] dark:bg-white/[0.01] border border-black/5 dark:border-white/5 rounded-3xl p-8 backdrop-blur-md shadow-2xl relative"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full pointer-events-none" />
            
            <h3 className="mb-6 text-2xl font-bold text-foreground text-left tracking-tight">Send a Message</h3>
            
            <form className="space-y-5 text-left" onSubmit={onSubmit}>
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-semibold text-foreground/80 tracking-wide"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="w-full px-4 py-3.5 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] focus:bg-black/[0.04] dark:focus:bg-white/[0.04] text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-foreground/35"
                  placeholder="Ashutosh Soni"
                />
              </div>
              
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-foreground/80 tracking-wide"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="w-full px-4 py-3.5 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] focus:bg-black/[0.04] dark:focus:bg-white/[0.04] text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-foreground/35"
                  placeholder="hello@example.com"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-semibold text-foreground/80 tracking-wide"
                >
                  Your Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  required
                  rows={4}
                  className="w-full px-4 py-3.5 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] focus:bg-black/[0.04] dark:focus:bg-white/[0.04] text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none placeholder:text-foreground/35"
                  placeholder="Hello, I'd love to collaborate on..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full cosmic-button flex items-center justify-center gap-2 font-bold cursor-pointer mt-4 py-3 text-base"
                )}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
