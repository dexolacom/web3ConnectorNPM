import { useState, useEffect } from "react";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { FortmaticConnector } from "@web3-react/fortmatic-connector";

export const useConnectors = (props?: object) => {
  const [rpcObj, setRpcObj] = useState({ ...props });
  const [supportedChainIds, setSupportedChainIds] = useState<number[]>();

  const RPC = {
    1: "https://mainnet.infura.io/v3/8ca77c4631f14dccb88318200cfca61d",
    3: "https://ropsten.infura.io/v3/8ca77c4631f14dccb88318200cfca61d",
    4: "https://rinkeby.infura.io/v3/8ca77c4631f14dccb88318200cfca61d",
    5: "https://goerly.infura.io/v3/8ca77c4631f14dccb88318200cfca61d",
    42: "https://kovan.infura.io/v3/8ca77c4631f14dccb88318200cfca61d",
    56: "https://bsc-dataseed.binance.org/",
    97: "https://data-seed-prebsc-2-s3.binance.org:8545",
    ...rpcObj,
  };

  useEffect(() => {
    const supportedChainId = Object.keys(RPC).map((string) => +string);
    if (supportedChainId) {
      setSupportedChainIds(supportedChainId);
    }
  }, [rpcObj, props]);

  const walletconnect = new WalletConnectConnector({
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

  const connectors: any = {
    injected: injected,
    walletconnect: walletconnect,
    coinbaseWallet: walletlink,
    fortmatic: fortmatic,
  };

  return {
    connectors,
    setRpcObj,
    injected: injected,
    walletconnect: walletconnect,
    coinbaseWallet: walletlink,
    fortmatic: fortmatic,
  };
};

// const ChainId = {
//   MAINNET: 1,
//   ROPSTEN: 2,
//   RINKEBY: 4,
//   GÖRLI: 5,
//   KOVAN: 42,
//   BSC_MAINNET: 56,
//   BSC_TESTNET: 97,
// };

// const RPC = {
//   [ChainId.MAINNET]:
//     "https://mainnet.infura.io/v3/8ca77c4631f14dccb88318200cfca61d",
//   [ChainId.ROPSTEN]:
//     "https://ropsten.infura.io/v3/8ca77c4631f14dccb88318200cfca61d",
//   [ChainId.RINKEBY]:
//     "https://rinkeby.infura.io/v3/8ca77c4631f14dccb88318200cfca61d",
//   [ChainId.GÖRLI]:
//     "https://goerly.infura.io/v3/8ca77c4631f14dccb88318200cfca61d",
//   [ChainId.KOVAN]:
//     "https://kovan.infura.io/v3/8ca77c4631f14dccb88318200cfca61d",
//   [ChainId.BSC_MAINNET]: "https://bsc-dataseed.binance.org/",
//   [ChainId.BSC_TESTNET]: "https://data-seed-prebsc-2-s3.binance.org:8545",
// };

// const walletconnect = new WalletConnectConnector({
//   supportedChainIds: [1, 3, 4, 5, 42, 56, 97],
//   rpc: RPC,
//   bridge: "https://bridge.walletconnect.org",
//   qrcode: true,
//   //@ts-ignore
//   pollingInterval: 12000,
// });

// const walletlink = new WalletLinkConnector({
//   url: `https://bsc-dataseed.binance.org/`,
//   appName: "walletlink",
// });

// const injected = new InjectedConnector({
//   //@ts-ignore
//   rpc: RPC,
//   appName: "wallet injected",
//   supportedChainIds: [1, 3, 4, 5, 42, 56, 97],
// });

// const fortmatic = new FortmaticConnector({
//   //Test Rinkeby, Kovan, Ropsten : pk_test_5738055D79822432
//   //Production localhost : pk_live_5ECD887F1C653961
//   apiKey: "pk_live_5ECD887F1C653961",
//   chainId: 1,
// });

// export const connectors: any = {
//   injected: injected,
//   walletconnect: walletconnect,
//   coinbaseWallet: walletlink,
//   fortmatic: fortmatic,
// };
