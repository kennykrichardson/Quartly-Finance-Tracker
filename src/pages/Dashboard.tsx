import { lazy, Suspense, useState } from "react";

import SearchBar from "../components/ui/SearchBar";
import StatCard from "../components/ui/StatCard";
import TransactionForm from "../components/transactions/TransactionForm";
import TransactionList from "../components/transactions/TransactionList";
import HoverCard from "../components/ui/HoverCard";
import AnimatedButton from "../components/ui/AnimatedButton";
import TransactionModal from "../components/transactions/TransactionModal";

import {
  useFinance,
} from "../context/FinanceContext";

import {
  Moon,
  Sun,
} from "lucide-react";

import {
  logout,
} from "../firebase/auth";

import {
  useUser,
} from "../firebase/UserContext";


const ExpenseChart = lazy(() => import("../components/charts/ExpenseChart"));
const MonthlyBarChart = lazy(() => import("../components/charts/MonthlyBarChart"));
const WeeklyActivity = lazy(() => import("../components/charts/WeeklyActivity"));

function ChartFallback() {
  return <div className="glass-premium min-h-48 rounded-2xl p-6 animate-pulse" aria-label="Loading chart" />;
}

interface DashboardProps {

  isDarkMode: boolean;

  toggleDarkMode: () => void;
  activePage: string;
  setActivePage: (page: string) => void;
}

export default function Dashboard({
  isDarkMode,
  toggleDarkMode,
  activePage,
  setActivePage,
}: DashboardProps){

  const [profileOpen, setProfileOpen] = useState(false);
  const [profilePhotoFailed, setProfilePhotoFailed] = useState(false);

  const user =
    useUser();

  const [search, setSearch] =
    useState("");

  const [selectedFilter, setSelectedFilter] =
    useState("All");

  const { transactions } =
    useFinance();

  const totalExpenses =
    transactions.reduce(
      (acc, t) => acc + t.amount,
      0
    );

  const [transactionModalOpen,
    setTransactionModalOpen] =
    useState(false);

  const filteredTransactions =
    transactions.filter((transaction) => {

      const query =
        search.toLowerCase();

      const matchesSearch =

        transaction.title
          .toLowerCase()
          .includes(query)

        ||

        transaction.description
          .toLowerCase()
          .includes(query)

        ||

        transaction.category
          .toLowerCase()
          .includes(query)

        ||

        transaction.customCategory
          ?.toLowerCase()
          .includes(query);

      const matchesFilter =

        selectedFilter === "All"

        ||

        transaction.category ===
        selectedFilter;

      return (
        matchesSearch &&
        matchesFilter
      );
    });

  async function exportPDF() {
    // Keep the sizeable PDF library out of the initial dashboard bundle.
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.setFontSize(26);

    doc.text(
      "Quartly - An App by Ken Richardson",
      20,
      25
    );

    doc.setFontSize(12);

    doc.setFont(
      "helvetica",
      "normal"
    );

    doc.text(
      "Expense Report",
      20,
      35
    );

    doc.setDrawColor(220);

    doc.line(
      20,
      42,
      190,
      42
    );

doc.setFontSize(18);

doc.text(
  "Financial Overview",
  20,
  70
);

doc.setFontSize(12);

doc.text(
  `Transactions: ${
    transactions.length
  }`,
  20,
  82
);

doc.text(
  `Generated: ${
    new Date()
      .toLocaleDateString()
  }`,
  20,
  102
);

    doc.setFontSize(14);

    doc.text(
      `Total Expenses: Rs.${totalExpenses}`,
      20,
      52
    );

    let y = 120;

    filteredTransactions.forEach(
      (t, index) => {

        doc.setFont(
          "helvetica",
          "bold"
        );

        doc.text(
          `${index + 1}. ${t.title} - Rs.${t.amount}`,
          20,
          y
        );

        y += 10;

        doc.setFont(
          "helvetica",
          "normal"
        );

        doc.text(
          `Category: ${
            t.category === "Other"

              ? t.customCategory ||
                "Other"

              : t.category
          }`,
          25,
          y
        );

        y += 10;

        const wrappedDescription =
          doc.splitTextToSize(
            `Description: ${t.description}`,
            160
          );

        doc.text(
          wrappedDescription,
          25,
          y
        );

        y += wrappedDescription.length * 7;

        doc.text(
          `Date: ${t.date}`,
          25,
          y
        );

        y += 18;

        doc.setDrawColor(230);

        doc.line(
          20,
          y - 8,
          190,
          y - 8
        );

        if (y > 260) {

          doc.addPage();

          y = 20;
        }
      }
    );

    doc.save(
      "quartly-report.pdf"
    );
  }

  return (

    <div className={
      isDarkMode
        ? "dark"
        : ""
    }>

      <div className={`
        min-h-screen
        p-6

        ${isDarkMode ? "text-white" : "text-black"}
      `}>

        <main className="
          max-w-7xl
          mx-auto
          space-y-6
        ">

          <div
            id="overview"
            className="
              relative z-50
              pt-3
              flex flex-wrap items-center justify-between gap-6
              xl:grid xl:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]
            "
          >

            <div className="xl:col-start-1 xl:row-start-1">

              <h1 className="
                text-3xl
                font-semibold
                tracking-[-.055em]
                sm:text-4xl
                lg:text-[2.7rem]
              ">

                Quartly - By Ken Richardson

              </h1>

              <p className="mt-2 text-[#8ea0b5]">
                Know where your money goes
              </p>
            </div>

            <nav aria-label="Main navigation" className="hidden items-center gap-1 rounded-full border border-white/30 bg-white/10 p-1 backdrop-blur-xl xl:col-start-2 xl:row-start-1 xl:flex xl:justify-self-center dark:border-white/15 dark:bg-slate-950/55 dark:shadow-[0_8px_28px_rgba(0,0,0,0.28)]">
              {[
                { label: "Overview", page: "dashboard" },
                { label: "Charts", page: "charts-page" },
                { label: "Budget Goals", page: "budgets" },
              ].map((item) => (
                <button
                  key={item.page}
                  onClick={() => setActivePage(item.page)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${activePage === item.page ? "bg-white/80 text-slate-900 shadow-sm dark:bg-cyan-300/15 dark:text-cyan-100 dark:ring-1 dark:ring-inset dark:ring-cyan-200/15" : "text-slate-600 hover:bg-white/50 dark:text-slate-300 dark:hover:bg-white/10"}`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div
              className="
                flex items-center gap-3
                xl:col-start-3 xl:row-start-1 xl:justify-self-end
              "
            >

              <AnimatedButton
                variant="secondary"
                onClick={exportPDF}
                className="
                  glass

                  h-12
                  px-6

                  rounded-2xl

                  font-medium
                "
              >

                Export PDF

              </AnimatedButton>

              <button

                onClick={toggleDarkMode}

                className="
                  glass

                  h-12
                  w-12

                  rounded-2xl

                  grid
                  place-items-center

                  transition-all
                  duration-200
                "
              >

                {isDarkMode

                  ? <Sun size={20} />

                  : <Moon size={20} />
                }

              </button>

              <div
                className="relative z-[1000] isolate"
              >

                <button

                  onClick={() =>
                    setProfileOpen(
                      !profileOpen
                    )
                  }

                  className="
                    glass

                    h-12

                    w-12

                    rounded-2xl

                    flex
                    items-center
                    justify-center

                    p-0

                    transition-all
                    duration-200

                    hover:scale-[1.02]
                  "
                >
{user?.photoURL && !profilePhotoFailed ? (
  <img
    src={user.photoURL}
    alt={user.displayName ? `${user.displayName} profile` : "Profile"}
    referrerPolicy="no-referrer"
    onError={() => setProfilePhotoFailed(true)}
    className="h-10 w-10 rounded-full border border-white/10 object-cover"
  />
) : (
  <span
    aria-label="Profile placeholder"
    className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-teal-500/15 font-semibold text-teal-700 dark:text-teal-200"
  >
    {(user?.displayName || user?.email || "Q").trim().charAt(0).toUpperCase()}
  </span>
)}

                </button>

                {profileOpen && (

                  <div
                    className="
                      absolute

                      right-0
                      top-14

                      w-72
                      z-[1001]

                      glass

                      rounded-3xl

                      p-3

                      backdrop-blur-xl

                      border
                      border-white/10
 
                      shadow-[0_20px_50px_rgba(0,0,0,0.15)]

                      border

                      border-white/10

                      shadow-[0_0_40px_rgba(220,20,60,0.15)]

                      z-50
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        gap-3

                        p-2
                        mb-2
                      "
                    >

                      {user?.photoURL && !profilePhotoFailed ? (
                        <img
                          src={user.photoURL}
                          alt=""
                          referrerPolicy="no-referrer"
                          onError={() => setProfilePhotoFailed(true)}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      ) : (
                        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-teal-500/15 font-semibold text-teal-700 dark:text-teal-200">
                          {(user?.displayName || user?.email || "Q").trim().charAt(0).toUpperCase()}
                        </span>
                      )}

                      <div>

                        <p
                          className="
                            font-semibold
                          "
                        >

                          {
                            user?.displayName
                          }

                        </p>

                        <p
                          className="
                            text-xs

                            text-[#8ea0b5]
                          "
                        >

                          {
                            user?.email
                          }

                        </p>

                      </div>

                    </div>

                    <div
                      className="
                        border-t
                        border-white/10

                        my-2
                      "
                    />

<button

  onClick={logout}

  className="
    w-full

    text-left

    px-4
    py-3

    rounded-2xl

    transition-all
    duration-200

    hover:bg-teal-500/10

    hover:text-teal-500

    hover:translate-x-1
  "
>

                      Logout

                    </button>

                  </div>

                )}

              </div>

            </div>

          </div>

          <SearchBar
            selected={selectedFilter}
            setSelected={setSelectedFilter}
            search={search}
            setSearch={setSearch}
          />

          <div className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-6
          ">

            <div className="transform-gpu transition-transform duration-300 ease-out hover:-translate-y-1 hover:scale-[1.015] motion-reduce:transform-none motion-reduce:transition-none">
              <StatCard
                title="Total Expenses"
                value={`₹${totalExpenses}`}
              />
            </div>

            <div className="transform-gpu transition-transform duration-300 ease-out hover:-translate-y-1 hover:scale-[1.015] motion-reduce:transform-none motion-reduce:transition-none">
              <StatCard
                title="Transactions"
                value={`${transactions.length}`}
              />
            </div>

            <div className="transform-gpu transition-transform duration-300 ease-out hover:-translate-y-1 hover:scale-[1.015] motion-reduce:transform-none motion-reduce:transition-none">
              <StatCard
                title="Categories"
                value="8"
              />
            </div>

          </div>

          <div className="
            grid
            grid-cols-1
            lg:grid-cols-[1.5fr_.8fr]
            gap-6
          ">

            <TransactionList
              transactions={filteredTransactions}
              darkMode={isDarkMode}
              onOpenModal={() =>
                setTransactionModalOpen(true)
              }
             onEditTransaction={() =>
             setTransactionModalOpen(
             true
             )
             }
            />

            <TransactionForm />

          </div>

          <div className="
            grid
            grid-cols-1
            lg:grid-cols-3
            gap-6
          ">

            <Suspense fallback={<ChartFallback />}>
              <HoverCard>
                <ExpenseChart />
              </HoverCard>
            </Suspense>

            <Suspense fallback={<ChartFallback />}>
              <HoverCard>
                <MonthlyBarChart />
              </HoverCard>
            </Suspense>

            <Suspense fallback={<ChartFallback />}>
              <HoverCard>
                <WeeklyActivity />
              </HoverCard>
            </Suspense>

          </div>

        </main>

      </div>

      <TransactionModal
        open={transactionModalOpen}
        onClose={() =>
          setTransactionModalOpen(false)
        }
        darkMode={isDarkMode}
      />

    </div>
  );
}