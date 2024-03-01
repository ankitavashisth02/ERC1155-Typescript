import React, { useState } from "react";
import { IState } from "./App";
import nftImg from "./assets/NFT-Img.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Body: React.FC<{ state: IState | null }> = (props) => {
  const [mintLoad, setMintLoad] = useState<boolean>(true);
  const [burnLoad, setBurnLoad] = useState<boolean>(true);
  const [showBurn, setShowBurn] = useState<boolean>(false);
  //   console.log(showBurn)
  //   console.log(props.state!.contract)

  const contract = props.state!.contract;

  const onBurning = async () => {
    setBurnLoad(false);

    const burned = await contract?.burnToken(0, 1);
    toast("burning..");
    await burned?.wait();

    console.log("Burned");
    toast("burned !!");

    setBurnLoad(true);
    setShowBurn(false);
  };

  const mintNFT = async () => {
    try {
      console.log("minting start");
      setMintLoad(false);

      const amt = await contract?.currentPrice();
      console.log(Number(amt));
      const options = { value: Number(amt) };

      const addressContract = String(await props.state?.signer?.getAddress());

      const txn = await contract?.mint(
        addressContract,
        0,
        1,
        options
      );

      toast("Transaction is processing..");
      await txn?.wait();

      console.log("Minted NFT!");
      toast("Nft minted");

      setMintLoad(true);
      setBurnLoad(true);
      setShowBurn(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    // <h1>Body {props.state!.signer?.address as unknown as string}</h1>
    <div className="center-container">
      <img src={nftImg} alt="NFT" />
      <button onClick={mintNFT}> {mintLoad ? "Mint" : "Minting.."} </button>
      {showBurn && (
        <button onClick={onBurning}>{burnLoad ? "Burn" : "Burning.."}</button>
      )}
      <ToastContainer/>
    </div>
  );
};

export default Body;