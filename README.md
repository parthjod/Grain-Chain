GrainChain - Blockchain Supply Chain Transparency GrainChain is a comprehensive blockchain-powered supply chain transparency solution for agricultural products. Built with Next.js, TypeScript, and Ethereum blockchain, it provides end-to-end traceability from farm to table.

🌟 Features Farmer Portal: Register produce with detailed information and generate QR codes Distributor Portal: Update logistics and track shipments in real-time Retailer Portal: Confirm arrival, assess quality, and set retail prices Consumer Portal: Scan QR codes to trace complete product journey Blockchain Security: All data stored on Ethereum blockchain for immutability QR Code Integration: Easy scanning for instant access to product information Responsive Design: Mobile-friendly interface for all stakeholders 🚀 Quick Start Prerequisites Node.js 18+ npm or yarn MetaMask (for blockchain interactions) Hardhat (for smart contract development) Installation Clone the repository: bash

Line Wrapping

Collapse Copy 1 2 git clone <repository-url> cd grainchain Install dependencies: bash

Line Wrapping

Collapse Copy 1 npm install --legacy-peer-deps Set up environment variables: bash

Line Wrapping

Collapse Copy 1 cp .env.example .env Configure your .env file: env

Line Wrapping

Collapse Copy 1 2 3 4 5 6 7 8 9

# Blockchain Configuration

PRIVATE_KEY=your_wallet_private_key_here SEPOLIA_URL=https://sepolia.infura.io/v3/your_infura_key_here ETHERSCAN_API_KEY=your_etherscan_api_key_here NEXT_PUBLIC_SEPOLIA_URL=https://sepolia.infura.io/v3/your_infura_key_here NEXT_PUBLIC_CONTRACT_ADDRESS=0x...

# Database Configuration

DATABASE_URL=file:./db/custom.db Initialize database: bash

Line Wrapping

Collapse Copy 1 npm run db:push Start development server: bash

Line Wrapping

Collapse Copy 1 npm run dev 📱 Application Structure Pages / - Landing page with overview and portal access /farmer - Farmer registration form /distributor - Distributor logistics update /retailer - Retailer confirmation and pricing /consumer - Consumer QR scanner and timeline API Routes /api/produce/register - Register new produce /api/produce/update - Update produce status /api/produce/[id] - Get produce details by ID Smart Contract The ProduceChain.sol smart contract includes:

registerProduce() - Register new produce on blockchain updateStatus() - Update logistics status retailEntry() - Confirm retail sale and pricing getProduce() - Retrieve produce information getHistory() - Get complete journey history 🔧 Technology Stack Frontend Next.js 15 - React framework with App Router TypeScript - Type-safe JavaScript Tailwind CSS - Utility-first CSS framework shadcn/ui - Modern UI components Ethers.js - Ethereum blockchain interaction QR Code Scanner - React QR code scanning Backend Next.js API Routes - Serverless API endpoints Prisma - Database ORM SQLite - Local database (development) Blockchain Integration - Ethereum smart contracts Blockchain Solidity - Smart contract language Hardhat - Development environment Ethereum - Blockchain platform OpenZeppelin - Secure smart contract libraries 📊 Database Schema Produce Model produceId - Unique identifier farmer - Farmer's wallet address farmerName - Farmer's display name produceType - Type of produce (wheat, rice, etc.) quantity - Amount of produce unit - Measurement unit origin - Farm location harvestDate - When produce was harvested blockchainHash - Hash for verification status - Current status currentHolder - Current wallet address price - Retail price (if sold) isSold - Whether produce is sold qrCode - Generated QR code data History Model produceId - Associated produce actor - Wallet address of actor actorName - Display name of actor action - Action performed details - Additional details timestamp - When action occurred location - Location of action 🚢 Deployment Smart Contract Deployment Compile the contract: bash

Line Wrapping

Collapse Copy 1 npx hardhat compile Deploy to network: bash

Line Wrapping

Collapse Copy 1 npx hardhat run scripts/deploy.js --network sepolia Update .env with deployed contract address Frontend Deployment Build the application: bash

Line Wrapping

Collapse Copy 1 npm run build Start production server: bash

Line Wrapping

Collapse Copy 1 npm start Environment Setup For production deployment:

Infura/Alchemy: Set up your Ethereum node provider MetaMask: Configure wallet for blockchain interactions Database: Use production database (PostgreSQL/MySQL) Domain: Configure your domain and SSL 🔐 Security Features Blockchain Immutability: All transactions stored on Ethereum QR Code Verification: Tamper-proof product identification Wallet Authentication: Secure user authentication Data Encryption: Sensitive data protection Access Control: Role-based access management 📱 Mobile Responsiveness The application is fully responsive and works on:

Desktop: Full functionality with enhanced UI Tablet: Optimized layout for medium screens Mobile: Touch-friendly interface for on-the-go use 🧪 Testing Smart Contract Tests bash

Line Wrapping

Collapse Copy 1 npx hardhat test Frontend Tests bash

Line Wrapping

Collapse Copy 1 npm run test End-to-End Tests bash

Line Wrapping

Collapse Copy 1 npm run e2e 🤝 Contributing Fork the repository Create a feature branch Make your changes Add tests Submit a pull request 📄 License This project is licensed under the MIT License - see the LICENSE file for details.

🆘 Support For support and questions:

Create an issue on GitHub Check the documentation Join our community discussions 🎯 Roadmap Multi-chain support (Polygon, BSC) Advanced analytics dashboard Mobile app development Integration with existing ERP systems AI-powered quality assessment IoT device integration Carbon footprint tracking Built with ❤️ for transparent and sustainable agriculture
