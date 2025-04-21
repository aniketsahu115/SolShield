import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LearnSection from "@/components/sections/LearnSection";

export default function LearnPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Header />
      <main className="flex-grow">
        <div className="pt-16 pb-8 container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2 text-center">
            <span className="text-primary">Learn</span> About Sandwich Attacks
          </h1>
          <p className="text-gray-300 text-center mb-8 max-w-2xl mx-auto">
            Understand how sandwich attacks work on Solana, their impact on traders, and how to protect your transactions.
          </p>
        </div>
        <LearnSection />
      </main>
      <Footer />
    </div>
  );
}