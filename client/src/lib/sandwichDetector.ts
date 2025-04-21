import { apiRequest } from "@/lib/queryClient";
import { TransactionAnalysisRequest, DetectionResponse } from "@shared/schema";

/**
 * Makes a request to the server to detect sandwich attacks
 * on the provided transaction or wallet
 */
export async function detectSandwichAttack(request: TransactionAnalysisRequest): Promise<DetectionResponse> {
  const response = await apiRequest('POST', '/api/detect-sandwich', request);
  return await response.json();
}

/**
 * Checks a Solana address format (simplified verification)
 * @param address Potential Solana address to check
 * @returns Boolean indicating if the format appears valid
 */
export function isValidSolanaAddress(address: string): boolean {
  // Basic validation - a Solana address is a base58-encoded string
  // Typically 32-44 characters long
  return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address);
}

/**
 * Checks if a string appears to be a Solana transaction ID
 * @param txId Potential transaction ID
 * @returns Boolean indicating if it appears to be a valid Solana transaction ID
 */
export function isValidSolanaTransactionId(txId: string): boolean {
  // A Solana transaction signature is a 88-character base58 string
  return /^[1-9A-HJ-NP-Za-km-z]{87,88}$/.test(txId);
}

/**
 * Calculate the risk level for a potential sandwich attack based on 
 * price impact and confidence level
 * @param priceImpact The percentage impact on price
 * @param confidence Confidence level (0-1)
 * @returns Risk level as string: "Low", "Medium", or "High"
 */
export function calculateRiskLevel(priceImpact: number, confidence: number): string {
  if (confidence < 0.4) return "Low";
  if (priceImpact < 0.8) return "Low";
  if (priceImpact < 1.5 && confidence < 0.7) return "Medium";
  if (priceImpact >= 1.5 || confidence >= 0.7) return "High";
  return "Medium";
}

/**
 * Generate recommended slippage settings based on detected sandwich attack
 * @param priceImpact The detected price impact percentage
 * @returns Recommended slippage percentage
 */
export function getRecommendedSlippage(priceImpact: number): number {
  // If price impact is high, recommend a lower slippage to protect against attacks
  if (priceImpact > 2.0) return 0.5;
  if (priceImpact > 1.0) return 0.8;
  return 1.0;
}
