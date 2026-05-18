import { useState } from "react";

import { jsPDF } from "jspdf";

import Sidebar from "../components/ui/Sidebar";

import SearchBar from "../components/ui/SearchBar";

import StatCard from "../components/ui/StatCard";

import ExpenseChart from "../components/charts/ExpenseChart";

import TransactionForm from "../components/transactions/TransactionForm";

import TransactionList from "../components/transactions/TransactionList";

import MonthlyBarChart from "../components/charts/MonthlyBarChart";

import WeeklyActivity from "../components/charts/WeeklyActivity";

import {
  useFinance,
} from "../context/FinanceContext";

export default function Dashboard() {

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [darkMode, setDarkMode] =
    useState(false);

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
      "Quartly",
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
      darkMode
        ? "dark"
        : ""
    }>

      <div className={`
        min-h-screen
        p-6

        transition-colors
        duration-300

        ${
          darkMode

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

        <Sidebar
          open={sidebarOpen}
          setOpen={setSidebarOpen}
        />

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

              flex items-center
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

                Quartly - An App by Ken Richardson

              </h1>

              <p className="
                text-[#8ea0b5]
                mt-2
              ">

                Know where your money goes

              </p>

            </div>

            <div className="
              flex items-center
              gap-3
            ">

              <button
                onClick={exportPDF}

                className="
                  glass

                  h-12 px-6

                  rounded-2xl

                  font-medium
                "
              >

                Export PDF

              </button>

              <button
                onClick={() =>
                  setDarkMode(
                    !darkMode
                  )
                }

                className="
                  glass

                  h-12 w-12

                  rounded-2xl

                  text-xl
                "
              >

                {darkMode
                  ? "☀︎"
                  : "⏾"}

              </button>

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
  transactions={
    filteredTransactions
  }

  darkMode={darkMode}
/>

            <TransactionForm />

          </div>

          <div className="
            grid
            grid-cols-1
            lg:grid-cols-3
            gap-6
          ">

            <ExpenseChart />

            <MonthlyBarChart />

            <WeeklyActivity />

          </div>

        </main>

      </div>

    </div>
  );
}