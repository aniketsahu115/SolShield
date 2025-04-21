import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { FaArrowDown, FaArrowUp, FaExchangeAlt, FaExclamationTriangle, FaShieldAlt } from "react-icons/fa";
import { detectSandwichAttack } from "@/lib/sandwichDetector";
import { TransactionAnalysisRequest, DetectionResponse } from "@shared/schema";

// Form schema for the detection tool
const detectionFormSchema = z.object({
  transactionIdOrWallet: z.string().min(1, "Transaction ID or wallet address is required"),
  frontRunningDetection: z.boolean().default(true),
  backRunningDetection: z.boolean().default(true),
  priceImpactAnalysis: z.boolean().default(true),
  rapidTradePatternRecognition: z.boolean().default(true),
  timeWindow: z.number().min(5).max(60).default(15),
  priceImpactThreshold: z.enum(["low", "medium", "high", "custom"]).default("medium"),
});

type DetectionFormValues = z.infer<typeof detectionFormSchema>;

export default function DetectionTool() {
  const [detectionResult, setDetectionResult] = useState<DetectionResponse | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  // Form setup
  const form = useForm<DetectionFormValues>({
    resolver: zodResolver(detectionFormSchema),
    defaultValues: {
      transactionIdOrWallet: "",
      frontRunningDetection: true,
      backRunningDetection: true,
      priceImpactAnalysis: true,
      rapidTradePatternRecognition: true,
      timeWindow: 15,
      priceImpactThreshold: "medium",
    },
  });

  // Mutation for sandwich attack detection
  const detectMutation = useMutation({
    mutationFn: async (data: TransactionAnalysisRequest) => {
      return await detectSandwichAttack(data);
    },
    onSuccess: (data) => {
      setDetectionResult(data);
      setIsAnalyzing(false);
    },
    onError: (error) => {
      console.error("Detection error:", error);
      toast({
        title: "Analysis Failed",
        description: "There was a problem analyzing the transaction. Please try again.",
        variant: "destructive",
      });
      setIsAnalyzing(false);
    },
  });

  // Handle form submission
  const onSubmit = (values: DetectionFormValues) => {
    if (!values.transactionIdOrWallet) {
      toast({
        title: "Input Required",
        description: "Please enter a wallet address or transaction ID to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Convert form values to API request
    const request: TransactionAnalysisRequest = {
      transactionIdOrWallet: values.transactionIdOrWallet,
      frontRunningDetection: values.frontRunningDetection,
      backRunningDetection: values.backRunningDetection,
      priceImpactAnalysis: values.priceImpactAnalysis,
      rapidTradePatternRecognition: values.rapidTradePatternRecognition,
      timeWindow: values.timeWindow,
      priceImpactThreshold: values.priceImpactThreshold,
    };

    detectMutation.mutate(request);
  };

  return (
    <section id="detect" className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Sandwich Attack <span className="text-primary">Detection Tool</span></h2>
          <p className="text-gray-300 text-center mb-12">Monitor your transactions and check for potential sandwich attacks with our simple detection tool</p>
          
          {/* Detection Form */}
          <div className="bg-gray-800 rounded-xl p-6 mb-8">
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="wallet-address" className="block text-sm font-medium text-gray-200">
                    Solana Wallet Address or Transaction ID
                  </label>
                </div>
                <div className="flex">
                  <Input
                    id="wallet-address"
                    placeholder="Enter a wallet address or transaction ID to analyze"
                    className="flex-1 px-4 py-3 bg-gray-900 text-white rounded-l-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                    {...form.register("transactionIdOrWallet")}
                  />
                  <Button 
                    type="submit"
                    className="bg-primary hover:bg-opacity-90 text-white px-6 py-3 rounded-r-lg font-medium transition"
                    disabled={isAnalyzing}
                  >
                    {isAnalyzing ? "Analyzing..." : "Analyze"}
                  </Button>
                </div>
                {form.formState.errors.transactionIdOrWallet && (
                  <p className="text-red-400 text-xs mt-1">{form.formState.errors.transactionIdOrWallet.message}</p>
                )}
                <p className="text-xs text-gray-400 mt-2">Note: This tool only analyzes public on-chain data and does not require any wallet connection.</p>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-200 mb-2">Detection Parameters</label>
                  <div className="space-y-3 bg-gray-900 p-4 rounded-lg">
                    <div>
                      <label className="flex items-center text-sm">
                        <Checkbox 
                          checked={form.watch("frontRunningDetection")}
                          onCheckedChange={(checked) => form.setValue("frontRunningDetection", checked === true)}
                          className="h-4 w-4 rounded text-primary focus:ring-primary bg-gray-700 border-gray-600"
                        />
                        <span className="ml-2 text-gray-300">Front-Running Detection</span>
                      </label>
                    </div>
                    <div>
                      <label className="flex items-center text-sm">
                        <Checkbox 
                          checked={form.watch("backRunningDetection")}
                          onCheckedChange={(checked) => form.setValue("backRunningDetection", checked === true)}
                          className="h-4 w-4 rounded text-primary focus:ring-primary bg-gray-700 border-gray-600"
                        />
                        <span className="ml-2 text-gray-300">Back-Running Detection</span>
                      </label>
                    </div>
                    <div>
                      <label className="flex items-center text-sm">
                        <Checkbox 
                          checked={form.watch("priceImpactAnalysis")}
                          onCheckedChange={(checked) => form.setValue("priceImpactAnalysis", checked === true)}
                          className="h-4 w-4 rounded text-primary focus:ring-primary bg-gray-700 border-gray-600"
                        />
                        <span className="ml-2 text-gray-300">Price Impact Analysis</span>
                      </label>
                    </div>
                    <div>
                      <label className="flex items-center text-sm">
                        <Checkbox 
                          checked={form.watch("rapidTradePatternRecognition")}
                          onCheckedChange={(checked) => form.setValue("rapidTradePatternRecognition", checked === true)}
                          className="h-4 w-4 rounded text-primary focus:ring-primary bg-gray-700 border-gray-600"
                        />
                        <span className="ml-2 text-gray-300">Rapid Trade Pattern Recognition</span>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-200 mb-2">Analysis Timeframe</label>
                  <div className="space-y-4 bg-gray-900 p-4 rounded-lg">
                    <div>
                      <label className="block text-sm text-gray-300 mb-1">Time Window (seconds)</label>
                      <Slider
                        min={5}
                        max={60}
                        step={1}
                        value={[form.watch("timeWindow")]}
                        onValueChange={(value) => form.setValue("timeWindow", value[0])}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>5s</span>
                        <span>{form.watch("timeWindow")}s</span>
                        <span>60s</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-1">Price Impact Threshold</label>
                      <Select
                        value={form.watch("priceImpactThreshold")}
                        onValueChange={(value) => form.setValue("priceImpactThreshold", value as "low" | "medium" | "high" | "custom")}
                      >
                        <SelectTrigger className="w-full bg-gray-700 border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary">
                          <SelectValue placeholder="Select threshold" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low (0.5%)</SelectItem>
                          <SelectItem value="medium">Medium (1%)</SelectItem>
                          <SelectItem value="high">High (2%)</SelectItem>
                          <SelectItem value="custom">Custom...</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          
          {/* Detection Results */}
          {isAnalyzing ? (
            <div className="bg-gray-800 rounded-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-800">
                <h3 className="font-semibold flex items-center gap-2">
                  <Skeleton className="h-4 w-4 bg-gray-700" />
                  <Skeleton className="h-4 w-32 bg-gray-700" />
                </h3>
              </div>
              <div className="p-6 space-y-4">
                <Skeleton className="h-16 w-full bg-gray-700" />
                <div className="space-y-2">
                  <Skeleton className="h-10 w-full bg-gray-700" />
                  <Skeleton className="h-10 w-full bg-gray-700" />
                  <Skeleton className="h-10 w-full bg-gray-700" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32 bg-gray-700" />
                  <Skeleton className="h-20 w-full bg-gray-700" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24 bg-gray-700" />
                  <Skeleton className="h-20 w-full bg-gray-700" />
                </div>
              </div>
            </div>
          ) : detectionResult ? (
            <div className="bg-gray-800 rounded-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
                <h3 className="font-semibold">Analysis Results</h3>
                <span className="text-xs bg-gray-900 text-gray-300 px-2 py-1 rounded-full">Last updated: just now</span>
              </div>
              
              {/* Alert Component */}
              {detectionResult.result.isSandwich && (
                <div className="m-6 bg-red-900 bg-opacity-30 border border-red-800 rounded-lg px-4 py-3">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <FaExclamationTriangle className="text-red-500 mt-0.5" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-400">Potential Sandwich Attack Detected</h3>
                      <div className="mt-2 text-sm text-red-200">
                        <p>
                          We've identified a potential sandwich attack in transaction{" "}
                          <a href={`https://explorer.solana.com/tx/${detectionResult.result.targetTx}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline">
                            {detectionResult.result.targetTx}
                          </a>{" "}
                          with suspicious surrounding transactions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Results Table */}
              <div className="px-6 pb-6">
                <div className="bg-gray-900 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-900">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Transaction</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Timestamp</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Pattern</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Risk</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Front-running Transaction */}
                      {detectionResult.result.frontTx && (
                        <tr className="bg-gray-800">
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className="flex items-center">
                              <FaArrowUp className="text-green-400 mr-2" />
                              <a 
                                href={`https://explorer.solana.com/tx/${detectionResult.result.frontTx}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:underline"
                              >
                                {detectionResult.result.frontTx}
                              </a>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            {new Date().toLocaleTimeString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            Front-running
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs font-medium bg-yellow-900 text-yellow-200 rounded-full">Medium</span>
                          </td>
                        </tr>
                      )}
                      
                      {/* Target Transaction */}
                      <tr className="bg-gray-900">
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex items-center">
                            <FaExchangeAlt className="text-white mr-2" />
                            <a 
                              href={`https://explorer.solana.com/tx/${detectionResult.result.targetTx}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:underline font-medium"
                            >
                              {detectionResult.result.targetTx}
                            </a>
                            <span className="ml-2 px-2 py-0.5 text-xs bg-purple-900 text-purple-200 rounded-full">Your TX</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {new Date().toLocaleTimeString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          Target transaction
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium bg-red-900 text-red-200 rounded-full">High</span>
                        </td>
                      </tr>
                      
                      {/* Back-running Transaction */}
                      {detectionResult.result.backTx && (
                        <tr className="bg-gray-800">
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className="flex items-center">
                              <FaArrowDown className="text-red-400 mr-2" />
                              <a 
                                href={`https://explorer.solana.com/tx/${detectionResult.result.backTx}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:underline"
                              >
                                {detectionResult.result.backTx}
                              </a>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            {new Date().toLocaleTimeString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            Back-running
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs font-medium bg-yellow-900 text-yellow-200 rounded-full">Medium</span>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                
                {/* Impact Analysis */}
                <div className="mt-6 bg-gray-900 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-300 mb-3">IMPACT ANALYSIS</h4>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <div className="mb-2 flex justify-between items-center">
                        <span className="text-sm text-gray-400">Estimated Value Loss:</span>
                        <span className="font-medium text-red-400">
                          {detectionResult.result.valueImpact.sol.toFixed(3)} SOL (${detectionResult.result.valueImpact.usd.toFixed(2)})
                        </span>
                      </div>
                      <div className="mb-2 flex justify-between items-center">
                        <span className="text-sm text-gray-400">Slippage Impact:</span>
                        <span className="font-medium text-yellow-400">{detectionResult.result.priceImpact.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Time Between Transactions:</span>
                        <span className="font-medium text-gray-200">{detectionResult.result.timeFrame.toFixed(2)} seconds</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="mb-2 flex justify-between items-center">
                        <span className="text-sm text-gray-400">Liquidity Pool:</span>
                        <span className="font-medium text-gray-200">{detectionResult.result.pool}</span>
                      </div>
                      <div className="mb-2 flex justify-between items-center">
                        <span className="text-sm text-gray-400">Confidence Level:</span>
                        <span className="font-medium text-red-400">
                          High ({Math.round(detectionResult.result.confidence * 100)}%)
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Attacker Profit (Est.):</span>
                        <span className="font-medium text-red-400">
                          {detectionResult.result.attackerEstimatedProfit.sol.toFixed(3)} SOL (${detectionResult.result.attackerEstimatedProfit.usd.toFixed(2)})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Recommendations */}
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-300 mb-2">RECOMMENDATIONS</h4>
                  <ul className="space-y-2 text-sm">
                    {detectionResult.recommendations.map((recommendation, index) => (
                      <li key={index} className="flex items-start">
                        <FaShieldAlt className="text-green-400 mt-1 mr-2" />
                        <span className="text-gray-300">{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
