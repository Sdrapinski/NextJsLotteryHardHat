import React, { useEffect, useState } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { abi, contractAddresses } from "../constants/index";
import { ethers } from "ethers";
import { useNotification } from "web3uikit";

const Lotteryentrance = () => {
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  const [entranceFee, setentranceFee] = useState("0");
  const chainId = parseInt(chainIdHex);

  const dispatch = useNotification();

  const raffleAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;

  const { runContractFunction: enterRaffle } = useWeb3Contract({
    abi,
    contractAddress: raffleAddress,
    functionName: "enterRaffle",
    params: {},
    msgValue: entranceFee,
  });
  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    abi,
    contractAddress: raffleAddress,
    functionName: "getEntranceFee",
    params: {},
  });

  useEffect(() => {
    if (isWeb3Enabled) {
      async function updateUi() {
        const fee = (await getEntranceFee()).toString();
        setentranceFee(fee);
      }
      updateUi();
    }
  }, [isWeb3Enabled]);

  const handleSucess = async function (tx) {
    await tx.wait(1);
    //  handleNewNotification(tx);
  };

  const handleNewNotification = function () {
    dispatch({
      type: "info",
      message: "Transaction Complete",
      title: "Transaction Notification",
      position: "topR",
      icon: "bell",
    });
  };

  return (
    <div>
      Hi from lottery Entrance <br /> Fee in ETH:{" "}
      {raffleAddress ? (
        <div>
          <button
            onClick={async function () {
              await enterRaffle({
                onSuccess: handleSucess,
                onError: (error) => console.log(error),
              });
            }}
          >
            Enter Raffle
          </button>
          {ethers.utils.formatUnits(entranceFee, "ether")}
        </div>
      ) : (
        <div>No Raffle Address Detected </div>
      )}
    </div>
  );
};

export default Lotteryentrance;
