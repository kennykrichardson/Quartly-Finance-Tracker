import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import type {
  ReactNode,
} from "react";

export interface Transaction {
  id: number;
  title: string;
  amount: number;
  category: string;
  customCategory?: string;
  description: string;
  date: string;
}

interface FinanceContextType {

  transactions: Transaction[];

  addTransaction: (
    transaction: Omit<Transaction, "id">
  ) => void;

  deleteTransaction: (
    id: number
  ) => void;
}

const FinanceContext =
  createContext<FinanceContextType | null>(
    null
  );

export function FinanceProvider({
  children,
}: {
  children: ReactNode;
}) {

  const [transactions, setTransactions] =
    useState<Transaction[]>(() => {

      const saved =
        localStorage.getItem(
          "quartly-transactions"
        );

      return saved
        ? JSON.parse(saved)
        : [];
    });

  useEffect(() => {

    localStorage.setItem(
      "quartly-transactions",
      JSON.stringify(transactions)
    );

  }, [transactions]);

  function addTransaction(
    transaction: Omit<Transaction, "id">
  ) {

    const newTransaction = {
      ...transaction,
      id: Date.now(),
    };

    setTransactions((prev) => [
      newTransaction,
      ...prev,
    ]);
  }

  function deleteTransaction(
    id: number
  ) {

    setTransactions((prev) =>
      prev.filter(
        (transaction) =>
          transaction.id !== id
      )
    );
  }

  return (

    <FinanceContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
      }}
    >

      {children}

    </FinanceContext.Provider>

  );
}

export function useFinance() {

  const context =
    useContext(FinanceContext);

  if (!context) {

    throw new Error(
      "useFinance must be used within FinanceProvider"
    );

  }

  return context;
}