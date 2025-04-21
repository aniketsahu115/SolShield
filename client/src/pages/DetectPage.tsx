import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DetectionTool from "@/components/sections/DetectionTool";

export default function DetectPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Header />
      <main className="flex-grow">
        <div className="pt-16 pb-8 container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2 text-center">
            <span className="text-primary">Sandwich Attack</span> Detection Tool
          </h1>
          <p className="text-gray-300 text-center mb-8 max-w-2xl mx-auto">
            Analyze transactions and identify potential sandwich attacks on the Solana blockchain.
            Our tool checks for front-running and back-running transactions that may impact price execution.
          </p>
        </div>
        <DetectionTool />
      </main>
      <Footer />
    </div>
  );
}