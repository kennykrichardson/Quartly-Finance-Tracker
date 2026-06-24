import {
  TrendingUp,
  TrendingDown,
  IndianRupee,
  Wallet,
  ShoppingBag,
  BarChart3,
} from "lucide-react";

import { useMemo } from "react";

import { useFinance } from "../context/FinanceContext";

import MonthlyInsights from "../components/insights/MonthlyInsights";

interface InsightsPageProps {

  isDarkMode: boolean;

  toggleDarkMode: () => void;
}

export default function InsightsPage(
  _props: InsightsPageProps
) {
    
  const { transactions } = useFinance();

  const insights = useMemo(() => {
    const now = new Date();

    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const lastMonth =
      currentMonth === 0 ? 11 : currentMonth - 1;

    const lastMonthYear =
      currentMonth === 0
        ? currentYear - 1
        : currentYear;

    const currentTransactions =
      transactions.filter((transaction) => {
        const date = new Date(transaction.date);

        return (
          date.getMonth() === currentMonth &&
          date.getFullYear() === currentYear
        );
      });

    const previousTransactions =
      transactions.filter((transaction) => {
        const date = new Date(transaction.date);

        return (
          date.getMonth() === lastMonth &&
          date.getFullYear() === lastMonthYear
        );
      });

    const totalSpent =
      currentTransactions.reduce(
        (sum, transaction) =>
          sum + transaction.amount,
        0
      );

    const previousTotal =
      previousTransactions.reduce(
        (sum, transaction) =>
          sum + transaction.amount,
        0
      );

    const percentageChange =
      previousTotal > 0
        ? ((totalSpent - previousTotal) /
            previousTotal) *
          100
        : 0;

    const categoryTotals: Record<
      string,
      number
    > = {};

    currentTransactions.forEach(
      (transaction) => {
        const category =
          transaction.category === "Other"
            ? transaction.customCategory ||
              "Other"
            : transaction.category;

        categoryTotals[category] =
          (categoryTotals[category] || 0) +
          transaction.amount;
      }
    );

    const sortedCategories = Object.entries(
      categoryTotals
    ).sort((a, b) => b[1] - a[1]);

    const topCategory =
      sortedCategories[0];

    const highestExpense = [
      ...currentTransactions,
    ].sort(
      (a, b) => b.amount - a.amount
    )[0];

    const averageExpense =
      currentTransactions.length > 0
        ? totalSpent /
          currentTransactions.length
        : 0;

    return {
      totalSpent,
      percentageChange,
      topCategory,
      highestExpense,
      averageExpense,
      transactionCount:
        currentTransactions.length,
      categories: sortedCategories,
    };
  }, [transactions]);

  const cardHover = {
    transition:
      "all 0.28s cubic-bezier(0.4, 0, 0.2, 1)",
  };

  return (
    <div
      className="
        min-h-screen
        px-6
        md:px-10
        pt-8
        pb-12
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
        "
      >
        <h1
          className="
            text-5xl
            font-bold
            mb-3
          "
        >
          Insights
        </h1>

        <p
          className="
            text-[#8ea0b5]
            text-lg
            mb-8
          "
        >
          Understand your spending patterns.
        </p>

        <div className="mb-10">
          <MonthlyInsights />
        </div>

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-8
            mb-10
          "
        >
          <div
            className="
              glass
              rounded-[32px]
              p-8
              will-change-transform
            "
            style={cardHover}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                "translateY(-6px) scale(1.03)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                "translateY(0px) scale(1)";
            }}
          >
            <IndianRupee
              size={30}
              className="mb-5"
            />

            <p className="text-[#8ea0b5]">
              Total Spent
            </p>

            <h2
              className="
                text-4xl
                font-semibold
                mt-4
              "
            >
              ₹
              {Math.round(
                insights.totalSpent
              )}
            </h2>
          </div>

          <div
            className="
              glass
              rounded-[32px]
              p-8
              will-change-transform
            "
            style={cardHover}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                "translateY(-6px) scale(1.03)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                "translateY(0px) scale(1)";
            }}
          >
            {insights.percentageChange < 0 ? (
              <TrendingDown
                size={30}
                className="mb-5"
              />
            ) : (
              <TrendingUp
                size={30}
                className="mb-5"
              />
            )}

            <p className="text-[#8ea0b5]">
              Monthly Change
            </p>

            <h2
              className="
                text-4xl
                font-semibold
                mt-4
              "
            >
              {Math.abs(
                insights.percentageChange
              ).toFixed(1)}
              %
            </h2>
          </div>

          <div
            className="
              glass
              rounded-[32px]
              p-8
              will-change-transform
            "
            style={cardHover}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                "translateY(-6px) scale(1.03)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                "translateY(0px) scale(1)";
            }}
          >
            <ShoppingBag
              size={30}
              className="mb-5"
            />

            <p className="text-[#8ea0b5]">
              Top Category
            </p>

            <h2
              className="
                text-3xl
                font-semibold
                mt-4
              "
            >
              {insights.topCategory?.[0] ||
                "-"}
            </h2>
          </div>

          <div
            className="
              glass
              rounded-[32px]
              p-8
              will-change-transform
            "
            style={cardHover}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                "translateY(-6px) scale(1.03)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                "translateY(0px) scale(1)";
            }}
          >
            <Wallet
              size={30}
              className="mb-5"
            />

            <p className="text-[#8ea0b5]">
              Average Expense
            </p>

            <h2
              className="
                text-4xl
                font-semibold
                mt-4
              "
            >
              ₹
              {Math.round(
                insights.averageExpense
              )}
            </h2>
          </div>
        </div>

        <div
          className="
            grid
            lg:grid-cols-2
            gap-8
            mb-10
          "
        >
          <div
            className="
              glass
              rounded-[32px]
              p-8
              will-change-transform
            "
            style={cardHover}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                "translateY(-6px) scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                "translateY(0px) scale(1)";
            }}
          >
            <h2
              className="
                text-2xl
                font-bold
                mb-8
              "
            >
              Category Breakdown
            </h2>

            <div className="space-y-5">
              {insights.categories.map(
                ([category, amount]) => (
                  <div
                    key={category}
                    className="
                      flex
                      justify-between
                      items-center
                      py-3
                      border-b
                      border-white/10
                    "
                  >
                    <span className="text-lg">
                      {category}
                    </span>

                    <span
                      className="
                        font-semibold
                        text-lg
                      "
                    >
                      ₹
                      {Math.round(
                        amount
                      )}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          <div
            className="
              glass
              rounded-[32px]
              p-8
              will-change-transform
            "
            style={cardHover}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                "translateY(-6px) scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                "translateY(0px) scale(1)";
            }}
          >
            <h2
              className="
                text-2xl
                font-bold
                mb-8
              "
            >
              Largest Expense
            </h2>

            {insights.highestExpense ? (
              <>
                <h3
                  className="
                    text-3xl
                    font-bold
                  "
                >
                  {
                    insights
                      .highestExpense
                      .title
                  }
                </h3>

                <p
                  className="
                    text-6xl
                    font-bold
                    mt-8
                  "
                >
                  ₹
                  {
                    insights
                      .highestExpense
                      .amount
                  }
                </p>

                <p
                  className="
                    text-[#8ea0b5]
                    mt-5
                    text-lg
                  "
                >
                  {
                    insights
                      .highestExpense
                      .category
                  }
                </p>
              </>
            ) : (
              <p>
                No expenses yet.
              </p>
            )}
          </div>
        </div>

        <div
          className="
            glass
            rounded-[32px]
            p-10
            will-change-transform
          "
          style={cardHover}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform =
              "translateY(-4px) scale(1.01)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform =
              "translateY(0px) scale(1)";
          }}
        >
          <div
            className="
              flex
              items-center
              gap-3
              mb-5
            "
          >
            <BarChart3 />

            <h2
              className="
                text-2xl
                font-bold
              "
            >
              AI Insights
            </h2>
          </div>

<ul
  className="
    space-y-4
    text-lg
    text-[#8ea0b5]
  "
>

  <li>
    • You made
    {" "}
    <strong>
      {
        insights.transactionCount
      }
    </strong>
    {" "}
    transactions this month.
  </li>

  <li>
    • Your largest spending category was
    {" "}
    <strong>
      {
        insights.topCategory?.[0]
      }
    </strong>.
  </li>

  <li>
    • Average transaction size is
    {" "}
    <strong>
      ₹{
        Math.round(
          insights.averageExpense
        )
      }
    </strong>.
  </li>

  <li>
    • Monthly spending changed by
    {" "}
    <strong>
      {
        insights.percentageChange.toFixed(
          1
        )
      }
      %
    </strong>.
  </li>

  <li>
    • Largest expense:
    {" "}
    <strong>
      {
        insights.highestExpense?.title
      }
    </strong>.
  </li>

</ul>
        </div>
      </div>
    </div>
  );
}