import { Connection, PublicKey, VersionedTransactionResponse, Context } from '@solana/web3.js';
import WebSocket from 'ws';
import { TransactionAnalysis, SuspiciousPatternType, InsertTransactionAnalysis } from '@shared/schema';
import { storage } from './storage';

// Define interfaces for mempool monitoring
interface MempoolTransaction {
  signature: string;
  slot: number;
  timestamp: number;
  sender: string;
  programIds: string[];
  tokenAccounts?: string[];
}

interface SuspiciousPattern {
  type: SuspiciousPatternType;
  confidence: number;
  relatedTransactions: string[];
  potentialTarget?: string;
  description: string;
}

export class MempoolMonitor {
  private connection: Connection;
  private wsServer: WebSocket.Server | null = null;
  private clients: Set<WebSocket> = new Set();
  private recentTransactions: Map<string, MempoolTransaction> = new Map();
  private knownAttackers: Set<string> = new Set();
  private monitoredWallets: Set<string> = new Set();
  private isMonitoring: boolean = false;
  
  // Time window for analyzing patterns (in milliseconds)
  private readonly ANALYSIS_WINDOW_MS = 10000; // 10 seconds
  
  constructor(rpcUrl: string) {
    this.connection = new Connection(rpcUrl);
    
    // Initialize with some known attacker addresses (would be stored in a database in production)
    this.knownAttackers = new Set([
      '8JZqZU7vSNwQCgBtMVrKDrLvEYmUp3p5AHQ6BmE9GTfd',
      '9yuTgKkAkiHzwGpacNUBzfANwK2eXHp5GJXRnTXQkRPk'
    ]);
  }

  public start(server: any): void {
    if (this.isMonitoring) return;
    
    // Create WebSocket server for real-time updates
    this.wsServer = new WebSocket.Server({ server, path: '/ws/mempool' });
    
    this.wsServer.on('connection', (ws) => {
      this.clients.add(ws);
      
      // Handle client-specific messages (e.g., subscribe to wallet)
      ws.on('message', (message) => {
        try {
          const data = JSON.parse(message.toString());
          
          if (data.type === 'subscribe' && data.wallet) {
            this.subscribeToWallet(data.wallet);
            ws.send(JSON.stringify({ 
              type: 'subscription', 
              status: 'success', 
              wallet: data.wallet 
            }));
          }
        } catch (error) {
          console.error('Error handling ws message:', error);
        }
      });
      
      // Remove client when disconnected
      ws.on('close', () => {
        this.clients.delete(ws);
      });
      
      // Send initial state to new client
      this.sendCurrentState(ws);
    });
    
    // Start transaction monitoring
    this.startMonitoring();
  }
  
  private async startMonitoring(): Promise<void> {
    this.isMonitoring = true;
    
    // Subscribe to transaction confirmations
    const transactionSubscriptionId = this.connection.onLogs(
      new PublicKey('11111111111111111111111111111111'), // System program (catches most transactions)
      (logs, ctx) => {
        // Process incoming transaction
        this.processTransaction(ctx.signature);
      },
      'confirmed'
    );
    
    // Periodically analyze patterns
    setInterval(() => {
      this.analyzePatterns();
    }, 5000);
    
    // Clean up old transactions periodically
    setInterval(() => {
      this.cleanupOldTransactions();
    }, 30000);
    
    console.log('Mempool monitoring started');
  }
  
  private async processTransaction(signature: string): Promise<void> {
    try {
      // Fetch transaction details
      const txInfo = await this.connection.getTransaction(signature, {
        maxSupportedTransactionVersion: 0,
      });
      
      if (!txInfo) return;
      
      // Extract relevant information
      const sender = txInfo.transaction.message.accountKeys[0].toString();
      const programIds = this.extractProgramIds(txInfo);
      const tokenAccounts = this.extractTokenAccounts(txInfo);
      
      // Create mempool transaction record
      const mempoolTx: MempoolTransaction = {
        signature,
        slot: txInfo.slot,
        timestamp: Date.now(),
        sender,
        programIds,
        tokenAccounts,
      };
      
      // Add to recent transactions
      this.recentTransactions.set(signature, mempoolTx);
      
      // Check if this is from a known attacker
      if (this.knownAttackers.has(sender)) {
        this.broadcastAlert({
          type: SuspiciousPatternType.KNOWN_ATTACKER,
          confidence: 0.95,
          relatedTransactions: [signature],
          description: 'Transaction from known sandwich attacker address',
        });
      }
      
      // Check if any monitored wallets are involved
      if (this.monitoredWallets.has(sender)) {
        this.broadcastWalletActivity(sender, {
          type: 'transaction',
          signature,
          programIds,
        });
      }
      
      // Broadcast new transaction to clients
      this.broadcastNewTransaction(mempoolTx);
      
    } catch (error) {
      console.error('Error processing transaction:', error);
    }
  }
  
  private extractProgramIds(tx: VersionedTransactionResponse): string[] {
    // In a real implementation, we would extract all unique program IDs involved
    // Simplified for demo purposes
    return Array.from(
      new Set(
        tx.meta?.innerInstructions
          ?.flatMap(ix => ix.instructions)
          .map(ix => tx.transaction.message.accountKeys[ix.programIdIndex].toString()) || []
      )
    );
  }
  
  private extractTokenAccounts(tx: VersionedTransactionResponse): string[] {
    // In a real implementation, we would extract token accounts involved
    // This is a simplified version for demo purposes
    return [];
  }
  
  private analyzePatterns(): void {
    // Convert to array for easier filtering
    const txArray = Array.from(this.recentTransactions.values());
    
    // Sort by timestamp
    txArray.sort((a, b) => a.timestamp - b.timestamp);
    
    // Group transactions by token accounts (simplified)
    const groupedByToken: Map<string, MempoolTransaction[]> = new Map();
    
    // Analyze for rapid transactions in the same pool
    // This is a simplified pattern detection - real implementation would be more complex
    // and would include analysis of transaction data, price impacts, etc.
    txArray.forEach(tx => {
      if (tx.programIds.includes('SwaPpA9LAaLfeLi3a68M4DjnLqgtticKg6CnyNwgAC8')) {
        // Check for rapid sequential transactions from different senders
        const windowStart = tx.timestamp - 2000; // 2 seconds
        const windowEnd = tx.timestamp + 2000;
        
        const nearbyTxs = txArray.filter(t => 
          t.signature !== tx.signature && 
          t.timestamp >= windowStart && 
          t.timestamp <= windowEnd &&
          t.sender !== tx.sender &&
          t.programIds.includes('SwaPpA9LAaLfeLi3a68M4DjnLqgtticKg6CnyNwgAC8')
        );
        
        if (nearbyTxs.length >= 2) {
          // Potential sandwich pattern
          const relatedTxs = [tx.signature, ...nearbyTxs.map(t => t.signature)];
          
          this.broadcastAlert({
            type: SuspiciousPatternType.POTENTIAL_SANDWICH,
            confidence: 0.7,
            relatedTransactions: relatedTxs,
            potentialTarget: tx.signature,
            description: 'Potential sandwich attack pattern detected',
          });
          
          // Store analysis in database
          this.storeAnalysis(relatedTxs, tx.signature);
        }
      }
    });
  }
  
  private async storeAnalysis(signatures: string[], targetSignature: string): Promise<void> {
    try {
      const analysis = {
        transactionId: targetSignature,
        walletAddress: '',  // Would extract from transaction
        analysisResult: {
          isSandwich: true,
          confidence: 0.7,
          frontTx: signatures[0],
          targetTx: targetSignature,
          backTx: signatures[signatures.length - 1],
          valueImpact: {
            sol: 0.05,
            usd: 4.25
          },
          priceImpact: 0.8,
          timeFrame: 2,
          pool: 'unknown',  // Would extract from transaction
          attackerEstimatedProfit: {
            sol: 0.03,
            usd: 2.55
          }
        },
        timestamp: new Date()
      };
      
      // Store in database
      await storage.createTransactionAnalysis(analysis);
    } catch (error) {
      console.error('Error storing analysis:', error);
    }
  }
  
  private cleanupOldTransactions(): void {
    const cutoffTime = Date.now() - this.ANALYSIS_WINDOW_MS;
    
    for (const [signature, tx] of this.recentTransactions.entries()) {
      if (tx.timestamp < cutoffTime) {
        this.recentTransactions.delete(signature);
      }
    }
  }
  
  private subscribeToWallet(wallet: string): void {
    this.monitoredWallets.add(wallet);
  }
  
  private broadcastNewTransaction(tx: MempoolTransaction): void {
    const message = JSON.stringify({
      type: 'new_transaction',
      data: tx
    });
    
    this.broadcast(message);
  }
  
  private broadcastAlert(pattern: SuspiciousPattern): void {
    const message = JSON.stringify({
      type: 'alert',
      data: pattern
    });
    
    this.broadcast(message);
  }
  
  private broadcastWalletActivity(wallet: string, activity: any): void {
    const message = JSON.stringify({
      type: 'wallet_activity',
      wallet,
      data: activity
    });
    
    this.broadcast(message);
  }
  
  private sendCurrentState(client: WebSocket): void {
    const recentTxs = Array.from(this.recentTransactions.values())
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 20);
    
    client.send(JSON.stringify({
      type: 'init',
      data: {
        recentTransactions: recentTxs
      }
    }));
  }
  
  private broadcast(message: string): void {
    this.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }
}

// Export singleton instance
export const mempoolMonitor = new MempoolMonitor('https://api.mainnet-beta.solana.com');