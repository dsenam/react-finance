import React, { useState } from "react";
import Modal from "react-modal";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { NewTransactionModal } from "./components/NewTransactionModal";
import { GlobalStyle } from "./styles/global";
import { TransactionsProvider } from "./hooks/useTransactions";

Modal.setAppElement("#root");

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }
  return (
    <>
      <TransactionsProvider>
        <GlobalStyle />
        <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />

        <Dashboard />
        <NewTransactionModal
          isNewTransactionModalOpen={isNewTransactionModalOpen}
          onCloseNewTransactionModal={handleCloseNewTransactionModal}
        />
      </TransactionsProvider>
    </>
  );
}
