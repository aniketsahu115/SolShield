import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function DocumentationPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-6 text-center">
          <span className="text-primary">SolShield</span> Documentation
        </h1>
        
        <div className="max-w-4xl mx-auto mt-10 bg-gray-800 rounded-xl p-8">
          <div className="prose prose-invert max-w-none">
            <h2>Getting Started with SolShield</h2>
            <p>
              SolShield is a comprehensive toolkit designed to help Solana users identify, 
              understand, and avoid sandwich attacks on the Solana blockchain. This documentation
              provides detailed information about our tools and services.
            </p>
            
            <h3>What is a Sandwich Attack?</h3>
            <p>
              Sandwich attacks occur when malicious actors place orders immediately before and after a pending transaction,
              exploiting the price impact of the target transaction to make a profit at the expense of the victim.
            </p>
            
            <h3>Using the Detection Tool</h3>
            <p>
              Our detection tool allows you to analyze transactions for signs of sandwich attacks:
            </p>
            <ol>
              <li>Enter a wallet address or transaction ID in the search field</li>
              <li>Configure detection parameters to match your needs</li>
              <li>Review the analysis results to see if a sandwich attack was detected</li>
              <li>Follow the provided recommendations to avoid future attacks</li>
            </ol>
            
            <h3>Transaction Analysis Parameters</h3>
            <p>
              <strong>Front-Running Detection:</strong> Analyzes transactions that occurred immediately before the target.
            </p>
            <p>
              <strong>Back-Running Detection:</strong> Analyzes transactions that occurred immediately after the target.
            </p>
            <p>
              <strong>Price Impact Analysis:</strong> Evaluates the price impact caused by surrounding transactions.
            </p>
            <p>
              <strong>Rapid Trade Pattern Recognition:</strong> Identifies suspicious trading patterns within a short timeframe.
            </p>
            
            <h3>API Reference</h3>
            <p>
              For developers interested in integrating SolShield's detection capabilities into their own applications,
              please refer to our API documentation in the Developer Resources section.
            </p>
            
            <h3>Support</h3>
            <p>
              If you need assistance or have questions about using SolShield, please reach out to our support
              team through our Discord community or contact form.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}