import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "./config";
import type { Transaction } from "../context/FinanceContext";

export async function loadTransactions(uid: string): Promise<Transaction[]> {
  const snapshot = await getDocs(collection(db, "users", uid, "transactions"));
  return snapshot.docs.map((item) => ({
    ...item.data(),
    id: item.id,
  })) as Transaction[];
}

export async function updateFirestoreTransaction(
  userId: string,
  transaction: Transaction,
): Promise<void> {
  await updateDoc(
    doc(db, "users", userId, "transactions", transaction.id),
    { ...transaction },
  );
}

export async function saveTransaction(
  uid: string,
  transaction: Transaction,
): Promise<void> {
  await setDoc(
    doc(db, "users", uid, "transactions", transaction.id),
    transaction,
  );
}

export async function removeTransaction(uid: string, id: string): Promise<void> {
  await deleteDoc(doc(db, "users", uid, "transactions", id));
}

/**
 * Store the user's total budget on their own users/{uid} document.
 * This avoids relying on browser-only localStorage for the canonical value.
 */
export async function loadBudget(uid: string): Promise<number | null> {
  const snapshot = await getDoc(doc(db, "users", uid));
  if (!snapshot.exists()) return null;

  const value = snapshot.data().totalBudget;
  return typeof value === "number" && Number.isFinite(value) && value >= 0
    ? value
    : null;
}

export async function saveBudget(uid: string, totalBudget: number): Promise<void> {
  if (!Number.isFinite(totalBudget) || totalBudget < 0) {
    throw new Error("Total budget must be a finite, non-negative number.");
  }

  await setDoc(
    doc(db, "users", uid),
    { totalBudget, updatedAt: new Date().toISOString() },
    { merge: true },
  );
}
