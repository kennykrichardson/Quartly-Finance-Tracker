import {

  collection,

  doc,

  getDocs,

  setDoc,

  deleteDoc,

} from "firebase/firestore";

import { db }
from "./config";

import type {
  Transaction,
}
from "../context/FinanceContext";

export async function
loadTransactions(
  uid: string
) {

  const snapshot =
    await getDocs(

      collection(
        db,
        "users",
        uid,
        "transactions"
      )
    );

  return snapshot.docs.map(
    (doc) => ({
      ...doc.data(),
      id: doc.id,
    })
  ) as Transaction[];
}

export async function
saveTransaction(
  uid: string,
  transaction: Transaction
) {

  await setDoc(

    doc(

      db,

      "users",

      uid,

      "transactions",

      transaction.id
    ),

    transaction
  );
}

export async function
removeTransaction(
  uid: string,
  id: string
) {

  await deleteDoc(

    doc(

      db,

      "users",

      uid,

      "transactions",

      id
    )
  );
}