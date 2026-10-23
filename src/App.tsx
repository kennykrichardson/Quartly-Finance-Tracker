import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import lightBackground from "./assets/quartly-dashboard-bg-light.png";
import darkBackground from "./assets/quartly-dashboard-bg-dark.png";


import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import BudgetGoals from "./pages/BudgetGoals";
import ChartsPage from "./pages/ChartsPage";

import Sidebar from "./components/ui/Sidebar";

import { UserProvider } from "./firebase/UserContext";
import { useUser } from "./firebase/UserContext";

import { FinanceProvider } from "./context/FinanceContext";

function AppContent() {
  const user = useUser();

  const [activePage, setActivePage] =
    useState("dashboard");

  const [sidebarOpen, setSidebarOpen] =
    useState(false);


  const [isDarkMode, setIsDarkMode] =
    useState(() => {
      const saved =
        localStorage.getItem(
          "quartly-theme"
        );

      return saved === "dark";
    });


  useEffect(() => {
    localStorage.setItem(
      "quartly-theme",
      isDarkMode
        ? "dark"
        : "light"
    );

    if (isDarkMode) {
      document.documentElement.classList.add(
        "dark"
      );
    } else {
      document.documentElement.classList.remove(
        "dark"
      );
    }
  }, [isDarkMode]);

  if (!user) {
    return <Login />;
  }

  return (
    <FinanceProvider>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        style={{ backgroundColor: isDarkMode ? "#071018" : "#f7f9fb" }}
      >
        <img
          src={isDarkMode ? darkBackground : lightBackground}
          alt=""
          className="h-full w-full object-cover object-center"
          draggable={false}
        />
      </div>


      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        activePage={activePage}
        setActivePage={setActivePage}
        isDarkMode={isDarkMode}
      />

      <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={activePage}
        className="relative z-10 min-h-screen"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {activePage === "dashboard" && (
          <Dashboard
            isDarkMode={isDarkMode}
            toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
            activePage={activePage}
            setActivePage={setActivePage}
          />
        )}
        {activePage === "budgets" && (
            <BudgetGoals
              isDarkMode={isDarkMode}
              activePage={activePage}
              setActivePage={setActivePage}
            />
          )}
        {activePage === "charts-page" && (
            <ChartsPage
              isDarkMode={isDarkMode}
              activePage={activePage}
              setActivePage={setActivePage}
            />
          )}
      </motion.div>
      </AnimatePresence>
    </FinanceProvider>
  );
}

export default function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}