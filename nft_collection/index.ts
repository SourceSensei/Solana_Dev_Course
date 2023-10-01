import {
    Metaplex,
    keypairIdentity,
    bundlrStorage,
} from "@metaplex-foundation/js";
import { Connection, clusterApiUrl, Keypair } from "@solana/web3.js";

    
async function main() {

    const connection = new Connection(clusterApiUrl("devnet"));
    const wallet = Keypair.generate();

    const metaplex = Metaplex.make(connection)
      .use(keypairIdentity(wallet))
      .use(
        bundlrStorage({
          address: "https://devnet.bundlr.network",
          providerUrl: "https://api.devnet.solana.com",
          timeout: 60000,
        })
    );


    const buffer = fs.readFileSync("/path/to/image.png");
    const file = toMetaplexFile(buffer, "image.png");

    const imageUri = await metaplex.storage().upload(file);


    const { uri } = await metaplex.nfts().uploadMetadata({
      name: "My NFT",
      description: "My description",
      image: imageUri,
    });


    const { nft } = await metaplex.nfts().create(
      {
        uri: uri,
        name: "My NFT",
        sellerFeeBasisPoints: 0,
      },
      { commitment: "finalized" }
    );


    const nft = await metaplex.nfts().findByMint({ mintAddress });

    const { response } = await metaplex.nfts().update(
      {
        nftOrSft: nft,
        name: "Updated Name",
        uri: uri,
        sellerFeeBasisPoints: 100,
      },
      { commitment: "finalized" }
    );
    

}