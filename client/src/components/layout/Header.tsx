import { useState } from "react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { FaShieldAlt } from "react-icons/fa";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gray-900 border-b border-gray-800">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="flex items-center">
            <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center mr-3">
              <FaShieldAlt className="text-white text-xl" />
            </div>
            <h1 className="text-2xl font-semibold text-white">SolShield</h1>
          </div>
          <span className="ml-3 text-sm text-gray-400 hidden md:inline">Anti-Sandwich Attack Toolkit</span>
        </div>
        
        <button 
          onClick={toggleMenu}
          className="md:hidden absolute right-4 top-4 p-2 text-gray-400 hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <nav className={cn("md:block", isMenuOpen ? "block" : "hidden")}>
          <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 space-x-0 md:space-x-4">
            <li>
              <a 
                href="#learn" 
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition block"
                onClick={() => setIsMenuOpen(false)}
              >
                Learn
              </a>
            </li>
            <li>
              <a 
                href="#detect" 
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition block"
                onClick={() => setIsMenuOpen(false)}
              >
                Detect
              </a>
            </li>
            <li>
              <a 
                href="#develop" 
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition block"
                onClick={() => setIsMenuOpen(false)}
              >
                Develop
              </a>
            </li>
            <li>
              <a 
                href="#resources" 
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition block"
                onClick={() => setIsMenuOpen(false)}
              >
                Resources
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
