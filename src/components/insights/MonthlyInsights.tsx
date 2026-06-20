import { useMemo } from "react";

import {
  useFinance,
} from "../../context/FinanceContext";

import InsightsCard from "./InsightsCard";

export default function MonthlyInsights() {

  const {
    transactions,
  } = useFinance();

  const insights =
    useMemo(() => {

      const now =
        new Date();

      const currentMonth =
        now.getMonth();

      const currentYear =
        now.getFullYear();

      const previousMonth =
        currentMonth === 0
          ? 11
          : currentMonth - 1;

      const previousYear =
        currentMonth === 0
          ? currentYear - 1
          : currentYear;

      const currentTransactions =

        transactions.filter(
          (t) => {

            const date =
              new Date(t.date);

            return (

              date.getMonth() ===
                currentMonth

              &&

              date.getFullYear() ===
                currentYear
            );
          }
        );

      const previousTransactions =

        transactions.filter(
          (t) => {

            const date =
              new Date(t.date);

            return (

              date.getMonth() ===
                previousMonth

              &&

              date.getFullYear() ===
                previousYear
            );
          }
        );

      const currentTotal =

        currentTransactions.reduce(
          (sum, t) =>
            sum + t.amount,
          0
        );

      const previousTotal =

        previousTransactions.reduce(
          (sum, t) =>
            sum + t.amount,
          0
        );

      const percentageChange =

        previousTotal === 0

          ? 0

          : (
              (
                currentTotal -
                previousTotal
              )
              /
              previousTotal
            ) * 100;

      const categoryTotals:
        Record<string, number>
        = {};

      currentTransactions.forEach(
        (transaction) => {

          const category =

            transaction.category ===
            "Other"

              ? (
                  transaction.customCategory
                  ||
                  "Other"
                )

              : transaction.category;

          categoryTotals[
            category
          ] =
            (
              categoryTotals[
                category
              ]
              || 0
            )
            +
            transaction.amount;
        }
      );

      const topCategory =

        Object.entries(
          categoryTotals
        ).sort(
          (a, b) =>
            b[1] - a[1]
        )[0];

      const highestExpense =

        currentTransactions.sort(
          (a, b) =>
            b.amount -
            a.amount
        )[0];

      const dailyAverage =

        currentTransactions.length

          ? (
              currentTotal /
              currentTransactions.length
            )

          : 0;

      return {

        currentTotal,

        percentageChange,

        topCategory,

        highestExpense,

        dailyAverage,
      };

    }, [transactions]);

  return (

    <div
      className="
        grid

        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-4

        gap-6
      "
    >

      <InsightsCard

        title="This Month"

        value={`₹${Math.round(
          insights.currentTotal
        )}`}

        subtitle={
          insights.percentageChange === 0

            ? "No previous data"

            : `${
                insights.percentageChange > 0
                  ? "↑"
                  : "↓"
              } ${Math.abs(
                insights.percentageChange
              ).toFixed(1)}% vs last month`
        }

        positive={
          insights.percentageChange < 0
        }
      />

      <InsightsCard

        title="Top Category"

        value={
          insights.topCategory?.[0]
          ||
          "-"
        }

        subtitle={
          insights.topCategory

            ? `₹${Math.round(
                insights.topCategory[1]
              )}`

            : "No expenses"
        }
      />

      <InsightsCard

        title="Highest Expense"

        value={
          insights.highestExpense

            ? `₹${Math.round(
                insights.highestExpense.amount
              )}`

            : "-"
        }

        subtitle={
          insights.highestExpense
            ?.title
        }
      />

      <InsightsCard

        title="Average Expense"

        value={`₹${Math.round(
          insights.dailyAverage
        )}`}

        subtitle="Per transaction"
      />

    </div>

  );
}