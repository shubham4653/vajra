require("dotenv").config();
require("@nomicfoundation/hardhat-ethers");

module.exports = {
  solidity: {
    compilers: [
      { version: "0.8.28" }, // Matches Lock.sol
      { version: "0.8.20" }  // Matches OpenZeppelin contracts
    ]
  },
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
