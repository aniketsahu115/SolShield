import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DeveloperSection from "@/components/sections/DeveloperSection";

export default function DevelopPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Header />
      <main className="flex-grow">
        <div className="pt-16 pb-8 container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2 text-center">
            <span className="text-primary">Developer</span> Resources
          </h1>
          <p className="text-gray-300 text-center mb-8 max-w-2xl mx-auto">
            Build sandwich-resistant applications with our open-source tools, code samples, and best practices for Solana developers.
          </p>
        </div>
        <DeveloperSection />
      </main>
      <Footer />
    </div>
  );
}