import { useState } from "react";

import {
  useFinance,
} from "../../context/FinanceContext";

const categories = [
  "Food",
  "Clothing",
  "Transport",
  "Entertainment",
  "Bills",
  "Shopping",
  "Health",
  "Other",
];

export default function TransactionForm() {

  const { addTransaction } =
    useFinance();

  const [title, setTitle] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [category, setCategory] =
    useState("Food");

  const [customCategory, setCustomCategory] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [date, setDate] =
    useState(
      new Date()
        .toISOString()
        .split("T")[0]
    );

  function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    if (!title || !amount)
      return;

    addTransaction({

      title,

      amount: Number(amount),

      category:
  category === "Other"
    ? "Other"
    : category,

customCategory:
  category === "Other"
    ? customCategory
    : "",

      description,

      date,
    });

    setTitle("");

    setAmount("");

    setDescription("");

    setCustomCategory("");

    setCategory("Food");
  }

  return (

    <div className="
      glass rounded-[32px]
      p-6

      h-full
    ">

      <div>

        <h2 className="
          text-2xl font-semibold
        ">
          Add Expense
        </h2>

        <p className="
          text-[#8ea0b5]
          mt-1
        ">
          Track your spending elegantly.
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="
          mt-6 space-y-4
        "
      >

        <input
          value={title}

          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }

          placeholder="Expense title"

          className="
            w-full h-12 px-4

            rounded-2xl

            bg-white/10

            outline-none
          "
        />

        <input
          value={amount}

          onChange={(e) =>
            setAmount(
              e.target.value
            )
          }

          type="number"

          placeholder="Amount"

          className="
            w-full h-12 px-4

            rounded-2xl

            bg-white/10

            outline-none
          "
        />

        <textarea
          value={description}

          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }

          placeholder="Description"

          className="
            w-full

            rounded-2xl

            bg-white/10

            outline-none

            resize-none

            px-4 py-3

            h-20
          "
        />

        <select
          value={category}

          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }

          className="
            w-full h-12 px-4

            rounded-2xl

            bg-white/10

            dark:bg-[#16181d]

            outline-none

            appearance-none

            text-black

            dark:text-white
          "
        >

          {categories.map((cat) => (

            <option
              key={cat}
              value={cat}

              className="
                bg-white
                text-black

                dark:bg-[#16181d]
                dark:text-white
              "
            >
              {cat}
            </option>

          ))}

        </select>

        {category === "Other" && (

          <input
            value={customCategory}

            onChange={(e) =>
              setCustomCategory(
                e.target.value
              )
            }

            placeholder="Custom category"

            className="
              w-full h-12 px-4

              rounded-2xl

              bg-white/10

              outline-none
            "
          />

        )}

        <input
          type="date"

          value={date}

          onChange={(e) =>
            setDate(
              e.target.value
            )
          }

          className="
            w-full h-12 px-4

            rounded-2xl

            bg-white/10

            outline-none
          "
        />

        <button
          className="
            w-full h-12

            rounded-2xl

            bg-[#16181d]

            text-white

            font-medium

            hover:bg-[#1d2026]

            transition-all
          "
        >
          Add Expense
        </button>

      </form>

    </div>
  );
}