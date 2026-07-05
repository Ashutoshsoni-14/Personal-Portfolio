import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Award, Calendar, CheckCircle2, Eye, X } from "lucide-react";

const certifications = [
  {
    title: "Career Essentials in GitHub",
    issuer: "LinkedIn Learning + GitHub",
    date: "Mar 2026",
    image: "/certificates/github.png",
    color: "border-purple-500/20 hover:border-purple-500/40 hover:shadow-purple-500/5",
  },
  {
    title: "Microsoft Azure AI Essentials",
    issuer: "Microsoft + LinkedIn",
    date: "Mar 2026",
    image: "/certificates/azure.png",
    color: "border-blue-500/20 hover:border-blue-500/40 hover:shadow-blue-500/5",
  },
  {
    title: "Software Engineering Job Simulation",
    issuer: "Forage",
    date: "Sep 2025",
    image: "/certificates/forage.png",
    color: "border-emerald-500/20 hover:border-emerald-500/40 hover:shadow-emerald-500/5",
  },
];

const Certifications = () => {
  const [selectedCert, setSelectedCert] = useState(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="certifications" className="py-32 px-4 relative overflow-hidden" ref={containerRef}>
      {/* Background Glow */}
      <div className="absolute bottom-[10%] left-[-10%] w-[350px] h-[350px] rounded-full bg-accent-blue/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-center">
            Certifications
          </h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-foreground/60 max-w-xl mx-auto text-lg text-center">
            Professional milestones and skill verifications from reputable educational programs.
          </p>
        </motion.div>

        {/* Responsive Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedCert(cert)}
              className={`group cursor-pointer rounded-2xl overflow-hidden bg-white/[0.01] border backdrop-blur-md transition-all duration-300 flex flex-col justify-between shadow-2xl relative ${cert.color}`}
            >
              {/* Image Preview Container */}
              <div className="p-4 bg-white/[0.02] border-b border-white/5 relative overflow-hidden aspect-[4/3] flex items-center justify-center">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-contain rounded-lg transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* View Overlay on Hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                  <div className="p-3 bg-primary rounded-full text-white shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <Eye size={20} />
                  </div>
                </div>
              </div>

              {/* Content Description */}
              <div className="p-6 text-left flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-primary transition-colors line-clamp-2">
                    {cert.title}
                  </h3>

                  <p className="text-primary font-semibold text-sm mt-1.5 flex items-center gap-1.5">
                    <Award size={14} />
                    <span>{cert.issuer}</span>
                  </p>
                </div>

                <div className="border-t border-white/5 mt-6 pt-4 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-foreground/50">
                    <Calendar size={12} />
                    <span>{cert.date}</span>
                  </div>

                  <span className="flex items-center gap-1 text-xs text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                    <CheckCircle2 size={10} />
                    Verified
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal - Certificate Viewer */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative max-w-4xl w-full bg-card rounded-2xl border border-white/10 overflow-hidden shadow-2xl p-2"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header inside modal */}
              <div className="flex items-center justify-between p-4 border-b border-white/5 bg-white/[0.01]">
                <div className="text-left">
                  <h3 className="text-lg font-bold text-white leading-snug">{selectedCert.title}</h3>
                  <p className="text-xs text-foreground/50">{selectedCert.issuer} • {selectedCert.date}</p>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded-full text-foreground transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>

              {/* High-res Image */}
              <div className="p-3 bg-neutral-900/50 flex items-center justify-center overflow-auto max-h-[75vh]">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="w-full h-auto max-h-[70vh] object-contain rounded-lg shadow-inner"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certifications;