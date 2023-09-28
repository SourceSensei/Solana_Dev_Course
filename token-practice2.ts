import { clusterApiUrl, Connection } from "@solana/web3.js";
import * as dotenv from "dotenv";
import { getKeypairFromEnvironment } from "@solana-developers/node-helpers";
import { createMint, Transaction } from "@solana/spl-token";

dotenv.config();

async function main() {
  const connection = new Connection(clusterApiUrl("devnet"));

    const payer = getKeypairFromEnvironment("SECRET_KEY");
    

    createMint(connection, payer, payer.publicKey, payer.publicKey, 9)
}

main();
