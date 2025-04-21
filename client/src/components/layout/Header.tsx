import { useState } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { FaShieldAlt } from "react-icons/fa";
import WalletConnect from "@/components/wallet/WalletConnect";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <Link href="/">
            <a className="flex items-center">
              <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center mr-3">
                <FaShieldAlt className="text-white text-xl" />
              </div>
              <h1 className="text-2xl font-semibold text-white">SolShield</h1>
            </a>
          </Link>
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

        <div className={cn("md:flex md:items-center md:space-x-4", isMenuOpen ? "block" : "hidden")}>
          <nav>
            <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 space-x-0 md:space-x-4 mb-4 md:mb-0">
              <li>
                <Link href="/learn">
                  <a 
                    className={cn(
                      "px-3 py-2 rounded-md text-sm font-medium transition block",
                      isActive("/learn") 
                        ? "bg-gray-700 text-white" 
                        : "hover:bg-gray-800 text-gray-300"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Learn
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/detect">
                  <a 
                    className={cn(
                      "px-3 py-2 rounded-md text-sm font-medium transition block",
                      isActive("/detect") 
                        ? "bg-gray-700 text-white" 
                        : "hover:bg-gray-800 text-gray-300"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Detect
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/develop">
                  <a 
                    className={cn(
                      "px-3 py-2 rounded-md text-sm font-medium transition block",
                      isActive("/develop") 
                        ? "bg-gray-700 text-white" 
                        : "hover:bg-gray-800 text-gray-300"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Develop
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/resources">
                  <a 
                    className={cn(
                      "px-3 py-2 rounded-md text-sm font-medium transition block",
                      isActive("/resources") 
                        ? "bg-gray-700 text-white" 
                        : "hover:bg-gray-800 text-gray-300"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Resources
                  </a>
                </Link>
              </li>
            </ul>
          </nav>
          
          <div className="mt-4 md:mt-0">
            <WalletConnect />
          </div>
        </div>
      </div>
    </header>
  );
}
