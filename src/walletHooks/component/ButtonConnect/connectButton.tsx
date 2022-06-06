import React, { useEffect, useRef } from "react";
import { shortAddress, convertToNormal, copyToClipBoard } from "../../utils";
import { useBtnConnect } from "../hooks/useBtnConnect";
import { useModalConnectors } from "../hooks/useModalConnectors";

import {
  FortMatic,
  MetaMask,
  CoinBase,
  WalletConnect,
  LogOut,
  CloseModal,
  Portis,
} from "../Icon/Icons";

import {
  ModalBackdrop,
  Container,
  Connectors,
  Span,
  ConnectorsItem,
  BtnConnector,
  BtnClose,
} from "../Modal/style.modal";

import {
  ButtonLogOut,
  Button,
  AccountDiv,
  WalletSpan,
  SpanBalance,
} from "./connectButton.style";

const connectors = [
  {
    name: "metamask",
    provider: "injected",
    label: "MetaMask",
    component: MetaMask,
  },
  {
    name: "walletonnect",
    provider: "walletonnect",
    label: "WalletConnect",
    component: WalletConnect,
  },
  {
    name: "coinbase",
    provider: "coinbaseWallet",
    label: "Coinbase Wallet",
    component: CoinBase,
  },
  {
    name: "formatic",
    provider: "fortmatic",
    label: "Fortmatic",
    component: FortMatic,
  },
  { name: "portis", provider: "portis", label: "Portis", component: Portis },
];

export const ConnectButton = ({
  RPC,
  portisId,
}: {
  RPC: object;
  portisId: string;
}) => {
  const {
    active,
    balance,
    account,
    disconnect,
    openModal,
    isOpen,
  } = useBtnConnect();
  const { setProvider } = useModalConnectors(RPC, portisId);
  const copyTextRef = useRef(null);

  useEffect(() => {
    window.localStorage.clear();
  }, [setProvider]);

  return (
    <>
      {!active ? (
        <Button onClick={openModal} className="BtnBase">
          Connect Wallet
        </Button>
      ) : (
        <>
          <AccountDiv className="BtnContainer">
            <SpanBalance className="SpanBalance">
              {convertToNormal(balance, 18, 4)}
            </SpanBalance>
            <WalletSpan
              ref={copyTextRef}
              onClick={() => copyToClipBoard(copyTextRef)}
              className="BtnAddress"
            >
              {shortAddress(account)}
            </WalletSpan>
            <ButtonLogOut onClick={disconnect} className="BtnLogout">
              <LogOut />
            </ButtonLogOut>
          </AccountDiv>
        </>
      )}
      <>
        <ModalBackdrop
          isOpen={isOpen}
          onClick={openModal}
          className="modalBackdrop"
        >
          <Container className="modalContainer">
            <BtnClose onClick={openModal} className="modalBtnClose">
              <CloseModal />
            </BtnClose>
            <Connectors className="modalConnectorsContainer">
              {connectors
                .filter((connector) => connector.name) // somePropsWithSupportedConnectors.includes(connector.name)
                .map((connector) => (
                  <ConnectorsItem className="modalConnectorsItem">
                    <BtnConnector
                      onClick={() => setProvider(connector.provider)}
                      className="modalBtnProvider"
                    >
                      {connector.component}
                      <Span className="modalNameWallet">{connector.label}</Span>
                    </BtnConnector>
                  </ConnectorsItem>
                ))}
            </Connectors>
          </Container>
        </ModalBackdrop>
      </>
    </>
  );
};
