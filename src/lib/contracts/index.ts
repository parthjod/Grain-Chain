// Import contract types and ABI
import { Contract, formatEther, Interface, Provider, Signer } from 'ethers';

// ProduceChain contract ABI
export const ProduceChainABI = [
  "function registerProduce(string produceId, address farmer, uint256 timestamp, string hash)",
  "function updateStatus(string produceId, address distributor, uint256 timestamp, string newStatus)",
  "function retailEntry(string produceId, address retailer, uint256 price, uint256 timestamp)",
  "function getProduce(string produceId) view returns (tuple(string produceId, address farmer, uint256 timestamp, string hash, string status, address currentHolder, uint256 price, bool isSold))",
  "function getHistory(string produceId) view returns (tuple(string produceId, address actor, string action, uint256 timestamp, string details)[])",
  "function getHistoryLength(string produceId) view returns (uint256)",
  "event ProduceRegistered(string indexed produceId, address indexed farmer, uint256 timestamp, string hash)",
  "event StatusUpdated(string indexed produceId, address indexed distributor, uint256 timestamp, string newStatus)",
  "event RetailEntry(string indexed produceId, address indexed retailer, uint256 price, uint256 timestamp)"
];

// Contract factory types
export const ProduceChain__factory = {
  createInterface: () => new Interface(ProduceChainABI),
  connect: (address: string, signerOrProvider: Signer | Provider) => {
    return new Contract(address, ProduceChainABI, signerOrProvider);
  }
};

// Contract configuration
export const CONTRACT_CONFIG = {
  address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000',
  abi: ProduceChainABI
};

// Network configuration
export const NETWORK_CONFIG = {
  sepolia: {
    chainId: 11155111,
    name: 'Sepolia',
    rpcUrl: process.env.NEXT_PUBLIC_SEPOLIA_URL || '',
    blockExplorer: 'https://sepolia.etherscan.io'
  },
  localhost: {
    chainId: 31337,
    name: 'Localhost',
    rpcUrl: 'http://localhost:8545',
    blockExplorer: ''
  }
};

// Helper functions
export const getContract = (signerOrProvider: Signer | Provider) => {
  return new Contract(CONTRACT_CONFIG.address, CONTRACT_CONFIG.abi, signerOrProvider);
};

export const formatProduceData = (produceData: any) => {
  return {
    produceId: produceData.produceId,
    farmer: produceData.farmer,
    timestamp: new Date(produceData.timestamp * 1000),
    hash: produceData.hash,
    status: produceData.status,
    currentHolder: produceData.currentHolder,
    price: formatEther(produceData.price),
    isSold: produceData.isSold
  };
};

export const formatHistoryData = (historyData: any[]) => {
  return historyData.map(entry => ({
    produceId: entry.produceId,
    actor: entry.actor,
    action: entry.action,
    timestamp: new Date(entry.timestamp * 1000),
    details: entry.details
  }));
};