import { AnimatePresence, motion } from "framer-motion";
import {
  Trash2,
  X,
  Pencil,
  Check,
} from "lucide-react";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";

import {
  ChevronDown,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  useFinance,
} from "../../context/FinanceContext";

import type {
  Transaction,
} from "../../context/FinanceContext";

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

  const {
    transactions,
    deleteTransaction,
    updateTransaction,
  } = useFinance();

  const [
    editingId,
    setEditingId,
  ] = useState<
    string | null
  >(null);

  const [
    editedTransaction,
    setEditedTransaction,
  ] = useState<
    Transaction | null
  >(null);

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

  function startEditing(
    transaction: Transaction
  ) {

    setEditingId(
      transaction.id
    );

    setEditedTransaction({
      ...transaction,
    });
  }

  async function saveEdit() {

    if (
      !editedTransaction
    ) return;

    await updateTransaction(
      editedTransaction
    );

    setEditingId(null);

    setEditedTransaction(
      null
    );
  }

  function cancelEdit() {

    setEditingId(null);

    setEditedTransaction(
      null
    );
  }

  return (

    <AnimatePresence>

      {open && (

        <motion.div

          initial={{
            opacity: 0,
          }}

          animate={{
            opacity: 1,
          }}

          exit={{
            opacity: 0,
          }}

          transition={{
            duration: 0.18,
          }}

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

                  View and edit every recorded expense.

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

            <div
              className="
                flex-1

                overflow-y-auto

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
                  transaction
                ) => {

                  const isEditing =

                    editingId ===
                    transaction.id;

                  return (

                    <div

                      key={
                        transaction.id
                      }

className={`
  rounded-[28px]

  px-6
  py-5

  flex
  flex-col
  sm:flex-row

  items-start
  sm:items-center

  justify-between

  gap-4

                        ${
                          darkMode

                            ? "bg-[#171b22]"

                            : "bg-white"
                        }
                      `}
                    >

                      <div
                        className="
                          flex-1
                          min-w-0

                          pr-0
                        "
                      >

                        {isEditing ? (

                          <div
                            className="
                              space-y-3
                            "
                          >

                            <input

                              value={
                                editedTransaction?.title ||
                                ""
                              }

                              onChange={(
                                e
                              ) =>
                                setEditedTransaction(
                                  (
                                    prev
                                  ) =>

                                    prev

                                      ? {

                                          ...prev,

                                          title:
                                            e.target.value,
                                        }

                                      : null
                                )
                              }

                              className="
                                w-full

                                px-4
                                py-3

                                rounded-2xl

                                bg-white/5

                                border
                                border-white/10
                              "
                            />

                            <input

                              type="number"

                              value={
                                editedTransaction?.amount ||
                                0
                              }

                              onChange={(
                                e
                              ) =>
                                setEditedTransaction(
                                  (
                                    prev
                                  ) =>

                                    prev

                                      ? {

                                          ...prev,

                                          amount:
                                            Number(
                                              e.target.value
                                            ),
                                        }

                                      : null
                                )
                              }

                              className="
                                w-full

                                px-4
                                py-3

                                rounded-2xl

                                bg-white/5

                                border
                                border-white/10
                              "
                            />

<Listbox
  value={
    editedTransaction?.category
  }
  onChange={(value) =>
    setEditedTransaction(
      (prev) =>

        prev

          ? {
              ...prev,
              category: value,
            }

          : null
    )
  }
>

  <div
    className="
      relative
    "
  >

    <ListboxButton

      className={`
        w-full

        px-4
        py-3

        rounded-2xl

        border

        flex
        items-center
        justify-between

        transition-all
        duration-200

        ${
          darkMode

            ? `
              bg-[#252a35]
              border-white/10
              text-white

              hover:bg-[#2d3442]
            `

            : `
              bg-[#f8fafc]
              border-slate-200
              text-slate-900

              hover:bg-white
            `
        }
      `}
    >

      <span>

        {
          editedTransaction?.category
        }

      </span>

      <ChevronDown
        size={18}
        className="
          opacity-70
        "
      />

    </ListboxButton>

    <ListboxOptions

      anchor="bottom"

      className={`
        z-[99999]

        mt-2

        w-[var(--button-width)]

        rounded-2xl

        overflow-hidden

        shadow-2xl

        border

        p-1

        ${
          darkMode

            ? `
              bg-[#1b212c]
              border-white/10
            `

            : `
              bg-white
              border-slate-200
            `
        }
      `}
    >

      {[
        "Food",
        "Transport",
        "Shopping",
        "Bills",
        "Entertainment",
        "Health",
        "Clothing",
        "Other",
      ].map(
        (category) => (

          <ListboxOption

            key={category}

            value={category}

            className={({ focus }) => `
              px-4
              py-3

              rounded-xl

              cursor-pointer

              transition-all
              duration-150

              ${
                focus

                  ? darkMode

                    ? "bg-blue-500/20 text-white"

                    : "bg-blue-50 text-blue-700"

                  : ""
              }
            `}
          >

            {category}

          </ListboxOption>

        )
      )}

    </ListboxOptions>

  </div>

</Listbox>

                            <textarea

                              value={
                                editedTransaction?.description ||
                                ""
                              }

                              onChange={(
                                e
                              ) =>
                                setEditedTransaction(
                                  (
                                    prev
                                  ) =>

                                    prev

                                      ? {

                                          ...prev,

                                          description:
                                            e.target.value,
                                        }

                                      : null
                                )
                              }

                              className="
                                w-full

                                px-4
                                py-3

                                rounded-2xl

                                bg-white/5

                                border
                                border-white/10
                              "
                            />

                          </div>

                        ) : (

                          <>
                            <h3
                              className="
                                text-xl
                                font-semibold

                                leading-tight
                              "
                            >

                              {
                                transaction.title
                              }

                            </h3>

                            <span
  className={`
    inline-flex

    mt-2

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

  {
    transaction.category ===
    "Other"

      ? transaction.customCategory ||
        "Other"

      : transaction.category
  }

</span>

                            <p
                              className="
                                mt-2

                                text-[#8ea0b5]
                              "
                            >

                              {
                                transaction.description
                              }

                            </p>

                            <p
                              className="
                                mt-2

                                text-sm

                                text-[#6f8096]
                              "
                            >

                              {
                                transaction.date
                              }

                            </p>

                          </>

                        )}

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

    min-w-[140px]
  "
>

  <span
    className="
      text-2xl
      font-bold

      whitespace-nowrap
    "
  >

    ₹
    {
      isEditing

        ? editedTransaction?.amount

        : transaction.amount
    }

  </span>

  {isEditing ? (

    <div
      className="
        flex
        items-center

        gap-2
      "
    >

      <button

        onClick={
          saveEdit
        }

        className="
          w-11
          h-11

          rounded-2xl

          flex
          items-center
          justify-center

          bg-green-500/10
        "
      >

        <Check
          size={18}
          className="
            text-green-500
          "
        />

      </button>

      <button

        onClick={
          cancelEdit
        }

        className="
          w-11
          h-11

          rounded-2xl

          flex
          items-center
          justify-center

          bg-red-500/10
        "
      >

        <X
          size={18}
          className="
            text-red-500
          "
        />

      </button>

    </div>

  ) : (

    <div
      className="
        flex
        items-center

        gap-2
      "
    >

      <button

        onClick={() =>
          startEditing(
            transaction
          )
        }

        className="
          w-11
          h-11

          rounded-2xl

          flex
          items-center
          justify-center

          hover:bg-blue-500/10
        "
      >

        <Pencil
          size={18}
          className="
            text-blue-500
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
          w-11
          h-11

          rounded-2xl

          flex
          items-center
          justify-center

          hover:bg-red-500/10
        "
      >

        <Trash2
          size={18}
          className="
            text-red-500
          "
        />

      </button>

    </div>

  )}

</div>
                    </div>

                  );
                }
              )}

            </div>

          </motion.div>

        </motion.div>

      )}

    </AnimatePresence>

  );
}