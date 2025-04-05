// scripts/deploy-sale.js
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with:", deployer.address);

  const tokenAddress = "0x03C1b162DceF98d89Bbb05886410765642f1603a"; // Replace with your real token address

  const TokenSale = await hre.ethers.getContractFactory("TokenSale");
  const sale = await TokenSale.deploy(tokenAddress, deployer.address);

  await sale.waitForDeployment();

  console.log("TokenSale deployed to:", await sale.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
