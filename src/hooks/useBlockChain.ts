import { useState, useEffect } from 'react';
import { blockchainService } from '@/lib/blockchain';

export function useBlockchain() {
  const [account, setAccount] = useState<string>('');
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const connectWallet = async () => {
    setIsLoading(true);
    setError('');

    try {
      const connectedAccount = await blockchainService.connectWallet();
      setAccount(connectedAccount);
      setIsConnected(true);
      
      // Switch to Sepolia network
      await blockchainService.switchToSepolia();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const registerProduce = async (data: {
    produceId: string;
    farmer: string;
    produceType: string;
    origin: string;
    harvestDate: string;
  }) => {
    setIsLoading(true);
    setError('');

    try {
      const hash = blockchainService.generateProduceHash(data);
      const timestamp = Math.floor(Date.now() / 1000);
      
      const tx = await blockchainService.registerProduce(
        data.produceId,
        data.farmer,
        timestamp,
        hash
      );

      await tx.wait();
      return { success: true, transactionHash: tx.hash, hash };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (data: {
    produceId: string;
    distributor: string;
    newStatus: string;
  }) => {
    setIsLoading(true);
    setError('');

    try {
      const timestamp = Math.floor(Date.now() / 1000);
      
      const tx = await blockchainService.updateStatus(
        data.produceId,
        data.distributor,
        timestamp,
        data.newStatus
      );

      await tx.wait();
      return { success: true, transactionHash: tx.hash };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  const createRetailEntry = async (data: {
    produceId: string;
    retailer: string;
    price: number;
  }) => {
    setIsLoading(true);
    setError('');

    try {
      const timestamp = Math.floor(Date.now() / 1000);
      
      const tx = await blockchainService.retailEntry(
        data.produceId,
        data.retailer,
        data.price,
        timestamp
      );

      await tx.wait();
      return { success: true, transactionHash: tx.hash };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  const getProduce = async (produceId: string) => {
    try {
      const produce = await blockchainService.getProduce(produceId);
      return { success: true, produce };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const getHistory = async (produceId: string) => {
    try {
      const history = await blockchainService.getHistory(produceId);
      return { success: true, history };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  // Check if wallet is already connected on component mount
  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window !== 'undefined' && window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            setIsConnected(true);
          }
        } catch (err) {
          console.error('Error checking wallet connection:', err);
        }
      }
    };

    checkConnection();

    // Listen for account changes
    if (typeof window !== 'undefined' && window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setIsConnected(true);
        } else {
          setAccount('');
          setIsConnected(false);
        }
      });
    }

    // Clean up
    return () => {
      blockchainService.removeAllListeners();
    };
  }, []);

  return {
    account,
    isConnected,
    isLoading,
    error,
    connectWallet,
    registerProduce,
    updateStatus,
    createRetailEntry,
    getProduce,
    getHistory
  };
}