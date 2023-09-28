import { Transaction, Keypair, SystemProgram, Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
import {
  TokenSwap,
  TOKEN_SWAP_PROGRAM_ID,
  TokenSwapLayout,
} from "@solana/spl-token-swap";
import * as token from "@solana/spl-token";
const fs = require("fs")


function loadKeypair(filename: string): Keypair {
  const secret = JSON.parse(fs.readFileSync(filename).toString()) as number[]
  const secretKey = Uint8Array.from(secret)
  return Keypair.fromSecretKey(secretKey)
}

async function main() {
  const connection = new Connection(clusterApiUrl("devnet"))
  const wallet = loadKeypair('./my-keypair.json')
  const transaction = new Transaction();
  const tokenSwapStateAccount = Keypair.generate();
  const rent = await TokenSwap.getMinBalanceRentForExemptTokenSwap(connection);
  const tokenSwapStateAccountCreationInstruction = await SystemProgram.createAccount({
    newAccountPubkey: tokenSwapStateAccount.publicKey,
    fromPubkey: wallet.publicKey,
    lamports: rent,
    space: TokenSwapLayout.span,
    programId: TOKEN_SWAP_PROGRAM_ID,
  });
  transaction.add(tokenSwapStateAccountCreationInstruction);


  const [swapAuthority, bump] = await PublicKey.findProgramAddress(
    [tokenSwapStateAccount.publicKey.toBuffer()],
    TOKEN_SWAP_PROGRAM_ID
  );

  let tokenAAccountAddress = await token.getAssociatedTokenAddress(
    tokenAMint, // mint
    swapAuthority, // owner
    true // allow owner off curve
  );

  const tokenAAccountInstruction =
    await token.createAssociatedTokenAccountInstruction(
      wallet.publicKey, // payer
      tokenAAccountAddress, // ata
      swapAuthority, // owner
      tokenAMint // mint
    );


  const tokenSwapStateAccountInstruction = TokenSwap.createInitSwapInstruction(
    tokenSwapStateAccount.publicKey,
    swapAuthority,


  )
}

main();
