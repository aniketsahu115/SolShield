import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  FaInfoCircle, 
  FaExclamationTriangle, 
  FaLightbulb, 
  FaBookOpen, 
  FaArrowRight, 
  FaShieldAlt,
  FaExchangeAlt,
  FaUserShield,
  FaLayerGroup,
  FaCode,
  FaFileAlt,
  FaCheck,
  FaNetworkWired,
  FaCogs,
  FaDatabase,
  FaChartBar,
  FaServer
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CodeBlock } from "@/components/ui/code-block";

export default function LearnPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-6">
            <FaBookOpen className="text-primary mr-3 text-2xl" />
            <h1 className="text-3xl font-bold">Learning Center</h1>
          </div>
          
          <p className="text-lg text-gray-300 mb-8 max-w-3xl">
            Understand how sandwich attacks work on Solana, their impact on traders, and how to protect yourself
            from these sophisticated MEV (Maximal Extractable Value) extraction techniques.
          </p>
          
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-5 max-w-3xl">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
              <TabsTrigger value="faqs">FAQs</TabsTrigger>
              <TabsTrigger value="ecosystem">Solana Integration</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FaExclamationTriangle className="mr-2 text-amber-500" />
                      What is a Sandwich Attack?
                    </CardTitle>
                    <CardDescription>
                      Understanding the basics of this common MEV extraction
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>
                      A sandwich attack is a predatory trading strategy where attackers "sandwich" a victim's transaction 
                      between two of their own transactions to profit from price movements.
                    </p>
                    <div className="bg-gray-800 p-6 rounded-lg">
                      <h4 className="font-medium mb-4">The sandwich attack works in 3 steps:</h4>
                      <ol className="space-y-4">
                        <li className="flex">
                          <span className="bg-amber-900 text-amber-400 h-6 w-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">1</span>
                          <span>Front-run: Attacker sees your pending swap transaction and quickly buys the token before yours executes</span>
                        </li>
                        <li className="flex">
                          <span className="bg-amber-900 text-amber-400 h-6 w-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">2</span>
                          <span>Victim's transaction: Your swap executes at a worse price due to the attacker's front-run transaction</span>
                        </li>
                        <li className="flex">
                          <span className="bg-amber-900 text-amber-400 h-6 w-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">3</span>
                          <span>Back-run: Attacker sells the tokens immediately after your transaction, profiting from the price movement</span>
                        </li>
                      </ol>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FaExchangeAlt className="mr-2 text-blue-500" />
                      Why Solana is Vulnerable
                    </CardTitle>
                    <CardDescription>
                      Understanding attack vectors in Solana's architecture
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>
                      Solana's high throughput and low fee structure make it particularly susceptible to sandwich attacks:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <FaArrowRight className="mt-1 mr-2 text-primary" />
                        <span><strong>Mempool Visibility:</strong> Pending transactions in Solana's mempool can be visible to attackers, allowing them to spot profitable victim transactions</span>
                      </li>
                      <li className="flex items-start">
                        <FaArrowRight className="mt-1 mr-2 text-primary" />
                        <span><strong>Fast Confirmation:</strong> Solana's 400ms block time means attackers need sophisticated automation to execute sandwich attacks</span>
                      </li>
                      <li className="flex items-start">
                        <FaArrowRight className="mt-1 mr-2 text-primary" />
                        <span><strong>Low Transaction Fees:</strong> Make it economically viable to attempt sandwich attacks even with smaller potential profits</span>
                      </li>
                      <li className="flex items-start">
                        <FaArrowRight className="mt-1 mr-2 text-primary" />
                        <span><strong>AMM Design:</strong> The automated market maker designs used in Solana DEXs create predictable price impacts</span>
                      </li>
                    </ul>
                    <Alert className="mt-4 bg-amber-900/30 border-amber-700">
                      <FaExclamationTriangle className="h-4 w-4 text-amber-500" />
                      <AlertTitle>Impact on Users</AlertTitle>
                      <AlertDescription>
                        Sandwich attacks can cost Solana users between 1-5% of their transaction value, which adds up to millions of dollars lost across the ecosystem.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FaUserShield className="mr-2 text-green-500" />
                    How to Protect Yourself
                  </CardTitle>
                  <CardDescription>
                    Essential strategies to minimize your risk of becoming a sandwich attack victim
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold flex items-center">
                        <FaShieldAlt className="mr-2 text-primary" /> 
                        Immediate Protection Steps
                      </h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="bg-green-900 text-green-400 h-6 w-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">1</span>
                          <span><strong>Set appropriate slippage tolerance</strong> - Use the minimum slippage needed (usually 0.5-1% for stable pairs, 1-3% for volatile pairs)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-green-900 text-green-400 h-6 w-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">2</span>
                          <span><strong>Trade during lower congestion periods</strong> - Avoid peak times when competition for block space is high</span>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-green-900 text-green-400 h-6 w-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">3</span>
                          <span><strong>Use DEXs with anti-MEV protections</strong> - Some newer DEXs implement protective mechanisms</span>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-green-900 text-green-400 h-6 w-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">4</span>
                          <span><strong>Break large swaps into smaller batches</strong> - Reduces price impact and attractiveness to attackers</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold flex items-center">
                        <FaLightbulb className="mr-2 text-primary" /> 
                        Advanced Protection Techniques
                      </h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="bg-green-900 text-green-400 h-6 w-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">1</span>
                          <span><strong>Use private transaction services</strong> - Submit transactions through services that bypass the public mempool</span>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-green-900 text-green-400 h-6 w-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">2</span>
                          <span><strong>Implement price checks in transactions</strong> - Add code to abort if price moves beyond expected ranges</span>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-green-900 text-green-400 h-6 w-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">3</span>
                          <span><strong>Use limit orders instead of market orders</strong> - Prevents execution at unfavorable prices</span>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-green-900 text-green-400 h-6 w-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">4</span>
                          <span><strong>Monitor transaction analysis tools</strong> - Use SolShield to analyze if your transactions were sandwiched</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <Link href="/detect">
                      <Button>
                        Analyze My Transactions
                        <FaArrowRight className="ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Tutorials Tab */}
            <TabsContent value="tutorials" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FaCode className="mr-2 text-purple-500" />
                    Using SolShield's Detection Tool
                  </CardTitle>
                  <CardDescription>
                    Step-by-step guide to checking if your transactions have been affected
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <h4 className="font-medium text-lg">Follow these steps to analyze your transactions:</h4>
                    
                    <div className="rounded-lg overflow-hidden border border-gray-700">
                      <div className="bg-gray-800 p-4 font-medium">Step 1: Connect Your Wallet</div>
                      <div className="p-4 space-y-2">
                        <p>Connect your Solana wallet to SolShield by clicking the "Connect Wallet" button in the top right corner.</p>
                        <p>SolShield supports Phantom, Solflare, and other Solana wallets.</p>
                        <div className="bg-gray-800 rounded p-4 mt-2">
                          <strong>Note:</strong> SolShield only requests read access to your wallet address. We never request transaction signing privileges.
                        </div>
                      </div>
                    </div>
                    
                    <div className="rounded-lg overflow-hidden border border-gray-700">
                      <div className="bg-gray-800 p-4 font-medium">Step 2: Analyze Transactions</div>
                      <div className="p-4 space-y-2">
                        <p>Navigate to the "Detect" page and you'll see a form with two options:</p>
                        <ul className="list-disc pl-6 space-y-1">
                          <li><strong>Analyze by Transaction ID:</strong> Enter a specific transaction hash to check if it was sandwiched</li>
                          <li><strong>Analyze by Wallet Address:</strong> Enter a wallet address to scan recent transactions for sandwich attacks</li>
                        </ul>
                        <p>Choose your preferred method and click "Analyze".</p>
                      </div>
                    </div>
                    
                    <div className="rounded-lg overflow-hidden border border-gray-700">
                      <div className="bg-gray-800 p-4 font-medium">Step 3: Review Results</div>
                      <div className="p-4 space-y-2">
                        <p>The detection results will show:</p>
                        <ul className="list-disc pl-6 space-y-1">
                          <li>Whether a sandwich attack was detected</li>
                          <li>Confidence level of the detection</li>
                          <li>Price impact (how much the attack cost you)</li>
                          <li>Front-running and back-running transaction details</li>
                          <li>Attacker's estimated profit</li>
                        </ul>
                        <div className="bg-gray-800 rounded p-4 mt-2">
                          <strong>Tip:</strong> You can click on any transaction ID to view it in Solana Explorer for more details.
                        </div>
                      </div>
                    </div>
                    
                    <div className="rounded-lg overflow-hidden border border-gray-700">
                      <div className="bg-gray-800 p-4 font-medium">Step 4: Protection Recommendations</div>
                      <div className="p-4">
                        <p>Based on the analysis, SolShield will provide personalized recommendations to protect your future transactions.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <Link href="/detect">
                      <Button>
                        Try It Now
                        <FaArrowRight className="ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FaLayerGroup className="mr-2 text-blue-500" />
                    Setting Up Private Transactions
                  </CardTitle>
                  <CardDescription>
                    How to use private transaction relays to avoid sandwich attacks
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Private transaction services help protect against sandwich attacks by bypassing the public mempool,
                    preventing attackers from seeing your pending transactions.
                  </p>
                  
                  <div className="space-y-4 mt-4">
                    <h4 className="font-medium">Using Jito's Private Transaction Service</h4>
                    <p>Jito provides a private transaction service that helps protect against front-running:</p>
                    
                    <CodeBlock className="text-sm">
{`// Using Jito's private tx service with web3.js
const connection = new Connection(
  "https://jito-mainnet.solana.com", 
  { commitment: "confirmed" }
);

// Create and sign your transaction
const transaction = new Transaction();
// ... add your instructions
transaction.sign(fromWallet);

// Send via private RPC endpoint
const signature = await connection.sendRawTransaction(
  transaction.serialize(),
  { skipPreflight: false }
);`}
                    </CodeBlock>
                    
                    <div className="bg-gray-800 rounded p-4 mt-2">
                      <strong>Note:</strong> Different private services have different APIs. Be sure to check their documentation for the most up-to-date instructions.
                    </div>
                  </div>
                  
                  <div className="space-y-3 mt-6">
                    <h4 className="font-medium">Other Private RPC Providers</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <FaArrowRight className="mt-1 mr-2 text-primary" />
                        <div>
                          <strong>Bloxico Private RPC</strong> - Offers private transaction routing services
                        </div>
                      </li>
                      <li className="flex items-start">
                        <FaArrowRight className="mt-1 mr-2 text-primary" />
                        <div>
                          <strong>SecureRPC</strong> - Specialized in MEV protection services for Solana
                        </div>
                      </li>
                      <li className="flex items-start">
                        <FaArrowRight className="mt-1 mr-2 text-primary" />
                        <div>
                          <strong>Jupiter Swap Protection</strong> - Jupiter aggregator now has built-in protection against sandwich attacks
                        </div>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* FAQs Tab */}
            <TabsContent value="faqs" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FaInfoCircle className="mr-2 text-primary" />
                    Frequently Asked Questions
                  </CardTitle>
                  <CardDescription>
                    Common questions about sandwich attacks and protection
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>What exactly is a sandwich attack?</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-2">
                          A sandwich attack is a type of front-running attack where an attacker places two transactions around a victim's transaction:
                        </p>
                        <ol className="list-decimal pl-6 space-y-1">
                          <li>First, the attacker spots your pending transaction in the mempool</li>
                          <li>They quickly submit their own transaction to buy the token before yours executes</li>
                          <li>Your transaction executes at a worse price due to the price impact</li>
                          <li>The attacker then sells their tokens immediately after your transaction</li>
                          <li>The attacker profits from the price difference, while you receive fewer tokens than expected</li>
                        </ol>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-2">
                      <AccordionTrigger>How do sandwich attackers find transactions to target?</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-2">
                          Attackers use specialized software to monitor the mempool (where pending transactions wait before being included in a block).
                          They look for:
                        </p>
                        <ul className="list-disc pl-6 space-y-1">
                          <li>Large swap transactions that will have significant price impact</li>
                          <li>Transactions with high slippage tolerance settings</li>
                          <li>Popular token pairs with good liquidity and volume</li>
                          <li>DEXs without anti-MEV protections</li>
                        </ul>
                        <p className="mt-2">
                          After identifying a target, they use automated tools to quickly calculate the optimal attack strategy and execute the sandwich attack.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-3">
                      <AccordionTrigger>How much can a sandwich attack cost me?</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-2">
                          The cost of a sandwich attack varies depending on:
                        </p>
                        <ul className="list-disc pl-6 space-y-1">
                          <li>Transaction size (larger swaps face bigger losses)</li>
                          <li>Token pair liquidity (less liquid pairs suffer more impact)</li>
                          <li>Market volatility (more volatile markets increase potential losses)</li>
                          <li>Your slippage tolerance settings</li>
                        </ul>
                        <p className="mt-2">
                          Typically, victims lose between 0.5% to 5% of their transaction value. For a $10,000 swap, that could mean losing $50-$500. 
                          In some extreme cases with illiquid tokens, losses can reach 10% or more.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-4">
                      <AccordionTrigger>Do sandwich attacks only happen on Solana?</AccordionTrigger>
                      <AccordionContent>
                        <p>
                          No, sandwich attacks occur on many blockchains that use automated market makers (AMMs), including Ethereum, 
                          BNB Chain, Avalanche, and others. However, Solana's high throughput and low fees make it particularly 
                          attractive for these attacks, as attackers can execute them with lower costs and higher frequency.
                        </p>
                        <p className="mt-2">
                          Ethereum has more established protection mechanisms and private mempools compared to Solana, 
                          but the attacks are still common across all major DeFi ecosystems.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-5">
                      <AccordionTrigger>What is the best slippage setting to avoid sandwich attacks?</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-2">
                          There's a tradeoff when setting slippage tolerance:
                        </p>
                        <ul className="list-disc pl-6 space-y-1">
                          <li><strong>Too high:</strong> Makes you more vulnerable to sandwich attacks</li>
                          <li><strong>Too low:</strong> Your transaction might fail if prices move naturally</li>
                        </ul>
                        <p className="mt-2">
                          Recommended settings:
                        </p>
                        <ul className="list-disc pl-6 space-y-1">
                          <li><strong>Stable pairs (USDC/USDT):</strong> 0.1-0.5%</li>
                          <li><strong>Major tokens (SOL/USDC):</strong> 0.5-1%</li>
                          <li><strong>Mid-cap tokens:</strong> 1-2%</li>
                          <li><strong>Small-cap tokens:</strong> 2-3%</li>
                        </ul>
                        <p className="mt-2">
                          Balance between transaction success and protection. During highly volatile periods, 
                          you might need to increase these values slightly.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-6">
                      <AccordionTrigger>Can SolShield prevent sandwich attacks before they happen?</AccordionTrigger>
                      <AccordionContent>
                        <p>
                          SolShield primarily focuses on detection and analysis of sandwich attacks after they occur, 
                          helping you understand if you've been affected and providing recommendations to prevent future attacks.
                        </p>
                        <p className="mt-2">
                          For real-time prevention, SolShield offers:
                        </p>
                        <ul className="list-disc pl-6 space-y-1">
                          <li><strong>Real-time monitoring dashboard</strong> showing current attack patterns and high-risk pools</li>
                          <li><strong>Developer integrations</strong> that allow wallets and DEXs to incorporate our protection mechanisms</li>
                          <li><strong>Educational resources</strong> to help you understand how to structure your transactions to minimize risk</li>
                        </ul>
                        <p className="mt-2">
                          For the most effective protection, we recommend using SolShield in combination with 
                          private transaction services and following our best practices for transaction security.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-7">
                      <AccordionTrigger>Are DEXs doing anything to prevent sandwich attacks?</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-2">
                          Yes, some DEXs are implementing protective measures against sandwich attacks:
                        </p>
                        <ul className="list-disc pl-6 space-y-1">
                          <li><strong>Fair sequencing services:</strong> Ensuring transaction ordering is fair and not manipulable</li>
                          <li><strong>Time-weighted average pricing (TWAP):</strong> Trading mechanisms that reduce the impact of short-term price manipulation</li>
                          <li><strong>Private transaction pools:</strong> Allowing users to submit transactions privately, bypassing the public mempool</li>
                          <li><strong>MEV-protection mechanisms:</strong> Various technical approaches to prevent front-running and sandwiching</li>
                        </ul>
                        <p className="mt-2">
                          On Solana specifically, Jupiter and Orca have made strides in implementing protective measures, 
                          though the ecosystem is still developing comprehensive solutions.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Solana Ecosystem Integration Tab */}
            <TabsContent value="ecosystem" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FaNetworkWired className="mr-2 text-green-500" />
                    Solana Ecosystem Integration
                  </CardTitle>
                  <CardDescription>
                    How SolShield integrates with Solana's infrastructure to protect users
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-xl p-6 border border-blue-700/50">
                      <h3 className="text-xl font-semibold mb-4 text-blue-400">Deep Integration with Solana's Architecture</h3>
                      <p className="text-gray-300 mb-4">
                        SolShield is built to seamlessly integrate with Solana's unique infrastructure, leveraging the blockchain's 
                        high-performance characteristics while addressing its vulnerability to sandwich attacks.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700/50">
                          <div className="flex items-center mb-3">
                            <FaServer className="text-blue-400 mr-3" />
                            <h4 className="font-medium">RPC Node Integration</h4>
                          </div>
                          <p className="text-sm text-gray-300">
                            SolShield connects to dedicated high-performance Solana RPC nodes to access real-time transaction data and 
                            monitor the mempool for potential attack patterns.
                          </p>
                        </div>
                        
                        <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700/50">
                          <div className="flex items-center mb-3">
                            <FaDatabase className="text-green-400 mr-3" />
                            <h4 className="font-medium">Private Transaction Pools</h4>
                          </div>
                          <p className="text-sm text-gray-300">
                            Integration with Solana's private transaction infrastructure allows users to bypass public mempools, 
                            preventing attackers from seeing pending transactions.
                          </p>
                        </div>
                        
                        <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700/50">
                          <div className="flex items-center mb-3">
                            <FaCogs className="text-purple-400 mr-3" />
                            <h4 className="font-medium">Transaction Simulation</h4>
                          </div>
                          <p className="text-sm text-gray-300">
                            Leverages Solana's transaction simulation capabilities to predict potential sandwich vulnerabilities 
                            before submitting transactions to the network.
                          </p>
                        </div>
                        
                        <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700/50">
                          <div className="flex items-center mb-3">
                            <FaChartBar className="text-amber-400 mr-3" />
                            <h4 className="font-medium">MEV Pattern Recognition</h4>
                          </div>
                          <p className="text-sm text-gray-300">
                            Advanced algorithms analyze Solana's transaction flow to identify sophisticated attack patterns 
                            and predict potential sandwich attacks in real-time.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Card className="border border-green-700/30">
                        <CardHeader className="bg-green-900/20">
                          <CardTitle className="flex items-center text-green-400">
                            <FaShieldAlt className="mr-2" />
                            Protection Mechanisms
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <ul className="space-y-4">
                            <li className="flex items-start">
                              <div className="mt-1 mr-3 bg-green-900/30 p-1 rounded-full">
                                <FaCheck className="text-green-500 text-xs" />
                              </div>
                              <div>
                                <strong className="text-green-400">DEX Integration</strong>
                                <p className="text-sm text-gray-300 mt-1">
                                  Direct partnerships with Solana DEXs to implement protective transaction routing that minimizes sandwich attack risk.
                                </p>
                              </div>
                            </li>
                            <li className="flex items-start">
                              <div className="mt-1 mr-3 bg-green-900/30 p-1 rounded-full">
                                <FaCheck className="text-green-500 text-xs" />
                              </div>
                              <div>
                                <strong className="text-green-400">Validator Collaboration</strong>
                                <p className="text-sm text-gray-300 mt-1">
                                  Working with Solana validators to implement fair ordering protocols that reduce the effectiveness of front-running.
                                </p>
                              </div>
                            </li>
                            <li className="flex items-start">
                              <div className="mt-1 mr-3 bg-green-900/30 p-1 rounded-full">
                                <FaCheck className="text-green-500 text-xs" />
                              </div>
                              <div>
                                <strong className="text-green-400">Wallet Plugin Ecosystem</strong>
                                <p className="text-sm text-gray-300 mt-1">
                                  Integration with popular Solana wallets to provide real-time transaction analysis and protection recommendations.
                                </p>
                              </div>
                            </li>
                            <li className="flex items-start">
                              <div className="mt-1 mr-3 bg-green-900/30 p-1 rounded-full">
                                <FaCheck className="text-green-500 text-xs" />
                              </div>
                              <div>
                                <strong className="text-green-400">Private RPC Network</strong>
                                <p className="text-sm text-gray-300 mt-1">
                                  Access to a network of private RPC endpoints that bypass public mempools, preventing transaction exposure.
                                </p>
                              </div>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                      
                      <Card className="border border-blue-700/30">
                        <CardHeader className="bg-blue-900/20">
                          <CardTitle className="flex items-center text-blue-400">
                            <FaCode className="mr-2" />
                            Developer Resources
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <ul className="space-y-4">
                            <li className="flex items-start">
                              <div className="mt-1 mr-3 bg-blue-900/30 p-1 rounded-full">
                                <FaCheck className="text-blue-500 text-xs" />
                              </div>
                              <div>
                                <strong className="text-blue-400">Solana Program Libraries</strong>
                                <p className="text-sm text-gray-300 mt-1">
                                  Pre-built Rust libraries for Solana program development that include sandwich-resistant transaction mechanisms.
                                </p>
                              </div>
                            </li>
                            <li className="flex items-start">
                              <div className="mt-1 mr-3 bg-blue-900/30 p-1 rounded-full">
                                <FaCheck className="text-blue-500 text-xs" />
                              </div>
                              <div>
                                <strong className="text-blue-400">Anchor Framework Integration</strong>
                                <p className="text-sm text-gray-300 mt-1">
                                  Custom extensions for the popular Anchor framework to simplify building sandwich-resistant Solana programs.
                                </p>
                              </div>
                            </li>
                            <li className="flex items-start">
                              <div className="mt-1 mr-3 bg-blue-900/30 p-1 rounded-full">
                                <FaCheck className="text-blue-500 text-xs" />
                              </div>
                              <div>
                                <strong className="text-blue-400">JavaScript/TypeScript SDK</strong>
                                <p className="text-sm text-gray-300 mt-1">
                                  Client-side libraries that developers can integrate into their dApps for real-time sandwich attack protection.
                                </p>
                              </div>
                            </li>
                            <li className="flex items-start">
                              <div className="mt-1 mr-3 bg-blue-900/30 p-1 rounded-full">
                                <FaCheck className="text-blue-500 text-xs" />
                              </div>
                              <div>
                                <strong className="text-blue-400">API Integration</strong>
                                <p className="text-sm text-gray-300 mt-1">
                                  RESTful and WebSocket APIs that provide real-time mempool monitoring and sandwich attack detection.
                                </p>
                              </div>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <Alert className="bg-blue-900/30 border-blue-700">
                      <FaInfoCircle className="h-4 w-4 text-blue-500" />
                      <AlertTitle>Real-time Protection Pipeline</AlertTitle>
                      <AlertDescription>
                        Our mempool monitoring system scans Solana transactions in real-time, with alerts pushed to users within milliseconds 
                        of detecting potential attack patterns. When integrated with wallets or DEXs, SolShield can provide proactive 
                        protection by analyzing transactions before they're submitted to the network.
                      </AlertDescription>
                    </Alert>
                    
                    <div className="mt-6 flex justify-end">
                      <Link href="/dashboard">
                        <Button>
                          View Real-time Monitoring Dashboard
                          <FaArrowRight className="ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Resources Tab */}
            <TabsContent value="resources" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FaFileAlt className="mr-2 text-amber-500" />
                    Technical Papers & Analysis
                  </CardTitle>
                  <CardDescription>
                    In-depth research on sandwich attacks and MEV extraction
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-4">
                    <li className="border-b border-gray-700 pb-3">
                      <h4 className="font-medium">Quantifying Sandwich Attacks on Solana DEXs</h4>
                      <p className="text-sm text-gray-400 mt-1">Research on the frequency and impact of sandwich attacks across major Solana decentralized exchanges.</p>
                      <div className="flex mt-2">
                        <span className="text-xs bg-gray-800 rounded px-2 py-1">Research Paper</span>
                        <span className="text-xs bg-blue-900 text-blue-300 rounded px-2 py-1 ml-2">MEV Analysis</span>
                      </div>
                    </li>
                    <li className="border-b border-gray-700 pb-3">
                      <h4 className="font-medium">Flash Boys 2.0: MEV on High-Throughput Blockchains</h4>
                      <p className="text-sm text-gray-400 mt-1">Analysis of Maximal Extractable Value strategies on high-throughput chains like Solana compared to Ethereum.</p>
                      <div className="flex mt-2">
                        <span className="text-xs bg-gray-800 rounded px-2 py-1">Academic</span>
                        <span className="text-xs bg-green-900 text-green-300 rounded px-2 py-1 ml-2">Comparative Study</span>
                      </div>
                    </li>
                    <li className="border-b border-gray-700 pb-3">
                      <h4 className="font-medium">Technical Architecture of Sandwich Attack Prevention Systems</h4>
                      <p className="text-sm text-gray-400 mt-1">Detailed technical paper on different architectural approaches to preventing sandwich attacks in DeFi.</p>
                      <div className="flex mt-2">
                        <span className="text-xs bg-gray-800 rounded px-2 py-1">Technical Paper</span>
                        <span className="text-xs bg-purple-900 text-purple-300 rounded px-2 py-1 ml-2">Solutions</span>
                      </div>
                    </li>
                    <li>
                      <h4 className="font-medium">Economic Impact Assessment: MEV Extraction on Solana</h4>
                      <p className="text-sm text-gray-400 mt-1">Economic analysis of the total value extracted through MEV strategies and their impact on Solana's DeFi ecosystem.</p>
                      <div className="flex mt-2">
                        <span className="text-xs bg-gray-800 rounded px-2 py-1">Research</span>
                        <span className="text-xs bg-red-900 text-red-300 rounded px-2 py-1 ml-2">Economic Analysis</span>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FaCode className="mr-2 text-purple-500" />
                    Additional Developer Resources
                  </CardTitle>
                  <CardDescription>
                    Tools and resources for developers building on Solana
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    SolShield provides comprehensive resources for developers looking to build sandwich-resistant 
                    applications on Solana:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="border border-gray-700 rounded-lg overflow-hidden">
                      <div className="bg-gray-800 p-3 font-medium">API Documentation</div>
                      <div className="p-3 space-y-2">
                        <p className="text-sm">
                          Comprehensive API documentation for integrating SolShield's detection and protection mechanisms into your apps.
                        </p>
                        <Link href="/api-reference">
                          <a className="text-primary text-sm inline-flex items-center">
                            View Documentation
                            <FaArrowRight className="ml-1 h-3 w-3" />
                          </a>
                        </Link>
                      </div>
                    </div>
                    
                    <div className="border border-gray-700 rounded-lg overflow-hidden">
                      <div className="bg-gray-800 p-3 font-medium">Smart Contract Templates</div>
                      <div className="p-3 space-y-2">
                        <p className="text-sm">
                          Pre-built, audited smart contract templates with sandwich attack protection mechanisms built in.
                        </p>
                        <Link href="/develop">
                          <a className="text-primary text-sm inline-flex items-center">
                            Browse Templates
                            <FaArrowRight className="ml-1 h-3 w-3" />
                          </a>
                        </Link>
                      </div>
                    </div>
                    
                    <div className="border border-gray-700 rounded-lg overflow-hidden">
                      <div className="bg-gray-800 p-3 font-medium">SDK & Libraries</div>
                      <div className="p-3 space-y-2">
                        <p className="text-sm">
                          JavaScript and Rust libraries for sandwich detection, prevention, and transaction protection.
                        </p>
                        <Link href="/develop">
                          <a className="text-primary text-sm inline-flex items-center">
                            View Libraries
                            <FaArrowRight className="ml-1 h-3 w-3" />
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <Link href="/develop">
                      <Button>
                        Explore Developer Resources
                        <FaArrowRight className="ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}