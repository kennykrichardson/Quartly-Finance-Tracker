import { useState } from "react";

import { jsPDF } from "jspdf";

import SearchBar from "../components/ui/SearchBar";
import StatCard from "../components/ui/StatCard";
import ExpenseChart from "../components/charts/ExpenseChart";
import TransactionForm from "../components/transactions/TransactionForm";
import TransactionList from "../components/transactions/TransactionList";
import MonthlyBarChart from "../components/charts/MonthlyBarChart";
import WeeklyActivity from "../components/charts/WeeklyActivity";
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

interface DashboardProps {

  isDarkMode: boolean;

  toggleDarkMode: () => void;
}

export default function Dashboard({
  isDarkMode,
  toggleDarkMode,
}: DashboardProps){

  const [profileOpen,
    setProfileOpen] =
    useState(false);

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

  function exportPDF() {

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

    doc.setFontSize(14);

    doc.text(
      `Total Expenses: Rs.${totalExpenses}`,
      20,
      52
    );

    let y = 72;

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

        transition-colors
        duration-300

        ${
          isDarkMode

            ? `
              bg-[#0f1115]
              text-white
            `

            : `
              bg-[#f8f8f7]
              text-black
            `
        }
      `}>

        <main className="
          max-w-7xl
          mx-auto
          space-y-6
        ">

          <SearchBar
            selected={selectedFilter}
            setSelected={setSelectedFilter}
            search={search}
            setSearch={setSearch}
          />

          <div
            id="overview"
            className="
              pt-3

              flex
              items-center
              justify-between

              gap-6
              flex-wrap
            "
          >

            <div>

              <h1 className="
                text-5xl
                font-semibold
                tracking-tight
              ">

                Quartly - By Ken Richardson

              </h1>

              <p className="
                text-[#8ea0b5]
                mt-2
              ">

                Know where your money goes

              </p>

            </div>

            <div
              className="
                flex
                items-center
                gap-3
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
                className="
                  relative
                "
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
<img

  src={
    user?.photoURL ||
    ""
  }

  alt="Profile"

  className="
    w-10
    h-10

    rounded-full

    border
    border-white/10

    transition-all
    duration-200
  "
/>

                </button>

                {profileOpen && (

                  <div
                    className="
                      absolute

                      right-0
                      top-14

                      w-72

                      glass

                      rounded-3xl

                      p-3

                      backdrop-blur-xl

                      border
                      border-white/10
 
                      shadow-[0_20px_50px_rgba(0,0,0,0.15)]

                      border

                      border-white/10

                      shadow-[0_0_40px_rgba(64,224,208,0.15)]

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

                      <img

                        src={
                          user?.photoURL ||
                          ""
                        }

                        alt=""

                        className="
                          w-12
                          h-12

                          rounded-full
                        "
                      />

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

    hover:bg-red-500/10

    hover:text-red-500

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

          <div className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-6
          ">

            <StatCard
              title="Total Expenses"
              value={`₹${totalExpenses}`}
            />

            <StatCard
              title="Transactions"
              value={`${transactions.length}`}
            />

            <StatCard
              title="Categories"
              value="8"
            />

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
            />

            <TransactionForm />

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