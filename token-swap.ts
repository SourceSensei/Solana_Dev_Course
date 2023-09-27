import * as web3 from "@solana/web3.js";
import {
  TokenSwap,
  TOKEN_SWAP_PROGRAM_ID,
  TokenSwapLayout,
} from "@solana/spl-token-swap";
import * as dotenv from "dotenv";
import { getKeypairFromEnvironment } from "@solana-developers/node-helpers";

dotenv.config();

const secretKey = getKeypairFromEnvironment("SECRET_KEY");


async function main() {
  const connection = new web3.Connection("https://api.devnet.solana.com");
  const transaction = new Web3.Transaction();
  const tokenSwapStateAccount = Web3.Keypair.generate();
  const rent = TokenSwap.getMinBalanceRentForExemptTokenSwap(connection);
  const tokenSwapStateAccountInstruction =
    await Web3.SystemProgram.createAccount({
      newAccountPubkey: tokenSwapStateAccount.publicKey,
      fromPubkey: wallet.publicKey,
      lamports: rent,
      space: TokenSwapLayout.span,
      programId: TOKEN_SWAP_PROGRAM_ID,
    });
  transaction.add(tokenSwapStateAccountInstruction);
}

main();
