import type { Transaction } from "../types/transaction";

export const transactions: Transaction[] = [
  {
    id: 1,
    title: "Groceries",
    amount: 120,
    category: "Food",
    type: "expense",
  },
  {
    id: 2,
    title: "Freelance",
    amount: 1200,
    category: "Income",
    type: "income",
  },
  {
    id: 3,
    title: "Spotify",
    amount: 10,
    category: "Entertainment",
    type: "expense",
  },
];