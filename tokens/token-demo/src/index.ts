import * as web3 from "@solana/web3.js";
import { initializeKeypair } from "./initializeKeypair";
import {createMint} from "@solana/spl-token";

async function main() {
  const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
  const user = await initializeKeypair(connection);


}

main()
  .then(() => {
    console.log("Finished successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
