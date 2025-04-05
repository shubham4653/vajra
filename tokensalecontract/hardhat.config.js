require("dotenv").config(); // 👈 load .env file
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: {
    version: "0.8.28"
  },
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/TDiDrryMW6I4WyOlgaHqX-lNxxm5sAwC",
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
