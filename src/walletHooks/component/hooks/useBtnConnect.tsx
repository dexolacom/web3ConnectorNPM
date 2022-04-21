import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { useConnectors } from "../hooks/useConnectors";
import Web3 from "web3";

export const useBtnConnect = () => {
  const { library, account, activate, deactivate, active } = useWeb3React();
  const { connectors } = useConnectors();

  const [isOpen, setIsOpen] = useState(false);
  const [balance, setBalance] = useState("0.00");

  let web3 = new Web3(library?.provider);

  const getInfo = async () => {
    const balance = await web3.eth.getBalance(account + "");
    if (balance) {
      setBalance(balance);
    }
  };

  const openModal = () => {
    setIsOpen(!isOpen);
  };

  const refreshState = () => {
    window.localStorage.setItem("provider", "");
  };

  const disconnect = () => {
    refreshState();
    deactivate();
    localStorage.clear();
  };

  useEffect(() => {
    const provider = window.localStorage.getItem("provider");

    if (provider) {
      activate(connectors[provider]);
    }

    if (account) {
      getInfo();
    }
  }, [account, active, activate]);

  return {
    active,
    openModal,
    balance,
    account,
    disconnect,
    isOpen,
  };
};
