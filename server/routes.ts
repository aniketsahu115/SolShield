import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { transactionAnalysisRequestSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for sandwich attack detection
  app.post("/api/detect-sandwich", async (req, res) => {
    try {
      // Validate request body
      const parseResult = transactionAnalysisRequestSchema.safeParse(req.body);
      
      if (!parseResult.success) {
        return res.status(400).json({ 
          message: "Invalid request data", 
          errors: parseResult.error.format() 
        });
      }
      
      const requestData = parseResult.data;
      
      // Perform sandwich attack detection
      const detectionResult = await storage.detectSandwichAttack(requestData);
      
      return res.status(200).json(detectionResult);
    } catch (error) {
      console.error("Error in sandwich detection:", error);
      return res.status(500).json({ 
        message: "An error occurred while analyzing the transaction"
      });
    }
  });
  
  // Get transaction analysis by transaction ID
  app.get("/api/transaction-analysis/:transactionId", async (req, res) => {
    try {
      const { transactionId } = req.params;
      
      if (!transactionId) {
        return res.status(400).json({ message: "Transaction ID is required" });
      }
      
      const analysis = await storage.getTransactionAnalysisByTransactionId(transactionId);
      
      if (!analysis) {
        return res.status(404).json({ message: "Transaction analysis not found" });
      }
      
      return res.status(200).json(analysis);
    } catch (error) {
      console.error("Error retrieving transaction analysis:", error);
      return res.status(500).json({ 
        message: "An error occurred while retrieving the transaction analysis"
      });
    }
  });
  
  // Get transaction analyses by wallet address
  app.get("/api/wallet-analyses/:walletAddress", async (req, res) => {
    try {
      const { walletAddress } = req.params;
      
      if (!walletAddress) {
        return res.status(400).json({ message: "Wallet address is required" });
      }
      
      const analyses = await storage.getTransactionAnalysesByWalletAddress(walletAddress);
      
      return res.status(200).json(analyses);
    } catch (error) {
      console.error("Error retrieving wallet analyses:", error);
      return res.status(500).json({
        message: "An error occurred while retrieving wallet analyses"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
