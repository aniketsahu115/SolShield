export default function FooterCTA() {
  return (
    <section className="py-12 bg-gradient-to-br from-primary/30 to-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Shield Your Solana Transactions?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Start using SolShield today to protect yourself from sandwich attacks and trade with confidence.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="#detect" className="px-6 py-3 bg-primary hover:bg-opacity-90 text-white font-medium rounded-lg transition">
              Try Detection Tool
            </a>
            <a href="#" className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition">
              Join Our Community
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
