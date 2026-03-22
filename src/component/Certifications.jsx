import React, { useState } from "react";

const certifications = [
  {
    title: "Career Essentials in GitHub",
    issuer: "LinkedIn Learning + GitHub",
    date: "Mar 2026",
    image: "/certificates/github.png",
  },
  {
    title: "Microsoft Azure AI Essentials",
    issuer: "Microsoft + LinkedIn",
    date: "Mar 2026",
    image: "/certificates/azure.png",
  },
  {
    title: "Software Engineering Job Simulation",
    issuer: "Forage",
    date: "Sep 2025",
    image: "/certificates/forage.png",
  },
];

const Certifications = () => {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section id="certifications" className="py-16">
      <h2 className="text-3xl font-bold text-center mb-10">
        Certifications
      </h2>

      {/* Grid */}
      <div className="grid md:grid-cols-3 gap-8 px-6">
        {certifications.map((cert, index) => (
          <div
            key={index}
            onClick={() => setSelectedCert(cert)}
            className="cursor-pointer rounded-xl overflow-hidden 
                       bg-white border border-gray-200
                       shadow-md hover:shadow-xl hover:scale-105 
                       transition duration-300"
          >
            {/* Image */}
            <div className="p-3 bg-gray-100">
              <img
                src={cert.image}
                alt={cert.title}
                className="w-full h-auto object-contain rounded-md"
              />
            </div>

            {/* Content */}
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold">
                {cert.title}
              </h3>

              <p className="text-blue-600 font-medium">
                {cert.issuer}
              </p>

              <p className="text-sm text-gray-500">
                {cert.date}
              </p>

              <span className="text-green-500 text-sm">
                ✔ Verified
              </span>

              <p className="text-xs text-gray-400 mt-1">
                Click to view
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm 
                     flex items-center justify-center z-50"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="relative max-w-4xl w-full mx-4 animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-2 right-2 bg-white 
                         rounded-full px-3 py-1 text-black shadow"
            >
              ✕
            </button>

            {/* Image */}
            <img
              src={selectedCert.image}
              alt={selectedCert.title}
              className="w-full rounded-lg"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Certifications;