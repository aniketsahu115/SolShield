import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/context/WalletContext';
import { FaWallet, FaCheck, FaExternalLinkAlt, FaDownload } from 'react-icons/fa';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { truncateAddress } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function WalletConnect() {
  const { wallet, connecting, connectWallet, disconnectWallet, availableWallets } = useWallet();
  const [walletDialogOpen, setWalletDialogOpen] = useState(false);
  
  const handleConnect = async (walletName?: string) => {
    await connectWallet(walletName);
    setWalletDialogOpen(false);
  };

  const handleDisconnect = () => {
    disconnectWallet();
  };

  // Check if any wallets are installed
  const hasInstalledWallets = availableWallets.some(wallet => wallet.installed);

  return (
    <div>
      {wallet.connected ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 bg-gray-800 border-gray-700 hover:bg-gray-700">
              <FaCheck className="text-green-400 text-xs" />
              <span className="text-white">{truncateAddress(wallet.publicKey || '')}</span>
              <span className="text-xs text-gray-400">({wallet.name})</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-gray-800 border-gray-700 text-white">
            <DropdownMenuItem 
              className="cursor-pointer hover:bg-gray-700"
              onClick={handleDisconnect}
            >
              Disconnect Wallet
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Dialog open={walletDialogOpen} onOpenChange={setWalletDialogOpen}>
          <DialogTrigger asChild>
            <Button
              disabled={connecting}
              className="bg-primary hover:bg-opacity-90 text-white flex items-center gap-2"
            >
              {connecting ? (
                'Connecting...'
              ) : (
                <>
                  <FaWallet className="text-sm" />
                  <span>Connect Wallet</span>
                </>
              )}
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-800 border-gray-700 text-white">
            <DialogHeader>
              <DialogTitle className="text-xl">Connect a Wallet</DialogTitle>
              <DialogDescription className="text-gray-400">
                Choose a wallet to connect to SolShield
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <div className="space-y-3">
                {hasInstalledWallets ? (
                  <>
                    <h3 className="text-sm font-medium text-gray-400">INSTALLED WALLETS</h3>
                    <div className="space-y-2">
                      {availableWallets
                        .filter(wallet => wallet.installed)
                        .map(wallet => (
                          <button
                            key={wallet.name}
                            onClick={() => handleConnect(wallet.name)}
                            className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
                          >
                            <div className="flex items-center">
                              <img 
                                src={wallet.icon} 
                                alt={`${wallet.name} logo`} 
                                className="h-6 w-6 mr-3"
                                onError={(e) => {
                                  // Use a fallback if image fails to load
                                  (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXdhbGxldCI+PHBhdGggZD0iTTIxIDEyVjd2LS4yNEE2LjI0IDYuMjQgMCAwIDAgMTIgMyIvPjxwYXRoIGQ9Ik0xMiAzcDAgN2MwIDEuNjYgMS45OCAzIDE4IDN2LTcuMjRzLjA0LTIuNjItLjU0LTMuNjhhMy43MSAzLjcxIDAgMCAwLTEuMjctMS40NCAzLjc2IDMuNzYgMCAwIDAtMS44My0uNjRIMTZ6Ii8+PHBhdGggZD0iTTIxIDE0YzotMiA1LTMgMy01IiBzdHJva2U9Im5vbmUiLz48cGF0aCBkPSJNMyA4YTQgNCAwIDAgMSA0LTQgNCA0IDAgMCAxIDQgNCA0IDQgMCAwIDEtNCA0IDQgNCAwIDAgMS00LTQiIHN0cm9rZT0ibm9uZSIvPjxwYXRoIGQ9Ik0zIDdoMTJhMyAzIDAgMCAxIDMgM3Y3YTMgMyAwIDAgMS0zIDNIM2EzIDMgMCAwIDEtMy0zVjEwYTMgMyAwIDAgMSAzLTN6Ii8+PHBhdGggZD0iTTggMTVoMSIvPjwvc3ZnPgo=';
                                }}
                              />
                              <span className="font-medium">{wallet.name}</span>
                            </div>
                            <span className="text-primary">Connect</span>
                          </button>
                        ))}
                    </div>
                  </>
                ) : null}
                
                <h3 className="text-sm font-medium text-gray-400 mt-4">GET A WALLET</h3>
                <div className="space-y-2">
                  {availableWallets
                    .filter(wallet => !wallet.installed)
                    .map(wallet => (
                      <a
                        key={wallet.name}
                        href={wallet.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
                      >
                        <div className="flex items-center">
                          <img 
                            src={wallet.icon} 
                            alt={`${wallet.name} logo`} 
                            className="h-6 w-6 mr-3" 
                            onError={(e) => {
                              // Use a fallback if image fails to load
                              (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXdhbGxldCI+PHBhdGggZD0iTTIxIDEyVjd2LS4yNEE2LjI0IDYuMjQgMCAwIDAgMTIgMyIvPjxwYXRoIGQ9Ik0xMiAzcDAgN2MwIDEuNjYgMS45OCAzIDE4IDN2LTcuMjRzLjA0LTIuNjItLjU0LTMuNjhhMy43MSAzLjcxIDAgMCAwLTEuMjctMS40NCAzLjc2IDMuNzYgMCAwIDAtMS44My0uNjRIMTZ6Ii8+PHBhdGggZD0iTTIxIDE0Yzotai0yIDUtj6gDMtMCBpLTQgNCBBIDQgNCAwIDAgMS00LTQiIHN0cm9rZT0ibm9uZSIvPjxwYXRoIGQ9Ik0zIDdoMTJhMyAzIDAgMCAxIDMgM3Y3YTMgMyAwIDAgMS0zIDNIM2EzIDMgMCAwIDEtMy0zVjEwYTMgMyAwIDAgMSAzLTN6Ii8+PHBhdGggZD0iTTggMTVoMSIvPjwvc3ZnPgo=';
                            }}
                          />
                          <span className="font-medium">{wallet.name}</span>
                        </div>
                        <div className="flex items-center text-xs text-blue-400">
                          <FaDownload className="mr-1" />
                          <span>Install</span>
                          <FaExternalLinkAlt className="ml-1 text-[10px]" />
                        </div>
                      </a>
                    ))}
                </div>
              </div>
              
              <div className="mt-6 text-xs text-gray-400 text-center">
                By connecting a wallet, you agree to SolShield's Terms of Service and Privacy Policy
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}