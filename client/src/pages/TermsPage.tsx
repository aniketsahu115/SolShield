import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-6 text-center">
          <span className="text-primary">Terms</span> of Service
        </h1>
        
        <div className="max-w-4xl mx-auto mt-10 bg-gray-800 rounded-xl p-8">
          <div className="prose prose-invert max-w-none">
            <h2>Terms of Service Agreement</h2>
            <p>
              Last Updated: April 21, 2025
            </p>
            <p>
              Please read these Terms of Service ("Terms") carefully before using the SolShield website and services 
              ("Service") operated by SolShield ("us", "we", or "our").
            </p>
            
            <h3>1. Acceptance of Terms</h3>
            <p>
              By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of the 
              Terms, you may not access the Service.
            </p>
            
            <h3>2. Description of Service</h3>
            <p>
              SolShield provides tools and resources to help users identify and avoid sandwich attacks on the Solana 
              blockchain. Our services include educational content, detection tools, and developer resources.
            </p>
            
            <h3>3. User Responsibilities</h3>
            <p>
              When using our Service, you agree to:
            </p>
            <ul>
              <li>Provide accurate information when using our tools</li>
              <li>Use the Service for lawful purposes only</li>
              <li>Not attempt to disrupt or compromise the security of our systems</li>
              <li>Not use our Service to engage in any malicious activity on blockchain networks</li>
            </ul>
            
            <h3>4. No Financial Advice</h3>
            <p>
              The information provided through SolShield is for educational and informational purposes only. We do not 
              provide financial, investment, or trading advice. Always conduct your own research before making any investment 
              decisions.
            </p>
            
            <h3>5. Technical Limitations</h3>
            <p>
              Our detection tools analyze on-chain data to identify potential sandwich attacks, but we cannot guarantee 
              that all attacks will be detected. The blockchain environment is constantly evolving, and new attack vectors 
              may emerge that our current detection methods do not address.
            </p>
            
            <h3>6. Intellectual Property</h3>
            <p>
              The content, features, and functionality of the Service are owned by SolShield and are protected by 
              international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>
            
            <h3>7. Limitation of Liability</h3>
            <p>
              To the maximum extent permitted by law, SolShield shall not be liable for any indirect, incidental, special, 
              consequential, or punitive damages, including lost profits, arising out of or relating to your use of our 
              Service, even if we have been advised of the possibility of such damages.
            </p>
            
            <h3>8. Changes to Terms</h3>
            <p>
              We reserve the right to modify these Terms at any time. We will provide notice of any significant changes by 
              updating the "Last Updated" date at the top of this page. Your continued use of the Service after any changes 
              to the Terms constitutes your acceptance of the new Terms.
            </p>
            
            <h3>9. Governing Law</h3>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which 
              SolShield operates, without regard to its conflict of law provisions.
            </p>
            
            <h3>10. Contact Us</h3>
            <p>
              If you have any questions about these Terms, please contact us at legal@solshield.io.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}