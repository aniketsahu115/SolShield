import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer } from "ws";
import { storage } from "./storage";
import { transactionAnalysisRequestSchema, MempoolAlert, MempoolStats, TokenMetrics, TimeSeriesDataPoint } from "@shared/schema";
import { mempoolMonitor } from "./mempool-monitor";

// Mock data for visualization dashboard (would be replaced with real data in production)
const getMockMempoolStats = (): MempoolStats => {
  return {
    totalAlertsToday: 23,
    activeAttackers: 7,
    mostImpactedPools: [
      { name: "Orca USDC/SOL", alertCount: 12 },
      { name: "Raydium USDT/SOL", alertCount: 8 },
      { name: "Jupiter USDC/BONK", alertCount: 3 }
    ],
    recentImpactUsd: 4578.32
  };
};

const getMockTokenMetrics = (): TokenMetrics[] => {
  return [
    {
      symbol: "SOL/USDC",
      attackCount: 18,
      attackers: ["8JZqZU7vSNwQCgBtMVrKDrLvEYmUp3p5AHQ6BmE9GTfd", "3aR2YYGgCMZqyiWzQFMUUPFVXhRV4S3EXzjCdNfBEwJZ"],
      totalImpactUsd: 2530.45,
      averageImpactPercentage: 0.87
    },
    {
      symbol: "SOL/USDT",
      attackCount: 9,
      attackers: ["9yuTgKkAkiHzwGpacNUBzfANwK2eXHp5GJXRnTXQkRPk"],
      totalImpactUsd: 1245.20,
      averageImpactPercentage: 0.72
    },
    {
      symbol: "BONK/USDC",
      attackCount: 5,
      attackers: ["8JZqZU7vSNwQCgBtMVrKDrLvEYmUp3p5AHQ6BmE9GTfd"],
      totalImpactUsd: 802.67,
      averageImpactPercentage: 1.24
    }
  ];
};

const getMockTimeSeriesData = (): TimeSeriesDataPoint[] => {
  const data = [];
  const now = new Date();
  
  for (let i = 0; i < 24; i++) {
    const timestamp = new Date(now.getTime() - (23 - i) * 60 * 60 * 1000);
    data.push({
      timestamp: timestamp.toISOString(),
      value: Math.floor(Math.random() * 10)
    });
  }
  
  return data;
};

const getMockRecentAlerts = (limit: number): MempoolAlert[] => {
  return Array(limit).fill(0).map((_, i) => ({
    id: `alert-${i}`,
    type: i % 2 === 0 ? SuspiciousPatternType.POTENTIAL_SANDWICH : SuspiciousPatternType.KNOWN_ATTACKER,
    timestamp: new Date(Date.now() - i * 60000).toISOString(),
    confidence: 0.7 + (Math.random() * 0.3),
    transactions: [
      `5Vwk2RJ5MCc68XrQdJB7gQm5g3K1sCHJwbZojRQp1BDiJf69vWwpS8rq1UHYwJxKZqNyPSPuTnmV9QT6WxnH8Thk`,
      `42HjTr8CbAMC5KW5AEVy1LbY67sHuLYy9SrCrE9K48TaGgJwwgTNnUFJgJszdJmTKQK42qLPR5RSCyAbmUsY8bv8`
    ],
    targetTransaction: i % 2 === 0 ? `42HjTr8CbAMC5KW5AEVy1LbY67sHuLYy9SrCrE9K48TaGgJwwgTNnUFJgJszdJmTKQK42qLPR5RSCyAbmUsY8bv8` : undefined,
    description: i % 2 === 0 ? 'Potential sandwich attack pattern detected' : 'Transaction from known attacker address',
    impactedTokens: ['SOL/USDC'],
    estimatedImpact: {
      sol: 0.05 + (Math.random() * 0.2),
      usd: 4.25 + (Math.random() * 15)
    }
  }));
};

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);
  
  // Initialize WebSocket server for real-time monitoring
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });
  
  wss.on('connection', (ws) => {
    console.log('Client connected to WebSocket');
    
    ws.on('message', (message) => {
      try {
        const data = JSON.parse(message.toString());
        console.log('Received message:', data);
        
        // Handle different message types
        if (data.type === 'subscribe' && data.wallet) {
          // Subscribe to wallet monitoring
          console.log(`Subscribing to wallet: ${data.wallet}`);
          ws.send(JSON.stringify({ type: 'subscription_status', status: 'success', wallet: data.wallet }));
        }
      } catch (error) {
        console.error('Error processing WebSocket message:', error);
      }
    });
    
    ws.on('close', () => {
      console.log('Client disconnected from WebSocket');
    });
    
    // Send initial data to the client
    ws.send(JSON.stringify({ 
      type: 'init',
      data: {
        alerts: getMockRecentAlerts(5),
        stats: getMockMempoolStats()
      }
    }));
    
    // Simulate real-time alerts (in a real implementation, these would come from actual monitoring)
    const alertInterval = setInterval(() => {
      if (ws.readyState === ws.OPEN) {
        const randomAlert = getMockRecentAlerts(1)[0];
        ws.send(JSON.stringify({
          type: 'new_alert',
          data: randomAlert
        }));
      } else {
        clearInterval(alertInterval);
      }
    }, 15000); // Send a new alert every 15 seconds
  });
  
  // Initialize the mempool monitor
  mempoolMonitor.start(httpServer);

  // Original API routes for sandwich attack detection
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
  
  // New API endpoints for dashboard and real-time monitoring
  
  // Get mempool monitoring statistics
  app.get("/api/mempool/stats", async (req, res) => {
    try {
      // In a real implementation, this would calculate stats from the database
      const stats = getMockMempoolStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching mempool stats:", error);
      res.status(500).json({ 
        message: "An error occurred while retrieving mempool statistics"
      });
    }
  });
  
  // Get recent mempool alerts
  app.get("/api/mempool/alerts", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const alerts = getMockRecentAlerts(limit);
      res.json({ alerts });
    } catch (error) {
      console.error("Error fetching mempool alerts:", error);
      res.status(500).json({ 
        message: "An error occurred while retrieving mempool alerts"
      });
    }
  });
  
  // Get token metrics for visualization
  app.get("/api/dashboard/token-metrics", async (req, res) => {
    try {
      const metrics = getMockTokenMetrics();
      res.json({ metrics });
    } catch (error) {
      console.error("Error fetching token metrics:", error);
      res.status(500).json({ 
        message: "An error occurred while retrieving token metrics"
      });
    }
  });
  
  // Get time series data for charts
  app.get("/api/dashboard/time-series", async (req, res) => {
    try {
      const type = req.query.type as string || 'attacks';
      const period = req.query.period as string || 'day';
      const data = getMockTimeSeriesData();
      res.json({ data });
    } catch (error) {
      console.error("Error fetching time series data:", error);
      res.status(500).json({ 
        message: "An error occurred while retrieving time series data"
      });
    }
  });

  return httpServer;
}
