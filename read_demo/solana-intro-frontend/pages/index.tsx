import type { NextPage } from "next";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import AddressForm from "../components/AddressForm";
import * as web3 from "@solana/web3.js";

const Home: NextPage = () => {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [isExecutable, setIsExecutable] = useState(false);

  const addressSubmittedHandler = async (address: string) => {
    try {
      setAddress(address);
      const key = new web3.PublicKey(address);
      const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
      const balance = await connection.getBalance(key);
      setBalance(balance / web3.LAMPORTS_PER_SOL);
      const exectutable = await connection.getAccountInfo(key);
      setIsExecutable(exectutable ? true : false);
    } catch (error) {
      setAddress("");
      setBalance(0);
      alert(error);
    }
  };

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <p>Start Your Solana Journey</p>
        <AddressForm handler={addressSubmittedHandler} />
        <p>{`Address: ${address}`}</p>
        <p>{`Balance: ${balance} SOL`}</p>
        <p>{`Is it executable? ${isExecutable ? "Yep" : "Nope"}`}</p>
      </header>
    </div>
  );
};

export default Home;
