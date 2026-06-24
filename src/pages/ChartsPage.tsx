import { useFinance } from "../context/FinanceContext";

import SpendingTrendChart from "../components/charts/SpendingTrendChart";
import CategoryRadarChart from "../components/charts/CategoryRadarChart";
import SpendingTreemap from "../components/charts/SpendingTreemap";
import ExpenseScatterChart from "../components/charts/ExpenseScatterChart";
import BudgetBurnRate from "../components/charts/BudgetBurnRate";
import ExpenseHeatmap from "../components/charts/ExpenseHeatmap";
import SpendingSankey from "../components/charts/SpendingSankey";
import MonthlyBarChart from "../components/charts/MonthlyBarChart";
import ExpenseChart from "../components/charts/ExpenseChart";
import WeeklyActivity from "../components/charts/WeeklyActivity";
import HoverCard from "../components/ui/HoverCard";

interface ChartsPageProps {
  isDarkMode: boolean;
}

export default function ChartsPage({
  isDarkMode,
}: ChartsPageProps) {

  const { transactions } =
    useFinance();

  const categoryMap:
    Record<string, number> =
    {};

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

  return (

    <div
      className={`
        min-h-screen

        p-6

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

              w-[500px]
              h-[500px]

              bg-blue-500/10

              blur-[180px]

              pointer-events-none
            "
          />

        </>

      )}

      <main
        className="
          max-w-7xl
          mx-auto

          relative
          z-10

          space-y-6
        "
      >

        <div>

          <h1
            className="
              text-5xl
              font-bold
            "
          >

            Charts

          </h1>

          <p
            className="
              text-[#8ea0b5]

              mt-2
            "
          >

            Deep analytics and financial visualization

          </p>

        </div>

          <div className="
            grid
            grid-cols-1
            lg:grid-cols-3
            gap-6
          ">

            <HoverCard>
              <ExpenseChart />
            </HoverCard>

            <HoverCard>
              <MonthlyBarChart />
            </HoverCard>

            <HoverCard>
              <WeeklyActivity />
            </HoverCard>

          </div>

<div
  className="
    grid

    grid-cols-1
    xl:grid-cols-[1fr_2fr]

    gap-6

    items-stretch
  "
>

            <div className="h-full">
          <HoverCard>
          <SpendingTrendChart />
          </HoverCard>
          </div>

           <div className="h-full">
          <HoverCard>
          <CategoryRadarChart />
          </HoverCard>
          </div>

        </div>

<div
  className="
    grid

    grid-cols-1
    xl:grid-cols-[2fr_1fr]

    gap-6

    items-stretch
  "
>

            <div className="h-full">
          <HoverCard>
          <ExpenseScatterChart />
          </HoverCard>
          </div>

           <div className="h-full">
          <HoverCard>
          < SpendingTreemap/>
          </HoverCard>
          </div>

        </div>

<div
  className="
    grid

    grid-cols-1
    xl:grid-cols-[1.5fr_2fr]

    gap-6

    items-stretch
  "
>

            <div className="h-full">
          <HoverCard>
          <BudgetBurnRate />
          </HoverCard>
          </div>

           <div className="h-full">
          <HoverCard>
          <ExpenseHeatmap />
          </HoverCard>
          </div>

        </div>

        <HoverCard>
        <SpendingSankey />
        </HoverCard>

      </main>

    </div>

  );
}