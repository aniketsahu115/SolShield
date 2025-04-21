import { 
  users, type User, type InsertUser,
  transactionAnalyses, type TransactionAnalysis, type InsertTransactionAnalysis,
  type TransactionAnalysisRequest, type DetectionResponse
} from "@shared/schema";

// Interface with all CRUD methods needed
export interface IStorage {
  // User methods (from original)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Transaction analysis methods
  createTransactionAnalysis(analysis: InsertTransactionAnalysis): Promise<TransactionAnalysis>;
  getTransactionAnalysisByTransactionId(transactionId: string): Promise<TransactionAnalysis | undefined>;
  getTransactionAnalysesByWalletAddress(walletAddress: string): Promise<TransactionAnalysis[]>;
  
  // Detection method that processes a request and returns a detection response
  detectSandwichAttack(request: TransactionAnalysisRequest): Promise<DetectionResponse>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private transactionAnalyses: Map<string, TransactionAnalysis>;
  currentUserId: number;
  currentAnalysisId: number;

  constructor() {
    this.users = new Map();
    this.transactionAnalyses = new Map();
    this.currentUserId = 1;
    this.currentAnalysisId = 1;
  }

  // User methods (from original)
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Transaction analysis methods
  async createTransactionAnalysis(analysis: InsertTransactionAnalysis): Promise<TransactionAnalysis> {
    const id = this.currentAnalysisId++;
    const createdAt = new Date();
    const transactionAnalysis: TransactionAnalysis = { ...analysis, id, createdAt };
    this.transactionAnalyses.set(analysis.transactionId, transactionAnalysis);
    return transactionAnalysis;
  }
  
  async getTransactionAnalysisByTransactionId(transactionId: string): Promise<TransactionAnalysis | undefined> {
    return this.transactionAnalyses.get(transactionId);
  }
  
  async getTransactionAnalysesByWalletAddress(walletAddress: string): Promise<TransactionAnalysis[]> {
    return Array.from(this.transactionAnalyses.values()).filter(
      (analysis) => analysis.walletAddress === walletAddress
    );
  }
  
  // This would normally connect to Solana blockchain or a specialized service to detect sandwich attacks
  // For this implementation, we'll simulate detection based on the input parameters
  async detectSandwichAttack(request: TransactionAnalysisRequest): Promise<DetectionResponse> {
    // In a real implementation, this would analyze blockchain data
    // For now, simulate a response with detection logic
    
    const input = request.transactionIdOrWallet;
    
    // Determine if it's a transaction ID or wallet address
    const isTransactionId = input.length > 44 && input.length < 90;
    const walletAddress = isTransactionId ? "user_wallet_derived_from_tx" : input;
    const transactionId = isTransactionId ? input : "simulated_transaction_id";
    
    // Create a simulated detection response
    // In a real implementation, this would be based on actual transaction data
    const detectionResponse: DetectionResponse = {
      result: {
        isSandwich: true,
        confidence: 0.87,
        frontTx: "63xP5...2gT7",
        targetTx: "96xG4...7hR9",
        backTx: "72xB8...9nF1",
        valueImpact: {
          sol: 0.082,
          usd: 3.28
        },
        priceImpact: 1.4,
        timeFrame: 0.88,
        pool: "SOL/USDC (Raydium)",
        attackerEstimatedProfit: {
          sol: 0.069,
          usd: 2.76
        }
      },
      recommendations: [
        "Lower slippage tolerance to 0.5%",
        "Use Jupiter Aggregator with MEV protection",
        "Split large transactions"
      ]
    };
    
    // Store the analysis result in our storage
    await this.createTransactionAnalysis({
      transactionId,
      walletAddress: walletAddress,
      isSandwich: detectionResponse.result.isSandwich,
      confidence: Math.round(detectionResponse.result.confidence * 100),
      frontTx: detectionResponse.result.frontTx || null,
      targetTx: detectionResponse.result.targetTx,
      backTx: detectionResponse.result.backTx || null,
      valueImpactSol: Math.round(detectionResponse.result.valueImpact.sol * 1_000_000_000), // Convert to lamports
      valueImpactUsd: Math.round(detectionResponse.result.valueImpact.usd * 100), // Convert to cents
      priceImpact: Math.round(detectionResponse.result.priceImpact * 100), // Convert to basis points
      timeFrame: Math.round(detectionResponse.result.timeFrame * 1000), // Convert to milliseconds
      pool: detectionResponse.result.pool,
      attackerEstimatedProfitSol: Math.round(detectionResponse.result.attackerEstimatedProfit.sol * 1_000_000_000), // Convert to lamports
      attackerEstimatedProfitUsd: Math.round(detectionResponse.result.attackerEstimatedProfit.usd * 100), // Convert to cents
      recommendations: detectionResponse.recommendations,
    });
    
    return detectionResponse;
  }
}

export const storage = new MemStorage();
