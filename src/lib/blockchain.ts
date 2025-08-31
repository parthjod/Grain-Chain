import { ethers } from 'ethers';
import { CONTRACT_CONFIG, NETWORK_CONFIG, getContract } from './contracts';

class BlockchainService {
  private provider: ethers.providers.JsonRpcProvider | null = null;
  private signer: ethers.Signer | null = null;
  private contract: ethers.Contract | null = null;

  constructor() {
    this.initializeProvider();
  }

  private initializeProvider() {
    try {
      // For development, use local provider
      this.provider = new ethers.providers.JsonRpcProvider(NETWORK_CONFIG.localhost.rpcUrl);
      
      // If MetaMask is available, use it
      if (typeof window !== 'undefined' && window.ethereum) {
        this.provider = new ethers.providers.Web3Provider(window.ethereum);
        this.signer = this.provider.getSigner();
      }
    } catch (error) {
      console.error('Error initializing blockchain provider:', error);
    }
  }

  async connectWallet() {
    if (!window.ethereum) {
      throw new Error('MetaMask is not installed');
    }

    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts.length === 0) {
        throw new Error('No accounts found');
      }

      this.provider = new ethers.providers.Web3Provider(window.ethereum);
      this.signer = this.provider.getSigner();
      
      const network = await this.provider.getNetwork();
      console.log('Connected to network:', network);

      return accounts[0];
    } catch (error) {
      console.error('Error connecting wallet:', error);
      throw error;
    }
  }

  getContract() {
    if (!this.provider) {
      throw new Error('Provider not initialized');
    }

    const contractAddress = CONTRACT_CONFIG.address;
    if (contractAddress === '0x0000000000000000000000000000000000000000') {
      throw new Error('Contract address not configured');
    }

    return new ethers.Contract(contractAddress, CONTRACT_CONFIG.abi, this.signer || this.provider);
  }

  async registerProduce(
    produceId: string,
    farmer: string,
    timestamp: number,
    hash: string
  ) {
    try {
      const contract = this.getContract();
      const tx = await contract.registerProduce(produceId, farmer, timestamp, hash);
      await tx.wait();
      return tx;
    } catch (error) {
      console.error('Error registering produce:', error);
      throw error;
    }
  }

  async updateStatus(
    produceId: string,
    distributor: string,
    timestamp: number,
    newStatus: string
  ) {
    try {
      const contract = this.getContract();
      const tx = await contract.updateStatus(produceId, distributor, timestamp, newStatus);
      await tx.wait();
      return tx;
    } catch (error) {
      console.error('Error updating status:', error);
      throw error;
    }
  }

  async retailEntry(
    produceId: string,
    retailer: string,
    price: string,
    timestamp: number
  ) {
    try {
      const contract = this.getContract();
      const priceInWei = ethers.utils.parseEther(price);
      const tx = await contract.retailEntry(produceId, retailer, priceInWei, timestamp);
      await tx.wait();
      return tx;
    } catch (error) {
      console.error('Error creating retail entry:', error);
      throw error;
    }
  }

  async getProduce(produceId: string) {
    try {
      const contract = this.getContract();
      const produceData = await contract.getProduce(produceId);
      return produceData;
    } catch (error) {
      console.error('Error getting produce:', error);
      throw error;
    }
  }

  async getHistory(produceId: string) {
    try {
      const contract = this.getContract();
      const historyData = await contract.getHistory(produceId);
      return historyData;
    } catch (error) {
      console.error('Error getting history:', error);
      throw error;
    }
  }

  async getHistoryLength(produceId: string) {
    try {
      const contract = this.getContract();
      const length = await contract.getHistoryLength(produceId);
      return length.toNumber();
    } catch (error) {
      console.error('Error getting history length:', error);
      throw error;
    }
  }

  async generateHash(data: any) {
    try {
      const dataString = JSON.stringify(data);
      return ethers.utils.keccak256(ethers.utils.toUtf8Bytes(dataString));
    } catch (error) {
      console.error('Error generating hash:', error);
      throw error;
    }
  }

  isContractReady() {
    return CONTRACT_CONFIG.address !== '0x0000000000000000000000000000000000000000';
  }
}

export const blockchainService = new BlockchainService();
export default BlockchainService;