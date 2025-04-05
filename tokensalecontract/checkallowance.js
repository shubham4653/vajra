import { ethers } from "ethers";
import * as dotenv from "dotenv";
dotenv.config();

const TOKEN_ABI = [
  "function allowance(address owner, address spender) view returns (uint256)"
];

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  const token = new ethers.Contract(process.env.TOKEN_ADDRESS, TOKEN_ABI, provider);

  const owner = new ethers.Wallet(process.env.PRIVATE_KEY).address;
  const spender = process.env.SALE_CONTRACT;

  const allowance = await token.allowance(owner, spender);
  console.log('🔎 Allowance: ${ethers.formatUnits(allowance, 18)} tokens');
}

main().catch(console.error);