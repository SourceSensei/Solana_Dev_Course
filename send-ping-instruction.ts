import { Keypair } from "@solana/web3.js";
import * as dotenv from "dotenv";
import base58 from "bs58";
import { getKeypairFromEnvironment } from "@solana-developers/node-helpers";

dotenv.config();

const payer = getKeypairFromEnvironment("SECRET_KEY");
const connection = new web3.Connection(web3.clusterApiUrl("devnet"));

async function sendPingTransaction(
  connection: web3.Connection,
  payer: web3.Keypair
) {
    const PING_PROGRAM_ADDRESS = new web3.PublicKey(
      "ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa"
    );
    const PING_PROGRAM_DATA_ADDRESS = new web3.PublicKey(
      "Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod"
    );
}