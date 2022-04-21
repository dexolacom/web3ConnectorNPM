import { useEffect } from "react";
import {
  ConnectButton,
  setStyles,
  useConnectors,
} from "tech-web3-connector";

const modalStyles = {
  modalBackdrop: {},
  modalContainer: {},
  modalBtnClose: {},
  modalConnectorsContainer: { "background-color": "color" }, // example code
  modalConnectorsItem: {},
  modalBtnProvider: {},
  modalNameWallet: { color: "color" }, // example code
};

const rpcObj = {
  88: "https://... you RPC_URL", // example code

};

const App = () => {

  setStyles(modalStyles);

  const { setRpcObj } = useConnectors();

  useEffect(() => {
    setRpcObj({ ...rpcObj });
  }, []);

  return (
    <>
      <ConnectButton />
    </>
  );
};
export default App;
