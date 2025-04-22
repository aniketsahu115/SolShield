import { Link } from "wouter";
import { FaShieldAlt, FaTwitter, FaDiscord, FaGithub, FaArrowUp } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Define types for the footer links
interface FooterLink {
  label: string;
  path: string;
  external: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  
  const footerItems = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const footerItem = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <footer className="relative pt-16 pb-8 bg-gradient-to-b from-gray-900 via-purple-950/20 to-black border-t border-purple-900/20">
      {/* Decorative elements */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-transparent to-purple-900/5 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          variants={footerItems}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={footerItem}>
            <Link href="/">
              <a className="flex items-center mb-4 group">
                <div className="h-9 w-9 bg-gradient-to-br from-primary to-blue-500 rounded-lg flex items-center justify-center mr-2 shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-300">
                  <FaShieldAlt className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200">SolShield</h3>
              </a>
            </Link>
            <p className="text-sm text-gray-400 mb-4 max-w-xs">
              Protecting Solana users from sandwich attacks with detection tools, education, and developer resources.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: <FaTwitter />, url: "https://twitter.com" },
                { icon: <FaDiscord />, url: "https://discord.com" },
                { icon: <FaGithub />, url: "https://github.com/aniketsahu115/SolShield" }
              ].map((social, index) => (
                <motion.a 
                  key={index}
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-primary transition-colors duration-300 h-8 w-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          {[
            {
              title: "Resources",
              links: [
                { label: "Documentation", path: "/documentation", external: false },
                { label: "API Reference", path: "/api-reference", external: false },
                { label: "Developer Guides", path: "/develop", external: false },
                { label: "Security Blog", path: "/resources", external: false }
              ]
            },
            {
              title: "Community",
              links: [
                { label: "Discord Server", path: "https://discord.com", external: true },
                { label: "Twitter", path: "https://twitter.com", external: true },
                { label: "GitHub", path: "https://github.com", external: true },
                { label: "Support", path: "mailto:support@solshield.io", external: true }
              ]
            },
            {
              title: "Legal",
              links: [
                { label: "Terms of Service", path: "/terms", external: false },
                { label: "Privacy Policy", path: "/privacy", external: false },
                { label: "Disclaimer", path: "/terms#disclaimer", external: false }
              ]
            }
          ].map((section, sectionIndex) => (
            <motion.div key={section.title} variants={footerItem}>
              <h4 className="text-sm font-semibold uppercase text-purple-300 mb-4">{section.title}</h4>
              <ul className="space-y-2 text-sm">
                {section.links.map((link, linkIndex) => (
                  <motion.li 
                    key={link.label}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {link.external ? (
                      <a 
                        href={link.path} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.path}>
                        <a className="text-gray-400 hover:text-white transition-colors duration-200">
                          {link.label}
                        </a>
                      </Link>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-12 pt-6 border-t border-purple-900/30 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} SolShield. All rights reserved. Not affiliated with Solana Foundation.
          </p>
        </motion.div>
      </div>
      
      {/* Scroll to top button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 h-10 w-10 bg-gradient-to-br from-primary to-blue-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-primary/20 z-50"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: showScrollTop ? 1 : 0, 
          scale: showScrollTop ? 1 : 0.5,
          y: showScrollTop ? 0 : 20 
        }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaArrowUp />
      </motion.button>
    </footer>
  );
}
