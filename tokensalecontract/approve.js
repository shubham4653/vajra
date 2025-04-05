require('dotenv').config();
const { ethers } = require('ethers');

const ERC20_ABI = [
  "function approve(address spender, uint256 amount) public returns (bool)"
];

const main = async () => {
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  const tokenContract = new ethers.Contract(
    process.env.TOKEN_ADDRESS,
    ERC20_ABI,
    wallet
  );

  const spender = process.env.SALE_CONTRACT;
  const amount = ethers.parseUnits("10000", 18); // 10,000 tokens assuming 18 decimals

  const tx = await tokenContract.approve(spender, amount);
  console.log("⏳ Approving...");
  await tx.wait();

  console.log('✅ Approved ${amount.toString()} tokens for ${spender}');
};

main().catch((error) => {
  console.error("❌ Error approving tokens:", error);
});