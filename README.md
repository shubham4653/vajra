# 🚀 Block-Shield (VAJRA)

A blockchain-based, tokenized rate-limiting system that defends servers against bot abuse, spam, and DDoS attacks. Built on Ethereum with integrated AI-enhanced traffic analysis.

## 🛡 What is Block-Shield?

Block-Shield solves the growing issue of bot-generated traffic and server abuse by introducing a decentralized, token-based rate-limiting mechanism. Users must hold and burn tokens via Ethereum smart contracts to access sensitive services, ensuring only legitimate users can pass through.

## 🔐 Key Features

- *Token-Based Access Control* – Users need tokens in their MetaMask wallet to make requests.
- *Blockchain-Backed Rate Limiting* – Transparent, secure, and tamper-proof logic using smart contracts.
- *AI-Driven Bot Detection* – Optional integration of machine learning models to filter suspicious traffic.
- *Ideal for APIs, Gaming Servers, and High-Security Sites* – Prevents spam and DDoS attacks effectively.

## 💡 Use Cases

- Protecting public APIs
- Preventing DDoS attacks on shopping/financial platforms
- Throttling access to high-demand services
- Securing sensitive data or endpoints

## 🧱 Tech Stack

- *Frontend*: React.js
- *Backend*: Express.js
- *Blockchain*: Solidity, Hardhat, Ethers.js
- *Database*: MongoDB
- *Auth & Wallet Integration*: MetaMask
- *Others*: WebSocket

## 🧪 How It Works

1. Users log in/signup using MetaMask and details are stored in MongoDB.
2. Each request to the backend is validated through a smart contract.
3. If the user has enough token balance, the request is allowed; else it’s blocked.
4. Tokens are burned for each request, ensuring accountability and discouraging spamming.

## 👨‍💻 Contributors

- *Ananti* – Smart Contracts, Backend  
- *Abhishek Bhardwaj* – Database, Backend  
- *Madhur Tiwari* – Styling, Design  
- *Shubham Awari* – Frontend, Backend  

