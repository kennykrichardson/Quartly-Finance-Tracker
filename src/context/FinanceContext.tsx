import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";

import { useUser } from "../firebase/UserContext";
import {
  loadBudget,
  loadTransactions,
  removeTransaction,
  saveBudget as saveFirestoreBudget,
  saveTransaction,
  updateFirestoreTransaction,
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
  transactionsLoading: boolean;
  budget: number;
  budgetLoading: boolean;
  setBudget: (value: number) => Promise<void>;
  addTransaction: (transaction: Omit<Transaction, "id">) => Promise<void>;
  updateTransaction: (transaction: Transaction) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
}

const FinanceContext = createContext<FinanceContextType | null>(null);

function cacheKey(uid: string, kind: "transactions" | "budget") {
  return `quartly:${uid}:${kind}`;
}

export function FinanceProvider({ children }: { children: ReactNode }) {
  const user = useUser();
  const uid = user?.uid ?? null;

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionsLoading, setTransactionsLoading] = useState(true);
  const [budget, setBudgetState] = useState(50000);
  const [budgetLoading, setBudgetLoading] = useState(true);

  // A per-user cache improves perceived startup speed without mixing accounts.
  useEffect(() => {
    let cancelled = false;

    if (!uid) {
      setTransactions([]);
      setBudgetState(50000);
      setTransactionsLoading(false);
      setBudgetLoading(false);
      return;
    }

    setTransactionsLoading(true);
    setBudgetLoading(true);

    try {
      const cachedTransactions = localStorage.getItem(cacheKey(uid, "transactions"));
      setTransactions(cachedTransactions ? JSON.parse(cachedTransactions) as Transaction[] : []);
      const cachedBudget = localStorage.getItem(cacheKey(uid, "budget"));
      setBudgetState(cachedBudget !== null ? Math.max(0, Number(cachedBudget) || 0) : 50000);
    } catch (error) {
      console.warn("Quartly cache could not be read; loading from Firebase.", error);
      setTransactions([]);
      setBudgetState(50000);
    }

    void (async () => {
      try {
        const remoteTransactions = await loadTransactions(uid);
        if (!cancelled) {
          setTransactions(remoteTransactions);
          localStorage.setItem(cacheKey(uid, "transactions"), JSON.stringify(remoteTransactions));
        }
      } catch (error) {
        console.error("Failed loading transactions from Firebase.", error);
      } finally {
        if (!cancelled) setTransactionsLoading(false);
      }

      try {
        const remoteBudget = await loadBudget(uid);
        if (cancelled) return;

        if (remoteBudget !== null) {
          setBudgetState(remoteBudget);
          localStorage.setItem(cacheKey(uid, "budget"), String(remoteBudget));
        } else {
          // First-run migration: preserve the existing local budget for the first
          // signed-in account, then save it remotely so future sessions sync.
          const cached = localStorage.getItem(cacheKey(uid, "budget"));
          const legacy = localStorage.getItem("quartly-budget");
          const cachedValue = cached === null ? NaN : Number(cached);
          const legacyValue = legacy === null ? NaN : Number(legacy);
          const initialBudget = Number.isFinite(cachedValue) && cachedValue > 0
            ? cachedValue
            : Number.isFinite(legacyValue) && legacyValue > 0
              ? legacyValue
              : 50000;

          await saveFirestoreBudget(uid, initialBudget);
          if (cancelled) return;

          setBudgetState(initialBudget);
          localStorage.setItem(cacheKey(uid, "budget"), String(initialBudget));
          if (legacy !== null) localStorage.removeItem("quartly-budget");
        }
      } catch (error) {
        console.error("Failed loading/syncing budget from Firebase.", error);
      } finally {
        if (!cancelled) setBudgetLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [uid]);

  useEffect(() => {
    if (!uid || transactionsLoading) return;
    try {
      localStorage.setItem(cacheKey(uid, "transactions"), JSON.stringify(transactions));
    } catch (error) {
      console.warn("Could not cache transactions locally.", error);
    }
  }, [uid, transactions, transactionsLoading]);

  const addTransaction = useCallback(async (transaction: Omit<Transaction, "id">) => {
    if (!uid) throw new Error("Sign in before saving a transaction.");
    const newTransaction: Transaction = { ...transaction, id: crypto.randomUUID() };

    // Write to Firebase before updating the canonical in-memory list, so errors are visible.
    await saveTransaction(uid, newTransaction);
    setTransactions((previous) => [newTransaction, ...previous]);
  }, [uid]);

  const updateTransaction = useCallback(async (updated: Transaction) => {
    if (!uid) throw new Error("Sign in before updating a transaction.");
    await updateFirestoreTransaction(uid, updated);
    setTransactions((previous) => previous.map((item) => item.id === updated.id ? updated : item));
  }, [uid]);

  const deleteTransaction = useCallback(async (id: string) => {
    if (!uid) throw new Error("Sign in before deleting a transaction.");
    await removeTransaction(uid, id);
    setTransactions((previous) => previous.filter((item) => item.id !== id));
  }, [uid]);

  const setBudget = useCallback(async (value: number) => {
    if (!uid) throw new Error("Sign in before saving your budget.");
    if (!Number.isFinite(value) || value < 0) {
      throw new Error("Budget must be a valid non-negative amount.");
    }

    // Optimistic update, with rollback if Firebase rejects the write.
    const previous = budget;
    setBudgetState(value);
    try {
      await saveFirestoreBudget(uid, value);
      localStorage.setItem(cacheKey(uid, "budget"), String(value));
    } catch (error) {
      setBudgetState(previous);
      throw error;
    }
  }, [uid, budget]);

  const value = useMemo(() => ({
    transactions,
    transactionsLoading,
    budget,
    budgetLoading,
    setBudget,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  }), [
    transactions, transactionsLoading, budget, budgetLoading,
    setBudget, addTransaction, updateTransaction, deleteTransaction,
  ]);

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>;
}

export function useFinance() {
  const context = useContext(FinanceContext);
  if (!context) throw new Error("useFinance must be used within FinanceProvider");
  return context;
}
