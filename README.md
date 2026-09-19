██████╗ ██████╗  █████╗ ██╗███╗   ██╗   ██████╗██╗  ██╗ █████╗ ██╗███╗   ██╗
██╔════╝ ██╔══██╗██╔══██╗██║████╗  ██║  ██╔════╝██║  ██║██╔══██╗██║████╗  ██║
██║  ███╗██████╔╝███████║██║██╔██╗ ██║  ██║     ███████║███████║██║██╔██╗ ██║
██║   ██║██╔══██╗██╔══██║██║██║╚██╗██║  ██║     ██╔══██║██╔══██║██║██║╚██╗██║
╚██████╔╝██║  ██║██║  ██║██║██║ ╚████║  ██████╗██║  ██║██║  ██║██║██║ ╚████║
 ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝  ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝

GrainChain 🌾

Bringing Unprecedented Transparency to the Agricultural Supply Chain

Track your food from farm to table with the power of Blockchain.

GrainChain is a revolutionary platform that leverages blockchain technology to provide end-to-end traceability and transparency for agricultural products. Our mission is to build trust between consumers, retailers, distributors, and farmers by creating an immutable record of a product's journey.

📜Table of Contents

- ✨ Features
- 🚀 Quick Start
- 🔧 Tech Stack & Architecture
- 🤝 Contributing
- 📄 License
- 🆘 Support

✨ Features

👨‍🌾 Farmer Portal: Register produce with detailed information and generate unique QR codes. 🚚 Distributor Portal: Update logistics and track shipments in real-time. 🏪 Retailer Portal: Confirm product arrival, assess quality, and set retail prices. 👥 Consumer Portal: Scan QR codes to trace the complete product journey and verify authenticity. 🔒 Blockchain Security: All data is stored on an Ethereum-based blockchain, ensuring immutability and trust. 📱 Responsive Design: A seamless experience across desktop, tablet, and mobile devices.

🚀 Quick Start

Prerequisites

- Node.js (v18+)
- NPM or Yarn
- MetaMask browser extension

Installation & Setup

1.  Clone the repository: bash git clone https://github.com/your-username/grainchain.git cd grainchain

2.  Install dependencies: bash npm install --legacy-peer-deps

3.  Set up environment variables:

     Create a `.env` file in the project root and add the required environment variables.

   For the local SQLite database, add:

   ```env
   DATABASE_URL="file:./dev.db"

4.  Initialize the database: bash npm run db:push

5.  Start the development server: bash npm run dev The application should now be running on http://localhost:3000.

🔧 Tech Stack & Architecture

Frontend

Next.js 14 TypeScript Tailwind CSS shadcn/ui Ethers.js

Backend

Next.js API Routes Prisma Socket.IO

Blockchain

Solidity Hardhat OpenZeppelin

Database Schema

The database consists of two main models: `Produce` and `History`. For detailed schema, see prisma/schema.prisma.

Smart Contract (ProduceChain.sol)

The heart of our transparent system. Key functions include:

- registerProduce()
- updateStatus()
- retailEntry()
- getProduce()
- getHistory()

🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

📄 License

Distributed under the MIT License.

🆘 Support

Encounter a bug or have a question? Open an issue on GitHub.

Built with ❤️ for a more transparent and sustainable future.

## Contributors

- Snehx-gif