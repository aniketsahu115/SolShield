import React, { createContext, useState, useEffect, useContext } from 'react';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';

// Interfaces
interface WalletContextProps {
  wallet: {
    connected: boolean;
    publicKey: string | null;
    name: string | null;
  };
  connecting: boolean;
  availableWallets: AvailableWallet[];
  connectWallet: (walletName?: string) => Promise<void>;
  disconnectWallet: () => void;
}

interface AvailableWallet {
  name: string;
  icon: string;
  installed: boolean;
  url: string;
}

// Generic wallet provider interface
interface WalletProvider {
  connect: () => Promise<{ publicKey: { toString: () => string } }>;
  disconnect: () => Promise<void>;
  on: (event: string, callback: (...args: any[]) => void) => void;
  isConnected?: boolean;
  publicKey?: { toString: () => string };
}

// Wallet specifications
const SUPPORTED_WALLETS = [
  {
    name: 'Phantom',
    icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYwIiBoZWlnaHQ9IjE2MCIgdmlld0JveD0iMCAwIDE2MCAxNjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xNTQuNSA4MEMxNTQuNSAxMjAuMzE2IDEyMi4wOTMgMTUyLjcyMyA4MS43NzcyIDE1Mi43MjNDNDEuNDYxNCAxNTIuNzIzIDkuMDU0NyAxMjAuMzE2IDkuMDU0NyA4MEM5LjA1NDcgMzkuNjg0MiA0MS40NjE0IDcuMjc3MyA4MS43NzcyIDcuMjc3M0MxMjIuMDkzIDcuMjc3MyAxNTQuNSAzOS42ODQyIDE1NC41IDgwWiIgZmlsbD0iIzUwNUY5OCIvPgo8cGF0aCBkPSJNODAuMTUwNiAxMDMuNjg2QzgwLjE1MDYgMTAzLjY4NiA3NS42MTQyIDEwNy4wNzIgNzAuMDI5NCAxMDcuMDcyQzY0LjQ0NDcgMTA3LjA3MiA2Mi4xNTgzIDEwMy42ODYgNTMuMDM3IDEwMy42ODZDMjMuODc0NSAxMDMuNjg2IDIzLjg3NDUgNTQuOTg3MSA1My4wMzcgNTQuOTg3MUM1OS42NzAzIDU0Ljk4NzEgNjUuNDkzMiA1Ny4yNzM2IDcwLjAyOTQgNTcuMjczNkM3NC41NjU4IDU3LjI3MzYgODAuMTUwNiA1NC45ODcxIDg2Ljc4MzggNTQuOTg3MUMxMDcuMTU4IDU0Ljk4NzEgMTE2LjI3OSA2Ny4yNDQzIDExNi4yNzkgNjcuMjQ0M0MxMTYuMjc5IDY3LjI0NDMgOTQuODU1NyA3Mi44MjkgOTQuODU1NyA5My4yMDNDOTQuODU1NyAxMTQuNjI3IDEyMS44OTMgMTE0LjYyNyAxMjEuODkzIDExNC42MjdDMTIxLjg5MyAxMTQuNjI3IDEyMS44OTMgOTMuMjAzIDEzNS4xOTkgOTMuMjAzIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjExLjA5MDYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K',
    url: 'https://phantom.app/',
    getProvider: () => (window as any).phantom?.solana,
    checkInstalled: () => 'phantom' in window && !!(window as any).phantom?.solana?.isPhantom,
  },
  {
    name: 'Solflare',
    icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0wLjczODI4MSAyLjQzNDYyQzAuNzM4MjgxIDEuNTI3OCAxLjQ4MjY5IDAuNzgzMzg1IDIuMzg5NTEgMC43ODMzODVIMTkuMDU3QzE5Ljk2MzggMC43ODMzODUgMjAuNzA4MiAxLjUyNzggMjAuNzA4MiAyLjQzNDYyVjE5Ljg0ODNDMjAuNzA4MiAyMC43NTUxIDE5Ljk2MzggMjEuNDk5NSAxOS4wNTcgMjEuNDk5NUgyLjM4OTUxQzEuNDgyNjkgMjEuNDk5NSAwLjczODI4MSAyMC43NTUxIDAuNzM4MjgxIDE5Ljg0ODNWMi40MzQ2MloiIGZpbGw9InVybCgjcGFpbnQwX2xpbmVhcl8xNDA3XzMpIi8+CjxwYXRoIGQ9Ik05LjQwNzQ0IDE1LjEwOTFWMTIuODA0NUw1Ljk3MDcgMTAuNzg5MlY3LjU5MDgyTDkuNDA3NDQgNS41OTQ3M0wxMi44NjMgNy41OTA4MlYxMC43ODkyTDkuNjg5OTMgMTIuNTk2OVYxMi44MDQ1VjE0LjAxODJWMTcuMDg2M0wxMi44NjMgMTkuMDgzMlYxNS4xMDkxSDkuNDA3NDRaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMTYuMzA3MSAxNS4xMDkxVjEyLjgwNDVMMTIuODYzIDEwLjc4OTJWNy41OTA4MkwxNi4zMDcxIDUuNTk0NzNMMTkuNzU0IDcuNTkwODJMMTYuMzA3MSA5LjU4NTE1VjEyLjgwNDVIOTIuNTgzM1YxNy4wNTA0TDE2LjMwNzEgMTUuMTA5MVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xOS43NTQgMTUuMTA5MUwxNi4zMDcxIDE3LjA4NjNWMTUuMTA5MUgxOS43NTRaIiBmaWxsPSJ3aGl0ZSIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDBfbGluZWFyXzE0MDdfMyIgeDE9IjEwLjcyMzIiIHkxPSIwLjc4MzM4NSIgeDI9IjEwLjcyMzIiIHkyPSIyMS40OTk1IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiNGRkM0NkIiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRkY5NzNDIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg==',
    url: 'https://solflare.com/',
    getProvider: () => (window as any).solflare,
    checkInstalled: () => 'solflare' in window && !!(window as any).solflare?.isSolflare,
  },
  {
    name: 'Backpack',
    icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiByeD0iOCIgZmlsbD0iIzk5NDVGRiIvPgo8cGF0aCBkPSJNMTcuMDU1IDEyLjY2N1YxNi4wMDFDMTcuMDU1IDE2LjM2NiAxNi43NTQgMTYuNjY3IDE2LjM4OCAxNi42NjdINy42MTFDNy4yNDYgMTYuNjY3IDYuOTQ0IDE2LjM2NiA2Ljk0NCAxNi4wMDFWMTIuNjY3SDYuMjc3QzUuOTEyIDEyLjY2NyA1LjYxMSAxMi4zNjUgNS42MTEgMTJWOS4zMzM1QzUuNjExIDguNTQxMSA2LjEyNyA3Ljg0MiA2Ljg3NCA3LjU5OTVMNi43NzYgNi44MDg3QzYuNzE4IDYuMzc5MiA3LjAxMyA1Ljk4MjYgNy40NDMgNS45MjQ2QzcuODcyIDUuODY2IDguMjY5IDYuMTYxOCA4LjMyNyA2LjU5MTNMOCs4LjQxNiA3LjMzMzVIMTUuNUwxNS41ODkgNi41OTEzQzE1LjY0NyA2LjE2MTggMTYuMDQ0IDUuODY2IDE2LjQ3NCA1LjkyNDZDMTYuOTAzIDUuOTgyNiAxNy4xOTkgNi4zNzkyIDE3LjE0IDYuODA4N0wxNy4wNDMgNy41OTk1QzE3Ljc5IDcuODQyIDE4LjMwNSA4LjU0MTEgMTguMzA1IDkuMzMzNVYxMkMxOC4zMDUgMTIuMzY1IDE4LjAwNSAxMi42NjcgMTcuNjM5IDEyLjY2N0gxNy4wNTVaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K',
    url: 'https://backpack.app/',
    getProvider: () => (window as any).backpack?.solana,
    checkInstalled: () => 'backpack' in window && !!(window as any).backpack?.solana,
  }
];

const defaultContext: WalletContextProps = {
  wallet: {
    connected: false,
    publicKey: null,
    name: null,
  },
  connecting: false,
  availableWallets: [],
  connectWallet: async () => {},
  disconnectWallet: () => {},
};

// Create context
const WalletContext = createContext<WalletContextProps>(defaultContext);

// Custom hook to use wallet context
export const useWallet = () => useContext(WalletContext);

// Provider component
export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wallet, setWallet] = useState({
    connected: false,
    publicKey: null as string | null,
    name: null as string | null,
  });
  const [connecting, setConnecting] = useState(false);
  const [activeProvider, setActiveProvider] = useState<WalletProvider | null>(null);
  const [activeWalletName, setActiveWalletName] = useState<string | null>(null);
  const [availableWallets, setAvailableWallets] = useState<AvailableWallet[]>([]);

  // Check for installed wallets
  useEffect(() => {
    const wallets = SUPPORTED_WALLETS.map(wallet => ({
      name: wallet.name,
      icon: wallet.icon,
      installed: wallet.checkInstalled(),
      url: wallet.url,
    }));
    
    setAvailableWallets(wallets);
    
    // Auto connect to previously used wallet if available
    const lastWalletName = localStorage.getItem('lastUsedWallet');
    if (lastWalletName) {
      const walletConfig = SUPPORTED_WALLETS.find(w => w.name === lastWalletName);
      if (walletConfig && walletConfig.checkInstalled()) {
        const provider = walletConfig.getProvider();
        if (provider && provider.isConnected && provider.publicKey) {
          setActiveProvider(provider);
          setActiveWalletName(walletConfig.name);
          setWallet({
            connected: true,
            publicKey: provider.publicKey.toString(),
            name: walletConfig.name,
          });
          
          setupEventListeners(provider, walletConfig.name);
        }
      }
    }
  }, []);
  
  // Setup event listeners for a wallet provider
  const setupEventListeners = (provider: WalletProvider, walletName: string) => {
    provider.on('connect', (publicKey: { toString: () => string }) => {
      setWallet({
        connected: true,
        publicKey: publicKey.toString(),
        name: walletName,
      });
      setConnecting(false);
      localStorage.setItem('lastUsedWallet', walletName);
    });

    provider.on('disconnect', () => {
      setWallet({
        connected: false,
        publicKey: null,
        name: null,
      });
      setActiveWalletName(null);
    });
  };

  // Connect to a specific wallet or prompt user to choose
  const connectWallet = async (walletName?: string) => {
    setConnecting(true);
    
    try {
      let targetWallet;
      
      // If wallet name is provided, try to connect to that specific wallet
      if (walletName) {
        targetWallet = SUPPORTED_WALLETS.find(w => w.name === walletName);
        
        if (!targetWallet || !targetWallet.checkInstalled()) {
          window.open(targetWallet?.url || 'https://phantom.app/', '_blank');
          setConnecting(false);
          return;
        }
      } else {
        // If no wallet name is provided, use the first installed wallet
        targetWallet = SUPPORTED_WALLETS.find(w => w.checkInstalled());
        
        if (!targetWallet) {
          // If no wallets are installed, direct to Phantom by default
          window.open('https://phantom.app/', '_blank');
          setConnecting(false);
          return;
        }
      }
      
      const provider = targetWallet.getProvider();
      setActiveProvider(provider);
      setActiveWalletName(targetWallet.name);
      
      setupEventListeners(provider, targetWallet.name);
      
      await provider.connect();
    } catch (error) {
      console.error('Error connecting to wallet:', error);
      setConnecting(false);
      setActiveProvider(null);
      setActiveWalletName(null);
    }
  };

  // Disconnect wallet
  const disconnectWallet = async () => {
    if (activeProvider) {
      try {
        await activeProvider.disconnect();
        setWallet({
          connected: false,
          publicKey: null,
          name: null,
        });
        setActiveProvider(null);
        setActiveWalletName(null);
        localStorage.removeItem('lastUsedWallet');
      } catch (error) {
        console.error('Error disconnecting from wallet:', error);
      }
    }
  };

  const contextValue: WalletContextProps = {
    wallet,
    connecting,
    availableWallets,
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