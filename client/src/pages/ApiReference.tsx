import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CodeBlock } from "@/components/ui/code-block";

// Creating a simple Code Block component
const codeBlockStyles = {
  pre: "bg-gray-850 p-4 rounded-lg overflow-auto text-sm",
  code: "text-gray-100",
};

export default function ApiReferencePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-6 text-center">
          <span className="text-primary">API</span> Reference
        </h1>
        
        <div className="max-w-4xl mx-auto mt-10 bg-gray-800 rounded-xl p-8">
          <div className="prose prose-invert max-w-none">
            <h2>SolShield API Documentation</h2>
            <p>
              Our API allows developers to programmatically access SolShield's sandwich attack detection 
              capabilities. Use this reference to integrate our services into your applications.
            </p>
            
            <h3>Authentication</h3>
            <p>
              All API requests must include an API key as a header:
            </p>
            <pre className={codeBlockStyles.pre}>
              <code className={codeBlockStyles.code}>
{`X-API-Key: your_api_key_here`}
              </code>
            </pre>
            
            <h3>Base URL</h3>
            <p>All API requests should be made to the following base URL:</p>
            <pre className={codeBlockStyles.pre}>
              <code className={codeBlockStyles.code}>
{`https://api.solshield.io/v1`}
              </code>
            </pre>
            
            <h3>Endpoints</h3>
            
            <h4>Detect Sandwich Attack</h4>
            <p><strong>POST /detect-sandwich</strong></p>
            <p>Analyzes a transaction or wallet for potential sandwich attacks.</p>
            
            <h5>Request Body</h5>
            <pre className={codeBlockStyles.pre}>
              <code className={codeBlockStyles.code}>
{`{
  "transactionIdOrWallet": "7JnHPaELkiqsUVn1EGdkpQbJPRZCidthTqQLFojpvkQ6",
  "frontRunningDetection": true,
  "backRunningDetection": true,
  "priceImpactAnalysis": true,
  "rapidTradePatternRecognition": true,
  "timeWindow": 15,
  "priceImpactThreshold": "medium"
}`}
              </code>
            </pre>
            
            <h5>Response</h5>
            <pre className={codeBlockStyles.pre}>
              <code className={codeBlockStyles.code}>
{`{
  "result": {
    "isSandwich": true,
    "confidence": 0.87,
    "frontTx": "4sGjMW1GaDG6rYQZzC9gGd3mWy7nUYhJJpGFBFYrtyT6",
    "targetTx": "7JnHPaELkiqsUVn1EGdkpQbJPRZCidthTqQLFojpvkQ6",
    "backTx": "2vgvYvKzTCUK3Lmj7gJJuLmSNBiquGCUDeiW7DuGJBjW",
    "valueImpact": {
      "sol": 0.15,
      "usd": 12.45
    },
    "priceImpact": 1.2,
    "timeFrame": 2,
    "pool": "raydium-usdc-sol-pool",
    "attackerEstimatedProfit": {
      "sol": 0.12,
      "usd": 9.84
    }
  },
  "recommendations": [
    "Increase slippage tolerance to at least 1.5%",
    "Use a different DEX with higher liquidity",
    "Consider using private transaction relays"
  ]
}`}
              </code>
            </pre>
            
            <h4>Get Historical Analyses</h4>
            <p><strong>GET /analyses/{"{wallet}"}</strong></p>
            <p>Retrieves historical sandwich attack analyses for a specific wallet.</p>
            
            <h5>Response</h5>
            <pre className={codeBlockStyles.pre}>
              <code className={codeBlockStyles.code}>
{`{
  "analyses": [
    {
      "id": "analysis-1",
      "transactionId": "7JnHPaELkiqsUVn1EGdkpQbJPRZCidthTqQLFojpvkQ6",
      "timestamp": "2025-04-20T14:32:15Z",
      "result": {
        "isSandwich": true,
        "confidence": 0.87,
        ...
      }
    },
    ...
  ]
}`}
              </code>
            </pre>
            
            <h3>Rate Limits</h3>
            <p>
              Free tier: 50 requests per day<br />
              Pro tier: 1,000 requests per day<br />
              Enterprise tier: Custom limits
            </p>
            
            <h3>Error Codes</h3>
            <p>The API may return the following error codes:</p>
            <ul>
              <li><strong>400</strong> - Bad request (invalid parameters)</li>
              <li><strong>401</strong> - Unauthorized (invalid API key)</li>
              <li><strong>404</strong> - Resource not found</li>
              <li><strong>429</strong> - Too many requests (rate limit exceeded)</li>
              <li><strong>500</strong> - Internal server error</li>
            </ul>
            
            <h3>SDK Integration</h3>
            <p>
              For easier integration, we offer SDKs for JavaScript, Python, and Rust.
              Check our GitHub repository for the latest versions.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}