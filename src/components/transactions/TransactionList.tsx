import {
  Trash2,
  Pencil,
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
  onOpenModal: () => void;

  onEditTransaction?: (
    transaction: Transaction
  ) => void;
}

export default function TransactionList({
  transactions,
  darkMode,
  onOpenModal,
  onEditTransaction,
}: Props) {

  const {
    deleteTransaction,
  } = useFinance();

  const INITIAL_COUNT = 3;

  const [expanded] =
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

  flex
  items-center

  justify-between

  gap-4

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
                  min-w-0
                ">

                  <div className="
                    flex items-center
                    gap-3 flex-wrap
                  ">

                    <h3 className="
                      font-semibold
                      text-lg

                      leading-tight

                      min-w-0
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

<div
  className="
    flex
    flex-col

    items-end

    justify-center

    gap-2

    shrink-0

    ml-auto
  "
>

  <span
    className="
      text-xl
      font-semibold

      whitespace-nowrap
    "
  >
    ₹{transaction.amount}
  </span>

  <div
    className="
      flex
      items-center

      gap-2
    "
  >

    <button

      onClick={() =>
        onEditTransaction?.(
          transaction
        )
      }

      className="
        w-10
        h-10

        rounded-2xl

        flex
        items-center
        justify-center

        transition-all
        duration-200

        hover:bg-blue-50
      "
    >

      <Pencil
        size={18}
        className="
          text-blue-600
        "
      />

    </button>

    <button

      onClick={() =>
        deleteTransaction(
          transaction.id
        )
      }

      className="
        w-10
        h-10

        rounded-2xl

        flex
        items-center
        justify-center

        transition-all
        duration-200

        hover:bg-red-50
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

</div>

              </motion.div>

            )
          )}

        </AnimatePresence>

      </motion.div>

      {transactions.length >
        INITIAL_COUNT && (

<button

  onClick={onOpenModal}

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
          bg-[#101522]
          text-white

          hover:bg-[#151b2b]

          border
          border-white/5
        `

        : `
          bg-white
          text-black

          hover:bg-[#f8f8f8]
        `
    }
  `}
>
  View All Transactions
</button>

      )}

    </div>
    
  );
}