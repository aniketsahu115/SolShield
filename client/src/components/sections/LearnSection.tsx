import { FaArrowRight, FaCheck } from "react-icons/fa";

export default function LearnSection() {
  return (
    <section id="learn" className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Understanding Sandwich Attacks <span className="text-green-400">on Solana</span></h2>
          
          <div className="bg-gray-800 rounded-xl p-6 mb-12">
            <h3 className="text-xl font-semibold mb-4">What is a Sandwich Attack?</h3>
            
            <div className="mb-8">
              <p className="text-gray-300 mb-4">
                A sandwich attack occurs when malicious actors exploit your pending transaction by placing their own transactions immediately before and after yours, effectively "sandwiching" your transaction.
              </p>
              
              {/* Sandwich Attack Diagram */}
              <div className="bg-gray-800 rounded-lg p-4 my-6">
                <h4 className="text-sm font-semibold text-gray-400 mb-3">HOW SANDWICH ATTACKS WORK</h4>
                <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
                  {/* Step 1 */}
                  <div className="flex-1 bg-gray-900 rounded-lg p-4 border-l-4 border-primary">
                    <div className="flex items-center mb-2">
                      <div className="h-8 w-8 bg-gray-800 rounded-full flex items-center justify-center mr-3">
                        <span className="text-primary font-medium">1</span>
                      </div>
                      <h5 className="font-semibold">Attacker Identifies Target</h5>
                    </div>
                    <p className="text-sm text-gray-400">
                      Attacker monitors the mempool for pending swap transactions
                    </p>
                  </div>
                  
                  <FaArrowRight className="text-gray-600 hidden md:block" />
                  
                  {/* Step 2 */}
                  <div className="flex-1 bg-gray-900 rounded-lg p-4 border-l-4 border-orange-500">
                    <div className="flex items-center mb-2">
                      <div className="h-8 w-8 bg-gray-800 rounded-full flex items-center justify-center mr-3">
                        <span className="text-orange-500 font-medium">2</span>
                      </div>
                      <h5 className="font-semibold">Front-Running</h5>
                    </div>
                    <p className="text-sm text-gray-400">
                      Attacker executes a buy order before yours, driving up the price
                    </p>
                  </div>
                  
                  <FaArrowRight className="text-gray-600 hidden md:block" />
                  
                  {/* Step 3 */}
                  <div className="flex-1 bg-gray-900 rounded-lg p-4 border-l-4 border-red-500">
                    <div className="flex items-center mb-2">
                      <div className="h-8 w-8 bg-gray-800 rounded-full flex items-center justify-center mr-3">
                        <span className="text-red-500 font-medium">3</span>
                      </div>
                      <h5 className="font-semibold">Back-Running</h5>
                    </div>
                    <p className="text-sm text-gray-400">
                      Attacker sells immediately after your transaction, profiting from the price difference
                    </p>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-300">
                The result: You receive fewer tokens than expected, and the attacker profits from the price movement they created.
              </p>
            </div>
          </div>

          {/* Why Solana is Affected */}
          <div className="bg-gray-800 rounded-xl p-6 mb-12">
            <h3 className="text-xl font-semibold mb-4">Why Solana is Vulnerable</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-900 rounded-lg p-5">
                <h4 className="font-medium text-blue-400 mb-3">High Speed, Low Fees</h4>
                <p className="text-gray-300 text-sm">
                  Solana's extremely fast transaction processing and low fees make it economically viable for attackers to execute sandwich attacks, even for smaller transactions.
                </p>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-5">
                <h4 className="font-medium text-blue-400 mb-3">Mempool Visibility</h4>
                <p className="text-gray-300 text-sm">
                  When transactions are broadcast to the network, they're visible in the mempool before being confirmed, giving attackers time to plan their strategy.
                </p>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-5">
                <h4 className="font-medium text-blue-400 mb-3">DEX Protocol Design</h4>
                <p className="text-gray-300 text-sm">
                  Many decentralized exchanges on Solana use automated market maker (AMM) designs that are susceptible to price manipulation through strategic ordering of transactions.
                </p>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-5">
                <h4 className="font-medium text-blue-400 mb-3">Slippage Tolerance</h4>
                <p className="text-gray-300 text-sm">
                  Default slippage settings on DEXs often allow enough price movement for sandwich attacks to be profitable without causing your transaction to fail.
                </p>
              </div>
            </div>
          </div>

          {/* How to Protect Yourself */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4">How to Protect Yourself</h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="mt-1 mr-4 h-6 w-6 bg-green-400 bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaCheck className="text-green-400 text-sm" />
                </div>
                <div>
                  <h4 className="font-medium">Use Lower Slippage Tolerance</h4>
                  <p className="text-gray-300 text-sm">Set slippage tolerance as low as possible for your trade. This makes it harder for attackers to profit from price manipulation.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mt-1 mr-4 h-6 w-6 bg-green-400 bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaCheck className="text-green-400 text-sm" />
                </div>
                <div>
                  <h4 className="font-medium">Trade During High Volume Periods</h4>
                  <p className="text-gray-300 text-sm">Higher volume means less price impact, making sandwich attacks less profitable and therefore less likely.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mt-1 mr-4 h-6 w-6 bg-green-400 bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaCheck className="text-green-400 text-sm" />
                </div>
                <div>
                  <h4 className="font-medium">Use DEXs with Anti-MEV Features</h4>
                  <p className="text-gray-300 text-sm">Some DEXs implement methods to prevent maximal extractable value (MEV) exploitation, including sandwich attacks.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mt-1 mr-4 h-6 w-6 bg-green-400 bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaCheck className="text-green-400 text-sm" />
                </div>
                <div>
                  <h4 className="font-medium">Split Large Trades</h4>
                  <p className="text-gray-300 text-sm">Break up large trades into smaller amounts to make them less attractive targets and reduce your price impact.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mt-1 mr-4 h-6 w-6 bg-green-400 bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaCheck className="text-green-400 text-sm" />
                </div>
                <div>
                  <h4 className="font-medium">Use SolShield's Detection Tool</h4>
                  <p className="text-gray-300 text-sm">Our tool can help you identify potential sandwich attacks before they affect your transactions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
