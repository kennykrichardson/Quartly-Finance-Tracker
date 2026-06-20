import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import type {
  ReactNode,
} from "react";

import {
  useUser,
} from "../firebase/UserContext";

import {
  loadTransactions,
  saveTransaction,
  removeTransaction,
} from "../firebase/firestore";

export interface Transaction {
  id: string;
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
  ) => Promise<void>;

  deleteTransaction: (
    id: string
  ) => Promise<void>;
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

  const user =
    useUser();

  const [transactions,
    setTransactions] =
    useState<Transaction[]>([]);

  useEffect(() => {

    const saved =
      localStorage.getItem(
        "quartly-transactions"
      );

    if (!saved) return;

    setTransactions(
      JSON.parse(saved)
    );

  }, []);

  useEffect(() => {

    localStorage.setItem(

      "quartly-transactions",

      JSON.stringify(
        transactions
      )
    );

  }, [transactions]);

  useEffect(() => {

    async function
    fetchTransactions() {

      if (!user) return;

      try {

        const firestoreTransactions =

          await loadTransactions(
            user.uid
          );

        if (
          firestoreTransactions.length >
          0
        ) {

          setTransactions(
            firestoreTransactions
          );
        }

      } catch (error) {

        console.error(
          "Failed loading transactions",
          error
        );
      }
    }

    fetchTransactions();

  }, [user]);

  async function addTransaction(
    transaction:
      Omit<Transaction, "id">
  ) {

    const newTransaction = {

      ...transaction,

      id:
        crypto.randomUUID(),
    };

    setTransactions((prev) => [

      newTransaction,

      ...prev,
    ]);

    if (!user) return;

    try {

      await saveTransaction(

        user.uid,

        newTransaction
      );

    } catch (error) {

      console.error(
        "Failed saving transaction",
        error
      );
    }
  }

  async function deleteTransaction(
    id: string
  ) {

    setTransactions((prev) =>

      prev.filter(

        (transaction) =>

          transaction.id !== id
      )
    );

    if (!user) return;

    try {

      await removeTransaction(

        user.uid,

        id
      );

    } catch (error) {

      console.error(
        "Failed deleting transaction",
        error
      );
    }
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

    useContext(
      FinanceContext
    );

  if (!context) {

    throw new Error(

      "useFinance must be used within FinanceProvider"
    );
  }

  return context;
}