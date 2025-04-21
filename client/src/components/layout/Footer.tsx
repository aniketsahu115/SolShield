import { Link } from "wouter";
import { FaShieldAlt, FaTwitter, FaDiscord, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center mr-2">
                <FaShieldAlt className="text-white" />
              </div>
              <h3 className="text-lg font-semibold">SolShield</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Protecting Solana users from sandwich attacks with detection tools, education, and developer resources.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaTwitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaDiscord />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaGithub />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold uppercase text-gray-400 mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">API Reference</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Developer Guides</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Security Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold uppercase text-gray-400 mb-4">Community</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Discord Server</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Twitter</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">GitHub</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Support</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold uppercase text-gray-400 mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Disclaimer</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} SolShield. All rights reserved. Not affiliated with Solana Foundation.
          </p>
        </div>
      </div>
    </footer>
  );
}
