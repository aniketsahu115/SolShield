import { FaFileCode, FaCheck, FaArrowRight } from "react-icons/fa";

export default function DeveloperSection() {
  return (
    <section id="develop" className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Developer <span className="text-green-400">Resources</span></h2>
          <p className="text-gray-300 text-center mb-12">Build sandwich attack-resistant DeFi applications with our code templates and best practices</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Protection Strategies Card */}
            <div className="bg-gray-800 rounded-xl overflow-hidden">
              <div className="px-5 py-4 bg-gray-900 border-b border-gray-700">
                <h3 className="text-lg font-medium">Protection Strategies</h3>
              </div>
              <div className="p-5">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="mt-1 mr-3 h-5 w-5 bg-green-400 bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaCheck className="text-green-400 text-xs" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Time-Weighted Average Price (TWAP)</h4>
                      <p className="text-xs text-gray-400 mt-1">Use time-weighted average prices instead of spot prices to reduce impact of momentary price manipulations.</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="mt-1 mr-3 h-5 w-5 bg-green-400 bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaCheck className="text-green-400 text-xs" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Private Transactions / Private Mempools</h4>
                      <p className="text-xs text-gray-400 mt-1">Implement or connect to private transaction pools to prevent front-running by hiding pending transactions.</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="mt-1 mr-3 h-5 w-5 bg-green-400 bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaCheck className="text-green-400 text-xs" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Batch Auctions</h4>
                      <p className="text-xs text-gray-400 mt-1">Process multiple transactions in batches with a uniform clearing price to eliminate ordering advantages.</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="mt-1 mr-3 h-5 w-5 bg-green-400 bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaCheck className="text-green-400 text-xs" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Commit-Reveal Schemes</h4>
                      <p className="text-xs text-gray-400 mt-1">Users commit to transactions with encrypted details, then reveal them for execution after the commit phase.</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="mt-1 mr-3 h-5 w-5 bg-green-400 bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaCheck className="text-green-400 text-xs" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Dynamic Slippage Protection</h4>
                      <p className="text-xs text-gray-400 mt-1">Implement smart slippage parameters that adjust based on liquidity and transaction size.</p>
                    </div>
                  </li>
                </ul>
                
                <a href="#" className="mt-6 inline-block text-sm text-primary hover:text-blue-400">
                  Read complete protection guide <FaArrowRight className="inline ml-1" />
                </a>
              </div>
            </div>
            
            {/* Code Template Card */}
            <div className="bg-gray-800 rounded-xl overflow-hidden">
              <div className="px-5 py-4 bg-gray-900 border-b border-gray-700">
                <h3 className="text-lg font-medium">Sample Code Templates</h3>
              </div>
              <div className="p-5">
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-2">Price Impact Protection</h4>
                  <div className="bg-gray-900 rounded-lg p-3 overflow-x-auto">
                    <pre className="text-xs font-mono text-gray-300"><code>{`// Anti-sandwich protection for token swaps
// Set maximum price impact and check for price manipulation

function executeProtectedSwap(
  poolAccount: PublicKey, 
  userAccount: PublicKey,
  amountIn: number,
  minAmountOut: number,
  maxPriceImpact: number = 1.5 // percentage
) {
  // Get reference price from oracle or TWAP
  const refPrice = await getPriceOracle(poolAccount);
  
  // Calculate expected output with reference price
  const expectedOut = calculateExpectedOutput(
    amountIn, 
    refPrice
  );
  
  // Verify price impact is within acceptable range
  const priceImpact = 100 * (1 - minAmountOut / expectedOut);
  
  if (priceImpact > maxPriceImpact) {
    throw new Error(
      \`Price impact too high: \${priceImpact.toFixed(2)}%\`
    );
  }
  
  // Execute the swap with protection
  return swap(
    poolAccount,
    userAccount,
    amountIn,
    minAmountOut
  );
}`}</code></pre>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-medium">Available Templates</h4>
                    <span className="text-xs text-gray-400">Rust / TypeScript</span>
                  </div>
                  
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a href="#" className="flex items-center text-blue-400 hover:text-primary">
                        <FaFileCode className="mr-2 text-gray-500" />
                        <span>TWAP Oracle Implementation</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-blue-400 hover:text-primary">
                        <FaFileCode className="mr-2 text-gray-500" />
                        <span>Commit-Reveal Transaction Pattern</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-blue-400 hover:text-primary">
                        <FaFileCode className="mr-2 text-gray-500" />
                        <span>Dynamic Slippage Calculation</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-blue-400 hover:text-primary">
                        <FaFileCode className="mr-2 text-gray-500" />
                        <span>Batch Processing Smart Contract</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Developer API Section */}
          <div className="bg-gray-800 rounded-xl overflow-hidden">
            <div className="px-6 py-4 bg-gray-900 border-b border-gray-700">
              <h3 className="text-lg font-medium">Sandwich Detection API</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-300 text-sm mb-6">
                Integrate our sandwich attack detection directly into your DeFi application with our simple REST API. Monitor transactions and warn users before they submit vulnerable trades.
              </p>
              
              <div className="bg-gray-900 rounded-lg mb-6">
                <div className="px-4 py-2 border-b border-gray-800 flex items-center">
                  <span className="text-sm font-medium">API Endpoint</span>
                  <span className="ml-2 px-2 py-0.5 text-xs bg-green-900 text-green-200 rounded">GET</span>
                </div>
                <div className="p-4">
                  <code className="text-sm font-mono text-gray-300 break-all">
                    https://api.solshield.io/v1/detect-sandwich?tx=YOUR_TX_SIGNATURE&network=mainnet
                  </code>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium mb-2">Sample Response</h4>
                  <div className="bg-gray-900 rounded-lg p-3 h-48 overflow-y-auto">
                    <pre className="text-xs font-mono text-gray-300"><code>{`{
  "result": {
    "isSandwich": true,
    "confidence": 0.87,
    "frontTx": "63xP5...2gT7",
    "targetTx": "96xG4...7hR9",
    "backTx": "72xB8...9nF1",
    "valueImpact": {
      "sol": 0.082,
      "usd": 3.28
    },
    "priceImpact": 1.4,
    "timeFrame": 0.88,
    "pool": "SOL/USDC (Raydium)",
    "attackerEstimatedProfit": {
      "sol": 0.069,
      "usd": 2.76
    }
  },
  "recommendations": [
    "Lower slippage tolerance to 0.5%",
    "Use Jupiter Aggregator with MEV protection",
    "Split large transactions"
  ]
}`}</code></pre>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Integration Example</h4>
                  <div className="bg-gray-900 rounded-lg p-3 h-48 overflow-y-auto">
                    <pre className="text-xs font-mono text-gray-300"><code>{`// React component with sandwich protection
import { useEffect, useState } from 'react';

function ProtectedSwapButton({ txSignature }) {
  const [riskAnalysis, setRiskAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Check for sandwich attack risk before finalizing
  async function checkSandwichRisk() {
    setIsLoading(true);
    try {
      const response = await fetch(
        \`https://api.solshield.io/v1/detect-sandwich?\` +
        \`tx=\${txSignature}&network=mainnet\`
      );
      const data = await response.json();
      setRiskAnalysis(data.result);
      
      // Warn user if risk is detected
      if (data.result.isSandwich && 
          data.result.confidence > 0.7) {
        return showRiskWarning(data.result);
      }
      
      // Proceed with transaction if safe
      return finalizeTransaction();
    } catch (error) {
      console.error("Error checking risk:", error);
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <button 
      onClick={checkSandwichRisk}
      disabled={isLoading}
    >
      {isLoading ? "Checking..." : "Swap Safely"}
    </button>
  );
}`}</code></pre>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <a href="#" className="inline-block bg-primary hover:bg-opacity-90 text-white px-4 py-2 rounded-lg font-medium text-sm transition">
                  Request API Access
                </a>
                <a href="#" className="inline-block ml-4 text-sm text-blue-400 hover:text-primary">
                  View API Documentation
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
