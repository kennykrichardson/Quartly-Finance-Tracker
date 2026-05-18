import {
  Trash2,
} from "lucide-react";

import {
  useState,
} from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import type {
  Transaction,
} from "../../context/FinanceContext";

import {
  useFinance,
} from "../../context/FinanceContext";

interface Props {
  transactions: Transaction[];

  darkMode: boolean;
}

export default function TransactionList({
  transactions,
  darkMode,
}: Props) {

  const {
    deleteTransaction,
  } = useFinance();

  const INITIAL_COUNT = 3;

  const [expanded, setExpanded] =
    useState(false);

  const visibleTransactions =
    expanded
      ? transactions
      : transactions.slice(
          0,
          INITIAL_COUNT
        );

  return (

    <div
      id="transactions"
      className="
        glass rounded-[32px]
        p-6

        h-full

        flex flex-col
      "
    >

      <div>

        <h2 className="
          text-2xl
          font-semibold
        ">
          Transactions
        </h2>

        <p className="
          text-[#8ea0b5]
          mt-1
        ">
          Expense history
        </p>

      </div>

      <motion.div
        layout

        transition={{
          duration: 0.25,
        }}

        className="
          mt-6
          space-y-3
        "
      >

        {transactions.length === 0 && (

          <div
            className={`
              h-40

              rounded-3xl

              flex items-center
              justify-center

              text-[#8ea0b5]

              ${
                darkMode

                  ? "bg-[#1b1f27]"

                  : "bg-[#ffffff]"
              }
            `}
          >

            Add expenses to see them here.

          </div>

        )}

        <AnimatePresence>

          {visibleTransactions.map(
            (transaction) => (

              <motion.div

                key={transaction.id}

                layout

                initial={{
                  opacity: 0,
                  y: 8,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                }}

                exit={{
                  opacity: 0,
                  y: -8,
                }}

                transition={{
                  duration: 0.2,
                }}

                className={`
                  rounded-3xl

                  p-5

                  flex items-center
                  justify-between

                  gap-6

                  shadow-sm

                  ${
                    darkMode

                      ? "bg-[#1b1f27]"

                      : "bg-[#ffffff]"
                  }
                `}
              >

                <div className="
                  flex-1
                ">

                  <div className="
                    flex items-center
                    gap-3 flex-wrap
                  ">

                    <h3 className="
                      font-semibold
                      text-lg
                    ">
                      {transaction.title}
                    </h3>

                    <span
                      className={`
                        text-xs

                        px-3 py-1

                        rounded-full

                        ${
                          darkMode

                            ? `
                              bg-[#252a35]
                              text-[#8ea0b5]
                            `

                            : `
                              bg-[#f3f4f6]
                              text-[#6b7280]
                            `
                        }
                      `}
                    >

                      {transaction.category ===
                      "Other"

                        ? transaction.customCategory ||
                          "Other"

                        : transaction.category}

                    </span>

                  </div>

                  {transaction.description && (

                    <p
                      className={`
                        text-sm
                        mt-2

                        break-words

                        ${
                          darkMode

                            ? "text-[#8ea0b5]"

                            : "text-[#6b7280]"
                        }
                      `}
                    >

                      {transaction.description}

                    </p>

                  )}

                  <p
                    className={`
                      text-xs
                      mt-3

                      ${
                        darkMode

                          ? "text-[#6f8096]"

                          : "text-[#9ca3af]"
                      }
                    `}
                  >

                    {transaction.date}

                  </p>

                </div>

                <div className="
                  flex items-center
                  gap-4
                ">

                  <span className="
                    text-xl
                    font-semibold

                    whitespace-nowrap
                  ">
                    ₹{transaction.amount}
                  </span>

                  <button
                    onClick={() =>
                      deleteTransaction(
                        transaction.id
                      )
                    }

                    className="
                      w-10 h-10

                      rounded-2xl

                      flex items-center
                      justify-center

                      hover:bg-red-50

                      transition-all
                      duration-200
                    "
                  >

                    <Trash2
                      size={18}
                      className="
                        text-red-600
                      "
                    />

                  </button>

                </div>

              </motion.div>

            )
          )}

        </AnimatePresence>

      </motion.div>

      {transactions.length >
        INITIAL_COUNT && (

        <button

          onClick={() =>
            setExpanded(
              !expanded
            )
          }

          className={`
            mt-6

            h-12
            w-full

            rounded-2xl

            font-medium

            transition-all
            duration-200

            ${
              darkMode

                ? `
                  bg-[#1b1f27]
                  hover:bg-[#252a35]
                `

                : `
                  bg-[#ffffff]
                  hover:bg-[#f3f4f6]
                `
            }
          `}
        >

          {expanded
            ? "Show Less"
            : "Show More"}

        </button>

      )}

    </div>
  );
}