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


import { useFinance } from "../context/FinanceContext";

interface BudgetGoalsProps {
  isDarkMode?: boolean;
  activePage: string;
  setActivePage: (page: string) => void;
}

export default function BudgetGoals({
  isDarkMode,
  activePage,
  setActivePage,
}: BudgetGoalsProps) {

  const {
    transactions,
    budget,
    budgetLoading,
    setBudget,
  } = useFinance();

  const [editing, setEditing] = useState(false);
  const [draftBudget, setDraftBudget] = useState("50000");
  const [budgetSaving, setBudgetSaving] = useState(false);
  const [budgetError, setBudgetError] = useState("");

  useEffect(() => {
    if (!editing && !budgetLoading) {
      setDraftBudget(String(budget));
    }
  }, [budget, budgetLoading, editing]);

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
          (budget > 0 ? (spent / budget) * 100 : 0),
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

      (budget > 0 ? (spent / budget) * 50 : 0)

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
  <div className={`glass-premium rounded-[30px] p-6 ${className}`}>
    {children}
  </div>
);

  return (

    <div
      className={`
        min-h-screen

        px-6
        md:px-10

        pt-8
        pb-12


        ${isDarkMode ? "text-white" : "text-black"}
      `}
    >


      <div
        className="
          max-w-7xl
          mx-auto

          relative
          z-10
        "
      >

        <header className="relative z-50 flex flex-wrap items-center justify-between gap-6 pt-3 xl:grid xl:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
          <div className="xl:col-start-1 xl:row-start-1">
            <h1 className="text-3xl font-semibold tracking-[-.055em] sm:text-4xl lg:text-[2.7rem]">
              Quartly - By Ken Richardson
            </h1>
            <p className="mt-2 text-[#8ea0b5]">Control spending, monitor progress, and stay ahead.</p>
          </div>
          <nav aria-label="Main navigation" className="hidden items-center gap-1 rounded-full border border-white/30 bg-white/10 p-1 backdrop-blur-xl xl:col-start-2 xl:row-start-1 xl:flex xl:justify-self-center dark:border-white/15 dark:bg-slate-950/55 dark:shadow-[0_8px_28px_rgba(0,0,0,0.28)]">
            {[
              { label: "Overview", page: "dashboard" },
              { label: "Charts", page: "charts-page" },
              { label: "Budget Goals", page: "budgets" },
            ].map((item) => (
              <button key={item.page} onClick={() => setActivePage(item.page)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${activePage === item.page ? "bg-white/80 text-slate-900 shadow-sm dark:bg-cyan-300/15 dark:text-cyan-100 dark:ring-1 dark:ring-inset dark:ring-cyan-200/15" : "text-slate-600 hover:bg-white/50 dark:text-slate-300 dark:hover:bg-white/10"}`}>
                {item.label}
              </button>
            ))}
          </nav>
        </header>

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

              disabled={budgetLoading || budgetSaving}
              onClick={() => {
                setBudgetError("");
                setDraftBudget(String(budget));
                setEditing((current) => !current);
              }}

              className="
                glass

                p-3

                rounded-xl


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
                disabled={budgetSaving || budgetLoading}
                onClick={async () => {
                  const value = Number(draftBudget);

                  if (!Number.isFinite(value) || value <= 0) {
                    setBudgetError("Enter a valid budget greater than zero.");
                    return;
                  }

                  setBudgetSaving(true);
                  setBudgetError("");
                  try {
                    await setBudget(value);
                    setEditing(false);
                  } catch (error) {
                    console.error("Could not save the budget to Firebase.", error);
                    setBudgetError("Budget could not be synced. Check your connection and Firestore rules, then try again.");
                  } finally {
                    setBudgetSaving(false);
                  }
                }}
                className="glass-action rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-black disabled:cursor-not-allowed disabled:opacity-60"
              >
                {budgetSaving ? "Saving…" : "Save to Firebase"}
              </button>

            </div>

          ) : null}

          {budgetError && (
            <p className="mb-4 text-sm text-red-500" role="alert">{budgetError}</p>
          )}

          {budgetLoading && (
            <p className="mb-4 text-sm text-muted-foreground" role="status">Loading your saved budget…</p>
          )}

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