import {
  Target,
  Wallet,
  TrendingUp,
  AlertTriangle,
  Pencil,
  PiggyBank,
  Calendar,
  Trophy,
} from "lucide-react";

import {
  useMemo,
  useState,
  useEffect,
} from "react";

import type {
  ReactNode,
} from "react";

import { motion } from "framer-motion";

import { useFinance } from "../context/FinanceContext";

interface BudgetGoalsProps {
  isDarkMode?: boolean;
}

export default function BudgetGoals({
  isDarkMode,
}: BudgetGoalsProps) {

  const { transactions } =
    useFinance();

  const [budget,
    setBudget] =
    useState<number>(() => {

      const saved =
        localStorage.getItem(
          "quartly-budget"
        );

      return saved
        ? Number(saved)
        : 50000;
    });

  const [editing,
    setEditing] =
    useState(false);

  const [draftBudget,
    setDraftBudget] =
    useState(
      budget.toString()
    );

  useEffect(() => {

    localStorage.setItem(
      "quartly-budget",
      budget.toString()
    );

  }, [budget]);

  const stats =
    useMemo(() => {

      const spent =
        transactions.reduce(
          (sum, transaction) =>
            sum +
            transaction.amount,
          0
        );

      const remaining =
        budget - spent;

      const percentage =
        Math.min(
          (spent / budget) * 100,
          100
        );

      const highestExpense =
        transactions.length > 0

          ? Math.max(
              ...transactions.map(
                (transaction) =>
                  transaction.amount
              )
            )

          : 0;

      const categoryMap:
        Record<
          string,
          number
        > = {};

      transactions.forEach(
        (transaction) => {

          categoryMap[
            transaction.category
          ] =
            (
              categoryMap[
                transaction.category
              ] || 0
            ) +
            transaction.amount;
        }
      );

      const topCategory =

        Object.entries(
          categoryMap
        ).sort(
          (a, b) =>
            b[1] - a[1]
        )[0]?.[0] ||

        "None";

      const averageExpense =

        transactions.length

          ? Math.round(
              spent /
              transactions.length
            )

          : 0;

      const now =
        new Date();

      const daysPassed =
        Math.max(
          now.getDate(),
          1
        );

      const daysInMonth =
        new Date(
          now.getFullYear(),
          now.getMonth() + 1,
          0
        ).getDate();

      const forecast =
        Math.round(
          (spent /
            daysPassed) *
            daysInMonth
        );

      const dailyAllowance =
        Math.max(
          Math.round(
            remaining /
            Math.max(
              daysInMonth -
              daysPassed,
              1
            )
          ),
          0
        );

      const healthScore =

  Math.max(

    0,

    Math.min(

      100,

      100 -

      (spent /budget) * 50

      +

      (
        transactions.length >
        0

          ? 20

          : 0
      )
    )
  );

      return {

        spent,

        remaining,

        percentage,

        forecast,

        highestExpense,

        topCategory,

        averageExpense,

        dailyAllowance,

        healthScore,
      };

    }, [
      transactions,
      budget,
    ]);

const Card = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (

  <motion.div

    whileHover={{
      scale: 1.03,
      y: -8,
    }}

    transition={{
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    }}

    className={`
      glass

      rounded-[32px]

      p-6

      shadow-black/5

      hover:shadow-[0_20px_60px_rgba(0,0,0,0.18)]

      ${className}
    `}
  >

    {children}

  </motion.div>
);

  return (

    <div
      className={`
        min-h-screen

        px-6
        md:px-10

        pt-8
        pb-12

        transition-all
        duration-300

        ${
          isDarkMode

            ? "bg-[#0f1115] text-white"

            : "bg-[#f8f8f7] text-black"
        }
      `}
    >

      {isDarkMode && (

        <>

          <div
            className="
              fixed

              top-0
              left-0

              w-[450px]
              h-[450px]

              bg-cyan-500/10

              blur-[160px]

              pointer-events-none
            "
          />

          <div
            className="
              fixed

              bottom-0
              right-0

              w-[450px]
              h-[450px]

              bg-cyan-400/10

              blur-[160px]

              pointer-events-none
            "
          />

        </>

      )}

      <div
        className="
          max-w-7xl
          mx-auto

          relative
          z-10
        "
      >

        <h1
          className="
            text-5xl
            font-bold

            mb-3
          "
        >

          Budget Goals

        </h1>

        <p
          className="
            text-[#8ea0b5]
            text-lg
            mb-10
          "
        >

          Control spending,
          monitor progress,
          and stay ahead.

        </p>

<Card>

          <div
            className="
              flex
              justify-between
              items-center

              mb-6
            "
          >

            <div
              className="
                flex
                items-center
                gap-3
              "
            >

              <Target />

              <h2
                className="
                  text-2xl
                  font-semibold
                "
              >

                Monthly Budget

              </h2>

            </div>

            <button

              onClick={() => {

                setDraftBudget(
                  budget.toString()
                );

                setEditing(
                  !editing
                );
              }}

              className="
                glass

                p-3

                rounded-xl

                hover:scale-105

                transition-all
              "
            >

              <Pencil
                size={18}
              />

            </button>

          </div>

          {editing ? (

            <div
              className="
                flex
                gap-3

                mb-6
              "
            >

              <input

                value={
                  draftBudget
                }

                onChange={(
                  e
                ) =>
                  setDraftBudget(
                    e.target.value
                  )
                }

                className="
                  flex-1

                  glass

                  px-4
                  py-3

                  rounded-xl

                  outline-none
                "
              />

              <button

                onClick={() => {

                  const value =
                    Number(
                      draftBudget
                    );

                  if (
                    value > 0
                  ) {

                    setBudget(
                      value
                    );

                    setEditing(
                      false
                    );
                  }
                }}

                className="
                  px-5
                  py-3

                  rounded-xl

                  bg-cyan-500

                  text-black
                  font-semibold
                "
              >

                Save

              </button>

            </div>

          ) : null}

          <h2
            className="
              text-5xl
              font-bold
            "
          >

            ₹{
              budget.toLocaleString()
            }

          </h2>

          <div
            className="
              mt-8
            "
          >

            <div
              className="
                w-full
                h-5

                rounded-full

                bg-white/10

                overflow-hidden
              "
            >

              <div

                className={`
                  h-full

                  transition-all
                  duration-700

                  ${
                    stats.percentage >=
                    90

                      ? "bg-red-500"

                      : stats.percentage >=
                        70

                        ? "bg-yellow-500"

                        : "bg-cyan-500"
                  }
                `}

                style={{
                  width:
                    `${stats.percentage}%`,
                }}
              />

            </div>

            <div
              className="
                flex
                justify-between

                mt-4

                text-sm

                text-[#8ea0b5]
              "
            >

              <span>

                ₹{
                  stats.spent.toLocaleString()
                } spent

              </span>

              <span>

                {
                  stats.percentage.toFixed(
                    1
                  )
                }
                %

              </span>

            </div>

          </div>

        </Card>

        <div
          className="
            grid

            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4

            gap-6

            mt-6
          "
        >

<Card>
            <Wallet
              className="
                mb-4
              "
            />

            <p
              className="
                text-[#8ea0b5]
              "
            >
              Remaining
            </p>

            <h2
              className="
                text-4xl
                font-bold

                mt-3
              "
            >
              ₹{
                stats.remaining.toLocaleString()
              }
            </h2>
          </Card>

<Card>
            <TrendingUp
              className="
                mb-4
              "
            />

            <p
              className="
                text-[#8ea0b5]
              "
            >
              Forecast
            </p>

            <h2
              className="
                text-4xl
                font-bold

                mt-3
              "
            >
              ₹{
                stats.forecast.toLocaleString()
              }
            </h2>
          </Card>

<Card>
                <PiggyBank
              className="
                mb-4
              "
            />

            <p
              className="
                text-[#8ea0b5]
              "
            >
              Daily Allowance
            </p>

            <h2
              className="
                text-4xl
                font-bold

                mt-3
              "
            >
              ₹{
                stats.dailyAllowance.toLocaleString()
              }
            </h2>
          </Card>

<Card>
            <AlertTriangle
              className="
                mb-4
              "
            />

            <p
              className="
                text-[#8ea0b5]
              "
            >
              Status
            </p>

            <h2
              className="
                text-2xl
                font-bold

                mt-3
              "
            >
              {stats.forecast >
              budget

                ? "Over Budget"

                : "On Track"}
            </h2>
          </Card>

        </div>

        <div
          className="
            grid

            grid-cols-1
            md:grid-cols-4

            gap-6

            mt-6
          "
        >

<Card>
            <Trophy
              className="
                mb-4
              "
            />

            <p
              className="
                text-[#8ea0b5]
              "
            >
              Highest Expense
            </p>

            <h2
              className="
                text-4xl
                font-bold

                mt-3
              "
            >
              ₹{
                stats.highestExpense.toLocaleString()
              }
            </h2>
          </Card>

<Card>
            <Calendar
              className="
                mb-4
              "
            />

            <p
              className="
                text-[#8ea0b5]
              "
            >
              Average Expense
            </p>

            <h2
              className="
                text-4xl
                font-bold

                mt-3
              "
            >
              ₹{
                stats.averageExpense.toLocaleString()
              }
            </h2>
          </Card>

<Card>
            <Target
              className="
                mb-4
              "
            />

            <p
              className="
                text-[#8ea0b5]
              "
            >
              Top Category
            </p>

            <h2
              className="
                text-3xl
                font-bold

                mt-3
              "
            >
              {
                stats.topCategory
              }
            </h2>
          </Card>

          <Card>

  <Target
    className="
      mb-4
    "
  />

  <p
    className="
      text-[#8ea0b5]
    "
  >

    Financial Health

  </p>

  <h2
    className="
      text-5xl
      font-bold
      mt-3
    "
  >

    {
      Math.round(
        stats.healthScore
      )
    }

  </h2>

  <p
    className="
      text-[#8ea0b5]
      mt-2
    "
  >

    out of 100

  </p>

</Card>

        </div>

      </div>

      </div>
  );
}