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
