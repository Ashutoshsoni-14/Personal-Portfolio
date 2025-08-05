import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPinHouse,
  Phone,
  Send,
  Twitter,
} from "lucide-react";
import React from "react";
import { cn } from "../lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "ThankYou for your message. I'Will get back to you soon",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "d6a489f9-c852-4028-a610-0f3de9fbb5d9");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());

    if (res.success) {
      console.log("Success", res);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Get In <span className="text-primary">Touch</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 mx-auto max-w-2xl">
          Have a project in mind or want to collaborate ? Feel free to reach
          out. I'm always open to discuss new oppotunities.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h3 className="font-semibold text-2xl mb-6">Contact Information</h3>
            <div className="space-y-6 justify-center">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Mail className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium"> Email</h4>
                  <a
                    href="mailto:ashutoshhh.14@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    ashutoshhh.14@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Phone className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium"> Phone</h4>
                  <a
                    href="tel:+916265758558"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    +91 (626) 5758-558
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <MapPinHouse className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium"> Location</h4>
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    Datia (MP) India
                  </a>
                </div>
              </div>
            </div>
            <div className="pt-8">
              <h4 className="font-medium mb-4">Connect With Me</h4>
              <div className="flex space-x-4 justify-center">
                <a href="https://www.linkedin.com/in/ashutosh-soni-31964b284/" target="_blank">
                  <Linkedin size={30} />
                </a>
                <a href="https://www.instagram.com/ur_ashutosh_/" target="_blank">
                  <Instagram size={30} />
                </a>
                <a href="https://x.com/Ashutosh_147" target="_blank">
                  <Twitter size={30} />
                </a>
                <a href="#" target="_blank">
                  <Facebook size={30} />
                </a>
              </div>
            </div>
          </div>
          <div
            className="bg-card p-8 rounded-lg shadow-xs"
            onSubmit={handleSubmit}
          >
            <h3 className="mb-6 text-2xl font-semibold">Send a Message</h3>
            <form className="space-y-6" onSubmit={onSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="blaock text-sm font-medium mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary"
                  placeholder="Ashutosh soni.."
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="blaock text-sm font-medium mb-2"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary"
                  placeholder="hello123@gmail.com"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="blaock text-sm font-medium mb-2"
                >
                  Your Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  required
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Hello I'd like to talk about..."
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full cosmic-button flex items-center justify-center gap-2"
                )}
              >
                {isSubmitting? "Sending":"Send a Message"}
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
