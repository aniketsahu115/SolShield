import { FaArrowRight } from "react-icons/fa";

export default function ResourcesSection() {
  return (
    <section id="resources" className="py-16 bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Additional <span className="text-blue-400">Resources</span></h2>
          <p className="text-gray-300 text-center mb-12">Dive deeper into sandwich attacks, MEV, and Solana security</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Resource Card 1 */}
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg h-full flex flex-col">
              <div className="h-48 bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-primary opacity-50" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="p-5 flex-grow">
                <div className="flex mb-3">
                  <span className="text-xs font-medium bg-purple-900 text-purple-200 px-2 py-1 rounded">Tutorial</span>
                </div>
                <h3 className="font-semibold mb-2">Understanding MEV on Solana</h3>
                <p className="text-sm text-gray-400 mb-3">A comprehensive guide to Maximal Extractable Value on Solana and how it differs from Ethereum.</p>
                <a href="#" className="inline-block text-sm text-blue-400 hover:text-primary">Read More <FaArrowRight className="inline ml-1" /></a>
              </div>
            </div>
            
            {/* Resource Card 2 */}
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg h-full flex flex-col">
              <div className="h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-blue-400 opacity-50" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="p-5 flex-grow">
                <div className="flex mb-3">
                  <span className="text-xs font-medium bg-blue-900 text-blue-200 px-2 py-1 rounded">Research</span>
                </div>
                <h3 className="font-semibold mb-2">Analyzing Sandwich Attack Patterns</h3>
                <p className="text-sm text-gray-400 mb-3">Research findings on common sandwich attack patterns and the most targeted DEXs on Solana.</p>
                <a href="#" className="inline-block text-sm text-blue-400 hover:text-primary">Read More <FaArrowRight className="inline ml-1" /></a>
              </div>
            </div>
            
            {/* Resource Card 3 */}
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg h-full flex flex-col">
              <div className="h-48 bg-gradient-to-br from-green-500/20 to-blue-500/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-green-400 opacity-50" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="p-5 flex-grow">
                <div className="flex mb-3">
                  <span className="text-xs font-medium bg-green-900 text-green-200 px-2 py-1 rounded">Guide</span>
                </div>
                <h3 className="font-semibold mb-2">Best Practices for Solana DEX Users</h3>
                <p className="text-sm text-gray-400 mb-3">Security recommendations for traders using decentralized exchanges on Solana.</p>
                <a href="#" className="inline-block text-sm text-blue-400 hover:text-primary">Read More <FaArrowRight className="inline ml-1" /></a>
              </div>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="bg-gray-800 rounded-xl overflow-hidden">
            <div className="px-6 py-4 bg-gray-900 border-b border-gray-700">
              <h3 className="text-lg font-medium">Frequently Asked Questions</h3>
            </div>
            <div className="p-6">
              {/* FAQ Item 1 */}
              <div className="mb-5">
                <h4 className="font-medium mb-2">What exactly is a sandwich attack?</h4>
                <p className="text-sm text-gray-300">
                  A sandwich attack occurs when a malicious actor identifies a pending transaction in the mempool, then executes their own transactions immediately before and after the target transaction. By buying tokens before your transaction and selling immediately after, they can manipulate the price and extract value from your trade.
                </p>
              </div>
              
              {/* FAQ Item 2 */}
              <div className="mb-5">
                <h4 className="font-medium mb-2">Why are sandwich attacks common on Solana?</h4>
                <p className="text-sm text-gray-300">
                  Solana's high speed and low transaction fees make it economically viable to execute sandwich attacks even on smaller trades. The blockchain's architecture also allows for easy monitoring of the mempool, giving attackers visibility into pending transactions they can target.
                </p>
              </div>
              
              {/* FAQ Item 3 */}
              <div className="mb-5">
                <h4 className="font-medium mb-2">How can I tell if I've been sandwich attacked?</h4>
                <p className="text-sm text-gray-300">
                  Signs include receiving significantly fewer tokens than expected from a swap, unusual price movement during your transaction, and identical wallet addresses making similar trades immediately before and after yours. Our detection tool can help identify these patterns.
                </p>
              </div>
              
              {/* FAQ Item 4 */}
              <div className="mb-5">
                <h4 className="font-medium mb-2">Are all DEXs equally vulnerable to sandwich attacks?</h4>
                <p className="text-sm text-gray-300">
                  No. Some DEXs have implemented protective measures like batch auctions or private transaction pools. Others use adaptive fees to make sandwich attacks less profitable. Always research the security features of the DEX you're using.
                </p>
              </div>
              
              {/* FAQ Item 5 */}
              <div>
                <h4 className="font-medium mb-2">Can SolShield prevent sandwich attacks completely?</h4>
                <p className="text-sm text-gray-300">
                  While no solution can prevent 100% of attacks, SolShield provides tools to significantly reduce your risk. Our detection system, educational resources, and developer templates all work together to make sandwich attacks less profitable and more difficult to execute.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
