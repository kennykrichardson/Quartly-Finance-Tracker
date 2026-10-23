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
  activePage: string;
  setActivePage: (page: string) => void;
}

export default function ChartsPage({
  isDarkMode,
  activePage,
  setActivePage,
}: ChartsPageProps) {

  return (

    <div
      className={`
        min-h-screen

        p-6

        ${isDarkMode ? "text-white" : "text-black"}
      `}
    >

      {isDarkMode && (

        <>

          <div className="pointer-events-none fixed left-0 top-0 h-[360px] w-[360px] rounded-full bg-cyan-400/[0.07] blur-3xl" />

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

        <header className="relative z-50 flex flex-wrap items-center justify-between gap-6 pt-3 xl:grid xl:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
          <div className="xl:col-start-1 xl:row-start-1">
            <h1 className="text-3xl font-semibold tracking-[-.055em] sm:text-4xl lg:text-[2.7rem]">
              Quartly - By Ken Richardson
            </h1>
            <p className="mt-2 text-[#8ea0b5]">Deep analytics and financial visualization</p>
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