import { motion } from "framer-motion";
import { Link } from "wouter";
import { FaShieldAlt, FaLock, FaSearch, FaChartLine } from "react-icons/fa";

// Animated background with particles
const AnimatedBackground = () => {
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    size: Math.random() * 4 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 15 + 10
  }));
  
  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary opacity-10"
          style={{
            height: particle.size,
            width: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: ["0%", "100%"],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900" />
    </div>
  );
};

// Animated sandwich attack visualization
const SandwichAttackAnimation = () => {
  return (
    <motion.div 
      className="mt-16 mb-8 relative h-40 md:h-52 w-full max-w-3xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.5 }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-1 bg-gray-700 relative">
          <motion.div 
            className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-red-500 flex items-center justify-center shadow-lg shadow-red-500/40"
            initial={{ x: "10%" }}
            animate={{ x: "90%" }}
            transition={{ duration: 4, delay: 1, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          >
            <FaLock className="text-white text-xs" />
          </motion.div>
          
          <motion.div 
            className="absolute -top-6 -left-4 w-12 h-12 rounded-full bg-green-500 shadow-lg shadow-green-500/40 flex items-center justify-center"
            initial={{ x: "45%" }}
            animate={{ 
              x: ["45%", "20%", "70%", "45%"],
            }}
            transition={{ 
              duration: 6,
              times: [0, 0.3, 0.7, 1],
              repeat: Infinity, 
              repeatType: "loop", 
              ease: "easeInOut",
              delay: 1
            }}
          >
            <FaShieldAlt className="text-white" />
          </motion.div>
          
          <motion.div 
            className="absolute -bottom-4 -left-4 w-8 h-8 rounded-full bg-amber-500 shadow-lg shadow-amber-500/40 flex items-center justify-center"
            initial={{ x: "80%" }}
            animate={{ x: "5%" }}
            transition={{ duration: 4, delay: 0.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          >
            <FaSearch className="text-white text-xs" />
          </motion.div>
          
          <motion.div 
            className="absolute -bottom-6 -left-4 w-12 h-12 rounded-full bg-primary shadow-lg shadow-primary/40 flex items-center justify-center"
            initial={{ x: "30%" }}
            animate={{ 
              x: ["30%", "75%", "20%", "30%"],
            }}
            transition={{ 
              duration: 5,
              times: [0, 0.4, 0.8, 1],
              repeat: Infinity, 
              repeatType: "loop", 
              ease: "easeInOut",
              delay: 1.5
            }}
          >
            <FaChartLine className="text-white" />
          </motion.div>
          
          {/* Highlights */}
          <motion.div 
            className="absolute top-0 left-0 h-1 w-0 bg-red-400 shadow-sm shadow-red-400"
            animate={{ width: ["0%", "20%", "0%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
          />
          
          <motion.div 
            className="absolute top-0 right-0 h-1 w-0 bg-primary shadow-sm shadow-primary"
            animate={{ width: ["0%", "30%", "0%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatDelay: 2, delay: 2 }}
          />
        </div>
      </div>
      
      {/* Labels */}
      <div className="absolute top-0 left-0 w-full">
        <motion.div 
          className="absolute top-[-42px] text-center px-4 py-1 bg-red-500/10 border border-red-500/30 rounded-lg text-xs font-medium text-white"
          style={{ left: "15%", transform: "translateX(-50%)" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          Front-running
        </motion.div>
        
        <motion.div 
          className="absolute top-[-42px] text-center px-4 py-1 bg-green-500/10 border border-green-500/30 rounded-lg text-xs font-medium text-white"
          style={{ left: "50%", transform: "translateX(-50%)" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
        >
          Your Protected Transaction
        </motion.div>
        
        <motion.div 
          className="absolute top-[-42px] text-center px-4 py-1 bg-amber-500/10 border border-amber-500/30 rounded-lg text-xs font-medium text-white"
          style={{ left: "85%", transform: "translateX(-50%)" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
        >
          Back-running
        </motion.div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full flex justify-center">
        <motion.div 
          className="text-sm text-gray-400 bg-gray-800/50 px-4 py-2 rounded-lg border border-gray-700"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
        >
          SolShield protects your transactions from sandwich attacks
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function Hero() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-purple-950/10 to-gray-900" />
      
      {/* Animated particles in background */}
      <AnimatedBackground />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="relative inline-block">
                Protect 
                <motion.span
                  className="absolute -bottom-1 left-0 w-full h-[3px] bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              </span>{" "}
              Your Solana Transactions from{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400 relative">
                Sandwich Attacks
                <motion.span
                  className="absolute -bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-primary to-blue-400"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                />
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-300 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              SolShield helps you detect, prevent, and understand sandwich attacks 
              to keep your assets safe in the Solana ecosystem.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <Link href="/detect">
                <motion.div 
                  className="px-6 py-3 bg-gradient-to-r from-primary to-blue-600 hover:from-primary hover:to-blue-500 text-white font-medium rounded-lg transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-primary/40 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Try Our Detection Tool
                </motion.div>
              </Link>
              <Link href="/learn">
                <motion.div 
                  className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-all duration-300 border border-purple-500/30 hover:border-purple-500/50 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn About Sandwich Attacks
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Sandwich attack animation visualization */}
          <SandwichAttackAnimation />
        </div>
      </div>
    </section>
  );
}
