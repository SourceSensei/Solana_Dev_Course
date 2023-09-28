import {
  Transaction,
  Keypair,
  SystemProgram,
  Connection,
  clusterApiUrl,
  PublicKey,
  TransactionInstruction,
} from "@solana/web3.js";
import {
  TokenSwap,
  TOKEN_SWAP_PROGRAM_ID,
  TokenSwapLayout,
} from "@solana/spl-token-swap";
import * as token from "@solana/spl-token";
const fs = require("fs");

function loadKeypair(filename: string): Keypair {
  const secret = JSON.parse(fs.readFileSync(filename).toString()) as number[];
  const secretKey = Uint8Array.from(secret);
  return Keypair.fromSecretKey(secretKey);
}

async function getTokenAccountCreationInstruction(
  mint: PublicKey,
  swapAuthority: PublicKey,
  payer: PublicKey
): Promise<[PublicKey, TransactionInstruction]> {
  let tokenAccountAddress = await token.getAssociatedTokenAddress(
    mint, // mint
    swapAuthority, // owner
    true // allow owner off curve
  );

  const tokenAccountInstruction =
    await token.createAssociatedTokenAccountInstruction(
      payer, // payer
      tokenAccountAddress, // ata
      swapAuthority, // owner
      mint // mint
    );

  return [tokenAccountAddress, tokenAccountInstruction];
}

async function main() {
  const connection = new Connection(clusterApiUrl("devnet"));
  const wallet = loadKeypair("./bob-keypair.json");
  const transaction = new Transaction();
  const tokenSwapStateAccount = loadKeypair("./swapstate-keypair.json");
  const rent = await TokenSwap.getMinBalanceRentForExemptTokenSwap(connection);
  const tokenSwapStateAccountCreationInstruction =
    await SystemProgram.createAccount({
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
  console.log("swap authority: " + swapAuthority.toBase58());

  const tokenAMint = new PublicKey(
    "BXuw8UdBk9tNH54CjS7Nrnh16prBNvhspY5XBSXpTkNe"
  );

  const tokenBMint = new PublicKey(
    "BmPGuTRj14ywVAKfGHLTtixyYzq75iwXcJa2HwsAoW6i"
  );

  const [tokenATokenAccount, taci] = await getTokenAccountCreationInstruction(
    tokenAMint,
    swapAuthority,
    wallet.publicKey
  );
  const [tokenBTokenAccount, tbci] = await getTokenAccountCreationInstruction(
    tokenBMint,
    swapAuthority,
    wallet.publicKey
  );

  //const tokenSwapStateAccountInstruction = TokenSwap.createInitSwapInstruction(
  //  tokenSwapStateAccount.publicKey,
  //  swapAuthority,
  // tokenATokenAccount,
  // tokenBTokenAccount,

  // );
}

main();
