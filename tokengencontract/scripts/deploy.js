// const hre = require("hardhat"); // Make sure this is present

// async function main() {
//   const RateLimitToken = await hre.ethers.getContractFactory("RateLimitToken");
//   const token = await RateLimitToken.deploy();

//   await token.deployed();
//   console.log("RateLimitToken deployed to:", token.address);
// }

// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });

const hre = require("hardhat");

async function main() {
  const RateLimitToken = await hre.ethers.getContractFactory("RateLimitToken");
  const token = await RateLimitToken.deploy(); // Deploy the contract

  await token.waitForDeployment(); // Use this instead of .deployed()

  console.log("RateLimitToken deployed to:", await token.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
