import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-6 text-center">
          <span className="text-primary">Privacy</span> Policy
        </h1>
        
        <div className="max-w-4xl mx-auto mt-10 bg-gray-800 rounded-xl p-8">
          <div className="prose prose-invert max-w-none">
            <h2>Privacy Policy</h2>
            <p>
              Last Updated: April 21, 2025
            </p>
            <p>
              This Privacy Policy explains how SolShield ("we", "us", or "our") collects, uses, and 
              shares information about you when you use our website and services ("Service").
            </p>
            
            <h3>1. Information We Collect</h3>
            <p>
              We collect the following types of information:
            </p>
            <ul>
              <li>
                <strong>Public Blockchain Data:</strong> When you use our detection tools, we analyze publicly available 
                blockchain data related to the wallet addresses or transaction IDs you provide.
              </li>
              <li>
                <strong>Usage Information:</strong> We collect information about how you interact with our Service, 
                including which features you use and how you access our website.
              </li>
              <li>
                <strong>Device Information:</strong> We may collect information about the device you use to access our 
                Service, such as your device type, operating system, and browser type.
              </li>
              <li>
                <strong>Cookies and Similar Technologies:</strong> We use cookies and similar tracking technologies to 
                track activity on our Service and hold certain information to improve your experience.
              </li>
            </ul>
            
            <h3>2. How We Use Your Information</h3>
            <p>
              We use the information we collect to:
            </p>
            <ul>
              <li>Provide, maintain, and improve our Service</li>
              <li>Detect and analyze potential sandwich attacks on the Solana blockchain</li>
              <li>Monitor usage patterns and improve user experience</li>
              <li>Protect against fraud and abuse</li>
              <li>Communicate with you about updates, security alerts, and support</li>
            </ul>
            
            <h3>3. Information Sharing</h3>
            <p>
              We do not sell your personal information. We may share your information in the following circumstances:
            </p>
            <ul>
              <li>With service providers who perform services on our behalf</li>
              <li>If required by law or legal process</li>
              <li>In connection with a merger, sale, or acquisition of all or part of our company</li>
              <li>When you have provided your consent</li>
            </ul>
            
            <h3>4. Data Security</h3>
            <p>
              We implement reasonable security measures to protect your information from unauthorized access, 
              alteration, disclosure, or destruction. However, no method of transmission over the internet or 
              electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
            
            <h3>5. Your Choices</h3>
            <p>
              You can control cookies through your browser settings. However, disabling cookies may limit your 
              ability to use some features of our Service.
            </p>
            
            <h3>6. Children's Privacy</h3>
            <p>
              Our Service is not intended for children under 13 years of age. We do not knowingly collect personal 
              information from children under 13. If you are a parent or guardian and believe we have collected 
              information from your child, please contact us.
            </p>
            
            <h3>7. Changes to this Privacy Policy</h3>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the 
              new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
            
            <h3>8. Contact Us</h3>
            <p>
              If you have any questions about this Privacy Policy, please contact us at privacy@solshield.io.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}