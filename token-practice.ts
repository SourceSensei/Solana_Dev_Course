import { clusterApiUrl, Connection, Keypair } from "@solana/web3.js";
import { createAccount, createMint, getAssociatedTokenAddressSync, mintTo, Transaction } from "@solana/spl-token";
const fs = require("fs");

async function main() {
  const connection = new Connection(clusterApiUrl("devnet"));
  const secret = JSON.parse(
    fs.readFileSync("my-keypair.json").toString()
  ) as number[];
  const secretKey = Uint8Array.from(secret);
  const payer = Keypair.fromSecretKey(secretKey);

  const secretT = JSON.parse(
    fs.readFileSync("token-keypair.json").toString()
  ) as number[];
  const secretKeyT = Uint8Array.from(secretT);
    const tokenKeyPair = Keypair.fromSecretKey(secretKeyT);
    const mint = tokenKeyPair.publicKey

  //const tokenMintAddress = await createMint(
  // connection,
  // payer,
  // payer.publicKey,
  // payer.publicKey,
  //  9,
  //tokenKeyPair
  // );

  //console.log(tokenMintAddress.toBase58());

  //const tokenAccount = await createAccount(
  // connection,
  // payer,
  // tokenKeyPair.publicKey,
  // payer.publicKey
  //);
    // console.log(tokenAccount.toBase58());
    
    const ata = getAssociatedTokenAddressSync(tokenKeyPair.publicKey, payer.publicKey)
    console.log(ata.toBase58())

    const decimals = 9

    const amount = 5*10**decimals

    const signature = await mintTo(connection, payer, mint, ata, payer.publicKey, amount)
    console.log(signature)

}

main();
