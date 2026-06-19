import { AnimatePresence, motion } from "framer-motion";
import { Trash2, X } from "lucide-react";
import { useEffect } from "react";
import { useFinance } from "../../context/FinanceContext";
import type { Transaction } from "../../context/FinanceContext";

interface Props {
  open: boolean;
  onClose: () => void;
  darkMode: boolean;
}

export default function TransactionModal({
  open,
  onClose,
  darkMode,
}: Props) {
  const { transactions, deleteTransaction } =
    useFinance();

  const validTransactions =
    transactions.filter(
      (t) =>
        t.title &&
        Number(t.amount) > 0
    );

useEffect(() => {

  if (open) {

    document.body.style.overflow =
      "hidden";

  } else {

    document.body.style.overflow =
      "auto";
  }

  return () => {

    document.body.style.overflow =
      "auto";
  };

}, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="
            fixed
            inset-0

            z-[9999]

            flex
            items-center
            justify-center

            bg-black/25

            backdrop-blur-lg
          "
          onClick={onClose}
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.94,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.94,
              y: 20,
            }}
            transition={{
              duration: 0.18,
              ease: "easeOut",
            }}
            onClick={(e) =>
              e.stopPropagation()
            }
            className={`
              glass

              w-[90vw]
              max-w-[1200px]

              h-[80vh]

              rounded-[40px]

              overflow-hidden

              shadow-[0_0_120px_rgba(64,224,208,0.25)]

              flex
              flex-col

              ${
                darkMode
                  ? "text-white"
                  : "text-black"
              }
            `}
          >
            {/* Header */}

            <div
              className="
                px-8
                py-6

                border-b
                border-white/10

                flex
                items-center
                justify-between

                shrink-0
              "
            >
              <div>
                <h2
                  className="
                    text-4xl
                    font-bold
                  "
                >
                  Transaction History
                </h2>

                <p
                  className="
                    mt-2

                    text-[#8ea0b5]
                  "
                >
                  View every recorded expense.
                </p>
              </div>

              <button
                onClick={onClose}
                className="
                  w-12
                  h-12

                  rounded-2xl

                  flex
                  items-center
                  justify-center

                  hover:bg-white/10

                  transition-all
                  duration-200
                "
              >
                <X size={22} />
              </button>
            </div>

            {/* Transactions */}

<div
  className="
    flex-1

    overflow-y-auto

    overscroll-contain

    p-8

    space-y-4
  "
>
              {validTransactions.length ===
                0 && (
                <div
                  className="
                    h-full

                    flex
                    items-center
                    justify-center

                    text-[#8ea0b5]
                    text-xl
                  "
                >
                  No transactions found.
                </div>
              )}

              {validTransactions.map(
                (
                  transaction: Transaction
                ) => (
                  <div
                    key={transaction.id}
                    className={`
                      rounded-[28px]

                      px-6
                      py-5

                      flex
                      items-center
                      justify-between

                      gap-6

                      ${
                        darkMode
                          ? "bg-[#171b22]"
                          : "bg-white"
                      }
                    `}
                  >
                    <div className="flex-1">
                      <div
                        className="
                          flex
                          items-center
                          gap-3

                          flex-wrap
                        "
                      >
                        <h3
                          className="
                            text-xl
                            font-semibold
                          "
                        >
                          {
                            transaction.title
                          }
                        </h3>

                        <span
                          className={`
                            px-3
                            py-1

                            rounded-full

                            text-xs

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
                            mt-3

                            ${
                              darkMode
                                ? "text-[#8ea0b5]"
                                : "text-[#6b7280]"
                            }
                          `}
                        >
                          {
                            transaction.description
                          }
                        </p>
                      )}

                      <p
                        className={`
                          mt-3
                          text-sm

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
                        items-center
                        gap-5
                      "
                    >
                      <span
                        className="
                          text-2xl
                          font-bold
                        "
                      >
                        ₹
                        {
                          transaction.amount
                        }
                      </span>

                      <button
                        onClick={() =>
                          deleteTransaction(
                            transaction.id
                          )
                        }
                        className="
                          w-11
                          h-11

                          rounded-2xl

                          flex
                          items-center
                          justify-center

                          hover:bg-red-50

                          transition-all
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
                )
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}