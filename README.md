## Connector for web3 wallets

`yarn add tech-web3-connector` or `npm i tech-web3-connector`

### Usage

`import { ConnectButton, setStyles , useSignMessage} from "tech-web3-connector"` - returns balance and address of user wallet , message signing function

For styling `ConnectButton` - for styling use style extension styled-components.

`setStyles` - hook for classnames styling a ModalWallet
`useSignMessage` - takes a string , returns boolean if the signature took place

### Supported Wallets

```
MetaMask
CoinBase
Fortmatic
WalletConnect ( Trust , SafePal ...)
```

### use case `setStyles` `ConnectButton` `useSignMessage`

```
// App.jsx

import { ConnectButton, setStyles , useSignMessage } from "tech-web3-connector";


const modalStyles = {
  modalBackdrop: {},
  modalContainer: {},
  modalBtnClose: {},
  modalConnectorsContainer: { "background-color": "color" }, // example code
  modalConnectorsItem: {},
  modalBtnProvider: {},
  modalNameWallet: {color: "color"}, // example code
};


function App() {
 setStyles(modalStyles);
  const { signMessage, isVerify } = useSignMessage();

  useEffect(() => {
    if (!isVerify) {
      signMessage("TEST");
    }
    console.log("isVerify", isVerify);
  }, [isVerify]);

  return (
      <>
         <ConnectButton />
      </>
  );
}


```

`We need to create a provider in the file index.jsx`

```
import React from "react";
import ReactDOM from "react-dom";
import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import App from "./App";


function getLibrary(provider: any) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <App />
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
```
