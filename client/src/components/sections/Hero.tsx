export default function Hero() {
  return (
    <section className="py-12 md:py-24 bg-gradient-to-br from-gray-900 to-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Protect Your Solana Transactions from 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400"> Sandwich Attacks</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            SolShield helps you detect, prevent, and understand sandwich attacks to keep your assets safe in the Solana ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="#detect" className="px-6 py-3 bg-primary hover:bg-opacity-90 text-white font-medium rounded-lg transition">
              Try Our Detection Tool
            </a>
            <a href="#learn" className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition">
              Learn About Sandwich Attacks
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
