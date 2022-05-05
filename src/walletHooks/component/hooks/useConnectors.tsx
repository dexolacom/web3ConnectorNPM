import { useState, useEffect } from "react";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { FortmaticConnector } from "@web3-react/fortmatic-connector";
import { PortisConnector } from "@web3-react/portis-connector";

export const useConnectors = (RPC?: object, portisId?: string) => {
  const [supportedChainIds, setSupportedChainIds] = useState<number[]>();

  useEffect(() => {
    if (RPC) {
      const supportedChainId = Object.keys(RPC).map((string) => +string);
      if (supportedChainId) {
        setSupportedChainIds(supportedChainId);
      }
    }
  }, [RPC]);

  const walletconnect = new WalletConnectConnector({
    //@ts-ignore
    rpc: RPC,
    bridge: "https://bridge.walletconnect.org",
    qrcode: true,
    //@ts-ignore
    pollingInterval: 12000,
    supportedChainIds: supportedChainIds,
  });

  const walletlink = new WalletLinkConnector({
    //@ts-ignore
    rpc: RPC,
    appName: "walletlink",
    supportedChainIds: supportedChainIds,
  });

  const injected = new InjectedConnector({
    //@ts-ignore
    rpc: RPC,
    appName: "wallet injected",
    supportedChainIds: supportedChainIds,
  });

  const fortmatic = new FortmaticConnector({
    //Test Rinkeby, Kovan, Ropsten : pk_test_5738055D79822432
    //Production localhost : pk_live_5ECD887F1C653961
    apiKey: "pk_live_5ECD887F1C653961",
    chainId: 1,
  });

  const portis = new PortisConnector({
    dAppId: portisId ?? "",
    networks: [1, 100],
  });

  const connectors: any = {
    injected: injected,
    walletconnect: walletconnect,
    coinbaseWallet: walletlink,
    fortmatic: fortmatic,
    portis: portis,
  };

  return {
    connectors,
  };
};
