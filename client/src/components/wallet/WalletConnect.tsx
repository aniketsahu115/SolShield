import { useState } from "react";
import { useWallet } from "@/context/WalletContext";
import { Button } from "@/components/ui/button";
import { truncateAddress } from "@/lib/utils";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { motion } from "framer-motion";

export default function WalletConnect() {
  const { wallet, connecting, connectWallet, disconnectWallet, availableWallets } = useWallet();
  const [walletDialogOpen, setWalletDialogOpen] = useState(false);

  const handleConnect = async (walletName?: string) => {
    await connectWallet(walletName);
    setWalletDialogOpen(false);
  };

  return (
    <>
      {wallet.connected ? (
        <div className="flex items-center">
          <div className="flex items-center rounded-lg bg-gray-800 p-1 pr-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 mr-2">
              <span className="h-2 w-2 rounded-full bg-primary"></span>
            </div>
            <span className="text-sm mr-2 font-medium">
              {truncateAddress(wallet.publicKey || "")}
            </span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={disconnectWallet}
            className="ml-2 text-xs h-8 px-2"
          >
            Disconnect
          </Button>
        </div>
      ) : (
        <Dialog open={walletDialogOpen} onOpenChange={setWalletDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary hover:to-blue-500 transition-all"
              disabled={connecting}
            >
              {connecting ? "Connecting..." : "Connect Wallet"}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Connect your wallet</DialogTitle>
              <DialogDescription>
                Choose a wallet to connect to SolShield. If you don't have a wallet yet, you can select a provider and create one.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {availableWallets.map((walletOption, index) => (
                <motion.div 
                  key={walletOption.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.1 }}
                >
                  <Button
                    variant={walletOption.installed ? "default" : "outline"}
                    className="w-full justify-between px-4 py-6 h-auto"
                    onClick={() => handleConnect(walletOption.name)}
                  >
                    <div className="flex items-center">
                      <img 
                        src={walletOption.icon} 
                        alt={walletOption.name} 
                        className="w-6 h-6 mr-3"
                      />
                      <div className="text-left">
                        <p className="font-medium">{walletOption.name}</p>
                        {!walletOption.installed && (
                          <p className="text-xs text-muted-foreground">Not installed - will redirect</p>
                        )}
                      </div>
                    </div>
                    {walletOption.installed && (
                      <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                        Installed
                      </span>
                    )}
                  </Button>
                </motion.div>
              ))}
            </div>
            <div className="flex flex-col space-y-3 border-t border-gray-800 pt-4 text-center text-sm text-gray-400">
              <p>New to Solana wallets?</p>
              <div className="grid grid-cols-3 gap-2">
                {availableWallets.map(wallet => (
                  <a 
                    key={wallet.name}
                    href={wallet.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <img src={wallet.icon} alt={wallet.name} className="w-8 h-8 mb-1" />
                    <span className="text-xs">{wallet.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}