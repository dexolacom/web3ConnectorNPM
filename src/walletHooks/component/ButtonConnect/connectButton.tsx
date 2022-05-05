import React from "react";
import { shortAddress, convertToNormal } from "../../utils";
import { useBtnConnect } from "../hooks/useBtnConnect";
import { useModalConnectors } from "../hooks/useModalConnectors";

import {
  FortMatic,
  MetaMask,
  CoinBase,
  WalletConnect,
  LogOut,
  CloseModal,
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

export const ConnectButton = ({
  RPC,
  portisId,
}: {
  RPC: object;
  portisId: string;
}) => {
  const { active, balance, account, disconnect, openModal, isOpen } =
    useBtnConnect();

  const { setProvider } = useModalConnectors(RPC, portisId);

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
            <WalletSpan className="BtnAddress">
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
              {/* MetaMask */}
              <ConnectorsItem className="modalConnectorsItem">
                <BtnConnector
                  onClick={() => setProvider("injected")}
                  className="modalBtnProvider"
                >
                  <MetaMask />

                  <Span className="modalNameWallet"> MetaMask</Span>
                </BtnConnector>
              </ConnectorsItem>
              {/* WalletConnect */}
              <ConnectorsItem className="modalConnectorsItem">
                <BtnConnector
                  onClick={() => setProvider("walletconnect")}
                  className="modalBtnProvider"
                >
                  <WalletConnect />

                  <Span className="modalNameWallet"> WalletConnect</Span>
                </BtnConnector>
              </ConnectorsItem>
              {/* Coinbase Wallet */}
              <ConnectorsItem className="modalConnectorsItem">
                <BtnConnector
                  onClick={() => setProvider("coinbaseWallet")}
                  className="modalBtnProvider"
                >
                  <CoinBase />

                  <Span className="modalNameWallet"> Coinbase Wallet</Span>
                </BtnConnector>
              </ConnectorsItem>
              {/* Fortmatic */}
              <ConnectorsItem className="modalConnectorsItem">
                <BtnConnector
                  onClick={() => setProvider("fortmatic")}
                  className="modalBtnProvider"
                >
                  <FortMatic />

                  <Span className="modalNameWallet"> Fortmatic</Span>
                </BtnConnector>
              </ConnectorsItem>
            </Connectors>
          </Container>
        </ModalBackdrop>
      </>
    </>
  );
};
