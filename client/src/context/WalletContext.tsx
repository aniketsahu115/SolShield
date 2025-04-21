import React, { createContext, useState, useEffect, useContext } from 'react';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';

// Interfaces
interface WalletContextProps {
  wallet: {
    connected: boolean;
    publicKey: string | null;
  };
  connecting: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const defaultContext: WalletContextProps = {
  wallet: {
    connected: false,
    publicKey: null,
  },
  connecting: false,
  connectWallet: async () => {},
  disconnectWallet: () => {},
};

// Create context
const WalletContext = createContext<WalletContextProps>(defaultContext);

// Custom hook to use wallet context
export const useWallet = () => useContext(WalletContext);

// PhantomProvider interface (simplified)
interface PhantomProvider {
  isPhantom?: boolean;
  connect: () => Promise<{ publicKey: { toString: () => string } }>;
  disconnect: () => Promise<void>;
  on: (event: string, callback: (...args: any[]) => void) => void;
  isConnected: boolean;
  publicKey?: { toString: () => string };
}

// Provider component
export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wallet, setWallet] = useState({
    connected: false,
    publicKey: null as string | null,
  });
  const [connecting, setConnecting] = useState(false);
  const [provider, setProvider] = useState<PhantomProvider | null>(null);

  // Check if Phantom is installed
  useEffect(() => {
    if ('phantom' in window) {
      const phantomProvider = (window as any).phantom?.solana;
      if (phantomProvider?.isPhantom) {
        setProvider(phantomProvider);

        // Attempt to reconnect if previously connected
        if (phantomProvider.isConnected && phantomProvider.publicKey) {
          setWallet({
            connected: true,
            publicKey: phantomProvider.publicKey.toString(),
          });
        }

        // Register event listeners
        phantomProvider.on('connect', (publicKey: { toString: () => string }) => {
          setWallet({
            connected: true,
            publicKey: publicKey.toString(),
          });
          setConnecting(false);
        });

        phantomProvider.on('disconnect', () => {
          setWallet({
            connected: false,
            publicKey: null,
          });
        });
      }
    }
  }, []);

  // Connect to wallet
  const connectWallet = async () => {
    if (!provider) {
      window.open('https://phantom.app/', '_blank');
      return;
    }

    setConnecting(true);
    try {
      await provider.connect();
    } catch (error) {
      console.error('Error connecting to wallet:', error);
      setConnecting(false);
    }
  };

  // Disconnect wallet
  const disconnectWallet = async () => {
    if (provider) {
      try {
        await provider.disconnect();
        setWallet({
          connected: false,
          publicKey: null,
        });
      } catch (error) {
        console.error('Error disconnecting from wallet:', error);
      }
    }
  };

  const contextValue: WalletContextProps = {
    wallet,
    connecting,
    connectWallet,
    disconnectWallet,
  };

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
};

export default WalletContext;