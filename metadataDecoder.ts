import { Connection, PublicKey } from "@solana/web3.js";
import * as borsh from 'borsh';

async function main() {
  const tokenMint = new PublicKey("");

  const programId = new PublicKey("");

  const seeds = [
    Buffer.from("metadata"),
    programId.toBytes(),
    tokenMint.toBytes(),
  ];

  const [metadataPDA, bump] = PublicKey.findProgramAddressSync(
    seeds,
    programId
  );

  const connection = new Connection("https://api.devnet.solana.com");

    const accountInfo = await connection.getAccountInfo(metadataPDA);
    
    const borshMetaLayout = borsh.struct({
        borsh.u8('key'),
        borsh.publicKey('updateAuthority'),
        borsh.publicKey('mint'),
        borsh.str('name')
    })

  if (accountInfo) {
      const metadata = borshMetaLayout.decode(accountInfo.data)
      console.log(metadata)
  }
}
