## Connector for web3 wallets

`npm i tech-web3-connector`

## GitHub Pages

`https://techbandorg.github.io/web3ConnectorNPM/`

## Example Code

`https://github.com/techbandorg/web3ConnectorNPM/tree/example-web3Connect`

### Usage

`import { ConnectButton, setStyles , useSignMessage , useConnectors} from "tech-web3-connector"` - returns balance and address of user wallet , message signing function

For styling `ConnectButton` - for styling use style extension styled-components.

`setStyles` - hook for classnames styling a ModalWallet
`useSignMessage` - takes a string , returns boolean if the signature took place
`useConnectors` - accepts a list extension object chaunID : Rpc-Url .

### Default ChainIds

`supportedChainIds: [1, 3, 4, 5, 42, 56, 97]`

### Supported Wallets

```
MetaMask
CoinBase
Fortmatic
WalletConnect ( Trust , SafePal ...)
```

### use case `setStyles` `ConnectButton` `useSignMessage` `useConnectors`

```
// App.jsx

import { ConnectButton, setStyles , useSignMessage, useConnectors } from "tech-web3-connector";


const modalStyles = {
  modalBackdrop: {},
  modalContainer: {},
  modalBtnClose: {},
  modalConnectorsContainer: { "background-color": "color" }, // example code
  modalConnectorsItem: {},
  modalBtnProvider: {},
  modalNameWallet: {color: "color"}, // example code
};

const rpcObj = {
    chainID<number>: "https:// ... ",
    chainID<number>: "https:// ... ",
    chainID<number>: "https:// ... ",
     ...
  };

function App() {

  setStyles(modalStyles);

  const { signMessage, isVerify } = useSignMessage();
  const { setRpcObj} = useConnectors();

  useEffect(() => {

    if (!isVerify) {
      signMessage("TEST");
    }

   setRpcObj({ ...rpcObj });

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
