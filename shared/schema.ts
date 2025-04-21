import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users schema (keeping the original user schema)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Transaction analysis schema
export const transactionAnalyses = pgTable("transaction_analyses", {
  id: serial("id").primaryKey(),
  transactionId: text("transaction_id").notNull().unique(),
  walletAddress: text("wallet_address"),
  isSandwich: boolean("is_sandwich").notNull(),
  confidence: integer("confidence").notNull(), // 0-100 percentage
  frontTx: text("front_tx"),
  targetTx: text("target_tx"),
  backTx: text("back_tx"),
  valueImpactSol: integer("value_impact_sol"), // In lamports (integer)
  valueImpactUsd: integer("value_impact_usd"), // In cents (integer)
  priceImpact: integer("price_impact"), // In basis points (integer)
  timeFrame: integer("time_frame"), // In milliseconds
  pool: text("pool"),
  attackerEstimatedProfitSol: integer("attacker_estimated_profit_sol"), // In lamports
  attackerEstimatedProfitUsd: integer("attacker_estimated_profit_usd"), // In cents
  recommendations: text("recommendations").array(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertTransactionAnalysisSchema = createInsertSchema(transactionAnalyses).omit({
  id: true,
  createdAt: true,
});

export type InsertTransactionAnalysis = z.infer<typeof insertTransactionAnalysisSchema>;
export type TransactionAnalysis = typeof transactionAnalyses.$inferSelect;

// Schema for transaction analysis request
export const transactionAnalysisRequestSchema = z.object({
  transactionIdOrWallet: z.string().min(1, "Transaction ID or wallet address is required"),
  frontRunningDetection: z.boolean().default(true),
  backRunningDetection: z.boolean().default(true),
  priceImpactAnalysis: z.boolean().default(true),
  rapidTradePatternRecognition: z.boolean().default(true),
  timeWindow: z.number().min(5).max(60).default(15),
  priceImpactThreshold: z.enum(["low", "medium", "high", "custom"]).default("medium"),
  customPriceImpactThreshold: z.number().optional(),
});

export type TransactionAnalysisRequest = z.infer<typeof transactionAnalysisRequestSchema>;

// Mock transaction data response (this will come from Solana API in production)
export interface TransactionResult {
  isSandwich: boolean;
  confidence: number; // 0-1
  frontTx: string | null;
  targetTx: string;
  backTx: string | null;
  valueImpact: {
    sol: number;
    usd: number;
  };
  priceImpact: number; // percentage
  timeFrame: number; // seconds
  pool: string;
  attackerEstimatedProfit: {
    sol: number;
    usd: number;
  };
}

export interface DetectionResponse {
  result: TransactionResult;
  recommendations: string[];
}

// Real-time monitoring types
export enum SuspiciousPatternType {
  POTENTIAL_SANDWICH = 'potential_sandwich',
  KNOWN_ATTACKER = 'known_attacker',
  RAPID_TRADES = 'rapid_trades',
  PRICE_MANIPULATION = 'price_manipulation',
}

export interface MempoolAlert {
  id: string;
  type: SuspiciousPatternType;
  timestamp: string;
  confidence: number;
  transactions: string[];
  targetTransaction?: string;
  description: string;
  impactedTokens?: string[];
  estimatedImpact?: {
    sol: number;
    usd: number;
  };
}

export interface MempoolStats {
  totalAlertsToday: number;
  activeAttackers: number;
  mostImpactedPools: {
    name: string;
    alertCount: number;
  }[];
  recentImpactUsd: number;
}

export interface TokenMetrics {
  symbol: string;
  attackCount: number;
  attackers: string[];
  totalImpactUsd: number;
  averageImpactPercentage: number;
}

export interface TimeSeriesDataPoint {
  timestamp: string;
  value: number;
}
