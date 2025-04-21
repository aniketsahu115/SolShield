import { Link } from "wouter";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FooterCTA from "@/components/layout/FooterCTA";
import Hero from "@/components/sections/Hero";
import { Button } from "@/components/ui/button";
import { FaShieldAlt, FaBook, FaSearch, FaCode, FaInfoCircle } from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Header />
      <main className="flex-grow">
        <Hero />
        
        {/* Main Features Section */}
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Protect Your Solana Transactions with <span className="text-primary">SolShield</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {/* Learn Card */}
              <div className="bg-gray-800 rounded-xl p-6 transition transform hover:translate-y-[-5px] hover:shadow-xl flex flex-col">
                <div className="h-12 w-12 bg-blue-900 rounded-lg flex items-center justify-center mb-5">
                  <FaBook className="text-blue-400 text-xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Learn</h3>
                <p className="text-gray-400 mb-4 flex-grow">
                  Understand how sandwich attacks work and why they're dangerous for Solana traders.
                </p>
                <Link href="/learn">
                  <Button className="w-full">
                    Explore Learning Center
                  </Button>
                </Link>
              </div>
              
              {/* Detect Card */}
              <div className="bg-gray-800 rounded-xl p-6 transition transform hover:translate-y-[-5px] hover:shadow-xl flex flex-col">
                <div className="h-12 w-12 bg-red-900 rounded-lg flex items-center justify-center mb-5">
                  <FaSearch className="text-red-400 text-xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Detect</h3>
                <p className="text-gray-400 mb-4 flex-grow">
                  Analyze your transactions for sandwich attacks and get protection recommendations.
                </p>
                <Link href="/detect">
                  <Button className="w-full">
                    Analyze Transactions
                  </Button>
                </Link>
              </div>
              
              {/* Develop Card */}
              <div className="bg-gray-800 rounded-xl p-6 transition transform hover:translate-y-[-5px] hover:shadow-xl flex flex-col">
                <div className="h-12 w-12 bg-green-900 rounded-lg flex items-center justify-center mb-5">
                  <FaCode className="text-green-400 text-xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Develop</h3>
                <p className="text-gray-400 mb-4 flex-grow">
                  Build sandwich-resistant DeFi applications with our developer tools and resources.
                </p>
                <Link href="/develop">
                  <Button className="w-full">
                    Developer Resources
                  </Button>
                </Link>
              </div>
              
              {/* Resources Card */}
              <div className="bg-gray-800 rounded-xl p-6 transition transform hover:translate-y-[-5px] hover:shadow-xl flex flex-col">
                <div className="h-12 w-12 bg-purple-900 rounded-lg flex items-center justify-center mb-5">
                  <FaInfoCircle className="text-purple-400 text-xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Resources</h3>
                <p className="text-gray-400 mb-4 flex-grow">
                  Explore additional tools, FAQs, and resources to protect your Solana investments.
                </p>
                <Link href="/resources">
                  <Button className="w-full">
                    View Resources
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="py-12 bg-gradient-to-b from-gray-800 to-gray-900">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary">$2.8M+</p>
                <p className="text-sm text-gray-400 mt-2">Lost to sandwich attacks on Solana in 2024</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary">15,000+</p>
                <p className="text-sm text-gray-400 mt-2">Transactions analyzed</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary">93%</p>
                <p className="text-sm text-gray-400 mt-2">Detection accuracy</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary">50+</p>
                <p className="text-sm text-gray-400 mt-2">Developer integrations</p>
              </div>
            </div>
          </div>
        </section>
        
        <FooterCTA />
      </main>
      <Footer />
    </div>
  );
}
