import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { FaShieldAlt } from "react-icons/fa";
import WalletConnect from "@/components/wallet/WalletConnect";
import { motion } from "framer-motion";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  
  // Track scroll position for changing header background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled 
          ? "bg-gray-900/95 backdrop-blur-md border-purple-900/20" 
          : "bg-gradient-to-r from-gray-900 via-purple-950 to-gray-900 border-purple-900/30"
      )}
    >
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">
        <motion.div 
          className="flex items-center mb-4 md:mb-0"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Link href="/">
            <a className="flex items-center">
              <div className="h-10 w-10 bg-gradient-to-br from-primary to-blue-500 rounded-lg flex items-center justify-center mr-3 shadow-lg shadow-primary/30">
                <FaShieldAlt className="text-white text-xl" />
              </div>
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200">SolShield</h1>
            </a>
          </Link>
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="ml-3 text-sm text-gray-400 hidden md:inline font-light"
          >
            Anti-Sandwich Attack Toolkit
          </motion.span>
        </motion.div>
        
        <button 
          onClick={toggleMenu}
          className="md:hidden absolute right-4 top-4 p-2 text-gray-400 hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className={cn("md:flex md:items-center md:space-x-4", isMenuOpen ? "block" : "hidden")}>
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 space-x-0 md:space-x-2 mb-4 md:mb-0">
              {[
                { path: "/learn", label: "Learn" },
                { path: "/detect", label: "Detect" },
                { path: "/develop", label: "Develop" },
                { path: "/resources", label: "Resources" },
                { path: "/dashboard", label: "Dashboard" }
              ].map((item, index) => (
                <motion.li
                  key={item.path}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * (index + 1) }}
                >
                  <Link href={item.path}>
                    <a 
                      className={cn(
                        "px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 block",
                        isActive(item.path) 
                          ? "bg-gradient-to-r from-primary/80 to-blue-600/80 text-white shadow-md shadow-primary/20" 
                          : "hover:bg-gray-800/80 hover:text-white text-gray-300"
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
          
          <motion.div 
            className="mt-4 md:mt-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <WalletConnect />
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
