import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FooterCTA from "@/components/layout/FooterCTA";
import Hero from "@/components/sections/Hero";
import LearnSection from "@/components/sections/LearnSection";
import DetectionTool from "@/components/sections/DetectionTool";
import DeveloperSection from "@/components/sections/DeveloperSection";
import ResourcesSection from "@/components/sections/ResourcesSection";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Header />
      <main className="flex-grow">
        <Hero />
        <LearnSection />
        <DetectionTool />
        <DeveloperSection />
        <ResourcesSection />
        <FooterCTA />
      </main>
      <Footer />
    </div>
  );
}
