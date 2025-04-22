import { Link } from "wouter";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FooterCTA from "@/components/layout/FooterCTA";
import Hero from "@/components/sections/Hero";
import { Button } from "@/components/ui/button";
import { FaShieldAlt, FaBook, FaSearch, FaCode, FaInfoCircle, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/ui/page-transition";

// Feature card data
const featureCards = [
  {
    icon: <FaBook className="text-blue-400 text-xl" />,
    iconBg: "bg-blue-900",
    title: "Learn",
    description: "Understand how sandwich attacks work and why they're dangerous for Solana traders.",
    buttonText: "Explore Learning Center",
    href: "/learn",
    delay: 0.1
  },
  {
    icon: <FaSearch className="text-red-400 text-xl" />,
    iconBg: "bg-red-900",
    title: "Detect",
    description: "Analyze your transactions for sandwich attacks and get protection recommendations.",
    buttonText: "Analyze Transactions",
    href: "/detect",
    delay: 0.2
  },
  {
    icon: <FaCode className="text-green-400 text-xl" />,
    iconBg: "bg-green-900",
    title: "Develop",
    description: "Build sandwich-resistant DeFi applications with our developer tools and resources.",
    buttonText: "Developer Resources",
    href: "/develop",
    delay: 0.3
  },
  {
    icon: <FaInfoCircle className="text-purple-400 text-xl" />,
    iconBg: "bg-purple-900",
    title: "Resources",
    description: "Explore additional tools, FAQs, and resources to protect your Solana investments.",
    buttonText: "View Resources",
    href: "/resources",
    delay: 0.4
  }
];

// Stats data
const stats = [
  {
    value: "$2.8M+",
    label: "Lost to sandwich attacks on Solana in 2024",
    delay: 0.1
  },
  {
    value: "15,000+",
    label: "Transactions analyzed",
    delay: 0.2
  },
  {
    value: "93%",
    label: "Detection accuracy",
    delay: 0.3
  },
  {
    value: "50+",
    label: "Developer integrations",
    delay: 0.4
  }
];

export default function Home() {
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-gray-900">
        <Header />
        <main className="flex-grow">
          <Hero />
          
          {/* Main Features Section */}
          <section className="py-16 bg-gray-900">
            <div className="container mx-auto px-4">
              <motion.h2 
                className="text-3xl font-bold mb-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Protect Your Solana Transactions with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">SolShield</span>
              </motion.h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                {featureCards.map((card, index) => (
                  <motion.div
                    key={card.title}
                    className="bg-gray-800 rounded-xl p-6 flex flex-col border border-gray-700 hover:border-primary/30"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: card.delay }}
                    viewport={{ once: true, amount: 0.2 }}
                    whileHover={{ 
                      y: -5, 
                      boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.2)",
                      transition: { duration: 0.2 }
                    }}
                  >
                    <motion.div 
                      className={`h-12 w-12 ${card.iconBg} rounded-lg flex items-center justify-center mb-5`}
                      whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      {card.icon}
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                    <p className="text-gray-400 mb-4 flex-grow">
                      {card.description}
                    </p>
                    <Link href={card.href}>
                      <motion.div whileTap={{ scale: 0.97 }}>
                        <Button className="w-full group">
                          {card.buttonText}
                          <FaArrowRight className="ml-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
                        </Button>
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
          
          {/* Stats Section */}
          <section className="py-12 bg-gradient-to-b from-gray-800 to-gray-900">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <motion.div 
                    key={index} 
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: stat.delay }}
                    viewport={{ once: true, amount: 0.6 }}
                  >
                    <motion.p 
                      className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400"
                      initial={{ scale: 0.8 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: stat.delay + 0.2 }}
                      viewport={{ once: true }}
                    >
                      {stat.value}
                    </motion.p>
                    <p className="text-sm text-gray-400 mt-2">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
          
          <FooterCTA />
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
}
