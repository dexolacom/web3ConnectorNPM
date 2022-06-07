import { useEffect } from "react";
import { ConnectButton, setStyles } from "tech-web3-connector";

const customStyles = {
  // styled modal
  modalBackdrop: {},
  modalContainer: {},
  modalBtnClose: {},
  modalConnectorsContainer: { "background-color": "color" }, // example code
  modalConnectorsItem: {},
  modalBtnProvider: {},
  modalNameWallet: { color: "color" }, // example code

  // styled Button
  BtnBase: {},
  BtnContainer: {},
  BtnAdress: {},
  SpanBalance: {},
  BtnLogout: {},

  // hover Button
  "BtnBase:hover": {
    "background-color": "color", // example code
  },
};

// required  RPC

const RPC = {
  1: "https://mainnet.infura.io/v3/....",
  3: "https://ropsten.infura.io/v3/....",
  4: "https://rinkeby.infura.io/v3/....",
  5: "https://goerly.infura.io/v3/....",
  42: "https://kovan.infura.io/v3/....",
  56: "https://bsc-dataseed.binance.org/",
  97: "https://data-seed-prebsc-2-s3.binance.org:8545",
  250: "https://rpc.ftm.tools",
  4002: "https://rpc.testnet.fantom.network",
};
// all supported connectors
const supportedConnectors = [
  "metamask",
  "walletonnect",
  "coinbase",
  "formatic",
  "portis",
];

const App = () => {
  setStyles(customStyles);

  return (
    <>
      <ConnectButton
        RPC={RPC}
        portisId={"portisId-key-project"}
        supportedConnectors={supportedConnectors}
      />
    </>
  );
};
export default App;
