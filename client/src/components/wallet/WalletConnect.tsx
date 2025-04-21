import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/context/WalletContext';
import { FaWallet, FaCheck, FaArrowRight } from 'react-icons/fa';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { truncateAddress } from '@/lib/utils';

export default function WalletConnect() {
  const { wallet, connecting, connectWallet, disconnectWallet } = useWallet();
  
  const handleConnect = async () => {
    await connectWallet();
  };

  const handleDisconnect = () => {
    disconnectWallet();
  };

  return (
    <div>
      {wallet.connected ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 bg-gray-800 border-gray-700 hover:bg-gray-700">
              <FaCheck className="text-green-400 text-xs" />
              <span className="text-white">{truncateAddress(wallet.publicKey || '')}</span>
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
        <Button
          onClick={handleConnect}
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
      )}
    </div>
  );
}