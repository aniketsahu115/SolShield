import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ResourcesSection from "@/components/sections/ResourcesSection";

export default function ResourcesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Header />
      <main className="flex-grow">
        <div className="pt-16 pb-8 container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2 text-center">
            <span className="text-primary">Resources</span> & FAQs
          </h1>
          <p className="text-gray-300 text-center mb-8 max-w-2xl mx-auto">
            Find additional resources, answers to frequently asked questions, and guidance
            on protecting your transactions from sandwich attacks.
          </p>
        </div>
        <ResourcesSection />
      </main>
      <Footer />
    </div>
  );
}